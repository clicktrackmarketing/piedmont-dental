import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import ProcedureDetail from "@/components/ProcedureDetail";
import AwardsStrip from "@/components/AwardsStrip";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";
import { getCategory } from "@/lib/procedure-categories";

// Month 2 city page — dental crowns × Oakland (run-plan #47/#48). Reuses the
// procedure template; every clinical line is grounded in the parent
// Crowns (Caps) page, the CEREC® page, or a cited source listed at the foot
// of the page.

export const metadata: Metadata = {
  title: "Dental Crowns for Oakland Patients",
  description:
    "Porcelain crowns for Oakland patients from Drs. Martenson and Ma on Grand Avenue in Piedmont, 1.4 miles from Lake Merritt — many designed, milled and fitted in one visit with CEREC®.",
  alternates: { canonical: "/oakland/dental-crowns" },
  openGraph: {
    title: "Dental Crowns for Oakland Patients — Piedmont Dental By Design",
    description:
      "A crown for a broken, decayed or heavily filled tooth, a few minutes up Grand Avenue from Lake Merritt: exam, digital scan, and for many teeth a permanent CEREC® crown the same day.",
    url: "https://piedmontdentalbydesign.com/oakland/dental-crowns",
    type: "article",
  },
};

const category = getCategory("restoration");

