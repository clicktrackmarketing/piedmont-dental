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
  title: "Dental Implants — Before & After",
  description:
    "Real implant cases from Dr. Martenson and Dr. Ma — single-tooth replacements, full-arch rehabilitation and implant-supported restorations.",
  alternates: { canonical: "/resources/dental-implants" },
  openGraph: {
    title: "Dental Implants — Before & After | Piedmont Dental By Design",
    description:
      "Real patient dental implant transformations — single tooth and full-arch cases.",
    url: "https://piedmontdentalbydesign.com/resources/dental-implants",
    type: "article",
  },
};

const PHASES = [
  {
    n: "Phase 01",
    title: "Placement",
    body: "A titanium post is precisely positioned in the jawbone where the tooth root used to be. Done in-office under local anesthetic — most patients are surprised by how routine it feels.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v14" />
        <path d="M8 7h8" />
        <path d="M9 17l3 4 3-4" />
      </svg>
    ),
  },
  {
    n: "Phase 02",
    title: "Osseointegration",
    body: "Over the next 3–6 months, bone naturally fuses around the implant — a process called osseointegration. This is what gives implants their long-term stability.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    n: "Phase 03",
    title: "Restoration",
    body: "Once the implant has integrated, a custom-shaded porcelain crown, bridge, or denture is permanently attached. The result looks and functions just like a natural tooth.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 17c2-2 6-2 8 0s6 2 8 0" />
        <path d="M8 13V7M12 13V5M16 13V7" />
      </svg>
    ),
  },
];

type ImplantCase = {
  id: string;
  number: string;
  title: string;
  before: string;
  after: string;
  procedures: string[];
  blurb: string;
};

const CASES: ImplantCase[] = [
  {
    id: "case-1",
    number: "01",
    title: "Single-tooth implant restoration",
    before: "/img/crowns-caps/case2-before.jpg",
    after: "/img/crowns-caps/case2-after.jpg",
    procedures: ["Dental Implants", "Porcelain Crown"],
    blurb:
      "A single missing tooth replaced with an implant and porcelain crown — the kind of fix that&apos;s invisible to anyone but the patient and dentist.",
  },
  {
    id: "case-2",
    number: "02",
    title: "Multi-tooth implant rehabilitation",
    before: "/img/full-mouth/case3-before.jpg",
    after: "/img/full-mouth/case3-after.jpg",
    procedures: ["Dental Implants", "Full Mouth Restoration"],
    blurb:
      "Multiple failing teeth replaced with coordinated implants and porcelain restorations — a transformation that restores chewing, speech, and confidence.",
  },
  {
    id: "case-3",
    number: "03",
    title: "Implant-supported full restoration",
    before: "/img/full-mouth/case4-before.jpg",
    after: "/img/full-mouth/case4-after.jpg",
    procedures: ["Dental Implants", "Full Mouth Restoration"],
    blurb:
      "Years of wear addressed with a coordinated implant-based plan. A result that should last decades and preserve underlying bone health.",
  },
];

const ANATOMY = [
  {
    label: "A",
    title: "Titanium Implant",
    body: "The post itself — biocompatible titanium that fuses with the jawbone over months. Acts as a permanent artificial tooth root.",
  },
  {
    label: "B",
    title: "Abutment",
    body: "The small connector piece that sits on top of the implant and holds the visible crown. Hidden under the gumline.",
  },
  {
    label: "C",
    title: "Porcelain Crown",
    body: "The visible part — custom-shaded to match surrounding teeth. The only piece anyone else sees.",
  },
];

const BENEFITS = [
  {
    stat: "95%+",
    label: "Long-term success rate",
    body: "When placed in healthy bone with good aftercare, dental implants have one of the highest success rates of any restorative procedure.",
  },
  {
    stat: "Lifelong",
    label: "Potential lifespan",
    body: "With proper maintenance, an implant can last a lifetime — unlike bridges and dentures, which typically need replacement every 10–15 years.",
  },
  {
    stat: "Preserves",
    label: "Underlying bone",
    body: "Implants stimulate the jawbone the way natural roots do — preventing the bone loss that follows missing teeth.",
  },
  {
    stat: "Natural feel",
    label: "Bite and chew",
    body: "Anchored directly to bone, implants restore close to 100% of natural chewing strength — bridges and dentures fall short here.",
  },
];

