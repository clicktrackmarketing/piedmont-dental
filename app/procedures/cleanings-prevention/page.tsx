import type { Metadata } from "next";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import CategoryIndex from "@/components/CategoryIndex";
import AwardsStrip from "@/components/AwardsStrip";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";
import FAQPageSchema from "@/components/schema/FAQPageSchema";
import { getCategory } from "@/lib/procedure-categories";

export const metadata: Metadata = {
  title:
    "Cleanings & Prevention in Piedmont, CA",
  description:
    "Exams, cleanings, fluoride and home care in Piedmont, CA — what a six-month hygiene visit covers, and why catching decay early costs far less to fix.",
  alternates: { canonical: "/procedures/cleanings-prevention" },
  openGraph: {
    title: "Cleanings & Prevention — Piedmont Dental By Design",
    description:
      "Exams, cleanings, X-rays, fluoride, and home-care coaching — keeping problems small.",
    url: "https://piedmontdentalbydesign.com/procedures/cleanings-prevention",
    type: "website",
    images: ["/img/procedures/cleanings-prevention/_index/hero.jpg"],
  },
};

const category = getCategory("cleanings-prevention");

/* Hub content added 2026-08-13. This is the FOURTH procedure hub — the audit's
   hub finding named only three (cosmetic, periodontal, restoration), so this
   page was never assessed. It carried 411 words and no FAQ.

   ⚠ SCOPE LIMIT, deliberate. Two of this category's children — /dental-x-rays
   and /panoramic-x-rays — are on the CTM clinical list for unsourced radiation
   figures and shielding guidance that current ADA/AAOMR advice has moved away
   from. So nothing below states a radiation dose, a shielding practice, or an
   imaging interval. When CTM rules on those, an X-ray row can be added to the
   visit table and an imaging question to the FAQ.

   Everything here is drawn from the children's own pages. */

const VISIT = [
  {
    step: "Exam",
    what: "A full examination including decay detection, a gum-disease evaluation and an oral cancer screening.",
    slug: "dental-exams-cleanings",
  },
  {
    step: "Cleaning",
    what: "Tartar and plaque removed by a registered dental hygienist, then a polish to lift surface stain.",
    slug: "dental-exams-cleanings",
  },
  {
    step: "Fluoride",
    what: "A topical application that strengthens enamel against decay — applied twice a year for children, and for adults at higher risk.",
    slug: "fluoride-treatment",
  },
  {
    step: "Home care plan",
    what: "What to change between visits: brushing twice daily, flossing daily, and the technique and tools that suit your mouth.",
    slug: "home-care",
  },
];

const PREVENTION_FAQS = [
  {
    q: "How often should I come in for a cleaning?",
    a: "Every six months for most people. That cadence is what lets us catch decay and gum disease while they are still small and inexpensive to treat. If you have active gum disease you will be on a different, more frequent schedule — that is periodontal maintenance rather than a routine cleaning, and we will tell you which one you are on and why.",
  },
  {
    q: "What actually happens at a hygiene visit?",
    a: "Four things. A registered dental hygienist removes the tartar and plaque that brushing cannot reach, then polishes to lift surface stain. The dentist examines the teeth for decay, evaluates the gums, and carries out an oral cancer screening. Where it is useful we apply fluoride. Then we talk through what to change at home before the next visit.",
  },
  {
    q: "My teeth feel fine. Do I still need to come?",
    a: "Yes — and that is rather the point of prevention. Decay and gum disease are both painless in their early stages; by the time a tooth hurts, the cheap fix has usually passed. A filling costs $361–$565. Once a tooth needs a crown that becomes $1,949–$2,351, and a tooth lost entirely becomes an implant starting at $8,474. The exam is what keeps you at the first number.",
  },
  {
    q: "Does insurance cover cleanings?",
    a: "Most dental plans cover two cleanings and exams a year, and preventive care is usually the best-covered part of any plan. We accept most dental insurance as an out-of-network provider and will submit a pre-treatment estimate so you know your share before the appointment.",
  },
  {
    q: "Is a professional cleaning different from brushing well at home?",
    a: "They do different jobs and you need both. Brushing and flossing control plaque daily, which is the part only you can do. But once plaque hardens into tartar it bonds to the tooth and no toothbrush will shift it — that requires instruments and a hygienist. Good home care means less tartar to remove; it does not replace the removal.",
  },
];

