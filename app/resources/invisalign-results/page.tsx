import type { Metadata } from "next";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import AwardsStrip from "@/components/AwardsStrip";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";

import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
export const metadata: Metadata = {
  title: "Invisalign® Results — Before & After",
  description:
    "Drag-to-compare before and after Invisalign® cases from Dr. Jill Martenson and Dr. David Ma — real patient smile transformations with clear aligners.",
  alternates: { canonical: "/resources/invisalign-results" },
  openGraph: {
    title: "Invisalign® Results — Before & After | Piedmont Dental By Design",
    description:
      "Real before-and-after Invisalign® smile transformations.",
    url: "https://piedmontdentalbydesign.com/resources/invisalign-results",
    type: "article",
  },
};

type IVCase = {
  id: string;
  number: string;
  title: string;
  before: string;
  after: string;
  procedures: string[];
  duration: string;
  beforeStory: string;
  afterStory: string;
};

const CASES: IVCase[] = [
  {
    id: "case-1",
    number: "01",
    title: "Severe crowding and rotation corrected",
    before: "/img/cases/invisalign/case1-before.jpg",
    after: "/img/cases/invisalign/case1-after.jpg",
    procedures: ["Invisalign®"],
    duration: "~12 months",
    beforeStory:
      "Significant crowding and rotation across both arches, with the lower front teeth overlapping heavily. The patient wanted the teeth straightened without committing to visible metal braces.",
    afterStory:
      "A custom Invisalign® aligner series brought both arches into alignment — completed entirely with clear, removable trays. The crowding is resolved and the bite sits evenly.",
  },
  {
    id: "case-2",
    number: "02",
    title: "Crowding relieved, smile line evened",
    before: "/img/cases/invisalign/case2-before.jpg",
    after: "/img/cases/invisalign/case2-after.jpg",
    procedures: ["Invisalign®"],
    duration: "~10 months",
    beforeStory:
      "Spacing and tooth position were the patient's primary concerns. They wanted to close visible gaps between teeth and refine the overall smile line — without the look or commitment of braces.",
    afterStory:
      "Through a custom series of Invisalign® aligners, the spacing was closed evenly and the smile line was refined. A confident, natural-looking result the patient was excited to show off.",
  },
];