export default function DentalImplantsResultsPage() {
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
              <h1 className="resource-hero-title">Dental Implants</h1>
              <p className="resource-hero-description">
                A dental implant replaces a missing tooth from the root up —
                titanium fused to bone, topped with a porcelain crown
                that&apos;s indistinguishable from your natural teeth. Real
                patient cases from Dr. Martenson and Dr. Ma below.
              </p>
            </div>
          </div>
        </section>

        <section className="implants-body">
          <div className="implants-inner">

            {/* 3-phase process — large stepper cards */}
            <div className="implants-phases">
              <header>
                <span className="num">— How a dental implant works</span>
                <h2>Three phases, one permanent result</h2>
                <p>
                  The process is more straightforward than most patients
                  expect. Here&apos;s what to expect from placement to final
                  crown.
                </p>
              </header>
              <ol className="implants-phase-list">
                {PHASES.map((p, i) => (
                  <li key={p.title} className="implants-phase">
                    <div className="implants-phase-head">
                      <span className="implants-phase-num">
                        <span className="implants-phase-icon">{p.icon}</span>
                        {p.n}
                      </span>
                      {i < PHASES.length - 1 && (
                        <span className="implants-phase-arrow" aria-hidden>→</span>
                      )}
                    </div>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </li>
                ))}
              </ol>
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

            {/* 3-up case grid */}
            <div className="implants-cases">
              <header>
                <span className="num">— Patient case studies</span>
                <h2>Real dental implant transformations</h2>
              </header>
              <div className="implants-case-grid">
                {CASES.map((c) => (
                  <article key={c.id} className="implants-case">
                    <div className="implants-case-num">{c.number}</div>
                    <div className="implants-case-frame">
                      <BeforeAfterSlider
                        beforeSrc={c.before}
                        afterSrc={c.after}
                        beforeAlt={`${c.title} — before`}
                        afterAlt={`${c.title} — after`}
                      />
                    </div>
                    <h3>{c.title}</h3>
                    <p dangerouslySetInnerHTML={{ __html: c.blurb }} />
                    <ul className="implants-case-tags">
                      {c.procedures.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>

            {/* Anatomy strip — 3 labeled parts */}
            <div className="implants-anatomy">
              <header>
                <span className="num">— Anatomy of a dental implant</span>
                <h2>Three parts working together</h2>
                <p>
                  An implant isn&apos;t a single piece — it&apos;s a small
                  system of three components, each engineered to last decades.
                </p>
              </header>
              <div className="implants-anatomy-grid">
                {ANATOMY.map((part) => (
                  <div key={part.label} className="implants-anatomy-card">
                    <span className="implants-anatomy-label">{part.label}</span>
                    <h3>{part.title}</h3>
                    <p>{part.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits grid — stat-led tiles */}
            <div className="implants-benefits">
              <header>
                <span className="num">— Why patients choose implants</span>
                <h2>What makes implants the gold standard</h2>
              </header>
              <div className="implants-benefits-grid">
                {BENEFITS.map((b) => (
                  <div key={b.label} className="implants-benefit">
                    <strong>{b.stat}</strong>
                    <span className="implants-benefit-label">{b.label}</span>
                    <p>{b.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related */}
            <div className="surgery-related">
              <span className="num">— Learn more</span>
              <h2>Related restoration options</h2>
              <div className="surgery-related-grid">
                <Link
                  href="/procedures/restoration/dental-implants"
                  className="surgery-related-card"
                >
                  <h3>Dental Implants procedure</h3>
                  <p>The full procedure detail — what to expect at every step from consultation through final crown.</p>
                  <span>Learn more →</span>
                </Link>
                <Link
                  href="/resources/restorations/crowns-caps"
                  className="surgery-related-card"
                >
                  <h3>Crowns & Caps results</h3>
                  <p>Interactive before/after cases for the porcelain crowns that often top off implants.</p>
                  <span>See cases →</span>
                </Link>
                <Link
                  href="/resources/full-mouth-restoration"
                  className="surgery-related-card"
                >
                  <h3>Full Mouth Restoration</h3>
                  <p>Comprehensive cases combining implants with crowns, veneers, and prosthetic work.</p>
                  <span>See cases →</span>
                </Link>
              </div>
            </div>

            <div className="implants-cta">
              <h2>Wondering if implants are the right call for you?</h2>
              <p>
                Book a complimentary implant consultation. Dr. Martenson or
                Dr. Ma will evaluate the site, talk through realistic timelines and
                alternatives, and put together a plan that fits your goals
                and budget.
              </p>
              <div className="implants-cta-actions">
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
          { name: "Dental Implants", url: "/resources/dental-implants" },
        ]}
      />
</>
  );
}
