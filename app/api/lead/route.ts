/**
 * Next.js App Router route — POST /api/lead
 *
 * Receives a lead payload from the site's forms (contact form + smile
 * analysis quiz), validates it, and writes the contact into HighLevel via
 * the v2 Contacts API using a Private Integration Token. The PIT lives ONLY
 * in this server-side env var — never exposed to the browser.
 *
 * Contract (per-client customization — see WRITE_ONCE_FIELD_KEYS below):
 *   0. Spam screening (lib/spam-guard.ts): origin check, honeypot,
 *      time-to-submit, content heuristics. Honeypot/timing hits get a fake
 *      {ok:true} with no contactId and nothing is written.
 *   1. Parse + validate the incoming JSON: body at most 32 KB (413), a JSON
 *      object (400), at most 100 keys, per-field length caps. Only allowlisted
 *      keys (what the forms + lib/attribution.ts send) become custom fields.
 *      A lead needs a valid email or a usable phone (David, 2026-10-03: phone
 *      is optional on the server). The phone is normalised to E.164; an
 *      unusable phone, or an invalid email, is not sent to HighLevel and not
 *      used for matching: it is kept, as typed, in the submission's note.
 *      Tracking opt-out (tracking_opt_out: true from the browser, or the
 *      Sec-GPC: 1 header): visitor_id and ga_client_id are dropped before
 *      anything is written (David, 2026-10-03).
 *   2. Look up an existing contact by email (idempotency), or by phone when
 *      no email was submitted. A lookup that fails (not 200/404, 429/5xx
 *      after 2 retries, network, bad JSON) is NOT "no match": 502, nothing
 *      created (David, 2026-10-03).
 *   3. New contact  -> POST /contacts/ with the full payload (incl. locked
 *      first-touch fields).
 *   4. Existing contact:
 *      - Phone (David, 2026-10-03): never overwritten. Filled only when the
 *        contact has none; a different phone is not sent, the submission's
 *        note gets "Form submitted with phone: <typed>" and the tag
 *        "phone-mismatch". (This replaces the earlier latest-wins phone.)
 *      - Name and email (David, 2026-10-02, lib/ghl-identity.ts): never
 *        changed, only filled when empty on the contact. The name counts as
 *        one field: filled only when the contact has no name at all.
 *      - Name mismatch on any match (David, 2026-10-03): the submission's
 *        note gets "Form submitted as: <name>" and the tag "name-mismatch"
 *        when the typed name clearly differs. A phone-only match always gets
 *        the "Form submitted as" line.
 *      - Contact can't be read: no name, email or phone is sent.
 *      - Phone-only match (no email; David, 2026-10-03, rule 8): NO contact
 *        field is updated (no name fill, no form answers, no phone); only
 *        empty visitor_id / ga_client_id are filled. The answers are in the
 *        submission's note; tags are added as usual.
 *      - LOCKED first-touch attribution fields (visitor_source_first, UTMs,
 *        click IDs, etc.): NOT sent -> preserved, true first-touch record
 *      - WRITE_ONCE fields (SMS consent grant + timestamp + text): NOT sent
 *        -> preserved as the legal first-grant record
 *      - Patient status / message / smile-analysis answers: SENT every time
 *        -> updated to the latest submission
 *      - RECENT attribution fields (visitor_source_recent, *_recent): SENT
 *        every time -> updated
 *      - Join keys visitor_id (the Click Track V2 pixel's `_ct_vid`) and
 *        ga_client_id: LOCKED, except that a returning contact whose value
 *        is empty gets one (fill-if-empty, lib/ghl-join-keys.ts); a
 *        non-empty value is never overwritten. gbraid/wbraid stay create-only.
 *      - Duplicate phone: if the phone belongs to another contact, the
 *        update is retried without it, tagged "phone-conflict" and noted
 *        (in the submission's one note).
 *      - Tags: APPENDED via the dedicated /tags endpoint (never replaces)
 *      - Notes are APPEND ONLY: each submission adds one new note with its
 *        details (plus the identity lines above). Existing notes (including
 *        staff notes) are never edited or deleted. A phone conflict is a line
 *        in that same note (exactly one note per submission). Contact create
 *        and note create are never retried after a 5xx/network/timeout.
 *      - Tag append failure: non-fatal (logged by status), the note still
 *        goes out. Note failure: non-fatal, EXCEPT on a phone-only match
 *        where the answers only live in the note -> 502.
 *   3b. Create refused because the phone belongs to another contact:
 *      - email lead (A): created once more without the phone, tagged
 *        "phone-conflict", typed phone + other contact id in the note;
 *      - no-email lead (B): treated as a phone-only match on that contact
 *        (meta.contactId) — never a contact with neither email nor phone.
 *   5. Return { ok, contactId, created }. A 2xx create without a valid
 *      contact id is a 502. Every HighLevel call times out after 10s.
 *      Missing env vars -> 503 "CRM not configured".
 *
 * Required env vars (server-side only, set in .env.local AND the hosting
 * provider's env settings — never in the client bundle):
 *   GHL_PIT          — Private Integration Token (pit-...). Scopes: View
 *                      Contacts, Edit Contacts, View Custom Fields (for
 *                      fill-if-empty) and notes.
 *   GHL_LOCATION_ID  — the sub-account location ID
 */

