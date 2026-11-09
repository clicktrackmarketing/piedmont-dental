import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import AwardsStrip from "@/components/AwardsStrip";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";

import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
export const metadata: Metadata = {
  title: "Other Procedures — Smile Gallery",
  description:
    "Before-and-after results for porcelain crowns, dental implants, and composite fillings — real patient transformations across our restorative work.",
  alternates: { canonical: "/smile-gallery/other-procedures" },
  openGraph: {
    title: "Other Procedures — Smile Gallery | Piedmont Dental By Design",
    description:
      "Porcelain crowns, dental implants, and composite filling case studies.",
    url: "https://piedmontdentalbydesign.com/smile-gallery/other-procedures",
    type: "website",
  },
};

const SUB_GALLERIES = [
  {
    href: "/smile-gallery/porcelain-crowns-caps",
    image: "/img/crowns-caps/case2-after.jpg",
    title: "Porcelain Crowns (Caps)",
    blurb: "All-porcelain crowns matched to natural teeth — single tooth to full upper arch.",
    badge: "Multiple cases",
  },
  {
    href: "/smile-gallery/dental-implants",
    image: "/img/full-mouth/case2-after.jpg",
    title: "Dental Implants",
    blurb: "Single-tooth and multi-tooth implant restorations — permanent and natural-looking.",
    badge: "Multiple cases",
  },
  {
    href: "/smile-gallery/composite-fillings",
    image: "/img/cosmetic/composite-filling-curing.jpg",
    title: "Composite Fillings",
    blurb: "Tooth-colored composite for chips, gaps, and reshaping — invisible repairs.",
    badge: "Case study",
  },
];

type CrownCase = {
  id: string;
  before: string;
  after: string;
  title: string;
  procedures: string[];
  blurb: string;
};

const CROWN_CASES: CrownCase[] = [
  {
    id: "case-1",
    before: "/img/crowns-caps/case1-before.jpg",
    after: "/img/crowns-caps/case1-after.jpg",
    title: "Front-tooth crown replacement",
    procedures: ["Porcelain Crown"],
    blurb:
      "A poorly contoured front central crown replaced with an all-porcelain crown — properly matched to the gumline and surrounding teeth.",
  },
  {
    id: "case-3",
    before: "/img/crowns-caps/case2-before.jpg",
    after: "/img/crowns-caps/case2-after.jpg",
    title: "Single implant with crown",
    procedures: ["Implant", "Porcelain Crown"],
    blurb:
      "A single-tooth replacement of an upper central incisor — implant placed below, all-porcelain crown above.",
  },
  {
    id: "case-4",
    before: "/img/dentures/case1-before.jpg",
    after: "/img/dentures/case1-after.jpg",
    title: "Comprehensive rebuild",
    procedures: ["Crowns", "Implants", "Prosthetics"],
    blurb:
      "Significant tooth loss restored through a coordinated plan of implants, crowns, and prosthetic work.",
  },
  {
    id: "case-5",
    before: "/img/dentures/case2-before.jpg",
    after: "/img/dentures/case2-after.jpg",
    title: "Upper & lower arch rehabilitation",
    procedures: ["Implant-Denture", "Crowns"],
    blurb:
      "Upper denture supported by implants, plus lower implants and porcelain crowns — restored chewing, smile, and facial support.",
  },
];

