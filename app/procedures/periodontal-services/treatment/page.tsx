import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import ProcedureDetail from "@/components/ProcedureDetail";
import AwardsStrip from "@/components/AwardsStrip";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";
import { getCategory } from "@/lib/procedure-categories";

export const metadata: Metadata = {
  title:
    "Periodontal Treatment in Piedmont, CA",
  description:
    "Periodontal treatment matched to your stage — from regular cleanings for gingivitis to scaling, root planing, and surgical care for advanced gum disease.",
  alternates: { canonical: "/procedures/periodontal-services/treatment" },
  openGraph: {
    title: "Periodontal Treatment — Piedmont Dental By Design",
    description:
      "Stage-appropriate care for gum disease — cleanings, scaling and root planing, or surgery.",
    url: "https://piedmontdentalbydesign.com/procedures/periodontal-services/treatment",
    type: "article",
  },
};

const category = getCategory("periodontal-services");

export default function TreatmentPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="treatment"
          title="Periodontal Treatment"
          tagline="Stage-appropriate care — from cleanings to deep cleanings to surgery."
          featuredImage="/img/lIVE Piedmont website images/Periodontal-Services-1024x683-1.jpg"
          intro={[
            "Periodontal treatment methods depend upon the type and severity of the disease. Your dentist and dental hygienist will evaluate for periodontal disease and recommend the appropriate treatment.",
            "Periodontal disease progresses as the sulcus (pocket) between the tooth and gums fills with bacteria, plaque, and tartar — irritating surrounding tissue. Left unchecked, these irritants can damage gums and the bone that supports your teeth.",
          ]}
          stats={[
            { value: "1–2", label: "Cleanings if caught early" },
            { value: "Quadrant", label: "Scaling done one at a time" },
            { value: "Numbed", label: "Comfort during deep cleaning" },
            { value: "Custom", label: "Plan matched to your stage" },
          ]}
          sections={[
            {
              title: "Early-stage gingivitis",
              body: [
                "If the disease is caught in the early stages of gingivitis and no permanent damage has been done, one to two regular cleanings will be recommended. We'll also give you instructions on improving daily oral hygiene habits and the cadence of your regular cleanings.",
              ],
            },
            {
              title: "Scaling and root planing (deep cleaning)",
              body: [
                "If the disease has progressed to more advanced stages, a special periodontal cleaning called scaling and root planing — a deep cleaning — will be recommended. It is usually done one quadrant of the mouth at a time while the area is numb.",
                "In this procedure, tartar, plaque, and toxins are removed from above and below the gum line (scaling), and rough spots on root surfaces are made smooth (planing). This helps gum tissue heal and pockets shrink. Medications, special medicated mouth rinses, and an electric toothbrush may be recommended to help control infection and support healing.",
              ],
            },
            {
              title: "When pockets don't heal",
              body: [
                "If the pockets do not heal after scaling and root planing, periodontal surgery may be needed to reduce pocket depths — making teeth easier to clean and slowing further disease. We may also refer you to a periodontist (a specialist of the gums and supporting bone) for advanced surgical care.",
              ],
            },
          ]}
          faqs={[
            {
              q: "How do you determine which periodontal treatment I need?",
              a: "We measure pocket depth at every tooth (1–3mm is healthy, 4mm is borderline, 5mm+ requires treatment), check for bleeding, look at recession, and review X-rays for bone loss. The combination tells us your disease stage — gingivitis (early, reversible), mild/moderate periodontitis, or advanced periodontitis. Treatment is matched to stage.",
            },
            {
              q: "Can early gum disease be reversed?",
              a: "Yes — gingivitis (the earliest stage, with red/swollen gums but no bone loss yet) is fully reversible with 1–2 regular cleanings, improved home care, and possibly an antimicrobial rinse. Once disease progresses to periodontitis (bone loss has occurred), it can be stopped and managed but not fully reversed.",
            },
            {
              q: "What does 'stage' mean in periodontal disease?",
              a: "Stages describe how advanced the disease is: Stage I is the mildest (1–2mm bone loss), Stage IV is the most severe (>5mm bone loss with potential tooth mobility). We also describe disease as gingivitis (just gum inflammation, no bone involvement) or periodontitis (bone loss has started). Treatment intensity scales with stage.",
            },
            {
              q: "Why is scaling and root planing done one quadrant at a time?",
              a: "Two reasons: it lets us be thorough and not rush, and it gives you a 'good side' of the mouth to chew and rest with while the other heals. The split-mouth approach is the standard of care for moderate-to-advanced cases. Mild cases can sometimes be done in 1–2 visits.",
            },
            {
              q: "When would I need a periodontist (specialist)?",
              a: "We refer to Dr. Cangini (our in-house board-certified periodontist) for surgical cases: pocket reduction surgery, bone regeneration, gum or bone grafting, and complex implant placement. Most early- and moderate-stage cases we treat in-house with the general dentist and hygienist.",
            },
            {
              q: "How long does periodontal treatment take?",
              a: "Active treatment for moderate-to-severe disease is typically 4–8 weeks (2 deep-cleaning visits about 2 weeks apart, then a re-evaluation visit at 4–6 weeks). After active treatment, you move into the ongoing maintenance phase (quarterly visits) for life. The whole cycle gets the disease under control; maintenance keeps it controlled.",
            },
            {
              q: "What's the success rate of non-surgical periodontal treatment?",
              a: "For mild-to-moderate periodontitis, scaling and root planing combined with consistent home care and quarterly maintenance has an 80%+ success rate at keeping disease stable long-term. Severe cases (deep pockets, significant bone loss) often require surgical care for the best outcome.",
            },
            {
              q: "Will I need ongoing treatment for the rest of my life?",
              a: "Yes — periodontal disease is managed, not cured. Once you've had it, you'll need quarterly maintenance visits indefinitely to prevent recurrence. The good news: with consistent maintenance, the vast majority of patients keep their teeth for life. Skipping maintenance is what allows the disease to come back.",
            },
          ]}
        />
        <AwardsStrip />
        <AboutCTA />
      </main>
      <SiteFooter />
    </>
  );
}
