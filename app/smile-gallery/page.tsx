import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import AwardsStrip from "@/components/AwardsStrip";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Smile Gallery",
  description:
    "Real before-and-after photographs from Piedmont Dental By Design patients — across cosmetic, restorative, and orthodontic treatments.",
  alternates: { canonical: "/smile-gallery" },
  openGraph: {
    title: "Smile Gallery — Piedmont Dental By Design",
    description:
      "Real patient transformations from cosmetic, restorative, and orthodontic treatments.",
    url: "https://piedmontdentalbydesign.com/smile-gallery",
    type: "website",
  },
};

const MOSAIC = [
  { src: "/img/cases/veneers/case1-after.jpg", alt: "Porcelain veneers — after", size: "tall" },
  { src: "/img/cases/crowns/case1-after.jpg", alt: "Porcelain crown — after", size: "wide" },
  { src: "/img/cases/invisalign/case1-after.jpg", alt: "Invisalign® — after", size: "square" },
  { src: "/img/full-mouth/case3-after.jpg", alt: "Full mouth restoration — after", size: "square" },
  { src: "/img/surgery/case2-after.jpg", alt: "Cosmetic surgery — after", size: "wide" },
  { src: "/img/dentures/case2-after.jpg", alt: "Implant denture — after", size: "tall" },
];

type GalleryCard = {
  href: string;
  image: string;
  imageAlt: string;
  title: string;
  blurb: string;
  count: string;
  featured?: boolean;
};

const GALLERIES: GalleryCard[] = [
  {
    href: "/resources/porcelain-veneers",
    image: "/img/cases/veneers/case1-after.jpg",
    imageAlt: "Porcelain veneer case",
    title: "Porcelain Veneers",
    blurb: "Thin custom shells that refine shape, color, and the way light catches the smile.",
    count: "5 cases",
    featured: true,
  },
  {
    href: "/resources/cosmetic-bonding",
    image: "/img/cases/bonding/case1-after.jpg",
    imageAlt: "Cosmetic bonding case",
    title: "Cosmetic Bonding",
    blurb: "Chips, gaps and worn edges rebuilt in tooth-coloured composite — usually in one visit.",
    count: "2 cases",
  },
  {
    href: "/resources/invisalign-results",
    image: "/img/cases/invisalign/case1-after.jpg",
    imageAlt: "Invisalign® clear aligners case",
    title: "Invisalign®",
    blurb: "Clear aligners that straighten teeth without metal — comparable results to braces.",
    count: "2 cases",
  },
  {
    href: "/resources/restorations/crowns-caps",
    image: "/img/cases/crowns/case1-after.jpg",
    imageAlt: "Porcelain crown case",
    title: "Porcelain Crowns",
    blurb: "All-porcelain crowns shaded and contoured to match the rest of your smile.",
    count: "4 cases",
  },
  {
    href: "/resources/full-mouth-restoration",
    image: "/img/full-mouth/case3-after.jpg",
    imageAlt: "Full mouth restoration case",
    title: "Full Mouth Restoration",
    blurb: "Coordinated implants, crowns, and prosthetics for total smile and function rebuilds.",
    count: "4 cases",
  },
  {
    href: "/resources/dental-implants",
    image: "/img/full-mouth/case2-after.jpg",
    imageAlt: "Dental implant case",
    title: "Dental Implants",
    blurb: "Titanium roots anchoring permanent crowns — the gold standard for replacing teeth.",
    count: "3 cases",
  },
  {
    href: "/resources/restorations/dentures",
    image: "/img/dentures/case2-after.jpg",
    imageAlt: "Implant-supported denture case",
    title: "Dentures & Partials",
    blurb: "Full and partial dentures, often paired with implants for full chewing function.",
    count: "2 cases",
  },
  {
    href: "/resources/surgery",
    image: "/img/surgery/case2-after.jpg",
    imageAlt: "Gum surgery + veneers case",
    title: "Surgery",
    blurb: "Minor in-office gum surgery — combined with bonding or veneers for the final result.",
    count: "2 cases",
  },
  {
    href: "/smile-gallery/composite-fillings",
    image: "/img/cosmetic/bonding.png",
    imageAlt: "Composite filling case",
    title: "Composite Fillings",
    blurb: "Tooth-colored fillings that blend invisibly — for chips, decay, and small reshaping.",
    count: "Multiple cases",
  },
];

