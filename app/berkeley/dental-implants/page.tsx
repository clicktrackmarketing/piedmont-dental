import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import ProcedureDetail from "@/components/ProcedureDetail";
import AwardsStrip from "@/components/AwardsStrip";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";
import { getCategory } from "@/lib/procedure-categories";

// Month 2 city page — Dental Implants × Berkeley (run-plan #47/#48). Reuses the
// procedure template; every clinical line is grounded in the parent Dental
// Implants page or a cited source listed at the foot of the page.

export const metadata: Metadata = {
  title: "Dental Implants for Berkeley Patients",
  description:
    "Dental implants for Berkeley patients — planned and restored by Drs. Martenson and Ma on Grand Avenue in Piedmont, about 2.8 miles from Elmwood and nine minutes from Ashby BART. Complimentary consultation.",
  alternates: { canonical: "/berkeley/dental-implants" },
  openGraph: {
    title: "Dental Implants for Berkeley Patients — Piedmont Dental By Design",
    description:
      "Titanium implants and custom crowns for Berkeley patients, a nine-to-thirteen-minute drive down to Piedmont: exam, X-rays, planning, fittings and follow-up under one roof.",
    url: "https://piedmontdentalbydesign.com/berkeley/dental-implants",
    type: "article",
    images: ["/img/procedures/restoration/dental-implants/hero.png"],
  },
};

const category = getCategory("restoration");

export default function BerkeleyDentalImplantsPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="dental-implants"
          cityPage={{ href: "/berkeley/dental-implants", city: "Berkeley" }}
          title="Dental Implants for Berkeley Patients"
          tagline="Titanium roots and custom crowns for Berkeley patients — planned, fitted and followed up a short drive down in Piedmont."
          intro={[
            "A missing tooth replaced with a titanium root and a crown that is planned, fitted and looked after by the same two dentists. Dr. Jill Martenson and Dr. David Ma see implant patients from across Berkeley at our office on Grand Avenue in Piedmont — about 2.8 miles from Elmwood, and roughly a nine-minute drive from Ashby BART without traffic.",
            "Berkeley has no shortage of places to get an implant, so this page is written for the patient weighing whether the drive down to Piedmont is worth it. It covers how the treatment works here, who it suits and who it doesn't, how an implant compares with a bridge or a denture, what the months between the first visit and the finished tooth actually look like, and the practical business of getting here from Berkeley by car, BART or the 88 bus.",
          ]}
          stats={[
            { value: "2.8 mi", label: "From Elmwood" },
            { value: "~13 min", label: "From Downtown Berkeley" },
            { value: "Titanium", label: "Implant material" },
            { value: "Up to 6 mo", label: "Healing & integration" },
          ]}
          sections={[
            {
              title: "Why Berkeley patients drive down to Piedmont for implants",
              body: [
                "An implant is not a single appointment. From the first X-rays to the finished crown it runs across several months and a number of visits, and the tooth then needs checking for as long as you have it. That makes the office more important than the brand of implant. Ours is owner-run: the dentist who examines you, plans the case and fits the final crown is one of the two co-owners, and the same two dentists see you for the cleanings and check-ups that keep the implant healthy afterwards.",
                "The drive is shorter than most Berkeley patients expect. Elmwood, at College and Ashby, is about 2.8 miles from our door — around nine minutes without traffic — and Claremont is about 3.6 miles, or eleven minutes. From Downtown Berkeley or the UC campus it is roughly 4.3 to 4.4 miles and thirteen minutes; from North Berkeley, about 4.9 miles and fifteen. On a treatment that spans months, those minutes matter less than seeing the same faces at every visit.",
                "What happens here: the consultation, digital and panoramic X-rays, the planning, the impressions, the fittings and the final crown. The surgical placement of the implant post is coordinated by the practice, so you are not left to assemble your own team.",
              ],
            },
            {
              title: "How dental implants work here",
              body: [
                "An implant is a small titanium post placed in the jaw to do the job of a root. The American Dental Association describes implants as posts, made of titanium and other body-compatible materials, that are surgically placed in the upper or lower jaw and act as a sturdy anchor for a replacement tooth; what makes them strong is that the bone grows around the post and holds it, a process called osseointegration (ADA MouthHealthy).",
                "Treatment starts with a complimentary consultation with Dr. Martenson or Dr. Ma. We take digital and panoramic X-rays and, where the case needs it, a 3D scan, to measure the bone, the gum tissue and the space available — then tell you plainly whether an implant is the right tool, or whether a bridge, a denture or a graft first would serve you better. From there, the steps are:",
              ],
              bullets: [
                "Placement: with the area numbed, the implant post is set into the bone, then left to heal and fuse with it for up to six months.",
                "A second stage, for some implant types: a short procedure to attach the post that will carry the tooth. Other designs place the anchor and the post together, so this step is skipped.",
                "The crown: after several weeks of healing, Dr. Martenson or Dr. Ma takes impressions and the artificial tooth is made and fitted to the post. Because it may take several fittings to get the bite and the shade right, this stage can run one to two months.",
                "Aftercare: written care instructions when the tooth is fitted, then routine cleanings and check-ups with the same two dentists.",
              ],
            },
            {
              title: "Who dental implants are for",
              body: [
                "The ADA's rule of thumb is that general health matters more than age: if you are in good health, an implant may be an option for you (ADA MouthHealthy). In our practice the two things we look for are enough jawbone to hold the post and healthy gums around it. Implants suit people who want to:",
              ],
              bullets: [
                "Replace one tooth, or several, without grinding down the healthy teeth on either side.",
                "Stop the neighboring teeth drifting into the gap, which can upset the bite and strain the jaw joint.",
                "Chew, speak and digest normally again.",
                "Support the cheeks and lips where a missing tooth has let the face fall in.",
                "Anchor a loose partial or full denture so it stays put.",
                "Finish with a tooth that is shaded and shaped to match the ones beside it.",
              ],
            },
            {
              title: "When we'll tell you an implant isn't the answer",
              body: [
                "Some of the honest conversations happen at the first visit. If you have been missing the tooth for years and the bone has shrunk, a bone graft may need to come first, which adds three to four months before the post can go in; we will say so, and explain the alternative if you would rather not wait. If a chronic illness such as diabetes is not well controlled, the ADA notes it may interfere with healing after surgery, and some patients with these conditions are not good candidates (ADA MouthHealthy).",
                "Smoking is the one we are most direct about. A 2021 meta-analysis in the journal Medicina, pooling 292 studies and more than 150,000 implants, found that implants in smokers failed at 2.4 times the odds of those in non-smokers and lost more bone around the post (Mustapha, Salame and Chrcanovic, 2021). The ADA puts it more simply: tobacco slows healing (ADA MouthHealthy). We do not turn smokers away, but we tell you the numbers before you decide.",
              ],
            },
            {
              title: "Implants vs bridges vs dentures",
              body: [
                "A bridge replaces the missing tooth by anchoring a false one to the teeth on either side, which have to be filed down to take crowns. An implant stands alone: the neighboring teeth are untouched, and the post stimulates the jawbone the way a natural root does, which is why the bone around it holds up. The bridge is quicker — nothing is placed in the bone, so there are no months of healing — and for some mouths it remains the sensible choice; the consultation is where we say which.",
                "A removable denture is the least invasive option and the least secure. Where several teeth are missing, implants and dentures are not rivals: the ADA notes that custom bridges or dentures can be made to fit your mouth and your implants (ADA MouthHealthy), and a denture anchored to implants stays put in a way a conventional one cannot. Which of the three fits you depends on the bone available, the health of the neighboring teeth, how long you want the result to last and what you are prepared to go through to get it — we lay those out side by side rather than lead with the most expensive option.",
              ],
            },
            {
              title: "What the timeline looks like",
              body: [
                "Most single-tooth cases run four to six months from placement to finished crown. The post needs three to six months to fuse with the bone before it can carry a tooth, and cases that need a graft first add three to four months. Placement itself is done under local anesthesia; most patients describe less discomfort than a tooth extraction, with mild soreness for three to five days that over-the-counter pain relief handles.",
                "Counted in trips from Berkeley, expect the consultation, the placement, a possible second stage, several impression and fitting visits, the day the crown goes on, and then the ordinary six-monthly check-ups. Because the visits are spread across months rather than bunched together, most Berkeley patients fold them into a working day: nine to thirteen minutes each way from Elmwood, Ashby or Downtown, without traffic.",
              ],
            },
            {
              title: "Living with an implant",
              body: [
                "The post is titanium, but the gum and bone around it can still get sick, in the same way a natural tooth's can. The American Academy of Periodontology calls this peri-implant disease. In its milder form, peri-implant mucositis, the inflammation is confined to the gum with no bone loss, and it is reversible if caught early; in peri-implantitis the bone supporting the implant starts to break down, and treatment usually means surgery. The warning signs are the same as gum disease — red or tender gums around the implant, or bleeding when you brush — and the risk factors it lists are a previous diagnosis of gum disease, poor plaque control, smoking and diabetes (American Academy of Periodontology).",
                "The routine is the one you already know. Implants need regular brushing, flossing and professional check-ups just as teeth do (American Academy of Periodontology), so brush twice a day, floss around the implant as you would a tooth, and keep the six-monthly visits, where we check the gum and the bone level on X-rays. We may suggest a water flosser or a small interdental brush for the implant area. One habit to drop: using a front implant to bite ice, pen caps or anything else hard.",
              ],
            },
            {
              title: "Getting here from Berkeley",
              body: [
                "We are at 1331 Grand Avenue, Piedmont — a two-storey building with the practice on the upper level and the parking entrance below it. The address is shared with The Oldershaw Clinic, so look for our sign on the railing, then follow the planted walkway from the parking area to the front door.",
              ],
              bullets: [
                "Driving: about 2.8 miles from Elmwood (College and Ashby) and 3.3 miles from Ashby BART, each around nine minutes without traffic; about 3.6 miles and eleven minutes from Claremont (Ashby and Domingo); about 4.3 miles and thirteen minutes from Downtown Berkeley BART, 4.4 miles from the UC Berkeley campus, and 4.9 miles and fifteen minutes from North Berkeley at Shattuck and Vine.",
                "Parking: street parking is generally available on Grand Avenue near our entrance.",
                "By bus: AC Transit's Line 88 runs from Downtown Berkeley along University Avenue, Sacramento Street and Market Street, through Downtown Oakland, to Highland Avenue at Highland Way in Piedmont, about a mile from the office. Line 12, from Gilman and 6th, comes down via Martin Luther King Jr Way, Temescal and Piedmont Avenue to Grand and Euclid, about three-quarters of a mile below us; it does not climb into Piedmont.",
                "By BART: Ashby and Downtown Berkeley are the Berkeley stations. From either, the office is a short drive.",
              ],
            },
            {
              title: "Cost and coverage, without the runaround",
              body: [
                "Nobody can quote an implant honestly over the phone, because the price depends on whether a graft is needed, the type of implant and how many teeth are involved. For a sense of scale, Delta Dental puts the cost of an individual implant to replace a single tooth, without dental benefits, at $2,800 to $5,600 — a figure that typically includes the surgical placement, the supporting structure for the crown and the crown itself (Delta Dental). Bay Area fees run above these national figures. See our current fees on the Dental Implants page. Grafts and multiple implants are priced case by case.",
                "On coverage, Delta Dental's own guidance is that many dental benefit plans help with the cost of implants but some do not, and that Medicare and Medicaid usually do not cover them, though certain Medicare Advantage plans might (Delta Dental). The real number comes in writing after the consultation and X-rays, not over the phone, and CareCredit financing is available if you would rather spread the balance.",
              ],
            },
          ]}
          faqs={[
            {
              q: "Do you see dental implant patients from Berkeley?",
              a: "Yes. Berkeley is the next city up from us, and Dr. Martenson and Dr. Ma treat implant patients from Elmwood and Claremont through to Downtown and North Berkeley. The office is on Grand Avenue in Piedmont, about 2.8 miles from Elmwood and a nine-minute drive from Ashby BART without traffic.",
            },
            {
              q: "How far is it from Berkeley, and how long does the drive take?",
              a: "It depends on which end of Berkeley you start from. Elmwood is about 2.8 miles and nine minutes; Claremont about 3.6 miles and eleven minutes; Downtown Berkeley BART and the UC campus about 4.3 to 4.4 miles and thirteen minutes; North Berkeley about 4.9 miles and fifteen minutes. All of those are without traffic.",
            },
            {
              q: "Can I get to the office from Berkeley by bus or BART?",
              a: "AC Transit's Line 88 runs direct from Downtown Berkeley to Highland Avenue in Piedmont, about a mile from the office. Line 12 from Gilman and 6th stops at Grand and Euclid, about three-quarters of a mile below us. Ashby and Downtown Berkeley are the nearest BART stations, and from either one the office is a short drive.",
            },
            {
              q: "Is there parking?",
              a: "Yes — street parking is generally available on Grand Avenue near our entrance. The building has two levels: the parking entrance is on the lower one, and a planted walkway takes you from the parking area to the practice door on the upper level. We share the building's address with The Oldershaw Clinic, so look for our sign on the railing.",
            },
            {
              q: "How many trips from Berkeley will an implant take?",
              a: "Plan on a consultation, the placement visit, possibly a short second stage to attach the post, several impression and fitting visits while the crown is made, and the day it is fitted — spread over four to six months, longer if a graft comes first. After that it is the same six-monthly check-ups you would make anyway.",
            },
            {
              q: "How long does the whole process take?",
              a: "Most single-tooth cases finish in four to six months. The post needs three to six months to fuse with the bone before it can carry a crown, and the crown stage itself can take one to two months of fittings. If bone grafting is needed first, add roughly three to four months. You get a specific timeline at the consultation.",
            },
            {
              q: "Does getting a dental implant hurt?",
              a: "The post is placed under local anesthesia, and most patients report less discomfort than having a tooth pulled. Expect mild soreness for three to five days, which over-the-counter pain relief usually covers. The later crown visits are impressions and fittings, not surgery.",
            },
            {
              q: "What if I've been missing the tooth for years?",
              a: "You may still be a candidate, but the bone may have shrunk in the meantime, and a bone graft could need to come first — it adds about three to four months. The X-rays and a 3D scan at the consultation show us how much bone is there, and the ADA's view is that your general health matters more than your age (ADA MouthHealthy).",
            },
            {
              q: "How much do dental implants cost in Berkeley?",
              a: "For a market benchmark, Delta Dental puts an individual single-tooth implant without dental benefits at $2,800 to $5,600, typically including placement, the supporting structure and the crown (Delta Dental). Bay Area fees run above these national figures. See our current fees on the Dental Implants page. Grafts and multiple implants change the number. We give you a written estimate after the consultation and X-rays, and CareCredit financing is available.",
            },
            {
              q: "Can a dental implant fail?",
              a: "Rarely. In a registry study of 158,824 implants placed between 2014 and 2022, 1.56 percent failed before the crown stage and 2.21 percent overall, with failures most common in the first year (Journal of Functional Biomaterials, 2025). Smoking raises the odds of failure about 2.4 times (Medicina, 2021), and neglected gum health around the post is the other main risk — which is what the routine check-ups are for.",
            },
          ]}
          sources={[
            {
              label: "American Dental Association, MouthHealthy — Implants",
              href: "https://www.mouthhealthy.org/all-topics-a-z/implants",
            },
            {
              label: "American Academy of Periodontology — Peri-Implant Diseases",
              href: "https://www.perio.org/for-patients/periodontal-treatments-and-procedures/dental-implant-procedures/peri-implant-diseases/",
            },
            {
              label:
                "Mustapha, Salame & Chrcanovic, Medicina (Kaunas), 2021 — Smoking and Dental Implants: A Systematic Review and Meta-Analysis",
              href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8780868",
            },
            {
              label:
                "Tobias et al., Journal of Functional Biomaterials, 2025 — Dental Implant Survival Rates: Comprehensive Insights from a Large-Scale Electronic Dental Registry",
              href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11856851",
            },
            {
              label: "Delta Dental — How much does a dental implant cost?",
              href: "https://www.deltadental.com/protect-my-smile/procedures/dental-implant/treatment-cost/",
            },
          ]}
          featuredImage="/img/procedures/restoration/dental-implants/hero.png"
          featuredAlt="Dental implants — Piedmont Dental By Design, serving Berkeley"
        />
        <AwardsStrip />
        <AboutCTA />
      </main>
      <SiteFooter />
    </>
  );
}
