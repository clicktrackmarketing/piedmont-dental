import Image from "next/image";
import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL } from "@/lib/contact-info";

// The Oakland patients page (/oakland). Recommended in GeoReputation's
// October 2026 AI-visibility report: AI answers to "dentist in Oakland"
// prompts named the practice in 6 of 209 answers, and the site had no page
// that matched those questions. Facts here mirror the doctor pages, the
// homepage Visit section and AwardsStrip — keep them in sync.

const DOCTORS = [
  {
    role: "Co-owner",
    name: "Dr. Jill Martenson, DDS",
    bio: "Trained at UCLA and the University of the Pacific, with over 30 years in practice in cosmetic and general dentistry.",
    href: "/about/dr-martenson",
    cta: "Meet Dr. Martenson",
  },
  {
    role: "Co-owner",
    name: "Dr. David Ma",
    bio: "A graduate with honors of the University of Pennsylvania School of Dental Medicine, practicing cosmetic and general dentistry.",
    href: "/about/dr-ma",
    cta: "Meet Dr. Ma",
  },
  {
    role: "Periodontist",
    name: "Dr. Filippo Cangini",
    bio: "A board-certified periodontist with 26 years of experience, trained at the University of Siena, the University at Buffalo and the University of Rochester.",
    href: "/about/dr-cangini",
    cta: "Meet Dr. Cangini",
  },
];

const CARE = [
  {
    title: "Exams and cleanings",
    text: "Routine exams, cleanings, x-rays and fluoride, with home-care guidance.",
    href: "/procedures/cleanings-prevention/dental-exams-cleanings",
  },
  {
    title: "CEREC same-day crowns",
    text: "Crowns designed, milled and placed in the office in a single visit.",
    href: "/procedures/cosmetic-dentistry/cerec",
  },
  {
    title: "Porcelain veneers",
    text: "Custom porcelain veneers to change the shape and color of teeth.",
    href: "/procedures/cosmetic-dentistry/porcelain-veneers",
  },
  {
    title: "Invisalign",
    text: "Clear aligners to straighten teeth without braces.",
    href: "/procedures/cosmetic-dentistry/invisalign",
  },
  {
    title: "Dental implants",
    text: "Replacing missing teeth, including bone grafting where it is needed first.",
    href: "/procedures/restoration/dental-implants",
  },
  {
    title: "Gum care",
    text: "Scaling and root planing, gum grafting and maintenance with Dr. Cangini.",
    href: "/procedures/periodontal-services",
  },
  {
    title: "Teeth whitening",
    text: "Professional teeth whitening.",
    href: "/procedures/cosmetic-dentistry/tooth-whitening",
  },
];

const AREAS = ["Oakland", "Lake Merritt", "Montclair", "Rockridge", "Berkeley", "Piedmont"];

const READING = [
  { title: "How Much Do Veneers Cost in Oakland? A 2026 Guide", href: "/blog/veneers-cost-oakland-2026" },
  { title: "CEREC Same-Day Crowns: What Oakland Patients Need to Know", href: "/blog/cerec-same-day-crowns-oakland" },
  { title: "Trusted Dentist Near Oakland, CA", href: "/blog/trusted-dentist-oakland-ca" },
];

export function OaklandHero() {
  return (
    <section className="page-hero oak-hero">
      <div className="page-hero-inner">
        <div className="page-hero-content">
          <nav className="oak-crumb" aria-label="Breadcrumb">
            <a href="/about">About</a>
            <span aria-hidden="true"> · </span>
            <span aria-current="page">For Oakland patients</span>
          </nav>
          <h1>
            A dentist for <em>Oakland</em> patients, on Grand Avenue since 1996.
          </h1>
          <p className="page-hero-sub">
            Piedmont Dental By Design is a general, cosmetic and restorative
            dental practice at 1331 Grand Avenue, between Wildwood and
            Sunnyside, about five minutes from MacArthur BART. We have cared for
            patients from Oakland and across the East Bay for 30 years.
          </p>
          <p className="page-hero-sub">
            Patients come to us from across Oakland for exams and cleanings,
            same-day CEREC crowns, porcelain veneers, Invisalign, dental
            implants and gum care, all in one office.
          </p>
        </div>

        <aside className="oak-factcard">
          <h2>New patients welcome</h2>
          <p>
            Call us during open hours, or send a message and we will get back to
            you. Most weeks we have same-week availability.
          </p>
          <a className="oak-factcard-phone" href={BUSINESS_PHONE_TEL}>
            {BUSINESS_PHONE_DISPLAY}
          </a>
          <dl>
            <dt>Address</dt>
            <dd>1331 Grand Ave, Piedmont, CA 94610</dd>
            <dt>Transit</dt>
            <dd>About 5 minutes from MacArthur BART</dd>
          </dl>
          <a className="btn btn-teal btn-lg" href="/contact">
            Book appointment →
          </a>
        </aside>
      </div>
    </section>
  );
}