export default function SmileGalleryHubPage() {
  const feature = GALLERIES.find((g) => g.featured)!;
  const rest = GALLERIES.filter((g) => !g.featured);

  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        {/* Dark hero with mosaic preview */}
        <section className="sg-hero">
          <div className="sg-hero-bg" aria-hidden />
          <div className="sg-hero-inner">
            <div className="sg-hero-text">
              <Link href="/" className="post-hero-back">
                ← Back to home
              </Link>
              <div className="num">— Smile Gallery</div>
              <h1>
                Real patients.{" "}
                <em>Real results.</em>
              </h1>
              <p>
                Browse before-and-after photographs from our patients across
                cosmetic, restorative, and orthodontic treatments. Every photo
                is from a Piedmont Dental By Design patient who consented to
                share their result.
              </p>
              <div className="sg-hero-actions">
                <a href="#galleries" className="btn btn-primary btn-lg">
                  Browse galleries →
                </a>
                <Link href="/contact" className="btn btn-ghost-light btn-lg">
                  Contact us
                </Link>
              </div>
            </div>

            <div className="sg-mosaic" aria-hidden>
              {MOSAIC.map((m, i) => (
                <div
                  key={i}
                  className={`sg-mosaic-tile sg-mosaic-tile--${m.size}`}
                >
                  <Image
                    src={m.src}
                    alt=""
                    fill
                    sizes="(max-width: 1080px) 50vw, 240px"
                    style={{ objectFit: "cover" }}
                    priority={i < 3}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Consent note + reflection prompt */}
        <section className="sg-intro">
          <div className="sg-intro-inner">
            <div className="sg-intro-prompt">
              <span className="num">i. — A small invitation</span>
              <h2>How do you feel about your smile?</h2>
              <p>
                Many people hesitate to laugh or smile freely because
                they&apos;re self-conscious about their teeth. Before browsing
                the gallery, take a moment for yourself — find a mirror, smile
                as wide as you can, and ask:
              </p>
              <ol className="sg-intro-list">
                <li>How does my smile make me <em>feel</em> about myself?</li>
                <li>What aspects of my smile do I wish to enhance?</li>
                <li>How might a more confident smile change my interactions with others?</li>
              </ol>
              <p className="sg-intro-close">
                Your smile is a meaningful part of who you are — and
                you&apos;re welcome to bring those answers to your next visit.
              </p>
            </div>
            <aside className="sg-intro-note" role="note">
              <span className="sg-intro-note-label">A note on these photos</span>
              <p>
                Every patient depicted in these case studies has provided
                their consent to display their photos online. Results vary by
                case — schedule a consultation to discuss what&apos;s
                possible for your smile.
              </p>
            </aside>
          </div>
        </section>

        {/* Galleries grid */}
        <section className="sg-galleries" id="galleries">
          <div className="sg-galleries-inner">
            <header>
              <span className="num">ii. — Browse the galleries</span>
              <h2>
                Treatments with <em>before & after</em> photography
              </h2>
              <p>
                {GALLERIES.length} galleries across the procedures we perform.
                Tap any to see real patient outcomes with drag-to-compare
                sliders.
              </p>
            </header>

            {/* Featured gallery */}
            <Link
              href={feature.href}
              className="sg-gallery-card sg-gallery-card--feature"
            >
              <div className="sg-gallery-image">
                <Image
                  src={feature.image}
                  alt={feature.imageAlt}
                  fill
                  sizes="(max-width: 1080px) 100vw, 1080px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="sg-gallery-overlay">
                <span className="sg-gallery-badge">Featured</span>
                <span className="sg-gallery-count">{feature.count}</span>
                <h3>{feature.title}</h3>
                <p>{feature.blurb}</p>
                <span className="sg-gallery-cta">View gallery →</span>
              </div>
            </Link>

            {/* 3-col grid of remaining galleries */}
            <div className="sg-gallery-grid">
              {rest.map((g) => (
                <Link key={g.title} href={g.href} className="sg-gallery-card">
                  <div className="sg-gallery-image">
                    <Image
                      src={g.image}
                      alt={g.imageAlt}
                      fill
                      sizes="(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 360px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="sg-gallery-overlay">
                    <span className="sg-gallery-count">{g.count}</span>
                    <h3>{g.title}</h3>
                    <p>{g.blurb}</p>
                    <span className="sg-gallery-cta">View gallery →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="sg-cta-section">
          <div className="sg-cta-inner">
            <div className="sg-cta">
              <h2>
                Imagining your own <em>before and after?</em>
              </h2>
              <p>
                Book a complimentary consultation. We&apos;ll evaluate your
                smile, talk through every realistic option, and help you
                picture what&apos;s possible — no pressure, no obligation.
              </p>
              <div className="sg-cta-actions">
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
    </>
  );
}
