import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import ProcedureDetail from "@/components/ProcedureDetail";
import AwardsStrip from "@/components/AwardsStrip";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";
import { getCategory } from "@/lib/procedure-categories";

// Month 2 city page — Invisalign® × Berkeley (run-plan #47/#48). Reuses the
// procedure template; every clinical line is grounded in the parent
// Invisalign® page or a cited source listed at the foot of the page. Local
// facts (distances, transit, parking) are the fixed set from the city-pages
// brief — OSRM driving without traffic, AC Transit line pages, the site's tour.

export const metadata: Metadata = {
  title: "Invisalign® for Berkeley Patients",
  description:
    "Invisalign® for Berkeley adults — planned by Drs. Martenson and Ma on Grand Avenue in Piedmont, 2.8 miles from Elmwood. iTero® scans, complimentary consultation.",
  alternates: { canonical: "/berkeley/invisalign" },
  openGraph: {
    title: "Invisalign® for Berkeley Patients — Piedmont Dental By Design",
    description:
      "Clear aligners for Berkeley adults, a short drive down from Elmwood and Claremont: exam, iTero® scan, progress checks and Vivera® retainers in one building.",
    url: "https://piedmontdentalbydesign.com/berkeley/invisalign",
    type: "article",
    images: ["/img/procedures/cosmetic-dentistry/invisalign/hero.jpg"],
  },
};

const category = getCategory("cosmetic-dentistry");