import type { NextRequest } from "next/server";
import { screenLead } from "@/lib/spam-guard";
import {
  GHL_TIMEOUT_MS,
  GhlLookupError,
  PHONE_CONFLICT_TAG,
  PHONE_MISMATCH_TAG,
  duplicatePhoneContactId,
  fillIfEmptyFields,
  isCtVisitorId,
  isDuplicatePhoneRejection,
  isValidContactId,
  lookupDuplicate,
  normalizePhone,
  phoneConflictLine,
  phoneOnMatch,
  trackingOptedOut,
  withoutJoinKeys,
} from "@/lib/ghl-join-keys";
import {
  NAME_MISMATCH_TAG,
  type SubmittedIdentity,
  fillEmptyIdentity,
  getContactIdentity,
  namesClearlyDiffer,
  submittedName,
} from "@/lib/ghl-identity";

const GHL_API = "https://services.leadconnectorhq.com";
const API_VERSION = "2021-07-28";

// ──────────────────────────────────────────────────────────────────
// Field classification for the write-once contract. Mirrors the
// Peoplelytics Master Schema "lock by suffix" rule (peoplelytics-ghl-setup)
// and this project's actual provisioned fieldKeys — not the generic
// real-estate example fields from the skill template.
// ──────────────────────────────────────────────────────────────────

// LOCKED — only written when CREATING a brand-new contact. Never sent on
// update, so first-touch attribution can't be clobbered by a later visit.
const LOCKED_FIELD_KEYS = new Set<string>([
  // Group A — Core Attribution
  "visitor_source_first",
  "visitor_source_first_detail",
  "attribution_method",
  "attribution_confidence",
  "utm_source_captured",
  "utm_medium_captured",
  "utm_campaign_captured",
  "utm_term_captured",
  "utm_content_captured",
  "gclid_captured",
  // Google's privacy-preserving click ids — sent INSTEAD of gclid when Google
  // cannot pass one. Create-only like gclid_captured (never filled later).
  "gbraid_captured",
  "wbraid_captured",
  "fbclid_captured",
  "msclkid_captured",
  "ttclid_captured",
  "landing_page_first",
  "referrer_url_captured",
  "first_visit_at_iso",
  // Join keys. visitor_id is the Click Track V2 pixel's `_ct_vid` UUID (the
  // Customer Journey join key), not IntentWave's anonymous id; ga_client_id
  // joins the contact to GA4. Both are also filled on a returning contact
  // whose value is empty (fill-if-empty, lib/ghl-join-keys.ts).
  "visitor_id",
  "ga_client_id",
  "how_did_you_hear",
  // Group C — Universal Form
  "form_first_submitted_at",
  // Group D — SEO (unused today, kept for when the SEO engine is wired)
  "seo_keyword_first",
  "seo_keyword_confidence",
  "seo_keyword_match_method",
  "seo_landing_page_first",
  "seo_first_organic_visit_at",
  // Group E — AEO
  "aeo_source_engine_first",
  "aeo_source_engine_first_detail",
  "aeo_query_first",
  "aeo_query_confidence",
  "aeo_landing_page_first",
  "aeo_first_ai_visit_at",
  // Group F — Lifecycle (unused today, kept for future GHL workflow use)
  "lc_first_contacted_at",
  "lc_first_response_at",
  // Group H — Revenue Rollup (unused today)
  "rev_first_deal_value",
  "rev_first_deal_closed_at",
  "rev_days_visit_to_lead",
]);

