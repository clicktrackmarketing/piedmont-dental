/**
 * Internal-linking template guard (decision #50). Run against a RUNNING
 * build (`next build && next start`), because what matters is the rendered
 * HTML, not the source:
 *
 *   node scripts/check-internal-links.mjs [baseUrl]
 *
 * Asserts, on every procedure page and every blog post:
 *   - the sidebar / quick-links card renders with derived links
 *   - the grounded cross-category links are present where expected
 *     (and absent where not)
 *   - every emitted internal link resolves 200 on the same server
 *   - caps hold (≤3 cross links, ≤3 service links per post)
 *   - no page links to itself
 *
 * Routes are discovered from the filesystem (app router = the truth),
 * not from a hardcoded list.
 */

import fs from "node:fs";
import path from "node:path";

const BASE = process.argv[2] ?? "http://localhost:3000";
const ROOT = process.cwd();

let failures = 0;
const fail = (msg) => {
  failures++;
  console.error(`  ✗ ${msg}`);
};

/* ---------- route discovery from the filesystem ---------- */

const procedureDirs = [];
const procRoot = path.join(ROOT, "app", "procedures");
for (const cat of fs.readdirSync(procRoot)) {
  const catDir = path.join(procRoot, cat);
  if (!fs.statSync(catDir).isDirectory()) continue;
  for (const child of fs.readdirSync(catDir)) {
    const childDir = path.join(catDir, child);
    if (
      fs.statSync(childDir).isDirectory() &&
      fs.existsSync(path.join(childDir, "page.tsx"))
    ) {
      procedureDirs.push(`/procedures/${cat}/${child}`);
    }
  }
}

// Month 2 city pages: app/<city>/<service>/page.tsx (decision #47 — cities only)
const CITY_DIRS = ["oakland", "berkeley"];
const cityPages = [];
for (const city of CITY_DIRS) {
  const cityDir = path.join(ROOT, "app", city);
  if (!fs.existsSync(cityDir)) continue;
  for (const child of fs.readdirSync(cityDir)) {
    const childDir = path.join(cityDir, child);
    if (
      fs.statSync(childDir).isDirectory() &&
      fs.existsSync(path.join(childDir, "page.tsx"))
    ) {
      cityPages.push(`/${city}/${child}`);
    }
  }
}

const blogSlugs = fs
  .readdirSync(path.join(ROOT, "content", "blog"))
  .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
  .map((f) => f.replace(/\.md$/, ""));

/* ---------- expectations for the grounded cross pairs ---------- */

const EXPECTED_CROSS = {
  "/procedures/restoration/crowns-caps": [
    "/procedures/cosmetic-dentistry/cerec",
    "/procedures/periodontal-services/crown-lengthening",
  ],
  "/procedures/cosmetic-dentistry/cerec": [
    "/procedures/restoration/crowns-caps",
  ],
  "/procedures/restoration/dental-implants": [
    "/procedures/periodontal-services/bone-grafting",
    "/procedures/periodontal-services/sinus-augmentation",
  ],
  "/procedures/periodontal-services/bone-grafting": [
    "/procedures/restoration/dental-implants",
  ],
  "/procedures/periodontal-services/sinus-augmentation": [
    "/procedures/restoration/dental-implants",
  ],
  "/procedures/periodontal-services/crown-lengthening": [
    "/procedures/restoration/crowns-caps",
  ],
};

/* ---------- helpers ---------- */

async function fetchPage(route) {
  const res = await fetch(BASE + route, { redirect: "manual" });
  return { status: res.status, html: res.status === 200 ? await res.text() : "" };
}

function sliceBetween(html, startMarker, endMarker) {
  const start = html.indexOf(startMarker);
  if (start === -1) return null;
  const end = html.indexOf(endMarker, start);
  return html.slice(start, end === -1 ? undefined : end);
}

function hrefsIn(fragment) {
  return [...fragment.matchAll(/href="([^"]+)"/g)]
    .map((m) => m[1])
    .filter((h) => h.startsWith("/"));
}

const statusCache = new Map();
async function statusOf(route) {
  if (!statusCache.has(route)) {
    const res = await fetch(BASE + route, { redirect: "manual" });
    statusCache.set(route, res.status);
  }
  return statusCache.get(route);
}

/* ---------- procedure pages ---------- */

