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
 *  - On a phone-only match the submission's one note carries the line
 *    "Form submitted as: <submitted name>". On ANY match (email or phone)
 *    where the typed name clearly differs from the contact's, that line is
 *    added too, with the tag "name-mismatch" (David, 2026-10-03). Notes are
 *    append-only: POST only, never DELETE, PUT or PATCH.
 *  - The same read returns the contact's phone, which is never overwritten
 *    either (lib/ghl-join-keys.ts phoneOnMatch). An unreadable contact gets
 *    no name, email or phone written.
 *
 * Mirrors the launch-system lead API template (skills/peoplelytics-lead-api).
 * Field values and the token are never logged.
 */

const GHL_API = "https://services.leadconnectorhq.com";
const API_VERSION = "2021-07-28";

/** Tag on a matched contact whose typed name clearly differs from its own. */
export const NAME_MISMATCH_TAG = "name-mismatch";

export interface ContactIdentity {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
}

export interface SubmittedIdentity {
  first_name?: unknown;
  last_name?: unknown;
  full_name?: unknown;
  email?: unknown;
}

const GHL_TIMEOUT_MS = 10_000;

async function ghlRequest(path: string, init: RequestInit, pit: string): Promise<Response> {
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

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/** The matched contact's identity fields and phone, or null when it cannot be read. */
export async function getContactIdentity(contactId: string, pit: string): Promise<ContactIdentity | null> {
  if (!/^[A-Za-z0-9]{1,64}$/.test(contactId)) return null;
  try {
    const res = await ghlRequest(`/contacts/${encodeURIComponent(contactId)}`, { method: "GET" }, pit);
    if (!res.ok) {
      console.warn("GHL contact read failed; name, email and phone not filled", { contactId, status: res.status });
      return null;
    }
    const c = ((await res.json()) as { contact?: Record<string, unknown> } | null)?.contact;
    if (!c || typeof c !== "object") return null;
    return {
      firstName: str(c.firstName),
      lastName: str(c.lastName),
      name: str(c.name ?? c.contactName),
      email: str(c.email),
      phone: str(c.phone),
    };
  } catch {
    console.warn("GHL contact read failed; name, email and phone not filled", { contactId });
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
