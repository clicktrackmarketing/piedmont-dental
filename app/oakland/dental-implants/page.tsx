import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import ProcedureDetail from "@/components/ProcedureDetail";
import AwardsStrip from "@/components/AwardsStrip";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";
import { getCategory } from "@/lib/procedure-categories";

// Month 2 city page — Dental Implants × Oakland (run-plan #47/#48). Reuses the
// procedure template; every clinical line is grounded in the parent Dental
// Implants page or a cited source listed at the foot of the page.

export const metadata: Metadata = {
  title: "Dental Implants for Oakland Patients",
  description:
    "Dental implants for Oakland patients — planned and restored by Drs. Martenson and Ma on Grand Avenue in Piedmont, 1.4 miles from Lake Merritt. Titanium implants, honest timelines, complimentary consultation.",
  alternates: { canonical: "/oakland/dental-implants" },
  openGraph: {
    title: "Dental Implants for Oakland Patients — Piedmont Dental By Design",
    description:
      "Replace a missing tooth from the root up, a few minutes up Grand Avenue from Lake Merritt, Rockridge or Montclair: exam, X-rays, placement, healing and the final crown, explained plainly.",
    url: "https://piedmontdentalbydesign.com/oakland/dental-implants",
    type: "article",
    images: ["/img/procedures/restoration/dental-implants/hero.png"],
  },
};

const category = getCategory("restoration");

