/**
 * Exercises REAPPLY_BANNER_CHOICE against fake cookies.
 *
 * Run: node scripts/check-banner-consent.mjs
 *
 * The string is also the shape used for GTM Custom HTML, so it is checked for
 * ES5 syntax as well as behaviour.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

/* Read the source rather than import it, so this one script works whether the
   module is TypeScript or JavaScript. The file is ours and holds a single
   array-of-strings .join("") expression. */
const here = dirname(fileURLToPath(import.meta.url));
const LIB = [
  "../lib/bannerConsent.ts",
  "../lib/bannerConsent.js",
  "../src/lib/bannerConsent.ts",
  "../src/lib/bannerConsent.js",
]
  .map((r) => join(here, r))
  .find((p) => { try { readFileSync(p); return true; } catch { return false; } });
if (!LIB) { console.error("bannerConsent module not found"); process.exit(1); }
const expr = readFileSync(LIB, "utf8").split("export const REAPPLY_BANNER_CHOICE =")[1];
if (!expr) { console.error("REAPPLY_BANNER_CHOICE not found in " + LIB); process.exit(1); }
const SRC = new Function("return (" + expr.trim().replace(/;\s*$/, "") + ")")();

function run(cookie) {
  const calls = [];
  const gtag = (...args) => calls.push(args);
  const doc = { cookie };
  new Function("gtag", "document", SRC)(gtag, doc);
  return calls;
}

const enc = (o) => "cc_cookie=" + encodeURIComponent(JSON.stringify(o));
let failed = 0;
function check(name, ok, got) {
  if (ok) return console.log(`  ok    ${name}`);
  failed++;
  console.log(`  FAIL  ${name} — got ${JSON.stringify(got)}`);
}

// ES5: no let/const/arrow/template literal/class.
check(
  "is ES5",
  !/\b(let|const|class)\s|=>|`/.test(SRC),
  SRC.match(/\b(let|const|class)\s|=>|`/)?.[0],
);

let c = run("");
check("no cookie denies nothing", c.length === 0, c);

c = run("other=1; cc_cookie=%7Bnot-json");
check("unparseable cookie denies nothing", c.length === 0, c);

c = run(enc({ categories: ["necessary"] }));
check(
  "reject all denies ads + analytics + functionality",
  c.length === 1 &&
    c[0][1] === "update" &&
    c[0][2].ad_storage === "denied" &&
    c[0][2].ad_user_data === "denied" &&
    c[0][2].ad_personalization === "denied" &&
    c[0][2].analytics_storage === "denied" &&
    c[0][2].functionality_storage === "denied",
  c,
);

c = run(
  enc({
    categories: [
      "necessary",
      "ads",
      "analytics",
      "performance",
      "social",
      "unclassified",
      "emailmarketing",
    ],
  }),
);
check("accept all pushes no update", c.length === 0, c);

c = run(enc({ categories: ["necessary", "analytics", "performance"] }));
check(
  "ads-only refusal denies only the ad signals",
  c.length === 1 &&
    c[0][2].ad_storage === "denied" &&
    c[0][2].analytics_storage === undefined &&
    c[0][2].functionality_storage === undefined,
  c,
);

c = run(enc({ categories: ["necessary", "ads", "performance"] }));
check(
  "analytics-only refusal leaves the ad signals alone",
  c.length === 1 &&
    c[0][2].analytics_storage === "denied" &&
    c[0][2].ad_storage === undefined,
  c,
);

c = run(enc({ categories: "ads" }));
check("non-array categories denies nothing", c.length === 0, c);

console.log(failed ? `\n${failed} check(s) failed` : "\nall checks passed");
process.exit(failed ? 1 : 0);