const CARDS = [
  {
    slug: "dental-exams-cleanings",
    title: "Dental Exams & Cleanings",
    description:
      "Comprehensive exam, oral cancer screening, gum disease check, and professional cleaning by a registered hygienist — the foundation of preventive care.",
    meta: "Every 6 months",
  },
  {
    slug: "dental-x-rays",
    title: "Dental X-Rays",
    description:
      "Diagnostic radiographs that reveal hidden decay, abscesses, bone loss, and developmental issues invisible during a regular exam — safe and low radiation.",
    meta: "Annually · Bite-wing series",
  },
  {
    slug: "panoramic-x-rays",
    title: "Panoramic X-Rays",
    description:
      "Wraparound photograph of the face and teeth — extraoral, simple to perform, and ideal for evaluating wisdom teeth, TMJ, jawbone fractures, and implant planning.",
    meta: "As-needed · Treatment planning",
  },
  {
    slug: "fluoride-treatment",
    title: "Fluoride Treatment",
    description:
      "The most effective agent for preventing tooth decay — strengthens enamel and protects against cavities. Topical and systemic options for adults and children.",
    meta: "Twice yearly for kids",
  },
  {
    slug: "home-care",
    title: "Home Care",
    description:
      "Daily routine that protects your investment in dental health — proper brushing technique, flossing, rinsing, and the right tools for your needs.",
    meta: "Daily · Lifelong",
  },
  {
    slug: "how-to-properly-brush-floss",
    title: "How to Brush & Floss",
    description:
      "Detailed technique for the two most important habits in oral health — preventing decay, gum disease, halitosis, and staining when done correctly.",
    meta: "Step-by-step guidance",
  },
];

export default function CleaningsPreventionCategoryPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <CategoryIndex
          slug={category.slug}
          label={category.label}
          eyebrow="Procedures · Cleanings & Prevention"
          title="Cleanings & Prevention"
          intro={[
            "Preventing dental disease starts at home with good oral hygiene and a balanced diet, and is continued in the office through the work of your dentist and hygienist to promote, restore, and maintain your oral health.",
            "Prevention also means regular exams, cleanings, and X-rays — alongside fluoride and sealants where helpful. Done well, prevention helps you avoid serious and costly dental problems and is the surest path to a healthy, confident, beautiful smile.",
          ]}
          image="/img/procedures/cleanings-prevention/_index/hero.jpg"
          imageAlt="Hygiene appointment at Piedmont Dental By Design"
          cards={CARDS}
        />

        <section className="rest-guide" aria-labelledby="visit-heading">
          <div className="rest-guide-inner">
            <header className="rest-guide-head">
              <span className="num">i. — Your six-month visit</span>
              <h2 id="visit-heading">What a hygiene appointment covers</h2>
              <p>
                One appointment, four jobs. Between them they catch the two
                diseases that cost teeth — decay and gum disease — while both are
                still small.
              </p>
            </header>

            <div className="rest-costs-wrap">
              <table className="rest-costs">
                <thead>
                  <tr>
                    <th scope="col">Step</th>
                    <th scope="col">What it involves</th>
                  </tr>
                </thead>
                <tbody>
                  {VISIT.map((v) => (
                    <tr key={v.step}>
                      <th scope="row">
                        <Link href={`/procedures/cleanings-prevention/${v.slug}`}>
                          {v.step}
                        </Link>
                      </th>
                      <td>{v.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <header className="rest-guide-head rest-guide-head--tight">
              <span className="num">ii. — Why it is worth it</span>
              <h2>Prevention is the cheapest dentistry there is</h2>
              <p>
                Decay and gum disease are painless early on. Every step you delay
                moves the same tooth into a more expensive column — these are the
                ranges published on our own treatment pages.
              </p>
            </header>

            <div className="rest-decide-grid">
              <div className="rest-decide-col rest-decide-col--accent">
                <span className="rest-decide-tag">Caught early</span>
                <h3>An exam and a cleaning</h3>
                <ul>
                  <li>
                    <strong>Every six months</strong>
                    <span>
                      Decay found small is a filling at $361–$565. Gum disease
                      found early is reversed with cleaning and better home care.
                    </span>
                  </li>
                  <li>
                    <strong>Usually your best-covered benefit</strong>
                    <span>
                      Most dental plans include two cleanings and exams a year.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="rest-decide-col">
                <span className="rest-decide-tag">Left too long</span>
                <h3>Restoration, not prevention</h3>
                <ul>
                  <li>
                    <strong>Crown — $1,949–$2,351</strong>
                    <span>
                      Once decay or a fracture leaves too little sound tooth for a
                      filling.
                    </span>
                  </li>
                  <li>
                    <strong>Implant — from $8,474</strong>
                    <span>
                      Once the tooth is lost altogether, plus months of healing
                      before the final tooth goes on.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <header className="rest-guide-head rest-guide-head--tight">
              <span className="num">iii. — Common questions</span>
              <h2 id="prevention-faqs-heading">Frequently asked questions</h2>
            </header>
            <div className="proc-faq-list">
              {PREVENTION_FAQS.map((f, i) => (
                <details key={i} className="proc-faq-item">
                  <summary className="proc-faq-question">
                    <span>{f.q}</span>
                    <span className="proc-faq-icon" aria-hidden>
                      +
                    </span>
                  </summary>
                  <div className="proc-faq-answer">
                    <p>{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <AwardsStrip />
        <AboutCTA />
      </main>
      <FAQPageSchema faqs={PREVENTION_FAQS} />
      <SiteFooter />
    </>
  );
}
