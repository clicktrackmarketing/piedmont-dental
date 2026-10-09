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
    "Crown Lengthening in Piedmont, CA",
  description:
    "Crown lengthening — reshape gum and bone to expose more tooth, correct 'gummy' smiles, prepare teeth for crowns, and restore aesthetics after gum disease.",
  alternates: {
    canonical: "/procedures/periodontal-services/crown-lengthening",
  },
  openGraph: {
    title: "Crown Lengthening — Piedmont Dental By Design",
    description:
      "Reshape gum and bone tissue — fix gummy smiles, prep for crowns, restore aesthetics.",
    url: "https://piedmontdentalbydesign.com/procedures/periodontal-services/crown-lengthening",
    type: "article",
  },
};

const category = getCategory("periodontal-services");

export default function CrownLengtheningPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="crown-lengthening"
          title="Crown Lengthening"
          tagline="Expose more tooth — for restorations, aesthetics, or to correct a 'gummy' smile."
          featuredImage="/img/lIVE Piedmont website images/gum-grafting.webp"
          intro={[
            "Crown lengthening is generally performed to improve the health of the gum tissue or to prepare the mouth for restorative or cosmetic procedures. It can also correct a 'gummy' smile, where teeth are covered with excess gum tissue.",
            "The procedure exposes more of the natural tooth by reshaping or recontouring bone and gum tissue. It can be performed on a single tooth, several teeth, or the entire gum line — exposing a more aesthetically pleasing smile.",
          ]}
          stats={[
            { value: "Local", label: "Anesthetic" },
            { value: "1 visit", label: "Procedure time" },
            { value: "2–3 mo", label: "Full healing" },
            { value: "Versatile", label: "Single tooth or full smile" },
          ]}
          sections={[
            {
              title: "Reasons for crown lengthening",
              body: [
                "Restoration of damaged teeth — periodontal disease, trauma, and decay can cause severe damage, including breakage beneath the gum line. Crown lengthening exposes the area for restoration.",
                "Cosmetic uses — extra gum tissue can make teeth look unnaturally short and can also increase susceptibility to periodontal infections. Removing excess gum tissue restores a balanced, healthy look.",
                "Dental crowns — crown lengthening provides more space between the supporting jawbone and dental crown, preventing the new crown from damaging gum tissues and bone.",
              ],
            },
            {
              title: "What crown lengthening involves",
              body: [
                "Crown lengthening is normally performed under local anesthetic. Time depends on how many teeth are involved and whether a small amount of bone needs to be removed along with soft tissue. Any existing dental crowns are removed prior to the procedure and replaced immediately afterward.",
                "Your dentist will make a series of small incisions around the soft tissue to separate the gums away from the teeth. Even when only one tooth needs reshaping, neighboring teeth are usually treated to provide a more even contour. Separating the gums provides access to the roots and the underlying bone.",
                "In some cases, removing a small amount of soft tissue provides enough exposure to place a crown. In others, a small amount of bone is removed using a combination of hand and rotary instruments. Teeth will look noticeably longer immediately after surgery because the gums have been repositioned.",
                "The surgical site is secured with an intraoral periodontal bandage to prevent infection. Pain medication and a chlorhexidine antimicrobial mouth rinse may be prescribed. The site is completely healed in approximately two to three months.",
              ],
            },
          ]}
          faqs={[
            {
              q: "What's the difference between crown lengthening and gum contouring?",
              a: "Gum contouring (or gum reshaping with a laser) removes only soft tissue and is reversible — gums can grow back over time. Crown lengthening reshapes both gum tissue and a small amount of underlying bone, which makes the change permanent. Contouring is for minor cosmetic adjustments; crown lengthening is needed when more substantial repositioning is required or when prepping for a crown.",
            },
            {
              q: "How long does it take for the gums to heal after crown lengthening?",
              a: "Initial soft-tissue healing happens in 10–14 days. Full healing — when the gumline has settled into its final position — takes 2–3 months. If we're planning veneers or new crowns on the treated teeth, we wait until full healing before placement so the final result matches the stable gumline.",
            },
            {
              q: "Is crown lengthening painful?",
              a: "The procedure is done with local anesthesia and is comfortable during. Postoperative soreness for 3–5 days is typical, well-managed with over-the-counter pain relief. The surgical site is protected with a periodontal bandage for the first week.",
            },
            {
              q: "Why is crown lengthening needed before a crown?",
              a: "A crown needs adequate tooth structure above the gumline to bond properly. If a tooth has broken near or below the gumline (from decay, fracture, or large old fillings), there's not enough exposed tooth for the crown to grip. Crown lengthening exposes the additional tooth needed, giving the new crown a stable, healthy foundation.",
            },
            {
              q: "Will my teeth look longer permanently after crown lengthening?",
              a: "Yes — that's the point. The newly exposed tooth surface is what gives you a balanced smile (cosmetic case) or a viable surface for a crown (restorative case). The gumline doesn't 'grow back' once both tissue and bone have been reshaped.",
            },
            {
              q: "Can crown lengthening fix a single tooth or do you do all of them?",
              a: "Both. For a single tooth needing a crown, we'll often shape just that area — though we may also touch up the neighboring 1–2 teeth so the gumline transitions smoothly. For a gummy smile correction, we'll work across the visible front teeth (usually 6–8) so the result is symmetrical.",
            },
            {
              q: "How is this different from cosmetic gum surgery on your cosmetic dentistry page?",
              a: "They're the same procedure, just listed in two contexts. The cosmetic dentistry page focuses on aesthetic gummy-smile correction; this periodontal page covers the full scope including restorative (prep-for-crown) and disease-related uses. The surgical technique is identical.",
            },
            {
              q: "Will insurance cover crown lengthening?",
              a: "If the procedure is functional (necessary to place a crown, or to treat damaged teeth), insurance typically covers a significant portion. If it's purely cosmetic (gummy smile correction without restorative need), most plans treat it as elective and don't cover. We verify your benefits before booking and give you a clear cost estimate.",
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
