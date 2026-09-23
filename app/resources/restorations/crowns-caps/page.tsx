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
  title: "Crowns (Caps) — Before & After",
  description:
    "Interactive before-and-after crown cases — porcelain crowns, implant-supported crowns and full-arch rehabilitation from Dr. Martenson and Dr. Ma.",
  alternates: { canonical: "/resources/restorations/crowns-caps" },
  openGraph: {
    title: "Crowns (Caps) — Before & After | Piedmont Dental By Design",
    description:
      "Drag-to-compare before-and-after results for porcelain crowns and crown restorations.",
    url: "https://piedmontdentalbydesign.com/resources/restorations/crowns-caps",
    type: "article",
  },
};

type Case = {
  id: string;
  number: string;
  title: string;
  before: string;
  after: string;
  description: string;
  procedures: string[];
};

const CASES: Case[] = [
  {
    id: "case-1",
    number: "01",
    title: "Mismatched front crowns rebuilt to match the arch",
    before: "/img/cases/crowns/case1-before.jpg",
    after: "/img/cases/crowns/case1-after.jpg",
    description:
      "Two existing front crowns sat brighter and bulkier than the teeth either side of them, so they read as obvious dental work against worn, darker neighbours. Rebuilt in all-porcelain (no metal) and re-shaded across the arch, so shape, texture and colour now run evenly from tooth to tooth.",
    procedures: ["Porcelain Crown", "No-Metal"],
  },
  {
    id: "case-2",
    number: "02",
    title: "Single tooth replacement with implant + crown",
    before: "/img/crowns-caps/case2-before.jpg",
    after: "/img/crowns-caps/case2-after.jpg",
    description:
      "The patient needed a single-tooth replacement for one upper central incisor. We restored both smile and function with a single dental implant and an all-porcelain crown (cap) that fits securely over the implant for a permanent, natural-looking result.",
    procedures: ["Dental Implant", "Porcelain Crown"],
  },
  {
    id: "case-3",
    number: "03",
    title: "Full-arch rehabilitation with implants and crowns",
    before: "/img/dentures/case1-before.jpg",
    after: "/img/dentures/case1-after.jpg",
    description:
      "Significant tooth loss had affected the patient's chewing function, facial tissue support, and smile confidence. A combination of implants, porcelain crowns, and prosthetic work restored the smile to a natural-looking, fully functional result.",
    procedures: ["Dental Implants", "Porcelain Crowns", "Full-Arch Rehab"],
  },
  {
    id: "case-4",
    number: "04",
    title: "Upper & lower arch rehabilitation",
    before: "/img/dentures/case2-before.jpg",
    after: "/img/dentures/case2-after.jpg",
    description:
      "The patient needed upper and lower arch rehabilitation. A great smile, restored chewing function, and proper facial tissue support — achieved with an upper denture supported by implants, plus lower implants and porcelain crowns.",
    procedures: ["Implant-Supported Denture", "Implants", "Porcelain Crowns"],
  },
];

const CROWN_STEPS = [
  {
    n: "01",
    title: "Evaluate & plan",
    body: "Digital impressions and X-rays let us evaluate the tooth, plan the contour, and preview the final shape before any preparation begins.",
  },
  {
    n: "02",
    title: "Prepare the tooth",
    body: "We gently shape the tooth so the crown can fit precisely. For implant cases, we work with the abutment instead — no underlying tooth is involved.",
  },
  {
    n: "03",
    title: "Craft the crown",
    body: "Your crown is custom-milled (often the same day via CEREC) or hand-built by our master ceramist — shaded to match the rest of your teeth.",
  },
  {
    n: "04",
    title: "Fit & polish",
    body: "We seat the crown, check the bite, and polish to a natural luster. You walk out with a result that looks and feels like your own tooth.",
  },
];

export default function CrownsCapsResourcePage() {
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
                Patient Resources · Restorations · Before & After
              </div>
              <h1 className="resource-hero-title">Crowns (Caps)</h1>
              <p className="resource-hero-description">
                Real porcelain crown cases from Dr. Martenson and Dr. Ma — front-tooth
                restorations, single-tooth implant replacements, and full-arch
                rehabilitation. Drag the slider on any case below to see the
                before and after.
              </p>
            </div>
          </div>
        </section>

        <section className="crowns-body">
          <div className="crowns-inner">

            <div className="surgery-consent" role="note">
              <span className="surgery-consent-tag">Note</span>
              <p>
                Patients depicted in these case studies have provided their
                consent to display their photos online. Results vary by case —
                schedule a consultation to discuss what&apos;s possible for
                your smile.
              </p>
            </div>

            {/* 2x2 case grid with interactive sliders */}
            <div className="crowns-grid">
              {CASES.map((c) => (
                <article key={c.id} className="crowns-case">
                  <header className="crowns-case-head">
                    <span className="crowns-case-num">{c.number}</span>
                    <div>
                      <span className="crowns-case-eyebrow">Case study</span>
                      <h2>{c.title}</h2>
                    </div>
                  </header>

                  <div className="crowns-case-slider">
                    <BeforeAfterSlider
                      beforeSrc={c.before}
                      afterSrc={c.after}
                      beforeAlt={`${c.title} — before`}
                      afterAlt={`${c.title} — after`}
                    />
                    <p className="crowns-case-hint">
                      ⇄&nbsp; Drag the handle to compare
                    </p>
                  </div>

                  <p className="crowns-case-desc">{c.description}</p>

                  <ul className="crowns-procedure-tags">
                    {c.procedures.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            {/* Horizontal numbered process */}
            <div className="crowns-process">
              <div className="crowns-process-head">
                <span className="num">— How crowns work</span>
                <h2>From the first impression to the final fit</h2>
                <p>
                  Most porcelain crown cases follow the same four-step path —
                  whether we&apos;re replacing one tooth or rebuilding a full
                  arch.
                </p>
              </div>
              <ol className="crowns-process-list">
                {CROWN_STEPS.map((s) => (
                  <li key={s.n} className="crowns-process-step">
                    <span className="crowns-process-num">{s.n}</span>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Related procedures */}
            <div className="surgery-related">
              <span className="num">— Learn more</span>
              <h2>Related procedure pages</h2>
              <div className="surgery-related-grid">
                <Link
                  href="/procedures/restoration/crowns-caps"
                  className="surgery-related-card"
                >
                  <h3>Crowns &amp; Caps</h3>
                  <p>Materials, the fitting process, and how long a porcelain crown lasts.</p>
                  <span>Learn more →</span>
                </Link>
                <Link
                  href="/procedures/cosmetic-dentistry/cerec"
                  className="surgery-related-card"
                >
                  <h3>Same-Day CEREC Crowns</h3>
                  <p>Custom-milled in-office — no temporary, no second visit.</p>
                  <span>Learn more →</span>
                </Link>
                <Link
                  href="/procedures/restoration/dental-implants"
                  className="surgery-related-card"
                >
                  <h3>Dental Implants</h3>
                  <p>Titanium implants that anchor crowns and full-arch restorations.</p>
                  <span>Learn more →</span>
                </Link>
              </div>
            </div>

            <div className="surgery-cta">
              <h2>Wondering if a crown is the right call for your tooth?</h2>
              <p>
                Book a complimentary restorative consultation. We&apos;ll
                evaluate the tooth, walk through whether a porcelain crown,
                onlay, or implant is the best fit, and put together a plan
                tailored to your goals.
              </p>
              <div className="surgery-cta-actions">
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
          { name: "Restorations", url: "/resources/restorations" },
          { name: "Crowns (Caps)", url: "/resources/restorations/crowns-caps" },
        ]}
      />
</>
  );
}
