/**
 * Checks the lead join keys (visitor_id, ga_client_id, gbraid/wbraid) from
 * the browser to HighLevel without a browser or network: a fake
 * localStorage/cookie/window.CT for the client half, and a mocked fetch
 * standing in for the HighLevel API for the server half (app/api/lead).
 *
 *   npm run test:attribution        (runs: npx --yes tsx scripts/check-attribution.mts)
 *
 * Read-only and offline: no HighLevel credentials, no leads, no deploy.
 * Exits non-zero if any check fails. Adapted from San Diego Solar #40/#41.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- test doubles for browser globals
const g = globalThis as Record<string, any>;
let failures = 0;
const ok = (c: boolean, m: string) => {
  console.log(`${c ? "PASS" : "FAIL"} ${m}`);
  if (!c) failures++;
};

// ── site specifics ───────────────────────────────────────────────────────
const SITE = "https://piedmontdentalbydesign.com";
const STORAGE_KEY = "pdbd_attribution_v1";
// Passes the spam guard: same-origin request, empty honeypot, filled in 5s.
// A phone needs SMS consent on this site.
const lead = (extra: Record<string, unknown>) => ({
  first_name: "Sim", last_name: "Test", full_name: "Sim Test", email: "sim@example.invalid",
  form_source: "contact", form_message: "Hello, I would like a cleaning.", note: "Contact form submission",
  form_fill_ms: 5000, company_website: "",
  visitor_source_first: "Direct", visitor_source_recent: "Direct",
  ...("phone" in extra ? { form_consent_sms: true } : {}), ...extra,
});
const postLead = async (body: Record<string, unknown>) => {
  const { POST } = await import("../app/api/lead/route");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- a plain Request stands in for NextRequest
  const res = await POST(new Request(`${SITE}/api/lead`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: SITE, host: new URL(SITE).host },
    body: JSON.stringify(body),
  }) as any);
  return { status: res.status, json: (await res.json()) as { ok?: boolean; contactId?: string } };
};

// ── fake browser ─────────────────────────────────────────────────────────
const store = new Map<string, string>();
let lsThrows = false;
const ls = {
  getItem: (k: string) => {
    if (lsThrows) throw new Error("blocked");
    return store.has(k) ? store.get(k)! : null;
  },
  setItem: (k: string, v: string) => {
    if (lsThrows) throw new Error("blocked");
    store.set(k, v);
  },
  removeItem: (k: string) => void store.delete(k),
};
g.window = { localStorage: ls, location: { href: `${SITE}/contact` } };
g.localStorage = ls;
g.document = { cookie: "", referrer: "" };

const VID = "3f2a9c1e-8b4d-4e7a-9c2f-1a2b3c4d5e6f";
const VID2 = "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee";
const pixel = (fields: Array<{ key: string; field_value: unknown }>) => ({ ghlCustomFields: () => fields });

const { getAttributionData, attributionForDataLayer, captureAttribution, isTrackingOptedOut } = await import("../lib/attribution");

// ── client: gbraid / wbraid at first touch ───────────────────────────────
g.window.location.href = `${SITE}/?gbraid=CTMTEST_GB&utm_source=google&utm_medium=cpc`;
captureAttribution();
let a = getAttributionData();
ok(a.visitor_source_first === "Paid Search" && a.attribution_method === "gbraid" && a.attribution_confidence === "High",
  "gbraid classifies as Paid Search / gbraid / High");
ok(a.gbraid_captured === "CTMTEST_GB", "gbraid_captured is stored at first touch");
store.clear();
g.window.location.href = `${SITE}/?wbraid=CTMTEST_WB`;
captureAttribution();
a = getAttributionData();
ok(a.attribution_method === "wbraid" && a.wbraid_captured === "CTMTEST_WB", "wbraid alone counts as a signal and is captured");
store.set(STORAGE_KEY, JSON.stringify({ visitor_source_first: "Direct", attribution_method: "inferred",
  attribution_confidence: "Low", first_visit_at_iso: new Date().toISOString() }));
g.window.location.href = `${SITE}/?gbraid=CTMTEST_UP`;
captureAttribution();
a = getAttributionData();
ok(a.visitor_source_first === "Paid Search" && a.gbraid_captured === "CTMTEST_UP", "a later gbraid upgrades an inferred/Low first touch");
store.clear();
g.window.location.href = `${SITE}/contact`;

// ── client: pixel API first ──────────────────────────────────────────────
g.window.CT = pixel([{ key: "visitor_source_first", field_value: "Direct" }, { key: "visitor_id", field_value: VID }]);
ok(getAttributionData().visitor_id === VID, "uses window.CT.ghlCustomFields() visitor_id when the pixel is loaded");

store.set("_ct_vid", VID2);
g.window.CT = pixel([{ key: "visitor_source_first", field_value: "Direct" }]);
ok(!("visitor_id" in getAttributionData()), "pixel loaded but no visitor_id (consent denied) -> nothing, even with _ct_vid in storage");

g.window.CT = { ghlCustomFields: () => { throw new Error("boom"); } };
ok(!("visitor_id" in getAttributionData()), "pixel API throws -> nothing (fails closed)");

g.window.CT = pixel([{ key: "visitor_id", field_value: "not-a-uuid" }]);
ok(!("visitor_id" in getAttributionData()), "pixel returns a non-UUID -> nothing");
store.delete("_ct_vid");

// ── client: fallback when the pixel is not on the page ───────────────────
delete g.window.CT;
store.set("_ct_vid", VID);
a = getAttributionData();
ok(a.visitor_id === VID, "no pixel: reads _ct_vid from localStorage");
ok([...store.entries()].every(([k, v]) => k === "_ct_vid" || !v.includes(VID)), "visitor_id is never persisted in the site's attribution record");

store.delete("_ct_vid");
ok(!("visitor_id" in getAttributionData()), "no pixel, no _ct_vid -> nothing");

store.set("_ct_vid", "not-a-uuid");
ok(!("visitor_id" in getAttributionData()), "no pixel: non-UUID _ct_vid is ignored");
store.delete("_ct_vid");

store.set(STORAGE_KEY, JSON.stringify({ visitor_source_first: "Direct", visitor_id: VID2 }));
ok(!("visitor_id" in getAttributionData()), "a visitor_id left in the stored record is dropped");

g.document.cookie = `_ga=GA1.1.111.222; _ct_vid=${VID}`;
lsThrows = true;
ok(getAttributionData().visitor_id === VID, "no pixel, storage blocked: reads the _ct_vid cookie");
lsThrows = false;

a = getAttributionData();
ok(a.ga_client_id === "111.222", "ga_client_id is filled at submit when missing");
g.document.cookie = `_ga=GA1.1.333.444`;
ok(getAttributionData().ga_client_id === "111.222", "a ga_client_id already captured is kept");

// ── client: tracking opt-out (David, 2026-10-03) ─────────────────────────
// Opted out → no visitor_id / ga_client_id (even one captured earlier), and
// _ga / _ct_vid are not read for them.
// Node has its own read-only navigator; replace it for the GPC cases.
const setGpc = (on: boolean) =>
  Object.defineProperty(globalThis, "navigator", { value: { globalPrivacyControl: on }, configurable: true, writable: true });
setGpc(false);
store.set("_ct_vid", VID);
g.document.cookie = `_ga=GA1.1.333.444; _ct_vid=${VID}`;
ok(!isTrackingOptedOut(), "no opt-out signal -> not opted out");
const optOutCases: Array<[string, () => void, () => void]> = [
  ["GPC", () => setGpc(true), () => setGpc(false)],
  ["ctm_track=0", () => { g.document.cookie = `_ga=GA1.1.333.444; ctm_track=0`; }, () => { g.document.cookie = `_ga=GA1.1.333.444`; }],
  ["Consent Mode analytics_storage denied (update)", () => { g.window.google_tag_data = { ics: { entries: { analytics_storage: { default: true, update: false } } } }; }, () => { delete g.window.google_tag_data; }],
  ["Consent Mode analytics_storage denied (default)", () => { g.window.google_tag_data = { ics: { entries: { analytics_storage: { default: false } } } }; }, () => { delete g.window.google_tag_data; }],
  ["CT_CONFIG.consent = \"denied\"", () => { g.window.CT_CONFIG = { consent: "denied" }; }, () => { delete g.window.CT_CONFIG; }],
  ["CT_CONFIG.consent() = false", () => { g.window.CT_CONFIG = { consent: () => false }; }, () => { delete g.window.CT_CONFIG; }],
];
for (const [label, on, off] of optOutCases) {
  on();
  const d = getAttributionData();
  ok(isTrackingOptedOut() && !("visitor_id" in d) && !("ga_client_id" in d), `opted out (${label}) -> no visitor_id, no ga_client_id`);
  off();
}
g.window.google_tag_data = { ics: { entries: { analytics_storage: { default: false, update: true } } } };
setGpc(true);
ok(isTrackingOptedOut(), "GPC wins even when Consent Mode grants");
setGpc(false);
ok(!isTrackingOptedOut(), "Consent Mode granted by update -> not opted out");
delete g.window.google_tag_data;
{
  // First touch while opted out: the _ga cookie is not read into the record.
  const saved = store.get(STORAGE_KEY);
  store.delete(STORAGE_KEY);
  setGpc(true);
  g.window.location.href = `${SITE}/?utm_source=google&utm_medium=cpc`;
  captureAttribution();
  setGpc(false);
  ok(!JSON.parse(store.get(STORAGE_KEY) ?? "{}").ga_client_id, "first touch while opted out: ga_client_id is not captured");
  g.window.location.href = `${SITE}/contact`;
  if (saved) store.set(STORAGE_KEY, saved);
}
store.delete("_ct_vid");
g.document.cookie = `_ga=GA1.1.333.444`;

// ── client: dataLayer copy ───────────────────────────────────────────────
const dl = attributionForDataLayer({ ...a, visitor_id: VID });
ok(!("visitor_id" in dl), "dataLayer copy has no visitor_id");
ok(dl.ga_client_id === "111.222" && dl.visitor_source_first === "Direct", "dataLayer copy keeps the other attribution fields");

// ── server: mocked HighLevel ─────────────────────────────────────────────
process.env.GHL_PIT = "test-pit";
process.env.GHL_LOCATION_ID = "loc_test";
const { resetFieldIdCache, setLookupSleep } = await import("../lib/ghl-join-keys");
setLookupSleep(async () => {});
let existing: string | null = null;
let existingByPhone: string | null = null;
let defsStatus = 200;
let defs: Array<{ id: string; fieldKey: string }> = [];
let defsMalformed = false;
let contactStatus = 200;
let contactFields: Array<{ id: string; value: unknown }> | undefined;
/** Standard fields of the matched contact (phone, name, email) as GET /contacts/{id} returns them. */
let contactExtra: Record<string, unknown> = {};
let putFails: Array<{ status: number; json: unknown }> = [];
let createFails: Array<{ status: number; json: unknown }> = [];
type Body = { customFields?: Array<{ key: string; field_value: unknown }>; tags?: string[]; phone?: string; body?: string };
const calls: { method: string; url: string; body?: Body }[] = [];
g.fetch = async (url: string, init: { method?: string; body?: string } = {}) => {
  const method = init.method || "GET";
  const body = init.body ? JSON.parse(init.body) : undefined;
  calls.push({ method, url, body });
  const res = (status: number, json: unknown) => ({
    ok: status < 300, status, json: async () => json, text: async () => JSON.stringify(json),
  });
  if (url.includes("/contacts/search/duplicate")) {
    const id = url.includes("email=") ? existing : existingByPhone;
    return id ? res(200, { contact: { id } }) : res(404, {});
  }
  if (method === "POST" && /\/contacts\/?$/.test(url)) {
    if (createFails.length) { const f = createFails.shift()!; return res(f.status, f.json); }
    return res(201, { contact: { id: "cNew" } });
  }
  if (method === "GET" && url.includes("/customFields")) return res(defsStatus, defsMalformed ? { unexpected: true } : { customFields: defs });
  if (method === "GET" && /\/contacts\/[^/?]+$/.test(url)) {
    return res(contactStatus, { contact: { id: existing, ...contactExtra, ...(contactFields ? { customFields: contactFields } : {}) } });
  }
  if (method === "PUT" && putFails.length) {
    const f = putFails.shift()!;
    return res(f.status, f.json);
  }
  if (method === "GET" && url.endsWith("/notes")) return res(200, { notes: [] });
  return res(200, { contact: { id: existing }, succeded: true });
};
const cf = (b?: Body) => Object.fromEntries((b?.customFields ?? []).map((f) => [f.key, f.field_value]));
const isCreate = (c: { method: string; url: string }) => c.method === "POST" && /\/contacts\/?$/.test(c.url);
const isTags = (c: { method: string; url: string }) => c.method === "POST" && c.url.endsWith("/tags");
const isNotePost = (c: { method: string; url: string }) => c.method === "POST" && c.url.endsWith("/notes");
const BASELINE_TAG = "website contact form submitted";

