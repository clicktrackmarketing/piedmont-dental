# Page 2 → Page 1: Keyword Action Plan — Piedmont Dental By Design

**Prepared for:** CTM implementation team
**Site:** piedmontdentalbydesign.com (Next.js) · **Client:** Piedmont Dental By Design, 1331 Grand Ave, Piedmont, CA 94610
**Companion doc:** `docs/local-seo-playbook.md` (off-site)

---

## 1. Executive summary

Four keyword groups sit on page 2. The research is unambiguous about why — and it is **not authority**. Semrush shows Authority Score 15 / 470 referring domains for the client vs. AS 17 / 437 for montclairsmiledesign.com, which ranks #1 for "teeth whitening oakland." We are at link parity with the winners. Three fixable root causes explain the gap:

1. **Thin indexable body copy on the money pages.** As crawled, the three procedure pages expose little beyond H1 + hero + NAP. "Piedmont" appears only in `<title>`/OG metadata — zero times in visible body text. Page-1 competitors run 800–2,500 words with FAQs, galleries, review snippets, and concrete pricing.
2. **Cannibalization and scatter.** Google serves `/faqs` for "teeth whitening piedmont" and the homepage for "veneers in piedmont" because the FAQ page and homepage carry stronger topical/geo signals than the dedicated pages — and nothing on the site links those signals back to the right URLs. All blog bodies have zero internal links; the veneers gallery doesn't link to the veneers page.
3. **No Oakland page exists.** Every page-1 result for "cosmetic dentist oakland" is a dedicated city-slugged page. The site architecture already expects city pages (`lib/internal-links.ts` has an empty `CITY_PAGES` array waiting for them) — none has been built. Oakland terms carry 2–5× the volume of the Piedmont terms.

### Honest expectations per keyword

| Keyword | Semrush (US) | Reality & target |
| --- | --- | --- |
| A. teeth whitening piedmont (40/mo) | #17, serving `/faqs` | The national SERP is polluted with Piedmont SC/AL/OK/NC practices. In the **Oakland-localized** SERP the client's whitening page is already **#1**. Work = consolidate signals on the whitening URL and kill the `/faqs` cannibalization. Expect the correct URL to replace `/faqs` within 30–60 days. |
| B. dental implants in piedmont (50/mo) | #18 | Localized SERP: already **#3**, behind "Piedmont Implant and Oral Surgery" — a specialist whose brand *is* the keyword. Do not promise #1. Target: solid #2–3 localized, page 1 nationally-ambiguous. |
| C. veneers in piedmont (50/mo) | #19, homepage ranks | Localized SERP: veneers page already **#1** (snippet even shows "start at $2,379 per tooth"). Work = move the ranking URL from homepage to the veneers page via geo copy + internal links. |
| D. cosmetic dentist oakland (110/mo) | #25–31, homepage | No Oakland page exists. Current #1 (Lim & Yabu) is a beatable ~700-word 2010s static page with no FAQ/photos/reviews/pricing — but all page-1 competitors have Oakland addresses. Honest target: **top-5 organic in 6–12 months** with a new dedicated page. Oakland-centroid map pack is largely unreachable from a Piedmont address — set that expectation now. Nobody on this SERP publishes pricing; our $2,379/tooth transparency is a genuine differentiator. |

**Measurement caveat:** Semrush US positions for the Piedmont terms are noisy geo-ambiguity artifacts. Track A–C via **GSC California-filtered impressions/positions** (Section 7), not the Semrush number.

---

## 2. Per-keyword plays

### A. teeth whitening piedmont → `/procedures/cosmetic-dentistry/tooth-whitening`

**Current state:** Google serves `/faqs` instead. The whitening page has strong FAQs but no "Piedmont" in body copy, a service-area sentence that omits Piedmont itself, and no before/after gallery (the only target service with zero gallery support). `components/FAQsList.tsx` carries a substantive whitening FAQ (id `"whitening"`, ~line 194) plus a whitening bullet in `"cosmetic-help"` (~line 163) — all plain strings with no links out.

