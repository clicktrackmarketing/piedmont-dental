/**
 * HighLevel helpers for the CTM client tracking and lead capture standard,
 * used by app/api/lead/route.ts. Copied from the San Diego Solar lead API
 * (src/lib/ghl-lead-api.ts, PRs #37, #40 and #41).
 *
 *  - visitor_id validation: only the Click Track V2 pixel's `_ct_vid` UUID.
 *  - Fill-if-empty: visitor_id and ga_client_id on a returning contact.
 *  - Duplicate phone: recognising HighLevel's duplicate-phone rejection, and
 *    the note left for the team when the phone is held back.
 *
 * Kept out of route.ts because a Next.js route file may only export route
 * handlers, and the field-id cache needs a test hook.
 *
 * Field values and the token are never logged.
 */

const GHL_API = "https://services.leadconnectorhq.com";
const API_VERSION = "2021-07-28";

export type CustomField = { key: string; field_value: string | boolean | string[] };

async function ghlRequest(path: string, init: RequestInit, pit: string): Promise<Response> {
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

// ── visitor_id ────────────────────────────────────────────────────────

const CT_VISITOR_ID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * visitor_id must be the Click Track V2 pixel's `_ct_vid` UUID. Anything else
 * (an empty string, a hand-edited payload, another vendor's id) is dropped
 * rather than written into a LOCKED join key.
 */
export function isCtVisitorId(v: unknown): v is string {
  return typeof v === "string" && CT_VISITOR_ID_RE.test(v);
}

// ── Fill-if-empty join keys ───────────────────────────────────────────

/**
 * FILL-IF-EMPTY — LOCKED join keys that a returning contact may still RECEIVE.
 *
 * A contact created before the site sent these (or whose first visit had no
 * consent) would otherwise never get one. On UPDATE they are written only when
 * the contact's current value is EMPTY, never overwritten, so first touch
 * still wins (David, 2026-10-01).
 *
 * GHL returns a contact's custom fields as { id, value } with no key, so the
 * field ids come from GET /locations/{id}/customFields — the token's "View
 * Custom Fields" scope (locations/customFields.readonly) — cached per server
 * instance. Every failure falls back to create-only, so nothing is ever
 * overwritten: no scope / lookup error, a key not provisioned on the
 * location, or a failed contact read all mean "don't write".
 *
 * gbraid_captured / wbraid_captured are deliberately NOT here: they record
 * which ad click first brought the contact, and filling one in later would
 * credit a later click as first touch.
 */
export const FILL_IF_EMPTY_KEYS = new Set<string>(["visitor_id", "ga_client_id"]);

/** A failed field lookup is retried after this long, not on every lead. */
const FIELD_ID_FAILURE_TTL_MS = 10 * 60_000;

type FieldIdCacheEntry = { ok: true; ids: Map<string, string> } | { ok: false; until: number };
const fieldIdCache = new Map<string, FieldIdCacheEntry>();

/** Test hook: the cache lives for the server instance. */
export function resetFieldIdCache(): void {
  fieldIdCache.clear();
}

/** key → field id for FILL_IF_EMPTY_KEYS, or null when it can't be read. */
async function fillFieldIds(pit: string, locationId: string): Promise<Map<string, string> | null> {
  const cached = fieldIdCache.get(locationId);
  if (cached?.ok) return cached.ids;
  if (cached && Date.now() < cached.until) return null;

  let res: Response;
  try {
    res = await ghlRequest(
      `/locations/${encodeURIComponent(locationId)}/customFields?model=contact`,
      { method: "GET" },
      pit
    );
  } catch {
    res = new Response(null, { status: 599 });
  }
  if (!res.ok) {
    // Status only. 401/403 here means the token lacks View Custom Fields.
    console.warn("GHL custom field lookup unavailable; join keys stay create-only", {
      status: res.status,
    });
    fieldIdCache.set(locationId, { ok: false, until: Date.now() + FIELD_ID_FAILURE_TTL_MS });
    return null;
  }
  const json = (await res.json().catch(() => null)) as {
    customFields?: Array<{ id?: string; fieldKey?: string }>;
  } | null;
  if (!Array.isArray(json?.customFields)) {
    // A body we don't understand is a failure, not "no fields": cached as a
    // failure so it is retried later instead of disabling the fill for good.
    console.warn("GHL custom field lookup unreadable; join keys stay create-only");
    fieldIdCache.set(locationId, { ok: false, until: Date.now() + FIELD_ID_FAILURE_TTL_MS });
    return null;
  }
  const ids = new Map<string, string>();
  for (const f of json.customFields) {
    if (!f || typeof f !== "object") continue;
    // fieldKey looks like "contact.visitor_id".
    const key = (f.fieldKey ?? "").replace(/^contact\./, "");
    if (f.id && FILL_IF_EMPTY_KEYS.has(key)) ids.set(key, f.id);
  }
  fieldIdCache.set(locationId, { ok: true, ids });
  return ids;
}

function isEmptyValue(v: unknown): boolean {
  return (
    v === undefined ||
    v === null ||
    (typeof v === "string" && v.trim() === "") ||
    (Array.isArray(v) && v.length === 0)
  );
}

/**
 * The join-key fields from this submission that are empty on the existing
 * contact, and so may be written. [] on any doubt.
 *
 * `createFields` is the submission's custom fields built as for a CREATE (so
 * with the same validation: UUID-only visitor_id, no empty values).
 */
async function fillIfEmptyFieldsUnchecked(
  createFields: CustomField[],
  contactId: string,
  pit: string,
  locationId: string
): Promise<CustomField[]> {
  const candidates = createFields.filter((f) => FILL_IF_EMPTY_KEYS.has(f.key));
  if (candidates.length === 0) return [];
  const ids = await fillFieldIds(pit, locationId);
  if (!ids) return [];
  const known = candidates.filter((f) => ids.has(f.key));
  if (known.length === 0) return [];

  let res: Response;
  try {
    res = await ghlRequest(`/contacts/${encodeURIComponent(contactId)}`, { method: "GET" }, pit);
  } catch {
    return [];
  }
  if (!res.ok) {
    console.warn("GHL contact read failed; join keys not filled", { contactId, status: res.status });
    return [];
  }
  const json = (await res.json().catch(() => null)) as {
    contact?: { customFields?: Array<{ id?: string; value?: unknown }> };
  } | null;
  const current = json?.contact?.customFields;
  // No customFields array at all is a response we don't understand, not
  // proof the fields are empty.
  if (!Array.isArray(current)) return [];
  return known.filter((f) => isEmptyValue(current.find((c) => c?.id === ids.get(f.key))?.value));
}

/**
 * The join-key fields that may be written on this update ([] on any doubt).
 * Never throws: an unexpected HighLevel response must not fail the lead.
 */
export async function fillIfEmptyFields(
  createFields: CustomField[],
  contactId: string,
  pit: string,
  locationId: string,
): Promise<CustomField[]> {
  try {
    return await fillIfEmptyFieldsUnchecked(createFields, contactId, pit, locationId);
  } catch {
    console.warn("GHL join key fill skipped: unexpected response; join keys stay create-only");
    return [];
  }
}

// ── Duplicate phone ───────────────────────────────────────────────────

/** Tag on a contact whose submitted phone was held back (see addPhoneConflictNote). */
export const PHONE_CONFLICT_TAG = "phone-conflict";

/**
 * GHL's answer when a PUT would give this contact a phone another contact
 * already has, in a location set to refuse duplicates:
 *   400 {"message":"This location does not allow duplicated contacts.",
 *        "meta":{"contactId":"<other>","matchingField":"phone"}}
 */
function parseDuplicateRejection(detail: string): { matchingField?: string; contactId?: string } | null {
  try {
    const json = JSON.parse(detail) as {
      message?: string;
      meta?: { matchingField?: string; contactId?: string };
    };
    if (!/duplicated contacts/i.test(json.message ?? "")) return null;
    return json.meta ?? {};
  } catch {
    return null;
  }
}

export function isDuplicatePhoneRejection(status: number, detail: string): boolean {
  return status === 400 && parseDuplicateRejection(detail)?.matchingField === "phone";
}

export function duplicatePhoneContactId(detail: string): string | null {
  return parseDuplicateRejection(detail)?.contactId ?? null;
}

/**
 * Leaves the team a note on the contact with the phone the visitor typed, so
 * the number is not lost when GHL refused it. Non-fatal: the lead is already
 * stored, so a failure is only logged (status only).
 */
export async function addPhoneConflictNote(
  contactId: string,
  phone: string,
  otherContactId: string | null,
  pit: string
): Promise<void> {
  try {
    const res = await ghlRequest(
      `/contacts/${encodeURIComponent(contactId)}/notes`,
      {
        method: "POST",
        body: JSON.stringify({
          body:
            `Website form: the visitor entered phone ${phone}, which already belongs to another ` +
            `contact${otherContactId ? ` (${otherContactId})` : ""}. The phone was not saved on ` +
            `this contact. Check whether they are the same person or one household.`,
        }),
      },
      pit
    );
    if (!res.ok) console.warn("GHL phone conflict note failed", { contactId, status: res.status });
  } catch {
    console.warn("GHL phone conflict note failed", { contactId });
  }
}

// ── Contact lookup (David, 2026-10-03) ────────────────────────────────

/**
 * A HighLevel contact lookup that could not give an answer. It is NOT "no
 * contact": treating it as one would create a duplicate of a returning
 * visitor. The route answers 502 and creates nothing. Carries only the HTTP
 * status or error class, never a response body.
 */
export class GhlLookupError extends Error {
  readonly reason: string;
  constructor(reason: string) {
    super(`GHL lookup failed (${reason})`);
    this.name = "GhlLookupError";
    this.reason = reason;
  }
}

const LOOKUP_RETRY_DELAYS_MS = [250, 750];
let sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** Test hook: no real waiting in the offline tests. */
export function setLookupSleep(fn: (ms: number) => Promise<void>): void {
  sleep = fn;
}

/**
 * GET /contacts/search/duplicate (a safe read, so it may be retried: up to 2
 * retries with a short backoff on 429, 5xx or a network error).
 *   200 with a contact → its id;  200 without one, or 404 → null (no match);
 *   anything else, a bad body, or still failing after the retries → throws
 *   GhlLookupError.
 */
export async function lookupDuplicate(
  param: "email" | "number",
  value: string,
  pit: string,
  locationId: string,
): Promise<string | null> {
  const url = `/contacts/search/duplicate?locationId=${encodeURIComponent(locationId)}&${param}=${encodeURIComponent(value)}`;
  let reason = "unknown";
  for (let attempt = 0; attempt <= LOOKUP_RETRY_DELAYS_MS.length; attempt++) {
    if (attempt > 0) await sleep(LOOKUP_RETRY_DELAYS_MS[attempt - 1]);
    let res: Response;
    try {
      res = await ghlRequest(url, { method: "GET" }, pit);
    } catch (err) {
      reason = err instanceof Error ? err.name : "network";
      continue;
    }
    if (res.status === 404) return null;
    if (res.status === 200) {
      let json: unknown;
      try {
        json = await res.json();
      } catch {
        throw new GhlLookupError("bad-json");
      }
      if (!json || typeof json !== "object") throw new GhlLookupError("bad-json");
      const id = (json as { contact?: { id?: unknown } | null }).contact?.id;
      return typeof id === "string" && id ? id : null;
    }
    reason = `HTTP ${res.status}`;
    if (res.status !== 429 && res.status < 500) break;
  }
  throw new GhlLookupError(reason);
}

// ── Phone on a matched contact (David, 2026-10-03) ────────────────────

/**
 * Phone digits for comparison: non-digits stripped, and an 11-digit number
 * starting with 1 compared as its last 10 digits.
 */
export function phoneDigits(phone: unknown): string {
  const d = String(phone ?? "").replace(/\D/g, "");
  return d.length === 11 && d.startsWith("1") ? d.slice(1) : d;
}

/** Tag on a matched contact whose submitted phone differs from the one it has. */
export const PHONE_MISMATCH_TAG = "phone-mismatch";

/**
 * A matched contact's existing phone is never overwritten.
 *   - contact unreadable (null) → nothing is sent (never overwrite blind);
 *   - contact has no phone → fill it with the submitted one;
 *   - contact has a different phone → not sent; note line + phone-mismatch tag;
 *   - same digits → nothing to do.
 */
export function phoneOnMatch(
  submitted: unknown,
  contact: { phone: string } | null,
): { fill: string | null; mismatch: boolean } {
  const typed = typeof submitted === "string" ? submitted.trim() : "";
  if (!typed || !phoneDigits(typed) || !contact) return { fill: null, mismatch: false };
  const have = phoneDigits(contact.phone);
  if (!have) return { fill: typed, mismatch: false };
  if (have === phoneDigits(typed)) return { fill: null, mismatch: false };
  return { fill: null, mismatch: true };
}

// ── Tracking opt-out (David, 2026-10-03) ──────────────────────────────

/** Join keys (and their aliases) never written for an opted-out visitor. */
const OPT_OUT_KEYS = ["visitor_id", "ga_client_id", "ct_visitor_id", "ga_cid"];

/**
 * True when the visitor opted out of tracking: the browser said so
 * (`tracking_opt_out: true`, from lib/attribution.ts isTrackingOptedOut) or
 * the request carries Global Privacy Control (`Sec-GPC: 1`).
 */
export function trackingOptedOut(request: Request, body: Record<string, unknown>): boolean {
  return body.tracking_opt_out === true || request.headers.get("sec-gpc") === "1";
}

/** A copy of `obj` without the visitor_id / ga_client_id join keys. */
export function withoutJoinKeys<T extends Record<string, unknown>>(obj: T): T {
  const rest: Record<string, unknown> = { ...obj };
  for (const k of OPT_OUT_KEYS) delete rest[k];
  return rest as T;
}
