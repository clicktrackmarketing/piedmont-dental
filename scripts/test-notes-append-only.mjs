#!/usr/bin/env node
/**
 * HighLevel contact notes are APPEND-ONLY (David, 2026-10-02).
 *
 * Our code may only ADD a note: POST /contacts/{id}/notes. It must never
 * delete, overwrite or edit a note: no DELETE, PUT or PATCH on any notes
 * endpoint, and no "delete then re-add". Notes on a contact belong to the
 * client's staff as much as to us.
 *
 * Why: Piedmont Dental's lead route deleted EVERY note on a contact on each
 * resubmission, staff notes included, so it could re-post one fresh summary
 * (fixed in clicktrackmarketing/piedmont-dental#11, 2026-10-02).
 *
 * This file does two things, with no network and no HighLevel token:
 *
 *   1. Static scan. Every source file under the given directories is searched
 *      for a call that sends DELETE, PUT or PATCH to a `/notes` path.
 *
 *   2. Mocked submissions. The lead route is imported with `fetch` replaced by
 *      a fake HighLevel whose contacts already hold a staff note. Every call is
 *      recorded.
 *      2a. Notes: three email submissions (new contact, returning contact, the
 *          same contact again). Fails if any call to a notes endpoint is not a
 *          POST, or a submission does not POST exactly `--notes-per-submission`
 *          notes (default 1: one summary note per lead).
 *      2b. Phone-only match and identity (David, 2026-10-02). A lead with no
 *          email that matches an existing contact by phone must not create a
 *          contact, must not change its name or email (fill only if empty),
 *          must add one new note "Form submitted as: <typed name>" and the tag
 *          "website contact form submitted", and must add "name-mismatch" only
 *          when the typed name clearly differs (case, punctuation and spacing
 *          ignored). A phone-only match updates NO contact field at all, not
 *          even an empty name; only empty visitor_id / ga_client_id may be
 *          filled (rule 8, David 2026-10-03). An email match never overwrites
 *          identity either; empty
 *          name and phone are filled. An email match whose typed name clearly
 *          differs gets the line "Form submitted as: <typed name>" in its one
 *          note and the tag "name-mismatch"; a matching name gets neither
 *          (David, 2026-10-03). `--skip-identity` skips 2b.
 *
 * Nothing here can reach the real HighLevel: fetch is replaced before the route
 * is imported, and any call the fake does not recognise is answered locally.
 *
 * Usage (from the site's repo root, Node 22+):
 *   node --experimental-strip-types scripts/test-notes-append-only.mjs
 *   node --experimental-strip-types scripts/test-notes-append-only.mjs \
 *        --route app/api/lead/route.ts --notes-per-submission 1 [--lead extra-fields.json]
 *        [--phone-match-notes N] [--skip-identity]
 *   node scripts/test-notes-append-only.mjs --static-only --scan <dir> [--scan <dir> ...]
 *
 * The route is found automatically at app/api/lead/route.ts, src/app/api/lead/route.ts
 * or api/lead.ts. Imports through `@/` resolve to the repo root, then src/; add
 * `--alias <prefix>=<dir>` for anything else (repeatable). Extensionless relative
 * imports resolve to .ts/.js. A route that imports a .tsx file or a package that is
 * not installed needs the site's own test runner instead; the assertions below are
 * the ones to copy.
 *
 * Standard: launch-system docs/client-tracking-lead-capture-standard.md, Principle 7.
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, resolve, relative, basename } from "node:path";
import { pathToFileURL } from "node:url";
import { register } from "node:module";

// ── Arguments ───────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
function argValues(name) {
  const out = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === name && argv[i + 1]) out.push(argv[++i]);
    else if (argv[i].startsWith(`${name}=`)) out.push(argv[i].slice(name.length + 1));
  }
  return out;
}
const STATIC_ONLY = argv.includes("--static-only");
const ROOT = resolve(argValues("--root")[0] ?? process.cwd());
const SCAN_DIRS = argValues("--scan");
const ROUTE_ARG = argValues("--route")[0];
const NOTES_PER_SUBMISSION = Number(argValues("--notes-per-submission")[0] ?? "1");
// A phone-only lead matched to an existing contact also gets "Form submitted as:
// <name>"; a site that folds that line into its summary note still posts one.
const PHONE_MATCH_NOTES = Number(argValues("--phone-match-notes")[0] ?? String(Math.max(NOTES_PER_SUBMISSION, 1)));
// For a site route that does not yet match phone-only leads (section 2b).
const SKIP_IDENTITY = argv.includes("--skip-identity");
const ALIASES = [
  ...argValues("--alias").map((a) => {
    const i = a.indexOf("=");
    return [a.slice(0, i), [resolve(ROOT, a.slice(i + 1))]];
  }),
  ["@/", [ROOT, join(ROOT, "src")]],
];

let failures = 0;
const fail = (msg) => {
  failures++;
  console.error(`  ✗ ${msg}`);
};
const pass = (msg) => console.log(`  ✓ ${msg}`);

// ── 1. Static scan ──────────────────────────────────────────────────────────
const SOURCE_EXT = /\.(?:[cm]?[jt]sx?|php|py)$/;
const SKIP_DIRS = new Set(["node_modules", ".git", ".next", "dist", "build", "out", ".vercel", "coverage", "vendor"]);
const SELF = basename(new URL(import.meta.url).pathname);

function* walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    if (e.isDirectory()) {
      if (!SKIP_DIRS.has(e.name)) yield* walk(join(dir, e.name));
    } else if (SOURCE_EXT.test(e.name) && e.name !== SELF) {
      yield join(dir, e.name);
    }
  }
}

/** Index of the "(" that opens the call enclosing `pos`, or -1. */
function enclosingCallStart(src, pos) {
  let depth = 0;
  for (let i = pos; i >= 0 && pos - i < 2000; i--) {
    const c = src[i];
    if (c === ")") depth++;
    else if (c === "(") {
      if (depth === 0) return i;
      depth--;
    }
  }
  return -1;
}

