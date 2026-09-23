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
  title: "Porcelain Veneers — Before & After",
  description:
    "Drag-to-compare porcelain veneer cases from the practice of Dr. Jill Martenson and Dr. David Ma — custom-shaded shells crafted to look completely natural.",
  alternates: { canonical: "/resources/porcelain-veneers" },
  openGraph: {
    title: "Porcelain Veneers — Before & After | Piedmont Dental By Design",
    description:
      "Real porcelain veneer before-and-after cases — custom shells designed to look completely natural.",
    url: "https://piedmontdentalbydesign.com/resources/porcelain-veneers",
    type: "article",
  },
};

const FEATURE_CHANGES = [
  {
    label: "Shade matched to surrounding teeth",
    note: "Custom-shaded by our master ceramist to blend, not announce themselves.",
  },
  {
    label: "Length corrected for natural proportion",
    note: "Edges restored to the balanced golden-ratio proportions a natural smile follows.",
  },
  {
    label: "Edge alignment refined",
    note: "Subtle reshaping smooths the smile line and adds symmetry without looking artificial.",
  },
  {
    label: "Surface texture micro-detailed",
    note: "Light scatters the way enamel does — no glossy &ldquo;veneer look.&rdquo;",
  },
];

type Case = {
  id: string;
  number: string;
  title: string;
  before: string;
  after: string;
  procedures: string[];
};

const SECONDARY_CASES: Case[] = [
  {
    id: "case-2",
    number: "02",
    title: "Worn, discoloured front teeth restored",
    before: "/img/cases/veneers/case2-before.jpg",
    after: "/img/cases/veneers/case2-after.jpg",
    procedures: ["Porcelain Veneers"],
  },
  {
    id: "case-3",
    number: "03",
    title: "Cosmetic refinement for color & shape",
    before: "/img/veneers/case3-before.jpg",
    after: "/img/veneers/case3-after.jpg",
    procedures: ["Porcelain Veneers"],
  },
  {
    id: "case-4",
    number: "04",
    title: "Even, brighter front teeth",
    before: "/img/veneers/case4-before.jpg",
    after: "/img/veneers/case4-after.jpg",
    procedures: ["Porcelain Veneers"],
  },
  {
    id: "case-5",
    number: "05",
    title: "Veneers + gum reshaping",
    before: "/img/surgery/case2-before.jpg",
    after: "/img/surgery/case2-after.jpg",
    procedures: ["Porcelain Veneers", "Gum Surgery"],
  },
];

const CARE_TIPS = [
  "Brush twice daily with a non-abrasive toothpaste — veneers polish best with gentle care.",
  "Floss every day — even though the veneer doesn&apos;t decay, the natural tooth and gumline still need attention.",
  "Skip biting hard objects (pen caps, fingernails, ice) — porcelain is strong, but not bulletproof.",
  "Wear a night guard if you grind — clenching is the #1 reason veneers fail early.",
  "See us every 6 months — we&apos;ll polish and check seal integrity at every visit.",
];

