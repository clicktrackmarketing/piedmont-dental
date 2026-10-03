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
    return res(201, { contact: { id: "c_new" } });
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
const isRead = (c: { method: string; url: string }) => c.method === "GET" && /\/contacts\/c_existing$/.test(c.url);
const returning = async (setup: () => void, extra: Record<string, unknown> = {}) => {
  resetFieldIdCache();
  calls.length = 0; existing = "c_existing";
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
const DUP = { status: 400, json: { message: "This location does not allow duplicated contacts.", meta: { contactId: "c_other", matchingField: "phone" } } };
u = await returning(() => { putFails = [DUP]; }, { phone: "+16195550100" });
ok(u.result.status === 200 && u.result.json.ok === true, "duplicate phone on update -> lead still stored");
ok(u.puts.length === 2 && u.puts[0].body?.phone === "+16195550100" && !("phone" in (u.puts[1].body ?? {})), "the update is retried without the phone");
ok(u.tags.includes("phone-conflict") && u.tags.includes(BASELINE_TAG), "the contact is tagged phone-conflict (plus the standard tag)");
const note = calls.filter(isNotePost).map((c) => c.body?.body ?? "").find((b) => b.includes("+16195550100"));
ok(!!note && note.includes("c_other"), "a note records the typed phone and the other contact's id");
const lastNote = calls.filter(isNotePost).pop()?.body?.body ?? "";
ok(lastNote.includes("+16195550100"), "the conflict note is its own separate note");

u = await returning(() => { putFails = [{ status: 400, json: { message: "Something else" } }]; }, { phone: "+16195550100" });
ok(u.result.status === 502 && u.puts.length === 1, "any other update failure is returned as an error, no retry");

// ── server: phone lookup and duplicate phone on create ───────────────────
resetFieldIdCache();
calls.length = 0; existing = null; existingByPhone = "c_phone"; putFails = []; createFails = [];
r = await postLead(lead({ email: "new@example.invalid", phone: "+16195550101" }));
ok(!calls.some((c) => c.url.includes("number=") || c.url.includes("phone=")) && calls.some(isCreate),
  "with an email, a phone match is never looked up: another person's contact is not overwritten");
calls.length = 0;
r = await postLead(lead({ email: undefined, phone: "+16195550101", visitor_id: VID }));
ok(r.json.ok === true && calls.some((c) => c.url.includes("number=%2B16195550101"))
  && calls.some((c) => c.method === "PUT" && c.url.endsWith("/contacts/c_phone")),
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
calls.length = 0; createFails = [{ status: 400, json: { message: "echo sim@example.invalid", meta: { contactId: "c_secret" } } }];
r = await postLead(lead({ email: "new3@example.invalid" }));
ok(r.status === 502 && !JSON.stringify(r.json).includes("sim@example.invalid") && !JSON.stringify(r.json).includes("c_secret"),
  "a failed create returns no GHL response body to the browser");
createFails = [];

// ── notes: append only, one submission note per submission ───────────────
const SUBMISSION_NOTE = "Contact form submission";
const noteCalls = () => calls.filter((c) => /\/notes(\/|$|\?)/.test(c.url));
const submissionNotePosts = () =>
  calls.filter((c) => isNotePost(c) && (c.body?.body ?? "") === SUBMISSION_NOTE).length;
const notesOk = (label: string, conflictNotes: number) => {
  ok(noteCalls().every((c) => c.method === "POST"), `${label}: no GET/PUT/DELETE on notes (append only)`);
  ok(submissionNotePosts() === 1, `${label}: exactly one submission note POST`);
  ok(calls.filter(isNotePost).length === 1 + conflictNotes, `${label}: ${conflictNotes ? "plus one separate conflict note" : "no other note"}`);
};
resetFieldIdCache();
calls.length = 0; existing = null; existingByPhone = null; putFails = []; createFails = [];
await postLead(lead({ visitor_id: VID }));
notesOk("new contact", 0);
await returning(() => {});
notesOk("returning contact", 0);
await returning(() => { putFails = [DUP]; }, { phone: "+16195550100" });
notesOk("returning contact, update retried without the phone", 1);
calls.length = 0; existing = null; createFails = [DUP];
await postLead(lead({ email: "new4@example.invalid", phone: "+16195550103" }));
notesOk("new contact, create retried without the phone", 1);
createFails = [];
calls.length = 0; existing = null;
await postLead(lead({ visitor_id: VID }));
await postLead(lead({ visitor_id: VID }));
ok(submissionNotePosts() === 2 && noteCalls().every((c) => c.method === "POST"), "two submissions -> two appended notes, nothing deleted");
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
  calls.length = 0; existing = "c_existing"; contactFields = []; defs = DEFS; defsStatus = 200; contactStatus = 200; contactExtra = {};
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

// ── a failed tag call does not fail a stored lead or drop its note ───────
{
  resetFieldIdCache();
  calls.length = 0; existing = "c_existing"; contactStatus = 200; contactFields = []; defs = DEFS; defsStatus = 200;
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
