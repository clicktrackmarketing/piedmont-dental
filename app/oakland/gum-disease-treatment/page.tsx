import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import ProcedureDetail from "@/components/ProcedureDetail";
import AwardsStrip from "@/components/AwardsStrip";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";
import { getCategory } from "@/lib/procedure-categories";

// Month 2 city page — gum disease treatment × Oakland (run-plan #47/#48).
// Reuses the procedure template; every clinical line is grounded in the
// parent periodontal treatment page or a cited source listed at the foot of
// the page. Treatment is described as the practice's periodontal services —
// no named periodontist, no specialist claim (client gate #23).

export const metadata: Metadata = {
  title: "Gum Disease Treatment for Oakland Patients",
  description:
    "Gum disease treatment for Oakland adults — from cleanings to scaling and root planing — on Grand Avenue in Piedmont, 1.4 miles from Lake Merritt. Free consultation.",
  alternates: { canonical: "/oakland/gum-disease-treatment" },
  openGraph: {
    title: "Gum Disease Treatment for Oakland Patients — Piedmont Dental By Design",
    description:
      "Staged gum disease care for Oakland adults a few minutes up Grand Avenue: exam and pocket measurements, scaling and root planing, and periodontal maintenance under one roof.",
    url: "https://piedmontdentalbydesign.com/oakland/gum-disease-treatment",
    type: "article",
    images: ["/img/lIVE Piedmont website images/periodental treatment .png"],
  },
};

const category = getCategory("periodontal-services");

export default function OaklandGumDiseaseTreatmentPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="treatment"
          cityPage={{ href: "/oakland/gum-disease-treatment", city: "Oakland" }}
          title="Gum Disease Treatment for Oakland Patients"
          tagline="Staged care for Oakland adults — measured, treated and maintained a few minutes up Grand Avenue."
          intro={[
            "Gum disease treatment for adults across Oakland, matched to the stage you are actually at. Dr. Jill Martenson, Dr. David Ma and our hygiene team evaluate and treat gum disease from our Grand Avenue office in Piedmont — about 1.4 miles from Lake Merritt, and roughly a seven-minute drive from Rockridge BART or Montclair Village without traffic.",
            "The Oakland city line is a few blocks from our door, and Grand Avenue runs straight up from the lake to reach it, so Lake Merritt, Rockridge and Montclair patients are with us in minutes. Gum disease is often silent, meaning symptoms may not appear until the advanced stages (American Academy of Periodontology), which is why we measure for it at every exam rather than waiting for something to hurt. This page covers how we stage and treat it, who needs a deep cleaning and who only needs a regular one, what surgery is for, what the first two months look like, and how to get here from Oakland.",
          ]}
          stats={[
            { value: "1.4 mi", label: "From Lake Merritt" },
            { value: "~7 min", label: "From Rockridge BART or Montclair" },
            { value: "1–3 mm", label: "Healthy pocket depth" },
            { value: "Quadrant", label: "Deep cleaning, one section at a time" },
          ]}
          sections={[
            {
              title: "Why Oakland patients bring their gums to a Piedmont office",
              body: [
                "Gum disease is not a one-visit problem. Once it has moved past gingivitis it is managed rather than cured, and the pocket measurements we take this year only mean something if the same people compare them with last year's. Here that is one of the two co-owners, Dr. Jill Martenson or Dr. David Ma, working with the same hygiene team — not whoever happens to be on the schedule. For a condition you will be watching for years, that continuity is worth the extra few minutes up the hill.",
                "The other reason is that we are barely outside Oakland at all. Our office is at 1331 Grand Avenue in Piedmont, the small city that Oakland wraps around, and the city line is a few blocks away. Grand Avenue runs from Lake Merritt straight to our door, about 1.4 miles. Rockridge BART is about 2.6 miles and Montclair Village about 3.1 miles, each roughly a seven-minute drive without traffic. MacArthur BART is a short drive.",
                "The evaluation, digital and panoramic X-rays, pocket measurements, cleanings, scaling and root planing and the maintenance visits that follow all happen here, so you are not sent across town for the next step. That includes surgery: if it is needed, it is done here by Dr. Filippo Cangini, our in-house board-certified periodontist.",
              ],
            },
            {
              title: "How gum disease treatment works here",
              body: [
                "Treatment depends on the type and severity of the disease, so the first visit is about measuring, not selling. Plaque that is not removed spreads below the gum line, and the toxins its bacteria produce irritate the gums and set off a chronic inflammatory response (American Academy of Periodontology). The pocket between tooth and gum fills with bacteria, plaque and tartar, and the bone supporting the tooth begins to go. So your dentist and hygienist measure that pocket at every tooth — one to three millimeters is healthy, four is borderline, five or more needs treatment — check for bleeding and recession, and review your X-rays for bone loss. Together those findings give you a stage, and the stage decides the treatment:",
              ],
              bullets: [
                "Gingivitis, with no permanent damage yet: one or two regular cleanings plus specific instruction on daily brushing and flossing and how often to come back. At this stage the disease is reversible with professional treatment and good at-home care (American Academy of Periodontology).",
                "Periodontitis: scaling and root planing, the deep cleaning. Tartar, plaque and bacterial toxins are removed from above and below the gum line (scaling) and rough spots on the root surfaces are smoothed (planing) so the gum tissue can heal and the pockets shrink. It is usually done one quadrant of the mouth at a time while the area is numb.",
                "Support for healing: depending on your case, a medication, a medicated mouth rinse or an electric toothbrush may be recommended to help control the infection while the gums recover.",
                "Pockets that do not heal: periodontal surgery may then be needed to reduce them, which makes the teeth easier to keep clean and slows the disease. If you need periodontal surgery, it is done here by Dr. Filippo Cangini, our in-house board-certified periodontist.",
              ],
            },
            {
              title: "The warning signs Oakland patients bring to us",
              body: [
                "Because the disease is so often silent, the signs that do show are easy to write off as normal. The American Academy of Periodontology and the CDC list the ones below. If you recognize any of them, book an evaluation — it is complimentary, and the measurements settle the question either way.",
              ],
              bullets: [
                "Gums that are red, swollen or tender.",
                "Bleeding while brushing, flossing or eating hard food.",
                "Gums that are receding or pulling away from the teeth, so the teeth look longer than they used to.",
                "Persistent bad breath, or a persistent metallic taste.",
                "Loose or separating teeth, a change in the way your teeth meet when you bite, or a partial denture that no longer fits.",
                "Pain when chewing.",
                "Pus between the gums and teeth, or a sore in the mouth that has not healed within two weeks.",
              ],
            },
            {
              title: "Who gum disease treatment is for",
              body: [
                "More people than expect it. More than four in ten US adults aged 30 and over — 42 percent — have periodontitis, and about 8 percent have severe periodontitis (CDC). The CDC's advice is that a dental check-up at least yearly allows early detection and treatment, which is the quiet argument for keeping regular exams even when nothing hurts.",
                "Some Oakland adults carry more risk than others. Smoking, diabetes, some medications, stress, genetics, crowded teeth, hormonal changes and poor nutrition all raise the odds of gum disease (CDC), and smoking is first on that list. None of these change whether we will see you; they change how closely we watch you and how we plan your maintenance.",
                "Treatment is also for people who have had periodontitis before. Bone that has been lost does not grow back on its own, so the disease is stopped and managed rather than reversed — and those patients need periodontal maintenance, not a standard six-monthly cleaning. More on that below.",
              ],
            },
            {
              title: "When we'll tell you it isn't the answer",
              body: [
                "A deep cleaning is not a better cleaning; it is a treatment for a specific stage. If your measurements show gingivitis and no bone loss, we will recommend regular cleanings and better home care, not scaling and root planing, because at that stage the disease is reversible without it (American Academy of Periodontology).",
                "Much of what you will read about gum disease treatment in Oakland features lasers and prescription trays. The American Academy of Periodontology's position is that controlled studies have found similar results with laser treatment compared with other non-surgical options, including scaling and root planing alone — and that the FDA clearance process did not determine that any medication delivered through a tray system has been proven a safe or effective way to treat gum disease. Neither is a shortcut past the deep cleaning.",
                "And when the pockets do not heal after scaling and root planing, we say so. That is the point at which periodontal surgery enters the conversation, and it is carried out here by Dr. Cangini, our in-house board-certified periodontist.",
              ],
            },
            {
              title: "Scaling and root planing vs surgery vs “just brushing harder”",
              body: [
                "Brushing harder. Daily brushing and flossing are half of the cure for gingivitis, alongside professional treatment (American Academy of Periodontology), but they can do nothing about tartar: once plaque has hardened, it cannot be removed with a toothbrush and professional treatment is needed (CDC). Below the gum line, that removal is exactly what scaling is.",
                "Scaling and root planing. This is the first-line, non-surgical treatment for periodontitis. The American Academy of Periodontology's summary is worth quoting: “Many patients do not require additional treatment after scaling and root planing. However, the majority of patients will require ongoing maintenance therapy to sustain periodontal health.” For most people the deep cleaning is the treatment; the maintenance visits are what make it hold.",
                "Surgery. When pockets stay deep after the deep cleaning, surgery reduces them so the teeth can be kept clean and the disease slowed — by folding the gum back to clean the root and bone, or by using membranes, bone grafts or tissue-stimulating proteins to encourage regeneration. It answers what the re-evaluation shows; it is not a starting point.",
              ],
            },
            {
              title: "What the timeline looks like",
              body: [
                "For gingivitis: one or two regular cleanings and a home-care plan, then a check that the bleeding has stopped.",
                "For periodontitis: the deep cleaning is usually split into two visits about two weeks apart, one side of the mouth at a time, so we can be thorough and you always have a comfortable side to chew on. Milder cases can sometimes be finished in one or two visits. Four to six weeks after the last one you come back for a re-evaluation, where every pocket is measured again to see how far it has shrunk. Active treatment for moderate-to-severe disease therefore typically runs four to eight weeks.",
                "After that you move into maintenance: cleanings about four times a year, with pocket depths re-checked at each visit, continuing indefinitely. The active phase gets the disease under control; maintenance keeps it there.",
              ],
            },
            {
              title: "Living with treated gum disease",
              body: [
                "The work between visits is yours, and it is not complicated: brush twice a day, floss daily, and use whatever we recommended for your case — an electric toothbrush, a medicated rinse or a prescribed medication. The CDC puts daily brushing and flossing, regular professional cleanings and at least yearly check-ups at the center of prevention, and that does not change after treatment. Bleeding that continues after two weeks of consistent flossing is a reason to call us, not a reason to floss less.",
                "Keep the maintenance visits. The American Academy of Periodontology's position is that most patients need ongoing maintenance therapy after scaling and root planing, and skipping visits is what allows the disease to come back. Four short trips a year from Lake Merritt, Rockridge or Montclair is a small price; a relapse means starting active treatment again.",
                "If you smoke, this is the moment to talk to your doctor about stopping — smoking is first on the CDC's list of risk factors for periodontal disease. We will not lecture you, but we will ask.",
              ],
            },
            {
              title: "Getting here from Oakland",
              body: [
                "We are at 1331 Grand Avenue, Piedmont, in a two-storey building: the practice is on the upper level and the parking entrance sits below it. We share the address with The Oldershaw Clinic, so look for our sign on the railing and follow the planted walkway from the parking area to the front door.",
              ],
              bullets: [
                "Driving: Grand Avenue runs from Lake Merritt to our door — about 1.4 miles, or six minutes without traffic. Rockridge BART is about 2.6 miles and Montclair Village about 3.1 miles, each around seven minutes. MacArthur BART is a short drive.",
                "Parking: street parking is generally available on Grand Avenue near the entrance.",
                "By bus: AC Transit's Line 12 runs up Grand Avenue from the lake and stops at Grand & Euclid, about three-quarters of a mile below the office; it does not climb into Piedmont. Line 88 ends at Highland Avenue and Highland Way in Piedmont, about a mile away.",
                "Planning ahead: periodontal patients come back about four times a year, so when we book the series it is worth choosing a time of day that fits your Oakland commute.",
              ],
            },
            {
              title: "Cost and coverage, without the runaround",
              body: [
                "What a deep cleaning costs depends on how many quadrants need it and how advanced the disease is, which is why no honest practice quotes it over the phone. For a sense of scale, CareCredit's 2024 national research puts the average cost of scaling and root planing at $242 per quadrant, with a range of about $185 to $444, and notes that dental insurance usually covers around 50 percent — sometimes only after the dentist documents why the procedure is necessary (CareCredit, December 2024). Delta Dental's own published range is lower, at $180 to $295 per quadrant without benefits, with a periodontal maintenance visit at $140 to $220 (Delta Dental) — a fair illustration of how widely quoted ranges differ. Those are national market figures, not our fees; costs vary by region, severity and the number of quadrants treated, and only an examination produces a real number.",
                "That documentation requirement is one reason we put the pocket measurements and X-rays on file before anything is scheduled. After the evaluation we check your plan and give you a written estimate, and financing through CareCredit is available for the part insurance does not cover. The consultation itself is complimentary.",
              ],
            },
          ]}
          faqs={[
            {
              q: "Do you see gum disease patients from Oakland?",
              a: "Yes — Oakland is next door, and the city line is a few blocks from our office on Grand Avenue in Piedmont. Lake Merritt is about 1.4 miles away; Rockridge BART and Montclair Village are roughly a seven-minute drive without traffic. Dr. Martenson, Dr. Ma and our hygiene team see adults from across Oakland for evaluation, deep cleaning and ongoing maintenance.",
            },
            {
              q: "How many visits will I make from Oakland?",
              a: "It depends on your stage. Gingivitis usually means one or two regular cleanings. Periodontitis usually means two deep-cleaning visits about two weeks apart, a re-evaluation four to six weeks later, and then maintenance visits about four times a year. Each trip is about six minutes from Lake Merritt or seven from Rockridge or Montclair without traffic.",
            },
            {
              q: "Is there parking at the office?",
              a: "Street parking is generally available on Grand Avenue near the entrance at 1331 Grand Avenue. The parking entrance is below the building, and a planted walkway leads from the parking area up to the front door on the upper level. Look for our sign on the railing — we share the address with The Oldershaw Clinic.",
            },
            {
              q: "Can I get there by bus or BART from Oakland?",
              a: "AC Transit's Line 12 runs along Grand Avenue and stops at Grand & Euclid, about three-quarters of a mile below the office; it does not come up into Piedmont. Line 88 ends at Highland Avenue and Highland Way in Piedmont, about a mile away. Rockridge and MacArthur are the nearest BART stations, each a short drive.",
            },
            {
              q: "Can gum disease be reversed?",
              a: "Gingivitis — the earliest stage, with red, swollen or bleeding gums but no bone loss — is reversible with professional treatment and good at-home care (American Academy of Periodontology). Periodontitis is different: the tissues and bone supporting the teeth have been damaged, and bone that has been lost does not grow back on its own. It can be stopped and managed, but not reversed, which is why maintenance matters so much.",
            },
            {
              q: "Does scaling and root planing hurt?",
              a: "The area is numbed before we start, and we work on one quadrant of the mouth at a time so you always have a comfortable side to chew on between visits. If anything is uncomfortable during the appointment, say so — the pace is ours to adjust.",
            },
            {
              q: "Is laser gum treatment better than a deep cleaning?",
              a: "Not on the evidence. The American Academy of Periodontology says controlled studies have found similar results with laser treatment compared with other non-surgical options, including scaling and root planing alone. Lasers can be used to treat gum disease, but the deep cleaning remains the first-line treatment, not something a laser lets you skip.",
            },
            {
              q: "Will I need gum surgery?",
              a: "Most patients do not. The American Academy of Periodontology's position is that many patients need no further treatment after scaling and root planing, though most need ongoing maintenance. Surgery comes into the conversation only when pockets have not healed at the re-evaluation, and if it is needed, it is done here by Dr. Cangini, our in-house board-certified periodontist.",
            },
            {
              q: "How much does gum disease treatment cost in Oakland?",
              a: "CareCredit's 2024 national research puts scaling and root planing at an average of $242 per quadrant, with a range of about $185 to $444, and says dental insurance usually covers around 50 percent (CareCredit, December 2024). Those are national market figures, not our fees. We give you a written estimate after the evaluation, once we know how many quadrants are involved, and CareCredit financing is available for anything insurance does not cover.",
            },
            {
              q: "Do I really need cleanings every three months afterwards?",
              a: "Yes. The American Academy of Periodontology says the majority of patients need ongoing maintenance therapy after scaling and root planing, and once gum disease has been present it is managed rather than cured. Maintenance visits about four times a year, with pocket depths checked each time, are what keep it that way; a six-monthly cleaning is for people who have never had it. Skipping visits is what allows the disease to return.",
            },
          ]}
          sources={[
            {
              label: "American Academy of Periodontology — Non-Surgical Treatments",
              href: "https://www.perio.org/for-patients/periodontal-treatments-and-procedures/non-surgical-treatments/",
            },
            {
              label: "American Academy of Periodontology — Gum Disease Information",
              href: "https://www.perio.org/for-patients/gum-disease-information/",
            },
            {
              label: "Centers for Disease Control and Prevention — Gum Disease Facts",
              href: "https://www.cdc.gov/oral-health/data-research/facts-stats/fast-facts-gum-disease.html",
            },
            {
              label: "Centers for Disease Control and Prevention — About Periodontal (Gum) Disease",
              href: "https://www.cdc.gov/oral-health/about/gum-periodontal-disease.html",
            },
            {
              label:
                "CareCredit — Scaling and Root Planing Cost, Insurance & Procedure Guide (6 December 2024)",
              href: "https://www.carecredit.com/well-u/health-wellness/scaling-and-root-planing-cost-financing/",
            },
            {
              label:
                "Delta Dental — Dental cleaning costs and insurance coverage (scaling and root planing, periodontal maintenance)",
              href: "https://www.deltadental.com/protect-my-smile/procedures/dental-cleanings/cost-and-insurance-coverage/",
            },
          ]}
          featuredImage="/img/lIVE Piedmont website images/periodental treatment .png"
          featuredAlt="Gum disease treatment — Piedmont Dental By Design, serving Oakland"
        />
        <AwardsStrip />
        <AboutCTA />
      </main>
      <SiteFooter />
    </>
  );
}
