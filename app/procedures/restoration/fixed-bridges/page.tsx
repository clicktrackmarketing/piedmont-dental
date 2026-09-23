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
    "Fixed Bridges in Piedmont, CA",
  description:
    "Fixed dental bridges fill the gap left by missing teeth — permanent porcelain-fused-to-metal restorations. From Piedmont Dental By Design, Piedmont, CA.",
  alternates: { canonical: "/procedures/restoration/fixed-bridges" },
  openGraph: {
    title: "Fixed Bridges — Piedmont Dental By Design",
    description:
      "Permanent, non-removable bridges to replace missing teeth and restore your bite.",
    url: "https://piedmontdentalbydesign.com/procedures/restoration/fixed-bridges",
    type: "article",
  },
};

const category = getCategory("restoration");

export default function FixedBridgesPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="fixed-bridges"
          title="Fixed Bridges"
          tagline="Permanent, non-removable replacement for missing teeth."
          featuredImage="/img/lIVE Piedmont website images/Fixed bridges.png"
          intro={[
            "A dental bridge is a fixed (non-removable) appliance and is an excellent way to replace missing teeth.",
            "There are several types of bridges. You and your dentist will discuss the best options for your particular case. The \"traditional bridge\" is the most popular type and is usually made of porcelain fused to metal. This type of bridge consists of two crowns that go over two anchoring teeth (abutment teeth) and are attached to pontics (artificial teeth), filling the gap created by one or more missing teeth.",
            "Dental bridges are highly durable and will last many years, however they may need replacement or need to be re-cemented due to normal wear.",
          ]}
          stats={[
            { value: "2+ visits", label: "Typical timeline" },
            { value: "Porcelain", label: "Fused to metal" },
            { value: "Fixed", label: "Non-removable" },
            { value: "Many years", label: "Durable lifespan" },
          ]}
          sections={[
            {
              title: "Reasons for a fixed bridge",
              bullets: [
                "Fill space of missing teeth.",
                "Maintain facial shape.",
                "Prevent remaining teeth from drifting out of position.",
                "Restore chewing and speaking ability.",
                "Restore your smile.",
                "Upgrade from a removable partial denture to a permanent dental appliance.",
              ],
            },
            {
              title: "What does getting a fixed bridge involve?",
              body: [
                "Getting a bridge usually requires two or more visits. While the teeth are numb, the two anchoring teeth are prepared by removing a portion of enamel to allow for a crown. Next, a highly accurate impression (mold) is made which will be sent to a dental laboratory where the bridge will be fabricated. In addition, a temporary bridge will be made and worn for several weeks until your next appointment.",
                "At the second visit, your permanent bridge will be carefully checked, adjusted, and cemented to achieve a proper fit. Occasionally your dentist may only temporarily cement the bridge, allowing your teeth and tissue time to get used to the new bridge. The new bridge will be permanently cemented at a later time.",
                "You will receive care instructions at the conclusion of the procedure. Proper brushing, flossing, and regular dental visits will aid in the life of your new permanent bridge.",
              ],
            },
          ]}
          faqs={[
            {
              q: "What's the difference between a fixed bridge and a removable partial denture?",
              a: "A fixed bridge is cemented permanently to the natural teeth on either side of the gap — you can't take it out. A partial denture clips on and is removed daily for cleaning. Bridges feel and function more like natural teeth; partials are more cost-effective and reversible. For a single missing tooth between two healthy teeth, a bridge is usually the better long-term solution.",
            },
            {
              q: "How long do dental bridges last?",
              a: "Most bridges last 10–15 years with good care, though many last 20+ years. The bridge itself is durable porcelain-fused-to-metal — what typically fails first is the natural anchor tooth underneath (new cavity at the margin, gum disease, or fracture). Regular check-ups catch any problems early.",
            },
            {
              q: "Do the anchor teeth get damaged by the bridge?",
              a: "The anchor teeth (abutments) have to be filed down to receive the crown caps that hold the bridge in place — this preparation is permanent and means the anchor teeth always need crowns going forward. For this reason, when the anchor teeth are otherwise healthy, an implant may be a more conservative option than a bridge.",
            },
            {
              q: "Can I floss with a bridge?",
              a: "Yes — but you can't slide regular floss between the bridge teeth (they're fused together). You use a floss threader (a soft plastic tool that loops floss under the bridge) or a water flosser to clean underneath the artificial tooth and around the anchor teeth. Daily cleaning under the bridge is essential to prevent gum disease and decay at the anchor margins.",
            },
            {
              q: "How is a bridge different from a dental implant?",
              a: "A bridge anchors to your natural teeth on either side of the gap; an implant stands alone as an artificial tooth root in the jawbone. Bridges are faster (2–3 weeks vs. 4–9 months for an implant), require no surgery, and are usually less expensive — but they involve modifying healthy neighboring teeth. Implants preserve your other teeth and last longer.",
            },
            {
              q: "Will the bridge look natural?",
              a: "Yes — modern porcelain bridges match the shape, size, and shade of your existing teeth. We choose the color together using a shade guide and review the result before final cementation. Most people can't tell a well-done bridge from natural teeth.",
            },
            {
              q: "How long is the wait between the temporary bridge and the permanent one?",
              a: "Typically 2–3 weeks. At the first visit we prepare the anchor teeth, take a mold, and place a temporary bridge. The lab fabricates your permanent during that time; we cement it at the second visit. Sometimes we temporarily cement the permanent first to let you 'test drive' it for a few weeks before permanently bonding.",
            },
            {
              q: "How much does a fixed bridge cost?",
              a: "A 3-unit bridge (2 anchor crowns + 1 artificial tooth) typically runs $5,847–$6,651 at our practice. Larger bridges (replacing multiple teeth) scale up from there. Dental insurance often covers a meaningful portion for medically necessary cases. We provide exact quotes and verify insurance ahead of time.",
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
