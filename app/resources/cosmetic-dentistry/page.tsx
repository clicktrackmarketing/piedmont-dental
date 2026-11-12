import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import AwardsStrip from "@/components/AwardsStrip";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";

import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
export const metadata: Metadata = {
  title: "Cosmetic Dentistry",
  description:
    "Cosmetic dentistry — porcelain veneers, professional whitening, Invisalign®, CEREC same-day crowns, and more. Real patient results and procedure details.",
  alternates: { canonical: "/resources/cosmetic-dentistry" },
  openGraph: {
    title: "Cosmetic Dentistry — Piedmont Dental By Design",
    description:
      "Veneers, whitening, Invisalign®, CEREC crowns, gum reshaping, and composite bonding — every cosmetic option, explained.",
    url: "https://piedmontdentalbydesign.com/resources/cosmetic-dentistry",
    type: "article",
  },
};

type Procedure = {
  href: string;
  image: string;
  imageAlt: string;
  badge?: string;
  title: string;
  tag: string;
  blurb: string;
  cta: string;
};

const PROCEDURES: Procedure[] = [
  {
    href: "/resources/porcelain-veneers",
    image: "/img/cosmetic/veneers.jpg",
    imageAlt: "Porcelain veneers — bright, natural smile",
    badge: "Most popular",
    title: "Porcelain Veneers",
    tag: "Refinement",
    blurb:
      "Thin custom shells crafted to refine shape, color, and the way light catches your smile — designed to look completely natural.",
    cta: "See 5 case studies →",
  },
  {
    href: "/resources/invisalign-results",
    image: "/img/cosmetic/invisalign.jpg",
    imageAlt: "Clear Invisalign® aligner",
    title: "Invisalign®",
    tag: "Alignment",
    blurb:
      "Clear, removable aligners that straighten teeth without metal — corrects crowding, gaps, crossbites, overbites, and underbites.",
    cta: "See results →",
  },
  {
    href: "/procedures/cosmetic-dentistry/tooth-whitening",
    image: "/img/cosmetic/whitening.webp",
    imageAlt: "Bright, white smile after professional whitening",
    title: "Professional Whitening",
    tag: "Brightening",
    blurb:
      "In-office whitening that lifts years of stain in a single visit — plus take-home options to maintain your results.",
    cta: "Learn more →",
  },
  {
    href: "/procedures/cosmetic-dentistry/cerec",
    image: "/img/cosmetic/cerec.jpg",
    imageAlt: "CEREC same-day crown technology",
    title: "CEREC® Same-Day Crowns",
    tag: "Restoration",
    blurb:
      "Custom porcelain crowns milled in-office and placed the same day — no temporary, no second visit, no waiting weeks.",
    cta: "Learn more →",
  },
  {
    href: "/resources/gummy-smile",
    image: "/img/cosmetic/gum-reshaping.png",
    imageAlt: "Woman with a balanced, confident smile",
    title: "Gum Reshaping",
    tag: "Gum Line",
    blurb:
      "Cosmetic contouring or surgical reshaping of the gum line — for “gummy smiles” or asymmetry between teeth.",
    cta: "Learn more →",
  },
  {
    href: "/resources/cosmetic-bonding",
    image: "/img/cosmetic/composite-filling-curing.jpg",
    imageAlt: "Composite bonding restoration",
    title: "Composite Bonding",
    tag: "Quick Fix",
    blurb:
      "Tooth-colored composite for chips, gaps, and small reshaping — often done in a single visit with no anesthesia.",
    cta: "Learn more →",
  },
];

const PHILOSOPHY = [
  {
    title: "Natural over noticeable",
    body: "Cosmetic work should make your smile look like a better version of itself — not like dental work. Every shade and shape is matched to you.",
  },
  {
    title: "Conservative first",
    body: "We start with the least invasive option that achieves your goal — whitening before veneers, bonding before crowns. Only escalate when it makes sense.",
  },
  {
    title: "Built to last",
    body: "Materials matter. We use porcelains and resins that hold their color, resist wear, and let you forget you ever had work done.",
  },
];