// WRITE_ONCE — only written when CREATING, preserved on every later
// resubmission. Piedmont Dental wants patient status / message / smile
// analysis answers to update on every submission (latest wins), so only
// the SMS consent legal record stays WRITE_ONCE here — "first-grant
// timestamp is the legally meaningful one" per the launch-checklist SMS
// compliance section. This is a per-client deviation from the CTM-standard
// PRESERVE default; keep the site's forms and this route in agreement so
// it never drifts silently.
const WRITE_ONCE_FIELD_KEYS = new Set<string>([
  "form_consent_sms",
  "form_consent_marketing",
  "form_consent_sms_timestamp",
  "form_consent_sms_text",
]);

// Standard GHL contact properties (first_name, last_name, full_name, email,
// phone) are sent at the top level of the GHL payload, never as customFields
// (they are not in the allowlist below). Whether they're sent on UPDATE is
// decided explicitly in the POST handler (name/email/phone: only when empty on
// the contact, lib/ghl-identity.ts and lib/ghl-join-keys.ts phoneOnMatch).

// ALLOWLIST — the only body keys that may become HighLevel custom fields:
// what components/ContactHero.tsx and components/SmileAnalysisForm.tsx send,
// plus lib/attribution.ts getAttributionData(). Any other key in the body is
// ignored (it can never create or overwrite an arbitrary field such as lc_* /
// rev_*). Keep this in step with the forms.
const FORM_FIELD_KEYS = [
  "form_source",
  "form_name",
  "form_source_url",
  "form_intent_type",
  "form_message",
  "patient_message",
  "are_you_a_new_or_existing_patient",
  "smile_analysis_yes_count",
  "smile_analysis_answers",
  "form_consent_sms",
  "form_consent_marketing",
  "form_consent_sms_timestamp",
  "form_consent_sms_text",
];
const ATTRIBUTION_FIELD_KEYS = [
  "visitor_source_first",
  "visitor_source_recent",
  "attribution_method",
  "attribution_confidence",
  "aeo_source_engine_first",
  "aeo_source_engine_recent",
  "utm_source_captured",
  "utm_medium_captured",
  "utm_campaign_captured",
  "utm_term_captured",
  "utm_content_captured",
  "gclid_captured",
  "gbraid_captured",
  "wbraid_captured",
  "fbclid_captured",
  "msclkid_captured",
  "ttclid_captured",
  "landing_page_first",
  "referrer_url_captured",
  "first_visit_at_iso",
  "ga_client_id",
  "visitor_id",
  "last_visit_at_iso",
  "landing_page_recent",
  "referrer_recent",
];
const CUSTOM_FIELD_ALLOWLIST = new Set<string>([...FORM_FIELD_KEYS, ...ATTRIBUTION_FIELD_KEYS]);

// ── Input limits ──────────────────────────────────────────────────────
const MAX_BODY_BYTES = 32 * 1024;
const MAX_KEYS = 100;
/** Free-text fields (the message, the quiz answers, the browser-built note). */
const LONG_TEXT_KEYS = new Set(["note", "form_message", "patient_message", "smile_analysis_answers"]);
const MAX_LONG_TEXT = 8000;
const URL_KEYS = new Set(["form_source_url", "landing_page_first", "landing_page_recent", "referrer_url_captured", "referrer_recent"]);
const MAX_URL = 2048;
const MAX_EMAIL = 254;
const MAX_SHORT_TEXT = 500;

function maxLengthFor(key: string): number {
  if (LONG_TEXT_KEYS.has(key)) return MAX_LONG_TEXT;
  if (URL_KEYS.has(key)) return MAX_URL;
  if (key === "email") return MAX_EMAIL;
  return MAX_SHORT_TEXT;
}

