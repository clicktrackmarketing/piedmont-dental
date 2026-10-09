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
    "Teeth Whitening in Piedmont, CA",
  description:
    "Professional teeth whitening — change the color of natural enamel with custom take-home trays or in-office treatment. ADA-approved methods.",
  alternates: { canonical: "/procedures/cosmetic-dentistry/tooth-whitening" },
  openGraph: {
    title: "Teeth Whitening — Piedmont Dental By Design",
    description:
      "Custom-tray bleaching at home or in-office whitening — supervised, ADA-approved, calibrated to your enamel.",
    url: "https://piedmontdentalbydesign.com/procedures/cosmetic-dentistry/tooth-whitening",
    type: "article",
    images: ["/img/procedures/cosmetic-dentistry/_index/figure-2.jpg"],
  },
};

const category = getCategory("cosmetic-dentistry");

export default function ToothWhiteningPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="tooth-whitening"
          title="Teeth Whitening"
          tagline="Non-invasive, professional bleaching — calibrated to your enamel."
          featuredImage="/img/lIVE Piedmont website images/teeth-whitening-1.webp"
          intro={[
            "Teeth whitening (or bleaching) is a simple, non-invasive dental treatment used to change the color of natural tooth enamel and is an ideal way to enhance the beauty of your smile.",
            "Because having whiter teeth has now become the number one aesthetic concern of most patients, there are a number of ways to whiten teeth. The most popular method is using a home teeth whitening system that will whiten teeth dramatically. Since teeth whitening only works on natural tooth enamel, it is important to evaluate replacement of any old fillings, crowns, etc. Replacement of any restorations will be done after bleaching so they will match the newly bleached teeth.",
            "Teeth whitening is not permanent. A touch-up may be needed every several years, and more often if you smoke or drink coffee, tea, or wine.",
          ]}
          stats={[
            { value: "2 visits", label: "Typical timeline" },
            { value: "Custom", label: "Tray-based bleaching" },
            { value: "Years", label: "Until touch-up needed" },
            { value: "Take-home", label: "Or in-office option" },
          ]}
          sections={[
            {
              title: "Reasons for teeth whitening",
              bullets: [
                "Fluorosis (excessive fluoridation during tooth development).",
                "Normal wear of outer tooth layer.",
                "Stained teeth due to medications (tetracycline, etc.).",
                "Yellow or brown stained teeth.",
              ],
            },
            {
              title: "What does teeth whitening involve?",
              body: [
                "This type of teeth whitening usually requires two visits. At the first appointment, impressions (molds) will be made of your teeth to fabricate custom, clear plastic trays.",
                "At your second appointment, you will try on the trays for proper fit, and adjustments will be made if necessary. The trays are worn with special whitening solution either twice a day for 30 minutes or overnight for a couple of weeks depending on the degree of staining and desired level of whitening. It is normal to experience tooth sensitivity during the time you are whitening your teeth, but it will subside shortly after you have stopped bleaching.",
                "You will receive care instructions for your teeth and trays, and be encouraged to visit your dentist regularly to help maintain a beautiful, healthy, white smile.",
              ],
            },
            {
              title: "Service area",
              body: [
                "We proudly serve patients throughout Oakland, the East Bay, Lake Merritt, Montclair, Rockridge, and Berkeley.",
              ],
            },
          ]}
          faqs={[
            {
              q: "How much does professional teeth whitening cost?",
              a: "Custom take-home tray whitening at our practice typically runs $400–$600 — that covers the molds, custom trays, and several syringes of professional-strength gel. In-office whitening (single appointment, faster results) runs higher. Both are significantly less than the cumulative cost of repeatedly buying over-the-counter strips that don't deliver lasting results.",
            },
            {
              q: "Will whitening work on my crowns and fillings?",
              a: "No — whitening only works on natural tooth enamel. Crowns, veneers, and tooth-colored fillings won't change color. If you have visible restorations and want to whiten, we whiten the natural teeth first and then replace any restorations afterward to match the new lighter shade. We'll plan this with you at your consultation.",
            },
            {
              q: "Is professional whitening better than over-the-counter products?",
              a: "Significantly. Professional gels contain higher concentrations of bleaching agents (calibrated to your enamel by your dentist), and the custom trays keep the gel in contact with your teeth — not your gums. Most over-the-counter strips deliver 6–10% peroxide; professional gels are 15–35%. Results last longer and look more uniform.",
            },
            {
              q: "How long do whitening results last?",
              a: "Typically 1–3 years before a touch-up is needed. The biggest factors are coffee, tea, red wine, smoking, and how diligent you are with your home-care routine. We provide extra gel syringes so you can do a 2–3 night touch-up at home whenever you notice your shade starting to drift.",
            },
            {
              q: "Will whitening hurt my teeth?",
              a: "Temporary sensitivity to cold air or cold liquids is common during the 2-week active whitening period — it stops within a few days of finishing. We can prescribe a desensitizing gel if it bothers you. Whitening at the concentrations we use doesn't damage enamel; the sensitivity comes from the bleaching agent passing through dentin to the nerve, which calms down once you stop.",
            },
            {
              q: "How white can my teeth actually get?",
              a: "Most patients see 3–8 shades of improvement on the standard dental shade guide. Your starting color, the cause of staining (genetic, food/drink, age, medication), and the porosity of your enamel all factor in. Tetracycline staining from childhood antibiotics is the hardest to budge; food and age-related yellowing responds best.",
            },
            {
              q: "Can pregnant or nursing women whiten their teeth?",
              a: "We recommend postponing whitening during pregnancy and breastfeeding — not because of proven harm, but because peroxide hasn't been formally studied in those populations, and we'd rather err on the side of caution. Routine cleanings are still completely safe.",
            },
            {
              q: "Why do I need to whiten before getting new dental work?",
              a: "Because crowns, veneers, and fillings can't be whitened later — once they're placed, they're locked in that shade. If you want a whiter smile and need new restorations, the sequence is: whiten first, wait two weeks for the color to stabilize, then place restorations matched to your new shade. Reversing this order means redoing the restoration to match.",
            },
            {
              q: "What causes tooth discoloration in the first place?",
              a: "Surface staining from coffee, tea, red wine, tobacco, and certain foods (dark berries, soy sauce, curry). Internal discoloration from age (enamel thins, revealing the yellower dentin underneath), genetics, medication (especially tetracycline taken in childhood), and trauma. Surface stains respond to whitening; deep internal discoloration may need veneers.",
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