**Changes:**
1. New meta description + rewritten intro ¶1 + rewritten service-area sentence (copy in Section 3).
2. `/faqs` fix: let FAQ answer bodies render links; add the cross-link outro sentences (Section 3.5) pointing the whitening and cosmetic-help FAQs at the whitening page.
3. Blog fix: add in-body links to `content/blog/teeth-whitening-piedmont-professional-vs-at-home.md` (Section 4).
4. Build the whitening before/after gallery (Section 3.7) — clone of the proven `/resources/invisalign-results` template.
5. Pass `areaServed` array to `ServiceSchema` (Section 5).

### B. dental implants in piedmont → `/procedures/restoration/dental-implants`

**Current state:** Strongest internal-link support (~12 links) but same body-copy gap: no "Piedmont" in visible text, service-area sentence omits Piedmont. `/smile-gallery/dental-implants` links only to `/resources/dental-implants`, not the procedure page.

**Changes:**
1. New meta description + rewritten intro ¶1 + rewritten service-area sentence (Section 3).
2. Add a procedure-page up-link from `/smile-gallery/dental-implants` (Section 4).
3. Schema `areaServed` (Section 5).
4. Expectation note: #1 localized is likely out of reach (specialist brand match). Measure share of impressions, not just position.

### C. veneers in piedmont → `/procedures/cosmetic-dentistry/porcelain-veneers`

