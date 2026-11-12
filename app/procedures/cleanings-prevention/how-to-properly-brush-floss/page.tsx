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
    "How to Brush & Floss Properly",
  description:
    "Detailed brushing and flossing technique from Piedmont Dental By Design — preventing decay, periodontal disease, halitosis, and staining when done correctly.",
  alternates: {
    canonical: "/procedures/cleanings-prevention/how-to-properly-brush-floss",
  },
  openGraph: {
    title: "How to Brush & Floss — Piedmont Dental By Design",
    description:
      "Step-by-step technique for the two most important habits in oral health.",
    url: "https://piedmontdentalbydesign.com/procedures/cleanings-prevention/how-to-properly-brush-floss",
    type: "article",
  },
};

const category = getCategory("cleanings-prevention");

export default function HowToBrushFlossPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="how-to-properly-brush-floss"
          title="How to Brush & Floss"
          tagline="The two most important habits in oral health — done correctly."
          featuredImage="/img/lIVE Piedmont website images/How to Brush & Floss.png"
          intro={[
            "Brushing and flossing are of paramount importance to oral hygiene. Though bi-annual professional dental cleanings remove plaque, tartar, and debris, excellent home care is equally valuable.",
            "Proper brushing and flossing can enhance the health of the mouth, make the smile sparkle, and prevent serious diseases. Doing them well is more important than doing them often.",
          ]}
          stats={[
            { value: "2×/day", label: "Brushing minimum" },
            { value: "Daily", label: "Flossing" },
            { value: "3 mo", label: "Replace brush" },
            { value: "45°", label: "Brush angle to gums" },
          ]}
          sections={[
            {
              title: "Why proper technique matters",
              body: [
                "Tooth decay — one of the leading causes of tooth loss — occurs when acids in plaque erode natural enamel. Decay's treatment often requires complex dental procedures, but it can easily be prevented with proper home hygiene.",
                "Periodontal disease is a progressive condition caused by toxins in plaque. It can lead to tooth loss, gum recession, jawbone recession, and serious health problems elsewhere in the body. Removing plaque and calculus from teeth (with a toothbrush) and from interdental areas (with floss) is an excellent way to stave off periodontal problems.",
                "Halitosis (bad breath) is usually caused by old food particles on or between teeth. These particles can be removed with regular brushing and flossing. And staining or yellowing — caused by smoking, coffee, tea, and other agents — is much less likely to become permanent the more regularly you remove the staining agents.",
              ],
            },
            {
              title: "The proper way to brush",
              body: [
                "Brush at least twice a day — ideally in the morning and before bed. The perfect toothbrush is small in size with soft, rounded-end bristles, and replaced every three months. The head needs to be small enough to access all areas of the mouth, and the bristles soft enough not to damage gum tissue. The ADA accepts both manual and electric toothbrushes; many patients find a powered brush with a rotating or oscillating head makes thorough brushing easier.",
              ],
              bullets: [
                "Place the toothbrush at a 45-degree angle where the gums and teeth meet.",
                "Use small circular motions to gently brush the gumline and teeth.",
                "Don't scrub or apply too much pressure — this can damage gums and tooth enamel.",
                "Brush every surface of every tooth — cheek-side, tongue-side, and chewing surfaces. Place special emphasis on the back teeth.",
                "Use back-and-forth strokes to brush the chewing surfaces.",
                "Brush the tongue to remove fungi, food, and debris.",
              ],
            },
            {
              title: "The proper way to floss",
              body: [
                "Flossing removes plaque from interdental regions — the spaces between teeth. It's an especially important tool for preventing periodontal disease and limiting the depth of gum pockets. The flavor and type of floss are unimportant; choose floss that you'll use easily and pleasantly.",
              ],
              bullets: [
                "Cut a piece of floss to around 18 inches long.",
                "Wrap one end around the middle finger of the left hand and the other end around the middle finger of the right hand until the hands are 2–3 inches apart.",
                "Work the floss gently between the teeth toward the gum line.",
                "Curve the floss into a U-shape around each individual tooth and carefully slide it beneath the gum line.",
                "Carefully move the floss up and down several times to remove interdental plaque and debris.",
                "Don't pop the floss in and out between the teeth — this will inflame and cut the gums.",
              ],
            },
          ]}
          faqs={[
            {
              q: "What does proper brushing technique actually look like?",
              a: "Hold the brush at a 45-degree angle to where your gums meet your teeth. Use small, gentle, circular motions — not back-and-forth scrubbing. Cover every surface of every tooth (outside, inside, chewing surface). Pay extra attention to the back molars and the inside of your front teeth, which most people miss. Two minutes total, twice a day.",
            },
            {
              q: "Is harder pressure better when brushing?",
              a: "No — and it's actively harmful. Hard pressure with a stiff brush wears down enamel and pushes gums into recession. Use a soft-bristled brush and gentle pressure: if the bristles are splayed flat, you're pushing too hard. Electric toothbrushes do the work for you — you only need to guide them along the gumline.",
            },
            {
              q: "Why does my floss bleed when I use it?",
              a: "Bleeding gums almost always mean inflammation from plaque sitting along or under the gumline — this is gingivitis, the earliest stage of gum disease. Counterintuitively, the solution is to floss more, not less. With consistent daily flossing for 1–2 weeks, healthy gums stop bleeding. If bleeding persists after two weeks, schedule a visit.",
            },
            {
              q: "Can I use a water flosser instead of regular floss?",
              a: "Water flossers are an excellent supplement and especially helpful around braces, bridges, implants, and tight contacts. For most patients we recommend both — string floss to mechanically disrupt plaque between teeth, water flosser to flush debris from under the gumline. If string floss is impossible for you, a water flosser used daily is much better than nothing.",
            },
            {
              q: "Should I brush before or after breakfast?",
              a: "Either works — the key is consistency. Brushing before breakfast removes the overnight bacterial buildup and lays down a layer of fluoride before you eat. Brushing after breakfast cleans away food debris. If you eat something acidic (citrus juice, coffee, etc.), wait 30 minutes before brushing to avoid scrubbing softened enamel.",
            },
            {
              q: "How can I tell if my toothbrush is too hard?",
              a: "Look at the bristles after a few weeks of use — if they're splayed outward, matted, or bent over, the brush is wearing out (or you're pressing too hard). The ADA recommends 'soft' or 'extra-soft' for almost everyone. Medium and hard brushes do more damage than they help.",
            },
            {
              q: "Can I brush too much?",
              a: "Yes — brushing more than 3 times a day, or brushing too hard, can wear down enamel and cause gum recession. The goal is twice-daily thorough brushing, not constant scrubbing. If you feel the urge to brush after every meal, rinsing with water is a better alternative.",
            },
            {
              q: "Why is the chewing surface of back teeth harder to keep clean?",
              a: "Molars have deep grooves (pits and fissures) on their chewing surface — narrow valleys where toothbrush bristles physically can't reach. That's why most cavities in kids form on chewing surfaces, and why we sometimes recommend dental sealants for those grooves. For adults, technique matters: angle the brush directly into the chewing surface and use back-and-forth strokes there.",
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
