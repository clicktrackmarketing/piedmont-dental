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
    "Bone Grafting in Piedmont, CA",
  description:
    "Dental bone grafting — replace lost bone tissue, prepare the jaw for implants, halt gum disease progression. Autogenous, allograft, xenograft options.",
  alternates: { canonical: "/procedures/periodontal-services/bone-grafting" },
  openGraph: {
    title: "Bone Grafting — Piedmont Dental By Design",
    description:
      "Replace lost bone tissue and create a stable foundation for dental implants.",
    url: "https://piedmontdentalbydesign.com/procedures/periodontal-services/bone-grafting",
    type: "article",
  },
};

const category = getCategory("periodontal-services");

export default function BoneGraftingPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="bone-grafting"
          title="Bone Grafting"
          tagline="Rebuild lost jawbone — for implants, gum disease control, and aesthetics."
          featuredImage="/img/lIVE Piedmont website images/bone grafting.png"
          intro={[
            "Periodontal disease is the leading cause of bone loss in the oral cavity, though there are others — ill-fitting dentures and facial trauma among them. Bone grafting is an excellent way to replace lost bone tissue and encourage natural bone growth, fulfilling a wide variety of functions.",
            "A bone graft may be required to create a stable base for dental implant placement, to halt the progression of gum disease, or to make a smile appear more aesthetically pleasing.",
          ]}
          stats={[
            { value: "Local", label: "Anesthetic for most cases" },
            { value: "3 sources", label: "Autogenous, allograft, xenograft" },
            { value: "10 days", label: "First follow-up" },
            { value: "Predictable", label: "Highly successful procedure" },
          ]}
          sections={[
            {
              title: "Types of dental bone grafts",
              body: [
                "Autogenous bone graft — bone is removed from elsewhere in the body and implanted in the mouth. Common donor sites include the chin and the posterior molar areas of the jaw. For larger amounts, the hip (iliac crest) or shin bone may be used.",
                "Allograft — donated human bone obtained from a tissue bank, processed and sterilized for safety. Synthetic (man-made) bone substitutes, called alloplasts, are another option.",
                "Xenograft — implantation of bovine (cow) bone. A xenograft is perfectly safe, has been used successfully for many years, and avoids the need for a secondary donor site.",
              ],
            },
            {
              title: "Reasons for bone grafting",
              bullets: [
                "Dental implants — implants need to be firmly anchored to the jawbone. If quality or quantity of bone is insufficient, grafting strengthens and thickens the implant site.",
                "Sinus lift — elevating the sinus membrane and grafting bone onto the sinus floor so implants can be securely placed.",
                "Ridge augmentation — bone ridges from trauma, injury, birth defects, or severe disease are filled in to create a uniform jawbone shape.",
                "Nerve repositioning — when the inferior alveolar nerve must be moved to allow implant placement, a bone graft may be required.",
              ],
            },
            {
              title: "What bone grafting involves",
              body: [
                "Bone grafting is a fairly simple procedure that can usually be performed under local anesthetic; if large amounts of bone need to be grafted, general anesthesia may be required.",
                "The grafting material is harvested or prepared, a small incision is made in the gum tissue, and the bone graft is gently placed at the affected site. Bone regeneration may be aided by membrane barriers (separating slower-growing bone from faster-growing gum tissue), tissue-stimulating proteins like Emdogain, or platelet-rich growth factors that stimulate denser bone in shorter time.",
                "The gum is sutured in place and a follow-up appointment is scheduled within 10 days to assess progress. Bone grafting is highly successful and creates an excellent foundation for further periodontal restoration.",
              ],
            },
          ]}
          faqs={[
            {
              q: "Why do I need a bone graft for a dental implant?",
              a: "Implants need to be anchored in healthy, dense jawbone. If you've been missing a tooth for a while, the bone in that area has likely shrunk — your jaw loses bone density without a tooth root to stimulate it. A bone graft rebuilds enough volume and density for the implant to integrate securely. Without sufficient bone, an implant can fail.",
            },
            {
              q: "Where does the bone for a graft come from?",
              a: "Three main sources: your own body (autogenous — usually from the chin, jaw, hip, or shin); a tissue bank (allograft — donated, processed human bone); or animal source (xenograft — typically bovine bone, processed to be inert). For most cases at our practice, an allograft or xenograft works well and avoids a second surgical site.",
            },
            {
              q: "Is bone grafting painful?",
              a: "The procedure itself is done under local anesthesia and is generally comfortable. Postoperative soreness for 3–5 days is typical and well-managed with over-the-counter pain relief. If we're harvesting from a second site (your own bone), there's some additional discomfort at the donor site — most patients describe it as similar to a bruise.",
            },
            {
              q: "How long does a bone graft take to heal?",
              a: "The initial soft-tissue healing happens in 2 weeks, but the graft itself integrates into your jawbone over 3–6 months. Implants typically can't be placed until integration is complete and confirmed by X-ray. We'll see you at 10 days, then again at 3 months and 6 months to monitor progress.",
            },
            {
              q: "Are cow-derived (xenograft) bone grafts safe?",
              a: "Yes — xenograft material is processed to remove all organic components, leaving only the mineral scaffolding. It's been used safely for decades and is one of the most common materials worldwide. There's no risk of disease transmission because the biological material is destroyed during processing.",
            },
            {
              q: "What is a sinus lift, and is it the same as bone grafting?",
              a: "A sinus lift is a specific type of bone grafting done in the upper jaw (premolar/molar region). When implants are planned in that area but the sinus floor is too close, we gently lift the sinus membrane and pack bone graft material beneath it. After healing, there's enough bone for safe implant placement. It's covered in detail on our sinus augmentation page.",
            },
            {
              q: "Will my body reject a bone graft?",
              a: "Bone grafts don't 'reject' the way an organ transplant might — the materials we use are inert mineral scaffolds, not living tissue. The graft fails only if it doesn't integrate properly (uncommon when placed by an experienced periodontist), if infection occurs, or if mechanical stress disturbs the site during healing.",
            },
            {
              q: "What happens if I skip the bone graft?",
              a: "If the implant site doesn't have enough bone, we have a few options: place a smaller-diameter or shorter implant (sometimes possible), use a different replacement option like a bridge or denture, or simply leave the gap. Forcing an implant into insufficient bone leads to early failure, so a graft is usually the right investment.",
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
