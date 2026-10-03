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
 *   1. Parse + minimum-validate the incoming JSON. A lead needs an email or a
 *      phone (David, 2026-10-03: phone is optional on the server).
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
 *        update is retried without it, tagged "phone-conflict" and noted.
 *      - Tags: APPENDED via the dedicated /tags endpoint (never replaces)
 *      - Notes are APPEND ONLY: each submission adds one new note with its
 *        details (plus the identity lines above). Existing notes (including
 *        staff notes) are never edited or deleted. A phone conflict adds its
 *        own separate note. Contact create and note create are never retried
 *        after a 5xx/network error.
 *   5. Return { ok, contactId, created }.
 *
 * Required env vars (server-side only, set in .env.local AND the hosting
 * provider's env settings — never in the client bundle):
 *   GHL_PIT          — Private Integration Token (pit-...). Scopes: View
 *                      Contacts, Edit Contacts, View Custom Fields (for
 *                      fill-if-empty) and notes.
 *   GHL_LOCATION_ID  — the sub-account location ID
 */

import type { NextRequest } from "next/server";
import { screenLead, SPAM_META_KEYS } from "@/lib/spam-guard";
import {
  GhlLookupError,
  PHONE_CONFLICT_TAG,
  PHONE_MISMATCH_TAG,
  addPhoneConflictNote,
  duplicatePhoneContactId,
  fillIfEmptyFields,
  isCtVisitorId,
  isDuplicatePhoneRejection,
  lookupDuplicate,
  phoneOnMatch,
  trackingOptedOut,
  withoutJoinKeys,
} from "@/lib/ghl-join-keys";
import {
  NAME_MISMATCH_TAG,
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

// Standard GHL contact properties — sent at the top level of the GHL
// payload, not as customFields entries. Never treated as customFields
// (STANDARD_FIELDS just excludes them from buildCustomFields); whether
// they're actually sent on UPDATE is decided explicitly in the POST
// handler below (name/email/phone: only when empty on the contact,
// lib/ghl-identity.ts and lib/ghl-join-keys.ts phoneOnMatch).
const STANDARD_FIELDS = new Set<string>([
  "first_name",
  "last_name",
  "full_name",
  "email",
  "phone",
]);

interface LeadBody {
  first_name?: string;
  last_name?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  form_source?: string;
  form_intent_type?: string;
  visitor_source_recent?: string;
  note?: string;
  form_consent_sms?: boolean;
  [key: string]: unknown;
}

function buildCustomFields(body: LeadBody, mode: "create" | "update") {
  const out: Array<{ key: string; field_value: string | boolean | string[] }> = [];
  for (const [key, raw] of Object.entries(body)) {
    if (raw === undefined || raw === null || raw === "") continue;
    if (STANDARD_FIELDS.has(key)) continue;
    if (SPAM_META_KEYS.has(key)) continue; // honeypot / fill-time, never a GHL field
    if (key === "note") continue; // handled separately via the Notes API
    if (key === "tracking_opt_out") continue; // a request flag, never a GHL field
    // visitor_id must be the Click Track V2 pixel's `_ct_vid` UUID.
    if (key === "visitor_id" && !isCtVisitorId(raw)) continue;

    if (mode === "update") {
      if (LOCKED_FIELD_KEYS.has(key)) continue;
      if (WRITE_ONCE_FIELD_KEYS.has(key)) continue;
    }

    let value: string | boolean | string[];
    if (typeof raw === "boolean") value = raw;
    else if (Array.isArray(raw)) value = raw.map(String);
    else value = String(raw);

    out.push({ key, field_value: value });
  }
  return out;
}

async function ghlFetch(path: string, init: RequestInit, pit: string) {
  return fetch(`${GHL_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${pit}`,
      Version: API_VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init.headers || {}),
    },
  });
}

/**
 * Append tags to an existing contact via the dedicated /tags endpoint.
 * Idempotent. Critically, this does NOT replace existing tags — a PUT to
 * /contacts/{id} with a `tags` body would, destroying tag history.
 */