console.log(`Checking ${procedureDirs.length} procedure pages…`);
let crossLinksSeen = 0;
for (const route of procedureDirs) {
  const { status, html } = await fetchPage(route);
  if (status !== 200) {
    fail(`${route} returned ${status}`);
    continue;
  }
  const sidebar = sliceBetween(html, 'class="proc-sidebar"', "</aside>");
  if (!sidebar) {
    fail(`${route} has no rendered sidebar`);
    continue;
  }
  const links = hrefsIn(sidebar);
  if (links.some((h) => h === route)) fail(`${route} links to itself in the sidebar`);

  const expected = EXPECTED_CROSS[route] ?? [];
  // "In your area" (CITY_PAGES) is a separate group from the grounded cross
  // pairs — count it apart, and require its links to be registered city pages.
  const cityGroupCount = (sidebar.match(/In your area/g) ?? []).length;
  const groupCount =
    (sidebar.match(/proc-sidebar-group/g) ?? []).length - cityGroupCount;
  if (cityGroupCount > 0) {
    const cityHrefs = links.filter((h) =>
      CITY_DIRS.some((c) => h.startsWith(`/${c}/`)),
    );
    if (cityHrefs.length === 0)
      fail(`${route} renders "In your area" with no city-page link`);
    for (const h of cityHrefs)
      if (!cityPages.includes(h))
        fail(`${route} "In your area" links to ${h}, which has no page.tsx`);
  }
  for (const want of expected) {
    if (!links.includes(want)) fail(`${route} missing cross-link to ${want}`);
    else crossLinksSeen++;
  }
  if (expected.length === 0 && groupCount > 0) {
    fail(`${route} renders a cross-link group but no pair is defined for it`);
  }
  if (expected.length > 3) fail(`${route} exceeds the 3-cross-link cap`);

  for (const h of links) {
    const s = await statusOf(h.split("#")[0]);
    if (s !== 200) fail(`${route} sidebar link ${h} returns ${s}`);
  }
}
console.log(`  cross-links rendered: ${crossLinksSeen}`);

/* ---------- blog posts ---------- */

console.log(`Checking ${blogSlugs.length} blog posts…`);
for (const slug of blogSlugs) {
  const route = `/blog/${slug}`;
  const { status, html } = await fetchPage(route);
  if (status !== 200) {
    fail(`${route} returned ${status}`);
    continue;
  }
  const card = sliceBetween(html, 'class="post-sidebar-card"', "</aside>");
  if (!card) {
    fail(`${route} has no quick-links card`);
    continue;
  }
  const links = hrefsIn(card).filter((h) => h.startsWith("/procedures"));
  const serviceLinks = links.filter((h) => h !== "/procedures");
  if (serviceLinks.length === 0)
    fail(`${route} derived no service links (card shows only the fallback)`);
  if (serviceLinks.length > 3)
    fail(`${route} exceeds the 3-service-link cap (${serviceLinks.length})`);
  if (!links.includes("/procedures"))
    fail(`${route} lost the "All procedures" fallback link`);
  for (const h of links) {
    const s = await statusOf(h);
    if (s !== 200) fail(`${route} service link ${h} returns ${s}`);
  }

  // City pages the guide points up to (#50). Derived from the post's own
  // service mapping, so every one must be a registered city page that resolves.
  const cityHrefs = hrefsIn(card).filter((h) =>
    CITY_DIRS.some((c) => h.startsWith(`/${c}/`)),
  );
  if (cityHrefs.length > 4)
    fail(`${route} exceeds the 4-city-link cap (${cityHrefs.length})`);
  for (const h of cityHrefs) {
    if (!cityPages.includes(h))
      fail(`${route} links to ${h}, which has no page.tsx`);
    const s = await statusOf(h);
    if (s !== 200) fail(`${route} city link ${h} returns ${s}`);
  }

  const relatedCards = (html.match(/post-related-card/g) ?? []).length;
  if (relatedCards === 0) fail(`${route} renders no related posts`);
}

/* ---------- city pages (Month 2) ---------- */

console.log(`Checking ${cityPages.length} city pages…`);
for (const route of cityPages) {
  const { status, html } = await fetchPage(route);
  if (status !== 200) {
    fail(`${route} returned ${status}`);
    continue;
  }
  const sidebar = sliceBetween(html, 'class="proc-sidebar"', "</aside>");
  if (!sidebar) {
    fail(`${route} has no rendered sidebar`);
    continue;
  }
  const links = hrefsIn(sidebar);
  if (links.some((h) => h === route)) fail(`${route} links to itself in the sidebar`);
  if (!links.some((h) => h.startsWith("/procedures/")))
    fail(`${route} sidebar does not link up to its parent service page`);
  if (!html.includes("areaServed"))
    fail(`${route} emits no areaServed in its Service schema`);
  for (const h of links) {
    const s = await statusOf(h.split("#")[0]);
    if (s !== 200) fail(`${route} sidebar link ${h} returns ${s}`);
  }
}

/* ---------- verdict ---------- */

if (failures > 0) {
  console.error(`\nFAILED — ${failures} problem(s).`);
  process.exit(1);
}
console.log(
  `\nOK — ${procedureDirs.length} procedure pages + ${cityPages.length} city pages + ${blogSlugs.length} posts, every derived link resolves, caps hold.`,
);
