/**
 * Spam screening for POST /api/lead — four keyless layers, run in order:
 *
 *   1. Origin check   — the request must come from this site's own pages.
 *                       Direct-to-API bots (curl, scripts) send no Origin/
 *                       Referer or a foreign one → 403.
 *   2. Honeypot       — a visually hidden `company_website` input that real
 *                       users never see or fill. Bots auto-fill every field
 *                       → pretend success, write nothing.
 *   3. Time-to-submit — the form reports how long it took to fill. Nothing
 *                       real is filled in under MIN_FILL_MS → pretend
 *                       success, write nothing.
 *   4. Content        — gibberish names ("Ulfcpvs Tlgqrb"), digit-only
 *                       messages ("5685694956"), URLs in name/message
 *                       → 400 with a "please call us" message so a rare
 *                       false positive still has a path to reach the office.
 *
 * Layers 2 + 3 answer with a fake {ok:true} so the bot has no signal to
 * adapt to; the client only fires its GA4 generate_lead event when a real
 * contactId comes back, so filtered hits don't pollute conversion counts.
 *
 * Deliberately no per-IP rate limit here — the client was worried about a
 * burst of genuine submissions from one office/network being throttled.
 */

import type { NextRequest } from "next/server";

import { FILL_MS_FIELD, HONEYPOT_FIELD } from "@/lib/spam-guard-fields";

export { FILL_MS_FIELD, HONEYPOT_FIELD };
export const MIN_FILL_MS = 3000;

/** Keys that are spam-guard metadata, never forwarded to GHL as customFields. */
export const SPAM_META_KEYS = new Set<string>([HONEYPOT_FIELD, FILL_MS_FIELD]);

export type SpamVerdict =
  | { kind: "ok" }
  | { kind: "silent"; reason: string }
  | { kind: "reject"; reason: string; status: number; message: string };

const OK: SpamVerdict = { kind: "ok" };
const silent = (reason: string): SpamVerdict => ({ kind: "silent", reason });
const reject = (status: number, reason: string, message: string): SpamVerdict => ({
  kind: "reject",
  reason,
  status,
  message,
});

const REJECT_MESSAGE =
  "We couldn't send that message. Please call us at (510) 350-3937 or email info@piedmontdentalbydesign.com.";

// ── 1. Origin ─────────────────────────────────────────────────────────

function hostOf(url: string | null): string | null {
  if (!url) return null;
  try {
    return new URL(url).host.toLowerCase();
  } catch {
    return null;
  }
}

function allowedHosts(request: NextRequest): Set<string> {
  const hosts = new Set<string>();
  const add = (h: string | null | undefined) => {
    if (!h) return;
    const host = h.toLowerCase();
    hosts.add(host);
    // Accept both apex and www so a redirect config change can't lock the form.
    hosts.add(host.startsWith("www.") ? host.slice(4) : `www.${host}`);
  };
  add(request.headers.get("x-forwarded-host"));
  add(request.headers.get("host"));
  add(hostOf(process.env.SITE_URL || null));
  return hosts;
}

export function checkOrigin(request: NextRequest): SpamVerdict {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const sourceHost = hostOf(origin) ?? hostOf(referer);
  if (!sourceHost) return reject(403, "no origin/referer header", REJECT_MESSAGE);
  if (!allowedHosts(request).has(sourceHost)) {
    return reject(403, `foreign origin ${sourceHost}`, REJECT_MESSAGE);
  }
  return OK;
}

// ── 2. Honeypot ───────────────────────────────────────────────────────

export function checkHoneypot(body: Record<string, unknown>): SpamVerdict {
  const value = body[HONEYPOT_FIELD];
  if (typeof value === "string" && value.trim() !== "") return silent("honeypot filled");
  if (value !== undefined && value !== null && typeof value !== "string") {
    return silent("honeypot non-string");
  }
  return OK;
}

// ── 3. Time-to-submit ─────────────────────────────────────────────────

export function checkFillTime(body: Record<string, unknown>): SpamVerdict {
  const raw = body[FILL_MS_FIELD];
  const fillMs = typeof raw === "number" ? raw : Number(raw);
  if (!Number.isFinite(fillMs)) return silent("missing form_fill_ms");
  if (fillMs < MIN_FILL_MS) return silent(`filled in ${Math.round(fillMs)}ms`);
  return OK;
}

// ── 4. Content heuristics ─────────────────────────────────────────────

// 5+ consonants in a row never happens in real Latin-script names
// ("Schmidt" is 4), but is the signature of the letter-shifted gibberish
// this bot generates ("Ulfcpvs", "Tlgqrb").
const CONSONANT_RUN = /[b-df-hj-np-tv-xz]{5,}/i;
const HAS_VOWEL = /[aeiouy]/i;
const URL_RE = /(https?:\/\/|www\.)/i;
// A "message" that is nothing but a number (phone-shaped or otherwise).
const DIGITS_ONLY = /^[\d\s().+-]{6,}$/;

export function nameLooksFake(name: string): string | null {
  const n = name.trim();
  if (!n) return null;
  if (/\d/.test(n)) return "name contains digits";
  if (URL_RE.test(n)) return "name contains url";
  if (CONSONANT_RUN.test(n)) return "name has 5+ consonant run";
  for (const word of n.split(/\s+/)) {
    const letters = word.replace(/[^a-z]/gi, "");
    if (letters.length >= 4 && !HAS_VOWEL.test(letters)) return "name word has no vowels";
  }
  return null;
}

export function messageLooksFake(message: string): string | null {
  const m = message.trim();
  if (!m) return null;
  if (DIGITS_ONLY.test(m)) return "message is digits only";
  if (URL_RE.test(m)) return "message contains url";
  return null;
}

function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}

export function checkContent(body: Record<string, unknown>): SpamVerdict {
  const names = [str(body.full_name), str(body.first_name), str(body.last_name)];
  for (const name of names) {
    const why = nameLooksFake(name);
    // The reason is logged by the route: never include the submitted value.
    if (why) return reject(400, why, REJECT_MESSAGE);
  }
  const message = str(body.form_message) || str(body.patient_message);
  const why = messageLooksFake(message);
  if (why) return reject(400, why, REJECT_MESSAGE);
  return OK;
}

// ── Runner ────────────────────────────────────────────────────────────

export function screenLead(request: NextRequest, body: Record<string, unknown>): SpamVerdict {
  for (const check of [
    () => checkOrigin(request),
    () => checkHoneypot(body),
    () => checkFillTime(body),
    () => checkContent(body),
  ]) {
    const verdict = check();
    if (verdict.kind !== "ok") return verdict;
  }
  return OK;
}
