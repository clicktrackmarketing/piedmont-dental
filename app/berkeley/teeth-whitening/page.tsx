import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import ProcedureDetail from "@/components/ProcedureDetail";
import AwardsStrip from "@/components/AwardsStrip";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";
import { getCategory } from "@/lib/procedure-categories";

// Month 2 city page — Teeth whitening × Berkeley (run-plan #47/#48). Reuses the
// procedure template; every clinical line is grounded in the parent whitening
// page or a cited source listed at the foot of the page.

export const metadata: Metadata = {
  title: "Teeth Whitening for Berkeley Patients",
  description:
    "Teeth whitening for Berkeley patients — custom take-home trays or in-office treatment with Drs. Martenson and Ma on Grand Avenue in Piedmont, 2.8 miles from Elmwood. Complimentary consultation.",
  alternates: { canonical: "/berkeley/teeth-whitening" },
  openGraph: {
    title: "Teeth Whitening for Berkeley Patients — Piedmont Dental By Design",
    description:
      "Supervised whitening a short drive down from Elmwood and Claremont: an exam first, custom trays or an in-office session, and someone to call if your teeth get sensitive.",
    url: "https://piedmontdentalbydesign.com/berkeley/teeth-whitening",
    type: "article",
    images: ["/img/procedures/cosmetic-dentistry/_index/figure-2.jpg"],
  },
};

const category = getCategory("cosmetic-dentistry");

export default function BerkeleyTeethWhiteningPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="tooth-whitening"
          cityPage={{ href: "/berkeley/teeth-whitening", city: "Berkeley" }}
          title="Teeth Whitening for Berkeley Patients"
          tagline="Supervised whitening for Berkeley patients — custom trays or an in-office session, a short drive down from Elmwood."
          intro={[
            "Whiter teeth, supervised by the dentist who examined them. Dr. Jill Martenson and Dr. David Ma offer custom take-home tray whitening and in-office treatment from our office on Grand Avenue in Piedmont — about 2.8 miles from the Elmwood district, 3.6 miles from Claremont and 4.3 miles from Downtown Berkeley BART, without traffic.",
            "Berkeley has no shortage of dentists, so the fair question is why anyone would drive down to Piedmont for something as routine as whitening. Our answer is the supervision that comes with it: an examination before any gel touches your teeth, trays made from impressions of your own mouth, and one of the two co-owners checking your shade at every visit. This page covers how whitening works here, who it helps and who it won't, how in-office treatment compares with take-home trays and drugstore strips, what it costs on the open market, and the practical business of getting here from Berkeley — by car or on the 88 bus.",
          ]}
          stats={[
            { value: "2.8 mi", label: "From Elmwood" },
            { value: "~13 min", label: "From Downtown Berkeley BART" },
            { value: "2 visits", label: "Custom take-home trays" },
            { value: "Years", label: "Between touch-ups" },
          ]}
          sections={[
            {
              title: "Why Berkeley patients drive down to Piedmont for whitening",
              body: [
                "Whitening looks like a commodity — a gel, a tray, a shade guide — and if that were all it was, the nearest office would do. What you are really choosing is the person who decides whether your teeth should be bleached at all, how strong the gel should be, and what to do when they turn sensitive on day three. Here that person is Dr. Martenson or Dr. Ma at every visit: the dentist who examines you is the one who fits your trays and checks your shade, not a rotating associate.",
                "The drive is shorter than most Berkeley patients expect. Piedmont is the small city that Oakland surrounds, a few miles south of the Elmwood and Claremont end of Berkeley. From Elmwood, around College and Ashby, our office is about 2.8 miles — roughly nine minutes without traffic. From Claremont, at Ashby and Domingo, it is about 3.6 miles and eleven minutes. Even from Downtown Berkeley BART or the UC Berkeley campus you are looking at 4.3 to 4.4 miles and about thirteen minutes.",
                "Once you are here, everything happens under one roof: the examination and digital X-rays, the impressions for your trays, the fitting visit, any in-office session, and the shade checks and touch-up gel afterwards. If a filling or crown needs replacing to match your new shade, that happens here too — after the whitening, never before.",
              ],
            },
            {
              title: "How whitening works at our Piedmont office",
              body: [
                "It starts with a complimentary consultation. Dr. Martenson or Dr. Ma examines your teeth and gums, reviews your X-rays, and works out what is causing the discoloration — because the cause decides whether bleaching will work. The American Dental Association's clinical guidance says the same thing: a clinical exam, with X-rays where appropriate, before bleaching begins, to identify what is actually behind the color (ADA Oral Health Topics). If whitening is the right tool, you choose between two routes:",
              ],
              bullets: [
                "Custom take-home trays, the most popular option. At the first visit we take impressions of your teeth and have clear, custom-fitted trays made. At the second you try them on, we adjust the fit, and you go home with professional-strength gel. Depending on how deep the staining is and how white you want to go, you wear the trays either twice a day for 30 minutes or overnight, for a couple of weeks.",
                "In-office whitening, for patients who want the change in a single appointment. The ADA describes in-office products as concentrated hydrogen peroxide solutions applied for up to 30 minutes (ADA Oral Health Topics), and chairside bleaching usually needs only one visit (ADA MouthHealthy).",
                "Whichever route you take, the active ingredient is one of two bleaches, hydrogen peroxide or carbamide peroxide (ADA MouthHealthy). Carbamide peroxide, the usual choice for trays, breaks down in the mouth into hydrogen peroxide at roughly a third of its labeled strength, which is part of why tray whitening is gentler (Journal of Applied Oral Science, 2018).",
                "You leave with written care instructions for your teeth and the trays, and we ask you to keep up regular check-ups so the result lasts.",
              ],
            },
            {
              title: "Who whitening is for",
              body: [
                "Whitening changes the color of natural enamel and nothing else, so it suits people whose teeth are structurally sound but darker than they would like. Yellow teeth usually bleach well; brown teeth may respond less completely (ADA MouthHealthy). The reasons we see most often:",
              ],
              bullets: [
                "Yellow or brown staining from years of coffee, tea, red wine or tobacco — the everyday causes on the ADA's own list (ADA MouthHealthy).",
                "Normal wear of the outer enamel, which lets the yellower dentin underneath show through as we get older.",
                "Fluorosis, the mottling left by too much fluoride while the teeth were forming. The ADA notes that brown fluorosis marks tend to respond better than white ones (ADA Oral Health Topics).",
                "Tetracycline staining from antibiotics taken in childhood — the slow case. The ADA says these stains may be diminished, but treatment averages three to four months of nightly tray use rather than a couple of weeks (ADA Oral Health Topics).",
              ],
            },
            {
              title: "When we'll tell you whitening isn't the answer",
              body: [
                "Some teeth will not bleach, and we would rather say so at the consultation than sell you trays. The ADA's patient guidance is blunt: whitening “will not work on caps, veneers, crowns or fillings,” and it is unlikely to help when the discoloration comes from a tooth injury or from certain medications (ADA MouthHealthy). Gray-toned teeth are the other hard case — they may not change at all (ADA MouthHealthy). For those, a veneer or bonding that covers the color rather than lightening it is often the honest recommendation, and we can walk you through both.",
                "Whitening also waits when there is something more urgent to treat. If the exam finds decay or gum disease, that comes first and the bleaching afterwards. Peroxide gel that reaches the gums can irritate them; the ADA describes that irritation as typically transient and resolving shortly after treatment, and a tray made from your own impressions is the way to keep the gel on the enamel and off the gums in the first place (ADA Oral Health Topics).",
                "One more honest limit: if you are pregnant or nursing, we ask you to wait. Not because harm has been shown, but because peroxide gels have not been formally studied in those groups, and we would rather be cautious.",
              ],
            },
            {
              title: "Whiten first if veneers, crowns or fillings are in your plans",
              body: [
                "Bleach changes natural enamel only. Tooth-colored fillings, crowns and veneers keep whatever shade they were made in — the ADA's clinical page is explicit that only the natural teeth will be affected (ADA Oral Health Topics). For anyone planning new dental work, that means the order matters.",
                "Our sequence is whitening first, then a pause of about two weeks for the new shade to settle, and only then the crown, veneer or filling, matched to the lighter color. Do it the other way round and the older restoration becomes a visibly darker island in a whiter smile, and the only fix is to remake it. If you already have visible fillings or crowns on front teeth, we will assess at the consultation whether they should be replaced after bleaching so that everything matches — a decision made with you up front, not a surprise afterwards.",
              ],
            },
            {
              title: "In-office vs take-home trays vs over-the-counter strips",
              body: [
                "This is the comparison most people are really weighing when they search for whitening, so here it is plainly. If you want the change for a particular date and can accept a day of sensitivity, in-office. If you want the most control with the least sensitivity, trays. If your staining is mild and your teeth are sound, strips are not a bad start — but see us first. The detail:",
              ],
              bullets: [
                "In-office: one appointment, the strongest gel, the fastest change. The trade-off is sensitivity. Across clinical trials the average absolute risk of tooth sensitivity is about 63 percent for in-office bleaching against about 51 percent for at-home trays — an average across studies, not a single trial (Journal of Applied Oral Science, 2018). It is usually mild and tends to fade within 24 hours of the session (same source).",
                "Dentist-made take-home trays: the middle path and, in our office, the most popular one. The gels typically run from 10 to 38 percent carbamide peroxide (ADA Oral Health Topics) — strong enough to shift real staining, but slower and gentler than chairside treatment. Because the trays are made from impressions of your teeth, the gel stays on the enamel and off the gums, and a course takes anywhere from a few days to a few weeks (ADA MouthHealthy).",
                "Over-the-counter strips and kits: the cheapest way in, and reasonable for mild surface stain. The bleach concentration is lower than what a dentist would use (ADA MouthHealthy), the strip is one size for every mouth, and nobody has examined your teeth first, so a crown, a gray tooth or an early cavity gets the same treatment as everything else. If you go this route anyway, the ADA suggests a product carrying its Seal of Acceptance, which means it has been tested for safety and effectiveness (ADA MouthHealthy).",
              ],
            },
            {
              title: "What the timeline looks like from Berkeley",
              body: [
                "For custom trays, plan on two trips down to Piedmont, each of them short. The first is the consultation, exam and impressions. The second is the fitting: you try the trays, we adjust anything that presses on the gums, and you leave with the gel and instructions. From there the work happens at home in Berkeley — 30 minutes twice a day, or overnight, for a couple of weeks, depending on the starting shade and how much lighter you want to go. We look at the result at your next check-up and send you off with touch-up gel to keep.",
                "In-office whitening is one appointment. Tetracycline staining is the exception to every timeline on this page: the ADA puts the average at three to four months of nightly tray use, and we will tell you at the consultation if that is what you are looking at (ADA Oral Health Topics).",
                "Sensitivity runs on its own clock. With trays or strips it tends to appear two to three days into the course and usually settles by the fourth day after you finish (ADA Oral Health Topics); after an in-office session it typically eases within 24 hours (Journal of Applied Oral Science, 2018). If it bothers you, call — a desensitizing gel is easy to prescribe.",
              ],
            },
            {
              title: "Keeping the result: aftercare and touch-ups",
              body: [
                "Whitening is not permanent. Most patients need a touch-up after a few years, and sooner if they smoke or drink a lot of coffee, tea or red wine — the same things the ADA lists among the common causes of discoloration in the first place (ADA MouthHealthy). Keep your trays: a two- or three-night touch-up with the spare gel we give you is usually enough to bring the shade back when you notice it drifting.",
                "Between touch-ups, the useful habits are the boring ones: regular cleanings, and, if you like, a whitening toothpaste that carries the ADA Seal of Acceptance (ADA MouthHealthy). You will get written care instructions for the trays; look after them, because the same trays serve every touch-up.",
              ],
            },
            {
              title: "Getting here from Berkeley",
              body: [
                "Our office is at 1331 Grand Avenue, Piedmont, CA 94610. It is a two-storey building: the practice occupies the upper level and the parking entrance is underneath it. We share the address with The Oldershaw Clinic, so look for our name on the railing and take the planted walkway from the parking area up to the front door.",
              ],
              bullets: [
                "Driving from the nearest end of Berkeley: about 2.8 miles from Elmwood (College and Ashby), roughly nine minutes without traffic, and about 3.6 miles from Claremont (Ashby and Domingo), around eleven minutes.",
                "From central and north Berkeley: about 4.3 miles from Downtown Berkeley BART and 4.4 miles from the UC Berkeley campus, each around thirteen minutes without traffic; about 4.9 miles from North Berkeley (Shattuck and Vine), roughly fifteen minutes.",
                "By bus: AC Transit Line 88 runs from Downtown Berkeley along University Avenue, Sacramento Street and Market Street, through Downtown Oakland, to Highland Avenue and Highland Way in Piedmont — about a mile from our door. Line 12, from Gilman and 6th, comes down through Temescal and Piedmont Avenue to Grand and Euclid, about three-quarters of a mile below us; it does not climb into Piedmont.",
                "By BART: Ashby is about 3.3 miles from the office and Downtown Berkeley about 4.3. Both are a short drive or rideshare from us rather than a walk.",
                "Parking: street parking is generally available on Grand Avenue near the entrance.",
              ],
            },
            {
              title: "Cost and coverage, without the runaround",
              body: [
                "The honest number depends on which route you take and whether anything needs treating first, so we quote in writing after the consultation rather than over the phone. The market ranges, though, are public and worth knowing before you call anyone. Delta Dental puts the average out-of-network cost of in-office bleaching at $40 to $700 per visit, varying with the system used and the number of sessions (Delta Dental). CareCredit's 2024 cost survey is more specific: dentist-provided take-home kits at $375 to $500, a branded light-activated in-office session averaging $583 with a range of $463 to $1,011, laser whitening averaging $792, and over-the-counter products from $25 up (CareCredit).",
                "Insurance rarely helps. Because whitening is cosmetic, Delta Dental says it is usually not covered, though some plans do (Delta Dental), and CareCredit reports that most dental plans exclude it for the same reason (CareCredit). Financing, including CareCredit, is available if you would rather spread the cost, and if any restorations need replacing to match your new shade we will price those separately and up front.",
              ],
            },
          ]}
          faqs={[
            {
              q: "Do you see whitening patients from Berkeley?",
              a: "Yes. Our office is on Grand Avenue in Piedmont, about 2.8 miles from Elmwood and 3.6 miles from Claremont — a nine- to eleven-minute drive without traffic. Dr. Martenson and Dr. Ma see patients from across Berkeley and the rest of the East Bay.",
            },
            {
              q: "How far is the office from Elmwood, Claremont and Downtown Berkeley?",
              a: "About 2.8 miles from Elmwood at College and Ashby, 3.6 miles from Claremont at Ashby and Domingo, and 4.3 miles from Downtown Berkeley BART. Without traffic that is roughly nine, eleven and thirteen minutes by car. North Berkeley, at Shattuck and Vine, is about 4.9 miles and fifteen minutes.",
            },
            {
              q: "Can I get to you from Berkeley without a car?",
              a: "The direct option is AC Transit Line 88, which runs from Downtown Berkeley through Downtown Oakland to Highland Avenue and Highland Way in Piedmont, about a mile from our office. Line 12 from Gilman and 6th stops at Grand and Euclid, about three-quarters of a mile below us. From Ashby or Downtown Berkeley BART, plan on a short drive or rideshare for the last stretch.",
            },
            {
              q: "Is there parking at the office?",
              a: "Street parking is generally available on Grand Avenue near the entrance. The parking entrance is on the lower level of our two-storey building, and a planted walkway leads from the parking area up to the practice on the upper level. Look for our sign on the railing — we share the address with The Oldershaw Clinic.",
            },
            {
              q: "How many trips down from Berkeley will whitening take?",
              a: "Two for custom trays: one for the exam and impressions, one for the fitting, after which the whitening happens at home. In-office whitening is a single appointment. If any fillings or crowns need replacing to match your new shade, that is scheduled separately, after the whitening has settled.",
            },
            {
              q: "Which is better, in-office whitening or take-home trays?",
              a: "Neither is better; they trade speed for comfort. In-office uses concentrated hydrogen peroxide for a change in one visit, with a higher chance of short-lived sensitivity — about 63 percent of patients across trials versus about 51 percent for trays (Journal of Applied Oral Science, 2018). Trays use milder carbamide peroxide gel over a couple of weeks and are our most popular route. We recommend one after looking at your teeth, not before.",
            },
            {
              q: "Will my teeth be sensitive afterwards?",
              a: "Possibly, and briefly. The ADA reports transient mild-to-moderate sensitivity in up to two-thirds of people early in treatment; with trays it usually appears two to three days in and settles by the fourth day after you stop. After an in-office session it typically eases within 24 hours. If it bothers you, call us — a desensitizing gel is easy to prescribe.",
            },
            {
              q: "Will whitening lighten my crowns, veneers or fillings?",
              a: "No. Bleach changes natural enamel only, and the ADA is clear that whitening will not work on caps, veneers, crowns or fillings. If you have visible restorations on front teeth, we whiten first, wait about two weeks for the shade to settle, and then replace or match the restoration to the new color.",
            },
            {
              q: "How much does teeth whitening cost in Berkeley?",
              a: "These are published market figures, not a quote from us: Delta Dental puts in-office bleaching at $40 to $700 per visit on average out-of-network, and CareCredit's 2024 survey lists dentist take-home kits at $375 to $500 and in-office sessions averaging $583 to $792 depending on the system. Whitening is cosmetic, so dental plans usually do not cover it. We quote in writing after the consultation, and CareCredit financing is available.",
            },
            {
              q: "How long will the whitening last?",
              a: "It is not permanent. Most people need a touch-up after a few years — sooner with smoking or a lot of coffee, tea or red wine, which the ADA lists among the main causes of staining. Keep your trays: a two- or three-night touch-up with the spare gel we provide usually restores the shade.",
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
                "Journal of Applied Oral Science, 2018 — Peixoto et al., High-concentration carbamide peroxide can reduce the sensitivity caused by in-office tooth bleaching (reports the Rezende et al. 2016 trial averages)",
              href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6007969",
            },
            {
              label: "Delta Dental — Teeth whitening costs and coverage explained",
              href: "https://www.deltadental.com/protect-my-smile/procedures/teeth-whitening/cost-and-insurance-coverage/",
            },
            {
              label: "CareCredit — How Much Does Teeth Whitening Cost? Price and Procedure Guide (2024 cost survey)",
              href: "https://www.carecredit.com/well-u/health-wellness/teeth-whitening-costs/",
            },
          ]}
          featuredImage="/img/lIVE Piedmont website images/Tooth Whitening.png"
          featuredAlt="Teeth whitening — Piedmont Dental By Design, serving Berkeley"
        />
        <AwardsStrip />
        <AboutCTA />
      </main>
      <SiteFooter />
    </>
  );
}
