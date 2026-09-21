# Pricing audit — every price published on the site

Prepared for Dr. Ma's request #2 ("Typical price ranges of procedures on website are
inaccurate and need to be changed. We will provide new ranges.")

**Status: blocked on new ranges from the practice.** Nothing has been changed yet —
we will not guess at dental fees. Fill in the "New range" column below and the swap
is a same-day job.

**How to use this:** write the new number in the `New range` cell for each procedure.
Every file listed under that procedure gets updated together — that is what keeps the
site from contradicting itself.

---

## ⚠️ Read this first — the site currently contradicts itself

Independent of the new ranges, four procedures are already published at **different
prices in different places**. Whatever the new numbers are, these need to land on one
answer each.

| Procedure | Procedure page says | But a blog post says |
|---|---|---|
| Porcelain veneers (per tooth) | **$1,500–$2,500** | **$1,200–$2,500** and **$1,000–$2,500+** |
| Dental implant (single) | **$4,000–$6,000** | **$3,000–$5,500** |
| Invisalign | **$4,500–$7,500** | **$4,500–$8,500** and **$3,000–$7,000** |
| Cosmetic bonding (per tooth) | *(no procedure page price)* | **$300–$600** and **$300–$700** |

---

## A. Practice-quoted prices — highest priority

These say "at our practice" or "in our area". A patient reads these as *your* fee.

### 1. Composite filling — current **$200–$400** per filling

New range: `____________`

- `app/procedures/restoration/composite-fillings/page.tsx:101` — FAQ answer
- `app/procedures/restoration/page.tsx:45` — pricing table row
- `app/procedures/restoration/page.tsx:84` — FAQ answer
- `app/procedures/restoration/page.tsx:16` — **page meta description** ("From $200 fillings") — shows in Google results
- `app/procedures/cleanings-prevention/page.tsx:77` — FAQ answer
- `app/procedures/cleanings-prevention/page.tsx:207` — body copy

### 2. Porcelain crown — current **$1,200–$1,800** per tooth

New range: `____________`

- `app/procedures/restoration/crowns-caps/page.tsx:110` — FAQ answer
- `app/procedures/restoration/page.tsx:46` — pricing table row
- `app/procedures/restoration/page.tsx:84` — FAQ answer
- `app/procedures/cleanings-prevention/page.tsx:77` — FAQ answer
- `app/procedures/cleanings-prevention/page.tsx:224` — "Crown — $1,200–$1,800" callout
- `content/blog/cerec-same-day-crowns-oakland.md:91` — CEREC same-day crown, cost table
- `content/blog/cerec-same-day-crowns-oakland.md:92` — traditional lab crown, **$1,000–$1,700** (separate number — confirm)

### 3. Fixed bridge (3-unit) — current **$3,000–$4,500**

New range: `____________`

- `app/procedures/restoration/fixed-bridges/page.tsx:102` — FAQ answer
- `app/procedures/restoration/page.tsx:47` — pricing table row
- `app/procedures/restoration/page.tsx:84` — FAQ answer

### 4. Dental implant (single tooth) — current **$4,000–$6,000**

New range: `____________`

- `app/procedures/restoration/dental-implants/page.tsx:97` — FAQ answer
- `app/procedures/restoration/page.tsx:48` — pricing table row
- `app/procedures/restoration/page.tsx:84` — FAQ answer
- `app/procedures/cleanings-prevention/page.tsx:77` — FAQ answer
- `app/procedures/cleanings-prevention/page.tsx:231` — "Implant — $4,000–$6,000" callout
- ⚠️ `content/blog/dental-implants-piedmont-ca.md:74` — says **$3,000–$5,500**, conflicts with the above

### 5. Porcelain veneers (per tooth) — current **$1,500–$2,500**

New range: `____________`

- `app/procedures/cosmetic-dentistry/porcelain-veneers/page.tsx:77` — FAQ answer
- ⚠️ `content/blog/veneers-cost-oakland-2026.md:24` — **$1,200–$2,500**
- ⚠️ `content/blog/veneers-cost-oakland-2026.md:78` — **$1,200–$2,500**
- ⚠️ `content/blog/porcelain-veneers-vs-dental-bonding.md:54` — **$1,000–$2,500+**
- ⚠️ `content/blog/porcelain-veneers-vs-dental-bonding.md:109` — **$1,000–$2,500**

Related veneer figures in the same blog post, confirm separately:
- `content/blog/veneers-cost-oakland-2026.md:25` — no-prep / Lumineers **$900–$2,000**
- `content/blog/veneers-cost-oakland-2026.md:26` — composite resin veneers **$300–$700**
- `content/blog/veneers-cost-oakland-2026.md:27` — full smile, 8–10 veneers **$10,000–$25,000+**

### 6. Invisalign® — current **$4,500–$7,500**

New range: `____________`

- `app/procedures/cosmetic-dentistry/invisalign/page.tsx:103` — FAQ answer
- ⚠️ `content/blog/invisalign-vs-braces-adults-east-bay.md:43` — comparison table, **$4,000–$8,500**
- ⚠️ `content/blog/invisalign-vs-braces-adults-east-bay.md:72` — Invisalign Comprehensive **$4,500–$8,500**
- `content/blog/invisalign-vs-braces-adults-east-bay.md:73` — Invisalign Lite **$3,000–$5,000** (confirm if offered)

Competitor figures in the same table — not our fees, but confirm they are still fair:
- `:74` traditional metal braces **$3,000–$6,500**
- `:75` ceramic braces **$3,500–$7,500**

### 7. Teeth whitening (custom take-home trays) — current **$400–$600**

New range: `____________`

- `app/procedures/cosmetic-dentistry/tooth-whitening/page.tsx:79` — FAQ answer

In-office whitening is described only as "runs higher" — no number published.
Add one? `____________`

### 8. Cosmetic bonding (per tooth) — **no price on any procedure page**

New range: `____________`

Currently only appears in blog posts, at two different numbers:
- ⚠️ `content/blog/porcelain-veneers-vs-dental-bonding.md:54` — **$300–$600**
- ⚠️ `content/blog/porcelain-veneers-vs-dental-bonding.md:109` — **$300–$600**
- ⚠️ `content/blog/veneers-cost-oakland-2026.md:26` + `:78` — **$300–$700** (as "composite resin veneers")

### 9. Smile design consultation — current **$100–$300**

New range (or "complimentary"): `____________`

- `content/blog/what-is-smile-design-consultation.md:112` — currently hedged as "some
  practices charge…", then points the reader to call. Low risk, but if consultations
  are complimentary it is worth saying so outright.

---

## B. Not published — no action needed

- `content/standalone/invisalign-clear-aligners.md:77` (**$3,000–$7,000**) and
  `content/standalone/professional-teeth-whitening-piedmont.md:68` (**$500**, "$50 off
  promotions") both contain stale prices, **but `content/standalone/` is not wired to any
  route** — these files are not on the live site. Fix them only if they are ever published.

## C. Not procedure prices — ignore

- `content/legal/terms-and-conditions.md:59` — **$100** liability cap (legal text)
- `content/blog/waterpik-vs-flossing.md:51` — **$40–$100+** cost of a Waterpik device

---

## Recommendation

Right now the same fee is hardcoded in up to six places, which is why the site has
drifted out of sync with itself. If prices are going to be revised periodically, it is
worth moving them into a single `lib/pricing.ts` module that every page reads from —
then a fee change is one edit, and the site cannot contradict itself again.

Happy to do that as part of the swap if you want it; say the word.