export default function InvisalignResultsPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <section className="resource-hero">
          <div className="resource-hero-inner">
            <div className="resource-hero-text">
              <Link href="/resources" className="post-hero-back">
                ← Back to resources
              </Link>
              <div className="num" style={{ marginTop: 12 }}>
                Patient Resources · Before & After
              </div>
              <h1 className="resource-hero-title">Invisalign® Results</h1>
              <p className="resource-hero-description">
                Real before-and-after Invisalign® cases from Dr. Martenson and Dr. Ma —
                clear aligners that straightened smiles with no metal, no
                wires, and trays that come out for meals and special
                occasions. Drag any slider below to compare.
              </p>
            </div>
          </div>
        </section>

        <section className="ivresults-body">
          <div className="ivresults-inner">

            {/* Lead stats */}
            <div className="ivresults-stats">
              <div>
                <strong>20–29</strong>
                <span>Custom aligner sets per arch</span>
              </div>
              <div>
                <strong>~2 weeks</strong>
                <span>Between each tray change</span>
              </div>
              <div>
                <strong>22 hrs/day</strong>
                <span>Recommended wear time</span>
              </div>
              <div>
                <strong>Removable</strong>
                <span>Trays come out for meals and photos</span>
              </div>
            </div>

            <div className="surgery-consent" role="note">
              <span className="surgery-consent-tag">Note</span>
              <p>
                Patients depicted in these case studies have provided their
                consent to display their photos online. Results vary by case —
                schedule a consultation to discuss what&apos;s possible for
                your smile.
              </p>
            </div>

            {/* Full-width featured cases */}
            <div className="ivresults-cases">
              {CASES.map((c) => (
                <article key={c.id} className="ivresults-case">
                  <header className="ivresults-case-head">
                    <span className="ivresults-case-num">{c.number}</span>
                    <div>
                      <span className="num">Case study</span>
                      <h2>{c.title}</h2>
                    </div>
                    <span className="ivresults-duration">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 8v4l3 2" />
                      </svg>
                      {c.duration}
                    </span>
                  </header>

                  <div className="ivresults-slider-wrap">
                    <BeforeAfterSlider
                      beforeSrc={c.before}
                      afterSrc={c.after}
                      beforeAlt={`${c.title} — before`}
                      afterAlt={`${c.title} — after`}
                    />
                    <p className="ivresults-hint">
                      ⇄&nbsp; Drag the handle to compare
                    </p>
                  </div>

                  <div className="ivresults-case-info">
                    <div className="ivresults-info-col">
                      <span className="ivresults-info-label">Procedures</span>
                      <ul className="ivresults-procedures">
                        {c.procedures.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="ivresults-info-col">
                      <span className="ivresults-info-label ivresults-info-label--before">
                        Before
                      </span>
                      <p>{c.beforeStory}</p>
                    </div>
                    <div className="ivresults-info-col">
                      <span className="ivresults-info-label ivresults-info-label--after">
                        After
                      </span>
                      <p>{c.afterStory}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Comparison table — Invisalign® vs metal braces */}
            <div className="ivresults-compare">
              <header>
                <span className="num">— Why patients pick Invisalign®</span>
                <h2>Invisalign® vs traditional metal braces</h2>
                <p>
                  Both treatments can correct the same alignment issues — the
                  experience of getting there is what&apos;s different.
                </p>
              </header>
              <table className="ivresults-compare-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>
                      <span className="ivresults-th-pill ivresults-th-pill--teal">
                        Invisalign®
                      </span>
                    </th>
                    <th>
                      <span className="ivresults-th-pill">Metal Braces</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Visibility</td>
                    <td>Nearly invisible clear trays</td>
                    <td>Visible metal brackets and wires</td>
                  </tr>
                  <tr>
                    <td>Removable</td>
                    <td>Yes — out for meals, photos, brushing</td>
                    <td>Fixed for the entire treatment period</td>
                  </tr>
                  <tr>
                    <td>Eating</td>
                    <td>No food restrictions — trays come out</td>
                    <td>Avoid hard, sticky, or chewy foods</td>
                  </tr>
                  <tr>
                    <td>Comfort</td>
                    <td>Smooth plastic, no wires to poke or scratch</td>
                    <td>Brackets and wires can cause irritation</td>
                  </tr>
                  <tr>
                    <td>Office visits</td>
                    <td>Brief check-ins every 6–8 weeks</td>
                    <td>Tightening adjustments every 4–6 weeks</td>
                  </tr>
                  <tr>
                    <td>Hygiene</td>
                    <td>Brush and floss normally</td>
                    <td>Extra care needed around brackets</td>
                  </tr>
                  <tr>
                    <td>Patient commitment</td>
                    <td>22 hours of wear required daily</td>
                    <td>None — brackets stay on continuously</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Related */}
            <div className="surgery-related">
              <span className="num">— Learn more</span>
              <h2>Curious about the treatment itself?</h2>
              <div className="surgery-related-grid">
                <Link
                  href="/resources/invisalign"
                  className="surgery-related-card"
                >
                  <h3>Invisalign® overview</h3>
                  <p>How clear aligners work, what bite problems they correct, and what daily wear involves.</p>
                  <span>Read overview →</span>
                </Link>
                <Link
                  href="/procedures/cosmetic-dentistry/invisalign"
                  className="surgery-related-card"
                >
                  <h3>Invisalign® procedure page</h3>
                  <p>The treatment process from consultation to final aligner — what to expect at every step.</p>
                  <span>Learn more →</span>
                </Link>
                <Link
                  href="/resources/smile-analysis"
                  className="surgery-related-card"
                >
                  <h3>Smile Self-Assessment</h3>
                  <p>17 quick questions to evaluate your smile — we&apos;ll reply with a personalized response.</p>
                  <span>Take the quiz →</span>
                </Link>
              </div>
            </div>

            <div className="ivresults-cta">
              <h2>Curious if your smile could change like this?</h2>
              <p>
                Book a no-pressure Invisalign® consultation. Dr. Martenson or
                Dr. Ma will evaluate your bite, share a realistic timeline, and put
                together a treatment plan tailored to your goals.
              </p>
              <div className="ivresults-cta-actions">
                <Link href="/contact" className="btn btn-primary btn-lg">
                  Contact us →
                </Link>
                <a href="tel:5103503937" className="btn btn-ghost btn-lg">
                  or call (510) 350-3937
                </a>
              </div>
            </div>
          </div>
        </section>

        <AwardsStrip />
        <AboutCTA />
      </main>
      <SiteFooter />
    
      <BreadcrumbSchema
        crumbs={[
          { name: "Resources", url: "/resources" },
          { name: "Invisalign® Results", url: "/resources/invisalign-results" },
        ]}
      />
</>
  );
}
