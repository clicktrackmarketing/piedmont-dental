import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import ProcedureDetail from "@/components/ProcedureDetail";
import AwardsStrip from "@/components/AwardsStrip";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";
import { getCategory } from "@/lib/procedure-categories";

// Month 2 city page — Gum disease treatment × Berkeley (run-plan #47/#48).
// Reuses the procedure template; every clinical line is grounded in the
// parent Periodontal Treatment page or a cited source listed at the foot of
// the page. Treatment is described as the practice's periodontal services —
// no individual clinician is attached to it.

export const metadata: Metadata = {
  title: "Gum Disease Treatment for Berkeley Patients",
  description:
    "Gum disease treatment for Berkeley patients: deep cleaning and maintenance with Drs. Martenson and Ma in Piedmont, about nine minutes from Elmwood.",
  alternates: { canonical: "/berkeley/gum-disease-treatment" },
  openGraph: {
    title: "Gum Disease Treatment for Berkeley Patients — Piedmont Dental By Design",
    description:
      "Scaling and root planing, re-evaluation and quarterly maintenance under one roof — a short drive down from Elmwood, Claremont and Downtown Berkeley.",
    url: "https://piedmontdentalbydesign.com/berkeley/gum-disease-treatment",
    type: "article",
    images: ["/img/lIVE Piedmont website images/periodental treatment .png"],
  },
};

const category = getCategory("periodontal-services");