calls.length = 0; existing = null;
let r = await postLead(lead({ visitor_id: VID, ga_client_id: "111.222", gbraid_captured: "gb-1", wbraid_captured: "wb-1" }));
let create = calls.find(isCreate);
ok(r.status === 200 && r.json.ok === true && !!create, "new contact is created");
ok(cf(create?.body).visitor_id === VID, "create sends visitor_id = the pixel id");
ok(cf(create?.body).ga_client_id === "111.222", "create sends ga_client_id");
ok(cf(create?.body).gbraid_captured === "gb-1" && cf(create?.body).wbraid_captured === "wb-1", "create sends gbraid_captured / wbraid_captured");
ok(!!create?.body?.tags?.includes(BASELINE_TAG), "create carries the standard website tag");

calls.length = 0; existing = null;
await postLead(lead({ visitor_id: "iw-anon-123" }));
create = calls.find(isCreate);
ok(!("visitor_id" in cf(create?.body)), "server drops a visitor_id that is not a UUID");
ok(!JSON.stringify(calls).includes("intentwave"), "no IntentWave id key is sent to HighLevel");

// ── server: returning contact, fill-if-empty ─────────────────────────────
const DEFS = [
  { id: "f_vid", fieldKey: "contact.visitor_id" },
  { id: "f_ga", fieldKey: "contact.ga_client_id" },
  { id: "f_src", fieldKey: "contact.visitor_source_first" },
];
const isDefs = (c: { method: string; url: string }) => c.method === "GET" && c.url.includes("/customFields");
const isRead = (c: { method: string; url: string }) => c.method === "GET" && /\/contacts\/cExisting$/.test(c.url);
const returning = async (setup: () => void, extra: Record<string, unknown> = {}) => {
  resetFieldIdCache();
  calls.length = 0; existing = "cExisting";
  defsStatus = 200; defs = DEFS; contactStatus = 200; contactFields = []; putFails = []; contactExtra = {};
  setup();
  const result = await postLead(lead({ visitor_id: VID2, ga_client_id: "999.999", ...extra }));
  const puts = calls.filter((c) => c.method === "PUT");
  return { result, put: cf(puts[puts.length - 1]?.body), puts, tags: calls.filter(isTags).flatMap((c) => c.body?.tags ?? []) };
};

