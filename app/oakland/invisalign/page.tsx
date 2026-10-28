import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import ProcedureDetail from "@/components/ProcedureDetail";
import AwardsStrip from "@/components/AwardsStrip";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";
import { getCategory } from "@/lib/procedure-categories";

// Month 2 city page — Invisalign® × Oakland (run-plan #47/#48). Reuses the
// procedure template; every clinical line is grounded in the parent
// Invisalign® page or a cited source listed at the foot of the page.

export const metadata: Metadata = {
  title: "Invisalign® for Oakland Patients",
  description:
    "Invisalign® clear aligners for Oakland adults — planned by Drs. Martenson and Ma on Grand Avenue in Piedmont, 1.4 miles from Lake Merritt. iTero® scans, complimentary consultation.",
  alternates: { canonical: "/oakland/invisalign" },
  openGraph: {
    title: "Invisalign® for Oakland Patients — Piedmont Dental By Design",
    description:
      "Clear aligners for Oakland adults, a few minutes up Grand Avenue: exam, iTero® scan, in-person check-ins and Vivera® retainers under one roof.",
    url: "https://piedmontdentalbydesign.com/oakland/invisalign",
    type: "article",
    images: ["/img/procedures/cosmetic-dentistry/invisalign/hero.jpg"],
  },
};

const category = getCategory("cosmetic-dentistry");

