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
    "Surgical Crown Lengthening in Piedmont, CA",
  description:
    "Surgical crown lengthening reshapes the gumline to expose more tooth — ideal for short teeth or gummy smiles. Often paired with veneers for proportion.",
  alternates: { canonical: "/procedures/cosmetic-dentistry/surgery" },
  openGraph: {
    title: "Cosmetic Surgery — Piedmont Dental By Design",
    description:
      "Surgical crown lengthening to reshape the gumline. Local anesthetic, optional nitrous, often paired with veneers.",
    url: "https://piedmontdentalbydesign.com/procedures/cosmetic-dentistry/surgery",
    type: "article",
  },
};

const category = getCategory("cosmetic-dentistry");

export default function SurgeryPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="surgery"
          title="Surgical Crown Lengthening"
          tagline="Reshape the gumline to expose more tooth — often paired with veneers."
          featuredImage="/img/lIVE Piedmont website images/Fusion-Dental-Care-Raleigh-NC-Oral-Surgery-1596x1024-1.jpeg"
          intro={[
            "Surgical crown lengthening is a surgical technique that raises the gums, exposing more of the teeth. It is most commonly used cosmetically when teeth appear short or when the gum line shows too much during smiling — sometimes called a 'gummy smile.'",
            "The procedure is performed in our office with local numbing of the area. Nitrous oxide is often used for added comfort. Surgical crown lengthening is frequently combined with porcelain veneers to create the most pleasing final tooth shape and proportion.",
          ]}
          stats={[
            { value: "In-office", label: "Performed at the practice" },
            { value: "Local", label: "Numbing + optional nitrous" },
            { value: "Combined", label: "Often paired with veneers" },
            { value: "Cosmetic", label: "Reshape gum proportion" },
          ]}
          sections={[
            {
              title: "Reasons for surgical crown lengthening",
              bullets: [
                "Cosmetically, to create a pleasing smile where the teeth and gum display are in better proportions.",
                "Short teeth.",
                "\"Gummy\" smiles where excess gum tissue makes teeth appear smaller.",
              ],
            },
            {
              title: "What does surgical crown lengthening involve?",
              body: [
                "The surgery is done in our office with local numbing of the area. Nitrous oxide is often used for additional patient comfort.",
                "Surgical crown lengthening involves making a small incision along the gumline, gently reflecting the gums, and suturing them farther away from the incisal edges of the teeth. The result is more tooth surface visible when you smile.",
                "Often, porcelain veneers are made afterwards to create a pleasing final shape and proportion of the teeth — the two procedures together produce a balanced result that neither could achieve alone.",
              ],
            },
          ]}
          faqs={[
            {
              q: "What is a 'gummy smile'?",
              a: "A gummy smile is when more than about 2mm of gum tissue shows above your upper teeth when you smile widely. The teeth themselves can look short or square. Causes include excess gum tissue covering the teeth (most common), shorter-than-average teeth, or an over-active upper lip. Surgical crown lengthening addresses the gum-tissue cause.",
            },
            {
              q: "Will the surgery hurt?",
              a: "The procedure itself is done with local anesthesia and is comfortable — most patients say it's similar to a deep cleaning. Many opt for nitrous oxide for added relaxation. After the anesthetic wears off, mild soreness for 2–3 days is typical and managed with over-the-counter pain relief.",
            },
            {
              q: "How long is the recovery from crown lengthening?",
              a: "Most patients return to normal activities the next day. Mild swelling and tenderness for 3–5 days is typical. Full gum healing takes 2–3 months — during that time the gumline gradually settles into its final position. If we're pairing with veneers, those are typically placed about 8–12 weeks after the surgery.",
            },
            {
              q: "Why is crown lengthening often paired with veneers?",
              a: "The two procedures complement each other: crown lengthening exposes more tooth structure (so you have more 'canvas'), and veneers refine the shape and color of that newly exposed tooth. Doing one without the other can leave a result that's either too short (gummy smile + veneers alone) or unbalanced (longer teeth that still look stained or chipped). Together they produce a balanced smile design.",
            },
            {
              q: "Will my gums grow back to where they were?",
              a: "When done properly, no — the procedure reshapes both gum tissue and a small amount of underlying bone, which establishes a stable new gumline. The 2–3 months of healing is your tissue settling into its permanent position. Gums don't 'creep back' unless there's an underlying issue.",
            },
            {
              q: "Is crown lengthening covered by insurance?",
              a: "Cosmetic crown lengthening (to fix a gummy smile) is typically not covered by dental insurance. Functional crown lengthening (to expose more tooth so a new crown can be placed safely) is often covered. We'll verify your benefits ahead of time and let you know your out-of-pocket cost.",
            },
            {
              q: "Can crown lengthening fix uneven gumlines?",
              a: "Yes — that's one of its most common uses. We can reshape the gumline of a single tooth or recontour across multiple teeth to create a symmetrical, balanced smile line. This is often combined with veneers for the most polished final result.",
            },
            {
              q: "How is surgical crown lengthening different from simple gum contouring?",
              a: "Gum contouring (sometimes called gum reshaping with a laser) removes only soft tissue and is reversible — gums can re-cover the tooth over time. Surgical crown lengthening reshapes both gum tissue and a small amount of bone, which makes the change permanent. The right procedure depends on how much exposure you need and how the tooth meets the bone.",
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