let u = await returning(() => { contactFields = [{ id: "f_src", value: "Direct" }, { id: "f_vid", value: "" }]; },
  { gbraid_captured: "gb-1", wbraid_captured: "wb-1" });
ok(u.result.json.ok === true && u.put.visitor_id === VID2 && u.put.ga_client_id === "999.999", "returning contact with empty join keys -> both filled");
ok(!("gbraid_captured" in u.put) && !("wbraid_captured" in u.put), "gbraid/wbraid stay create-only on update");
ok(!("visitor_source_first" in u.put), "other LOCKED keys are still held back on update");
ok(u.tags.includes(BASELINE_TAG), "update appends the standard website tag via POST /contacts/{id}/tags");
ok(u.puts.every((c) => !("tags" in (c.body ?? {}))), "the PUT body never carries tags");

u = await returning(() => { contactFields = [{ id: "f_vid", value: VID }]; });
ok(!("visitor_id" in u.put) && u.put.ga_client_id === "999.999", "non-empty visitor_id is left untouched; the empty ga_client_id is filled");
ok(!JSON.stringify(calls).includes(VID2), "the new visitor_id is never sent when one exists");

u = await returning(() => { defsStatus = 403; });
ok(u.result.json.ok === true && !("visitor_id" in u.put) && !("ga_client_id" in u.put), "no View Custom Fields scope (403) -> create-only, lead still stored");
// One read remains: the identity check (lib/ghl-identity.ts), not the join keys.
ok(calls.filter(isRead).length === 1, "no join-key contact read when the field ids are unknown (only the identity read)");
calls.length = 0;
await postLead(lead({ visitor_id: VID2 }));
ok(!calls.some(isDefs), "a failed field lookup is not retried on every lead");

u = await returning(() => { defsMalformed = true; });
ok(u.result.json.ok === true && !("visitor_id" in u.put), "unreadable field list -> create-only");
defsMalformed = false;
calls.length = 0;
await postLead(lead({ visitor_id: VID2 }));
ok(!calls.some(isDefs), "an unreadable field list is cached as a failure (retried later), not as success");

u = await returning(() => { defs = [null as unknown as { id: string; fieldKey: string }, DEFS[0]]; contactFields = [null as unknown as { id: string; value: unknown }]; });
ok(u.result.json.ok === true && u.put.visitor_id === VID2, "null entries in HighLevel's lists are skipped, the lead is stored");

u = await returning(() => { contactStatus = 500; });
ok(u.result.json.ok === true && !("visitor_id" in u.put) && !("ga_client_id" in u.put), "contact read fails -> create-only");

u = await returning(() => { contactFields = undefined; });
ok(!("visitor_id" in u.put), "contact read without customFields -> create-only (not treated as empty)");

u = await returning(() => { defs = [DEFS[0]]; });
ok(u.put.visitor_id === VID2 && !("ga_client_id" in u.put), "a key not provisioned on the location is not filled");

