import Image from "next/image";

/**
 * Homepage hero — rotating office stills with a fixed text overlay.
 * Replaces the previous muted video at the client's request:
 *   "Maybe some of the office shots can be stills that rotate through
 *    in the background vs. playing as a video?"
 */
const HERO_IMAGES = [
  {
    src: "/img/hero/office-front.jpg",
    alt: "Front office reception at Piedmont Dental By Design",
  },
  {
    src: "/img/hero/office-waiting.jpg",
    alt: "Waiting room at Piedmont Dental By Design",
  },
  {
    src: "/img/hero/office-3.jpg",
    alt: "Piedmont Dental By Design at 1331 Grand Avenue, Piedmont",
  },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        {HERO_IMAGES.map((img, i) => (
          <div key={img.src} className={`hero-img hero-img-${i + 1}`}>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
        <div className="hero-overlay" />
      </div>

      <div className="hero-content">
        <div className="hero-eyebrow hero-eyebrow--sentence">
          Caring for patients across Piedmont, Oakland, Montclair and the
          greater East Bay.
        </div>
        <h1 className="hero-headline">
          Cosmetic, Restorative &amp; Preventive <em>Dentistry</em>
          <br />
          in Piedmont Since 1996.
        </h1>
        <p className="hero-sub">
          Personalized cosmetic, restorative and preventative oral care on Grand
          Avenue in Piedmont. Dr. Jill Martenson, Dr. David Ma and their team
          have been creating sparkling smiles for 30 years. Accepting new
          patients!
        </p>
        <div className="hero-actions">
          <a href="/contact" className="btn btn-teal btn-lg">
            Contact us →
          </a>
          <a href="#cosmetic" className="btn btn-ghost-light btn-lg">
            See our work
          </a>
        </div>
        <div className="hero-reassure">
          <span className="stars">★★★★★</span>
          <span>
            <b>4.9</b> · 350+ Google reviews
          </span>
          <span className="dot" />
          <span>
            Best of the East Bay <b>2024, 2025 &amp; 2026</b>
          </span>
          <span className="dot" />
          <span>Now accepting new patients</span>
        </div>
      </div>

      <a
        href="#awards"
        className="hero-scroll"
        aria-label="Scroll to next section"
      >
        <span>Scroll</span>
        <span className="line" />
      </a>
    </section>
  );
}
