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
    "Periodontal Maintenance in Piedmont, CA",
  description:
    "Periodontal maintenance after gum disease treatment — quarterly cleanings, pocket-depth checks, oral cancer screening, and ongoing pocket health monitoring at.",
  alternates: { canonical: "/procedures/periodontal-services/maintenance" },
  openGraph: {
    title: "Periodontal Maintenance — Piedmont Dental By Design",
    description:
      "Quarterly cleanings, pocket checks, and oral cancer screening — keeping gum disease in remission.",
    url: "https://piedmontdentalbydesign.com/procedures/periodontal-services/maintenance",
    type: "article",
  },
};

const category = getCategory("periodontal-services");

export default function MaintenancePage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="maintenance"
          title="Periodontal Maintenance"
          tagline="Keeping gum disease in remission — quarterly cleanings, pocket checks, and screening."
          featuredImage="/img/lIVE Piedmont website images/dental-cleaning-prevention.jpg"
          intro={[
            "It only takes twenty-four hours for plaque that isn't removed from your teeth to harden into calculus (tartar). Daily home care helps control plaque and tartar formation, but those hard-to-reach areas always need special attention.",
            "Once your periodontal treatment has been completed, your dentist and hygienist will recommend regular maintenance cleanings — usually four times a year. At each visit, pocket depths are carefully checked to make sure they're healthy, and plaque and calculus that's difficult to remove on a daily basis are taken from above and below the gum line.",
          ]}
          stats={[
            { value: "4×/year", label: "Typical maintenance cadence" },
            { value: "24 hrs", label: "Until plaque becomes tartar" },
            { value: "Pocket", label: "Depth checked each visit" },
            { value: "Screening", label: "Oral cancer at every visit" },
          ]}
          sections={[
            {
              title: "What's included at each visit",
              bullets: [
                "Examination of diagnostic X-rays — essential for detecting decay, tumors, cysts, and bone loss; also helps determine tooth and root positions.",
                "Examination of existing restorations — checking current fillings, crowns, and other dental work.",
                "Examination of tooth decay — checking all tooth surfaces for new decay.",
                "Oral cancer screening — face, neck, lips, tongue, throat, cheek tissues, and gums checked for any signs.",
                "Oral hygiene recommendations — review and recommend aids such as electric toothbrushes, periodontal brushes, fluorides, and rinses.",
                "Teeth polishing — removing stain and plaque that wasn't taken off during brushing or scaling.",
              ],
            },
            {
              title: "Why maintenance matters",
              body: [
                "Good oral hygiene practices and periodontal cleanings are essential in maintaining dental health and keeping periodontal disease under control. Once gum disease has been present, periodontal pockets re-form much faster than original disease developed — quarterly visits keep the bacterial colonies that cause infection from re-establishing themselves.",
              ],
            },
          ]}
          faqs={[
            {
              q: "How is periodontal maintenance different from a regular cleaning?",
              a: "A regular cleaning (dental prophylaxis) removes plaque and tartar from healthy teeth above the gumline. Periodontal maintenance is for patients who have already been treated for gum disease — it includes deeper cleaning below the gumline, careful checking of pocket depths, and ongoing monitoring to keep the disease from returning. Different procedure code, longer appointment, often more frequent.",
            },
            {
              q: "Why do I need cleanings every 3 months instead of every 6?",
              a: "Because plaque starts hardening into tartar within just 24 hours, and patients with treated gum disease re-form periodontal pockets much faster than people who've never had it. The quarterly cadence keeps bacterial colonies from re-establishing in the pockets where disease started. Stretching to 6 months often allows the disease to recur.",
            },
            {
              q: "Can I ever go back to regular 6-month cleanings?",
              a: "For most periodontal patients, the answer is no — once gum disease has been present, the risk of recurrence stays elevated for life. The 3-month cadence is the standard of care that keeps your case stable. Some patients with very mild disease history and excellent home care may stretch to every 4 months, but we'll make that call together at your visits.",
            },
            {
              q: "What happens at a periodontal maintenance visit?",
              a: "Pocket-depth measurements at every tooth, an oral cancer screening, an exam of all existing dental work, X-rays as needed, deep cleaning above and below the gumline, polishing, and a discussion of your home care. Total time about 60–75 minutes.",
            },
            {
              q: "Will my insurance cover quarterly maintenance?",
              a: "Most plans cover 2 visits per calendar year at the cleaning rate, then quarterly visits are billed at the periodontal maintenance rate (different code). Many plans cover periodontal maintenance up to 4× per year; some cap at 2 with the rest as out-of-pocket. We verify your specific benefits and discuss any cost upfront.",
            },
            {
              q: "What happens if I skip a maintenance visit?",
              a: "Tartar starts re-accumulating below the gumline immediately. Skipping one visit usually means pockets get a little deeper, gums become more inflamed, and the next visit takes longer to bring you back to baseline. Skipping multiple visits often leads to disease progression — sometimes requiring scaling and root planing or surgery again.",
            },
            {
              q: "How long will I need to do quarterly maintenance?",
              a: "Indefinitely — for life. Periodontal disease is managed, not cured. Quarterly visits keep it in remission the same way regular medication keeps a chronic medical condition stable. The investment is far cheaper than letting the disease recur and needing surgery again.",
            },
            {
              q: "Do I still need to floss daily between maintenance visits?",
              a: "Absolutely — and possibly more carefully than someone who's never had gum disease. Daily flossing disrupts the bacterial colonies that drive recurrence. Many of our maintenance patients also use a water flosser, interdental brushes, or medicated rinses. We coach the right tools for your case.",
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