await returning(() => {});
calls.length = 0;
await postLead(lead({ visitor_id: VID2 }));
ok(!calls.some(isDefs), "field ids are looked up once per server instance");

// ── server: duplicate phone ──────────────────────────────────────────────
const DUP = { status: 400, json: { message: "This location does not allow duplicated contacts.", meta: { contactId: "cOther", matchingField: "phone" } } };
u = await returning(() => { putFails = [DUP]; }, { phone: "+16195550100" });
ok(u.result.status === 200 && u.result.json.ok === true, "duplicate phone on update -> lead still stored");
ok(u.puts.length === 2 && u.puts[0].body?.phone === "+16195550100" && !("phone" in (u.puts[1].body ?? {})), "the update is retried without the phone");
ok(u.tags.includes("phone-conflict") && u.tags.includes(BASELINE_TAG), "the contact is tagged phone-conflict (plus the standard tag)");
const conflictNotes = calls.filter(isNotePost).map((c) => c.body?.body ?? "");
ok(conflictNotes.length === 1 && conflictNotes[0].includes("+16195550100") && conflictNotes[0].includes("cOther")
  && conflictNotes[0].includes("Contact form submission"),
  "exactly ONE note: the submission note carries the typed phone and the other contact's id");

u = await returning(() => { putFails = [{ status: 400, json: { message: "Something else" } }]; }, { phone: "+16195550100" });
ok(u.result.status === 502 && u.puts.length === 1, "any other update failure is returned as an error, no retry");

// ── server: phone lookup and duplicate phone on create ───────────────────
resetFieldIdCache();
calls.length = 0; existing = null; existingByPhone = "cPhone"; putFails = []; createFails = [];
r = await postLead(lead({ email: "new@example.invalid", phone: "+16195550101" }));
ok(!calls.some((c) => c.url.includes("number=") || c.url.includes("phone=")) && calls.some(isCreate),
  "with an email, a phone match is never looked up: another person's contact is not overwritten");
calls.length = 0;
r = await postLead(lead({ email: undefined, phone: "+16195550101", visitor_id: VID }));
ok(r.json.ok === true && calls.some((c) => c.url.includes("number=%2B16195550101"))
  && calls.some((c) => c.method === "PUT" && c.url.endsWith("/contacts/cPhone")),
  "no email: looked up by phone (`number`) and that contact is updated");
existingByPhone = null;
calls.length = 0; createFails = [DUP];
r = await postLead(lead({ email: "new2@example.invalid", phone: "+16195550102" }));
const creates = calls.filter(isCreate);
ok(r.status === 200 && r.json.ok === true && creates.length === 2 && creates[0].body?.phone === "+16195550102"
  && !("phone" in (creates[1].body ?? {})), "duplicate phone on create -> created again without the phone");
ok(!!creates[1].body?.tags?.includes("phone-conflict") && !!creates[1].body?.tags?.includes(BASELINE_TAG),
  "the new contact is tagged phone-conflict plus the standard tag");
ok(calls.filter(isNotePost).some((c) => (c.body?.body ?? "").includes("+16195550102")), "a note records the typed phone");
calls.length = 0; createFails = [{ status: 400, json: { message: "echo sim@example.invalid", meta: { contactId: "cSecret" } } }];
r = await postLead(lead({ email: "new3@example.invalid" }));
ok(r.status === 502 && !JSON.stringify(r.json).includes("sim@example.invalid") && !JSON.stringify(r.json).includes("cSecret"),
  "a failed create returns no GHL response body to the browser");
createFails = [];

// ── notes: append only, one submission note per submission ───────────────
const SUBMISSION_NOTE = "Contact form submission";
const noteCalls = () => calls.filter((c) => /\/notes(\/|$|\?)/.test(c.url));
const submissionNotePosts = () =>
  calls.filter((c) => isNotePost(c) && (c.body?.body ?? "").includes(SUBMISSION_NOTE)).length;
const notesOk = (label: string, conflict: boolean) => {
  ok(noteCalls().every((c) => c.method === "POST"), `${label}: no GET/PUT/DELETE on notes (append only)`);
  ok(submissionNotePosts() === 1 && calls.filter(isNotePost).length === 1, `${label}: exactly one note POST, the submission note`);
  if (conflict) ok((calls.find(isNotePost)?.body?.body ?? "").includes("already belongs to another contact"),
    `${label}: the conflict line is folded into that one note`);
};
resetFieldIdCache();
calls.length = 0; existing = null; existingByPhone = null; putFails = []; createFails = [];
await postLead(lead({ visitor_id: VID }));
notesOk("new contact", false);
await returning(() => {});
notesOk("returning contact", false);
await returning(() => { putFails = [DUP]; }, { phone: "+16195550100" });
notesOk("returning contact, update retried without the phone", true);
calls.length = 0; existing = null; createFails = [DUP];
await postLead(lead({ email: "new4@example.invalid", phone: "+16195550103" }));
notesOk("new contact, create retried without the phone", true);
createFails = [];
calls.length = 0; existing = null;
await postLead(lead({ visitor_id: VID }));
await postLead(lead({ visitor_id: VID }));
ok(calls.filter(isNotePost).length === 2 && noteCalls().every((c) => c.method === "POST"), "two submissions -> two appended notes, nothing deleted");
// The mock answers DELETE/PUT on notes too, so a regression would be caught above.

// ── phone optional (David, 2026-10-03) ───────────────────────────────────
resetFieldIdCache();
calls.length = 0; existing = null; existingByPhone = null;
r = await postLead(lead({ email: "email.only@example.invalid" }));
create = calls.find(isCreate);
ok(r.status === 200 && r.json.ok === true && !!create && !create.body?.phone, "email-only lead (no phone) is accepted and created without a phone");
calls.length = 0;
r = await postLead(lead({ email: "", phone: "" }));
ok(r.status === 400 && calls.length === 0, "neither email nor phone -> 400, nothing sent to HighLevel");
calls.length = 0;
r = await postLead(lead({ email: undefined, phone: "call me" }));
ok(r.status === 400 && calls.length === 0, "a phone with no digits and no email -> 400");

