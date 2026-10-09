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
    "Composite Fillings in Piedmont, CA",
  description:
    "Composite (tooth-colored) fillings repair decay, cracks, chips, and worn teeth. Color-matched and aesthetically suited for visible front teeth.",
  alternates: { canonical: "/procedures/restoration/composite-fillings" },
  openGraph: {
    title: "Composite Fillings — Piedmont Dental By Design",
    description:
      "Tooth-colored fillings — repair cavities or replace defective amalgams in a single appointment.",
    url: "https://piedmontdentalbydesign.com/procedures/restoration/composite-fillings",
    type: "article",
  },
};

const category = getCategory("restoration");

export default function CompositeFillingsPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="composite-fillings"
          title="Composite Fillings"
          tagline="Tooth-colored, single-visit restorations for cavities, chips, and worn teeth."
          featuredImage="/img/lIVE Piedmont website images/composite-fillings-2109.jpg"
          intro={[
            "A composite (tooth-colored) filling is used to repair a tooth that is affected by decay, cracks, fractures, etc. The decayed or affected portion of the tooth will be removed and then filled with a composite filling.",
            "There are many types of filling materials available, each with their own advantages and disadvantages. You and your dentist can discuss the best options for restoring your teeth. Composite fillings, along with silver amalgam fillings, are the most widely used today. Because composite fillings are tooth colored, they can be closely matched to the color of existing teeth, and are more aesthetically suited for use in front teeth or the more visible areas of the teeth.",
            "As with most dental restorations, composite fillings are not permanent and may someday have to be replaced. They are very durable, and will last many years, giving you a long lasting, beautiful smile.",
          ]}
          stats={[
            { value: "1 visit", label: "Single appointment" },
            { value: "Tooth-color", label: "Aesthetically matched" },
            { value: "Many years", label: "Durable lifespan" },
            { value: "Low-prep", label: "Minimally invasive" },
          ]}
          sections={[
            {
              title: "Reasons for composite fillings",
              bullets: [
                "Chipped teeth.",
                "Closing space between two teeth.",
                "Cracked or broken teeth.",
                "Decayed teeth.",
                "Worn teeth.",
              ],
            },
            {
              title: "How are composite fillings placed?",
              body: [
                "Composite fillings are usually placed in one appointment. While the tooth is numb, your dentist will remove decay as necessary. The space will then be thoroughly cleaned and carefully prepared before the new filling is placed. If the decay was near the nerve of the tooth, a special medication will be applied for added protection. The composite filling will then be precisely placed, shaped, and polished, restoring your tooth to its original shape and function.",
                "It is normal to experience sensitivity to hot and cold when composite fillings are first placed, however this will subside shortly after your tooth acclimates to the new filling.",
                "You will be given care instructions at the conclusion of your treatment. Good oral hygiene practices, eating habits, and regular dental visits will aid in the life of your new fillings.",
              ],
            },
          ]}
          faqs={[
            {
              q: "How long do composite fillings last?",
              a: "Composite fillings typically last 7–10 years with good care — some last longer, some need replacement sooner. Lifespan depends on the size of the filling, where it's located (back-tooth fillings on chewing surfaces wear faster than front-tooth fillings), your bite, and grinding habits. Regular check-ups catch any wear before it becomes a problem.",
            },
            {
              q: "Are composite fillings better than silver (amalgam) fillings?",
              a: "Modern composite is comparable in strength to amalgam for small-to-medium fillings, with major aesthetic advantages: it matches your tooth color and bonds directly to the tooth (no mechanical wedging needed). For very large fillings or in high-stress molar areas, amalgam still has some advantages in durability — but we use composite for the vast majority of our cases.",
            },
            {
              q: "Why are my teeth sensitive after getting a filling?",
              a: "Temporary sensitivity to hot and cold for 1–2 weeks after a filling is normal — the tooth is acclimating to the new restoration and the nerve is responding to the slight inflammation from the procedure. If sensitivity persists beyond a few weeks or if you feel pain when biting down, call us — we may need to adjust the bite or check for a deep cavity.",
            },
            {
              q: "Can I replace my old silver fillings with composite?",
              a: "Yes, and we do this regularly — both for aesthetic reasons (tooth-colored replacement) and when an old amalgam has cracked, worn, or leaked. We remove the old filling, check for any decay underneath, and bond a new composite in its place. It's a single-visit procedure for most cases.",
            },
            {
              q: "How long does a composite filling appointment take?",
              a: "Typically 30–60 minutes per filling, depending on size and location. We numb the tooth, remove decay, prepare the cavity, place the composite in layers (curing each layer with a special light), shape it to match your bite, then polish. You walk out with the restoration done — no second visit needed.",
            },
            {
              q: "Will my filling match my tooth color exactly?",
              a: "Yes — we use a shade guide to select composite that matches your tooth color, and we can blend multiple shades for the most natural result. Within a year or two, slight differences can appear as your natural tooth shade changes — but the original match is typically very close to invisible.",
            },
            {
              q: "Can a composite filling fall out?",
              a: "Rarely — composites bond chemically to your tooth, so they don't 'fall out' the way an old mechanical filling might. If a composite does fail, it's usually because of new decay at the edge, a cracked tooth around the filling, or a very large filling that breaks under bite stress. Regular check-ups catch problems before the filling fails.",
            },
            {
              q: "How much does a composite filling cost?",
              a: "Most composite fillings at our practice run $361–$565 depending on size and number of surfaces involved. Dental insurance typically covers a significant portion. We provide an exact quote before starting work and verify insurance benefits ahead of time.",
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