/** Index just past the ")" matching the "(" at `open`. */
function matchingClose(src, open) {
  let depth = 0;
  for (let i = open; i < src.length && i - open < 4000; i++) {
    if (src[i] === "(") depth++;
    else if (src[i] === ")" && --depth === 0) return i + 1;
  }
  return Math.min(src.length, open + 4000);
}

const NOTES_PATH = /\/notes(?![-\w])/g;
const WRITE_METHOD_ARG = /['"`](DELETE|PUT|PATCH)['"`]/i;
const WRITE_METHOD_CALL = /\.(delete|put|patch)\s*$/i;

/** Returns [{ line, method, snippet }] for each DELETE/PUT/PATCH sent to a notes path. */
export function scanSource(src) {
  const hits = [];
  for (const m of src.matchAll(NOTES_PATH)) {
    const open = enclosingCallStart(src, m.index);
    if (open < 0) continue;
    const call = src.slice(open, matchingClose(src, open));
    const callee = src.slice(Math.max(0, open - 20), open);
    const method = call.match(WRITE_METHOD_ARG)?.[1] ?? callee.match(WRITE_METHOD_CALL)?.[1];
    if (!method) continue;
    const line = src.slice(0, m.index).split("\n").length;
    hits.push({ line, method: method.toUpperCase(), snippet: src.split("\n")[line - 1].trim().slice(0, 160) });
  }
  return hits;
}

function staticScan(dirs) {
  console.log(`\nStatic scan: no DELETE, PUT or PATCH to a notes endpoint`);
  let files = 0;
  let found = 0;
  for (const dir of dirs) {
    for (const file of walk(dir)) {
      files++;
      for (const hit of scanSource(readFileSync(file, "utf8"))) {
        found++;
        fail(`${relative(ROOT, file)}:${hit.line}  ${hit.method} on a notes endpoint  →  ${hit.snippet}`);
      }
    }
  }
  if (files === 0) fail(`no source files found under ${dirs.join(", ")} (wrong --scan path?)`);
  else if (found === 0) pass(`${files} source files, no note edits or deletes`);
}

const defaultScanDirs = ["app", "src", "lib", "api", "pages", "server", "functions", "scripts"]
  .map((d) => join(ROOT, d))
  .filter((d) => existsSync(d) && statSync(d).isDirectory());
staticScan(SCAN_DIRS.length ? SCAN_DIRS.map((d) => resolve(ROOT, d)) : defaultScanDirs.length ? defaultScanDirs : [ROOT]);

// ── 2. Mocked submissions ───────────────────────────────────────────────────
const HL_HOST = /leadconnectorhq\.com$|gohighlevel\.com$|msgsndr\.com$/;
const BASELINE_TAG = "website contact form submitted";
const NAME_MISMATCH_TAG = "name-mismatch";
const IDENTITY_KEYS = ["firstName", "lastName", "name", "email"];

async function mockedSubmissions() {
  const routePath = ROUTE_ARG
    ? resolve(ROOT, ROUTE_ARG)
    : ["app/api/lead/route.ts", "src/app/api/lead/route.ts", "api/lead.ts"].map((p) => join(ROOT, p)).find(existsSync);
  if (!routePath || !existsSync(routePath)) {
    fail(`lead route not found${ROUTE_ARG ? ` at ${ROUTE_ARG}` : ""}; pass --route <path>`);
    return;
  }

  // Fake HighLevel with a small contact store. Every contact already holds a
  // staff note, so a route that "cleans up" old notes before re-adding would
  // have something to hit.
  const calls = [];
  const store = new Map();
  let seq = 0;
  const digits = (s) => String(s ?? "").replace(/\D/g, "").slice(-10);
  const json = (status, body) =>
    new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
  const findBy = (pred) => [...store.entries()].find(([, c]) => pred(c))?.[0] ?? null;

  globalThis.fetch = async (input, init = {}) => {
    const url = new URL(typeof input === "string" ? input : input.url);
    const method = String(init.method ?? (typeof input === "string" ? "GET" : input.method) ?? "GET").toUpperCase();
    const path = url.pathname;
    let body = null;
    try {
      body = init.body ? JSON.parse(String(init.body)) : null;
    } catch {}
    calls.push({ method, path, host: url.host, query: url.searchParams, body });
    if (!HL_HOST.test(url.host)) return json(200, { ok: true });

    if (/\/contacts\/search\/duplicate$/.test(path)) {
      const email = url.searchParams.get("email");
      const number = url.searchParams.get("number") ?? url.searchParams.get("phone");
      const id = email
        ? findBy((c) => c.email && c.email.toLowerCase() === email.toLowerCase())
        : number
          ? findBy((c) => c.phone && digits(c.phone) === digits(number))
          : null;
      return json(200, { contact: id ? { id, ...store.get(id) } : null });
    }
    if (/\/contacts\/(search|upsert)\/?$/.test(path)) return json(200, { contacts: [], contact: null });
    if (method === "POST" && /\/contacts\/?$/.test(path)) {
      const id = `c_new_${++seq}`;
      store.set(id, {
        firstName: body?.firstName ?? "",
        lastName: body?.lastName ?? "",
        name: body?.name ?? "",
        email: body?.email ?? "",
        phone: body?.phone ?? "",
      });
      return json(201, { contact: { id } });
    }
    if (/\/notes(\/[^/]+)?$/.test(path)) {
      if (method === "GET") return json(200, { notes: [{ id: "n_staff_1", body: "Staff: called, wants a Tuesday quote." }] });
      if (method === "POST") return json(201, { note: { id: `n_${calls.length}` } });
      return json(200, { succeded: true });
    }
    if (/\/tags\/?$/.test(path)) return json(200, { tags: body?.tags ?? [] });
    const m = path.match(/\/contacts\/([^/]+)\/?$/);
    if (m) {
      const c = store.get(m[1]);
      if (!c) return json(404, { message: "Contact not found" });
      if (method === "GET") return json(200, { contact: { id: m[1], ...c, customFields: [], tags: [] } });
      if (method === "PUT" && body) for (const k of [...IDENTITY_KEYS, "phone"]) if (k in body) c[k] = body[k];
      return json(200, { contact: { id: m[1] }, succeded: true });
    }
    return json(200, {});
  };

  process.env.GHL_PIT ||= "pit-mock-not-a-real-token";
  process.env.GHL_LOCATION_ID ||= "loc_mock";
  for (const k of ["GHL_API_KEY", "GHL_TOKEN", "GHL_PRIVATE_INTEGRATION_TOKEN", "HIGHLEVEL_PIT", "HIGHLEVEL_LOCATION_ID"]) {
    process.env[k] ||= k.includes("LOCATION") ? "loc_mock" : "pit-mock-not-a-real-token";
  }

  // Resolve "@/..." aliases and extensionless relative imports the way the
  // site's bundler would, so the route can be imported by plain node.
  const RESOLVE_HOOK = `
    import { existsSync, statSync } from "node:fs";
    import { pathToFileURL, fileURLToPath } from "node:url";
    import { dirname, resolve as r } from "node:path";
    let aliases = [];
    export function initialize(data) { aliases = data.aliases; }
    const EXT = ["", ".ts", ".mts", ".js", ".mjs", "/index.ts", "/index.js"];
    const isFile = (p) => existsSync(p) && statSync(p).isFile();
    const find = (base) => { for (const e of EXT) if (isFile(base + e)) return base + e; return null; };
    export async function resolve(spec, ctx, next) {
      for (const [prefix, dirs] of aliases) {
        if (!spec.startsWith(prefix)) continue;
        for (const d of dirs) {
          const hit = find(r(d, spec.slice(prefix.length)));
          if (hit) return { url: pathToFileURL(hit).href, shortCircuit: true };
        }
      }
      if (/^\\.\\.?\\//.test(spec) && ctx.parentURL?.startsWith("file:")) {
        const base = r(dirname(fileURLToPath(ctx.parentURL)), spec);
        if (!isFile(base)) {
          const hit = find(base);
          if (hit) return { url: pathToFileURL(hit).href, shortCircuit: true };
        }
      }
      return next(spec, ctx);
    }`;
  register(`data:text/javascript,${encodeURIComponent(RESOLVE_HOOK)}`, { data: { aliases: ALIASES } });

  let mod;
  try {
    mod = await import(pathToFileURL(routePath).href);
  } catch (err) {
    fail(`could not import ${relative(ROOT, routePath)}: ${err instanceof Error ? err.message : err}`);
    console.error("    (run with --experimental-strip-types on Node 22, or use the site's own test runner)");
    return;
  }

  const extra = argValues("--lead")[0] ? JSON.parse(readFileSync(resolve(ROOT, argValues("--lead")[0]), "utf8")) : {};
  const baseLead = {
    first_name: "Mock",
    last_name: "Lead",
    full_name: "Mock Lead",
    // The free-text box goes by different names across sites; fill the common ones.
    message: "Mock submission from test-notes-append-only",
    note: "Mock submission from test-notes-append-only",
    notes: "Mock submission from test-notes-append-only",
    form_source: "notes_append_only_test",
    visitor_source_first: "Organic Search",
    visitor_source_recent: "Direct",
    // Spam guards in the template family time the fill; a human takes seconds.
    form_fill_ms: 12000,
    // Site-specific required fields: --lead path/to/extra-fields.json
    ...extra,
  };
  // An email lead carries no phone and no SMS consent, like the standard's human
  // test lead (a phone without consent is refused by most routes).
  const emailLead = (over = {}) => ({ ...baseLead, email: "mock.lead@example.invalid", sms_consent: false, ...over });
  // A phone-only lead: no email at all, consent given.
  const phoneLead = (phone, over = {}) => {
    const l = { ...baseLead, phone, sms_consent: true, ...over };
    delete l.email;
    return l;
  };

  // Look like the site's own form posting from the site's own page, so origin
  // and referer checks in a spam guard let the submission through.
  const SITE = "http://localhost:3000";
  const browserHeaders = {
    "content-type": "application/json",
    origin: SITE,
    referer: `${SITE}/contact`,
    "x-forwarded-host": "localhost:3000",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36",
    accept: "application/json",
  };

  async function submit(lead) {
    if (typeof mod.POST === "function") {
      const res = await mod.POST(
        new Request(`${SITE}/api/lead`, { method: "POST", headers: browserHeaders, body: JSON.stringify(lead) })
      );
      return res?.status ?? 0;
    }
    const handler = mod.default;
    if (typeof handler !== "function") throw new Error("route exports neither POST nor a default handler");
    let status = 200;
    const res = {
      setHeader() {},
      status(s) {
        status = s;
        return res;
      },
      json() {
        return res;
      },
      send() {
        return res;
      },
      end() {
        return res;
      },
    };
    await handler({ method: "POST", headers: { ...browserHeaders, host: "localhost:3000" }, body: lead, query: {} }, res);
    return status;
  }

  /** Runs one submission; returns its calls, or null when it failed outright. */
  async function run(name, lead, expectedNotes) {
    const before = calls.length;
    let status;
    try {
      status = await submit(lead);
    } catch (err) {
      fail(`${name}: route threw ${err instanceof Error ? err.message : err}`);
      return null;
    }
    const mine = calls.slice(before).filter((c) => HL_HOST.test(c.host));
    const noteCalls = mine.filter((c) => /\/notes(\/|$)/.test(c.path));
    const edits = noteCalls.filter((c) => c.method !== "POST" && c.method !== "GET");
    const posts = noteCalls.filter((c) => c.method === "POST");
    if (status >= 400) fail(`${name}: route answered HTTP ${status}`);
    if (edits.length) fail(`${name}: ${edits.map((c) => `${c.method} ${c.path}`).join(", ")} — notes are append-only`);
    else pass(`${name}: no DELETE, PUT or PATCH on notes`);
    if (posts.length !== expectedNotes) fail(`${name}: ${posts.length} note POST(s), expected exactly ${expectedNotes}`);
    else pass(`${name}: ${posts.length} note POST(s), as expected`);
    return { mine, posts };
  }

  const tagsSent = (mine) => mine.flatMap((c) => (Array.isArray(c.body?.tags) ? c.body.tags : []));
  const creates = (mine) => mine.filter((c) => c.method === "POST" && /\/contacts\/?$/.test(c.path));
  const identityWrites = (mine, id) =>
    mine
      .filter((c) => (c.method === "PUT" || c.method === "PATCH") && c.path.endsWith(`/contacts/${id}`))
      .flatMap((c) => IDENTITY_KEYS.filter((k) => c.body && k in c.body).map((k) => `${k}=${JSON.stringify(c.body[k])}`));

  // ── 2a. Notes are append-only (email leads) ──
  console.log(`\nMocked HighLevel: notes are only ever added`);
  for (const name of ["new contact", "returning contact", "same contact again"]) {
    await run(name, emailLead(), NOTES_PER_SUBMISSION);
  }

  // ── 2b. Phone-only match and identity (David, 2026-10-02) ──
  if (SKIP_IDENTITY) return;
  console.log(`\nMocked HighLevel: phone-only match, identity never overwritten`);
  const seed = (id, c) => store.set(id, { firstName: "", lastName: "", name: "", email: "", phone: "", ...c });
  seed("c_same", { firstName: "Mock", lastName: "Lead", email: "kept@example.invalid", phone: "+15555550101" });
  seed("c_other", { firstName: "Jordan", lastName: "Rivera", email: "jordan@example.invalid", phone: "+15555550102" });
  seed("c_blank", { phone: "+15555550103" });
  seed("c_email_blank", { email: "blank.name@example.invalid" });
  seed("c_email_named", { firstName: "Pat", lastName: "Owner", email: "pat.owner@example.invalid", phone: "+15555550105" });

  const phoneNotes = PHONE_MATCH_NOTES;
  // Rule 8 (David, 2026-10-03): on a phone-only match the only contact write
  // allowed is filling empty visitor_id / ga_client_id custom fields.
  const JOIN_KEYS = new Set(["visitor_id", "ga_client_id"]);
  const rule8Writes = (mine, id) =>
    mine
      .filter((c) => (c.method === "PUT" || c.method === "PATCH") && c.path.endsWith(`/contacts/${id}`))
      .flatMap((c) =>
        Object.keys(c.body ?? {}).flatMap((k) =>
          k === "customFields"
            ? (c.body.customFields ?? []).filter((f) => !JOIN_KEYS.has(f.key)).map((f) => `customFields.${f.key}`)
            : [k]
        )
      );
  const checkPhoneMatch = (name, r, id, typed, expectMismatch) => {
    if (!r) return;
    const w = rule8Writes(r.mine, id);
    if (w.length) fail(`${name}: phone-only match updated contact fields (${w.join(", ")}); rule 8 forbids it`);
    else pass(`${name}: no contact field updated (rule 8)`);
    if (creates(r.mine).length) fail(`${name}: created a new contact; a phone-only lead must match the existing one`);
    else pass(`${name}: matched the existing contact, no new contact`);
    const writes = identityWrites(r.mine, id);
    if (writes.length) fail(`${name}: overwrote identity on the matched contact (${writes.join(", ")})`);
    else pass(`${name}: name and email left as they were`);
    const want = `Form submitted as: ${typed}`;
    if (!r.posts.some((c) => String(c.body?.body ?? "").includes(want))) fail(`${name}: no note containing "${want}"`);
    else pass(`${name}: note "${want}"`);
    const tags = tagsSent(r.mine);
    if (!tags.includes(BASELINE_TAG)) fail(`${name}: tag "${BASELINE_TAG}" not applied`);
    else pass(`${name}: tag "${BASELINE_TAG}"`);
    if (tags.includes(NAME_MISMATCH_TAG) !== expectMismatch)
      fail(`${name}: tag "${NAME_MISMATCH_TAG}" ${expectMismatch ? "missing" : "applied, but the names match"}`);
    else pass(`${name}: ${expectMismatch ? `tag "${NAME_MISMATCH_TAG}"` : `no "${NAME_MISMATCH_TAG}" tag`}`);
  };

  // Same person; the typed name differs only in case, punctuation and spacing.
  let r = await run(
    "phone match, same name",
    phoneLead("(555) 555-0101", { first_name: "  mock ", last_name: "LEAD.", full_name: "mock  LEAD." }),
    phoneNotes
  );
  checkPhoneMatch("phone match, same name", r, "c_same", "mock  LEAD.", false);

  r = await run("phone match, different name", phoneLead("+1 555 555 0102"), phoneNotes);
  checkPhoneMatch("phone match, different name", r, "c_other", "Mock Lead", true);
  if (store.get("c_other").firstName !== "Jordan" || store.get("c_other").email !== "jordan@example.invalid")
    fail("phone match, different name: the contact's name or email changed");

  r = await run("phone match, contact has no name", phoneLead("555-555-0103"), phoneNotes);
  if (r) {
    if (creates(r.mine).length) fail("phone match, contact has no name: created a new contact");
    // Rule 8 (David, 2026-10-03): a phone-only match updates NO contact field,
    // not even an empty name.
    const c = store.get("c_blank");
    if (c.firstName || c.lastName || c.name) fail(`phone match, contact has no name: name was filled (rule 8 forbids it)`);
    else pass("phone match, contact has no name: name NOT filled (rule 8)");
    if (tagsSent(r.mine).includes(NAME_MISMATCH_TAG)) fail("phone match, contact has no name: name-mismatch applied to a blank name");
    const w = rule8Writes(r.mine, "c_blank");
    if (w.length) fail(`phone match, contact has no name: updated contact fields (${w.join(", ")})`);
    if (!tagsSent(r.mine).includes(BASELINE_TAG)) fail(`phone match, contact has no name: tag "${BASELINE_TAG}" missing`);
  }

  r = await run("phone only, no match", phoneLead("+15555550199"), NOTES_PER_SUBMISSION);
  if (r && creates(r.mine).length !== 1) fail("phone only, no match: expected one new contact");
  else if (r) pass("phone only, no match: one new contact");

  r = await run(
    "email match, contact has no name or phone",
    emailLead({ email: "blank.name@example.invalid", phone: "+15555550104", sms_consent: true }),
    NOTES_PER_SUBMISSION
  );
  if (r) {
    const c = store.get("c_email_blank");
    if (`${c.firstName} ${c.lastName}`.trim() !== "Mock Lead" && c.name !== "Mock Lead") fail("email match: empty name not filled");
    else pass("email match: empty name filled");
    if (digits(c.phone) !== "5555550104") fail("email match: empty phone not filled");
    else pass("email match: empty phone filled");
  }

  r = await run(
    "email match, contact already named",
    emailLead({ email: "pat.owner@example.invalid", first_name: "Someone", last_name: "Else", full_name: "Someone Else" }),
    // The mismatch line needs a note even on a site that writes no summary note.
    Math.max(NOTES_PER_SUBMISSION, 1)
  );
  if (r) {
    const writes = identityWrites(r.mine, "c_email_named");
    if (writes.length) fail(`email match, contact already named: overwrote identity (${writes.join(", ")})`);
    else pass("email match, contact already named: name and email left as they were");
    // Name mismatch on an email match too (David, 2026-10-03).
    const want = "Form submitted as: Someone Else";
    const onNamed = (c, what) => c.path.endsWith(`/contacts/c_email_named/${what}`);
    if (!r.posts.some((c) => onNamed(c, "notes") && String(c.body?.body ?? "").includes(want)))
      fail(`email match, different name: no note containing "${want}"`);
    else pass(`email match, different name: note "${want}"`);
    if (!tagsSent(r.mine.filter((c) => onNamed(c, "tags"))).includes(NAME_MISMATCH_TAG))
      fail(`email match, different name: tag "${NAME_MISMATCH_TAG}" missing`);
    else pass(`email match, different name: tag "${NAME_MISMATCH_TAG}"`);
  }

  r = await run(
    "email match, same name",
    emailLead({ email: "pat.owner@example.invalid", first_name: "PAT", last_name: "owner.", full_name: "PAT owner." }),
    NOTES_PER_SUBMISSION
  );
  if (r) {
    if (tagsSent(r.mine).includes(NAME_MISMATCH_TAG)) fail("email match, same name: name-mismatch applied");
    else pass("email match, same name: no name-mismatch tag");
    if (r.posts.some((c) => String(c.body?.body ?? "").includes("Form submitted as:")))
      fail("email match, same name: a \"Form submitted as\" line was written");
    else pass("email match, same name: no \"Form submitted as\" line");
  }
}

if (!STATIC_ONLY) await mockedSubmissions();

console.log(
  failures
    ? `\n${failures} failure(s). HighLevel notes must be append-only, and a matched contact's identity is never overwritten.`
    : `\nNotes are append-only; matched contacts keep their identity.`
);
process.exit(failures ? 1 : 0);
