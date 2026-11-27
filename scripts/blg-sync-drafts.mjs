// Snapshots BabyLoveGrowth articles that are generated but NOT published into
// content/blg/drafts.json, so preview deployments can show them for review
// without hammering BLG's API (30 req/min per key) during every build.
// Usage: BABYLOVEGROWTH_BLOG_API_KEY=... node scripts/blg-sync-drafts.mjs
//        (or keep the key in .env.local — it is read from there if unset)
import fs from "node:fs";

const envFile = fs.existsSync(".env.local") ? fs.readFileSync(".env.local", "utf8") : "";
const KEY =
  process.env.BABYLOVEGROWTH_BLOG_API_KEY ??
  envFile.match(/^BABYLOVEGROWTH_BLOG_API_KEY=(.+)$/m)?.[1]?.trim();
if (!KEY) throw new Error("Set BABYLOVEGROWTH_BLOG_API_KEY");
const BASE = process.env.BABYLOVEGROWTH_BLOG_API_URL ?? "https://api.babylovegrowth.ai/api/integrations/v1";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(path) {
  for (let attempt = 0; attempt < 8; attempt++) {
    const res = await fetch(`${BASE}${path}`, { headers: { "X-API-Key": KEY, Accept: "application/json" } });
    if (res.status === 429) { await sleep(8000 * (attempt + 1)); continue; }
    if (!res.ok) throw new Error(`${path} -> ${res.status}`);
    await sleep(2200);
    return res.json();
  }
  throw new Error(`${path} kept hitting the rate limit`);
}

const all = [];
for (let offset = 0; ; offset += 50) {
  const batch = await get(`/articles?limit=50&offset=${offset}`);
  all.push(...batch);
  if (batch.length < 50) break;
}
const drafts = all.filter((a) => !a.published);
const full = [];
for (const a of drafts) {
  full.push(await get(`/articles/by-slug/${encodeURIComponent(a.slug)}`));
  console.log("pulled", a.slug);
}
fs.mkdirSync("content/blg", { recursive: true });
fs.writeFileSync("content/blg/drafts.json", JSON.stringify(full, null, 2) + "\n");
console.log(`${full.length} generated-only articles saved (${all.length - full.length} already published).`);
