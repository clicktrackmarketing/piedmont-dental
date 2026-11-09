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
  title: "Composite Fillings — Before & After",
  description:
    "Real composite filling case studies — tooth-colored restorations that blend invisibly with natural teeth.",
  alternates: { canonical: "/smile-gallery/composite-fillings" },
  openGraph: {
    title: "Composite Fillings — Before & After | Piedmont Dental By Design",
    description:
      "Real patient composite filling results — invisible repairs that blend with natural teeth.",
    url: "https://piedmontdentalbydesign.com/smile-gallery/composite-fillings",
    type: "article",
  },
};

const APPLICATIONS = [
  {
    title: "Cavities",
    body: "The most common use — composite replaces decayed tooth structure with a tooth-colored material that bonds to the natural tooth.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 6.5-7 11-7 11z" />
      </svg>
    ),
  },
  {
    title: "Chipped Teeth",
    body: "A small chip or fracture can be rebuilt in a single visit — sculpted, shaded, and polished to look like the original tooth.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l4 6-4 12-4-12 4-6z" />
      </svg>
    ),
  },
  {
    title: "Closing Small Gaps",
    body: "Minor gaps between teeth can be closed without orthodontics — composite is built up on the sides of each tooth.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 4v16M16 4v16" />
        <path d="M4 12h16" />
      </svg>
    ),
  },
  {
    title: "Reshaping & Contouring",
    body: "Subtle reshaping — a worn edge, an uneven tooth — can be added back with composite for a more balanced smile.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21l9-18 9 18" />
        <path d="M7 14h10" />
      </svg>
    ),
  },
];

const FACTS = [
  {
    stat: "1 visit",
    label: "Most composites placed in a single appointment.",
  },
  {
    stat: "Tooth-colored",
    label: "Shaded to match — virtually invisible to anyone but us.",
  },
  {
    stat: "Bonds directly",
    label: "Chemically bonds to tooth structure — no metal needed.",
  },
];

export default function CompositeFillingsGalleryPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <section className="resource-hero">
          <div className="resource-hero-inner">
            <div className="resource-hero-text">
              <Link href="/smile-gallery/other-procedures" className="post-hero-back">
                ← Back to Other Procedures
              </Link>
              <div className="num" style={{ marginTop: 12 }}>
                Smile Gallery · Composite Fillings
              </div>
              <h1 className="resource-hero-title">Composite Fillings</h1>
              <p className="resource-hero-description">
                Tooth-colored composite is the modern standard for repairing
                decay, rebuilding chips, and reshaping teeth — and unlike old
                silver fillings, the result is meant to disappear.
              </p>
            </div>
          </div>
        </section>

        <section className="cf-body">
          <div className="cf-inner">

            {/* Solo case spotlight — large slider front and center */}
            <article className="cf-spotlight">
              <header>
                <span className="num">i. — Patient case study</span>
                <h2>An invisible composite repair</h2>
                <p>
                  This patient&apos;s composite filling — shaded and polished
                  in our office — blends so naturally with the surrounding
                  tooth that it&apos;s impossible to tell where the
                  restoration begins.
                </p>
              </header>

              <div className="cf-spotlight-slider">
                <BeforeAfterSlider
                  beforeSrc="/img/composite-fillings/case-before.jpg"
                  afterSrc="/img/composite-fillings/case-after.jpg"
                  beforeAlt="Tooth before composite filling"
                  afterAlt="Restored smile after composite filling"
                />
                <p className="cf-spotlight-hint">
                  ⇄&nbsp; Drag the handle to compare before and after
                </p>
              </div>

              <div className="cf-spotlight-meta">
                <div>
                  <span className="cf-meta-label">Procedure</span>
                  <strong>Composite Filling</strong>
                </div>
                <div>
                  <span className="cf-meta-label">Visits</span>
                  <strong>1 appointment</strong>
                </div>
                <div>
                  <span className="cf-meta-label">Anesthesia</span>
                  <strong>Local only</strong>
                </div>
                <div className="cf-meta-consent" role="note">
                  <span className="cf-meta-label">Note</span>
                  <p>
                    Photo displayed with patient consent. Results vary by
                    case — schedule a consultation to discuss your options.
                  </p>
                </div>
              </div>
            </article>

            {/* Editorial 2-column article + sidebar */}
            <div className="cf-editorial">
              <article className="cf-editorial-article">
                <span className="num">ii. — Editorial</span>
                <h2>What composite fillings actually are</h2>
                <p>
                  A composite filling is a tooth-colored resin reinforced with
                  microscopic ceramic or glass particles. It&apos;s sculpted
                  directly onto your tooth in layers, then cured (hardened)
                  with a blue curing light — bonding chemically to the
                  surrounding tooth structure.
                </p>
                <p>
                  Unlike silver amalgam fillings, composite doesn&apos;t
                  require us to cut away healthy tooth structure to create a
                  mechanical lock. It bonds in place, which means smaller
                  preparation, more of your natural tooth preserved, and a
                  result that looks like the tooth was never touched.
                </p>
                <blockquote className="cf-pullquote">
                  &ldquo;Composite fillings don&apos;t announce themselves —
                  that&apos;s the whole point. When it&apos;s done right,
                  you forget which tooth had the work.&rdquo;
                </blockquote>
                <p>
                  The shade is chosen to match your surrounding teeth, and
                  the surface is polished to mimic the way natural enamel
                  catches light. For visible front teeth, this matters — and
                  it&apos;s where composite genuinely outperforms older
                  filling materials.
                </p>
              </article>
              <aside className="cf-editorial-side">
                <span className="cf-side-label">Key facts</span>
                <ul>
                  {FACTS.map((f) => (
                    <li key={f.label}>
                      <strong>{f.stat}</strong>
                      <span>{f.label}</span>
                    </li>
                  ))}
                </ul>
                <div className="cf-side-callout">
                  <span className="cf-side-callout-label">Quick win</span>
                  <p>
                    Most composite fillings — even for visible front teeth —
                    can be completed in a single appointment with no
                    follow-up needed.
                  </p>
                </div>
              </aside>
            </div>

            {/* Applications grid — 4-up icon tiles */}
            <div className="cf-applications">
              <header>
                <span className="num">iii. — Where composite shines</span>
                <h2>Where you&apos;d want a composite filling</h2>
                <p>
                  Composite is versatile — it solves a surprisingly wide
                  range of dental problems in a single visit.
                </p>
              </header>
              <div className="cf-applications-grid">
                {APPLICATIONS.map((a) => (
                  <div key={a.title} className="cf-application">
                    <span className="cf-application-icon" aria-hidden>
                      {a.icon}
                    </span>
                    <h3>{a.title}</h3>
                    <p>{a.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Composite vs amalgam mini comparison */}
            <div className="cf-vs">
              <header>
                <span className="num">iv. — Quick comparison</span>
                <h2>Composite vs. silver amalgam</h2>
              </header>
              <div className="cf-vs-grid">
                <div className="cf-vs-col cf-vs-col--win">
                  <span className="cf-vs-tag cf-vs-tag--teal">Composite</span>
                  <ul>
                    <li>Tooth-colored, virtually invisible</li>
                    <li>Bonds chemically — preserves tooth structure</li>
                    <li>Single visit, no follow-up</li>
                    <li>No metal exposure</li>
                    <li>Excellent for front and back teeth</li>
                  </ul>
                </div>
                <div className="cf-vs-col">
                  <span className="cf-vs-tag">Silver Amalgam</span>
                  <ul>
                    <li>Visible silver-grey color</li>
                    <li>Requires cutting healthy tooth for retention</li>
                    <li>Single visit, but appearance is permanent</li>
                    <li>Contains mercury alloy</li>
                    <li>Generally only used on rear teeth</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="cf-cta">
              <h2>Have a tooth that needs repair?</h2>
              <p>
                Get in touch and we&apos;ll evaluate the tooth, discuss
                whether composite is the right material, and complete the
                restoration in a single appointment when it makes sense.
              </p>
              <div className="cf-cta-actions">
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
          { name: "Smile Gallery", url: "/smile-gallery" },
          { name: "Composite Fillings", url: "/smile-gallery/composite-fillings" },
        ]}
      />
</>
  );
}
