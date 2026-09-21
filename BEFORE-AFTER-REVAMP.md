# Before & After revamp — what we need from Dr. Ma

For request #4 ("I want to revamp the before and afters portion of the website… I
accumulated some of my past cases that I'd want these to be replaced with:
**cosmetic bonding, porcelain veneers, Invisalign, porcelain crowns**").

**Status: blocked on the case photos.** Nothing has been swapped yet. Once the photos
arrive this is roughly a one-day build.

---

## The bigger problem we found while looking

**Every before/after photo currently on the site is a thumbnail.** All 34 of them are
between **250 and 275 pixels wide** — but they are displayed in a full-width
drag-to-compare slider that is 700–1,100px across on a desktop. The browser is
upscaling them 3–4×, so they render soft and pixelated. On a retina laptop or phone
it is worse again.

So this is not only a "swap in better cases" job — the current photos could not look
good at any size, because the source files are too small. Whatever cases Dr. Ma sends,
**please send the original full-size files**, not exports from a slide deck, website,
or email.

---

## What exists today, mapped to the four categories

| Dr. Ma's category | Gallery today | Cases | Note |
|---|---|---|---|
| **Cosmetic bonding** | — none — | 0 | No cosmetic bonding gallery exists. Needs building from scratch. |
| **Porcelain veneers** | `/resources/porcelain-veneers` | 5 | One of the five is actually a gum-surgery case reused. |
| **Invisalign** | `/resources/invisalign-results` | 2 | Thinnest gallery on the site. |
| **Porcelain crowns** | `/resources/restorations/crowns-caps` | 4 | Cases 3 & 4 are full-arch implant/denture cases, labelled as such. |

Other galleries currently live, **not** in Dr. Ma's list — keep, or retire?
Full Mouth Restoration (4 cases) · Dental Implants (3) · Dentures & Partials (2) ·
Surgery (2) · Composite Fillings (1)

> **Question for the practice:** should these stay alongside the four, or should the
> gallery narrow to just Dr. Ma's four categories? Retiring a gallery means its URL
> goes away, so we would set up redirects — not a problem, just needs a decision.

---

## What to send, per case

For each case, three things:

**1. Two photos — before and after**

- **Original full-size files.** Minimum **1,600px wide**; 2,000px+ is better.
  Straight out of the camera or exported from the practice software at full quality.
  Not screenshots, not photos of a screen, not images pulled off the old website.
- **JPEG or PNG.** HEIC is fine too, we can convert.
- **Shot the same way in both photos** — same angle, same distance, same lighting,
  same retraction. The slider wipes one image over the other, so if the framing
  shifts between before and after, the whole face appears to jump. This is the single
  biggest thing that makes a comparison look convincing or amateurish.
- **Landscape orientation** if possible. We crop to roughly 16:10; a landscape source
  gives us room to do that without cutting into the smile.

**2. One line about the case** — what the concern was and what was done. For example:

> *"Chipped and uneven front teeth after an old bonding failed. Rebuilt with direct
> composite bonding in a single visit, reshaped for even proportion."*

**3. Patient consent on file** — the site states, on every gallery page, that every
patient depicted has consented to display their photos online. So each new case needs
a signed photo release before it goes up. Please confirm this is in hand for each one.

---

## How to hand them over

Whatever is easiest — a shared Drive/Dropbox folder is ideal because the files are
large. Naming them like this saves us a round-trip, but we can sort it out if not:

```
bonding/case1-before.jpg      bonding/case1-after.jpg
bonding/case2-before.jpg      bonding/case2-after.jpg
veneers/case1-before.jpg      veneers/case1-after.jpg
invisalign/case1-before.jpg   invisalign/case1-after.jpg
crowns/case1-before.jpg       crowns/case1-after.jpg
```

**How many?** Four to six cases per category makes a gallery feel substantial. Two
feels thin — that is the current problem with Invisalign. If Dr. Ma has more, send
them all and we will curate.

---

## What happens once they land

1. Build the new **Cosmetic Bonding** gallery (new page, new route, added to the hub).
2. Replace the veneer, Invisalign and crown cases with Dr. Ma's.
3. Re-cut every image to the slider's aspect ratio at full resolution, and generate
   the responsive sizes so they stay sharp on retina screens.
4. Update the case counts and the gallery hub tiles.
5. Redirects for anything retired, so no existing link 404s.
