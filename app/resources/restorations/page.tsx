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
  title: "Restorations",
  description:
    "Restorative dentistry — porcelain crowns, dental implants, dentures, composite fillings, and fixed bridges. All crafted to look and feel natural.",
  alternates: { canonical: "/resources/restorations" },
  openGraph: {
    title: "Restorations — Piedmont Dental By Design",
    description:
      "Crowns, implants, dentures, fillings, and bridges — restoring smiles with results that look and feel natural.",
    url: "https://piedmontdentalbydesign.com/resources/restorations",
    type: "article",
  },
};

type Category = {
  href: string;
  image: string;
  imageAlt: string;
  title: string;
  blurb: string;
  cta: string;
  size: "feature" | "regular";
};

const CATEGORIES: Category[] = [
  {
    href: "/procedures/restoration/dental-implants",
    image: "/img/restorations/implants.png",
    imageAlt: "Illustration of a dental implant in the jaw",
    title: "Dental Implants",
    blurb:
      "Titanium roots anchored into the jaw — the gold standard for replacing a single tooth, supporting a bridge, or stabilizing a full denture. Built to last decades.",
    cta: "Explore implants →",
    size: "feature",
  },
  {
    href: "/resources/restorations/crowns-caps",
    image: "/img/restorations/crowns.png",
    imageAlt: "Dental models used to plan crown and bridge work",
    title: "Crowns & Caps",
    blurb:
      "All-porcelain crowns crafted to match the rest of your smile — shape, color, and contour.",
    cta: "See case studies →",
    size: "regular",
  },
  {
    href: "/resources/restorations/dentures",
    image: "/img/restorations/dentures.png",
    imageAlt: "Modern dentures",
    title: "Dentures & Partials",
    blurb:
      "Full and partial dentures — often paired with implants for full chewing function.",
    cta: "See case studies →",
    size: "regular",
  },
  {
    href: "/procedures/restoration/composite-fillings",
    image: "/img/cosmetic/composite-filling-curing.jpg",
    imageAlt: "Composite filling restoration",
    title: "Composite Fillings",
    blurb:
      "Tooth-colored fillings that blend in invisibly — for cavities, chips, and small reshaping.",
    cta: "Learn more →",
    size: "regular",
  },
  {
    href: "/procedures/restoration/fixed-bridges",
    image: "/img/restorations/bridges.png",
    imageAlt: "Fixed dental bridge",
    title: "Fixed Bridges",
    blurb:
      "Permanently anchored prosthetics that span the gap left by missing teeth.",
    cta: "Learn more →",
    size: "regular",
  },
];

export default function RestorationsResourcePage() {
  const feature = CATEGORIES.find((c) => c.size === "feature")!;
  const regular = CATEGORIES.filter((c) => c.size === "regular");

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
              <h1 className="resource-hero-title">Restorations</h1>
              <p className="resource-hero-description">
                Restorative dentistry brings teeth back to full health,
                function, and appearance — whether that&apos;s a single
                porcelain crown, a custom denture, or full-mouth rehabilitation
                with implants. Here&apos;s an overview of what&apos;s possible.
              </p>
            </div>
          </div>
        </section>

        <section className="restorations-body">
          <div className="restorations-inner">

            {/* Stats / quick facts strip */}
            <div className="restorations-stats">
              <div>
                <strong>5+</strong>
                <span>Restoration disciplines under one roof</span>
              </div>
              <div>
                <strong>15–25 yrs</strong>
                <span>Expected lifespan of a porcelain crown</span>
              </div>
              <div>
                <strong>Same day</strong>
                <span>Possible with CEREC for many crowns</span>
              </div>
              <div>
                <strong>1 visit</strong>
                <span>Most fillings completed in a single appointment</span>
              </div>
            </div>

            {/* Category browse heading */}
            <header className="restorations-section-head">
              <span className="num">— Browse by category</span>
              <h2>What kind of restoration are you looking for?</h2>
              <p>
                Tap any category to read about the procedure or browse real
                before-and-after patient cases from the practice.
              </p>
            </header>

            {/* Asymmetric magazine grid */}
            <div className="restorations-grid">
              <Link
                href={feature.href}
                className="restorations-card restorations-card--feature"
              >
                <div className="restorations-card-image">
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt}
                    fill
                    sizes="(max-width: 720px) 100vw, (max-width: 1080px) 100vw, 720px"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
                <div className="restorations-card-body">
                  <span className="restorations-card-eyebrow">Featured</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.blurb}</p>
                  <span className="restorations-card-cta">{feature.cta}</span>
                </div>
              </Link>

              {regular.map((c) => (
                <Link
                  key={c.title}
                  href={c.href}
                  className="restorations-card"
                >
                  <div className="restorations-card-image">
                    <Image
                      src={c.image}
                      alt={c.imageAlt}
                      fill
                      sizes="(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 360px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="restorations-card-body">
                    <h3>{c.title}</h3>
                    <p>{c.blurb}</p>
                    <span className="restorations-card-cta">{c.cta}</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Three-up benefit strip */}
            <div className="restorations-benefits">
              <header>
                <span className="num">— Why patients choose us</span>
                <h2>Restorations crafted to last, designed to disappear</h2>
              </header>
              <div className="restorations-benefits-grid">
                <div className="restorations-benefit">
                  <span className="restorations-benefit-icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 6.5-7 11-7 11z" />
                    </svg>
                  </span>
                  <h3>Looks like your tooth</h3>
                  <p>
                    Every porcelain restoration is shaded to match the rest of
                    your smile — there should be no &ldquo;tell&rdquo; that
                    you&apos;ve had work done.
                  </p>
                </div>
                <div className="restorations-benefit">
                  <span className="restorations-benefit-icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 8v4l3 2" />
                    </svg>
                  </span>
                  <h3>Built to last</h3>
                  <p>
                    Materials we use today are dramatically more durable than
                    a decade ago — many crowns and implants outlast their
                    original timelines by years.
                  </p>
                </div>
                <div className="restorations-benefit">
                  <span className="restorations-benefit-icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 12h6l3-9 3 18 3-9h3" />
                    </svg>
                  </span>
                  <h3>Function first</h3>
                  <p>
                    Aesthetics matter — but so does how a restoration feels
                    when you bite, chew, and speak. We plan for both from the
                    first impression.
                  </p>
                </div>
              </div>
            </div>

            {/* Closing CTA */}
            <div className="restorations-cta">
              <h2>Not sure which restoration is right for you?</h2>
              <p>
                Book a complimentary restorative consultation — we&apos;ll
                evaluate the tooth (or teeth), talk through every realistic
                option, and put together a plan that fits your goals and
                timeline.
              </p>
              <div className="restorations-cta-actions">
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
        ]}
      />
</>
  );
}