export default function OaklandInvisalignPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="invisalign"
          cityPage={{ href: "/oakland/invisalign", city: "Oakland" }}
          title="Invisalign® for Oakland Patients"
          tagline="Clear aligners for Oakland adults — planned in 3D, fitted a few minutes up Grand Avenue."
          intro={[
            "Straighter teeth without metal braces, for adults across Oakland. Dr. Jill Martenson and Dr. David Ma plan Invisalign® treatment from our Grand Avenue office in Piedmont — about 1.4 miles from Lake Merritt, and roughly a seven-minute drive from Montclair Village or Rockridge BART without traffic.",
            "Grand Avenue runs from our front door straight down into Oakland, so Lake Merritt, Montclair and Rockridge are all a short hop away. This page covers what Invisalign® treatment involves here, who it suits and who it doesn't, how it compares with braces and mail-order aligners, and the practical business of getting to us — the same ground we cover in a complimentary consultation.",
          ]}
          stats={[
            { value: "1.4 mi", label: "From Lake Merritt" },
            { value: "~7 min", label: "From Rockridge or Montclair" },
            { value: "6–18 mo", label: "Typical treatment" },
            { value: "iTero®", label: "Digital scan, no goop" },
          ]}
          sections={[
            {
              title: "Why Oakland patients choose a Piedmont office for Invisalign®",
              body: [
                "Invisalign® is a treatment you live with for months, so the practice you choose matters more than the brand of plastic. Ours is a small, owner-run office: the dentist who examines you, plans your case and checks your progress is one of the two co-owners, not a rotating associate. That continuity is the point of coming a few minutes further up the hill.",
                "The other reason is simple geography. Our office sits at 1331 Grand Avenue in Piedmont, the small city that Oakland wraps around. From Lake Merritt it is about 1.4 miles; from Rockridge BART about 2.6 miles; from Montclair Village about 3.1 miles. Each is a seven-minute drive or less without traffic — often quicker than crossing downtown.",
                "Everything happens under one roof: the exam and X-rays, the iTero® digital scan that replaces goopy impressions, every check-in, and the Vivera® retainers that protect the result at the end.",
              ],
            },
            {
              title: "How Invisalign® treatment works here",
              body: [
                "Treatment starts with a complimentary consultation. We examine your teeth, gums and bite, take digital and panoramic X-rays, and tell you plainly whether Invisalign® is the right tool for your case — or whether braces or a referral would serve you better. If it is, the steps are the same for every patient:",
              ],
              bullets: [
                "A mess-free iTero® scan of your teeth, which becomes the 3D blueprint for your treatment.",
                "A lab manufactures a series of clear aligners made only for you.",
                "You wear each set about 22 hours a day and move to the next roughly every two weeks — manufacturers put the effective range at 20–22 hours a day (Dentistry Journal, 2024).",
                "Periodic check-ins with Dr. Martenson or Dr. Ma to confirm the teeth are tracking; if they drift, we order refinement aligners rather than let the plan slip.",
                "Vivera® retainers at the end, because teeth try to return to where they started (ADA MouthHealthy).",
              ],
            },
            {
              title: "Who Invisalign® is for",
              body: [
                "Invisalign® handles mild to moderate concerns very well. In our practice we recommend it for adults 18 and over, because the 22-hour-a-day habit is the make-or-break factor and adults are generally more reliable about it. It works for:",
              ],
              bullets: [
                "Crooked or rotated front teeth.",
                "Crowding.",
                "Gaps between teeth.",
                "Mild overbites, underbites and crossbites.",
                "Open bites.",
                "Teeth that have drifted years after braces.",
              ],
            },
            {
              title: "When we'll tell you it isn't the answer",
              body: [
                "Severely rotated teeth, large jaw-position discrepancies and cases that need surgical correction are usually better served by traditional braces or an orthodontist, and we will say so at the consultation rather than sell you trays that cannot finish the job.",
                "Correcting a genuine bite problem matters beyond looks. The American Dental Association lists tooth decay, gum disease, tooth loss, speech or chewing problems and abnormal enamel wear among the consequences of leaving one untreated (ADA MouthHealthy).",
              ],
            },
            {
              title: "Invisalign® vs braces vs mail-order aligners",
              body: [
                "Braces move teeth with brackets, wires and tension; aligners do it with a sequence of smooth plastic trays that apply gentle, targeted pressure. Both work. The practical differences are that aligners come out for meals and brushing — no food restrictions, no broken brackets — and that nobody across the table needs to know you are in treatment.",
                "Mail-order aligners are a different proposition. They skip the in-person exam and X-rays, and the American Association of Orthodontists warns that moving teeth without that examination “can lead to irreversible harm”; in its 2022 survey, 77 percent of responding orthodontists had seen patients for retreatment after mail-order treatment. The ADA's position is the same: removable aligners are an option “under the direct supervision of a dentist or orthodontist” (ADA MouthHealthy).",
                "That supervision is the whole of what you are paying for with us — an exam that rules out gum disease and hidden decay before anything moves, a scan taken by the person who will read it, and someone to call when a tray does not fit.",
              ],
            },
            {
              title: "What the timeline looks like",
              body: [
                "Most adult cases run six to eighteen months. Minor crowding or small gaps can finish in six to nine; deeper crowding or a crossbite typically takes twelve to eighteen. You change trays about every two weeks, and Dr. Martenson gives you a specific estimate after the iTero® scan rather than before it.",
                "When the last tray comes out, the retainer goes in. Teeth drift back toward their old positions after any orthodontic treatment, which is why the ADA describes a retainer period as part of the process itself (ADA MouthHealthy). We make Vivera® retainers, and most patients wear them at night indefinitely.",
              ],
            },
            {
              title: "Living with aligners day to day",
              body: [
                "Aligners come out for every meal and for any drink other than water, then go back in after you brush — so there are no food restrictions, and no broken brackets from popcorn or bagels.",
                "Care is simple: rinse the trays in room-temperature water every time you remove them, brush them gently with a soft brush and clear soap (toothpaste scratches), and never use hot water or a dishwasher, which warp the plastic. If you lose a tray, call us the same day — we can usually advance you to the next set or order a replacement — and do not go without one for more than a day, because teeth begin drifting back almost immediately.",
              ],
            },
            {
              title: "Getting here from Oakland",
              body: [
                "We are at 1331 Grand Avenue, Piedmont — a two-storey building; the practice is on the upper level and the parking entrance sits below it. We share the address with The Oldershaw Clinic, so look for our sign on the railing and follow the planted walkway from the parking area to the front door.",
              ],
              bullets: [
                "Driving: about 1.4 miles from Lake Merritt, 2.6 miles from Rockridge BART and 3.1 miles from Montclair Village — each around seven minutes without traffic. MacArthur BART is a short drive.",
                "Parking: street parking is generally available on Grand Avenue near our entrance.",
                "By bus: AC Transit's Line 12 runs along Grand Avenue by the lake and stops at Grand & Euclid, about three-quarters of a mile below us; the 88 ends on Highland Avenue in Piedmont, about a mile away.",
              ],
            },
            {
              title: "Cost and coverage, without the runaround",
              body: [
                "Invisalign® itself says treatment usually costs about the same as braces, and that your dentist sets the fee by how complex the case is and how many aligners it needs (Invisalign.com). Dental insurance with an orthodontic benefit may cover part of it. We give you a complete written quote after the consultation and scan — never a number over the phone — and financing, including CareCredit, is available for anything beyond what insurance covers.",
              ],
            },
          ]}
          faqs={[
            {
              q: "Do you see Invisalign® patients from Oakland?",
              a: "Yes — Oakland is next door. Our office is on Grand Avenue in Piedmont, about 1.4 miles from Lake Merritt and a seven-minute drive from Rockridge or Montclair without traffic. Dr. Martenson and Dr. Ma treat adults from across the East Bay.",
            },
            {
              q: "How far is the office from Lake Merritt, Rockridge and Montclair?",
              a: "Roughly 1.4 miles from Lake Merritt, 2.6 miles from Rockridge BART and 3.1 miles from Montclair Village. Each is about seven minutes by car without traffic; Grand Avenue runs directly from the lake to our door.",
            },
            {
              q: "Is there parking?",
              a: "Street parking is generally available on Grand Avenue near our entrance at 1331 Grand Ave. The parking entrance is below the building; a planted walkway leads from the parking area up to the front door on the upper level.",
            },
            {
              q: "Can I get there by bus or BART?",
              a: "AC Transit's Line 12 runs along Grand Avenue and stops at Grand & Euclid, about three-quarters of a mile below the office; Line 88 ends on Highland Avenue in Piedmont, about a mile away. MacArthur BART is a short drive.",
            },
            {
              q: "How long does Invisalign® take?",
              a: "Six to eighteen months for most adults. Simple cases — minor crowding, small gaps — often finish in six to nine months; moderate cases such as crossbites or deeper crowding usually run twelve to eighteen. You get a specific estimate after the iTero® scan.",
            },
            {
              q: "How many hours a day do I have to wear the aligners?",
              a: "We ask for 22 hours a day, taking them out only to eat, drink anything other than water, and brush. Manufacturers put the effective range at 20–22 hours (Dentistry Journal, 2024); under that, teeth stop tracking the plan and treatment stretches.",
            },
            {
              q: "Is Invisalign® from a dentist really different from mail-order aligners?",
              a: "Yes. Mail-order treatment skips the in-person exam and X-rays. The American Association of Orthodontists warns that moving teeth without that examination can cause irreversible harm, and 77 percent of orthodontists it surveyed in 2022 had treated patients who needed retreatment afterwards. Here, every case starts with an exam that rules out gum disease and decay, a scan taken in the office, and check-ins with the dentist who planned it.",
            },
            {
              q: "How much does Invisalign® cost in Oakland?",
              a: "Invisalign® says treatment usually costs about the same as braces, with the fee set by case complexity and the number of aligners (Invisalign.com). We quote in writing after the consultation and scan. Dental plans with an orthodontic benefit may cover part of the cost, and financing, including CareCredit, is available for the rest.",
            },
            {
              q: "Will I need a retainer afterwards?",
              a: "Yes. Teeth drift back toward their original positions after any orthodontic treatment, which is why the ADA counts a retainer period as part of the process. We make Vivera® retainers at the end of your case; most patients wear them at night indefinitely.",
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
                "Dentistry Journal (Basel), 2024 — Assessment of Food Masticatory Capability with Clear Aligners",
              href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11276165",
            },
            {
              label: "Invisalign.com — Average Cost of Invisalign® Aligners",
              href: "https://www.invisalign.com/invisalign-cost",
            },
          ]}
          featuredImage="/img/procedures/cosmetic-dentistry/invisalign/hero.jpg"
          featuredAlt="Invisalign® clear aligner — Piedmont Dental By Design, serving Oakland"
        />
        <AwardsStrip />
        <AboutCTA />
      </main>
      <SiteFooter />
    </>
  );
}