export default function BerkeleyGumDiseaseTreatmentPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="treatment"
          cityPage={{ href: "/berkeley/gum-disease-treatment", city: "Berkeley" }}
          title="Gum Disease Treatment for Berkeley Patients"
          tagline="Scaling, root planing and the maintenance that follows — a nine-to-fifteen-minute drive down from Berkeley."
          intro={[
            "Bleeding gums, deepening pockets, a deep cleaning you have been putting off — for Berkeley patients, gum disease treatment happens a short drive down the hill. Dr. Jill Martenson and Dr. David Ma treat gum disease from our Grand Avenue office in Piedmont: about 2.8 miles from Elmwood, 3.6 miles from Claremont and 4.3 miles from Downtown Berkeley BART, or nine to thirteen minutes by car without traffic.",
            "Gum disease is not a one-visit problem. It is diagnosed by measurement, treated in stages, and then kept quiet with maintenance visits for years afterwards — which is why the practice you choose matters more than whether it sits in Berkeley or a few minutes south of it. This page explains how we treat gum disease, who needs a deep cleaning and who does not, how scaling and root planing compares with surgery and with simply brushing harder, what the first two months look like, and the practical business of getting here from Berkeley. A complimentary consultation covers the same ground in person.",
          ]}
          stats={[
            { value: "2.8 mi", label: "From Elmwood" },
            { value: "~13 min", label: "From Downtown Berkeley" },
            { value: "1–2", label: "Cleanings if caught early" },
            { value: "Quadrant", label: "Deep cleaning, one at a time" },
          ]}
          sections={[
            {
              title: "Why Berkeley patients drive down to Piedmont for gum disease treatment",
              body: [
                "Berkeley has no shortage of dental offices, so it is fair to ask why anyone would drive past them. The honest answer is continuity. Gum disease is managed over years, not fixed in an afternoon: the pockets around your teeth are measured, treated, measured again and then checked every few months for a long time afterwards. In our office the dentist who takes those first measurements and plans your treatment is one of the two co-owners, Dr. Martenson or Dr. Ma, and the same practice carries you through the deep cleaning and every maintenance visit after it. Nothing is handed off between stages.",
                "The drive is shorter than most people expect. Our office is at 1331 Grand Avenue in Piedmont, the small hill city a few minutes south of Elmwood and Claremont. From Elmwood, at College and Ashby, it is about 2.8 miles and nine minutes without traffic; from Claremont, at Ashby and Domingo, about 3.6 miles and eleven minutes; from Downtown Berkeley BART about 4.3 miles and thirteen minutes. If you would rather not drive, AC Transit's Line 88 runs from Downtown Berkeley straight into Piedmont and ends about a mile from our door.",
                "Everything happens in one building: the exam and digital X-rays, the pocket measurements, the deep cleaning itself, the re-evaluation and the maintenance cleanings that follow. A Berkeley patient is never sent somewhere else for the next step.",
              ],
            },
            {
              title: "How gum disease treatment works here",
              body: [
                "Treatment is matched to the stage of the disease, and the stage is found by measuring rather than guessing. At your first visit we measure the pocket depth at every tooth with a small probe — one to three millimeters is healthy, four is borderline, five or more needs treatment — check for bleeding and recession, and read digital X-rays for bone loss. Together those tell us whether you have gingivitis, which is inflammation without bone loss, or periodontitis, where the bone that supports the teeth has started to go.",
                "Gum disease begins in the pocket between tooth and gum, where bacteria, plaque and tartar collect and irritate the tissue; left alone, that irritation damages the gum and then the bone beneath it. The American Academy of Periodontology describes the mildest form, gingivitis, as red, swollen gums that bleed easily, and notes that it is reversible with professional treatment and good home care (American Academy of Periodontology). What we do depends on which side of that line you are on:",
              ],
              bullets: [
                "Gingivitis with no permanent damage: one or two regular cleanings, plus a frank conversation about your daily habits and how often you should be seen.",
                "Periodontitis: scaling and root planing, the deep cleaning. It is done one quadrant of the mouth at a time with the area numbed by a local anesthetic (ADA MouthHealthy).",
                "Scaling removes the tartar, plaque and bacterial toxins from above and below the gumline; root planing smooths the rough spots on the root surfaces so the gum can heal against them and the pockets shrink.",
                "Where it helps, we add medication, a medicated mouth rinse or an electric toothbrush to control the infection while the tissue heals.",
                "A re-evaluation a few weeks later, when every pocket is measured again to see what has healed.",
              ],
            },
            {
              title: "Who gum disease treatment is for",
              body: [
                "Gum disease is far more common than most Berkeley patients assume. The Centers for Disease Control and Prevention reports that 42 percent of American adults aged 30 and over have periodontitis, and about 8 percent have the severe form (CDC). It is also, in the American Academy of Periodontology's words, “often silent” — symptoms may not appear until the advanced stages — which is why the measurements above matter more than how your mouth feels.",
                "Treatment is also for people who have been told they have “pockets” at another office and want a second, measured opinion before agreeing to a deep cleaning; for patients who moved to Berkeley and let a few years slip; and for anyone whose regular cleanings have started to bleed more than they used to. The warning signs the AAP lists are worth knowing (American Academy of Periodontology):",
              ],
              bullets: [
                "Gums that bleed when you brush or floss.",
                "Red, swollen or tender gums.",
                "Gums pulling back from the teeth, so the teeth look longer.",
                "Persistent bad breath.",
                "Pus between the gums and teeth, or mouth sores.",
                "Loose teeth, a change in the way your teeth meet when you bite, or a partial denture that no longer fits.",
              ],
            },
            {
              title: "When we'll tell you a deep cleaning isn't the answer",
              body: [
                "A deep cleaning is a treatment for periodontitis, not a premium cleaning. If your measurements show gingivitis and no bone loss, we will say so, book one or two regular cleanings and coach your home care — and you will have driven down from Berkeley for a smaller answer than you feared, which is the right outcome.",
                "At the other end, scaling and root planing has limits. If the pockets have not healed at the re-evaluation, repeating the deep cleaning is not the answer; periodontal surgery to reduce the pocket depth may be, because shallower pockets are easier to keep clean and slow the disease. The American Academy of Periodontology's position is the same: when non-surgical treatment does not get the gums healthy, gum surgery may be recommended (American Academy of Periodontology). If surgery is needed, Dr. Filippo Cangini, our in-house board-certified periodontist, carries it out here rather than stretching a treatment past what it can do.",
                "Two more honest notes. Periodontitis is managed, not cured — bone that has been lost does not grow back after a deep cleaning, so anyone promising a one-time fix is promising too much. And the CDC lists smoking, diabetes and poor oral hygiene as the factors associated with serious gum disease (CDC); a deep cleaning removes the tartar, but it does not change those, and we will talk about them plainly.",
              ],
            },
            {
              title: "Scaling and root planing vs surgery vs “just brushing harder”",
              body: [
                "Brushing harder is the comparison people rarely say out loud, so it deserves the first answer. Brushing and flossing control plaque, the soft film that forms every day. Once plaque has hardened into tartar below the gumline, a brush does not reach it — and removing it is exactly what scaling is. The American Dental Association defines scaling and root planing as a deep cleaning below the gumline used to treat gum disease, needed when the pockets between gums and teeth have become too deep (ADA MouthHealthy). Better brushing is essential after treatment; it is not a substitute for it.",
                "Scaling and root planing is the first-line treatment for periodontitis, and for most people it is the only one they need. The AAP puts it directly: many patients do not require additional treatment after scaling and root planing, although the majority will need ongoing maintenance to keep their gums healthy (American Academy of Periodontology). It is non-surgical, done under local anesthetic, and it treats the cause — bacteria and tartar on the root — rather than the symptom.",
                "Surgery is for pockets that stay deep after a proper deep cleaning and a fair chance to heal. It reduces pocket depth so the teeth can be kept clean, and it is a bigger undertaking. The order matters: a deep cleaning first, measurement, then surgery only if the measurements say so. We do not skip to surgery — and skipping the deep cleaning in favor of brushing harder is how a manageable case becomes an advanced one.",
              ],
            },
            {
              title: "What the timeline looks like from your first visit",
              body: [
                "For moderate to advanced periodontitis, active treatment usually runs four to eight weeks. The deep cleaning is done a quadrant at a time, typically across two visits about two weeks apart — half the mouth at each, so you always have a comfortable side to chew on. Milder cases can sometimes be finished in one or two visits; the most extensive are split across four. A re-evaluation follows at four to six weeks, when we measure every pocket again.",
                "Expect the treated side to be sore for a day or two, and the teeth to be sensitive for up to a week; the gums may be swollen, tender and bleed a little while they heal (ADA MouthHealthy). If a pocket needs extra help, medication can be placed directly into it (ADA MouthHealthy). Only the treated area is numbed, so you can drive yourself back up to Berkeley.",
                "At the re-evaluation, healed pockets mean you move to maintenance. Pockets that are unchanged or deeper mean more treatment, which is the conversation described above — and it is a conversation, not a surprise.",
              ],
            },
            {
              title: "Living with treated gums: maintenance and home care",
              body: [
                "Once the disease is under control, the job becomes keeping it there. Periodontitis is managed rather than cured, so after active treatment you move to maintenance cleanings — about every three months rather than every six — where the pockets are measured again and tartar is removed from above and below the gumline before it can re-establish the infection. The AAP is candid that the majority of patients need this ongoing maintenance to sustain periodontal health (American Academy of Periodontology); so are we. Skipping it is what allows the disease to come back.",
                "Home care is the other half. We will go through the daily habits that matter for your mouth specifically, and may recommend an electric toothbrush or a medicated rinse. None of it is complicated; all of it has to happen every day. For a Berkeley patient, the practical rhythm is one visit a season — a nine-to-fifteen-minute drive, four times a year.",
              ],
            },
            {
              title: "Getting here from Berkeley",
              body: [
                "Our office is at 1331 Grand Avenue, Piedmont, CA 94610, in a two-storey building: the practice is on the upper level and the parking entrance sits below it. We share the address with The Oldershaw Clinic — look for our sign on the railing — and a planted walkway leads from the parking area to the front door.",
              ],
              bullets: [
                "Driving from the Berkeley side: Elmwood (College & Ashby) about 2.8 miles, nine minutes; Ashby BART about 3.3 miles, nine minutes; Claremont (Ashby & Domingo) about 3.6 miles, eleven minutes; Downtown Berkeley BART about 4.3 miles and UC Berkeley about 4.4 miles, thirteen minutes; North Berkeley (Shattuck & Vine) about 4.9 miles, fifteen minutes — all without traffic.",
                "Parking: street parking is generally available on Grand Avenue near our entrance.",
                "By bus: AC Transit's Line 88 runs from Downtown Berkeley via University Avenue, Sacramento Street, Market Street and Downtown Oakland to Highland Avenue & Highland Way in Piedmont, about a mile from the office. Line 12 from Gilman & 6th runs via MLK Jr Way, Temescal and Piedmont Avenue onto Grand Avenue and stops at Grand & Euclid, about three-quarters of a mile below us; it does not climb into Piedmont.",
                "By BART: Ashby and Downtown Berkeley are the Berkeley stations; from either, the office is a short drive.",
              ],
            },
            {
              title: "Cost and coverage, without the runaround",
              body: [
                "We do not quote gum disease treatment over the phone or on a web page, because the honest number depends on how many quadrants need a deep cleaning and what the measurements show. What we can give you is the market picture, clearly labeled. Delta Dental puts scaling and root planing at roughly $180 to $295 per quadrant without insurance, a periodontal maintenance visit at $140 to $220, and a standard cleaning at $85 to $160 (Delta Dental). CareCredit's 2024 national research puts the same deep cleaning higher, averaging $242 per quadrant across a $185 to $444 range (CareCredit) — quoted ranges differ that much between surveys. Those are national ranges, and they vary by region and by case.",
                "Coverage works differently from a routine cleaning because the deep cleaning treats an active disease. Delta Dental says most of its plans cover all or part of the cost of specialized cleanings such as scaling and root planing (Delta Dental) — but the share and the yearly limit are set by your plan, so bring your card to the consultation. You get a complete written plan with costs after the exam, never a number over the phone, and financing, including CareCredit, is available for anything beyond what insurance covers.",
              ],
            },
          ]}
          faqs={[
            {
              q: "Do you treat gum disease for patients from Berkeley?",
              a: "Yes — Berkeley is a few minutes north of us. Our office is on Grand Avenue in Piedmont, about 2.8 miles from Elmwood and 4.3 miles from Downtown Berkeley BART, nine to thirteen minutes by car without traffic. Dr. Martenson and Dr. Ma treat gum disease at every stage, from gingivitis to the maintenance that follows a deep cleaning.",
            },
            {
              q: "How far is the office from Elmwood, Claremont and Downtown Berkeley?",
              a: "About 2.8 miles from Elmwood (College & Ashby), 3.6 miles from Claremont (Ashby & Domingo) and 4.3 miles from Downtown Berkeley BART — roughly nine, eleven and thirteen minutes by car without traffic. North Berkeley, at Shattuck & Vine, is about 4.9 miles and fifteen minutes.",
            },
            {
              q: "Can I get to the office from Berkeley without a car?",
              a: "Yes, with about a mile on foot at the end. AC Transit's Line 88 runs from Downtown Berkeley through Downtown Oakland to Highland Avenue & Highland Way in Piedmont, about a mile from the office. Line 12 stops at Grand & Euclid, about three-quarters of a mile below us, and does not climb into Piedmont. Ashby BART is about 3.3 miles away — a short drive.",
            },
            {
              q: "How many trips from Berkeley will gum disease treatment take?",
              a: "For gingivitis, one or two regular cleanings. For periodontitis, typically the exam, two deep-cleaning visits about two weeks apart and a re-evaluation at four to six weeks — four or five trips over about two months — then a maintenance visit roughly every three months. At nine to fifteen minutes each way, that is a manageable rhythm from anywhere in Berkeley.",
            },
            {
              q: "Is there parking at the office?",
              a: "Street parking is generally available on Grand Avenue near our entrance at 1331 Grand Avenue. The parking entrance is below the building; follow the planted walkway from the parking area to the front door on the upper level, and look for our sign on the railing — we share the address with The Oldershaw Clinic.",
            },
            {
              q: "Does scaling and root planing hurt?",
              a: "The area is numbed with a local anesthetic, so the cleaning itself is comfortable. Afterwards, expect soreness for a day or two and sensitivity for up to a week; the gums may be swollen and bleed a little as they heal (ADA MouthHealthy). Only the treated side is numbed, so you can drive yourself home to Berkeley.",
            },
            {
              q: "Can gum disease be reversed?",
              a: "Gingivitis — inflammation with no bone loss — yes. The American Academy of Periodontology describes it as reversible with professional treatment and good home care. Periodontitis, where bone has been lost, can be stopped and managed but not reversed, which is why treatment ends in maintenance rather than a discharge.",
            },
            {
              q: "What if my gums don't heal after the deep cleaning?",
              a: "At the re-evaluation we measure every pocket again. If some have not healed, repeating the deep cleaning is not the answer; periodontal surgery to reduce the pocket depth may be, and it is done here by Dr. Cangini, our in-house board-certified periodontist. The AAP says the same: gum surgery may be recommended when non-surgical treatment does not get the gums healthy (American Academy of Periodontology).",
            },
            {
              q: "How much does gum disease treatment cost in Berkeley?",
              a: "It depends on how many quadrants need a deep cleaning, so we quote in writing after the exam, never over the phone. As a market picture, Delta Dental puts scaling and root planing at about $180–$295 per quadrant without insurance and a maintenance visit at $140–$220 (Delta Dental). Delta Dental says most of its plans cover all or part of a specialized cleaning; financing, including CareCredit, is available for the rest.",
            },
            {
              q: "Will I need treatment for the rest of my life?",
              a: "You will need maintenance, not repeated treatment. Periodontitis is managed rather than cured, so after the deep cleaning you move to maintenance cleanings about every three months, where the pockets are measured and tartar is removed before the infection can re-establish. The AAP notes that the majority of patients need this ongoing maintenance to sustain periodontal health (American Academy of Periodontology). Skipping it is what lets the disease return.",
            },
          ]}
          sources={[
            {
              label: "American Academy of Periodontology — Gum Disease Information",
              href: "https://www.perio.org/for-patients/gum-disease-information/",
            },
            {
              label: "American Academy of Periodontology — Non-Surgical Treatments",
              href: "https://www.perio.org/for-patients/periodontal-treatments-and-procedures/non-surgical-treatments/",
            },
            {
              label: "Centers for Disease Control and Prevention — Gum Disease Fast Facts",
              href: "https://www.cdc.gov/oral-health/data-research/facts-stats/fast-facts-gum-disease.html",
            },
            {
              label: "American Dental Association, MouthHealthy — Scaling and Root Planing",
              href: "https://www.mouthhealthy.org/all-topics-a-z/scaling-and-root-planing",
            },
            {
              label: "Delta Dental — Understanding dental cleaning costs and insurance coverage",
              href: "https://www.deltadental.com/protect-my-smile/procedures/dental-cleanings/cost-and-insurance-coverage/",
            },
            {
              label:
                "CareCredit — Scaling and root planing cost guide (ASQ360° national research, 2024)",
              href: "https://www.carecredit.com/well-u/health-wellness/scaling-and-root-planing-cost-financing/",
            },
          ]}
          featuredImage="/img/lIVE Piedmont website images/periodental treatment .png"
          featuredAlt="Gum Disease Treatment — Piedmont Dental By Design, serving Berkeley"
        />
        <AwardsStrip />
        <AboutCTA />
      </main>
      <SiteFooter />
    </>
  );
}
