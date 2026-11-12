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
    "Sinus Augmentation in Piedmont, CA",
  description:
    "Sinus augmentation (sinus lift) at Piedmont Dental By Design — raise the sinus floor and add bone graft material to enable secure upper-jaw dental implants.",
  alternates: {
    canonical: "/procedures/periodontal-services/sinus-augmentation",
  },
  openGraph: {
    title: "Sinus Augmentation — Piedmont Dental By Design",
    description:
      "Sinus floor lift with bone graft — preparing the upper jaw for implant placement.",
    url: "https://piedmontdentalbydesign.com/procedures/periodontal-services/sinus-augmentation",
    type: "article",
  },
};

const category = getCategory("periodontal-services");

export default function SinusAugmentationPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="sinus-augmentation"
          title="Sinus Augmentation"
          tagline="Raise the sinus floor to make room for upper-jaw implants."
          featuredImage="/img/procedures/shared/implant-in-bone-model.png"
          featuredAlt="Model of a dental implant set in the jawbone"
          intro={[
            "A dental implant serves as an artificial tooth root attached to the jawbone, with a replacement tooth or bridge securely fixed on top to restore complete tooth function. Successful, long-lasting implants depend on adequate jawbone quality and quantity.",
            "When bone has been lost due to injury or periodontal disease, a sinus augmentation can raise the sinus floor to enable new bone formation — making implant placement possible in the upper jaw where it otherwise wouldn't be safe.",
          ]}
          stats={[
            { value: "Upper jaw", label: "Premolar/molar region" },
            { value: "Bone graft", label: "Own, cadaver, or synthetic" },
            { value: "Healing", label: "Required before implants" },
            { value: "Higher", label: "Implant success rate" },
          ]}
          sections={[
            {
              title: "How sinus augmentation works",
              body: [
                "In the most common technique, a tiny incision is made near the upper premolar or molar region to expose the jawbone. A small opening is cut into the bone and the membrane lining the sinus on the other side is gently pushed upward.",
                "The underlying space is then filled with bone graft material and the incision is closed. The bone used may come from your own body, from a cadaver bone bank, or in some cases synthetic materials are used to stimulate bone formation.",
                "Implants are placed after healing has occurred — the timing depends on the individual case. Sinus augmentation has been shown to significantly increase the success rate of dental implant procedures in patients who have lost upper-jaw bone density.",
              ],
            },
          ]}
          faqs={[
            {
              q: "Why do I need a sinus lift before getting an upper-jaw implant?",
              a: "When you lose an upper back tooth, the maxillary sinus (the air pocket above your upper jaw) gradually drops downward and the bone underneath shrinks. To place an implant safely, we need enough bone between the implant and the sinus floor. A sinus lift raises the sinus membrane and packs bone graft material beneath it, creating space for safe implant placement.",
            },
            {
              q: "Is sinus augmentation surgery painful?",
              a: "The procedure is done with local anesthesia (sometimes IV sedation for larger cases) and is comfortable throughout. Postoperative discomfort for 5–7 days is typical — most patients describe it as similar to a sinus infection, well-managed with over-the-counter pain relief. Mild swelling and occasional minor nosebleed is normal in the first few days.",
            },
            {
              q: "How long does it take to heal before I can get implants?",
              a: "Most cases require 4–9 months of healing before implant placement, depending on how much bone was needed and which technique was used. In some cases — when there's enough existing bone — the sinus lift and implant placement can be done simultaneously. Dr. Cangini will plan the timing during your evaluation.",
            },
            {
              q: "Are there risks to having a sinus lift?",
              a: "Like any surgery, there are small risks: sinus membrane perforation (small tears usually heal on their own), infection (rare with proper antibiotic protocol), and graft failure (uncommon). Success rates with experienced periodontists like Dr. Cangini exceed 95%. Smoking significantly raises the risk of failure — we ask patients to stop smoking at least 2 weeks before and during healing.",
            },
            {
              q: "Can the bone graft material come from a donor?",
              a: "Yes — we typically use allograft (processed human donor bone), xenograft (bovine), or synthetic bone substitute. All three are well-studied, safe, and avoid the need for a second surgical site to harvest your own bone. For very large defects, we may combine donor material with a small amount of your own bone for the best result.",
            },
            {
              q: "Will I need to take antibiotics afterward?",
              a: "Yes — almost always. A short course of oral antibiotics (5–7 days) significantly reduces infection risk during the early healing period. We may also prescribe an antimicrobial mouth rinse. Take the full course exactly as prescribed even if you feel fine.",
            },
            {
              q: "Are there any food or activity restrictions during healing?",
              a: "For the first 1–2 weeks: no nose blowing, no straws, no smoking, no swimming or strenuous exercise. Eat soft foods and avoid anything that creates pressure changes in the sinus (sneeze with mouth open, no flying if possible). Most patients return to normal activities within 7–10 days.",
            },
            {
              q: "How successful is sinus augmentation?",
              a: "Very — implant success rates in sinus-augmented sites match those in native bone (95%+) when done by an experienced periodontist. The procedure has been done for over 40 years and is well-refined. The biggest predictors of success are no smoking, proper home care during healing, and following the timing recommendation for implant placement.",
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
