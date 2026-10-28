import Image from "next/image";
import Link from "next/link";
import ServiceSchema from "@/components/schema/ServiceSchema";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import FAQPageSchema from "@/components/schema/FAQPageSchema";
import { getProcedureSidebar, getCityPageLinks } from "@/lib/internal-links";
import type { SidebarGroup } from "@/lib/internal-links";

// Schema.org category name per practice-area slug
const SCHEMA_CATEGORY: Record<string, string> = {
  "cleanings-prevention": "Preventive Dentistry",
  "cosmetic-dentistry": "Cosmetic Dentistry",
  "periodontal-services": "Periodontal Services",
  restoration: "Restorative Dentistry",
};

export type ProcedureSection = {
  title: string;
  body?: string[];
  bullets?: string[];
};

export type ProcedureFAQ = {
  q: string;
  a: string;
};

export type ProcedureStat = {
  value: string;
  label: string;
};

export type ProcedureDetailProps = {
  category: {
    slug: "cleanings-prevention" | "cosmetic-dentistry" | "periodontal-services" | "restoration";
    label: string; // "Restoration"
  };
  slug: string;
  /** Short display title shown in the hero (e.g. "Dental Implants") */
  title: string;
  /** Full marketing title from the live site, shown as a small italic tagline above body content */
  tagline?: string;
  /** Intro paragraphs — first one shown as hero sub, the rest above the first section */
  intro: string[];
  /** At-a-glance stats card */
  stats?: ProcedureStat[];
  /** Body sections: reasons, process, etc. */
  sections: ProcedureSection[];
  /** Frequently asked questions — rendered as a server-side accordion + emits FAQPage JSON-LD */
  faqs?: ProcedureFAQ[];
  /** Optional procedure-specific featured image; otherwise category-themed image is used */
  featuredImage?: string;
  featuredAlt?: string;
  /**
   * Month 2 city pages (run-plan #47): the same procedure, localised. Swaps
   * the crumb and sidebar to the city-page derivation (getCityPageLinks),
   * scopes the Service schema's areaServed, and fixes the schema URL.
   */
  cityPage?: { href: string; city: string };
  /** Cited sources — rendered as a short list after the sections (YMYL) */
  sources?: { label: string; href: string }[];
};

const CATEGORY_IMAGE: Record<string, string> = {
  "cleanings-prevention": "/img/procedures/cleanings-prevention/_index/hero.jpg",
  "cosmetic-dentistry": "/img/procedures/cosmetic-dentistry/_index/hero.jpg",
  "periodontal-services": "/img/procedures/periodontal-services/_index/hero.jpg",
  restoration: "/img/procedures/restoration/_index/hero.jpg",
};

