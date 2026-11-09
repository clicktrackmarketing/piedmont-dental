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
    "Fluoride Treatment in Piedmont, CA",
  description:
    "Professional fluoride treatment — the most effective agent for preventing tooth decay. Topical and systemic options for adults and children.",
  alternates: {
    canonical: "/procedures/cleanings-prevention/fluoride-treatment",
  },
  openGraph: {
    title: "Fluoride Treatment — Piedmont Dental By Design",
    description:
      "The most effective tool for preventing decay — strengthening enamel against acids.",
    url: "https://piedmontdentalbydesign.com/procedures/cleanings-prevention/fluoride-treatment",
    type: "article",
  },
};

const category = getCategory("cleanings-prevention");

export default function FluorideTreatmentPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="fluoride-treatment"
          title="Fluoride Treatment"
          tagline="The most effective single agent for preventing tooth decay."
          featuredImage="/img/lIVE Piedmont website images/Fluoride Treatment.png"
          intro={[
            "Fluoride is the most effective agent available to help prevent tooth decay. It's a mineral that's naturally present in varying amounts in almost all foods and water supplies.",
            "The benefits of fluoride have been well known for over fifty years and are supported by many health and professional organizations. Used properly, fluoride helps prevent the most common chronic condition there is — dental decay.",
          ]}
          stats={[
            { value: "50+ years", label: "Of evidence-based use" },
            { value: "2 forms", label: "Topical and systemic" },
            { value: "2×/year", label: "Pro application for kids" },
            { value: "ADA", label: "Endorsed" },
          ]}
          sections={[
            {
              title: "How fluoride works",
              body: [
                "Topical fluoride strengthens the teeth once they have erupted by seeping into the outer surface of the tooth enamel, making the teeth more resistant to decay. We gain topical fluoride by using fluoride-containing dental products such as toothpaste, mouth rinses, and gels. We generally recommend that children have a professional application of fluoride twice a year during dental check-ups.",
                "Systemic fluoride strengthens teeth that have erupted as well as those still developing under the gums. Most systemic fluoride comes from foods and community water supplies. It's also available as a supplement in drop or tablet form. Generally, fluoride drops are recommended for infants, and tablets are best suited for children up through the teen years.",
                "It is very important to monitor the amount of fluoride a child ingests. If too much fluoride is consumed while teeth are developing, a condition called fluorosis (white spots on the teeth) may result.",
              ],
            },
            {
              title: "When professional fluoride treatment is recommended",
              bullets: [
                "Deep pits and fissures on the chewing surfaces of teeth.",
                "Exposed and sensitive root surfaces.",
                "Fair to poor oral hygiene habits.",
                "Frequent sugar and carbohydrate intake.",
                "Inadequate exposure to fluorides.",
                "Inadequate saliva flow due to medical conditions, treatments, or medications.",
                "Recent history of dental decay.",
              ],
            },
            {
              title: "Fluoride alone won't prevent decay",
              body: [
                "Remember — fluoride alone will not prevent tooth decay. It's important to brush at least twice a day, floss regularly, eat balanced meals, reduce sugary snacks, and visit your dentist on a regular basis. Fluoride supports good habits; it doesn't replace them.",
              ],
            },
          ]}
          faqs={[
            {
              q: "Is fluoride safe for children?",
              a: "Yes — fluoride is safe and recommended for children in the doses used in toothpaste, professional treatments, and most municipal water. The key is amount: too much fluoride during tooth development (under age 8) can cause fluorosis, mild white spots on developing teeth. We coach parents on how much toothpaste to use at each age and whether supplements are appropriate.",
            },
            {
              q: "What is fluorosis?",
              a: "Fluorosis is cosmetic — white spots, streaks, or in severe cases brown discoloration on teeth — caused by ingesting too much fluoride while teeth are still developing under the gums (under age 8). It's preventable by using the right amount of toothpaste for your child's age and by checking whether your home water source already contains fluoride before considering supplements.",
            },
            {
              q: "Do adults need fluoride treatments?",
              a: "Many do. Adults with exposed root surfaces from gum recession, frequent cavities, dry mouth from medications, or who don't drink fluoridated tap water benefit from professional fluoride. It's typically a quick varnish application at the end of your cleaning visit — no extra time required.",
            },
            {
              q: "What's the difference between topical and systemic fluoride?",
              a: "Topical fluoride sits on the outside of erupted teeth, strengthening enamel from the surface — it's what you get from toothpaste, mouth rinses, and our in-office varnish. Systemic fluoride is ingested (water, drops, tablets) and incorporates into developing teeth before they erupt. Both work; topical is the main protection for adults.",
            },
            {
              q: "Why does my child need a professional fluoride treatment at every cleaning?",
              a: "Twice-yearly professional fluoride applications give kids a concentrated dose that toothpaste alone can't provide, especially around the deep pits and fissures of new molars where most childhood cavities form. The treatment takes 1–2 minutes and is a leading reason childhood cavity rates have dropped over the last 50 years.",
            },
            {
              q: "Will fluoride alone prevent cavities?",
              a: "No — fluoride supports good habits, it doesn't replace them. To prevent cavities you still need to brush twice a day, floss daily, eat balanced meals, limit sugar between meals, and see your dentist regularly. Fluoride makes enamel more resistant to acid attack, but it can't undo a poor home-care routine.",
            },
            {
              q: "What does a professional fluoride treatment feel like?",
              a: "It feels like having a thin varnish painted onto your teeth with a tiny brush — takes about 30 seconds, then dries quickly. We ask you to avoid eating hard or sticky foods for 4 hours afterward so the fluoride can do its work on the enamel.",
            },
            {
              q: "When are fluoride supplements (drops or tablets) recommended?",
              a: "Only if your child isn't getting enough fluoride from their water supply and is at higher-than-average cavity risk. Drops are for infants; tablets for children through the teen years. We never recommend supplements without first checking your home water source — too much fluoride during tooth development causes fluorosis.",
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
