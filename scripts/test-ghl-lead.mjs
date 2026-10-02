#!/usr/bin/env node
/**
 * Smoke test: hit the GHL Contacts API directly with the same field-bucket
 * logic that app/api/lead/route.ts uses. Creates a synthetic test contact
 * with a full first-touch payload (contact form + smile analysis fields
 * combined so both shapes get exercised), then re-submits with the same
 * email to verify the write-once contract: LOCKED + WRITE_ONCE fields must
 * NOT change, RECENT attribution fields + tags must update/append.
 *
 * Run from repo root:
 *   node scripts/test-ghl-lead.mjs
 *
 * Reads GHL_PIT and GHL_LOCATION_ID from .env.local
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

const envText = readFileSync(resolve(repoRoot, ".env.local"), "utf8");
const env = Object.fromEntries(
  envText
    .split("\n")
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const idx = l.indexOf("=");
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);
const PIT = env.GHL_PIT;
const LOCATION_ID = env.GHL_LOCATION_ID;
if (!PIT || !LOCATION_ID) {
  console.error("✗ Missing GHL_PIT or GHL_LOCATION_ID in .env.local");
  process.exit(1);
}

const GHL = "https://services.leadconnectorhq.com";
const VERSION = "2021-07-28";
const headers = {
  Authorization: `Bearer ${PIT}`,
  Version: VERSION,
  "Content-Type": "application/json",
  Accept: "application/json",
};

const TEST_EMAIL = `ctm-smoke-test-${Date.now()}@example.com`;
const TEST_PHONE = "+14805550199";

// ── Field classification — mirrors app/api/lead/route.ts exactly ────────
const LOCKED = new Set([
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
  "gbraid_captured",
  "wbraid_captured",
  "fbclid_captured",
  "msclkid_captured",
  "ttclid_captured",
  "landing_page_first",
  "referrer_url_captured",
  "first_visit_at_iso",
  // Join keys (on update the route fills these only when empty; this
  // smoke test treats them as create-only).
  "visitor_id",
  "ga_client_id",
  "how_did_you_hear",
  "form_first_submitted_at",
]);

const WRITE_ONCE = new Set([
  "form_consent_sms",
  "form_consent_marketing",
  "form_consent_sms_timestamp",
  "form_consent_sms_text",
]);

const STANDARD = new Set(["first_name", "last_name", "full_name", "email", "phone"]);

function buildCustomFields(body, mode) {
  const out = [];
  for (const [k, v] of Object.entries(body)) {
    if (v === undefined || v === null || v === "") continue;
    if (STANDARD.has(k)) continue;
    if (k === "note") continue;
    if (mode === "update" && (LOCKED.has(k) || WRITE_ONCE.has(k))) continue;
    out.push({ key: k, field_value: typeof v === "boolean" ? v : Array.isArray(v) ? v.map(String) : String(v) });
  }
  return out;
}

async function searchByEmail(email) {
  const u = `${GHL}/contacts/search/duplicate?locationId=${encodeURIComponent(LOCATION_ID)}&email=${encodeURIComponent(email)}`;
  const r = await fetch(u, { headers });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`search HTTP ${r.status}: ${await r.text()}`);
  const json = await r.json();
  return json.contact || null;
}

async function createContact(body) {
  const tags = [
    `form:${body.form_source}`,
    `channel:${String(body.visitor_source_recent || "").toLowerCase().replace(/\s+/g, "-")}`,
    "website contact form submitted",
    "test:ignore",
  ].filter(Boolean);
  const payload = {
    locationId: LOCATION_ID,
    type: "Lead",
    firstName: body.first_name,
    lastName: body.last_name,
    name: body.full_name,
    email: body.email,
    phone: body.phone,
    source: body.form_source,
    customFields: buildCustomFields(body, "create"),
    tags,
  };
  const r = await fetch(`${GHL}/contacts/`, { method: "POST", headers, body: JSON.stringify(payload) });
  if (!r.ok) throw new Error(`create HTTP ${r.status}: ${await r.text()}`);
  const json = await r.json();
  return json.contact?.id || json.id;
}

async function updateContact(id, body) {
  const recentCustomFields = buildCustomFields(body, "update");
  const payload = { customFields: recentCustomFields };
  // Mirror app/api/lead/route.ts: name/phone update on every submission
  // (latest wins) — email intentionally excluded, it's the lookup key.
  if (body.first_name) payload.firstName = body.first_name;
  if (body.last_name) payload.lastName = body.last_name;
  if (body.full_name) payload.name = body.full_name;
  if (body.phone) payload.phone = body.phone;
  const r = await fetch(`${GHL}/contacts/${id}`, { method: "PUT", headers, body: JSON.stringify(payload) });
  if (!r.ok) throw new Error(`update HTTP ${r.status}: ${await r.text()}`);

  const newTags = [
    `form:${body.form_source}`,
    `channel:${String(body.visitor_source_recent || "").toLowerCase().replace(/\s+/g, "-")}`,
    "test:ignore",
  ].filter((t) => t && !t.endsWith(":"));

  if (newTags.length > 0) {
    const tagRes = await fetch(`${GHL}/contacts/${id}/tags`, {
      method: "POST",
      headers,
      body: JSON.stringify({ tags: newTags }),
    });
    if (!tagRes.ok) throw new Error(`tag append HTTP ${tagRes.status}: ${await tagRes.text()}`);
  }
}

// Mirrors the route: notes are append only, existing notes are never deleted.
async function addNote(id, body) {
  const r = await fetch(`${GHL}/contacts/${id}/notes`, { method: "POST", headers, body: JSON.stringify({ body }) });
  if (!r.ok) throw new Error(`note post HTTP ${r.status}: ${await r.text()}`);
  return r.json();
}

async function listNotes(id) {
  const r = await fetch(`${GHL}/contacts/${id}/notes`, { headers });
  if (!r.ok) throw new Error(`note list HTTP ${r.status}: ${await r.text()}`);
  const json = await r.json();
  return json.notes || [];
}

async function fetchContact(id) {
  const r = await fetch(`${GHL}/contacts/${id}`, { headers });
  if (!r.ok) throw new Error(`fetch HTTP ${r.status}: ${await r.text()}`);
  const json = await r.json();
  return json.contact || json;
}

async function deleteContact(id) {
  const r = await fetch(`${GHL}/contacts/${id}`, { method: "DELETE", headers });
  return r.ok;
}

let _fieldIdToKey = null;
async function loadFieldIdMap() {
  if (_fieldIdToKey) return _fieldIdToKey;
  const r = await fetch(`${GHL}/locations/${LOCATION_ID}/customFields?model=contact`, { headers });
  if (!r.ok) throw new Error(`field map fetch HTTP ${r.status}`);
  const json = await r.json();
  _fieldIdToKey = new Map();
  for (const f of json.customFields || []) {
    const bareKey = (f.fieldKey || "").replace(/^contact\./, "");
    _fieldIdToKey.set(f.id, bareKey);
  }
  return _fieldIdToKey;
}

function customFieldValue(contact, key) {
  if (!contact.customFields) return undefined;
  if (_fieldIdToKey) {
    for (const cf of contact.customFields) {
      const cfKey = _fieldIdToKey.get(cf.id);
      if (cfKey === key) return cf.value ?? cf.field_value;
    }
  }
  for (const cf of contact.customFields) {
    if (cf.key === key || cf.fieldKey === key) return cf.value ?? cf.field_value;
  }
  return undefined;
}

// ── First touch — a contact-form-style submission (Paid Search via gclid) ──
const firstTouch = {
  first_name: "Smoke",
  last_name: "Test",
  full_name: "Smoke Test",
  email: TEST_EMAIL,
  phone: TEST_PHONE,
  form_source: "contact-page",
  form_source_url: "https://piedmontdentalbydesign.com/contact?utm_source=google&utm_medium=cpc&utm_campaign=smoke_test&gclid=TEST_GCLID_001",
  form_intent_type: "contact",

  // Attribution payload — what lib/attribution.ts would produce
  visitor_source_first: "Paid Search",
  visitor_source_recent: "Paid Search",
  attribution_method: "gclid",
  attribution_confidence: "High",
  utm_source_captured: "google",
  utm_medium_captured: "cpc",
  utm_campaign_captured: "smoke_test",
  gclid_captured: "TEST_GCLID_001",
  landing_page_first: "/contact?utm_source=google&utm_medium=cpc&utm_campaign=smoke_test&gclid=TEST_GCLID_001",
  referrer_url_captured: "https://www.google.com/",
  first_visit_at_iso: new Date().toISOString(),
  last_visit_at_iso: new Date().toISOString(),
  landing_page_recent: "/contact",
  referrer_recent: "https://www.google.com/",

  // Piedmont-specific qualification (WRITE_ONCE)
  are_you_a_new_or_existing_patient: "New Patient",
  form_message: "I'd like to book a consultation for porcelain veneers.",
  patient_message: "I'd like to book a consultation for porcelain veneers.",
  form_consent_sms: true,
  form_consent_marketing: true,
  form_consent_sms_timestamp: new Date().toISOString(),
  form_consent_sms_text: "I consent to receive text messages from Piedmont Dental By Design...",

  // Smile Analysis fields (also WRITE_ONCE) — exercised even though this
  // synthetic contact simulates a contact-form submission, so both forms'
  // field shapes get covered by one test.
  smile_analysis_yes_count: 5,
  smile_analysis_answers: "Yes count: 5 / 17\n\nAnswers:\n1. ...",
};

// ── Second touch — designed to PROBE every preservation rule ────────────
const secondTouch = {
  ...firstTouch,
  first_name: "OVERWRITE",
  last_name: "ATTEMPTED",
  full_name: "OVERWRITE ATTEMPTED",
  phone: "+15555550000",

  // Recency — SHOULD update
  visitor_source_recent: "AI Search",
  last_visit_at_iso: new Date().toISOString(),
  landing_page_recent: "/procedures/cosmetic-dentistry/porcelain-veneers",
  referrer_recent: "https://www.perplexity.ai/",

  // Locked first-touch with different values — MUST NOT overwrite
  attribution_method: "utm",
  utm_source_captured: "perplexity",
  gclid_captured: undefined,

  // "Latest wins" fields — SHOULD update (per-client customization)
  are_you_a_new_or_existing_patient: "Existing Patient", // was "New Patient"
  form_message: "Second touch message.",
  patient_message: "Second touch message.",
  smile_analysis_yes_count: 17, // was 5

  // SMS consent legal record — MUST NOT overwrite (first-grant timestamp
  // stays the legally meaningful one even though other fields update)
  form_consent_sms_text: "OVERWRITE_ATTEMPTED",

  form_source: "smile-analysis",
  form_source_url: "https://piedmontdentalbydesign.com/resources/smile-analysis",
};

// Only true first-touch attribution + the SMS consent legal record are
// preserved for this client — everything else is "latest wins" by design.
const EXPECTED_PRESERVED = {
  email: TEST_EMAIL,
  visitor_source_first: "Paid Search",
  attribution_method: "gclid",
  gclid_captured: "TEST_GCLID_001",
  utm_source_captured: "google",
  form_consent_sms_text: "I consent to receive text messages from Piedmont Dental By Design...",
};

const EXPECTED_UPDATED = {
  firstName: "OVERWRITE",
  lastName: "ATTEMPTED",
  phone: "+15555550000",
  visitor_source_recent: "AI Search",
  landing_page_recent: "/procedures/cosmetic-dentistry/porcelain-veneers",
  referrer_recent: "https://www.perplexity.ai/",
  are_you_a_new_or_existing_patient: "Existing Patient",
  form_message: "Second touch message.",
  patient_message: "Second touch message.",
  smile_analysis_yes_count: 17,
};

const EXPECTED_PRESERVED_TAGS = [
  "form:contact-page",
  "channel:paid-search",
  "website contact form submitted",
];
const EXPECTED_APPENDED_TAGS = ["form:smile-analysis", "channel:ai-search"];

console.log("──────────────────────────────────────────────────────────────────");
console.log("Piedmont Dental /api/lead field-bucket smoke test (against GHL directly)");
console.log("──────────────────────────────────────────────────────────────────");
console.log("Test email:", TEST_EMAIL);
console.log("Location:  ", LOCATION_ID);
console.log("");

let createdId = null;
try {
  await loadFieldIdMap();

  console.log("1. Searching for existing contact by email…");
  const pre = await searchByEmail(TEST_EMAIL);
  if (pre) {
    console.log("   ⚠ Unexpected: contact already exists. Cleaning up and aborting.");
    await deleteContact(pre.id);
    process.exit(1);
  }
  console.log("   ✓ No existing contact (expected).");

  console.log("\n2. Creating contact with full first-touch payload…");
  createdId = await createContact(firstTouch);
  console.log(`   ✓ Created contact ${createdId}`);

  console.log("\n2b. Posting a contact note (answer-resilience channel)…");
  await addNote(createdId, "First touch note — please ignore or delete.");
  const notes = await listNotes(createdId);
  console.log(notes.length > 0 ? `   ✓ Note landed (${notes.length} total)` : "   ✗ Note did not land");

  console.log("\n3. Fetching back to verify field write…");
  await new Promise((r) => setTimeout(r, 1500));
  const after1 = await fetchContact(createdId);
  console.log(`   ✓ Contact has ${after1.customFields?.length || 0} custom fields populated`);
  console.log(`   ✓ Tags: ${(after1.tags || []).join(", ")}`);
  console.log(`   ✓ Contact type: ${after1.type ?? "(not returned by API)"}`);
  if (after1.type && after1.type.toLowerCase() !== "lead") {
    console.warn(`   ⚠ Expected type="Lead" but got "${after1.type}". Check GHL Contact Type field options.`);
  }

  console.log("\n4. Re-submitting same email with different channel + latest-wins values…");
  await updateContact(createdId, secondTouch);
  console.log("   ✓ Update PUT returned OK");
  await addNote(createdId, "Second touch note — added alongside the first, never replacing it.");

  console.log("\n5. Verifying no-overwrite contract…");
  await new Promise((r) => setTimeout(r, 1500));
  const after2 = await fetchContact(createdId);

  const assertions = [];
  const fail = (msg) => assertions.push({ ok: false, msg });
  const pass = (msg) => assertions.push({ ok: true, msg });

  for (const [field, expected] of Object.entries(EXPECTED_PRESERVED)) {
    const actual = field in after2 ? after2[field] : customFieldValue(after2, field);
    if (actual === expected) pass(`${field} preserved (${JSON.stringify(actual)})`);
    else fail(`${field} CHANGED: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }

  for (const [field, expected] of Object.entries(EXPECTED_UPDATED)) {
    const actual = field in after2 ? after2[field] : customFieldValue(after2, field);
    if (actual === expected) pass(`${field} updated (${JSON.stringify(actual)})`);
    else fail(`${field} NOT UPDATED: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }

  const finalNotes = await listNotes(createdId);
  if (finalNotes.length === 2) pass(`note appended, the first kept (2 notes total)`);
  else fail(`note count wrong: expected 2 (append only), got ${finalNotes.length}`);

  const finalTags = after2.tags || [];
  for (const t of EXPECTED_PRESERVED_TAGS) {
    if (finalTags.includes(t)) pass(`tag preserved: ${t}`);
    else fail(`tag LOST on update: ${t} (current: ${finalTags.join(", ")})`);
  }
  for (const t of EXPECTED_APPENDED_TAGS) {
    if (finalTags.includes(t)) pass(`tag appended: ${t}`);
    else fail(`tag NOT appended: ${t} (current: ${finalTags.join(", ")})`);
  }

  const failed = assertions.filter((a) => !a.ok);
  const passed = assertions.filter((a) => a.ok);
  for (const a of passed) console.log(`   ✓ ${a.msg}`);
  for (const a of failed) console.log(`   ✗ ${a.msg}`);

  if (failed.length > 0) {
    console.log(`\n   ${failed.length} assertion(s) failed out of ${assertions.length}`);
    throw new Error(`No-overwrite contract VIOLATED — ${failed.length} field(s) changed when they shouldn't have`);
  }
  console.log(`\n   ✓ All ${assertions.length} no-overwrite assertions passed`);
  console.log(`   Final tag count: ${finalTags.length} → ${finalTags.join(", ")}`);

  if (process.env.KEEP_TEST_CONTACT === "1") {
    console.log("\n6. KEEP_TEST_CONTACT=1 → leaving contact in GHL for manual inspection.");
    console.log(`   Contact ID: ${createdId}`);
    console.log(`   Email:      ${TEST_EMAIL}`);
  } else {
    console.log("\n6. Cleaning up test contact…");
    const ok = await deleteContact(createdId);
    console.log(ok ? "   ✓ Test contact deleted." : "   ⚠ Delete returned non-OK; may need manual cleanup.");
  }

  console.log("\n──────────────────────────────────────────────────────────────────");
  console.log("✓ ALL CHECKS PASSED");
  console.log("──────────────────────────────────────────────────────────────────");
} catch (err) {
  console.error("\n✗ TEST FAILED:", err.message);
  if (createdId) {
    console.error(`  Attempting cleanup of ${createdId}…`);
    try { await deleteContact(createdId); } catch {}
  }
  process.exit(1);
}