export function OaklandDoctors() {
  return (
    <section className="bay oak-section">
      <header className="section-head">
        <div>
          <div className="num">i. — Your dentists</div>
          <h2>
            The dentists <em>you will see.</em>
          </h2>
        </div>
      </header>
      <div className="oak-docs">
        {DOCTORS.map((d) => (
          <article className="oak-doc" key={d.name}>
            <div className="oak-doc-role">{d.role}</div>
            <h3>{d.name}</h3>
            <p>{d.bio}</p>
            <a href={d.href}>{d.cta} →</a>
          </article>
        ))}
      </div>
    </section>
  );
}

export function OaklandCare() {
  return (
    <section className="bay oak-section">
      <header className="section-head">
        <div>
          <div className="num">ii. — Care</div>
          <h2>
            The care Oakland patients <em>come in for.</em>
          </h2>
        </div>
      </header>
      <ol className="oak-care">
        {CARE.map((c, i) => (
          <li key={c.title}>
            <a href={c.href}>
              <span className="oak-care-n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{c.title}</h3>
              <span className="oak-care-ar" aria-hidden="true">→</span>
              <p>{c.text}</p>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function OaklandAreas() {
  return (
    <section className="bay oak-section">
      <div className="oak-two">
        <div>
          <div className="section-head oak-head-tight">
            <div>
              <div className="num">iii. — Areas we serve</div>
              <h2>
                Where our patients <em>come from.</em>
              </h2>
            </div>
          </div>
          <p className="oak-intro">
            Patients come to the Grand Avenue office from across Oakland and the
            East Bay, including:
          </p>
          <ul className="oak-hoods">
            {AREAS.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <div className="oak-photo">
            <Image
              src="/img/about/practice-main.jpg"
              alt="Inside Piedmont Dental By Design on Grand Avenue"
              fill
              sizes="(max-width: 900px) 100vw, 540px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        <div className="oak-panel">
          <h3>Hours</h3>
          <table className="oak-hours">
            <tbody>
              <tr>
                <td>Monday and Wednesday</td>
                <td>7:00 to 5:00</td>
              </tr>
              <tr>
                <td>Tuesday and Thursday</td>
                <td>7:00 to 3:00</td>
              </tr>
              <tr>
                <td>Friday through Sunday</td>
                <td>Closed</td>
              </tr>
            </tbody>
          </table>
          <h3>Insurance and financing</h3>
          <p>
            We accept most dental insurance, including PPO out-of-network plans,
            and our team prepares the forms for you. See our{" "}
            <a href="/resources/insurance">insurance page</a> and{" "}
            <a href="/resources/financing">financing options</a>.
          </p>
        </div>
      </div>
    </section>
  );
}

export function OaklandReading() {
  return (
    <section className="bay oak-section">
      <header className="section-head">
        <div>
          <div className="num">v. — Reading</div>
          <h2>
            More for <em>Oakland patients.</em>
          </h2>
        </div>
      </header>
      <ul className="oak-reads">
        {READING.map((r) => (
          <li key={r.href}>
            <a href={r.href}>
              {r.title}
              <span aria-hidden="true">→</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function OaklandCTA() {
  return (
    <section className="about-cta-section" id="visit-cta">
      <div className="about-cta-inner">
        <div className="num">vi. — Visit</div>
        <h2>
          Book your visit from <em>Oakland.</em>
        </h2>
        <p>
          Send us a message, or call us during open hours. Most weeks we have
          same-week availability.
        </p>
        <div className="actions">
          <a href="/contact" className="btn btn-teal btn-lg">
            Contact us →
          </a>
          <a href={BUSINESS_PHONE_TEL} className="btn btn-ghost-light btn-lg">
            Call {BUSINESS_PHONE_DISPLAY}
          </a>
        </div>

        <div className="about-cta-meta">
          <div className="meta-chunk">
            <span className="meta-label">Address</span>
            <span className="meta-value">1331 Grand Ave, Piedmont, CA 94610</span>
          </div>
          <span className="meta-divider" aria-hidden="true" />
          <div className="meta-chunk">
            <span className="meta-label">Hours</span>
            <span className="meta-value">
              Mon &amp; Wed 7–5 · Tue &amp; Thu 7–3
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