export default function CosmeticDentistryPage() {
  const featured = PROCEDURES.slice(0, 1);
  const rest = PROCEDURES.slice(1);

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
                Patient Resources
              </div>
              <h1 className="resource-hero-title">Cosmetic Dentistry</h1>
              <p className="resource-hero-description">
                Cosmetic dentistry is the part of our practice that exists for
                one reason — to help patients love their smile. From a single
                shade of whitening to a full porcelain makeover, here&apos;s
                every cosmetic option we offer.
              </p>
            </div>
          </div>
        </section>

        <section className="cosmetic-body">
          <div className="cosmetic-inner">

            {/* Featured overlay tile */}
            <div className="cosmetic-feature">
              <Link
                href={featured[0].href}
                className="cosmetic-tile cosmetic-tile--feature"
              >
                <div className="cosmetic-tile-image">
                  <Image
                    src={featured[0].image}
                    alt={featured[0].imageAlt}
                    fill
                    sizes="(max-width: 1080px) 100vw, 1080px"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
                <div className="cosmetic-tile-overlay">
                  {featured[0].badge && (
                    <span className="cosmetic-tile-badge">
                      {featured[0].badge}
                    </span>
                  )}
                  <span className="cosmetic-tile-tag">{featured[0].tag}</span>
                  <h2>{featured[0].title}</h2>
                  <p>{featured[0].blurb}</p>
                  <span className="cosmetic-tile-cta">{featured[0].cta}</span>
                </div>
              </Link>
            </div>

            {/* 5 procedure tiles in a clean 3-col grid (wraps to row of 2) */}
            <div className="cosmetic-grid">
              {rest.map((p) => (
                <Link
                  key={p.title}
                  href={p.href}
                  className="cosmetic-tile"
                >
                  <div className="cosmetic-tile-image">
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      sizes="(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 360px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="cosmetic-tile-overlay">
                    <span className="cosmetic-tile-tag">{p.tag}</span>
                    <h3>{p.title}</h3>
                    <p dangerouslySetInnerHTML={{ __html: p.blurb }} />
                    <span className="cosmetic-tile-cta">{p.cta}</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Philosophy / approach */}
            <div className="cosmetic-philosophy">
              <header>
                <span className="num">— Our approach</span>
                <h2>What we believe about cosmetic work</h2>
                <p>
                  Three principles guide every cosmetic case at Piedmont
                  Dental, whether it&apos;s a single composite or a full smile
                  redesign.
                </p>
              </header>
              <div className="cosmetic-philosophy-grid">
                {PHILOSOPHY.map((p, i) => (
                  <div key={p.title} className="cosmetic-principle">
                    <span className="cosmetic-principle-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Where to next */}
            <div className="cosmetic-explore">
              <header>
                <span className="num">— Browse the gallery</span>
                <h2>See more cosmetic cases</h2>
                <p>
                  Curious what real cosmetic transformations look like? Our
                  galleries show before-and-after results from actual patients.
                </p>
              </header>
              <div className="cosmetic-explore-grid">
                <Link
                  href="/resources/porcelain-veneers"
                  className="cosmetic-explore-card"
                >
                  <span className="cosmetic-explore-eyebrow">Gallery</span>
                  <h3>Porcelain Veneer Cases</h3>
                  <p>Five real patient transformations with drag-to-compare sliders and case-specific notes.</p>
                  <span>View gallery →</span>
                </Link>
                <Link
                  href="/resources/invisalign-results"
                  className="cosmetic-explore-card"
                >
                  <span className="cosmetic-explore-eyebrow">Gallery</span>
                  <h3>Invisalign® Results</h3>
                  <p>Before-and-after smile transformations using clear aligners — plus a vs-braces comparison.</p>
                  <span>View gallery →</span>
                </Link>
                <Link
                  href="/resources/smile-analysis"
                  className="cosmetic-explore-card"
                >
                  <span className="cosmetic-explore-eyebrow">Self-assessment</span>
                  <h3>Smile Analysis Quiz</h3>
                  <p>17 quick questions to evaluate your smile — we&apos;ll reply with a personalized response.</p>
                  <span>Take the quiz →</span>
                </Link>
              </div>
            </div>

            {/* Closing CTA */}
            <div className="cosmetic-cta">
              <h2>Wondering which cosmetic option is right for you?</h2>
              <p>
                Book a complimentary cosmetic consultation. Dr. Martenson
                or Dr. Ma will walk through every realistic option, mock up what your
                smile could look like, and put together a plan tailored to
                your goals.
              </p>
              <div className="cosmetic-cta-actions">
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
          { name: "Cosmetic Dentistry", url: "/resources/cosmetic-dentistry" },
        ]}
      />
</>
  );
}