/** The first key whose string value is over its cap, or null. */
function overlongField(body: Record<string, unknown>): string | null {
  for (const [key, v] of Object.entries(body)) {
    if (typeof v === "string" && v.length > maxLengthFor(key)) return key;
  }
  return null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class BodyTooLarge extends Error {}

/** The request body as text, refusing (BodyTooLarge) anything over the cap without buffering it all. */
async function readCappedBody(request: Request): Promise<string> {
  const declared = Number(request.headers.get("content-length") ?? "");
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) throw new BodyTooLarge();
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_BODY_BYTES) {
      await reader.cancel().catch(() => {});
      throw new BodyTooLarge();
    }
    chunks.push(value);
  }
  const buf = new Uint8Array(total);
  let off = 0;
  for (const c of chunks) {
    buf.set(c, off);
    off += c.byteLength;
  }
  return new TextDecoder().decode(buf);
}

type LeadBody = Record<string, unknown>;

function buildCustomFields(body: LeadBody, mode: "create" | "update") {
  const out: Array<{ key: string; field_value: string | boolean | string[] }> = [];
  for (const [key, raw] of Object.entries(body)) {
    if (!CUSTOM_FIELD_ALLOWLIST.has(key)) continue;
    if (raw === undefined || raw === null || raw === "") continue;
    // Scalars only: a form never sends an object or array here.
    if (typeof raw !== "string" && typeof raw !== "boolean" && typeof raw !== "number") continue;
    if (typeof raw === "number" && !Number.isFinite(raw)) continue;
    // visitor_id must be the Click Track V2 pixel's `_ct_vid` UUID.
    if (key === "visitor_id" && !isCtVisitorId(raw)) continue;

    if (mode === "update") {
      if (LOCKED_FIELD_KEYS.has(key)) continue;
      if (WRITE_ONCE_FIELD_KEYS.has(key)) continue;
    }

    out.push({ key, field_value: typeof raw === "boolean" ? raw : String(raw) });
  }
  return out;
}

async function ghlFetch(path: string, init: RequestInit, pit: string) {
  return fetch(`${GHL_API}${path}`, {
    ...init,
    signal: AbortSignal.timeout(GHL_TIMEOUT_MS),
    headers: {
      Authorization: `Bearer ${pit}`,
      Version: API_VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init.headers || {}),
    },
  });
}

const contactPath = (contactId: string, suffix = "") => `/contacts/${encodeURIComponent(contactId)}${suffix}`;

/**
 * Append tags to an existing contact via the dedicated /tags endpoint.
 * Idempotent. Critically, this does NOT replace existing tags — a PUT to
 * /contacts/{id} with a `tags` body would, destroying tag history.
 */
async function appendTags(contactId: string, tags: string[], pit: string) {
  if (tags.length === 0) return;
  // Non-fatal: the contact is already stored, so a failed tag call is logged
  // (status / error class only) and the submission's note still goes out.
  try {
    const res = await ghlFetch(contactPath(contactId, "/tags"), { method: "POST", body: JSON.stringify({ tags }) }, pit);
    if (!res.ok) console.error(`[lead] tag append failed (HTTP ${res.status})`);
  } catch (err) {
    console.error(`[lead] tag append failed (${err instanceof Error ? err.name : "network"})`);
  }
}

/**
 * Adds THE one new note for this submission. APPEND ONLY: it never lists,
 * edits or deletes the contact's existing notes, which may be staff notes
 * (David, 2026-10-02). Called once per submission, after any retry of the
 * contact write. Returns whether it was stored; the caller decides whether a
 * failure fails the lead (only a phone-only match, rule D).
 */
