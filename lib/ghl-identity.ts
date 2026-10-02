/**
 * Identity on a matched HighLevel contact (David, 2026-10-02).
 *
 * When the lead route finds an EXISTING contact (by email, or by phone when no
 * email was submitted):
 *
 *  - The contact's first name, last name, full name and email are never
 *    changed. Each is filled only when the contact has it empty. The name
 *    counts as one field: it is filled only when the contact has no name at
 *    all, so a typed name is never spliced onto someone else's.
 *  - On a phone-only match the route also adds ONE new note
 *    "Form submitted as: <submitted name>" (notes are append-only: POST only,
 *    never DELETE, PUT or PATCH), and the tag "name-mismatch" when the typed
 *    name clearly differs from the contact's.
 *
 * Mirrors the launch-system lead API template (skills/peoplelytics-lead-api).
 * Field values and the token are never logged.
 */

const GHL_API = "https://services.leadconnectorhq.com";
const API_VERSION = "2021-07-28";

/** Tag on a phone-matched contact whose typed name clearly differs from its own. */
export const NAME_MISMATCH_TAG = "name-mismatch";

export interface ContactIdentity {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
}

export interface SubmittedIdentity {
  first_name?: unknown;
  last_name?: unknown;
  full_name?: unknown;
  email?: unknown;
}

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

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/** The matched contact's identity fields, or null when it cannot be read. */
export async function getContactIdentity(contactId: string, pit: string): Promise<ContactIdentity | null> {
  try {
    const res = await ghlRequest(`/contacts/${encodeURIComponent(contactId)}`, { method: "GET" }, pit);
    if (!res.ok) {
      console.warn("GHL contact read failed; identity not filled", { contactId, status: res.status });
      return null;
    }
    const c = ((await res.json()) as { contact?: Record<string, unknown> } | null)?.contact;
    if (!c || typeof c !== "object") return null;
    return {
      firstName: str(c.firstName),
      lastName: str(c.lastName),
      name: str(c.name ?? c.contactName),
      email: str(c.email),
    };
  } catch {
    return null;
  }
}

/**
 * The identity fields this update may write: only those EMPTY on the contact.
 * An unreadable contact (null) writes nothing.
 */
export function fillEmptyIdentity(
  body: SubmittedIdentity,
  existing: ContactIdentity | null,
): { firstName?: string; lastName?: string; name?: string; email?: string } {
  if (!existing) return {};
  const out: { firstName?: string; lastName?: string; name?: string; email?: string } = {};
  if (!existing.firstName && !existing.lastName && !existing.name) {
    if (str(body.first_name)) out.firstName = str(body.first_name);
    if (str(body.last_name)) out.lastName = str(body.last_name);
    if (!out.firstName && !out.lastName && str(body.full_name)) out.name = str(body.full_name);
  }
  if (!existing.email && str(body.email)) out.email = str(body.email);
  return out;
}

function normName(x: unknown): string {
  return String(x ?? "")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function nameParts(first: unknown, last: unknown, full: unknown): { first: string; last: string } {
  const f = normName(first);
  const l = normName(last);
  if (f || l) return { first: f, last: l };
  const [head = "", ...rest] = normName(full).split(" ");
  return { first: head, last: rest.join(" ") };
}

/**
 * True when the typed name CLEARLY differs from the contact's. Case, accents,
 * punctuation and extra spaces are ignored and first+last are compared. When
 * either side has only a first name, only first names are compared. A missing
 * name on either side (or an unreadable contact) is not a mismatch.
 */
export function namesClearlyDiffer(body: SubmittedIdentity, existing: ContactIdentity | null): boolean {
  if (!existing) return false;
  const a = nameParts(body.first_name, body.last_name, body.full_name);
  const b = nameParts(existing.firstName, existing.lastName, existing.name);
  if ((!a.first && !a.last) || (!b.first && !b.last)) return false;
  const squash = (s: string) => s.replace(/\s/g, "");
  if (squash(a.first + a.last) === squash(b.first + b.last)) return false;
  if (!a.last || !b.last) return squash(a.first) !== squash(b.first);
  return true;
}

/** The name as the visitor typed it, for the "Form submitted as" note. */
export function submittedName(body: SubmittedIdentity): string {
  return (
    str(body.full_name) ||
    [str(body.first_name), str(body.last_name)].filter(Boolean).join(" ") ||
    "(no name given)"
  );
}

/**
 * Phone-only match: the contact's own name is never changed, so leave the team
 * the name the visitor typed. Always a NEW note (POST); notes are append-only.
 * Non-fatal: the lead is already stored, so a failure is only logged.
 */
export async function addFormSubmittedAsNote(contactId: string, name: string, pit: string): Promise<void> {
  try {
    const res = await ghlRequest(
      `/contacts/${encodeURIComponent(contactId)}/notes`,
      { method: "POST", body: JSON.stringify({ body: `Form submitted as: ${name}` }) },
      pit,
    );
    if (!res.ok) console.warn("GHL form-submitted-as note failed", { contactId, status: res.status });
  } catch {
    console.warn("GHL form-submitted-as note failed", { contactId });
  }
}
