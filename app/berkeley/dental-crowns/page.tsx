import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import ProcedureDetail from "@/components/ProcedureDetail";
import AwardsStrip from "@/components/AwardsStrip";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";
import { getCategory } from "@/lib/procedure-categories";

// Month 2 city page — Dental crowns × Berkeley (run-plan #47/#48). Reuses the
// procedure template; every clinical line is grounded in the parent crowns
// page (/procedures/restoration/crowns-caps), the CEREC® page, or a cited
// source listed at the foot of the page.

export const metadata: Metadata = {
  title: "Dental Crowns for Berkeley Patients",
  description:
    "Dental crowns for Berkeley patients — CEREC® same-day and lab-made porcelain crowns from Drs. Martenson and Ma on Grand Avenue in Piedmont, about 2.8 miles from Elmwood. Complimentary consultation.",
  alternates: { canonical: "/berkeley/dental-crowns" },
  openGraph: {
    title: "Dental Crowns for Berkeley Patients — Piedmont Dental By Design",
    description:
      "One drive down from Berkeley for many crowns: exam, 3D scan, and a permanent CEREC® crown milled and bonded in a single visit — or the two-visit lab route when a tooth needs it.",
    url: "https://piedmontdentalbydesign.com/berkeley/dental-crowns",
    type: "article",
  },
};

const category = getCategory("restoration");

export default function BerkeleyDentalCrownsPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="crowns-caps"
          cityPage={{ href: "/berkeley/dental-crowns", city: "Berkeley" }}
          title="Dental Crowns for Berkeley Patients"
          tagline="Same-day CEREC® crowns and lab-made porcelain crowns — for many teeth, one drive down from Berkeley is all it takes."
          intro={[
            "A crown rebuilds a tooth that a filling can no longer hold together. Berkeley patients see Dr. Jill Martenson and Dr. David Ma at our office on Grand Avenue in Piedmont — about 2.8 miles from Elmwood and roughly nine minutes from Ashby BART without traffic — and for many teeth the permanent CEREC® crown is scanned, milled and bonded in that single visit.",
            "Berkeley is not short of dentists, so a drive down the hill deserves a reason. Ours is a small, owner-run practice where the dentist who prepares your tooth is the one who fits the crown, checks the bite and looks after it at every cleaning for years afterwards — and where a same-day crown turns two trips into one. Below: how crowns are made here, who needs one and who doesn't, how a crown compares with an onlay or a big filling, what the appointments look like, what the published market ranges say about cost, and the practical business of getting here from Berkeley by car, BART or the 88 bus.",
          ]}
          stats={[
            { value: "2.8 mi", label: "From Elmwood (College & Ashby)" },
            { value: "~13 min", label: "From Downtown Berkeley, no traffic" },
            { value: "1 visit", label: "Same-day with CEREC®" },
            { value: "1.5–2 hrs", label: "Scan, mill and bond in one sitting" },
          ]}
          sections={[
            {
              title: "Why Berkeley patients drive down to Piedmont for a crown",
              body: [
                "A crown is one of the longest-lived things a dentist makes for you, and it is judged over years, not days: how the margin seals, how the bite settles, how the tooth underneath holds up. That is a better bet when one person owns the whole story. Here the dentist who examines the tooth, prepares it, designs the crown and adjusts it is one of the two co-owners — and the same dentist sees that crown at every cleaning that follows.",
                "The second reason is the calendar. Where a crown is made by a laboratory it takes two appointments about two weeks apart, with a temporary crown in between. For many teeth we skip all of that: a 3D scan replaces the impressions, the crown is milled from a ceramic block in our own office, and the permanent crown is bonded before you leave. One drive down, one round of numbing, nothing to come back for.",
                "And the drive is shorter than Berkeley people expect. From the Elmwood end — College and Ashby — we are about 2.8 miles and nine minutes without traffic; from Claremont, at Ashby and Domingo, about 3.6 miles and eleven minutes. Downtown Berkeley BART is about 4.3 miles and thirteen minutes, the UC Berkeley campus about 4.4, and even North Berkeley, at Shattuck and Vine, is about 4.9 miles and fifteen minutes.",
              ],
            },
            {
              title: "How a crown is made here: CEREC® in one sitting, or the lab route",
              body: [
                "It starts with a complimentary consultation. We examine the tooth, take digital and panoramic X-rays, and tell you plainly which restoration the tooth needs — a crown, a smaller onlay, or simply a filling — and, if it is a crown, whether we can make it the same day or whether a laboratory should.",
                "The laboratory route takes two appointments. At the first, the tooth is numbed, decay is removed and the surface is shaped to fit the crown; we take accurate impressions for the laboratory and fit a temporary crown with temporary cement, then check your bite. About two weeks later the temporary comes off, the tooth is cleaned, and the permanent crown is fitted with the spacing and bite checked again. We recommend this route for larger reconstructions, and for front teeth where subtle color and translucency have to be matched across several teeth.",
                "For many other crowns we do not need the laboratory at all. The same-day CEREC® route runs like this:",
              ],
              bullets: [
                "The tooth is numbed once, decay is removed and the surface is shaped to receive the crown.",
                "We take a 3D digital scan of the prepared tooth — no impression trays, nothing sent away.",
                "The crown is designed on screen, then milled from a solid ceramic block in our office while you wait.",
                "We try it in, check the fit and the bite, polish it and bond it. The crown that goes in is the permanent one.",
                "Start to finish is about 1.5 to 2 hours in a single appointment, with no temporary to look after and nothing to come back for.",
              ],
            },
            {
              title: "Who needs a crown",
              body: [
                "A crown covers the whole of the tooth above the gumline, which is why it is the answer when there is not enough sound tooth left to anchor anything smaller. The American Dental Association says a crown can strengthen a tooth with a large filling when there isn't enough tooth remaining to hold the filling, protect a weak tooth from breaking, restore one that is already broken, or cover a tooth that is discolored or badly shaped (ADA MouthHealthy). In our own practice the usual reasons are:",
              ],
              bullets: [
                "A broken or fractured tooth — a cusp that sheared off on something hard, or a crack a filling cannot hold together.",
                "A decayed tooth where removing the decay would leave too little to rebuild with a filling.",
                "A large old filling that has fractured, or that is now bigger than the tooth around it.",
                "A tooth that is discolored or badly shaped and needs covering for the sake of the smile.",
                "A tooth that will anchor a fixed bridge, which is held in place by crowns on the neighboring teeth (ADA MouthHealthy).",
              ],
            },
            {
              title: "When we'll say a crown is more than the tooth needs",
              body: [
                "A crown is the biggest restoration a single tooth can carry, so we do not reach for it first. A small or mid-size cavity is a filling: the ADA describes tooth-colored composite as a mix of glass or quartz filler that gives good durability and resistance to fracture in small- to mid-size fillings under moderate chewing pressure (ADA MouthHealthy). A tooth that has lost a corner but is otherwise sound is often an onlay, which covers only the damaged part — Delta Dental puts it simply: onlays can be used if the tooth isn't badly damaged (Delta Dental). We mill ceramic onlays and inlays on the same CEREC® system we use for crowns.",
                "Two things also decide whether a same-day ceramic crown is right for you. Our CEREC® page names the exceptions: patients with a history of breaking ceramic restorations, and patients with a very deep bite. For them we talk through the alternatives before choosing a material. And if you grind or clench, tell us — in a 20-year clinical series, bruxism was one of three factors that significantly shortened crown survival, along with front-tooth placement and teeth whose nerve had died (European Journal of Oral Sciences, 2022). We would rather plan around it than find out later.",
              ],
            },
            {
              title: "Crown, onlay or filling: which one your tooth actually needs",
              body: [
                "This is the comparison most people searching for crowns in Berkeley are really weighing, so here it is without the sales pitch. The honest rule is the smallest restoration that will hold.",
              ],
              bullets: [
                "A filling repairs a cavity from the inside and is placed directly, in one visit. Composite suits small- to mid-size cavities that take moderate chewing pressure (ADA MouthHealthy), and it is the right answer far more often than a crown is.",
                "An onlay is a ceramic piece that replaces a damaged cusp or biting surface and leaves the rest of the tooth alone. Delta Dental's line is that onlays can be used if the tooth isn't badly damaged (Delta Dental). It keeps more of your own tooth, and we can mill one in the office.",
                "A crown covers the entire tooth above the gum. It is the answer when a large filling has nothing left to hold onto, when a weak tooth needs protecting from fracture, or when a broken tooth has to be rebuilt (ADA MouthHealthy).",
                "What you give up with a crown is tooth structure: the tooth is shaped all the way round to receive it, which is why we do not crown a tooth an onlay could save.",
              ],
            },
            {
              title: "What the appointments look like from Berkeley",
              body: [
                "For a same-day crown, plan one appointment of about 1.5 to 2 hours. Our CEREC® page breaks that down as roughly half an hour to prepare the tooth and take the scan, about fifteen minutes to design the crown on screen, about fifteen for the milling unit to carve it from the ceramic block, and half an hour to fit, polish and bond it. You walk out with the permanent crown in place and drive back up to Berkeley once.",
                "For a laboratory crown, plan two. The first visit — Delta Dental puts it at around 60 to 90 minutes — is the preparation, the impressions and the temporary crown; the second, about two weeks later, is fitting the permanent crown and checking the spacing and bite (Delta Dental). The temporary is held with temporary cement, so if it comes loose before the second visit, call us.",
                "Either way, expect the new crown to feel like a stranger for a few days: your tongue notices the shape, and you may feel it when you bite. Most people stop noticing within a week. If it feels tall — hitting before the other teeth do — or rocks, call us; a quick bite adjustment fixes it.",
              ],
            },
            {
              title: "Living with a crown: care, check-ups and how long it lasts",
              body: [
                "A porcelain crown cannot decay, but the tooth under it can, at the margin where crown meets tooth — and more so if the gum has receded and exposed root surface. So a crown is looked after the way a tooth is: brush twice a day with fluoride toothpaste, floss every day, and keep your regular visits (Delta Dental). We check every crown at every cleaning and on your X-rays, because a new cavity at the margin is what fails first, not the porcelain.",
                "On lifespan, we would rather give you the published numbers than a promise. A retrospective series of 1,037 single crowns in 401 patients, followed for an average of about eleven years, found 89.9 percent still in place at five years, 80.9 percent at ten, 70.5 percent at fifteen and 61.8 percent at twenty; the main reasons for failure were loss of retention, loss of the tooth and fracture, and the crown material made no measurable difference (European Journal of Oral Sciences, 2022). That is one teaching clinic's caseload over decades, not a systematic review, and it includes the front-tooth and dead-nerve cases the same study found fail sooner.",
                "Delta Dental's plainer summary is that a crown lasts around 10 to 15 years on average and can last closer to 30 depending on the material and how well it is cared for (Delta Dental). With good care, most porcelain crowns last 15 to 25 years, and some last 30 or more.",
              ],
            },
            {
              title: "Getting here from Berkeley",
              body: [
                "We are at 1331 Grand Avenue, Piedmont — a two-storey building with the practice on the upper level and the parking entrance below it. The address is shared with The Oldershaw Clinic, so look for our sign on the railing and follow the planted walkway from the parking area to the front door.",
              ],
              bullets: [
                "Driving: about 2.8 miles from Elmwood (College & Ashby) and 3.6 miles from Claremont (Ashby & Domingo) — nine and eleven minutes without traffic. From Downtown Berkeley it is about 4.3 miles and thirteen minutes; from North Berkeley (Shattuck & Vine) about 4.9 miles and fifteen.",
                "Parking: street parking is generally available on Grand Avenue near our entrance.",
                "BART: Ashby is the closest station, about 3.3 miles and nine minutes away; Downtown Berkeley is about 4.3 miles. Both are a short drive from the office.",
                "By bus: AC Transit's Line 88 runs from Downtown Berkeley along University Avenue, Sacramento Street and Market Street, through Downtown Oakland, to Highland Avenue and Highland Way in Piedmont — about a mile from the office. Line 12, from Gilman and 6th, comes via MLK Jr Way, Temescal and Piedmont Avenue to Grand & Euclid, about three-quarters of a mile below us; it does not climb into Piedmont.",
              ],
            },
            {
              title: "Cost and coverage, without the runaround",
              body: [
                "The honest number for your tooth comes after the exam and X-rays, in writing — never over the phone. What we can give you now is the published market picture. Delta Dental puts the average out-of-network cost of a permanent crown at $1,100 to $2,000, and notes that the price generally includes the temporary crown, the permanent crown, the local anesthetic, the dental laboratory's charges and the dentist's time — two of which, the temporary and the laboratory, a same-day crown does not involve (Delta Dental). Bay Area fees run above these national figures. See our current fees on the Crowns page. Ranges like that move with the material, the tooth and the region, so treat them as a bracket, not a bill.",
                "On insurance, Delta Dental's own guidance is that many dental plans help with the cost of crowns but some do not, that an in-network dentist can mean considerable savings, that deductibles or waiting periods may have to be met before benefits begin, and that you should ask your dentist for a pre-treatment estimate (Delta Dental). We verify your benefits and give you the exact quote before anything starts, and for whatever a plan does not cover, CareCredit financing is available.",
              ],
            },
          ]}
          faqs={[
            {
              q: "Do you see patients from Berkeley for crowns?",
              a: "Yes. Our office is on Grand Avenue in Piedmont, about 2.8 miles from Elmwood and 3.6 from Claremont — nine to eleven minutes without traffic — and AC Transit's Line 88 runs from Downtown Berkeley to Highland Avenue in Piedmont, about a mile from us. Dr. Martenson and Dr. Ma treat patients from across Berkeley and the East Bay.",
            },
            {
              q: "How many trips will I make from Berkeley for a crown?",
              a: "For many teeth, one. With CEREC® the permanent crown is scanned, designed, milled and bonded in a single appointment of about 1.5 to 2 hours, with no temporary and no return visit. If your tooth is better served by a laboratory crown — larger reconstructions, or front teeth where color has to be matched across several teeth — it is two visits about two weeks apart. We tell you which before treatment starts.",
            },
            {
              q: "What's the quickest way down from Downtown Berkeley or Ashby BART?",
              a: "By car, Ashby BART is about 3.3 miles and nine minutes without traffic; Downtown Berkeley BART is about 4.3 miles and thirteen. Both stations are a short drive from the office. Without a car, AC Transit's Line 88 leaves from Downtown Berkeley and ends at Highland Avenue and Highland Way in Piedmont, about a mile from our door.",
            },
            {
              q: "Is there parking when I arrive?",
              a: "Street parking is generally available on Grand Avenue near our entrance at 1331 Grand Avenue. The parking entrance is below the building; take the planted walkway from the parking area up to the front door on the upper level, and look for our sign on the railing — we share the address with The Oldershaw Clinic.",
            },
            {
              q: "Can I drive myself back to Berkeley after a crown appointment?",
              a: "A crown appointment means a numbed tooth — one round of numbing for a same-day crown, one at each visit on the laboratory route — and the numbness wears off over the following hours. Patients routinely drive themselves home. If you would rather not, Ashby BART is a short drive and the 88 bus ends about a mile from the office.",
            },
            {
              q: "How long does a same-day CEREC® crown take?",
              a: "About 1.5 to 2 hours in one sitting: roughly half an hour to prepare the tooth and take the 3D scan, about fifteen minutes to design the crown on screen, fifteen for the milling unit to carve it, and half an hour to fit, polish and bond it. You leave with the permanent crown in place.",
            },
            {
              q: "How long will a crown last?",
              a: "The best published answer we have found is a 20-year series of 1,037 single crowns: 89.9 percent survived five years, 80.9 percent ten, 70.5 percent fifteen and 61.8 percent twenty, with front-tooth placement, dead-nerve teeth and grinding raising the failure rate and crown material making no difference (European Journal of Oral Sciences, 2022). Delta Dental's summary is 10 to 15 years on average, closer to 30 with good care. What usually gives out is the tooth at the margin, not the porcelain.",
            },
            {
              q: "Do I really need a crown, or would a filling or onlay do?",
              a: "It depends on how much sound tooth is left. The ADA's rule is that a crown is for a tooth with a large filling when there isn't enough tooth remaining to hold a filling, or a weak or broken tooth that needs covering; a small or mid-size cavity is a composite filling (ADA MouthHealthy). In between sits the onlay, which Delta Dental describes as an option when the tooth isn't badly damaged. We examine the tooth and tell you which — and we mill onlays on the same system as our crowns.",
            },
            {
              q: "How much does a dental crown cost in Berkeley?",
              a: "We quote in writing after the exam, never over the phone, and the figure depends on the tooth and the material. As a market bracket, Delta Dental puts the average out-of-network cost of a permanent crown at $1,100 to $2,000 and notes that many plans help with crowns while some do not (Delta Dental). Bay Area fees run above these national figures. See our current fees on the Crowns page. We verify your benefits before treatment starts, and CareCredit financing is available for what a plan does not cover.",
            },
            {
              q: "Will the crown look and feel like my own tooth?",
              a: "It should. Porcelain crowns are shaped, sized and shaded to match the teeth around them; we choose the shade together with a guide and review the result before bonding. For the first few days your tongue will notice the new shape and you may feel it when you bite — most people adjust within a week, and if it feels tall or rocks, a quick bite adjustment sorts it out.",
            },
          ]}
          sources={[
            {
              label:
                "European Journal of Oral Sciences, 2022 — Retrospective clinical study of tooth-supported single crowns: a multifactor analysis",
              href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9546353",
            },
            {
              label: "American Dental Association, MouthHealthy — Crowns",
              href: "https://www.mouthhealthy.org/all-topics-a-z/crowns",
            },
            {
              label: "American Dental Association, MouthHealthy — Dental Filling Options",
              href: "https://www.mouthhealthy.org/all-topics-a-z/dental-filling-options",
            },
            {
              label: "Delta Dental — What is a dental crown?",
              href: "https://www.deltadental.com/us/en/protect-my-smile/procedures/dental-crowns.html",
            },
            {
              label: "Delta Dental — Understanding dental crown costs and insurance coverage",
              href: "https://www.deltadental.com/us/en/protect-my-smile/procedures/dental-crowns/treatment-cost.html",
            },
          ]}
          featuredImage="/img/home-services/cerec.jpg"
          featuredAlt="Dental Crowns — Piedmont Dental By Design, serving Berkeley"
        />
        <AwardsStrip />
        <AboutCTA />
      </main>
      <SiteFooter />
    </>
  );
}