export default function OaklandDentalImplantsPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="dental-implants"
          cityPage={{ href: "/oakland/dental-implants", city: "Oakland" }}
          title="Dental Implants for Oakland Patients"
          tagline="A titanium root and a natural-looking tooth for Oakland patients — planned, healed and finished a few minutes up Grand Avenue."
          intro={[
            "A dental implant replaces a missing tooth from the root up: a titanium post that fuses with your jawbone, topped with a crown made to match the teeth beside it. For Oakland patients, Dr. Jill Martenson and Dr. David Ma plan and restore implants from our Grand Avenue office in Piedmont — about 1.4 miles from Lake Merritt, and roughly a seven-minute drive from Rockridge BART or Montclair Village without traffic.",
            "The Oakland city line is only a few blocks from our door, and Grand Avenue runs from the lake straight up to it, so an implant here does not mean a trek. This page explains how implant treatment works, who it suits, when we will tell you a bridge or a denture is the better call, what the months of healing actually involve, and what implants cost in the market — the same conversation we have in a complimentary consultation.",
          ]}
          stats={[
            { value: "1.4 mi", label: "From Lake Merritt" },
            { value: "~7 min", label: "From Rockridge BART or Montclair" },
            { value: "Titanium", label: "Implant material" },
            { value: "Up to 6 mo", label: "Bone healing & integration" },
          ]}
          sections={[
            {
              title: "Why Oakland patients choose a Piedmont office for dental implants",
              body: [
                "An implant is one of the longer treatments in dentistry: an exam and X-rays, surgical placement, months while the bone heals around the post, then the fittings for the final tooth. Over that stretch it helps to have the same two people looking at your mouth. Ours is a small, owner-run practice — Dr. Jill Martenson and Dr. David Ma are the co-owners, and one of them examines you, plans the case and fits the tooth you end up chewing on.",
                "The other reason is that Piedmont is closer than most Oakland patients assume. Our office is at 1331 Grand Avenue in Piedmont, the small city surrounded on every side by Oakland; the city line is a few blocks away, and Grand Avenue runs from Lake Merritt straight up to our door — about 1.4 miles, around six minutes without traffic. Rockridge BART is about 2.6 miles and Montclair Village about 3.1 miles, each roughly seven minutes. MacArthur BART is a short drive.",
                "The consultation, the digital and panoramic X-rays, the planning and the finished crown are all handled here. Surgical placement of the implant is done by a dentist or periodontist, and before anything is scheduled you will know who is doing which step and in what order.",
              ],
            },
            {
              title: "How dental implant treatment works here",
              body: [
                "It starts with a complimentary consultation. We examine your teeth and gums and take digital and panoramic X-rays to see how much bone, gum tissue and space there is where the tooth used to be — the three things that decide whether an implant is possible and how it should be planned. If it is, the steps are the same for every patient:",
              ],
              bullets: [
                "The implant — a titanium post that works as an artificial root — is placed surgically in the upper or lower jaw while the area is numb under local anesthesia.",
                "The bone then heals and knits itself to the implant surface, a process the American Dental Association calls osseointegration. It takes time — up to six months before the replacement tooth can be attached (ADA MouthHealthy).",
                "Depending on the implant design, a second short procedure may be needed to attach the post that will hold the tooth; with other designs the post and anchor go in together at the first visit.",
                "After a few more weeks of healing, the replacement tooth is made and fitted to the post. Several fittings may be needed, so this stage can take one to two months on its own.",
                "You leave with care instructions. Good hygiene, sensible eating habits and regular visits are what keep an implant going for the long haul.",
              ],
            },
            {
              title: "Who dental implants are for",
              body: [
                "Most healthy adults with one or more missing teeth are candidates. The two requirements are enough jawbone to hold the implant and healthy gum tissue around it. The American Dental Association adds that general health matters more than age, and that chronic illnesses such as diabetes can interfere with healing after surgery, so your medical history is part of the assessment (ADA MouthHealthy). We recommend an implant when the goal is one of these:",
              ],
              bullets: [
                "Replacing a missing tooth without cutting down the healthy teeth on either side of the gap.",
                "Stopping the neighboring teeth from drifting into the space, which can upset your bite and strain the jaw joint.",
                "Restoring chewing, speech and digestion after a tooth is lost.",
                "Supporting the facial tissues that a missing tooth leaves unsupported.",
                "Anchoring a bridge or a denture so it stops moving and becomes comfortable to wear.",
                "Getting back a smile you are not hiding.",
              ],
            },
            {
              title: "If the tooth has been gone a while: bone, grafting and timing",
              body: [
                "A natural root keeps the jawbone working, and an implant stimulates the bone in the same way — one reason it is preferred over a bridge. Once a tooth comes out, though, the bone that held it begins to shrink. A systematic review of post-extraction changes in humans found horizontal bone loss of 29 to 63 percent and vertical loss of 11 to 22 percent within the first six months (Tan et al., cited in Clinical, Cosmetic and Investigational Dentistry, 2026). That is why we would rather talk about an implant soon after an extraction than years later.",
                "If you have been missing the tooth for a long time and bone has been lost, a bone graft may be recommended before the implant can go in. The X-rays show what is there, and we will not pretend the bone is present when it is not. A graft adds roughly three to four months to the plan — far better to hear that at the consultation than partway through treatment.",
              ],
            },
            {
              title: "When we'll tell you an implant isn't the answer",
              body: [
                "Implants are not for everyone, and we would rather say so than place one that is likely to be lost. The main risk factors for failure are smoking, uncontrolled diabetes and the poor oral hygiene that leads to peri-implantitis — inflammation of the tissue around the implant. The ADA's own list is the same: chronic illness can interfere with healing, and tobacco slows it (ADA MouthHealthy).",
                "Smoking deserves its own sentence. A systematic review and meta-analysis in Medicina pooled 292 publications — 35,511 implants in smokers against 114,597 in non-smokers — and found that smokers had about 2.4 times the odds of implant failure, along with more bone loss around the implant (Mustapha, Salame and Chrcanovic, Medicina, 2021). If you smoke, we will talk about that before we plan anything, because it changes the odds and you deserve to know by how much.",
                "There are also cases where a different restoration is simply the better tool: too little bone and no appetite for grafting, a budget or timetable that a bridge fits better, or a mouth where several teeth are failing and a denture anchored on a few implants makes more sense than one implant per tooth. We lay the options out side by side below, and again in person.",
              ],
            },
            {
              title: "Implants vs bridges vs dentures",
              body: [
                "A bridge replaces the missing tooth by anchoring an artificial one to the teeth on either side, which have to be filed down to carry crowns. An implant stands on its own: the neighboring teeth are untouched, and the implant stimulates the jawbone the way a natural root does. Bridges typically last ten to fifteen years; the implant post is designed to last a lifetime, and the porcelain crown on top — which typically lasts fifteen to twenty-five years — can be replaced without disturbing the implant beneath it.",
                "A removable partial or complete denture is the least invasive option, but it rests on the gums rather than in the bone, which is why it can shift when you eat or speak. Implants can also anchor a denture, giving it far more stability and comfort than it has on its own; the ADA lists bridges and dentures as the alternatives to weigh against an implant (ADA MouthHealthy).",
                "The evidence on implants themselves is strong. A 2025 registry study of 158,824 implants placed in 53,874 patients reported overall implant survival of 97.79 percent, with an early-failure rate during the bone-healing phase of 1.56 percent; failures were most common in the first year and fell away after that (Journal of Functional Biomaterials, 2025). Survival is not the same as never needing attention — an implant can occasionally need re-tightening or a part replaced through normal wear — but the post itself very rarely fails.",
              ],
            },
            {
              title: "What the timeline looks like",
              body: [
                "Count in months, not weeks. Most single-tooth cases run four to six months from placement to final crown: the post goes in at one surgical visit, the bone fuses around it over three to six months, and then the abutment and the custom porcelain crown are fitted. A bone graft first adds roughly three to four months, and an implant design that needs a second procedure to attach the post adds a few weeks of healing before the fittings begin. We give you a specific timeline at the consultation, after the X-rays, not before.",
                "Discomfort is usually modest. Placement is done under local anesthesia, most patients report less discomfort than a tooth extraction, and mild soreness for three to five days afterwards is normal and managed with over-the-counter pain relief. The ADA suggests soft foods while the site heals, and a temporary replacement tooth can be worn while the permanent one is being made — ask about it at the consultation if the gap shows when you smile (ADA MouthHealthy).",
              ],
            },
            {
              title: "Living with an implant",
              body: [
                "Once the crown is on, an implant asks for the same care as a natural tooth: brush twice a day, clean between the teeth every day, and keep up cleanings and exams every six months so the implant, the gum around it and the bone level can be checked with X-rays. We may suggest a water flosser or a small interdental brush for the implant area, because plaque collecting at the gumline is what starts trouble.",
                "The trouble to guard against is peri-implantitis — inflammation of the gum and bone around the implant, driven by poor hygiene — which is the main way an integrated implant is lost later. The habits above are the prevention. Treat the implant crown like a tooth, not a tool: no cracking ice, no opening packets, no chewing pen caps. The crown wears like any restoration and can be remade without touching the implant beneath it.",
              ],
            },
            {
              title: "Getting here from Oakland",
              body: [
                "We are at 1331 Grand Avenue, Piedmont, CA 94610 — a two-storey building with the practice on the upper level and the parking entrance below it. The address is shared with The Oldershaw Clinic, so look for our sign on the railing; a planted walkway leads from the parking area to the front door.",
              ],
              bullets: [
                "Driving: Grand Avenue runs from Lake Merritt straight up to us — about 1.4 miles, around six minutes without traffic. Rockridge BART is about 2.6 miles and Montclair Village about 3.1 miles, each roughly seven minutes. MacArthur BART is a short drive.",
                "Parking: street parking is generally available on Grand Avenue near the entrance.",
                "By bus: AC Transit Line 12 runs along Grand Avenue from the lake and stops at Grand & Euclid, about three-quarters of a mile below the office — it does not continue into Piedmont. Line 88, which comes through Downtown Oakland, ends at Highland Avenue in Piedmont, about a mile away.",
                "Number of trips: an implant means several visits spread over a few months — the consultation, placement, a check once the bone has healed, the fittings and the final crown — so being seven minutes away counts for more than it would with a single filling.",
              ],
            },
            {
              title: "Cost and coverage, without the runaround",
              body: [
                "Delta Dental puts the cost of a single dental implant without dental benefits — the surgical placement, the supporting structure for the crown and the crown itself — at about $2,800 to $5,600, and notes that the price moves with the type of implant, how many are needed, whether your plan covers implants and whether the dentist is in your plan's network (Delta Dental). Bay Area fees run above these national figures. See our current fees on the Dental Implants page. Anything extra a case needs, such as a graft or an extraction, is its own line in the plan, so read any quote with that in mind.",
                "On insurance, Delta Dental's own summary is the honest one: many dental benefit plans help with the cost of implants, and some do not, so the first step is to check what your plan actually says (Delta Dental). We give you a complete written estimate after the consultation and X-rays, and financing, including CareCredit, is available for whatever your plan does not cover.",
              ],
            },
          ]}
          faqs={[
            {
              q: "Do you see dental implant patients from Oakland?",
              a: "Yes — the Oakland city line is a few blocks from our door. The office is on Grand Avenue in Piedmont, about 1.4 miles from Lake Merritt and a seven-minute drive from Rockridge BART or Montclair Village without traffic. Dr. Martenson and Dr. Ma see patients from across the East Bay.",
            },
            {
              q: "How many trips from Oakland will an implant take?",
              a: "Several, spread over a few months: the consultation and X-rays, the surgical placement, a check once the bone has healed, one or more fittings, and the visit where the final crown goes on. Each is a short drive up Grand Avenue — about six minutes from Lake Merritt and seven from Rockridge or Montclair — which keeps the sequence manageable.",
            },
            {
              q: "Where do I park at 1331 Grand Avenue?",
              a: "Street parking is generally available on Grand Avenue near the entrance. The parking entrance sits below the building, and a planted walkway leads from the parking area to the front door on the upper level. We share the address with The Oldershaw Clinic, so look for our sign on the railing.",
            },
            {
              q: "Can I get to you by bus or BART from Oakland?",
              a: "AC Transit Line 12 runs along Grand Avenue from the lake and stops at Grand & Euclid, about three-quarters of a mile below the office; it does not continue into Piedmont. Line 88 ends at Highland Avenue in Piedmont, about a mile away. Rockridge and MacArthur BART are each a short drive.",
            },
            {
              q: "How long does a dental implant take from start to finish?",
              a: "Most single-tooth cases run four to six months. The post is placed at one surgical visit, the bone fuses around it over three to six months, and then the abutment and crown are fitted. A bone graft first adds roughly three to four months. You get a specific timeline at the consultation, once we have seen the X-rays.",
            },
            {
              q: "Does getting a dental implant hurt?",
              a: "Placement is done under local anesthesia, and most patients report less discomfort than a tooth extraction. Mild soreness for three to five days afterwards is normal and managed with over-the-counter pain relief. The ADA recommends soft foods while the site heals.",
            },
            {
              q: "How long do dental implants last?",
              a: "The titanium post, once fused to the jawbone, is designed to last a lifetime; the porcelain crown on top typically lasts fifteen to twenty-five years and can be replaced without disturbing the implant. A 2025 registry study of 158,824 implants reported overall survival of 97.79 percent (Journal of Functional Biomaterials, 2025). Good hygiene and regular check-ups keep an implant in that majority.",
            },
            {
              q: "I've been missing a tooth for years — is it too late for an implant?",
              a: "Usually not, but the bone may have changed. A systematic review found horizontal bone loss of 29 to 63 percent within six months of an extraction (Tan et al., cited in Clinical, Cosmetic and Investigational Dentistry, 2026), so a long-standing gap sometimes needs a bone graft before the implant, adding three to four months. The X-rays at your consultation settle it.",
            },
            {
              q: "How much does a dental implant cost in Oakland?",
              a: "Delta Dental's published range for a single implant without benefits — placement, supporting structure and crown — is about $2,800 to $5,600, varying with the type of implant, the number needed and your plan (Delta Dental). Bay Area fees run above these national figures. See our current fees on the Dental Implants page. We quote in writing after the consultation and X-rays. Many plans help with part of the cost and some do not; financing, including CareCredit, is available for the rest.",
            },
            {
              q: "Is an implant better than a bridge?",
              a: "For most single missing teeth, yes over the long run. A bridge is anchored to the two neighboring teeth, which must be filed down for crowns, and typically lasts ten to fifteen years; an implant leaves those teeth alone, stimulates the jawbone like a natural root, and is designed to last a lifetime. A bridge can still be the right call when bone is short or when budget or timing favor it — we will say which applies to you.",
            },
          ]}
          sources={[
            {
              label: "American Dental Association, MouthHealthy — Implants",
              href: "https://www.mouthhealthy.org/all-topics-a-z/implants",
            },
            {
              label:
                "Journal of Functional Biomaterials, 2025 — Tobias et al., Dental Implant Survival Rates: Comprehensive Insights from a Large-Scale Electronic Dental Registry",
              href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11856851",
            },
            {
              label:
                "Medicina (Kaunas), 2021 — Mustapha, Salame & Chrcanovic, Smoking and Dental Implants: A Systematic Review and Meta-Analysis",
              href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8780868",
            },
            {
              label:
                "Clinical, Cosmetic and Investigational Dentistry, 2026 — Zhou et al., Alveolar Ridge Preservation in Posterior Extraction Sockets (citing Tan et al., 2012)",
              href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13018099",
            },
            {
              label: "Delta Dental — Dental Implants Cost and Insurance: What You Need to Know",
              href: "https://www.deltadental.com/protect-my-smile/procedures/dental-implant/treatment-cost/",
            },
          ]}
          featuredImage="/img/procedures/restoration/dental-implants/hero.png"
          featuredAlt="Dental implants — Piedmont Dental By Design, serving Oakland"
        />
        <AwardsStrip />
        <AboutCTA />
      </main>
      <SiteFooter />
    </>
  );
}