// ── a matched contact's phone is never overwritten (David, 2026-10-03) ───
const notesText = () => calls.filter(isNotePost).map((c) => c.body?.body ?? "").join("\n---\n");
u = await returning(() => { contactExtra = { firstName: "Sim", lastName: "Test", phone: "+15105550100" }; }, { phone: "(510) 555-0199" });
ok(u.result.json.ok === true && u.puts.every((c) => !("phone" in (c.body ?? {}))), "contact has a different phone -> no phone in the PUT");
ok(u.tags.includes("phone-mismatch"), "contact has a different phone -> tag phone-mismatch");
ok(calls.filter(isNotePost).length === 1 && notesText().split("\n").includes("Form submitted with phone: (510) 555-0199"),
  "contact has a different phone -> the one note carries \"Form submitted with phone: (510) 555-0199\" as typed");
ok(!u.tags.includes("name-mismatch") && !notesText().includes("Form submitted as:"), "same name -> no name-mismatch line or tag");

u = await returning(() => { contactExtra = { firstName: "Sim", lastName: "Test", phone: "+15105550100" }; }, { phone: "1 (510) 555-0100" });
ok(u.puts.every((c) => !("phone" in (c.body ?? {}))) && !u.tags.includes("phone-mismatch") && !notesText().includes("Form submitted with phone"),
  "same digits (11-digit with a leading 1) -> nothing sent, no tag, no line");

u = await returning(() => { contactExtra = { firstName: "Sim", lastName: "Test" }; }, { phone: "+15105550101" });
ok(u.puts[0]?.body?.phone === "+15105550101" && !u.tags.includes("phone-mismatch"), "contact has no phone -> the submitted phone fills it");

u = await returning(() => { contactStatus = 500; }, { phone: "+15105550102", first_name: "Other", last_name: "Person", email: "sim@example.invalid" });
ok(u.puts.every((c) => !["phone", "firstName", "lastName", "name", "email"].some((k) => k in (c.body ?? {}))),
  "contact can't be read -> no name, email or phone in the PUT (never overwrite blind)");

// ── name mismatch on an EMAIL match (David, 2026-10-03) ──────────────────
u = await returning(() => { contactExtra = { firstName: "Pat", lastName: "Owner", email: "sim@example.invalid" }; });
ok(u.tags.includes("name-mismatch"), "email match, different name -> tag name-mismatch");
ok(calls.filter(isNotePost).length === 1 && notesText().split("\n").includes("Form submitted as: Sim Test"),
  "email match, different name -> the one note carries \"Form submitted as: Sim Test\"");
ok(u.puts.every((c) => !["firstName", "lastName", "name", "email"].some((k) => k in (c.body ?? {}))), "email match, different name -> name and email unchanged");
u = await returning(() => { contactExtra = { firstName: "SIM", lastName: "test.", email: "sim@example.invalid" }; });
ok(!u.tags.includes("name-mismatch") && !notesText().includes("Form submitted as:"), "email match, same name in another case -> nothing");

// ── tracking opt-out on the server (David, 2026-10-03) ───────────────────
const postWith = async (body: Record<string, unknown>, headers: Record<string, string>) => {
  const { POST } = await import("../app/api/lead/route");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- a plain Request stands in for NextRequest
  const res = await POST(new Request(`${SITE}/api/lead`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: SITE, host: new URL(SITE).host, ...headers },
    body: JSON.stringify(body),
  }) as any);
  return { status: res.status, json: (await res.json()) as { ok?: boolean; contactId?: string } };
};
for (const [label, extra, headers] of [
  ["tracking_opt_out: true", { tracking_opt_out: true }, {}],
  ["Sec-GPC: 1", {}, { "sec-gpc": "1" }],
] as Array<[string, Record<string, unknown>, Record<string, string>]>) {
  resetFieldIdCache();
  calls.length = 0; existing = null;
  r = await postWith(lead({ visitor_id: VID, ga_client_id: "111.222", gclid_captured: "gc-1", ...extra }), headers);
  const sent = JSON.stringify(calls.map((c) => c.body ?? null));
  create = calls.find(isCreate);
  ok(r.status === 200 && r.json.ok === true && !!create, `opt-out (${label}): the lead is still created`);
  ok(!sent.includes(VID) && !sent.includes("111.222") && !sent.includes("visitor_id") && !sent.includes("ga_client_id"),
    `opt-out (${label}): no visitor_id / ga_client_id anywhere (create, fields, note)`);
  ok(cf(create?.body).gclid_captured === "gc-1" && !("tracking_opt_out" in cf(create?.body)),
    `opt-out (${label}): click ids as before; the flag itself is not a field`);
  resetFieldIdCache();
  calls.length = 0; existing = "cExisting"; contactFields = []; defs = DEFS; defsStatus = 200; contactStatus = 200; contactExtra = {};
  r = await postWith(lead({ visitor_id: VID, ga_client_id: "111.222", ...extra }), headers);
  const putSent = JSON.stringify(calls.filter((c) => c.method === "PUT").map((c) => c.body));
  ok(r.json.ok === true && !putSent.includes(VID) && !putSent.includes("ga_client_id"), `opt-out (${label}), returning contact: join keys not filled`);
}

