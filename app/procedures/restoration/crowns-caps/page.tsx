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
    "Porcelain Crowns (Caps) in Piedmont, CA",
  description:
    "Custom porcelain crowns restore broken, fractured, or heavily decayed teeth — color-matched to your natural smile.",
  alternates: { canonical: "/procedures/restoration/crowns-caps" },
  openGraph: {
    title: "Crowns (Caps) — Piedmont Dental By Design",
    description:
      "Custom porcelain crowns to restore the shape, size, and strength of damaged teeth.",
    url: "https://piedmontdentalbydesign.com/procedures/restoration/crowns-caps",
    type: "article",
  },
};

const category = getCategory("restoration");

export default function CrownsCapsPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="crowns-caps"
          title="Crowns (Caps)"
          tagline="Custom porcelain coverings that restore tooth shape, size, and strength."
          featuredImage="/img/lIVE Piedmont website images/Surgical crown lenghtning .png"
          intro={[
            "A crown (or cap) is a covering that encases the entire tooth surface, restoring it to its original shape and size and protecting tooth structure that cannot be rebuilt with a filling. For many crowns we can design, mill, and bond the permanent restoration here in the office in a single visit using CEREC® — no impressions sent away, no temporary crown, and no two-week wait.",
            "Although there are several types of crowns, porcelain (tooth-colored) crowns are the most popular. They are highly durable and will last many years, but like most dental restorations, they may eventually need to be replaced. Porcelain crowns are made to match the shape, size, and color of your teeth, giving you a natural, long-lasting beautiful smile.",
          ]}
          stats={[
            { value: "1 visit", label: "Same-day with CEREC®" },
            { value: "2 visits", label: "Lab-fabricated route" },
            { value: "Porcelain", label: "Tooth-color match" },
            { value: "Many years", label: "Durable lifespan" },
          ]}
          sections={[
            {
              title: "Reasons for crowns",
              bullets: [
                "Broken or fractured teeth.",
                "Cosmetic enhancement.",
                "Decayed teeth.",
                "Fractured fillings.",
                "Large fillings.",
                "Tooth has had a root canal.",
              ],
            },
            {
              title: "Same-day crowns with CEREC®",
              body: [
                "For many crowns we do not need a dental laboratory at all. We take a 3D digital scan of the prepared tooth, design the crown on screen, and mill it from a solid ceramic block in our own office while you wait. The crown that goes in is the permanent one — there is no temporary to look after and nothing to come back for.",
                "Start to finish this takes about 1.5 to 2 hours in a single appointment. It also means one round of numbing instead of two, and no risk of a temporary crown coming loose in the meantime.",
                "Not every case suits same-day milling. Larger reconstructions, and front teeth where we are matching subtle colour and translucency across several teeth, are often better served by a dental laboratory. We will tell you which route we recommend for your tooth, and why, before any treatment starts.",
              ],
            },
            {
              title: "The lab-fabricated route: what it involves",
              body: [
                "When a crown is made by a dental laboratory the procedure takes two appointments. Your first appointment will include taking several highly accurate molds (or impressions) that will be used to create your custom crown. A mold will also be used to create a temporary crown, which will stay on your tooth for approximately two weeks until your new crown is fabricated by a dental laboratory.",
                "While the tooth is numb, the dentist will prepare the tooth by removing any decay and shaping the surface to properly fit the crown. Once these details are accomplished, your temporary crown will be placed with temporary cement and your bite will be checked to ensure you are biting properly.",
                "At your second appointment, your temporary crown will be removed, the tooth will be cleaned, and your new crown will be carefully placed to ensure the spacing and bite are accurate.",
                "You will be given care instructions and encouraged to have regular dental visits to check your new crown.",
              ],
            },
          ]}
          faqs={[
            {
              q: "How long do porcelain crowns last?",
              a: "Most porcelain crowns last 15–25 years with good care — some last 30+. Lifespan depends on the underlying tooth's health, your bite, grinding habits, and home care. The crown itself is durable porcelain; what fails first is usually the tooth structure underneath if a new cavity forms at the margin where crown meets tooth.",
            },
            {
              q: "What's the difference between a crown and a cap?",
              a: "Nothing — they're two words for the same thing. 'Crown' is the technical term; 'cap' is the older everyday term. Some dental offices use one or the other; we use them interchangeably. A crown/cap covers the entire tooth above the gumline, restoring shape, size, and strength.",
            },
            {
              q: "Why do I need a crown after a root canal?",
              a: "Root canals remove the inner pulp of the tooth, which leaves the remaining tooth structure brittle and prone to fracture. A crown encases the tooth and protects it from breaking under chewing forces. Most back-tooth root canals need a crown within a few months to prevent tooth loss; front teeth sometimes can be restored with just a filling.",
            },
            {
              q: "Will my crown look like a natural tooth?",
              a: "Yes — modern all-porcelain crowns are shaped, sized, and shaded to match your existing teeth. Most patients can't tell their crown from their natural teeth in the mirror. We choose the shade together using a guide and review the final result before bonding.",
            },
            {
              q: "Can a crown get a cavity?",
              a: "The crown itself can't — porcelain doesn't decay. But new decay can form at the margin where the crown meets the natural tooth, especially if you have gum recession exposing root surfaces. That's why we still check crowns at every cleaning visit and X-ray. Good home care prevents this from being a problem.",
            },
            {
              q: "Can I get my crown in one visit?",
              a: "For many crowns, yes. With CEREC® we scan, design, and mill the permanent crown in our office and bond it the same day — about 1.5 to 2 hours, one appointment, no temporary. If your case is better suited to a dental laboratory (larger reconstructions, or front teeth where we are matching colour across several teeth), the lab route takes two appointments about 2 weeks apart, and you wear a temporary in between. We will tell you which we recommend for your tooth before treatment starts.",
            },
            {
              q: "Will a crown feel different from my natural tooth?",
              a: "For the first few days, yes — your tongue notices a new shape and you may feel it when biting. Most patients adjust within a week. If the crown feels too tall (hits before other teeth when biting) or rocks against your other teeth, call us — we'll do a quick bite adjustment.",
            },
            {
              q: "How much does a porcelain crown cost?",
              a: "Most porcelain crowns at our practice run $1,949–$2,351 for a back tooth. Crowns on front teeth start at $2,379, since they take more shade-matching and shaping to blend with the rest of the smile. Dental insurance typically covers a substantial portion (often around 50%) when the crown is for a damaged tooth. We provide exact quotes and verify insurance benefits before starting.",
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
