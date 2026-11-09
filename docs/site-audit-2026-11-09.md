# Site audit, 2026-11-09 (Asana 1220260872910504)

Scope: every page in the sitemap (100 URLs), checked for typos, inconsistencies, photos that don't match the service, and any place that names Dr. Martenson as owner without Dr. Ma. Branch `audit/site-errors-2026-11-09`. All 100 pages return 200 locally after the changes.

## Fixed on this branch

**Co-owner (client ask)**
- Dr. Martenson and Dr. Ma both labelled "Co-owner · Cosmetic & General Dentistry" on their bio pages, the homepage doctor cards, About team cards and /about/team.
- Dr. Martenson's career timeline (2014) now says she co-owns the practice with Dr. Ma.
- Blog byline is now "By Dr. Jill Martenson & Dr. David Ma" (it was Dr. Martenson only, on every post).
- Two blog posts that said the practice is "led by" / implants are provided by Dr. Martenson alone now name both co-owners.
- `public/llms.txt`: removed "Founded the practice in 2000" and "Owner & lead dentist"; founded 1996, both listed as co-owners; award years and "30 years" brought in line with the site.
- Schema `jobTitle` for both doctors: "Co-owner, Cosmetic & General Dentist".

**Photos that didn't match the service**
- Surgical crown lengthening page: was a routine-exam photo whose filename named another practice ("Fusion Dental Care Raleigh NC"). Now a smiling-gumline photo. The restoration hub keeps the exam photo under a neutral filename.
- Sinus augmentation page: was a socket-graft surgery photo. Now an implant-in-bone model.
- Oakland/Berkeley crown pages and the homepage CEREC tile: were denture teeth on a plaster model. Now the CEREC milling unit photo already used on the CEREC page.
- Oakland/Berkeley gum disease pages: were a tartar-scraping render with healthy gums. Now the inflamed-gums photo from the gum disease page.
- Composite bonding/fillings cards (4 places): were a gold-foil filling render. Now a tooth-colored composite being light-cured.
- /resources/dental-implants case 01, captioned "single-tooth implant": was a full upper and lower rehabilitation. Now uses the real single-tooth implant case.
- /oakland: the "inside the practice" photo was an old outdoor group shot without Dr. Ma. Now the current team photo.
- Alt text corrected where it described a patient result that the stock photo doesn't show.

**Wrong facts and contradictions**
- Wrong phone number (510) 956-6475 in two blog posts. Now (510) 350-3937.
- Blog posts claimed the practice takes "most major PPO and HMO plans". The insurance page says out-of-network PPO/traditional only, no managed care. Posts now match the insurance page.
- Notice of Privacy Practices showed internal notes ("CTA", "Note: PARTIAL…") and a dead WordPress PDF link. Removed.
- FAQ "four out of five people have periodontal disease" now uses the CDC 42% figure, matching the gum disease pages.
- Clinical errors on procedure pages:
  - allograft described as synthetic bone
  - connective-tissue graft source
  - bite-wing X-ray frequency
  - "magnified 30% for detail"
  - CAD/CAM expansion
  - curing light called "UV"
  - fluoride "gel" drops
  - an ADA claim about electric brushes
  - gum-disease staging
  - "4 quarterly appointments"
  - Invisalign tray cleaning (toothpaste)
  - X-rays described as "film" when the practice is digital
- Periodontist wording: pages now consistently name Dr. Cangini as the practice's periodontist.
- "Over 30 years" changed to "30 years" (DDS 1996).
- Award years now include 2026 in the announcement bar, hero and About, matching the 2026 banner.
- Oakland veneers page said "We will not quote a fee on a web page" and then pointed to the fee. Reworded.
- Footer "Last updated May 2026" changed to November 2026.
- Gummy-smile "Gum Contouring" card linked to gum *grafting* (the opposite procedure). Now links to crown lengthening.
- Composite Bonding cards now link to the bonding gallery.
- "Multiple cases" on the composite card changed to "Case study" (there is one case).
- Dead AGD link fixed.

**Typos and wording**
- "Veteran Affairs"
- "Medi-cal / Medi-care"
- "University of Buffalo"
- staff bio grammar
- "farmer's markets"
- "FAQ's"
- "Post Op"
- literal `&ldquo;` showing on two pages
- CTA heading on every procedure page lowercased brand names ("cerec®", "invisalign®") and doubled "??"
- British spellings: colour, neighbour, storey, randomised, itemised

## Still open: needs the client or the team

1. **"Since 1996"**: Dr. Martenson joined Dr. Herrero's existing practice in 1997. What does 1996 refer to (her DDS, or the practice's founding)? It is used as the founding date in schema and hero copy.
2. **Blog prices contradict the procedure-page fees.** Examples:
   - implants: $3,000–5,500 in a post vs from $8,474 on the procedure page
   - veneers: $1,200–2,500 vs from $2,379
   - CEREC crowns: $1,200–1,800 vs $1,949–2,351

   The two Invisalign posts also disagree with each other. Decide whether these are "market ranges" (label them) or align them to the practice's fees.
3. **"Amalgam-free"** (cosmetic hub) vs the composite-fillings FAQ implying some amalgam use. Which is true?
4. **Invisalign age**: "adults and teens" on the cosmetic hub vs "Adults 18+" on the Invisalign page.
5. **Blog hero photos that don't fit** (new photos needed):
   - how-to-choose-cosmetic-dentist: another dentist's name tag ("Dt. Furkan DİLER") is visible
   - invisalign-vs-braces-adults: shows a young teen
   - family-dentist-piedmont: aligners and a whitening syringe
   - waterpik-vs-flossing: a floss box, no Waterpik
   - what-is-smile-design: a plain portrait
   - cerec-same-day-crowns: a routine exam
   - trusted-dentist-oakland: the alt says exterior but the photo shows a patient in the chair

   Several posts' alt text also needs rewriting once the photos are chosen.
6. **Smile gallery photos to confirm with Dr. Ma**:
   - dentures case 2 "before" looks already finished
   - composite-fillings case looks like a full veneer makeover
   - veneers cases 03/04 (different framing in before vs after)
   - full-mouth cases 1 and 3 may be the same patient
   - other-procedures upper-arch photos are tiny (~270px) and pixelate
7. **Homepage tiles**:
   - "Full mouth restoration" shows a teen in safety glasses
   - "Gum care" shows a man in a café
   - the CEREC mill photo is only 600px wide and looks soft at hero size
8. **Staff list**: llms.txt lists Julie (RDH) and Debra (RDA), who are not on the website team page. Are they still with the practice?
9. **Dr. Cangini**: the bio says "three institutions and three specialties" but names two institutions; "26 yrs" doesn't line up with his 1994 degree; "board-certified" names no board.
10. **Reviews**: quotes differ between the home page and the reviews page ("insures"/"ensures", "Spa like"/"spa-like"), although the reviews page says they are unedited. Two reviews mention a hygienist "Manny" who isn't on the team page.
11. **Lower-priority copy**:
    - blog posts use semicolons where dashes belong
    - 7 posts end with a closing line that should be a link
    - the blog index shows "5 min read" on every card and says "we publish around once a month"
    - the procedures hub lists Root Canal Therapy with no page
    - the dental-videos page repeats the implant video 5 times
    - the financing "calculator" tile goes to the CareCredit home page
    - several clinical numbers vary between pages (implant timeline 4–6 vs 4–9 months; pocket-depth thresholds; floss length)