// ── lookup failure is not "no match" (David, 2026-10-03) ─────────────────
const realFetch = g.fetch;
const resp = (status: number, json: unknown) => ({ ok: status < 300, status, json: async () => json, text: async () => "" });
const lookupFailing = async (label: string, fail: () => unknown, body = lead({})) => {
  calls.length = 0; existing = null; existingByPhone = null;
  let lookups = 0;
  g.fetch = async (url: string, init: { method?: string; body?: string } = {}) => {
    if (url.includes("/contacts/search/duplicate")) {
      lookups++;
      calls.push({ method: "GET", url });
      return fail();
    }
    return realFetch(url, init);
  };
  try { r = await postLead(body); } finally { g.fetch = realFetch; }
  ok(r.status === 502 && r.json.ok === false, `lookup ${label} -> 502 (got ${r.status})`);
  // Only reads happened: no create, update, tag or note.
  ok(calls.every((c) => c.method === "GET"), `lookup ${label} -> nothing created or written`);
  return lookups;
};
ok((await lookupFailing("500", () => resp(500, {}))) === 3, "a 500 lookup is retried twice (GET is safe), then fails");
ok((await lookupFailing("429", () => resp(429, {}))) === 3, "a 429 lookup is retried twice, then fails");
await lookupFailing("network error", () => { throw new TypeError("fetch failed"); });
ok((await lookupFailing("401", () => resp(401, {}))) === 1, "a 401 lookup is not retried and fails");
await lookupFailing("bad JSON", () => ({ ok: true, status: 200, json: async () => { throw new SyntaxError("bad"); }, text: async () => "" }));
await lookupFailing("phone-only 500", () => resp(500, {}), lead({ email: undefined, phone: "+15105550103" }));
{
  calls.length = 0; existing = null;
  let n = 0;
  g.fetch = async (url: string, init: { method?: string; body?: string } = {}) => {
    if (url.includes("/contacts/search/duplicate") && n++ === 0) return resp(503, {});
    return realFetch(url, init);
  };
  try { r = await postLead(lead({})); } finally { g.fetch = realFetch; }
  ok(r.status === 200 && calls.filter(isCreate).length === 1, "a lookup that recovers on retry -> the lead is stored once");
}

// ── non-idempotent POSTs are never retried (David, 2026-10-03) ───────────
for (const [label, fail] of [
  ["500", () => resp(500, {})],
  ["network error", () => { throw new TypeError("fetch failed"); }],
] as Array<[string, () => unknown]>) {
  calls.length = 0; existing = null;
  let creates = 0;
  g.fetch = async (url: string, init: { method?: string; body?: string } = {}) => {
    if ((init.method || "GET") === "POST" && /\/contacts\/?$/.test(url)) { creates++; return fail(); }
    return realFetch(url, init);
  };
  try { r = await postLead(lead({})); } finally { g.fetch = realFetch; }
  ok(r.status >= 500 && r.json.ok === false, `create ${label} -> error answered (got ${r.status})`);
  ok(creates === 1, `create ${label} -> exactly one create attempt, no blind retry`);

  calls.length = 0; existing = null;
  let notes = 0;
  g.fetch = async (url: string, init: { method?: string; body?: string } = {}) => {
    if ((init.method || "GET") === "POST" && /\/notes$/.test(url)) { notes++; return fail(); }
    return realFetch(url, init);
  };
  try { r = await postLead(lead({})); } finally { g.fetch = realFetch; }
  ok(notes === 1, `note POST ${label} -> posted once, never retried`);
  ok(r.status === 200 && r.json.ok === true, `note POST ${label} -> the lead (already stored) still succeeds`);
}

// ── rule 8: a phone-only match updates NO contact field (David, 2026-10-03) ──
const rule8 = async (label: string, setup: () => void, expectPut: boolean) => {
  resetFieldIdCache();
  calls.length = 0; existing = null; existingByPhone = "cExisting"; contactStatus = 200; defs = DEFS; defsStatus = 200;
  contactFields = []; contactExtra = { firstName: "Robin", lastName: "Gale", phone: "+15105550160" };
  setup();
  r = await postLead(lead({ email: undefined, phone: "(510) 555-0160", first_name: "Someone", last_name: "Else", full_name: "Someone Else",
    are_you_a_new_or_existing_patient: "New Patient", form_message: "Need a cleaning",
    note: "Contact form submission — New Patient.\n\nMessage:\nNeed a cleaning", visitor_id: VID2, ga_client_id: "999.999" }));
  existingByPhone = null; contactExtra = {};
  const puts = calls.filter((c) => c.method === "PUT");
  const extra = puts.flatMap((c) => Object.keys(c.body ?? {}).flatMap((k) => k === "customFields"
    ? (c.body?.customFields ?? []).map((f) => f.key).filter((k2) => k2 !== "visitor_id" && k2 !== "ga_client_id") : [k]));
  ok(r.json.ok === true && extra.length === 0, `rule 8 (${label}): no name/email/phone/form field in any PUT (got ${extra.join(", ") || "none"})`);
  ok(expectPut ? puts.length === 1 : puts.length === 0, `rule 8 (${label}): ${expectPut ? "one PUT with the empty join keys only" : "no PUT at all"}`);
  const notes = calls.filter(isNotePost).map((c) => c.body?.body ?? "");
  ok(notes.length === 1 && notes[0].includes("Need a cleaning") && notes[0].includes("New Patient") && notes[0].split("\n").includes("Form submitted as: Someone Else"),
    `rule 8 (${label}): the one note carries the answers and "Form submitted as"`);
  const tags = calls.filter(isTags).flatMap((c) => c.body?.tags ?? []);
  ok(tags.includes(BASELINE_TAG) && tags.includes("name-mismatch"), `rule 8 (${label}): tags added (website tag, name-mismatch)`);
};
await rule8("join keys empty", () => {}, true);
await rule8("join keys already set", () => { contactFields = [{ id: "f_vid", value: VID }, { id: "f_ga", value: "1.1" }]; }, false);

// ── a failed tag call does not fail a stored lead or drop its note ───────
{
  resetFieldIdCache();
  calls.length = 0; existing = "cExisting"; contactStatus = 200; contactFields = []; defs = DEFS; defsStatus = 200;
  contactExtra = { firstName: "Pat", lastName: "Owner", email: "sim@example.invalid" };
  g.fetch = async (url: string, init: { method?: string; body?: string } = {}) => {
    if ((init.method || "GET") === "POST" && /\/tags$/.test(url)) return resp(500, {});
    return realFetch(url, init);
  };
  try { r = await postLead(lead({})); } finally { g.fetch = realFetch; contactExtra = {}; }
  ok(r.status === 200 && r.json.ok === true, "tag POST 500 -> the stored lead still succeeds");
  ok(calls.filter(isNotePost).some((c) => (c.body?.body ?? "").includes("Form submitted as: Sim Test")),
    "tag POST 500 -> the submission's note (with its identity line) is still posted");
}


