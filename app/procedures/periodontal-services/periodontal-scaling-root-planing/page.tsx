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
    "Scaling & Root Planing in Piedmont, CA",
  description:
    "Periodontal scaling and root planing — non-surgical deep cleaning to halt gum disease, remove tartar from below the gumline, and promote root reattachment.",
  alternates: {
    canonical: "/procedures/periodontal-services/periodontal-scaling-root-planing",
  },
  openGraph: {
    title: "Scaling & Root Planing — Piedmont Dental By Design",
    description:
      "The foundational non-surgical treatment for gum disease — deep cleaning above and below the gumline.",
    url: "https://piedmontdentalbydesign.com/procedures/periodontal-services/periodontal-scaling-root-planing",
    type: "article",
  },
};

const category = getCategory("periodontal-services");

export default function ScalingRootPlaningPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="periodontal-scaling-root-planing"
          title="Periodontal Scaling & Root Planing"
          tagline="The foundational non-surgical treatment for gum disease."
          featuredImage="/img/lIVE Piedmont website images/periodental treatment .png"
          intro={[
            "The objective of scaling and root planing is to remove etiologic agents — primarily dental plaque and tartar (calculus) — that cause inflammation to gum tissue and surrounding bone.",
            "These non-surgical procedures completely cleanse the periodontium and work very effectively for individuals with gingivitis (mild gum inflammation) and moderate to severe periodontal disease.",
          ]}
          stats={[
            { value: "Non-surgical", label: "First line for periodontitis" },
            { value: "3 mm", label: "Threshold pocket depth" },
            { value: "Local", label: "Anesthetic if needed" },
            { value: "Antibiotics", label: "Often follow treatment" },
          ]}
          sections={[
            {
              title: "Reasons for scaling and root planing",
              body: [
                "Disease prevention — oral bacteria from periodontal infections can travel through the bloodstream to other parts of the body. Research has linked them to lung infections and heart disease. Scaling and root planing remove the bacteria and halt periodontal disease from progressing.",
                "Tooth protection — when gum pockets exceed 3mm in depth, there's a greater risk of periodontal disease. As pockets deepen, they house more bacteria. Eventually a chronic inflammatory response destroys gum and bone tissue. Periodontal disease is the number-one cause of tooth loss in the developed world.",
                "Aesthetic effects — scaling and root planing remove tartar and plaque from teeth and below the gumline. As an added bonus, superficial stains are also removed during the procedure.",
                "Better breath — halitosis is one of the most common signs of periodontal disease. Food particles and bacteria cause persistent bad odor — alleviated by deep cleaning.",
              ],
            },
            {
              title: "Scaling",
              body: [
                "Scaling is performed with special dental instruments and may include an ultrasonic scaling tool, which removes calculus and plaque from crown and root surfaces. In many cases the scaling tool includes an irrigation process that delivers an antimicrobial agent below the gums to help reduce bacteria.",
              ],
            },
            {
              title: "Root planing",
              body: [
                "Root planing removes cementum and surface dentin embedded with microorganisms, toxins, and tartar. The root of the tooth is literally smoothed to promote good healing. Clean, smooth root surfaces help prevent bacteria from easily colonizing in the future.",
                "Following these deep cleaning procedures, the gum pockets may be treated with antibiotics — soothing irritation and helping the gum tissues heal quickly. At your next appointment, the dentist or hygienist will examine the gums again to see how well the pockets have healed. If pockets still measure more than 3mm, additional treatment may be recommended.",
              ],
            },
          ]}
          faqs={[
            {
              q: "What's the difference between scaling and root planing?",
              a: "Scaling removes plaque, tartar, and toxins from the visible tooth surface and from below the gumline. Root planing smooths the rough surface of the tooth root itself, which removes bacterial pockets and makes it harder for bacteria to recolonize. They're typically done together as one combined procedure.",
            },
            {
              q: "Is scaling and root planing painful?",
              a: "We use local anesthesia in most cases so the procedure itself is comfortable. Some patients with mild disease can tolerate it with just topical numbing. After the anesthetic wears off, mild soreness and gum tenderness for 24–48 hours is typical and well-managed with over-the-counter pain relief.",
            },
            {
              q: "How long does a scaling and root planing appointment take?",
              a: "Most cases are split into 2 appointments (one half of the mouth at each), each lasting about 60–75 minutes. Spreading the work allows us to be thorough and gives one side of your mouth a break between visits. Severe cases may need 4 quarterly appointments.",
            },
            {
              q: "Will I need antibiotics after the procedure?",
              a: "Often, yes — either oral antibiotics for a few days, antibiotic-soaked medicated chips placed directly in the pockets, or both. The goal is to wipe out the bacterial colonies that the mechanical cleaning disrupted. Whether you need them depends on the severity of your disease and your medical history.",
            },
            {
              q: "How often do I need scaling and root planing?",
              a: "It's typically a one-time treatment for an active periodontal disease episode — done once to get the disease under control. Afterward, you transition to quarterly periodontal maintenance visits, which prevent recurrence. Some patients may need the deep cleaning repeated years later if disease flares back up.",
            },
            {
              q: "What's a 'pocket' and why does the depth matter?",
              a: "A pocket is the space between your tooth and the gum cuff around it. Healthy pockets measure 1–3mm. Pockets deeper than 4mm trap bacteria that you can't reach with brushing or floss. The deeper the pocket, the worse the disease — at 5mm we get worried, at 7+mm we may need surgical intervention. We measure every pocket at your initial perio exam.",
            },
            {
              q: "Does scaling and root planing reverse gum disease?",
              a: "It stops disease progression and shrinks inflamed gum tissue — pockets usually become 1–2mm shallower as gums tighten back around clean root surfaces. It doesn't regrow bone that's already been lost. With consistent quarterly maintenance, you can keep the disease in remission for life.",
            },
            {
              q: "Will my teeth be more sensitive after the procedure?",
              a: "Possibly — your root surfaces have been cleaned of the bacterial film that was insulating them, and gums may shrink back slightly as inflammation resolves. Temporary cold sensitivity for a few weeks is common. We can prescribe a desensitizing toothpaste if it's bothering you. Most patients find the sensitivity resolves as roots build up natural protective layers.",
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