**Current state:** The weakest-supported money page (~9 links, and its own gallery at `/resources/porcelain-veneers` doesn't link up to it — unlike `/resources/invisalign-results`, which does at ~line 260 and ranks #10 for a 1,900/mo term). No service-area section exists at all. No geo FAQ. That is exactly why the homepage ("veneers" + "in Piedmont Since 1996") outranks it.

**Changes:**
1. New meta description + rewritten intro ¶1 + **new** Service Area section + new geo FAQ (Section 3).
2. Add the gallery up-link card to `/resources/porcelain-veneers` (Section 4).
3. Fix the inconsistent `/resources/cosmetic-dentistry` cards: the veneer card currently points to the gallery while the whitening card points to the procedure page — point the veneer card at the procedure page (Section 4).
4. Schema `areaServed` (Section 5).
5. Note: local competitor veneers pages are thin (Ballan Tuck ~200 words) — the bar is low.

### D. cosmetic dentist oakland → NEW `/oakland/cosmetic-dentistry`

**Current state:** No page exists; the homepage limps in at #25–31. `lib/internal-links.ts` `CITY_PAGES` is an empty array with comment "Empty until the 12 Oakland + Berkeley pages are built" — registering entries auto-renders "In your area" sidebar links from parent procedure pages, so wiring is one config change. The cosmetic hub `app/procedures/cosmetic-dentistry/page.tsx` has zero Oakland mentions.

**Changes:**
1. Build `/oakland/cosmetic-dentistry` with the full draft copy in Section 3.6 (title, meta, H1, ~800 words, 5 FAQs, CTA).
2. Register it in `CITY_PAGES` so the cosmetic hub and procedure pages sidebar-link to it automatically.
3. Add it to the sitemap with a current `lastmod`.
4. Phase 2 (month 2–3, outlines only — Section 3.6): `/oakland/porcelain-veneers` (veneers oakland 110/mo + porcelain veneers oakland 70/mo) and `/oakland/dental-implants` (dental implants oakland 210/mo). Blueprint: montclairsmiledesign.com's ~2,500-word implants page (jump-nav sections for All-on-4 / snap-in / single-tooth, 9-question cost/insurance/financing FAQ, free-consult CTA).

---

## 3. Ready-to-paste copy

All copy below is written in the site's existing voice — plain, specific, patient-first, em-dash asides, no hype. **Nothing below invents prices, quotes, certifications, or offers.** The only figures used are already published: $2,379/tooth veneer starting price, 4.9★ across 350+ Google reviews, in Piedmont since 1996, Best of the East Bay.

### 3.1 Meta descriptions (≤155 chars, each names Piedmont)

**Tooth whitening** (`app/procedures/cosmetic-dentistry/tooth-whitening/page.tsx`, `description`):
> Professional teeth whitening in Piedmont, CA — custom take-home trays or in-office treatment, calibrated to your enamel. ADA-approved. 4.9★, 350+ reviews.

(154 chars)

**Dental implants** (`app/procedures/restoration/dental-implants/page.tsx`, `description`):
> Dental implants in Piedmont, CA — the gold standard for missing teeth. Specialist placement, restored in-house. Serving Piedmont and Oakland since 1996.

(152 chars)

**Porcelain veneers** (`app/procedures/cosmetic-dentistry/porcelain-veneers/page.tsx`, `description`):
> Porcelain veneers in Piedmont, CA — hand-shaped, color-matched shells starting at $2,379 per tooth. Transparent pricing, 4.9★ across 350+ reviews.

(146 chars)

### 3.2 Taglines (the `tagline` prop on `ProcedureDetail`)

- **Whitening:** `Professional, non-invasive bleaching in Piedmont — calibrated to your enamel.`
- **Implants:** `The gold standard for missing teeth — placed and restored right here in Piedmont.`
- **Veneers:** `Custom porcelain shells, hand-shaped and color-matched in person at our Piedmont office.`

### 3.3 Service-area sentences (each starts with Piedmont; veneers gets a NEW section)

**Whitening** — replace the "Service area" body sentence:
> We whiten smiles for patients from Piedmont first — our office has been on Grand Avenue since 1996 — and from the neighborhoods that surround us: Oakland, Lake Merritt, Montclair, Rockridge, Berkeley, and the wider East Bay.

**Implants** — replace the "Service area" body sentence:
> Piedmont is home — we've restored implants from our Grand Avenue office since 1996 — and we welcome implant patients from Oakland, Lake Merritt, Montclair, Rockridge, Berkeley, and across the East Bay.

**Veneers** — ADD a new `sections` entry (the page currently has none):
```
{
  title: "Service area",
  body: [
    "Piedmont patients have trusted us with their smiles since 1996 — and because our Grand Avenue office sits right on the Piedmont–Oakland line, many of our veneer patients come from Oakland, Lake Merritt, Montclair, Rockridge, Berkeley, and the surrounding East Bay.",
  ],
},
```

### 3.4 Rewritten intro first paragraphs (weave "in Piedmont" once, naturally)

**Whitening** — replace `intro[0]`:
> Teeth whitening (or bleaching) is a simple, non-invasive dental treatment used to change the color of natural tooth enamel — and it's the single most requested cosmetic treatment at our Piedmont office. Done professionally, it's an ideal way to enhance the beauty of your smile.

**Implants** — replace `intro[0]`:
> Dental implants are a great way to replace missing teeth and also provide a fixed solution to having removable partial or complete dentures. For our patients in Piedmont and the surrounding East Bay, implants provide excellent support and stability for these dental appliances.

**Veneers** — replace `intro[0]`:
> Veneers are very thin pieces of durable, tooth-shaped porcelain that are custom-made (for shape and color) by a professional dental laboratory. Bonded onto the front of teeth, they're the treatment our Piedmont patients ask about most when they want to completely transform a smile.

### 3.5 FAQ page cross-link outros (`components/FAQsList.tsx` — requires letting answer bodies render links)

Append to the **whitening FAQ** (id `"whitening"`, ~line 194):
> If you're weighing your options, start with our page on [professional teeth whitening in Piedmont](/procedures/cosmetic-dentistry/tooth-whitening) — it covers the full process, costs, and what results to expect.

Append to the **cosmetic-help FAQ** whitening bullet (~line 163): link the existing "teeth whitening" phrase to `/procedures/cosmetic-dentistry/tooth-whitening`.

Append to the **veneers FAQ** (~line 174):
> For case photos, pricing, and what the two-visit process involves, see our [porcelain veneers](/procedures/cosmetic-dentistry/porcelain-veneers) page.

### 3.6 Veneers geo FAQ (add to the `faqs` array on the veneers page)

```
{
  q: "How much do porcelain veneers cost in Piedmont, CA?",
  a: "At our Piedmont office, porcelain veneers start at $2,379 per tooth — the final figure depends on case complexity, the lab we use, and how much shape design is involved. Unlike most practices in the area, we publish our starting price so you can plan before you ever sit in the chair. You'll receive an exact written quote at your consultation, and we'll walk you through financing options if a full smile makeover is on the table.",
},
```

### 3.7 NEW PAGE — `/oakland/cosmetic-dentistry` (full draft)

**Title tag:** `Cosmetic Dentist in Oakland, CA | Piedmont Dental By Design`
**Meta description (152 chars):**
> Looking for a cosmetic dentist in Oakland, CA? Veneers, whitening, Invisalign & implants minutes from Grand Lake — 4.9★, 350+ reviews, serving Oakland since 1996.

**H1:** `Cosmetic Dentist in Oakland, CA`

**Body copy (~800 words):**

> **Minutes from Grand Lake, Lakeshore, Montclair, and Rockridge**
>
> Our office sits at 1331 Grand Avenue — technically in Piedmont, practically in Oakland. We're a few minutes from the Grand Lake Theatre, straight up Grand Avenue from Lakeshore, and an easy drive from Montclair, Rockridge, Glenview, and Crocker Highlands. Oakland patients have made up a large share of our practice since 1996 — nearly three decades of Oakland smiles, treated at the same address.
>
> If you've been searching for a cosmetic dentist in Oakland, here's what we do, what it costs, and why patients keep choosing us.
>
> **Porcelain veneers**
>
> Veneers are thin, custom-made porcelain shells bonded to the front of teeth — the most complete way to transform chips, gaps, discoloration, or misshapen teeth into a uniform smile. Each veneer is hand-shaped and color-matched in person, not picked from a chart. See the full process, case photos, and pricing on our [porcelain veneers](/procedures/cosmetic-dentistry/porcelain-veneers) page.
>
> **Teeth whitening**
>
> Professional whitening — custom take-home trays or a single in-office treatment — uses bleaching gels calibrated to your enamel at concentrations drugstore strips can't legally match. Results typically last one to three years. Details, costs, and FAQs are on our [teeth whitening](/procedures/cosmetic-dentistry/tooth-whitening) page.
>
> **Invisalign**
>
> Clear aligners straighten teeth without brackets or wires — often the right first step before veneers or whitening, and sometimes the only step a smile needs. Our [Invisalign](/procedures/cosmetic-dentistry/invisalign) page covers timelines, candidacy, and real patient results.
>
> **Dental implants**
>
> When a tooth is missing, an implant is the gold standard: a titanium root placed by a specialist, restored with a natural-looking crown by Dr. Martenson. One tooth or several — implants protect the surrounding teeth and the jawbone beneath. Learn more on our [dental implants](/procedures/restoration/dental-implants) page.
>
> **We publish our pricing — most cosmetic dentists in Oakland don't**
>
> Cosmetic dentistry is an investment, and we think you should be able to plan for it before you're in the chair. Porcelain veneers at our practice start at $2,379 per tooth, and our whitening and other procedure pages list typical costs the same way. Every treatment plan comes with an exact written quote — no surprises at checkout, no "call for pricing."
>
> **What Oakland patients say**
>
> We hold a 4.9-star rating across more than 350 Google reviews, and we've been voted Best of the East Bay. Those reviews come overwhelmingly from Oakland and Piedmont neighbors — people who found us the same way you just did, and stayed for decades. We'd rather let that record speak than make claims about ourselves.
>
> **Frequently asked questions**
>
> **Who is the best cosmetic dentist in Oakland?**
> "Best" is personal — it depends on the treatment you need, the experience you want, and who you trust with your smile. What we can tell you factually: Drs. Jill Martenson and David Ma have practiced at the same Grand Avenue office since 1996, hold a 4.9-star rating across 350+ Google reviews, and were voted Best of the East Bay. We'd encourage you to read recent reviews for any practice you're considering — including ours — and book a consultation before committing to cosmetic work.
>
> **Where exactly is your office?**
> 1331 Grand Avenue, right on the Piedmont–Oakland border. From Grand Lake or Lakeshore it's a straight shot up Grand Avenue; from Montclair or Rockridge it's a short drive. Street parking is typically easy compared to downtown Oakland.
>
> **How much does cosmetic dentistry cost in Oakland?**
> It depends entirely on the treatment. Porcelain veneers at our practice start at $2,379 per tooth; professional whitening is a fraction of that; Invisalign and implants are quoted per case. We publish starting prices on each procedure page and give every patient an exact written quote at consultation.
>
> **Do you take new patients from Oakland?**
> Yes — Oakland patients have been the backbone of this practice since 1996. Most of our new patients come from Grand Lake, Lakeshore, Crocker Highlands, Glenview, Montclair, and Rockridge.
>
> **Can I combine treatments, like whitening and veneers?**
> Often, yes — and sequence matters. Whitening comes first, because veneers and other restorations are color-locked once placed; we whiten, let the shade stabilize for two weeks, then match the porcelain to your new shade. We'll map the right order at your consultation.
>
> **Ready to see what's possible?**
> Book a consultation at our Grand Avenue office. We'll examine your smile, talk through options honestly — including the ones that cost less — and give you a written plan with exact pricing. **[Request an appointment]** or call the office.

**Phase 2 Oakland pages (outlines only — do NOT write yet):**

- **`/oakland/porcelain-veneers`** (veneers oakland 110/mo, porcelain veneers oakland 70/mo, smile makeover oakland 70/mo): H1 "Porcelain Veneers in Oakland, CA"; sections — what veneers fix, the two-visit process, the $2,379 starting price front and center (no Oakland competitor publishes pricing), before/after cases from `/resources/porcelain-veneers`, smile-makeover subsection targeting that 70/mo term, 6–8 cost/insurance/financing FAQs, consult CTA. Cross-link to/from the Piedmont veneers page and the Oakland hub.
- **`/oakland/dental-implants`** (dental implants oakland 210/mo — the single biggest volume in this project): model directly on montclairsmiledesign.com's blueprint — jump-nav sections for single-tooth / implant-supported bridge / denture stabilization, specialist-placement + in-house-restoration story, 8–9 cost/insurance/financing FAQs, free-consult CTA, ~1,500–2,500 words.

### 3.8 Whitening before/after gallery spec (NEW)

- **Route:** `/resources/teeth-whitening-results`
- **Page title / H1 (exact-match, mirroring the invisalign-results template):** `Teeth Whitening Before and After Results — Piedmont Dental By Design` / H1 `Teeth Whitening Before & After Results`
- **Template:** clone `/resources/invisalign-results` (the proven pattern — exact-match title, `BeforeAfterSlider` cases with patient stories, stats strip, up-link card). Register cases in `lib/smile-gallery.ts` and the page in `lib/resources.ts`.
- **Each case card needs:** before photo + after photo (`BeforeAfterSlider`), a 2–3 sentence story in the site voice (what the patient came in with — coffee staining, tetracycline, age-related yellowing — which method was used, take-home trays vs. in-office, and roughly how many shades of change), and treatment duration. Use only real, consented patient photos — do not fabricate cases or shade numbers.
- **Stats strip:** reuse real figures already on the whitening page (2 visits typical, 1–3 years before touch-up, take-home or in-office).
- **Up-link card copy (bottom of gallery):**
  > **Thinking about whitening your own smile?**
  > See how [professional teeth whitening in Piedmont](/procedures/cosmetic-dentistry/tooth-whitening) works — the process, the costs, and what results like these take.
- Also add the reverse link: a "See real results" card on the whitening procedure page pointing to the new gallery.

---

## 4. Internal-link change table

Rule of thumb: **keep nav/sidebar anchors generic** ("Tooth Whitening", "Porcelain Veneers") to avoid over-optimization. Geo-qualified anchors go ONLY in: FAQ outros, blog in-body links, gallery up-links, and resources cards.

| # | Source file | Target URL | New anchor text |
| --- | --- | --- | --- |
| 1 | `components/FAQsList.tsx` — whitening FAQ (id `"whitening"`, ~line 194) | `/procedures/cosmetic-dentistry/tooth-whitening` | "professional teeth whitening in Piedmont" |
| 2 | `components/FAQsList.tsx` — "cosmetic-help" whitening bullet (~line 163) | `/procedures/cosmetic-dentistry/tooth-whitening` | "teeth whitening" |
| 3 | `components/FAQsList.tsx` — veneers FAQ (~line 174) | `/procedures/cosmetic-dentistry/porcelain-veneers` | "porcelain veneers" |
| 4 | `content/blog/teeth-whitening-piedmont-professional-vs-at-home.md` — in body | `/procedures/cosmetic-dentistry/tooth-whitening` | "professional teeth whitening in Piedmont" |
| 5 | `content/blog/teeth-whitening-piedmont-professional-vs-at-home.md` — in body (secondary) | `/resources/teeth-whitening-results` (once built) | "before-and-after whitening results" |
| 6 | `/resources/porcelain-veneers` gallery page — add up-link card (mirror invisalign-results ~line 260 pattern) | `/procedures/cosmetic-dentistry/porcelain-veneers` | "porcelain veneers in Piedmont" |
| 7 | `/resources/cosmetic-dentistry` — veneer card (currently points to the gallery; whitening card already points to the procedure page) | `/procedures/cosmetic-dentistry/porcelain-veneers` | "Porcelain Veneers" (card title stays generic; card body may say "veneers at our Piedmont office") |
| 8 | `/smile-gallery/dental-implants` (currently links only to `/resources/dental-implants`) | `/procedures/restoration/dental-implants` | "dental implants in Piedmont" (up-link card) |
| 9 | `/resources/dental-videos` — whitening video title | `/procedures/cosmetic-dentistry/tooth-whitening` | "Tooth Whitening" (generic — this is list chrome) |
| 10 | `/resources/dental-videos` — veneers video title | `/procedures/cosmetic-dentistry/porcelain-veneers` | "Porcelain Veneers" (generic) |
| 11 | `lib/internal-links.ts` — `CITY_PAGES` array | `/oakland/cosmetic-dentistry` | Register the entry; the sidebar "In your area" group auto-renders from parent procedure pages (anchor stays as the architecture generates it) |
| 12 | New whitening gallery `/resources/teeth-whitening-results` up-link card | `/procedures/cosmetic-dentistry/tooth-whitening` | "professional teeth whitening in Piedmont" |
| 13 | `app/procedures/cosmetic-dentistry/page.tsx` (cosmetic hub — currently zero Oakland mentions) | `/oakland/cosmetic-dentistry` | "our Oakland patients" sentence in hub intro, or rely on the CITY_PAGES sidebar if that renders here |

**Blog-wide note:** all blog bodies currently have zero internal links. Fixes 4–5 are the priority (they target keyword A); adopt "every blog post links to at least one procedure page" as standing editorial policy.

---

## 5. Schema change

`components/schema/ServiceSchema.tsx` defaults `areaServed` to the plain string `"Piedmont, CA"`, and no page passes the prop. The org schema already models Piedmont, Oakland, and Berkeley as `City` entities — mirror that on the three money pages (and the new Oakland page):

```tsx
areaServed={[
  { "@type": "City", name: "Piedmont", sameAs: "https://en.wikipedia.org/wiki/Piedmont,_California" },
  { "@type": "City", name: "Oakland", sameAs: "https://en.wikipedia.org/wiki/Oakland,_California" },
  { "@type": "City", name: "Berkeley", sameAs: "https://en.wikipedia.org/wiki/Berkeley,_California" },
]}
```

Apply on: tooth-whitening, dental-implants, porcelain-veneers pages (match whatever entity shape the org schema already uses so the two stay consistent).

**Sitemap:** routes already carry 0.8 priority — fine. When any page above is edited, update its `lastmod` to the actual edit date (edited entries only — don't bulk-bump). Add `/oakland/cosmetic-dentistry` and `/resources/teeth-whitening-results` when they ship.

---

## 6. Off-site reinforcement (summary — full detail in `docs/local-seo-playbook.md`)

- **GBP services:** the four service descriptions (whitening, veneers, implants, cosmetic) are already drafted in the playbook — publish them, each linking to its procedure page URL.
- **Review coaching:** ask happy patients to mention the **treatment + city** naturally ("got veneers at their Piedmont office") — never scripted, per the playbook templates.
- **Bing Places:** claim/sync the listing (feeds Copilot/ChatGPT search; see `peoplelytics-search-console-setup` standard).
- **UTM-tagged GBP buttons:** tag website/appointment buttons per the CTM UTM standard so GBP sessions are separable in GA4 from organic.

---

## 7. Measurement

Track A–C in **Google Search Console filtered to United States → California** (or use the Regex + country compare). Semrush US positions are geo-ambiguity noise for Piedmont terms; Semrush is fine for keyword D (Oakland).

**GSC query regex (Performance → Query → Custom regex):**
```
(whiten|implant|veneer).*?(piedmont|oakland)|(piedmont|oakland).*?(whiten|implant|veneer)
```
Simpler variant when auditing one group: `whitening.*piedmont|piedmont.*whitening`.

**Page filters (run each as a separate view, watch which URL collects the impressions):**
- `/procedures/cosmetic-dentistry/tooth-whitening` vs `/faqs` — **the cannibalization metric.** Success = whitening page impressions for whitening queries rise while `/faqs` falls.
- `/procedures/cosmetic-dentistry/porcelain-veneers` vs `/` — same logic for veneers vs homepage.
- `/procedures/restoration/dental-implants`
- `/oakland/cosmetic-dentistry` (after launch) — Semrush position tracking for "cosmetic dentist oakland" is also reliable here.

**Map pack:** run the map-grid scan (per the local-seo-playbook measurement section) for the four GBP terms monthly — expect Piedmont-centroid wins, Oakland-centroid stasis.

**30/60/90 expectations:**
- **30 days:** pages re-crawled (request indexing in GSC after each ship); correct URLs begin appearing for their queries; `/faqs` cannibalization starts resolving.
- **60 days:** A and C serving the correct URLs in the CA-localized SERP; B holding #2–3 localized; Oakland page indexed and registering impressions.
- **90 days:** A–C stable page 1 localized; "cosmetic dentist oakland" moving from #25–31 toward teens; phase-2 Oakland pages shipped and indexed. Top-5 for keyword D remains a 6–12 month goal.

---

## 8. 30/60/90 sequencing

| Window | Ships | Items |
| --- | --- | --- |
| **Week 1** | On-page fixes (no new routes) | Meta descriptions, taglines, intro ¶1 rewrites, service-area sentences (incl. new veneers section), veneers geo FAQ (§3.1–3.6) · FAQsList link rendering + outros (links 1–3) · blog in-body links (link 4) · gallery/resources link fixes (links 6–10) · ServiceSchema `areaServed` (§5) · sitemap `lastmod` bumps · GSC "Request indexing" on all touched URLs |
| **Weeks 2–4** | New content | Whitening before/after gallery `/resources/teeth-whitening-results` (§3.8, needs consented photos — start collecting day 1) · `/oakland/cosmetic-dentistry` page (§3.7) · `CITY_PAGES` registration (link 11) · cosmetic hub Oakland mention (link 13) · sitemap additions · GBP services published + UTM buttons (§6) |
| **Month 2–3** | Phase 2 Oakland | `/oakland/porcelain-veneers` and `/oakland/dental-implants` (outlines in §3.7) · register both in `CITY_PAGES` · cross-links from the Piedmont procedure pages ("Also serving Oakland" sidebar via the existing architecture) · blog link policy rollout across remaining posts · first full measurement review against §7 |

---

*Facts used in copy are limited to what the practice already publishes: $2,379/tooth veneer starting price, 4.9★ / 350+ Google reviews, Best of the East Bay, practicing in Piedmont since 1996, and the existing whitening cost range ($400–$600 take-home) already live on the whitening page. If any of these change, update the copy before shipping.*