// ── fix brief 2026-10-03: A–E, G, H, contact ids, phone normalisation ────
const setFetch = (fn: (url: string, init: { method?: string; body?: string }) => unknown) => {
  g.fetch = async (url: string, init: { method?: string; body?: string } = {}) => {
    const out = fn(url, init);
    return out === undefined ? realFetch(url, init) : out;
  };
};
const fresh = () => {
  resetFieldIdCache();
  calls.length = 0; existing = null; existingByPhone = null; putFails = []; createFails = [];
  contactStatus = 200; contactFields = []; defs = DEFS; defsStatus = 200; contactExtra = {};
};
const notePosts = () => calls.filter(isNotePost);

// A: email lead, create refused for a duplicate phone -> created again without it, one note.
fresh(); createFails = [DUP];
r = await postLead(lead({ email: "a.case@example.invalid", phone: "(619) 555-0110" }));
{
  const cs = calls.filter(isCreate);
  const n = notePosts();
  ok(r.status === 200 && r.json.ok === true && cs.length === 2 && cs[0].body?.phone === "+16195550110" && !("phone" in (cs[1].body ?? {})),
    "A: email lead + duplicate phone -> one more create without the phone (phone sent as E.164 first)");
  ok(!!cs[1].body?.tags?.includes("phone-conflict"), "A: tagged phone-conflict");
  ok(n.length === 1 && (n[0].body?.body ?? "").includes("(619) 555-0110") && (n[0].body?.body ?? "").includes("cOther")
    && n[0].url.endsWith("/contacts/cNew/notes"), "A: ONE note on the new contact with the typed phone and the other contact id");
  ok(!calls.some((c) => c.url.includes("/contacts/cOther")), "A: the phone owner's contact is never touched");
}

// B: no-email lead, create refused for a duplicate phone -> phone-only match on meta.contactId.
fresh(); createFails = [DUP]; contactExtra = { firstName: "Robin", lastName: "Gale", phone: "+16195550111" };
r = await postLead(lead({ email: undefined, phone: "619-555-0111", visitor_id: VID2 }));
{
  const cs = calls.filter(isCreate);
  const n = notePosts();
  const puts = calls.filter((c) => c.method === "PUT");
  const extraKeys = puts.flatMap((c) => Object.keys(c.body ?? {}).flatMap((k) => k === "customFields"
    ? (c.body?.customFields ?? []).map((f) => f.key).filter((k2) => k2 !== "visitor_id" && k2 !== "ga_client_id") : [k]));
  ok(r.status === 200 && r.json.ok === true && r.json.contactId === "cOther" && cs.length === 1,
    "B: no-email lead + duplicate phone -> no second create; attached to meta.contactId");
  ok(extraKeys.length === 0, "B: rule 8 — no contact field changed on the owner");
  ok(n.length === 1 && n[0].url.endsWith("/contacts/cOther/notes") && (n[0].body?.body ?? "").includes("Form submitted as: Sim Test")
    && (n[0].body?.body ?? "").includes("Contact form submission"), "B: ONE note with the answers and \"Form submitted as\"");
  ok(calls.filter(isTags).some((c) => c.url.endsWith("/contacts/cOther/tags") && (c.body?.tags ?? []).includes(BASELINE_TAG)), "B: tags added");
}
fresh(); createFails = [{ status: 400, json: { message: "This location does not allow duplicated contacts.", meta: { matchingField: "phone" } } }];
r = await postLead(lead({ email: undefined, phone: "619-555-0112" }));
ok(r.status === 502 && r.json.ok === false && calls.filter(isCreate).length === 1 && notePosts().length === 0,
  "B: duplicate phone with no contact id -> 502, nothing else written");
fresh(); createFails = [{ status: 400, json: { message: "This location does not allow duplicated contacts.", meta: { matchingField: "phone", contactId: "../locations/x" } } }];
r = await postLead(lead({ email: undefined, phone: "619-555-0113" }));
ok(r.status === 502 && !calls.some((c) => c.url.includes("locations/x")), "B: an invalid meta.contactId is never put in a URL -> 502");

// Contact id format: a bad id from the lookup -> 502, nothing created.
fresh();
setFetch((url) => url.includes("/contacts/search/duplicate") ? resp(200, { contact: { id: "../../locations/evil" } }) : undefined);
try { r = await postLead(lead({})); } finally { g.fetch = realFetch; }
ok(r.status === 502 && r.json.ok === false && calls.every((c) => c.method === "GET") && !calls.some((c) => c.url.includes("evil")),
  "lookup returns an invalid contact id -> 502, nothing created, id never used in a URL");
// A 2xx create with no id / a bad id -> 502.
for (const [label, json] of [["no id", { contact: {} }], ["bad id", { contact: { id: "a/b?c" } }], ["bad JSON", null]] as Array<[string, unknown]>) {
  fresh();
  setFetch((url, init) => (init.method === "POST" && /\/contacts\/?$/.test(url))
    ? { ok: true, status: 201, json: async () => { if (json === null) throw new SyntaxError("bad"); return json; }, text: async () => "" }
    : undefined);
  try { r = await postLead(lead({})); } finally { g.fetch = realFetch; }
  ok(r.status === 502 && r.json.ok === false && notePosts().length === 0, `create 2xx with ${label} -> 502 ok:false`);
}

// C: tag failure (non-2xx and network) on a new-contact-free path -> note still posted, success.
for (const [label, fail] of [["500", () => resp(500, {})], ["network", () => { throw new TypeError("fetch failed"); }]] as Array<[string, () => unknown]>) {
  fresh(); existing = "cExisting";
  setFetch((url, init) => (init.method === "POST" && /\/tags$/.test(url)) ? fail() : undefined);
  try { r = await postLead(lead({})); } finally { g.fetch = realFetch; }
  ok(r.status === 200 && r.json.ok === true && notePosts().length === 1, `C: tag POST ${label} -> still one note, success`);
}

