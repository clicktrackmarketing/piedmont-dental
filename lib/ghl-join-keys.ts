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
  const ids = new Map<string, string>();
  for (const f of json?.customFields ?? []) {
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
export async function fillIfEmptyFields(
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
  return known.filter((f) => isEmptyValue(current.find((c) => c.id === ids.get(f.key))?.value));
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
            `contact${otherContactId ? ` (${otherContactId})` : ""}. This contact's phone was not ` +
            `changed. Check whether they are the same person or one household.`,
        }),
      },
      pit
    );
    if (!res.ok) console.warn("GHL phone conflict note failed", { contactId, status: res.status });
  } catch {
    console.warn("GHL phone conflict note failed", { contactId });
  }
}