export default function BerkeleyInvisalignPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="invisalign"
          cityPage={{ href: "/berkeley/invisalign", city: "Berkeley" }}
          title="Invisalign® for Berkeley Patients"
          tagline="Clear aligners for Berkeley adults — planned in 3D on Grand Avenue, a short drive down from Elmwood and Claremont."
          intro={[
            "Clear aligners for adults across Berkeley, planned and checked by the two dentists who own the practice. Dr. Jill Martenson and Dr. David Ma see Invisalign® patients at 1331 Grand Avenue in Piedmont — about 2.8 miles from Elmwood, 3.6 miles from Claremont, and roughly thirteen minutes from Downtown Berkeley BART or the UC Berkeley campus without traffic.",
            "Berkeley is not short of dentists offering aligners, so this page makes the honest case for driving down instead: one pair of dentists from the first scan to the last retainer, everything done in one building, and street parking on Grand Avenue when you arrive. It also covers what treatment involves, who it suits and who it doesn't, how aligners compare with braces and mail-order kits, what the cost picture really looks like, and how to reach us — by car, on the 88 bus from Downtown Berkeley, or from Ashby BART.",
          ]}
          stats={[
            { value: "2.8 mi", label: "From Elmwood" },
            { value: "~13 min", label: "From Downtown Berkeley" },
            { value: "22 hrs", label: "Daily wear" },
            { value: "Adults 18+", label: "Recommended for" },
          ]}
          sections={[
            {
              title: "Why Berkeley patients make the drive down to a Piedmont office",
              body: [
                "Berkeley has aligner providers of its own, so the case for coming to us has to be a real one. It is this: an Invisalign® case is months of small decisions — whether the teeth are tracking, whether a refinement is needed, when to stop — and here every one of them is made by one of the two dentists who own the practice. The person who examines you at the consultation is the person who reads your scan and checks your progress to the end.",
                "The second reason is that the drive is shorter than most Berkeley residents assume. Elmwood, at College and Ashby, is the near end of Berkeley and about 2.8 miles from our door — nine minutes without traffic. Claremont, at Ashby and Domingo, is about 3.6 miles and eleven minutes. From Downtown Berkeley BART or the UC Berkeley campus it is 4.3 to 4.4 miles and about thirteen minutes, and from North Berkeley at Shattuck and Vine about 4.9 miles and fifteen.",
                "What the drive buys is one building for the whole course of treatment: the exam and X-rays, the iTero® scan, every progress check, and the Vivera® retainers at the end.",
              ],
            },
            {
              title: "How Invisalign® treatment works at our Grand Avenue office",
              body: [
                "It begins with a complimentary consultation, and the consultation is a genuine examination rather than a sales visit. We look at your teeth, gums and bite and take digital and panoramic X-rays, because the roots and jaws in those images decide whether aligners can do the job at all. If they can, the sequence is the same for everyone:",
              ],
              bullets: [
                "An iTero® digital scan replaces the tray of impression putty and becomes the 3D model the lab works from.",
                "The lab makes a numbered series of clear, smooth plastic aligners, each one a small step on from the last.",
                "Instead of wires pulling on every tooth at once, each aligner presses gently on the particular teeth it is meant to move.",
                "You wear each set about 22 hours a day and move to the next roughly every two weeks — which is why the habit, more than the plastic, decides the result.",
                "You come back for progress checks with Dr. Martenson or Dr. Ma, and the last visit fits your Vivera® retainers.",
              ],
            },
            {
              title: "Who Invisalign® suits",
              body: [
                "In our practice Invisalign® is for adults aged 18 and over, and it does its best work on mild to moderate problems. The age line is about the 22-hour habit rather than biology: the American Dental Association notes that healthy teeth can be orthodontically treated at any age (ADA MouthHealthy), and adults are simply more reliable about keeping trays in — whether the day is spent in a lab on campus, a seminar room or on video calls from home. It handles:",
              ],
              bullets: [
                "Crooked or rotated teeth.",
                "Crowding, including front teeth that have drifted years after braces.",
                "Noticeable gaps.",
                "Milder overbites, underbites and crossbites.",
                "Open bites.",
              ],
            },
            {
              title: "When we'll say Invisalign® isn't the right tool",
              body: [
                "Some cases are beyond what a series of trays can do: severely rotated teeth, a large mismatch between the jaws, and anything that needs surgical correction. Those are usually braces cases or orthodontist cases, and we would rather refer you than start a treatment that cannot finish.",
                "The other honest reason to say no is the wear time. Aligners only work while they are in, so if 22 hours a day is not realistic for you at the moment, we will say so — results depend on compliance, and no plan survives trays left in a drawer.",
                "Saying no to aligners is not the same as saying leave it. The ADA counts abnormal enamel wear, jaw problems and difficulty chewing among the consequences of a bite left uncorrected (ADA MouthHealthy), so the consultation ends with a recommendation either way.",
              ],
            },
            {
              title: "Invisalign® vs braces: what the evidence shows",
              body: [
                "Braces and aligners both straighten teeth, and both are good treatments; the differences that matter live in the months in between. Braces are fixed, so the American Dental Association advises steering clear of popcorn, corn on the cob, chewing gum, whole apples and sticky foods while wearing them (ADA MouthHealthy). Aligners come out for meals, so nothing is off the menu.",
                "A 2026 systematic review in BDJ Open pooled 28 studies and found that aligner patients reported significantly less pain than patients in fixed appliances, with the widest gap in the first couple of weeks, and had lower plaque and gum-inflammation scores and shallower gum pockets — the practical result of being able to take the trays out to brush and floss (BDJ Open, 2026). The same review is candid that the quality-of-life advantage fades: by twelve months the difference was no longer statistically significant, and much of the evidence came from observational studies.",
                "What we will not tell you is that aligners are faster. How long treatment takes depends on your case, and you get an estimate after the scan rather than a promise before it.",
              ],
            },
            {
              title: "Mail-order aligners: why we ask you to come in first",
              body: [
                "The mail-order pitch is that you skip the drive. What you actually skip is the examination. The American Association of Orthodontists puts it plainly: moving teeth “is a medical procedure that involves complex biological processes and should be monitored in-person by a trained dental professional.” In its survey of 260 members, run from November 2021 to January 2022, 61 percent said they see new patients needing retreatment after mail-order aligners at least once a quarter (American Association of Orthodontists, 2022).",
                "Here, nothing moves until the X-rays have been read and the gums checked. The scan is taken in the office, and the person who reads it is the person you will see at every check. The nine to fifteen minutes from Berkeley is the price of that, and we think it is a fair trade.",
              ],
            },
            {
              title: "What the timeline looks like from Berkeley",
              body: [
                "Most adult cases run six to eighteen months. Minor crowding or a small gap can be done in six to nine; a crossbite or deeper crowding usually needs twelve to eighteen. Each new set brings a day or two of pressure and mild soreness as the teeth respond, then settles. You change trays about every two weeks, and the estimate you get after your iTero® scan is specific to your teeth rather than a brochure average.",
                "Spread over that period, the trips from Berkeley are few and short: the consultation and scan, the day your first aligners arrive, progress checks along the way, and a final appointment for your Vivera® retainers. How often you come back depends on the case, and we tell you at the consultation, so the calendar is clear before you commit.",
              ],
            },
            {
              title: "Living with aligners between visits",
              body: [
                "Aligners come out to eat and to drink anything other than water — the morning coffee included — and go back in once you have brushed. A small brush in your bag is the whole kit. Clean the trays gently with a soft-bristled brush and rinse them in room-temperature water each time they come out; hot water warps the plastic, so keep them away from the kettle and the dishwasher.",
                "If a tray goes missing — left in a napkin at a campus café, say — call us that day. Depending on how long you have worn the current set, we can usually move you on to the next one or order a replacement. Do not go more than a day without a tray in, because teeth begin drifting back quickly and you may have to step back a set.",
                "Retention is where results are kept or lost. The ADA lists a period of wearing a retainer that holds teeth in their new positions as the final stage of orthodontic treatment (ADA MouthHealthy). Your Vivera® retainers are made here before you finish, and most patients wear them while they sleep, indefinitely.",
              ],
            },
            {
              title: "Getting here from Berkeley",
              body: [
                "We are at 1331 Grand Avenue, Piedmont, in a two-storey building we share with The Oldershaw Clinic. The practice is on the upper level and the parking entrance sits below it; look for our sign on the railing, and follow the planted walkway from the parking area to the front door.",
              ],
              bullets: [
                "Driving: Elmwood (College & Ashby) is about 2.8 miles and nine minutes without traffic; Claremont (Ashby & Domingo) about 3.6 miles and eleven; Downtown Berkeley and the UC Berkeley campus about 4.3 to 4.4 miles and thirteen; North Berkeley (Shattuck & Vine) about 4.9 miles and fifteen.",
                "Parking: street parking is generally available on Grand Avenue near our entrance.",
                "By bus: AC Transit's Line 88 runs from Downtown Berkeley — via University Avenue, Sacramento Street, Market Street and Downtown Oakland — to Highland Avenue & Highland Way in Piedmont on a single bus, about a mile from the office. Line 12 starts at Gilman & 6th and follows Grand Avenue as far as Grand & Euclid, about three-quarters of a mile below us; it does not climb into Piedmont.",
                "By BART: Ashby is about 3.3 miles and nine minutes by car; Downtown Berkeley about 4.3 miles and thirteen. Both are a short drive rather than a walk.",
              ],
            },
            {
              title: "What it costs, and what insurance actually does",
              body: [
                "Invisalign® says its treatment usually costs about the same as braces, with the fee set by your dentist according to how complex the case is and how many aligners it needs (Invisalign.com). The worked examples on Invisalign's own cost page carry doctor's fees between $5,490 and $7,000, with the caveat that pricing is set independently by each doctor and varies by case. We quote in writing once we have examined you and taken the scan; a number before that would be a guess. CareCredit financing is available.",
                "Two things about insurance that most guides blur. First, plans with an orthodontic benefit generally treat Invisalign® the way they treat braces, and Invisalign® notes that coverage may reach up to $3,000 (Invisalign.com). Second, that benefit usually carries a lifetime maximum rather than an annual one: Delta Dental explains that an orthodontic benefit does not renew each plan year, and once it is used there is no further orthodontic benefit for the life of the plan (Delta Dental). So ask your plan for the orthodontic lifetime maximum, not the annual figure — and remember that FSA and HSA funds can be used for treatment (Invisalign.com).",
              ],
            },
          ]}
          faqs={[
            {
              q: "Do you treat Invisalign® patients who live in Berkeley?",
              a: "Yes. The practice serves Berkeley alongside Piedmont and Oakland. Our office is at 1331 Grand Avenue in Piedmont, about 2.8 miles from Elmwood and roughly thirteen minutes from Downtown Berkeley without traffic, and Dr. Martenson and Dr. Ma plan and check every case themselves.",
            },
            {
              q: "How long is the drive from Elmwood, Claremont or Downtown Berkeley?",
              a: "Without traffic, about nine minutes from Elmwood at College and Ashby (2.8 miles), eleven from Claremont at Ashby and Domingo (3.6 miles), and thirteen from Downtown Berkeley BART or the UC Berkeley campus (4.3 to 4.4 miles). North Berkeley at Shattuck and Vine is about fifteen minutes and 4.9 miles.",
            },
            {
              q: "Can I get to you from Berkeley without a car?",
              a: "AC Transit's Line 88 runs on a single route from Downtown Berkeley through Downtown Oakland to Highland Avenue & Highland Way in Piedmont, about a mile from the office. Line 12 from Gilman & 6th follows Grand Avenue to Grand & Euclid, about three-quarters of a mile below us. Ashby and Downtown Berkeley BART are each a short drive rather than a walk.",
            },
            {
              q: "Is there somewhere to park?",
              a: "Street parking is generally available on Grand Avenue near the entrance. The parking entrance is below the building and a planted walkway leads up to the front door on the upper level; we share the address with The Oldershaw Clinic, so look for our sign on the railing.",
            },
            {
              q: "How many trips from Berkeley will Invisalign® involve?",
              a: "A small number of short visits spread over six to eighteen months: the consultation and scan, the visit when your first aligners arrive, periodic progress checks, and a last appointment for your Vivera® retainers. How often you come in depends on your case, and we tell you at the consultation.",
            },
            {
              q: "Is there an age limit for Invisalign®?",
              a: "In our practice we recommend Invisalign® for adults 18 and over — the 22-hour daily wear is what makes or breaks a case, and adults are generally more reliable about it. There is no upper limit: the ADA notes that healthy teeth can be orthodontically treated at any age (ADA MouthHealthy).",
            },
            {
              q: "Does Invisalign® hurt?",
              a: "Expect pressure and some soreness for a day or two each time you start a new set, then it settles; the smooth plastic rarely irritates the cheeks and lips the way brackets can. A 2026 BDJ Open meta-analysis of 28 studies found that aligner patients reported significantly less pain than patients in fixed braces, especially in the first weeks.",
            },
            {
              q: "How much does Invisalign® cost for Berkeley patients?",
              a: "Invisalign® says treatment usually costs about the same as braces, with the fee set by case complexity and the number of aligners; the examples on its own cost page show doctor's fees of $5,490 to $7,000 (Invisalign.com). We quote in writing after the consultation and scan, and CareCredit financing is available.",
            },
            {
              q: "Will my dental insurance cover it?",
              a: "Often partly, if your plan carries an orthodontic benefit — Invisalign® says coverage may reach up to $3,000 (Invisalign.com). Check the orthodontic lifetime maximum rather than the annual maximum: Delta Dental explains that orthodontic benefits typically do not renew each plan year (Delta Dental). FSA and HSA funds can also be used.",
            },
          ]}
          sources={[
            {
              label: "American Dental Association, MouthHealthy — Braces",
              href: "https://www.mouthhealthy.org/all-topics-a-z/braces",
            },
            {
              label:
                "American Association of Orthodontists — AAO Highlights Health Risks of Mail-Order Orthodontics (17 May 2022)",
              href: "https://www2.aaoinfo.org/aao-highlights-health-risks-of-mail-order-orthodontics/",
            },
            {
              label:
                "BDJ Open, 2026 — Comparative impact of clear aligners versus fixed orthodontic appliances on periodontal health, pain, and quality of life: a systematic review and meta-analysis",
              href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13253859",
            },
            {
              label: "Invisalign.com — Average Cost of Invisalign® Aligners",
              href: "https://www.invisalign.com/invisalign-cost",
            },
            {
              label: "Delta Dental — What Is a Dental Insurance Annual Maximum?",
              href: "https://www.deltadental.com/protect-my-smile/dental-insurance-101/what-is-dental-insurance-annual-maximum/",
            },
          ]}
          featuredImage="/img/procedures/cosmetic-dentistry/invisalign/hero.jpg"
          featuredAlt="Invisalign® — Piedmont Dental By Design, serving Berkeley"
        />
        <AwardsStrip />
        <AboutCTA />
      </main>
      <SiteFooter />
    </>
  );
}
