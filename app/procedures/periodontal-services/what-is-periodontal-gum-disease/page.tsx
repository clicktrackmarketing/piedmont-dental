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
    "What Is Periodontal (Gum) Disease?",
  description:
    "Periodontal disease is a 'silent' condition with subtle warning signs. Learn what to watch for and how we treat gum disease at every stage.",
  alternates: {
    canonical: "/procedures/periodontal-services/what-is-periodontal-gum-disease",
  },
  openGraph: {
    title: "Periodontal (Gum) Disease — Piedmont Dental By Design",
    description:
      "Warning signs of gum disease and how we treat it — non-surgical and surgical care.",
    url: "https://piedmontdentalbydesign.com/procedures/periodontal-services/what-is-periodontal-gum-disease",
    type: "article",
  },
};

const category = getCategory("periodontal-services");

export default function WhatIsPeriodontalDiseasePage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="what-is-periodontal-gum-disease"
          title="What Is Periodontal (Gum) Disease?"
          tagline="A 'silent' disease — warning signs are subtle, but the consequences aren't."
          featuredImage="/img/lIVE Piedmont website images/gum disease.png"
          intro={[
            "Periodontists are dentists with three additional years of specialized training in the prevention, diagnosis, and treatment of gum disease. Our periodontist, Dr. Filippo Cangini, works alongside our dentists to provide the full continuum of care.",
            "Gum disease is often described as a 'silent' disease because pain doesn't always accompany the warning signs. Recognizing them early is the most important thing you can do to protect your teeth.",
          ]}
          stats={[
            { value: "Silent", label: "Often progresses without pain" },
            { value: "Reversible", label: "When caught early (gingivitis)" },
            { value: "#1", label: "Cause of tooth loss in adults" },
            { value: "Treatable", label: "At every stage" },
          ]}
          sections={[
            {
              title: "Changes to your teeth, bite, or dental work",
              bullets: [
                "Loose or separating teeth.",
                "Changes in bite alignment.",
                "Bridges or partial dentures that no longer fit properly.",
                "Defective fillings.",
              ],
            },
            {
              title: "Changes to your gums",
              bullets: [
                "Recurring redness, puffiness, tenderness, or swelling.",
                "Bleeding while brushing, flossing, or eating hard foods.",
                "Gums pulling away (receding) from teeth.",
              ],
            },
            {
              title: "Bad breath, taste, or sores",
              bullets: [
                "Persistent bad breath.",
                "Persistent metallic taste.",
                "Pus between gums and teeth.",
                "Sores or irritations not improving within two weeks.",
              ],
            },
            {
              title: "How we treat gum disease",
              body: [
                "Treatment depends on the stage of infection and the extent of deterioration. After reviewing digital X-rays and performing a thorough exam, the periodontist discusses options — including procedure details, office visits required, post-treatment healing care, and long-term disease management.",
                "Non-surgical treatment is most often scaling and root planing — an under-the-gum procedure that removes plaque and tartar from tooth roots, eliminating harmful bacteria and irritants.",
                "Surgical treatments include pocket reduction (folding gum tissue back to smooth damaged bone and remove bacteria) and bone regeneration (using membranes, bone grafts, or tissue-stimulating proteins to encourage natural regeneration and reverse damage).",
              ],
            },
          ]}
          faqs={[
            {
              q: "What are the earliest warning signs of gum disease?",
              a: "Bleeding when you brush or floss, redness or puffiness at the gumline, bad breath that doesn't go away with brushing, and gums that look like they're pulling away from teeth. Most people notice these signs and assume they're normal — they aren't. Catching gum disease at this stage (gingivitis) means it's fully reversible.",
            },
            {
              q: "Why is gum disease called a 'silent' disease?",
              a: "Because it doesn't usually hurt until it's severe. Cavities cause toothache pretty quickly; gum disease can quietly destroy supporting bone for years with only subtle warning signs. The first time many patients notice anything wrong is when a tooth becomes loose — by then the disease has been progressing for a long time.",
            },
            {
              q: "Can gum disease cause me to lose my teeth?",
              a: "Yes — periodontal disease is the #1 cause of tooth loss in adults in the developed world, ahead of cavities. The disease destroys the bone and ligament that hold teeth in place. Once enough support is lost, teeth become loose and eventually fall out or need extraction. Catching it early prevents that outcome.",
            },
            {
              q: "Is gum disease linked to other health problems?",
              a: "Research has shown associations between chronic gum disease and heart disease, stroke, diabetes complications, lung infections (especially in older adults), and adverse pregnancy outcomes. The link is likely the inflammatory burden that chronic gum infection puts on the rest of the body. Treating gum disease is a quality-of-life and a general-health intervention.",
            },
            {
              q: "Can gum disease be cured?",
              a: "Gingivitis (the earliest stage) — yes, fully reversible. Periodontitis (the bone-loss stage) — no, it can be stopped and managed but the bone that's been lost doesn't regrow on its own. Treatment + ongoing maintenance keeps the disease in remission for life. The earlier we catch it, the better the long-term outcome.",
            },
            {
              q: "Is bleeding when I floss a sign of gum disease?",
              a: "Almost always, yes — bleeding gums indicate inflammation, which means bacterial plaque is sitting along or under the gumline. The fix is counterintuitive: floss more, not less. With consistent daily flossing for 1–2 weeks, healthy gums stop bleeding. If bleeding persists after 2 weeks of good home care, schedule an evaluation.",
            },
            {
              q: "What's the difference between gingivitis and periodontitis?",
              a: "Gingivitis is gum inflammation only — red, swollen, bleeding gums, but no permanent damage. Fully reversible with good home care. Periodontitis is the next stage: the inflammation has now caused bone loss around the tooth, creating periodontal pockets. Periodontitis can be stopped but not reversed; gingivitis can be.",
            },
            {
              q: "What causes gum disease in the first place?",
              a: "Bacterial plaque sitting along the gumline that isn't disrupted by daily brushing and flossing. Risk factors that make some people more susceptible: smoking (major), uncontrolled diabetes, genetic predisposition, hormonal changes (pregnancy, menopause), certain medications, and poor diet. Plaque is the cause; the risk factors determine how aggressively your body reacts to it.",
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
