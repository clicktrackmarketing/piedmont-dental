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
  title: "Cosmetic Bonding — Before & After",
  description:
    "Drag-to-compare cosmetic bonding cases from Dr. David Ma and Dr. Jill Martenson — chips, gaps and worn edges rebuilt in tooth-coloured composite, usually in a single visit.",
  alternates: { canonical: "/resources/cosmetic-bonding" },
  openGraph: {
    title: "Cosmetic Bonding — Before & After | Piedmont Dental By Design",
    description:
      "Real cosmetic bonding before-and-after cases — chips, gaps and worn edges rebuilt in a single visit.",
    url: "https://piedmontdentalbydesign.com/resources/cosmetic-bonding",
    type: "article",
  },
};

type BondingCase = {
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

const CASES: BondingCase[] = [
  {
    id: "case-1",
    number: "01",
    title: "Dark front tooth blended, spacing closed",
    before: "/img/cases/bonding/case1-before.jpg",
    after: "/img/cases/bonding/case1-after.jpg",
    procedures: ["Cosmetic Bonding"],
    duration: "Single visit",
    beforeStory:
      "One upper front tooth had darkened noticeably against its neighbours, and uneven spacing between the front teeth drew the eye straight to it. The patient wanted the discolouration handled without cutting the tooth down for a crown.",
    afterStory:
      "Tooth-coloured composite was bonded directly to the tooth and shaped by hand, masking the darkness and closing the spacing at the same time. No drilling of healthy enamel, and the whole case was finished in one appointment.",
  },
  {
    id: "case-2",
    number: "02",
    title: "Worn edges rebuilt, proportions evened",
    before: "/img/cases/bonding/case2-before.jpg",
    after: "/img/cases/bonding/case2-after.jpg",
    procedures: ["Cosmetic Bonding"],
    duration: "Single visit",
    beforeStory:
      "Years of wear had flattened and shortened the upper front teeth, leaving the edges uneven and the smile line slightly ragged — the kind of change that happens so gradually most patients only notice it in photographs.",
    afterStory:
      "Composite was added back to the worn edges and contoured to restore length and proportion. The smile line runs evenly again, and because bonding is additive, none of the underlying tooth was removed to do it.",
  },
];

const WHY_BONDING = [
  {
    label: "One visit, no lab",
    note: "The composite is shaped and cured in the chair, so there is no temporary and no second appointment.",
  },
  {
    label: "Additive, not subtractive",
    note: "Little or no healthy enamel is removed — unlike a crown or, usually, a veneer.",
  },
  {
    label: "Reversible in principle",
    note: "Because the tooth underneath is largely untouched, bonding can be redone or changed later.",
  },
  {
    label: "The most affordable cosmetic option",
    note: "Typically a fraction of the cost of porcelain, which is why it is often the first thing we discuss.",
  },
];

export default function CosmeticBondingPage() {
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
                Patient Resources · Before &amp; After
              </div>
              <h1 className="resource-hero-title">Cosmetic Bonding</h1>
              <p className="resource-hero-description">
                Real before-and-after cosmetic bonding cases from Dr. Ma and
                Dr. Martenson — chips, gaps, discolouration and worn edges
                rebuilt in tooth-coloured composite, shaped by hand and
                usually finished in a single visit. Drag any slider below to
                compare.
              </p>
            </div>
          </div>
        </section>

        <section className="ivresults-body">
          <div className="ivresults-inner">
            <div className="ivresults-stats">
              <div>
                <strong>1 visit</strong>
                <span>Most bonding cases, start to finish</span>
              </div>
              <div>
                <strong>No lab</strong>
                <span>Shaped and cured in the chair</span>
              </div>
              <div>
                <strong>Minimal prep</strong>
                <span>Little or no enamel removed</span>
              </div>
              <div>
                <strong>5–10 yrs</strong>
                <span>Typical life before a refresh</span>
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
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        width="14"
                        height="14"
                      >
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

            <div className="surgery-related">
              <header>
                <span className="num">— Why bonding</span>
                <h2>What makes bonding different</h2>
              </header>
              <div className="surgery-related-grid">
                {WHY_BONDING.map((w) => (
                  <div key={w.label} className="surgery-related-card">
                    <h3>{w.label}</h3>
                    <p>{w.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="surgery-related">
              <header>
                <span className="num">— Related</span>
                <h2>If bonding isn&apos;t the right fit</h2>
              </header>
              <div className="surgery-related-grid">
                <Link
                  href="/resources/porcelain-veneers"
                  className="surgery-related-card"
                >
                  <h3>Porcelain Veneers</h3>
                  <p>
                    When the change needed is larger, or you want a result that
                    holds its colour for longer.
                  </p>
                  <span>View gallery →</span>
                </Link>
                <Link
                  href="/procedures/cosmetic-dentistry/tooth-whitening"
                  className="surgery-related-card"
                >
                  <h3>Teeth Whitening</h3>
                  <p>
                    When shade is the only concern and the shape of the teeth
                    is already where you want it.
                  </p>
                  <span>Read more →</span>
                </Link>
                <Link
                  href="/resources/smile-analysis"
                  className="surgery-related-card"
                >
                  <h3>Smile Self-Assessment</h3>
                  <p>
                    17 quick questions to evaluate your smile — we&apos;ll
                    reply with a personalized response.
                  </p>
                  <span>Take the quiz →</span>
                </Link>
              </div>
            </div>

            <div className="ivresults-cta">
              <h2>Wondering what bonding could do for your smile?</h2>
              <p>
                Book a no-pressure consultation. Dr. Ma or Dr. Martenson will
                look at the teeth you&apos;re unhappy with, tell you honestly
                whether bonding is the right tool for the job, and quote the
                work before anything starts.
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
          { name: "Cosmetic Bonding", url: "/resources/cosmetic-bonding" },
        ]}
      />
    </>
  );
}