async function addSubmissionNote(contactId: string, body: string, pit: string): Promise<boolean> {
  if (!body) return true;
  // Never retried: a note POST that failed or timed out may still have
  // landed, and a retry would add a second copy (David, 2026-10-03).
  try {
    const res = await ghlFetch(contactPath(contactId, "/notes"), { method: "POST", body: JSON.stringify({ body }) }, pit);
    if (!res.ok) {
      // Status only: the response body can echo the note, i.e. the lead's message.
      console.error(`[lead] note post failed (HTTP ${res.status})`);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[lead] note post failed (${err instanceof Error ? err.name : "network"})`);
    return false;
  }
}

function jsonError(status: number, message: string) {
  // Status and message only — never a HighLevel response body, which can echo
  // the lead's details or another contact's id.
  console.error(`[lead] ${status} ${message}`);
  return Response.json({ ok: false, error: message }, { status });
}

/** The tag-safe slug of a client-supplied label, or null. */
function slug(v: unknown, max = 64): string | null {
  if (typeof v !== "string") return null;
  const s = v.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9_-]/g, "").slice(0, max);
  return s || null;
}

export async function POST(request: NextRequest) {
  const PIT = process.env.GHL_PIT;
  const LOCATION_ID = process.env.GHL_LOCATION_ID;
  if (!PIT || !LOCATION_ID) {
    // Never fake success: a missing token must be loud. No env var names in
    // the response or the log.
    return jsonError(503, "CRM not configured");
  }

  let body: LeadBody;
  try {
    const raw = await readCappedBody(request);
    body = JSON.parse(raw) as LeadBody;
  } catch (err) {
    if (err instanceof BodyTooLarge) return jsonError(413, "Request too large");
    return jsonError(400, "Invalid JSON body");
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return jsonError(400, "Invalid JSON body");
  }
  if (Object.keys(body).length > MAX_KEYS) return jsonError(400, "Too many fields");
  if (overlongField(body)) return jsonError(400, "A field is too long. Please shorten it.");

  // Opted-out visitor (tracking_opt_out from the browser, or Global Privacy
  // Control): drop the join keys before anything can be written.
  if (trackingOptedOut(request, body)) body = withoutJoinKeys(body);

  // Spam screening runs before anything touches GHL. Silent verdicts
  // return a success-shaped body (no contactId) so bots get no feedback.
  const verdict = screenLead(request, body);
  if (verdict.kind === "silent") {
    console.warn(`[lead] spam filtered (silent): ${verdict.reason}`);
    return Response.json({ ok: true, contactId: null, created: false });
  }
  if (verdict.kind === "reject") {
    console.warn(`[lead] spam rejected (${verdict.status}): ${verdict.reason}`);
    return Response.json({ ok: false, error: verdict.message }, { status: verdict.status });
  }

  // Email and phone (David, 2026-10-03): a lead needs a valid email or a
  // usable phone. An invalid email or an unusable phone is never sent to
  // HighLevel nor used for matching; it is kept, as typed, in the note.
  const typedEmail = typeof body.email === "string" ? body.email.trim() : "";
  const email = typedEmail && EMAIL_RE.test(typedEmail) ? typedEmail : null;
  const typedPhone = typeof body.phone === "string" ? body.phone.trim() : "";
  const phone = normalizePhone(typedPhone);
  if (!email && !phone) {
    if (typedEmail) return jsonError(400, "Please enter a valid email address.");
    return jsonError(400, "email or phone is required");
  }

  // A2P 10DLC: every phone-collecting form on this site requires SMS
  // consent before submission is allowed client-side. Enforce it
  // server-side too, defensively.
  if (typedPhone && body.form_consent_sms !== true) {
    return jsonError(400, "SMS consent is required when a phone number is provided");
  }

  // The identity this route may write: never an invalid email.
  const identity: SubmittedIdentity = {
    first_name: body.first_name,
    last_name: body.last_name,
    full_name: body.full_name,
    email: email ?? undefined,
  };
  // Lines every note of this submission carries about what was NOT stored.
  const inputLines = [
    typedEmail && !email ? `Form submitted with email (not valid, not saved): ${typedEmail}` : null,
    typedPhone && !phone ? `Form submitted with phone (not a usable number, not saved): ${typedPhone}` : null,
  ];

  const nowIso = new Date().toISOString();
  const formSource = slug(body.form_source) ?? "unknown";
  const recentChannel = slug(body.visitor_source_recent);
  const channelTag = recentChannel ? `channel:${recentChannel}` : null;
  const noteText = typeof body.note === "string" ? body.note.trim() : "";
  const joinNote = (lines: Array<string | null>) =>
    [lines.filter(Boolean).join("\n"), noteText].filter(Boolean).join("\n\n");

  /**
   * Existing contact (matched by email, or by phone when no valid email).
   * Returns the response to send.
   */
  async function updateExisting(contactId: string, matchedBy: "email" | "phone"): Promise<Response> {
    // ── EXISTING CONTACT — latest wins on qualification, true first-touch
    // attribution + SMS consent record still preserved. Name, email
    // (David, 2026-10-02) and phone (David, 2026-10-03) are never
    // overwritten: only filled when the contact has them empty, and not
    // sent at all when the contact can't be read ──
    const existing = await getContactIdentity(contactId, PIT!);
    // Phone-only match (the lead has no valid email): NO contact field is
    // updated — no name fill, no latest-wins answers, no phone — only the
    // fill-if-empty join keys (David, 2026-10-03, rule 8). The answers are
    // in the submission's note below; tags are still added.
    const phoneOnly = matchedBy === "phone";
    const identityFill = phoneOnly ? {} : fillEmptyIdentity(identity, existing);
    const nameMismatch = namesClearlyDiffer(identity, existing);
    const phoneRule = phoneOnMatch(phone ?? "", existing);
    // visitor_id / ga_client_id: only when the contact has none yet.
    const joinKeyFill = await fillIfEmptyFields(buildCustomFields(body, "create"), contactId, PIT!, LOCATION_ID!);
    const recentCustomFields = phoneOnly ? joinKeyFill : [...buildCustomFields(body, "update"), ...joinKeyFill];
    // form_last_submitted_at is server-authoritative (never trust client
    // clock) and always updates, so staff can see the most recent touch.
    if (!phoneOnly) recentCustomFields.push({ key: "form_last_submitted_at", field_value: nowIso });

    const updatePayload: Record<string, unknown> = {
      customFields: recentCustomFields,
      // firstName / lastName / name / email only where the contact has none.
      ...identityFill,
      // Intentionally NO tags — handled by appendTags below
    };
    if (phoneRule.fill && !phoneOnly) updatePayload.phone = phoneRule.fill;

    // A phone-only match with no join key to fill sends no PUT at all.
    const updateRes =
      recentCustomFields.length > 0 || Object.keys(updatePayload).length > 1
        ? await ghlFetch(contactPath(contactId), { method: "PUT", body: JSON.stringify(updatePayload) }, PIT!)
        : null;
    let phoneConflict = false;
    let otherContactId: string | null = null;
    if (updateRes && !updateRes.ok) {
      const detail = await updateRes.text().catch(() => "");
      // The contact was matched by email, but the submitted phone already
      // belongs to a DIFFERENT contact (e.g. two people in one household),
      // and this location refuses duplicate phones. Store the lead anyway:
      // retry the update (nothing was written) without the phone, then flag
      // the conflict for the team.
      const retried =
        "phone" in updatePayload && isDuplicatePhoneRejection(updateRes.status, detail)
          ? await ghlFetch(contactPath(contactId), { method: "PUT", body: JSON.stringify({ ...updatePayload, phone: undefined }) }, PIT!)
          : null;
      if (!retried?.ok) {
        const failed = retried ?? updateRes;
        return jsonError(502, `GHL update failed (HTTP ${failed.status})`);
      }
      phoneConflict = true;
      otherContactId = duplicatePhoneContactId(detail);
      // No contact details in the log — the ids are enough to find it.
      console.warn("[lead] stored without its phone: the phone belongs to another contact", {
        contactId,
        otherContactId,
      });
    }

    const tagsToAppend = [
      `form:${formSource}`,
      ...(channelTag ? [channelTag] : []),
      ...(phoneConflict ? [PHONE_CONFLICT_TAG] : []),
      ...(nameMismatch ? [NAME_MISMATCH_TAG] : []),
      ...(phoneRule.mismatch ? [PHONE_MISMATCH_TAG] : []),
      "website contact form submitted",
    ];
    await appendTags(contactId, tagsToAppend, PIT!);
    // ONE note per submission: the identity and conflict lines go into it. A
    // phone-only match always records the typed name; any match does when
    // the name clearly differs.
    const noted = await addSubmissionNote(
      contactId,
      joinNote([
        phoneOnly || nameMismatch ? `Form submitted as: ${submittedName(identity)}` : null,
        phoneRule.mismatch ? `Form submitted with phone: ${typedPhone}` : null,
        phoneConflict ? phoneConflictLine(typedPhone, otherContactId) : null,
        ...inputLines,
      ]),
      PIT!
    );
    // Rule D: on a phone-only match the answers live only in the note, so a
    // lost note is a lost lead -> the visitor sees the call-us error.
    if (!noted && phoneOnly) return jsonError(502, "GHL note failed on a phone-only match");
    return Response.json({ ok: true, contactId, created: false, form_source: formSource });
  }

  try {
    // A failed lookup throws GhlLookupError (-> 502 below, nothing created):
    // it is never treated as "no contact".
    if (email) {
      const id = await lookupDuplicate("email", email, PIT, LOCATION_ID);
      if (id) return await updateExisting(id, "email");
    } else if (phone) {
      // No valid email: look the contact up by phone (`number`, as HighLevel
      // documents it). With an email, a phone match is never used: it may be
      // another person (a household), and their contact must not be
      // overwritten.
      const id = await lookupDuplicate("number", phone, PIT, LOCATION_ID);
      if (id) return await updateExisting(id, "phone");
    }

    // ── NEW CONTACT — write full first-touch payload ────────────────
    const customFields = buildCustomFields(body, "create");
    customFields.push(
      { key: "form_first_submitted_at", field_value: nowIso },
      { key: "form_last_submitted_at", field_value: nowIso }
    );
    const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);
    const createPayload = {
      locationId: LOCATION_ID,
      type: "Lead",
      firstName: str(body.first_name),
      lastName: str(body.last_name),
      name: str(body.full_name),
      email: email ?? undefined,
      phone: phone ?? undefined,
      source: formSource,
      customFields,
      tags: [
        `form:${formSource}`,
        ...(channelTag ? [channelTag] : []),
        // Canonical CTM baseline tag — downstream GHL workflows trigger on it.
        "website contact form submitted",
      ],
    };
    // Never retried after a 5xx / network error / timeout: it may have landed.
    const createRes = await ghlFetch(`/contacts/`, { method: "POST", body: JSON.stringify(createPayload) }, PIT);
    let createOk: Response = createRes;
    let conflictWith: string | null = null;
    let createPhoneConflict = false;
    if (!createRes.ok) {
      const detail = await createRes.text().catch(() => "");
      if (!(phone && isDuplicatePhoneRejection(createRes.status, detail))) {
        return jsonError(502, `GHL create failed (HTTP ${createRes.status})`);
      }
      conflictWith = duplicatePhoneContactId(detail);
      if (!email) {
        // B: no email, and the phone belongs to an existing contact — treat it
        // as a phone-only match on that contact (rule 8). Never create a
        // contact with neither email nor phone.
        if (!conflictWith) return jsonError(502, "GHL create refused (duplicate phone, no contact id)");
        return await updateExisting(conflictWith, "phone");
      }
      // A: an email lead whose phone belongs to another contact. HighLevel
      // created nothing (400), so create once more WITHOUT the phone.
      const retried = await ghlFetch(
        `/contacts/`,
        {
          method: "POST",
          body: JSON.stringify({ ...createPayload, phone: undefined, tags: [...createPayload.tags, PHONE_CONFLICT_TAG] }),
        },
        PIT
      );
      if (!retried.ok) return jsonError(502, `GHL create failed (HTTP ${retried.status})`);
      createOk = retried;
      createPhoneConflict = true;
    }

    let contactId: string | null = null;
    try {
      const createdJson = (await createOk.json()) as { contact?: { id?: unknown }; id?: unknown } | null;
      const id = createdJson?.contact?.id ?? createdJson?.id;
      contactId = isValidContactId(id) ? id : null;
    } catch {
      contactId = null;
    }
    // A 2xx with no usable contact id is not a stored lead we can confirm.
    if (!contactId) return jsonError(502, "GHL create returned no valid contact id");
    if (createPhoneConflict) {
      // No contact details in the log — the ids are enough to find it.
      console.warn("[lead] created without its phone: the phone belongs to another contact", {
        contactId,
        otherContactId: conflictWith,
      });
    }

    // One note; a failure here is logged, the lead is stored with its fields.
    await addSubmissionNote(
      contactId,
      joinNote([createPhoneConflict ? phoneConflictLine(typedPhone, conflictWith) : null, ...inputLines]),
      PIT
    );
    return Response.json({ ok: true, contactId, created: true, form_source: formSource });
  } catch (err) {
    // A failed lookup is not "no contact": 502 (the form shows the call-us
    // error) and nothing is created. Status / error class only.
    if (err instanceof GhlLookupError) return jsonError(502, `GHL contact lookup failed (${err.reason})`);
    return jsonError(500, `Lead handler exception (${err instanceof Error ? err.name : "unknown"})`);
  }
}