export default function PorcelainVeneersResultsPage() {
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
              <h1 className="resource-hero-title">Porcelain Veneers</h1>
              <p className="resource-hero-description">
                Real before-and-after porcelain veneer cases from Dr.
                Martenson and Dr. Ma — thin custom shells crafted to refine shape, color,
                and the way light catches your smile. Each one designed to
                look like your own teeth, only better.
              </p>
            </div>
          </div>
        </section>

        <section className="veneers-body">
          <div className="veneers-inner">

            {/* 4-stat lead bar */}
            <div className="veneers-stats">
              <div>
                <strong>2–3 visits</strong>
                <span>From consultation to final placement</span>
              </div>
              <div>
                <strong>15–20 yrs</strong>
                <span>Typical lifespan with proper care</span>
              </div>
              <div>
                <strong>0.3–0.5 mm</strong>
                <span>Thickness of a porcelain veneer</span>
              </div>
              <div>
                <strong>Hand-crafted</strong>
                <span>Shaded and milled per patient</span>
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

            {/* Featured Case 01 — slider + annotated checklist */}
            <article className="veneers-feature">
              <header className="veneers-feature-head">
                <div>
                  <span className="num">i. — Featured case</span>
                  <h2>A balanced, brighter, naturally proportioned smile</h2>
                </div>
                <span className="veneers-feature-tag">Porcelain Veneers</span>
              </header>

              <div className="veneers-feature-layout">
                <div className="veneers-feature-slider">
                  <BeforeAfterSlider
                    beforeSrc="/img/cases/veneers/case1-before.jpg"
                    afterSrc="/img/cases/veneers/case1-after.jpg"
                    beforeAlt="Featured case — before veneers"
                    afterAlt="Featured case — after veneers"
                  />
                  <p className="veneers-slider-hint">
                    ⇄&nbsp; Drag the handle to compare
                  </p>
                </div>
                <div className="veneers-feature-list">
                  <span className="veneers-feature-list-label">What changed</span>
                  <ul>
                    {FEATURE_CHANGES.map((c) => (
                      <li key={c.label}>
                        <span className="veneers-check" aria-hidden>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <div>
                          <strong>{c.label}</strong>
                          <p dangerouslySetInnerHTML={{ __html: c.note }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>

            {/* 2×2 grid of remaining cases */}
            <div className="veneers-grid-section">
              <header>
                <span className="num">ii. — More patient transformations</span>
                <h2>Additional veneer cases</h2>
              </header>
              <div className="veneers-grid">
                {SECONDARY_CASES.map((c) => (
                  <article key={c.id} className="veneers-card">
                    <div className="veneers-card-frame">
                      <BeforeAfterSlider
                        beforeSrc={c.before}
                        afterSrc={c.after}
                        beforeAlt={`${c.title} — before`}
                        afterAlt={`${c.title} — after`}
                      />
                    </div>
                    <div className="veneers-card-meta">
                      <span className="veneers-card-num">{c.number}</span>
                      <h3>{c.title}</h3>
                      <ul className="veneers-card-tags">
                        {c.procedures.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Veneer fundamentals — 3-up educational */}
            <div className="veneers-edu">
              <header>
                <span className="num">iii. — Veneer fundamentals</span>
                <h2>What makes a porcelain veneer different</h2>
              </header>
              <div className="veneers-edu-grid">
                <div className="veneers-edu-card">
                  <span className="veneers-edu-icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="6" y="4" width="12" height="16" rx="2" />
                      <path d="M9 9h6M9 13h6M9 17h4" />
                    </svg>
                  </span>
                  <h3>Wafer-thin porcelain</h3>
                  <p>
                    Each veneer is about 0.3–0.5&nbsp;mm thick — bonded over
                    the front of the tooth so it preserves most of the natural
                    enamel.
                  </p>
                </div>
                <div className="veneers-edu-card">
                  <span className="veneers-edu-icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 3a9 9 0 0 0 0 18" />
                    </svg>
                  </span>
                  <h3>Stain-resistant by design</h3>
                  <p>
                    Porcelain doesn&apos;t absorb pigments the way natural
                    enamel does — coffee, wine, and tea won&apos;t discolor
                    your veneers the way they discolor teeth.
                  </p>
                </div>
                <div className="veneers-edu-card">
                  <span className="veneers-edu-icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 6.5-7 11-7 11z" />
                    </svg>
                  </span>
                  <h3>Crafted by hand</h3>
                  <p>
                    Each veneer is shaded and shaped per patient. Our master
                    ceramist matches color, translucence, and texture so they
                    blend with the rest of your smile.
                  </p>
                </div>
              </div>
            </div>

            {/* Care tips — clean numbered list */}
            <div className="veneers-care">
              <header>
                <span className="num">iv. — Looking after them</span>
                <h2>How to care for your veneers</h2>
                <p>
                  Veneers don&apos;t need special products or routines — just
                  the same good habits that keep natural teeth healthy.
                </p>
              </header>
              <ol className="veneers-care-list">
                {CARE_TIPS.map((tip, i) => (
                  <li key={i}>
                    <span className="veneers-care-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p dangerouslySetInnerHTML={{ __html: tip }} />
                  </li>
                ))}
              </ol>
            </div>

            {/* Closing CTA */}
            <div className="veneers-cta">
              <h2>Curious if porcelain veneers are right for your smile?</h2>
              <p>
                Book a no-pressure cosmetic consultation. Dr. Martenson or
                Dr. Ma will evaluate your smile, walk through whether veneers (or another
                approach) is the best fit, and design a treatment plan
                tailored to your goals.
              </p>
              <div className="veneers-cta-actions">
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
          { name: "Porcelain Veneers", url: "/resources/porcelain-veneers" },
        ]}
      />
</>
  );
}
