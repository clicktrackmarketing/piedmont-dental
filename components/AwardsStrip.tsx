import Image from "next/image";

type Award = {
  /** Text glyph icon — used when no badge image is set. */
  ico?: string;
  /** Optional badge image path (e.g. the Best of the Bay gold icon). */
  badge?: string;
  headline: string;
  title: string;
  meta: string;
};

const awards: Award[] = [
  {
    badge: "/img/badges/best-of-bay-2025.png",
    headline: "2024, 2025 & 2026",
    title: "Best Esthetic Dentist",
    meta: "Voted Best of the East Bay",
  },
  {
    badge: "/img/badges/best-of-bay-2025.png",
    headline: "2025 & 2026",
    title: "Best Dental Practice",
    meta: "Voted Best of the East Bay",
  },
  {
    ico: "G",
    headline: "4.9 / 5",
    title: "Google Reviews",
    meta: "From 350+ verified patients",
  },
  {
    ico: "⊕",
    headline: "30 years",
    title: "Serving the East Bay",
    meta: "Three decades of preventative, cosmetic & restorative care",
  },
];

export default function AwardsStrip() {
  return (
    <section className="awards" id="awards">
      <div className="awards-inner">
        <p className="awards-eyebrow">— Trusted in the East Bay —</p>
        <div className="awards-grid">
          {awards.map((a) => (
            <article className="award" key={a.title}>
              {a.badge ? (
                <span className="award-badge">
                  <Image
                    src={a.badge}
                    alt=""
                    width={76}
                    height={76}
                    aria-hidden="true"
                  />
                </span>
              ) : (
                <span className="award-ico">{a.ico}</span>
              )}
              <div className="award-headline">{a.headline}</div>
              <h3 className="award-title">{a.title}</h3>
              <p className="award-meta">{a.meta}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
