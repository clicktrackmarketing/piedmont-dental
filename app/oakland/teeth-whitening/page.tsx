import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import ProcedureDetail from "@/components/ProcedureDetail";
import AwardsStrip from "@/components/AwardsStrip";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";
import { getCategory } from "@/lib/procedure-categories";

// Month 2 city page — Teeth Whitening × Oakland (run-plan #47/#48). Reuses the
// procedure template; every clinical line is grounded in the parent Teeth
// Whitening page or a cited source listed at the foot of the page.

export const metadata: Metadata = {
  title: "Teeth Whitening for Oakland Patients",
  description:
    "Teeth whitening for Oakland patients — custom take-home trays or in-office bleaching, supervised by Drs. Martenson and Ma on Grand Avenue in Piedmont, 1.4 miles from Lake Merritt.",
  alternates: { canonical: "/oakland/teeth-whitening" },
  openGraph: {
    title: "Teeth Whitening for Oakland Patients — Piedmont Dental By Design",
    description:
      "Custom-tray or in-office whitening for Oakland smiles, a few minutes up Grand Avenue: exam first, professional-strength gel, and the same two dentists checking the result.",
    url: "https://piedmontdentalbydesign.com/oakland/teeth-whitening",
    type: "article",
    images: ["/img/procedures/cosmetic-dentistry/_index/figure-2.jpg"],
  },
};

const category = getCategory("cosmetic-dentistry");

export default function OaklandTeethWhiteningPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="tooth-whitening"
          cityPage={{ href: "/oakland/teeth-whitening", city: "Oakland" }}
          title="Teeth Whitening for Oakland Patients"
          tagline="Custom-tray or in-office bleaching for Oakland smiles — supervised on Grand Avenue, a few minutes up from the lake."
          intro={[
            "Whiter teeth, done the supervised way, for patients across Oakland: an exam first, custom trays or an in-office session, and the same two dentists checking the result. Our office is on Grand Avenue in Piedmont, about 1.4 miles from Lake Merritt and roughly seven minutes from Rockridge BART or Montclair Village without traffic.",
            "Piedmont's city line is a few blocks from our door and Grand Avenue runs from the lake straight up to it, so for much of Oakland we are closer than downtown. This page covers how whitening works here, which stains it fixes and which it will not, how in-office, take-home and drugstore whitening compare, what the evidence says about sensitivity, how to get here from Lake Merritt, Rockridge or Montclair, and what whitening costs in the wider market — the ground we cover at a complimentary consultation.",
          ]}
          stats={[
            { value: "1.4 mi", label: "From Lake Merritt" },
            { value: "3.1 mi", label: "From Montclair Village" },
            { value: "2 visits", label: "Custom take-home trays" },
            { value: "1–3 yrs", label: "Before a touch-up" },
          ]}
          sections={[
            {
              title: "Why Oakland patients come up Grand Avenue to whiten",
              body: [
                "Whitening looks like the simplest thing a dentist does — gel, tray, wait — but the results that hold up are planned by someone who has examined the teeth first. Here that is one of the two co-owners, Dr. Jill Martenson or Dr. David Ma: the same dentist checks your enamel and any existing dental work, says whether bleaching will reach the shade you have in mind, fits the trays and sees the result. If you later want a filling, crown or veneer matched to the new color, it is planned by the person who whitened the teeth around it.",
                "The other reason is geography. The address is Piedmont, but the Oakland city line is a few blocks away and Grand Avenue runs from Lake Merritt to our front door — about 1.4 miles, or six minutes without traffic. Rockridge BART is about 2.6 miles and Montclair Village about 3.1, each around seven minutes. For two short visits, that beats crossing town.",
              ],
            },
            {
              title: "How teeth whitening works here",
              body: [
                "Bleaching changes the color of natural enamel. It is simple and non-invasive, but it starts with a look rather than a gel: the American Dental Association advises a clinical exam before bleaching, with X-rays where appropriate, because the exam identifies what is causing the discoloration (ADA). That is what the complimentary consultation is for. If whitening is the right tool, the take-home system most of our patients choose runs like this:",
              ],
              bullets: [
                "First visit: impressions of your teeth, from which clear plastic trays are made to fit only you.",
                "Second visit: you try the trays, we adjust anything that rubs, and you leave with professional-strength gel and instructions.",
                "At home: the trays are worn with the gel twice a day for 30 minutes or overnight, for a couple of weeks — longer for deeper staining or a lighter target.",
                "Sensitivity while bleaching is normal and settles shortly after you stop; a desensitizing gel is available if it bothers you.",
                "Prefer one sitting? In-office whitening is the alternative; the ADA describes chairside bleaching as usually needing a single visit (ADA MouthHealthy).",
              ],
            },
            {
              title: "Who whitening is for",
              body: [
                "Dentists sort stains into two kinds, and the sorting decides the treatment (ADA). Extrinsic stains sit on the enamel surface — coffee, tea, red wine, tobacco, pigmented foods — and much of that lifts with a professional cleaning or a whitening toothpaste before any bleach is needed. Intrinsic discoloration is inside the tooth, from age, genetics, fluorosis or childhood antibiotics, and that is what bleaching is for. In practice we recommend it for:",
              ],
              bullets: [
                "Yellow or brown teeth from years of coffee, tea and wine — the discoloration that responds best.",
                "Teeth dulled with age, as the outer enamel wears thin and the yellower dentin shows through.",
                "Fluorosis marks from too much fluoride while the teeth were forming.",
                "Tetracycline staining from childhood antibiotics — the hardest case, discussed honestly below.",
                "Natural teeth that should be lightened before new veneers, crowns or fillings are matched to them.",
              ],
            },
            {
              title: "When we'll tell you whitening isn't the answer",
              body: [
                "Bleach acts only on natural enamel. Crowns, veneers, bonding and tooth-colored fillings keep the color they were made in, so whitening around them makes the difference show (ADA MouthHealthy). We tell you which restorations would need replacing before you start, not after.",
                "Some stains do not move. The ADA's patient guidance says gray-toned teeth may not bleach at all, brown teeth respond less well than yellow, and discoloration from medication or an old injury may not respond (ADA MouthHealthy). Tetracycline sits at the edge — three to four months of nightly treatment on average, by the ADA's clinical summary (ADA). Where a tooth will not bleach, a veneer or crown is the honest alternative, and we say so.",
                "Two more pauses. The American Academy of Pediatric Dentistry discourages full-arch bleaching while a child still has baby teeth (ADA), so this is an adult treatment; and we suggest postponing during pregnancy and breastfeeding — not because harm has been shown, but because peroxide has not been formally studied in those groups. Sensitive teeth are not a bar: the ADA lists sensitivity history among the pre-bleaching exam's questions, and it shapes the concentration and schedule we recommend.",
              ],
            },
            {
              title: "In-office vs take-home trays vs drugstore strips",
              body: [
                "The three differ in strength, fit and supervision more than in chemistry. All use hydrogen peroxide or carbamide peroxide, which break stain molecules into smaller, paler pieces (ADA MouthHealthy). Dentist-dispensed take-home systems typically run from 10 to 38 percent carbamide peroxide; in-office treatment uses concentrated hydrogen peroxide applied for up to 30 minutes at a time; over-the-counter strips use the same agents at lower concentrations (ADA).",
                "Stronger is not automatically better. A triple-blinded trial of 130 people compared two in-office sessions of 35 percent hydrogen peroxide with two weeks of 10 percent carbamide peroxide in custom trays at home, both groups starting with a desensitizing gel. Two weeks on, the at-home group showed a slightly larger color change; sensitivity was higher in-office only on the first day, and the authors called the rates similar (Journal of Applied Oral Science, 2021). An umbrella review of 24 systematic reviews found the same for the chair: moderate peroxide concentrations whiten as well as the strongest with less sensitivity, and the LED, halogen and laser lights sold as accelerators add no clinically relevant color change, while lasers may add sensitivity (Saudi Dental Journal, 2026).",
                "So in-office buys speed: one appointment instead of two weeks of trays. Take-home buys control: you stop at the shade you like, keep the trays for touch-ups, and a custom fit keeps gel off the gums — the ADA names poor-fitting trays as the usual cause of gum irritation (ADA). Drugstore products are cheaper and weaker, strips put the gel wherever they land, and the ADA warns that overuse can damage enamel or gums (ADA MouthHealthy). Only the first two come with someone who has examined your teeth.",
              ],
            },
            {
              title: "What the timeline looks like",
              body: [
                "Take-home whitening is two short visits — impressions, then the fitting — and a couple of weeks of wear. The ADA puts dentist-dispensed at-home whitening at a few days to a few weeks (ADA MouthHealthy); deeper staining takes longer, and you get a specific plan at the fitting rather than a guess before it. In-office whitening is one appointment. Tetracycline is the exception to every timeline: three to four months of nightly trays on average, according to the ADA, and sometimes no response at all.",
                "If new dental work is part of the plan, whiten first, wait about two weeks for the color to stabilize, then have the veneer, crown or filling made to match. Restorations cannot be lightened afterwards, so reversing the order means remaking them.",
              ],
            },
            {
              title: "Living with whiter teeth",
              body: [
                "Whitening is not permanent. Expect a touch-up every few years — typically one to three before the shade drifts — and sooner if you smoke or drink a lot of coffee, tea or red wine. Keep the trays: a two- or three-night top-up with a spare syringe of gel brings the shade back without another full course.",
                "On sensitivity, the ADA reports transient mild-to-moderate sensitivity in up to two-thirds of users, usually appearing within two or three days of starting and resolving by about the fourth day after treatment ends (ADA). Desensitizing agents consistently reduced it without blunting the whitening (Saudi Dental Journal, 2026), which is why we can provide a desensitizing gel rather than ask you to tough it out. After that it is ordinary care: brush, floss, keep your cleanings — a professional cleaning removes the surface stain bleach was never meant to treat (ADA) — and rinse with water after the coffee rather than giving it up.",
              ],
            },
            {
              title: "Getting here from Oakland",
              body: [
                "We are at 1331 Grand Avenue, Piedmont, CA 94610 — a two-storey building; the practice is on the upper level and the parking entrance sits below it. We share the address with The Oldershaw Clinic: look for our sign on the railing and take the planted walkway from the parking area to the front door.",
              ],
              bullets: [
                "From Lake Merritt: follow Grand Avenue up from the lake — about 1.4 miles, or six minutes without traffic.",
                "From Rockridge BART: about 2.6 miles, roughly seven minutes. From Montclair Village: about 3.1 miles, also about seven. MacArthur BART is a short drive.",
                "Parking: street parking is generally available on Grand Avenue near the entrance.",
                "By bus: AC Transit's Line 12 comes up Grand Avenue from the lake and stops at Grand & Euclid, about three-quarters of a mile below the office — it does not climb into Piedmont. Line 88 ends at Highland Avenue & Highland Way in Piedmont, about a mile away.",
              ],
            },
            {
              title: "Cost and coverage, without the runaround",
              body: [
                "Whitening is priced by the system used and the number of sessions, and insurers treat it as cosmetic. Delta Dental puts the average out-of-network cost of in-office bleaching at $40 to $700 per visit and notes it is usually not covered by dental insurance, though some plans do cover it (Delta Dental). Those are market figures, not ours; in-office treatment generally costs more than a take-home course.",
                "Instead of a number over the phone, we examine your teeth, say whether bleaching will reach the shade you want, and put the cost of the trays or the in-office session in writing before anything starts. CareCredit financing is available if that helps.",
              ],
            },
          ]}
          faqs={[
            {
              q: "Do you see teeth whitening patients from Oakland?",
              a: "Yes. Piedmont's border with Oakland is a few blocks from the office, and Grand Avenue runs from Lake Merritt straight to our door, about 1.4 miles. Dr. Martenson and Dr. Ma see whitening patients from Lake Merritt, Rockridge, Montclair and across the East Bay.",
            },
            {
              q: "How long is the drive from Lake Merritt, Rockridge or Montclair?",
              a: "About six minutes from Lake Merritt (1.4 miles), and about seven from Rockridge BART (2.6 miles) or Montclair Village (3.1 miles), all without traffic. MacArthur BART is a short drive as well.",
            },
            {
              q: "How many visits will I make from Oakland?",
              a: "Two for take-home whitening: one for impressions, one to fit the trays and collect the gel. In-office whitening is a single appointment. Later touch-ups happen at home with the trays you already have, so you come back only for regular check-ups.",
            },
            {
              q: "Where do I park?",
              a: "Street parking is generally available on Grand Avenue near the entrance. The parking entrance is below the building, and a planted walkway leads from the parking area up to the practice on the upper level. We share the address with The Oldershaw Clinic — look for our sign on the railing.",
            },
            {
              q: "Can I get here by bus or BART?",
              a: "AC Transit's Line 12 runs up Grand Avenue from the lake and stops at Grand & Euclid, about three-quarters of a mile below the office; it does not continue into Piedmont. Line 88 ends at Highland Avenue & Highland Way in Piedmont, about a mile away. Rockridge and MacArthur are the nearest BART stations, each a short drive.",
            },
            {
              q: "Is in-office whitening better than take-home trays?",
              a: "Faster, not better. A 130-person randomised trial found two weeks of 10 percent carbamide peroxide in custom trays produced a slightly larger color change than two in-office sessions of 35 percent hydrogen peroxide, with similar sensitivity overall (Journal of Applied Oral Science, 2021). Choose in-office for one visit; choose trays for control over the final shade and a kit for touch-ups.",
            },
            {
              q: "Will whitening work on my crowns, veneers or fillings?",
              a: "No. Bleach changes natural enamel only; crowns, veneers, bonding and tooth-colored fillings keep their original color (ADA MouthHealthy). If you have visible restorations, we whiten the natural teeth first, wait about two weeks for the shade to settle, then replace the restorations to match.",
            },
            {
              q: "Will my teeth be sensitive?",
              a: "Possibly, and briefly. The ADA reports mild-to-moderate transient sensitivity in up to two-thirds of users, typically starting two or three days in and settling by about the fourth day after treatment (ADA). We can provide a desensitizing gel, and the evidence shows desensitizers reduce sensitivity without reducing the whitening (Saudi Dental Journal, 2026).",
            },
            {
              q: "How long do the results last?",
              a: "Typically one to three years before a touch-up, less if you smoke or drink a lot of coffee, tea or red wine. Keep your trays: a two- or three-night top-up with a spare syringe of gel restores the shade without a full course.",
            },
            {
              q: "How much does teeth whitening cost in Oakland?",
              a: "Delta Dental puts the average out-of-network cost of in-office bleaching at $40 to $700 per visit and notes whitening is usually not covered by insurance because it is cosmetic, though some plans do (Delta Dental). We give a written figure after the consultation rather than a number over the phone, and CareCredit financing is available.",
            },
          ]}
          sources={[
            {
              label: "American Dental Association, MouthHealthy — Teeth Whitening",
              href: "https://www.mouthhealthy.org/all-topics-a-z/teeth-whitening",
            },
            {
              label: "American Dental Association — Oral Health Topics: Whitening (updated 16 August 2022)",
              href: "https://www.ada.org/resources/ada-library/oral-health-topics/whitening",
            },
            {
              label:
                "Journal of Applied Oral Science, 2021 — Triple-blinded randomized clinical trial comparing efficacy and tooth sensitivity of in-office and at-home bleaching techniques (Donassollo et al.)",
              href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8523096",
            },
            {
              label:
                "Saudi Dental Journal, 2026 — In-office tooth bleaching protocols: an umbrella review of systematic reviews and meta-analyses on whitening efficacy and tooth sensitivity (Hajeer & Hasan)",
              href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13031690",
            },
            {
              label: "Delta Dental — Teeth whitening cost and insurance: What you need to know",
              href: "https://www.deltadental.com/protect-my-smile/procedures/teeth-whitening/cost-and-insurance-coverage/",
            },
          ]}
          featuredImage="/img/lIVE Piedmont website images/Tooth Whitening.png"
          featuredAlt="Teeth Whitening — Piedmont Dental By Design, serving Oakland"
        />
        <AwardsStrip />
        <AboutCTA />
      </main>
      <SiteFooter />
    </>
  );
}