export default function OtherProceduresGalleryPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <section className="resource-hero">
          <div className="resource-hero-inner">
            <div className="resource-hero-text">
              <Link href="/smile-gallery" className="post-hero-back">
                ← Back to gallery
              </Link>
              <div className="num" style={{ marginTop: 12 }}>
                Smile Gallery · Other Procedures
              </div>
              <h1 className="resource-hero-title">Other Procedures</h1>
              <p className="resource-hero-description">
                Beyond veneers and Invisalign®, our practice handles a wide
                range of restorative work — porcelain crowns, dental implants,
                composite fillings, and full-arch rehabilitations. Real
                patient transformations below.
              </p>
            </div>
          </div>
        </section>

        <section className="op-body">
          <div className="op-inner">

            {/* Sub-gallery navigation rail */}
            <nav className="op-subnav" aria-label="Browse sub-galleries">
              <header>
                <span className="num">i. — Sub-galleries</span>
                <h2>Browse by procedure</h2>
              </header>
              <div className="op-subnav-grid">
                {SUB_GALLERIES.map((s) => (
                  <Link key={s.href} href={s.href} className="op-subnav-card">
                    <div className="op-subnav-image">
                      <Image
                        src={s.image}
                        alt=""
                        fill
                        sizes="(max-width: 1080px) 100vw, 360px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="op-subnav-info">
                      <span className="op-subnav-badge">{s.badge}</span>
                      <h3>{s.title}</h3>
                      <p>{s.blurb}</p>
                      <span className="op-subnav-cta">View gallery →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </nav>

            <div className="surgery-consent" role="note">
              <span className="surgery-consent-tag">Note</span>
              <p>
                Patients depicted in these case studies have provided their
                consent to display their photos online. Results vary by case —
                schedule a consultation to discuss what&apos;s possible for
                your smile.
              </p>
            </div>

            {/* Featured "Case Spotlight" — the 8-crown upper arch case */}
            <article className="op-spotlight">
              <header className="op-spotlight-head">
                <div>
                  <span className="num">ii. — Case spotlight</span>
                  <h2>Eight all-porcelain crowns, one harmonious smile</h2>
                </div>
                <span className="op-spotlight-tag">Porcelain Crowns</span>
              </header>

              <div className="op-spotlight-layout">
                <div className="op-spotlight-slider">
                  <BeforeAfterSlider
                    beforeSrc="/img/other-procedures/upper-arch-before.jpg"
                    afterSrc="/img/other-procedures/upper-arch-after.jpg"
                    beforeAlt="Upper arch with staining, wear, and recession — before"
                    afterAlt="Eight all-porcelain crowns restoring uniform smile — after"
                  />
                  <p className="op-spotlight-hint">
                    ⇄&nbsp; Drag to compare
                  </p>
                </div>
                <div className="op-spotlight-detail">
                  <div className="op-detail-block">
                    <span className="op-detail-label">Before</span>
                    <p>
                      Multiple stained, worn, and misaligned upper anterior
                      teeth with visible gum recession — affecting both
                      appearance and confidence.
                    </p>
                  </div>
                  <div className="op-detail-block op-detail-block--after">
                    <span className="op-detail-label">After</span>
                    <p>
                      Eight uniform, properly proportioned porcelain crowns —
                      restoring the upper arch with a harmonious smile line,
                      improved color, and natural translucence.
                    </p>
                  </div>
                  <ul className="op-detail-procedures">
                    <li>Porcelain Crowns (×8)</li>
                    <li>Upper Arch</li>
                    <li>Color Matching</li>
                  </ul>
                </div>
              </div>
            </article>

            {/* Horizontal scroll-snap carousel — more cases */}
            <div className="op-more">
              <header>
                <span className="num">iii. — More case studies</span>
                <h2>Additional crown transformations</h2>
                <p>
                  Single-tooth restorations to full-mouth rehabilitations.
                  Swipe to scroll →
                </p>
              </header>
              <div className="op-carousel" role="region" aria-label="More case studies, scroll horizontally">
                {CROWN_CASES.map((c) => (
                  <article key={c.id} className="op-carousel-card">
                    <div className="op-carousel-slider">
                      <BeforeAfterSlider
                        beforeSrc={c.before}
                        afterSrc={c.after}
                        beforeAlt={`${c.title} — before`}
                        afterAlt={`${c.title} — after`}
                      />
                    </div>
                    <h3>{c.title}</h3>
                    <p>{c.blurb}</p>
                    <ul className="op-carousel-tags">
                      {c.procedures.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>

            <div className="op-cta">
              <h2>Want to see what&apos;s possible for your teeth?</h2>
              <p>
                Book a complimentary consultation. Dr. Martenson or
                Dr. Ma will evaluate your teeth, walk through every realistic option, and
                map out a plan that fits your goals.
              </p>
              <div className="op-cta-actions">
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
          { name: "Other Procedures", url: "/smile-gallery/other-procedures" },
        ]}
      />
</>
  );
}