export default function ProcedureDetail({
  category,
  slug,
  title,
  tagline,
  intro,
  stats,
  sections,
  faqs,
  featuredImage,
  featuredAlt,
  cityPage,
  sources,
}: ProcedureDetailProps) {
  const heroSub = intro[0];
  const remainingIntro = intro.slice(1);
  const image = featuredImage ?? CATEGORY_IMAGE[category.slug];
  const imageAlt = featuredAlt ?? `${title} — Piedmont Dental By Design`;
  // Sidebar links derive from the internal-linking template (decision #50),
  // so cross-category and city links appear without per-page edits.
  const cityLinks = cityPage ? getCityPageLinks(cityPage.href) : null;
  const sidebarGroups: SidebarGroup[] = cityLinks
    ? [
        { label: "This treatment", links: [cityLinks.parentService] },
        ...(cityLinks.sameCityOtherServices.length > 0
          ? [{ label: `Also in ${cityPage!.city}`, links: cityLinks.sameCityOtherServices }]
          : []),
        ...(cityLinks.sameServiceOtherCities.length > 0
          ? [{ label: "Other areas", links: cityLinks.sameServiceOtherCities }]
          : []),
      ]
    : getProcedureSidebar(category.slug, slug);
  const [siblingGroup, ...extraGroups] = sidebarGroups;
  const pageHref = cityPage ? cityPage.href : `/procedures/${category.slug}/${slug}`;

  return (
    <>
      {/* Hero */}
      <section className="page-hero proc-detail-hero">
        <div className="page-hero-inner proc-detail-hero-inner">
          <div className="page-hero-content">
            <div className="num">
              {cityLinks ? (
                <>
                  <Link href={cityLinks.parentService.href} className="proc-crumb">
                    {cityLinks.parentService.title}
                  </Link>{" "}
                  · {cityPage!.city}
                </>
              ) : (
                <>
                  <Link href={`/procedures/${category.slug}`} className="proc-crumb">
                    {category.label}
                  </Link>{" "}
                  · Procedures
                </>
              )}
            </div>
            <h1 className="proc-detail-title">{title}</h1>
            <p className="page-hero-sub">{heroSub}</p>

            {stats && stats.length > 0 && (
              <ul className="proc-stats">
                {stats.map((s) => (
                  <li key={s.label}>
                    <span className="ps-value">{s.value}</span>
                    <span className="ps-label">{s.label}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="procedures-hero-actions">
              <a href="/contact" className="btn btn-primary btn-lg">
                Contact us →
              </a>
              <a href="tel:5103503937" className="btn btn-ghost btn-lg">
                Call (510) 350-3937
              </a>
            </div>
          </div>

          <div className="proc-detail-image">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 1080px) 100vw, 540px"
              style={{ objectFit: "cover" }}
              priority
            />
            <span className="proc-detail-image-caption">
              {category.label} · Piedmont, CA
            </span>
          </div>
        </div>
      </section>

      {/* Body — 2-col with sidebar related list */}
      <section className="proc-detail-body">
        <div className="proc-detail-body-inner">
          {/* Sidebar — derived from the internal-linking template */}
          {siblingGroup && siblingGroup.links.length > 0 && (
            <aside className="proc-sidebar" aria-label="Related procedures">
              <div className="proc-sidebar-inner">
                <span className="proc-sidebar-label">{siblingGroup.label}</span>
                <h3 className="proc-sidebar-title">{cityPage ? cityPage.city : category.label}</h3>
                <ol className="proc-sidebar-list">
                  {siblingGroup.links.map((r) => (
                    <li key={r.href} className={r.isCurrent ? "is-current" : ""}>
                      {r.isCurrent ? (
                        <span aria-current="page">{r.title}</span>
                      ) : (
                        <Link href={r.href}>{r.title}</Link>
                      )}
                    </li>
                  ))}
                </ol>
                {extraGroups.map((g) => (
                  <div className="proc-sidebar-group" key={g.label}>
                    <span className="proc-sidebar-label">{g.label}</span>
                    <ol className="proc-sidebar-list">
                      {g.links.map((r) => (
                        <li key={r.href}>
                          <Link href={r.href}>{r.title}</Link>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
                <Link
                  className="proc-sidebar-back"
                  href={cityLinks ? cityLinks.parentService.href : `/procedures/${category.slug}`}
                >
                  ← {cityLinks ? cityLinks.parentService.title : `All ${category.label.toLowerCase()}`}
                </Link>
              </div>
            </aside>
          )}

          {/* Main column */}
          <article className="proc-main">
            {tagline && <p className="proc-tagline">{tagline}</p>}

            {remainingIntro.map((p, i) => (
              <p key={`intro-${i}`} className="proc-paragraph">
                {p}
              </p>
            ))}

            {sections.map((s, i) => (
              <section className="proc-section" key={`sec-${i}`}>
                <h2 className="proc-section-title">{s.title}</h2>
                {s.body?.map((p, j) => (
                  <p key={`p-${j}`} className="proc-paragraph">
                    {p}
                  </p>
                ))}
                {s.bullets && (
                  <ul className="proc-bullets">
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* Cited sources (city pages / YMYL copy) */}
            {sources && sources.length > 0 && (
              <section className="proc-section proc-sources" aria-label="Sources">
                <h2 className="proc-section-title">Sources</h2>
                <ul className="proc-bullets">
                  {sources.map((src) => (
                    <li key={src.href}>
                      <a href={src.href} target="_blank" rel="noopener noreferrer">
                        {src.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Frequently asked questions — server-rendered accordion */}
            {faqs && faqs.length > 0 && (
              <section className="proc-faqs" aria-labelledby="proc-faqs-heading">
                <h2 id="proc-faqs-heading" className="proc-section-title">
                  Frequently asked questions
                </h2>
                <div className="proc-faq-list">
                  {faqs.map((f, i) => (
                    <details key={i} className="proc-faq-item">
                      <summary className="proc-faq-question">
                        <span>{f.q}</span>
                        <span className="proc-faq-icon" aria-hidden>+</span>
                      </summary>
                      <div className="proc-faq-answer">
                        <p>{f.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Inline mid-page CTA */}
            <aside className="proc-mid-cta">
              <h3>Have questions about {title.toLowerCase()}?</h3>
              <p>
                Book a free consultation with Dr. Martenson or Dr. Ma —
                we&apos;ll review your goals, walk through what&apos;s involved,
                and answer any questions before any treatment is scheduled.
              </p>
              <div className="actions">
                <a href="/contact" className="btn btn-teal">
                  Contact us →
                </a>
                <a href="tel:5103503937" className="btn btn-ghost-light">
                  Call (510) 350-3937
                </a>
              </div>
            </aside>
          </article>
        </div>
      </section>

      {/* Per-page JSON-LD — Service (this procedure) + breadcrumbs */}
      <ServiceSchema
        name={title}
        description={intro[0] ?? `${title} at Piedmont Dental By Design.`}
        url={pageHref}
        category={SCHEMA_CATEGORY[category.slug] ?? "Dentistry"}
        areaServed={cityPage ? `${cityPage.city}, CA` : undefined}
      />
      <BreadcrumbSchema
        crumbs={
          cityLinks
            ? [
                { name: "Procedures", url: "/procedures" },
                { name: cityLinks.parentService.title, url: cityLinks.parentService.href },
                { name: cityPage!.city, url: pageHref },
              ]
            : [
                { name: "Procedures", url: "/procedures" },
                { name: category.label, url: `/procedures/${category.slug}` },
                { name: title, url: `/procedures/${category.slug}/${slug}` },
              ]
        }
      />
      {faqs && faqs.length > 0 && <FAQPageSchema faqs={faqs} />}
    </>
  );
}
