import Image from "next/image";

type Tile = {
  num: string;
  category: string;
  title: string;
  caption: string;
  href: string;
  image: string;
  alt: string;
};

const tiles: Tile[] = [
  {
    num: "01",
    category: "Cosmetic",
    title: "Porcelain veneers",
    caption: "Hand-shaped, color-matched in person",
    href: "/procedures/cosmetic-dentistry/porcelain-veneers",
    image: "/img/home-services/porcelain-veneers.jpg",
    alt: "Close-up of a polished smile after veneer treatment",
  },
  {
    num: "02",
    category: "Cosmetic",
    title: "Teeth whitening",
    caption: "In-office and take-home treatments",
    href: "/procedures/cosmetic-dentistry/tooth-whitening",
    image: "/img/home-services/tooth-whitening.jpg",
    alt: "Patient with bright, naturally white teeth smiling",
  },
  {
    num: "03",
    category: "Cosmetic",
    title: "Invisalign®",
    caption: "Clear aligners, planned in 3D",
    href: "/procedures/cosmetic-dentistry/invisalign",
    image: "/img/home-services/invisalign.jpg",
    alt: "Clear Invisalign® aligners",
  },
  {
    num: "04",
    category: "Restorative",
    title: "Dental implants",
    caption: "Replace missing teeth with a permanent fix",
    href: "/procedures/restoration/dental-implants",
    image: "/img/home-services/dental-implants.jpg",
    alt: "Restored smile after dental implant treatment",
  },
  {
    num: "05",
    category: "Restorative",
    title: "CEREC® crowns",
    caption: "Same-day digital crowns, in one visit",
    href: "/procedures/cosmetic-dentistry/cerec",
    image: "/img/home-services/cerec-milling.jpg",
    alt: "CEREC milling unit making a same-day porcelain crown",
  },
  {
    num: "06",
    category: "Restorative",
    title: "Full mouth restoration",
    caption: "Comprehensive rebuild, planned together",
    href: "/procedures/restoration",
    image: "/img/home-services/full-mouth.jpg",
    alt: "Comprehensive smile rebuild — full mouth restoration",
  },
  {
    num: "07",
    category: "Periodontal",
    title: "Gum care",
    caption: "Treatment, grafting, scaling & root planing",
    href: "/procedures/periodontal-services",
    image: "/img/home-services/gum-care.jpg",
    alt: "Older patient smiling after periodontal gum care",
  },
  {
    num: "08",
    category: "Preventive",
    title: "Cleanings & exams",
    caption: "Routine care for the whole family",
    href: "/procedures/cleanings-prevention/dental-exams-cleanings",
    image: "/img/home-services/cleanings-exams.jpg",
    alt: "Patient receiving a routine cleaning and exam",
  },
];

const TILE_COUNT = tiles.length;

export default function Services() {
  // Render the array twice so the auto-scroll loop seams invisibly.
  const loop = [...tiles, ...tiles];

  return (
    <section className="services-section" id="cosmetic">
      <div className="services-head">
        <header className="section-head">
          <div>
            <div className="num">i. — Care</div>
            <h2>
              From routine dental care to <br />
              <em>complete</em> smile design.
            </h2>
            <p className="services-question">
              What care does Piedmont Dental offer?
            </p>
          </div>
          <p className="lede">
            Piedmont Dental By Design offers comprehensive oral care:
            cosmetic (veneers, whitening, Invisalign®), restorative (implants,
            CEREC crowns, full-mouth rebuild), periodontal (gum disease,
            grafting), and preventive (cleanings, exams, X-rays) — all
            delivered by Dr. Martenson, Dr. Ma, and Dr. Cangini.
          </p>
        </header>
      </div>

      <div
        className="services-carousel"
        style={{ ["--tile-count" as string]: TILE_COUNT }}
      >
        <div className="services-track">
          {loop.map((t, i) => (
            <a
              href={t.href}
              className="svc-tile"
              key={`${t.num}-${i}`}
              aria-label={`Explore ${t.title}`}
            >
              <div className="svc-tile-img">
                <Image
                  src={t.image}
                  alt={t.alt}
                  fill
                  sizes="(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <header className="svc-tile-head">
                <span className="svc-tile-num">{t.num}</span>
                <span className="svc-tile-cat">{t.category}</span>
              </header>
              <footer className="svc-tile-foot">
                <h3>{t.title}</h3>
                <p>{t.caption}</p>
              </footer>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
