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
    "Porcelain Veneers in Piedmont, CA",
  description:
    "Hand-shaped porcelain veneers — thin, custom, color-matched shells bonded to the front of teeth. Address chips, gaps, discoloration, or misshapen teeth.",
  alternates: {
    canonical: "/procedures/cosmetic-dentistry/porcelain-veneers",
  },
  openGraph: {
    title: "Porcelain Veneers — Piedmont Dental By Design",
    description:
      "Custom porcelain shells bonded to the fronts of teeth — color-matched in person, durable, beautiful.",
    url: "https://piedmontdentalbydesign.com/procedures/cosmetic-dentistry/porcelain-veneers",
    type: "article",
    images: ["/img/procedures/cosmetic-dentistry/_index/figure-1.jpg"],
  },
};

const category = getCategory("cosmetic-dentistry");

export default function PorcelainVeneersPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="porcelain-veneers"
          title="Porcelain Veneers"
          tagline="Custom porcelain shells, hand-shaped and color-matched in person."
          intro={[
            "Veneers are very thin pieces of durable, tooth-shaped porcelain that are custom-made (for shape and color) by a professional dental laboratory. They are bonded onto the front of teeth to create a beautiful and attractive smile.",
            "Veneers can completely reshape your teeth and smile. They can often be alternatives to crowns and the ideal solution in treating many dental conditions.",
            "As with most dental restorations, veneers are not permanent and may someday need replacement. They are very durable and will last many years, giving you a beautiful long-lasting smile.",
          ]}
          stats={[
            { value: "2 visits", label: "Typical timeline" },
            { value: "Porcelain", label: "Custom-made shells" },
            { value: "Many years", label: "Durable lifespan" },
            { value: "Minimal", label: "Anesthesia required" },
          ]}
          sections={[
            {
              title: "Reasons for porcelain veneers",
              bullets: [
                "Cosmetically, to create a uniform, white, beautiful smile.",
                "Crooked teeth.",
                "Misshapen teeth.",
                "Severely discolored or stained teeth.",
                "Teeth that are too small or large.",
                "Unwanted or uneven spaces.",
                "Worn or chipped teeth.",
              ],
            },
            {
              title: "What does getting porcelain veneers involve?",
              body: [
                "Getting veneers usually requires two visits to complete the process, with little or no anesthesia required during the procedure. The teeth are prepared by lightly buffing and shaping the surface to allow for the thickness of the veneer. A mold or impression of the teeth is taken and a shade (color) will then be chosen by you and the dentist.",
                "On the second visit the teeth will be cleansed with special liquids to achieve a durable bond. Bonding cement is then placed between the tooth and veneer and a special light beam is used to harden and set the bond.",
                "You will receive care instructions for veneers. Proper brushing, flossing, and regular dental visits will aid in the life of your new veneers.",
              ],
            },
          ]}
          faqs={[
            {
              q: "How much do porcelain veneers cost per tooth?",
              a: "Porcelain veneers at our practice start at $2,379 per tooth, depending on the case complexity, lab used, and how much shape design is involved. A full smile makeover (6–10 upper veneers) is a significant investment but lasts 15+ years with care. You'll get an exact written quote at your consultation.",
            },
            {
              q: "How many veneers do most patients get?",
              a: "It depends on what shows when you smile. Some patients want a single veneer to fix one chipped or stained tooth. Most cosmetic cases use 6–8 upper veneers (front teeth and the teeth visible at the corners of your smile). Full smile designs may include 10 upper + 8 lower. We'll plan together based on what you see in the mirror.",
            },
            {
              q: "Do veneers ruin your natural teeth?",
              a: "We remove a very thin layer of enamel — typically 0.3–0.5mm — to make room for the porcelain. This preparation is permanent (the tooth will always need a veneer or crown going forward), but it's much more conservative than a full crown. Some 'no-prep' veneer cases are possible for naturally small or worn teeth.",
            },
            {
              q: "How long do porcelain veneers last?",
              a: "Many years — typically 15–20+ with good care. Like any dental restoration, they're not permanent and may eventually need replacement. Avoiding habits that crack veneers (biting fingernails, opening packaging with teeth, ice chewing) and wearing a nightguard if you grind extends their life significantly.",
            },
            {
              q: "Will my veneers look fake?",
              a: "Not when done well — that's the whole point of custom porcelain. We choose the color, shape, and translucency to match your face and existing teeth. The most common cosmetic mistake is veneers that are too white or too uniform — we work with you to find the right look, not a magazine cover.",
            },
            {
              q: "Can veneers be whitened?",
              a: "No — porcelain doesn't respond to bleaching. If you want a whiter smile, we whiten your natural teeth first, then match your veneers to the new shade. Plan any whitening before veneer placement; you can't darken or lighten veneers later without replacing them.",
            },
            {
              q: "What's the difference between veneers and crowns?",
              a: "A veneer covers only the front and biting edge of a tooth — like a thin shell bonded to the visible surface. A crown encases the entire tooth, all the way around. Veneers are for cosmetic improvement of front teeth that are mostly healthy. Crowns are used when the tooth is structurally damaged, decayed, or has had a root canal.",
            },
            {
              q: "Can veneers fix crooked teeth?",
              a: "For mildly crooked or rotated front teeth, yes — veneers can give the appearance of a straight smile. For more significant misalignment, Invisalign® or traditional orthodontics first, then veneers if needed, gives a more conservative result. Dr. Martenson can help you decide which path makes sense.",
            },
            {
              q: "How are veneers different from composite bonding?",
              a: "Composite bonding uses tooth-colored filling material applied directly to the tooth and shaped chairside — cheaper, single visit, and reversible, but stains over time and lasts 5–7 years. Porcelain veneers are custom-made in a lab, more expensive, and require 2 visits — but they don't stain and last 15+ years. Bonding is great for small fixes; veneers are the long-term answer.",
            },
          ]}
          featuredImage="/img/procedures/cosmetic-dentistry/_index/figure-1.jpg"
        />
        <AwardsStrip />
        <AboutCTA />
      </main>
      <SiteFooter />
    </>
  );
}
