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
    "Dental X-Rays in Piedmont, CA",
  description:
    "Dental X-rays — safe, low-radiation diagnostic imaging that reveals decay, abscesses, bone loss, and developmental issues invisible during a regular exam.",
  alternates: { canonical: "/procedures/cleanings-prevention/dental-x-rays" },
  openGraph: {
    title: "Dental X-Rays — Piedmont Dental By Design",
    description:
      "Diagnostic radiographs that reveal what an exam can't — safe and low radiation.",
    url: "https://piedmontdentalbydesign.com/procedures/cleanings-prevention/dental-x-rays",
    type: "article",
  },
};

const category = getCategory("cleanings-prevention");

export default function DentalXRaysPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="dental-x-rays"
          title="Dental X-Rays"
          tagline="Diagnostic imaging that reveals what an exam alone can't."
          featuredImage="/img/lIVE Piedmont website images/dental-xray.jpg"
          intro={[
            "Dental radiographs (X-rays) are essential preventive and diagnostic tools that provide valuable information not visible during a regular dental exam. Dentists and hygienists use this information to safely and accurately detect hidden dental abnormalities and complete an accurate treatment plan.",
            "Without X-rays, problem areas may go undetected. Catching dental problems early can save you time, money, unnecessary discomfort — and your teeth.",
          ]}
          stats={[
            { value: "1 day", label: "Equivalent natural radiation" },
            { value: "Lead apron", label: "Standard protection" },
            { value: "3–5 yrs", label: "Full series validity" },
            { value: "1–2×/yr", label: "Bite-wing X-rays at recall" },
          ]}
          sections={[
            {
              title: "What dental X-rays may reveal",
              bullets: [
                "Abscesses or cysts.",
                "Bone loss.",
                "Cancerous and non-cancerous tumors.",
                "Decay between the teeth.",
                "Developmental abnormalities.",
                "Poor tooth and root positions.",
                "Problems inside a tooth or below the gum line.",
              ],
            },
            {
              title: "Are dental X-rays safe?",
              body: [
                "We are all exposed to natural radiation in our environment. The amount of radiation exposure from a full-mouth series of X-rays is equal to the amount a person receives in a single day from natural sources.",
                "Dental X-rays produce a low level of radiation and are considered safe. We take necessary precautions to limit your exposure — including lead apron shields to protect the body and digital sensors that cut down the exposure time of each X-ray.",
              ],
            },
            {
              title: "How often should X-rays be taken?",
              body: [
                "The need for dental X-rays depends on each patient's individual dental health needs. Your dentist and hygienist will recommend necessary X-rays based on a review of your medical and dental history, the dental exam, signs and symptoms, age considerations, and risk for disease.",
                "A full-mouth series of dental X-rays is recommended for new patients and is usually good for three to five years. Bite-wing X-rays — top and bottom teeth biting together — are taken at recall (check-up) visits and are recommended once or twice a year to detect new dental problems.",
              ],
            },
          ]}
          faqs={[
            {
              q: "Are dental X-rays safe during pregnancy?",
              a: "Routine dental X-rays are generally postponed during pregnancy unless there's an urgent diagnostic need (severe pain, infection, trauma). If an X-ray is necessary, we use a lead apron with a thyroid collar and modern low-dose digital sensors. Always tell us if you're pregnant or trying to conceive so we can plan accordingly.",
            },
            {
              q: "How much radiation am I exposed to during dental X-rays?",
              a: "A full-mouth series of dental X-rays delivers about the same radiation you'd receive from one day of natural background exposure (sun, air, rocks, food). Single bite-wing X-rays at a recall visit are roughly a fraction of that. We use lead aprons, thyroid collars, and modern fast-film/digital sensors to keep exposure as low as possible.",
            },
            {
              q: "How often should I have dental X-rays taken?",
              a: "Bite-wing X-rays — the small ones taken with you biting down on a tab — are recommended once or twice a year at your recall visits to catch new decay between teeth. A full-mouth series is taken on new patients and then every 3–5 years. Your dentist will adjust based on your dental history, age, and risk for disease.",
            },
            {
              q: "What's the difference between bite-wing X-rays and a full-mouth series?",
              a: "Bite-wing X-rays show the crowns of your upper and lower back teeth biting together — they're the best tool for spotting decay between teeth and checking bone level. A full-mouth series captures every tooth from crown to root tip across multiple individual films. The full series is used as a baseline for new patients and to check for problems beneath the gumline.",
            },
            {
              q: "Why do I need X-rays if I'm not having pain?",
              a: "Most dental problems are silent in their early stages — decay between teeth, small abscesses, bone loss, cysts, and even tumors typically don't cause pain until they're advanced. X-rays catch these issues when they're still small and inexpensive to fix. Waiting for pain usually means a bigger problem and a bigger procedure.",
            },
            {
              q: "Can I refuse dental X-rays?",
              a: "You can decline X-rays, but we're then diagnosing partially blind — about a third of dental problems aren't visible during a clinical exam alone. We'll always explain why we're recommending a specific X-ray and how often. If you'd like to push out the cadence, talk to your dentist about your concerns.",
            },
            {
              q: "Do children need dental X-rays?",
              a: "Yes — children typically get X-rays once a year, more frequently if they have a high cavity risk or are in mixed-dentition (losing baby teeth, gaining permanent ones). X-rays in kids monitor tooth development, look for decay between teeth, and check that adult teeth are coming in correctly.",
            },
            {
              q: "Are digital X-rays safer than film X-rays?",
              a: "Yes — digital X-ray sensors deliver about 70–80% less radiation than traditional film. We use digital imaging throughout the practice, which also means we can review your images chairside on a screen and store them as part of your record without any chemical processing.",
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
