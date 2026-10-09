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
    "Gum Grafting in Piedmont, CA",
  description:
    "Gum grafting — surgical correction of gum recession to cover exposed tooth roots, reduce sensitivity, improve appearance, and protect long-term gum health.",
  alternates: { canonical: "/procedures/periodontal-services/gum-grafting" },
  openGraph: {
    title: "Gum Grafting — Piedmont Dental By Design",
    description:
      "Surgical correction of gum recession — cover exposed roots, reduce sensitivity, improve aesthetics.",
    url: "https://piedmontdentalbydesign.com/procedures/periodontal-services/gum-grafting",
    type: "article",
  },
};

const category = getCategory("periodontal-services");

export default function GumGraftingPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="gum-grafting"
          title="Gum Grafting"
          tagline="Cover exposed tooth roots, reduce sensitivity, and protect against further recession."
          featuredImage="/img/lIVE Piedmont website images/63e2da680b885fcdefe302c1_Crown-Lengthening2-scaled.jpg"
          intro={[
            "A gum graft (also known as a gingival graft or periodontal plastic surgery) is the collective name for surgical procedures that aim to cover exposed tooth root surfaces with grafted oral tissue.",
            "Exposed tooth roots are usually the result of gingival recession from periodontal disease, but other common causes include overly aggressive brushing and trauma. Though the name might sound frightening, gum grafting is a common periodontal procedure with excellent results.",
          ]}
          stats={[
            { value: "Local", label: "Anesthetic only" },
            { value: "~6 weeks", label: "Full healing" },
            { value: "3 types", label: "Free, connective tissue, allograft" },
            { value: "Multi-benefit", label: "Sensitivity, aesthetics, health" },
          ]}
          sections={[
            {
              title: "Common types of gum grafts",
              body: [
                "Free gingival graft — often used to thicken gum tissue. A layer of tissue is removed from the palate and relocated to the area affected by gum recession. Both sites heal quickly without permanent damage.",
                "Subepithelial connective tissue graft — commonly used to cover exposed roots. Tissue is removed fairly painlessly from the outer layer of the palate and relocated to the site of gum recession.",
                "Acellular dermal matrix allograft — uses medically processed, donated human tissue as the graft source. The advantage is that no donor site from your palate is required, meaning less post-procedure discomfort.",
              ],
            },
            {
              title: "Reasons for gum grafting",
              bullets: [
                "Reduced sensitivity — gum grafting permanently covers exposed roots, helping reduce hot/cold discomfort and restoring gum health.",
                "Improved appearance — recession can make teeth look unnaturally long and the smile appear 'toothy.' Grafting restores symmetry and a balanced look.",
                "Improved gum health — periodontal disease can destroy gum tissue rapidly. Grafting halts tissue and bone loss and protects exposed roots from decay.",
              ],
            },
            {
              title: "What gum grafting involves",
              body: [
                "Once the need for gum grafting has been determined, the teeth are first thoroughly cleaned above and below the gum line to remove calculus and bacteria. We'll also share home-care guidance to reduce future susceptibility.",
                "The procedure itself is performed under local anesthetic. Small incisions create a pocket at the recipient site, the connective tissue graft is inserted between the layers of tissue, and sutures stabilize the graft to prevent shifting. Surgical dressing protects the area during the first week of healing.",
                "Uniformity and full healing of the gums is achieved in approximately six weeks.",
              ],
            },
          ]}
          faqs={[
            {
              q: "What causes gum recession in the first place?",
              a: "The two most common causes are periodontal disease (chronic gum infection breaking down tissue) and overly aggressive brushing with a hard-bristled brush. Other contributors include trauma, grinding or clenching (which puts unusual pressure on certain teeth), naturally thin tissue, and orthodontic movement. Identifying the cause is part of the treatment so it doesn't keep recurring.",
            },
            {
              q: "Is a gum graft painful?",
              a: "The procedure itself is done under local anesthesia and is comfortable during. Most discomfort comes from the donor site (your palate) if a free or connective tissue graft was used — feels like a pizza burn for about a week. If we use an allograft (donated tissue), there's no second site and discomfort is much milder. Most patients return to work the next day.",
            },
            {
              q: "How long does it take to heal after gum grafting?",
              a: "Initial soft-tissue healing is 2 weeks. The grafted tissue fully integrates over about 6 weeks, and the final aesthetic settling continues for several months. We'll see you at 1 week to remove the surgical dressing and again at 4 and 12 weeks to check on integration.",
            },
            {
              q: "Where does the tissue come from for a gum graft?",
              a: "Three sources: your own palate (free gingival graft or connective tissue graft — most common, predictable healing), or processed donor tissue from a tissue bank (acellular dermal matrix allograft — no second site, slightly less predictable). Dr. Cangini will recommend the right approach for your case during consultation.",
            },
            {
              q: "Can gums grow back without a graft?",
              a: "Unfortunately, no — receded gum tissue doesn't regenerate spontaneously. The goal of grafting is to add new tissue to the recession site so the root is covered. If recession is caught very early (just starting), sometimes addressing the cause (changing brushing technique, treating periodontal disease) can stop further loss — but rebuilding what's gone requires a graft.",
            },
            {
              q: "Will my teeth still feel sensitive after grafting?",
              a: "Usually significantly less — that's one of the major benefits. The graft covers the exposed root (which is sensitive because it lacks the protective enamel of the crown). Most patients notice a dramatic reduction in cold and hot sensitivity within a few weeks of healing.",
            },
            {
              q: "How long does a gum graft last?",
              a: "When done by a periodontist and properly cared for, a gum graft is permanent. The rare cases of graft 'failure' come from severe ongoing periodontal disease or continued aggressive brushing. We'll coach you on technique and home care to protect the result.",
            },
            {
              q: "Will the grafted area look natural?",
              a: "Yes — modern grafting techniques produce excellent aesthetic results, especially when an experienced periodontist (Dr. Cangini in our practice) does the procedure. The grafted tissue blends with the surrounding gum tissue over the first few months. Patients are typically very happy with both the comfort relief and the appearance improvement.",
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