export default function OaklandDentalCrownsPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="crowns-caps"
          cityPage={{ href: "/oakland/dental-crowns", city: "Oakland" }}
          title="Dental Crowns for Oakland Patients"
          tagline="Porcelain crowns for Oakland patients — for many teeth, scanned, milled and fitted in one visit, a few minutes up Grand Avenue."
          intro={[
            "A crown covers the whole of a damaged tooth and gives it back its shape, size and strength. Dr. Jill Martenson and Dr. David Ma place porcelain crowns for Oakland patients at our office on Grand Avenue in Piedmont — about 1.4 miles from Lake Merritt, and roughly seven minutes by car from Rockridge BART or Montclair Village without traffic. For many teeth, the permanent crown is designed and milled here with CEREC® while you wait.",
            "Piedmont is a small city with Oakland on every side; the line between the two is a few blocks from our door, and Grand Avenue climbs from the lake straight to the office. This page covers how a crown is made here, which teeth need one and which don't, how a crown compares with an onlay or a filling, what the appointment looks like, how to reach us from Lake Merritt, Rockridge or Montclair, and what crowns cost across the market — the same conversation we have at a complimentary consultation.",
          ]}
          stats={[
            { value: "1.4 mi", label: "From Lake Merritt" },
            { value: "3.1 mi", label: "From Montclair Village" },
            { value: "1 visit", label: "Same-day crowns with CEREC®" },
            { value: "1.5–2 hrs", label: "One same-day appointment" },
          ]}
          sections={[
            {
              title: "Why Oakland patients come to a Piedmont office for a crown",
              body: [
                "A crown is not a one-off purchase: the tooth underneath still needs watching, and if anything ever feels off you want the person who made it to be the person who looks at it. Ours is an owner-run practice. Dr. Martenson and Dr. Ma are the two co-owners, and one of them examines the tooth, prepares it, designs the crown and checks it at your later cleaning visits. That continuity is the reason to drive a few minutes further up the hill.",
                "The other reason is the map. Our office is at 1331 Grand Avenue in Piedmont, and Oakland surrounds it. Lake Merritt is about 1.4 miles away, Rockridge BART about 2.6 miles and Montclair Village about 3.1 miles — six or seven minutes by car without traffic — so for a good part of Oakland we are nearer than a practice across town.",
                "Same-day crowns make the geography matter even more. When a tooth suits CEREC® milling, you make one trip up Grand Avenue rather than two, and there is no temporary crown to worry about in between.",
              ],
            },
            {
              title: "How a crown is made here",
              body: [
                "It starts with a complimentary consultation. We examine the tooth, take digital or panoramic X-rays as needed, and tell you plainly whether it needs a crown, whether something smaller would do, or whether the tooth is past saving. If a crown is the right call, the preparation is the same either way: with the tooth numb, we remove any decay and shape the surface so the crown will seat properly. From there the path splits:",
              ],
              bullets: [
                "Same-day with CEREC®: we take a 3D digital scan of the prepared tooth, design the crown on screen and mill it from a solid ceramic block in our own office. The crown that goes in is the permanent one, bonded before you leave — about 1.5 to 2 hours in a single appointment, with one round of numbing instead of two and no impressions sent away.",
                "Lab-made: for larger reconstructions, and for front teeth where we are matching subtle color and translucency across several teeth, a dental laboratory does the finer work. We take impressions, fit a temporary crown for roughly two weeks, then remove it, clean the tooth and cement the finished crown at a second visit, checking the spacing and the bite.",
                "Either way you leave with care instructions, and we check the crown at your regular visits from then on.",
              ],
            },
            {
              title: "Porcelain, and why it is the usual choice",
              body: [
                "Crowns come in several materials, but porcelain — tooth-colored ceramic — is the one most patients choose. It is matched to the shape, size and shade of the teeth around it, and it is durable enough to last many years. Like most dental restorations it may eventually need replacing, and we would rather say that now than have you discover it later.",
                "For a same-day crown, the ceramic blocks come in a range of shades and translucencies, and we pick the one closest to your own teeth before milling. For a front tooth between two natural ones, we choose the shade together with a guide and, if the match calls for it, use a laboratory instead.",
              ],
            },
            {
              title: "Who a crown is for",
              body: [
                "A crown is for a tooth with a sound root that has lost too much of its top to be rebuilt with a filling. The American Dental Association lists the jobs a crown does: strengthen a tooth with a large filling when there isn't enough tooth left to hold the filling, protect a weak tooth from breaking, restore a broken one, cover a discolored or badly shaped tooth, anchor a bridge or top an implant (ADA MouthHealthy). In our practice the usual reasons are:",
              ],
              bullets: [
                "A broken or fractured tooth.",
                "Decay too extensive for a filling.",
                "A filling that has fractured, or a large old filling with thin walls of tooth around it.",
                "A tooth that is badly shaped or discolored, where covering it is the right cosmetic answer.",
              ],
            },
            {
              title: "When we'll tell you a crown isn't the answer",
              body: [
                "A crown means shaping the tooth all the way round, so before we recommend one we ask whether something smaller would do the job. A small cavity gets a filling. A back tooth with a broken cusp but sound walls elsewhere is often a candidate for an onlay, which covers only the damaged part; CEREC® mills onlays as well as crowns. A tooth that is the wrong color but structurally sound may be better served by a veneer or whitening than by cutting it down.",
                "We will also say so when a crown is the wrong bet for the tooth's future. A practice-based series of 1,037 crowns found that front-tooth placement, a non-vital tooth and grinding all significantly shortened crown survival (European Journal of Oral Sciences, 2022). None of those rules a crown out, but if you clench or grind we plan for it — and if a tooth is too broken down to hold a crown, the honest conversation is about replacing it with an implant or a bridge.",
              ],
            },
            {
              title: "Crown vs onlay vs filling",
              body: [
                "All three answer the same question: how much of the tooth is left. A filling fills a hole and relies on the surrounding tooth for strength. An onlay is made outside the mouth, like a crown, but covers only the chewing surface and the damaged cusp. A full crown covers everything above the gumline. The more tooth that is missing, the further along that line the right answer sits (ADA MouthHealthy).",
                "The evidence on onlays is reassuring for the middle ground. A 2022 meta-analysis of six studies — one randomised trial, five observational — found no statistically significant difference in survival between tooth-colored onlays or partial crowns and full crowns on back teeth at one year or three years, and concluded that onlays “performed as excellently as full crowns in posterior region in a short-term period” (Head & Face Medicine, 2022). Short-term is the honest qualifier: onlays have not been followed for as many years as full crowns have.",
                "In the chair, that means: sound walls, we usually suggest the onlay and keep the rest of the tooth; thin, cracked or undermined walls, the crown is the safer investment.",
              ],
            },
            {
              title: "What the appointment looks like",
              body: [
                "For a same-day crown, set aside about two hours. The tooth is numbed and prepared, the scan takes a few minutes, the design and milling happen while you wait, and the crown is tried in, adjusted, polished and bonded. You leave with the finished tooth and nothing to come back for beyond normal check-ups.",
                "A lab-made crown means two visits about two weeks apart: preparation, impressions and a temporary crown at the first; at the second, the temporary comes off, the tooth is cleaned and the permanent crown is cemented, with the spacing and bite checked.",
                "For the first few days a new crown feels new — your tongue notices the shape, and you may feel it when you bite. Most people stop noticing within a week. If it feels tall or rocks against a neighbor, call us for a quick bite adjustment.",
              ],
            },
            {
              title: "Living with a crown",
              body: [
                "Porcelain cannot decay, but the tooth underneath can. The vulnerable spot is the margin where crown meets tooth, especially where the gum has receded and exposed root surface, which is why we still check every crown at your cleaning visits and on X-rays. Brush and floss around it exactly as you would a natural tooth.",
                "How long will it last? Many years, not forever. In one practice-based series of 1,037 single crowns followed for an average of more than eleven years, 89.9 percent were still in place at five years, 80.9 percent at ten, 70.5 percent at fifteen and 61.8 percent at twenty (European Journal of Oral Sciences, 2022). That is one series from one institution, not a pooled review — a guide, not a promise. Same-day crowns have long-term data of their own: a prospective study of 34 chairside lithium disilicate crowns, milled on a CEREC® unit, reported 80.1 percent survival after a mean of 15.2 years, which its authors called acceptable (Clinical Oral Investigations, 2023) — a small study, but a long one. With good care, most porcelain crowns last 15 to 25 years, and some last 30 or more.",
              ],
            },
            {
              title: "Getting here from Oakland",
              body: [
                "We are at 1331 Grand Avenue, Piedmont, in a two-storey building: the practice is on the upper level and the parking entrance sits below it. The address is shared with The Oldershaw Clinic, so look for our sign on the railing and take the planted walkway from the parking area to the front door.",
              ],
              bullets: [
                "By car: Lake Merritt is about 1.4 miles away, around six minutes without traffic — from the lake, Grand Avenue runs straight to us. Rockridge BART is about 2.6 miles and Montclair Village about 3.1 miles, each about seven minutes. MacArthur BART is a short drive.",
                "Parking: street parking is generally available on Grand Avenue near the entrance.",
                "By bus: AC Transit Line 12 comes through Temescal and along Piedmont Avenue and Grand Avenue, stopping at Grand & Euclid, about three-quarters of a mile below the office; it does not climb into Piedmont. Line 88 ends at Highland Avenue & Highland Way in Piedmont, about a mile from us.",
              ],
            },
            {
              title: "Cost and coverage, without the runaround",
              body: [
                "The number that matters is the one on your written estimate after the exam, because it depends on the tooth, the material and whether the crown is milled here or made by a laboratory. What we can give you now is the market picture: Delta Dental puts the average out-of-network cost of a permanent crown at $1,100 to $2,000, a price that generally covers the temporary crown, the permanent crown, the numbing, laboratory costs and the dentist's time (Delta Dental). Bay Area fees run above these national figures. See our current fees on the Crowns page. Ranges vary by region, material and complexity.",
                "Many dental benefit plans help with the cost of a crown, though some do not; Delta Dental's advice is to ask for a pre-treatment estimate so you know what your plan will pay before the work starts (Delta Dental). We verify your benefits before treatment begins, financing including CareCredit is available for anything left over, and the consultation itself is complimentary.",
              ],
            },
          ]}
          faqs={[
            {
              q: "Do you treat crown patients from Oakland?",
              a: "Yes. Piedmont is surrounded by Oakland, and our office on Grand Avenue is about 1.4 miles from Lake Merritt. Dr. Martenson and Dr. Ma place crowns for patients from Lake Merritt, Rockridge, Montclair and across the East Bay.",
            },
            {
              q: "How many trips from Oakland will a crown take?",
              a: "Often one. When the tooth suits CEREC® milling, we scan, design, mill and bond the permanent crown in a single appointment of about 1.5 to 2 hours. If a laboratory should make it — larger reconstructions, or front teeth where color must match across several teeth — it is two visits about two weeks apart, with a temporary in between.",
            },
            {
              q: "How long is the drive from Rockridge or Montclair?",
              a: "About seven minutes from either without traffic: Rockridge BART is roughly 2.6 miles from the office and Montclair Village about 3.1 miles. From Lake Merritt it is about 1.4 miles, around six minutes, straight up Grand Avenue.",
            },
            {
              q: "Where do I park?",
              a: "On the street — parking is generally available on Grand Avenue near the entrance. The parking entrance is below the building, and a planted walkway leads from the parking area up to the front door on the upper level. Look for our sign on the railing; we share the address with The Oldershaw Clinic.",
            },
            {
              q: "Can I reach the office without a car?",
              a: "Partly. AC Transit Line 12 runs along Grand Avenue and stops at Grand & Euclid, about three-quarters of a mile below the office; Line 88 ends at Highland Avenue & Highland Way in Piedmont, about a mile away. Rockridge and MacArthur BART are the nearest stations, and each is a short drive from us.",
            },
            {
              q: "How long does a same-day crown take?",
              a: "About 1.5 to 2 hours in one appointment: numbing and preparing the tooth, a 3D scan, designing the crown on screen, milling it from a ceramic block, then fitting, polishing and bonding it. You leave with the permanent crown in place and no temporary to look after.",
            },
            {
              q: "How long will my crown last?",
              a: "Many years, but not forever. A practice-based series of 1,037 single crowns found 80.9 percent still in place at ten years and 61.8 percent at twenty (European Journal of Oral Sciences, 2022); a 15-year study of 34 same-day lithium disilicate crowns reported 80.1 percent survival (Clinical Oral Investigations, 2023). Decay at the margin, grinding and the tooth underneath decide most of the difference.",
            },
            {
              q: "Crown or onlay — how do you decide?",
              a: "By how much sound tooth is left. If the walls are intact and only a cusp or the chewing surface is damaged, an onlay covers the damage and leaves the rest alone — a 2022 meta-analysis found no significant survival difference between onlays and full crowns on back teeth at one and three years (Head & Face Medicine, 2022). If the walls are thin, cracked or undermined by an old filling, a crown protects the tooth better.",
            },
            {
              q: "How much does a dental crown cost in Oakland?",
              a: "Delta Dental puts the average out-of-network cost of a permanent crown at $1,100 to $2,000, covering the temporary, the permanent crown, the numbing, laboratory costs and the dentist's time (Delta Dental); prices vary by region, material and complexity. Bay Area fees run above these national figures. See our current fees on the Crowns page. We quote in writing after the exam, verify your benefits first, and offer financing, including CareCredit, for anything your plan does not cover.",
            },
          ]}
          sources={[
            {
              label: "American Dental Association, MouthHealthy — Crowns",
              href: "https://www.mouthhealthy.org/all-topics-a-z/crowns",
            },
            {
              label:
                "European Journal of Oral Sciences, 2022 — Retrospective clinical study of tooth-supported single crowns: a multifactor analysis",
              href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9546353",
            },
            {
              label:
                "Clinical Oral Investigations, 2023 — Long-term survival of monolithic tooth-supported lithium disilicate crowns fabricated using a chairside approach: 15-year results",
              href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10329614",
            },
            {
              label:
                "Head & Face Medicine, 2022 — Onlays/partial crowns versus full crowns in restoring posterior teeth: a systematic review and meta-analysis",
              href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9677648",
            },
            {
              label: "Delta Dental — Dental crown costs and insurance: What you need to know",
              href: "https://www.deltadental.com/protect-my-smile/procedures/dental-crowns/treatment-cost/",
            },
          ]}
          featuredImage="/img/home-services/cerec.jpg"
          featuredAlt="Dental crowns — Piedmont Dental By Design, serving Oakland"
        />
        <AwardsStrip />
        <AboutCTA />
      </main>
      <SiteFooter />
    </>
  );
}