async function appendTags(contactId: string, tags: string[], pit: string) {
  if (tags.length === 0) return;
  const res = await ghlFetch(
    `/contacts/${contactId}/tags`,
    { method: "POST", body: JSON.stringify({ tags }) },
    pit
  );
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Tag append failed (HTTP ${res.status}): ${detail}`);
  }
}

/**
 * Adds one new note with this submission's details. APPEND ONLY: it never
 * lists, edits or deletes the contact's existing notes, which may be staff
 * notes (David, 2026-10-02). Called once per submission, after any retry of
 * the contact write, so a retry never adds a second note. Best-effort —
 * logged on failure but never blocks the overall success response.
 */
async function addSubmissionNote(contactId: string, body: string, pit: string) {
  if (!body) return;
  // Never retried: a note POST that failed or timed out may still have
  // landed, and a retry would add a second copy (David, 2026-10-03).
  try {
    const res = await ghlFetch(
      `/contacts/${contactId}/notes`,
      { method: "POST", body: JSON.stringify({ body }) },
      pit
    );
    if (!res.ok) {
      // Status only: the response body can echo the note, i.e. the lead's message.
      console.error(`[lead] note post failed (HTTP ${res.status})`);
    }
  } catch (err) {
    console.error(`[lead] note post failed (${err instanceof Error ? err.name : "network"})`);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept so call sites document what failed
function jsonError(status: number, message: string, extra?: unknown) {
  // Status and message only: `extra` can carry the GHL response body, which
  // can echo the lead's details back.
  console.error(`[lead] ${status} ${message}`);
  // Never `extra` in the response either: a GHL error body can carry the
  // lead's details or another contact's id.
  return Response.json({ ok: false, error: message }, { status });
}

export async function POST(request: NextRequest) {
  const PIT = process.env.GHL_PIT;
  const LOCATION_ID = process.env.GHL_LOCATION_ID;
  if (!PIT || !LOCATION_ID) {
    // Never fake success here — a missing token must be loud, not a silent
    // {ok:true} that hides a total outage indefinitely.
    return jsonError(500, "Server misconfigured: GHL_PIT or GHL_LOCATION_ID env var is missing.");
  }

  let body: LeadBody;
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return jsonError(400, "Invalid JSON body");
  }

  if (!body || typeof body !== "object") {
    return jsonError(400, "Invalid JSON body");
  }

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

  // Phone is optional (David, 2026-10-03): a lead needs an email or a phone
  // with digits. A phone that IS given still needs SMS consent (below).
  const hasEmail = typeof body.email === "string" && body.email.trim() !== "";
  const hasPhone = typeof body.phone === "string" && /\d/.test(body.phone);
  if (!hasEmail && !hasPhone) {
    return jsonError(400, "email or phone is required");
  }
  if (!hasEmail) delete body.email;

  // A2P 10DLC: every phone-collecting form on this site requires SMS
  // consent before submission is allowed client-side. Enforce it
  // server-side too, defensively.
  if (body.phone && body.form_consent_sms !== true) {
    return jsonError(400, "SMS consent is required when a phone number is provided");
  }

  const nowIso = new Date().toISOString();
  const formSource = String(body.form_source || "unknown");
  const channelTag = body.visitor_source_recent
    ? `channel:${String(body.visitor_source_recent).toLowerCase().replace(/\s+/g, "-")}`
    : null;
  const noteText = typeof body.note === "string" ? body.note : "";

  try {
    let contactId: string | null = null;
    let created = false;

    // A failed lookup throws GhlLookupError (-> 502 below, nothing created):
    // it is never treated as "no contact".
    let matchedBy: "email" | "phone" | null = null;
    if (body.email) {
      contactId = await lookupDuplicate("email", body.email, PIT, LOCATION_ID);
      if (contactId) matchedBy = "email";
    }
    // No email submitted: look the contact up by phone (`number`, as HighLevel
    // documents it). With an email, a phone match is never used: it may be
    // another person (a household), and their contact must not be overwritten.
    if (!contactId && !body.email && body.phone) {
      contactId = await lookupDuplicate("number", String(body.phone), PIT, LOCATION_ID);
      if (contactId) matchedBy = "phone";
    }

    if (contactId) {
      // ── EXISTING CONTACT — latest wins on qualification, true first-touch
      // attribution + SMS consent record still preserved. Name, email
      // (David, 2026-10-02) and phone (David, 2026-10-03) are never
      // overwritten: only filled when the contact has them empty, and not
      // sent at all when the contact can't be read ──
      const existing = await getContactIdentity(contactId, PIT);
      const identityFill = fillEmptyIdentity(body, existing);
      const nameMismatch = namesClearlyDiffer(body, existing);
      const phoneRule = phoneOnMatch(body.phone, existing);
      const recentCustomFields = [
        ...buildCustomFields(body, "update"),
        // visitor_id / ga_client_id: only when the contact has none yet.
        ...(await fillIfEmptyFields(buildCustomFields(body, "create"), contactId, PIT, LOCATION_ID)),
      ];
      // form_last_submitted_at is server-authoritative (never trust client
      // clock) and always updates, so staff can see the most recent touch.
      recentCustomFields.push({ key: "form_last_submitted_at", field_value: nowIso });

      const updatePayload: Record<string, unknown> = {
        customFields: recentCustomFields,
        // firstName / lastName / name / email only where the contact has none.
        ...identityFill,
        // Intentionally NO tags — handled by appendTags below
      };
      if (phoneRule.fill) updatePayload.phone = phoneRule.fill;

      const updateRes = await ghlFetch(
        `/contacts/${contactId}`,
        { method: "PUT", body: JSON.stringify(updatePayload) },
        PIT
      );
      let phoneConflict = false;
      let otherContactId: string | null = null;
      if (!updateRes.ok) {
        const detail = await updateRes.text();
        // The contact was matched by email, but the submitted phone already
        // belongs to a DIFFERENT contact (e.g. two people in one household),
        // and this location refuses duplicate phones. Store the lead anyway:
        // retry without the phone, then flag the conflict for the team.
        const retried =
          "phone" in updatePayload && isDuplicatePhoneRejection(updateRes.status, detail)
            ? await ghlFetch(
                `/contacts/${contactId}`,
                { method: "PUT", body: JSON.stringify({ ...updatePayload, phone: undefined }) },
                PIT
              )
            : null;
        if (!retried?.ok) {
          const failed = retried ?? updateRes;
          const failedDetail = retried ? await retried.text() : detail;
          return jsonError(502, `GHL update failed (HTTP ${failed.status})`, failedDetail);
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
      await appendTags(contactId, tagsToAppend, PIT);
      // One note per submission: the identity lines go into it. A phone-only
      // match always records the typed name; any match does when the name
      // clearly differs.
      const identityLines = [
        matchedBy === "phone" || nameMismatch ? `Form submitted as: ${submittedName(body)}` : null,
        phoneRule.mismatch ? `Form submitted with phone: ${String(body.phone).trim()}` : null,
      ].filter(Boolean);
      await addSubmissionNote(
        contactId,
        [identityLines.join("\n"), noteText].filter(Boolean).join("\n\n"),
        PIT
      );
      if (phoneConflict) {
        await addPhoneConflictNote(contactId, String(body.phone), otherContactId, PIT);
      }
    } else {
      // ── NEW CONTACT — write full first-touch payload ────────────────
      const customFields = buildCustomFields(body, "create");
      customFields.push(
        { key: "form_first_submitted_at", field_value: nowIso },
        { key: "form_last_submitted_at", field_value: nowIso }
      );

      const createPayload = {
        locationId: LOCATION_ID,
        type: "Lead",
        firstName: body.first_name || undefined,
        lastName: body.last_name || undefined,
        name: body.full_name || undefined,
        email: body.email || undefined,
        phone: body.phone || undefined,
        source: formSource,
        customFields,
        tags: [
          `form:${formSource}`,
          ...(channelTag ? [channelTag] : []),
          // Canonical CTM baseline tag — downstream GHL workflows trigger on it.
          "website contact form submitted",
        ],
      };
      const createRes = await ghlFetch(
        `/contacts/`,
        { method: "POST", body: JSON.stringify(createPayload) },
        PIT
      );
      let createOk: Response = createRes;
      let createPhoneConflict = false;
      let createConflictWith: string | null = null;
      if (!createRes.ok) {
        const detail = await createRes.text();
        // New email, but the phone already belongs to another contact and this
        // location refuses duplicate phones. Store the lead as its own contact
        // without the phone, tag it phone-conflict and note the typed number.
        const retried =
          body.email && body.phone && isDuplicatePhoneRejection(createRes.status, detail)
            ? await ghlFetch(
                `/contacts/`,
                {
                  method: "POST",
                  body: JSON.stringify({
                    ...createPayload,
                    phone: undefined,
                    tags: [...createPayload.tags, PHONE_CONFLICT_TAG],
                  }),
                },
                PIT,
              )
            : null;
        if (!retried?.ok) {
          const failed = retried ?? createRes;
          return jsonError(502, `GHL create failed (HTTP ${failed.status})`);
        }
        createOk = retried;
        createPhoneConflict = true;
        createConflictWith = duplicatePhoneContactId(detail);
      }
      const createdJson = (await createOk.json()) as { contact?: { id: string }; id?: string };
      contactId = createdJson.contact?.id || createdJson.id || null;
      created = true;
      if (contactId && createPhoneConflict) {
        // No contact details in the log — the ids are enough to find it.
        console.warn("[lead] created without its phone: the phone belongs to another contact", {
          contactId,
          otherContactId: createConflictWith,
        });
      }

      if (contactId) await addSubmissionNote(contactId, noteText, PIT);
      if (contactId && createPhoneConflict) {
        await addPhoneConflictNote(contactId, String(body.phone), createConflictWith, PIT);
      }
    }

    return Response.json({ ok: true, contactId, created, form_source: formSource });
  } catch (err) {
    // A failed lookup is not "no contact": 502 (the form shows the call-us
    // error) and nothing is created. Status / error class only.
    if (err instanceof GhlLookupError) return jsonError(502, `GHL contact lookup failed (${err.reason})`);
    return jsonError(
      500,
      "Lead handler exception",
      err instanceof Error ? err.message : String(err)
    );
  }
}