// D: note failure on a phone-only match -> 502; on an email match -> success.
fresh(); existingByPhone = "cExisting";
{
  let failedNotes = 0;
  setFetch((url, init) => (init.method === "POST" && /\/notes$/.test(url)) ? (failedNotes++, resp(500, {})) : undefined);
  try { r = await postLead(lead({ email: undefined, phone: "(510) 555-0170" })); } finally { g.fetch = realFetch; }
  ok(r.status === 502 && r.json.ok === false && failedNotes === 1, "D: note fails on a phone-only match -> 502 (posted once, not retried)");
}
fresh(); existing = "cExisting";
setFetch((url, init) => (init.method === "POST" && /\/notes$/.test(url)) ? resp(500, {}) : undefined);
try { r = await postLead(lead({})); } finally { g.fetch = realFetch; }
ok(r.status === 200 && r.json.ok === true, "D: note fails on an email match -> success (fields stored)");

// E: invalid email + phone -> phone path, typed email in the note; invalid email alone -> 400.
fresh(); existingByPhone = "cExisting";
r = await postLead(lead({ email: "not-an-email", phone: "(510) 555-0171" }));
ok(r.status === 200 && r.json.ok === true && !calls.some((c) => c.url.includes("email=")) && calls.some((c) => c.url.includes("number=%2B15105550171")),
  "E: invalid email + phone -> looked up by phone (E.164), never by the bad email");
ok(!JSON.stringify(calls.filter((c) => !isNotePost(c)).map((c) => c.body ?? null)).includes("not-an-email")
  && (notePosts()[0]?.body?.body ?? "").includes("not-an-email"), "E: the bad email is not written to any field, but is kept in the note");
fresh();
r = await postLead(lead({ email: "not-an-email" }));
ok(r.status === 400 && calls.length === 0, "E: invalid email and no phone -> 400, nothing sent");
fresh();
r = await postLead(lead({ email: "new.e@example.invalid", phone: "12345" }));
{
  const c = calls.find(isCreate);
  ok(r.status === 200 && !!c && !("phone" in (c.body ?? {})) && (notePosts()[0]?.body?.body ?? "").includes("12345"),
    "an unusable phone is not sent; it is kept as typed in the note");
}

// G: missing env -> 503 generic, no env names.
{
  const pit = process.env.GHL_PIT;
  delete process.env.GHL_PIT;
  fresh();
  try { r = await postLead(lead({})); } finally { process.env.GHL_PIT = pit; }
  ok(r.status === 503 && r.json.ok === false && !JSON.stringify(r.json).includes("GHL_") && calls.length === 0, "G: missing env -> 503 \"CRM not configured\", no env names");
}

// H: body size, shape, key count, field caps, custom-field allowlist.
const postRaw = async (raw: string) => {
  const { POST } = await import("../app/api/lead/route");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- a plain Request stands in for NextRequest
  const res = await POST(new Request(`${SITE}/api/lead`, { method: "POST", headers: { "content-type": "application/json", origin: SITE, host: new URL(SITE).host }, body: raw }) as any);
  return { status: res.status, json: (await res.json()) as { ok?: boolean } };
};
fresh();
r = await postRaw(JSON.stringify(lead({ form_message: "x".repeat(40 * 1024) })));
ok(r.status === 413 && calls.length === 0, "H: body over 32 KB -> 413, nothing sent");
r = await postRaw(JSON.stringify([lead({})]));
ok(r.status === 400 && calls.length === 0, "H: an array body -> 400");
r = await postRaw("\"just a string\"");
ok(r.status === 400 && calls.length === 0, "H: a non-object body -> 400");
r = await postRaw(JSON.stringify(lead(Object.fromEntries(Array.from({ length: 120 }, (_, i) => [`k${i}`, "v"])))));
ok(r.status === 400 && calls.length === 0, "H: too many keys -> 400");
r = await postRaw(JSON.stringify(lead({ first_name: "A".repeat(600) })));
ok(r.status === 400 && calls.length === 0, "H: an over-long field -> 400");
fresh();
r = await postLead(lead({ lc_first_contacted_at: "x", rev_first_deal_value: "999", random_key: "y", how_did_you_hear: "z", smile_analysis_yes_count: 3 }));
{
  const f = cf(calls.find(isCreate)?.body);
  ok(r.status === 200 && !("lc_first_contacted_at" in f) && !("rev_first_deal_value" in f) && !("random_key" in f) && !("how_did_you_hear" in f),
    "H: keys outside the allowlist never become custom fields");
  ok(f.smile_analysis_yes_count === "3" && f.form_message === "Hello, I would like a cleaning.", "H: allowlisted form keys still become custom fields");
}

// Phone normalisation on create and the phone lookup.
fresh();
r = await postLead(lead({ email: undefined, phone: "1 (510) 555-0180" }));
ok(calls.some((c) => c.url.includes("number=%2B15105550180")) && calls.find(isCreate)?.body?.phone === "+15105550180",
  "a typed US phone is looked up and stored as E.164");

// Every HighLevel fetch carries a timeout signal.
{
  fresh(); existing = "cExisting";
  const signals: boolean[] = [];
  setFetch((_url, init) => { signals.push(!!(init as { signal?: unknown }).signal); return undefined; });
  try { await postLead(lead({ phone: "+15105550181" })); } finally { g.fetch = realFetch; }
  ok(signals.length > 3 && signals.every(Boolean), "every HighLevel fetch has a timeout signal");
}

// ── logging ──────────────────────────────────────────────────────────────
const logs: unknown[] = [];
const origWarn = console.warn, origError = console.error, origLog = console.log;
console.warn = (...x: unknown[]) => void logs.push(x);
console.error = (...x: unknown[]) => void logs.push(x);
await returning(() => { defsStatus = 403; });
await returning(() => { contactStatus = 500; });
await returning(() => { putFails = [DUP]; }, { phone: "+16195550100" });
await returning(() => { putFails = [{ status: 400, json: { message: "echo sim@example.invalid" } }]; });
console.warn = origWarn; console.error = origError; console.log = origLog;
const logged = JSON.stringify(logs);
ok(logs.length > 0 && !logged.includes(VID2) && !logged.includes("999.999") && !logged.includes("test-pit")
  && !logged.includes("+16195550100") && !logged.includes("sim@example.invalid"),
  "logs never carry a field value, contact detail or the token");

console.log(failures ? `\n${failures} FAILED` : "\nALL PASS");
process.exit(failures ? 1 : 0);
