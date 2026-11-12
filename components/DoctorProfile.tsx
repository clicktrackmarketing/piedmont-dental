import Image from "next/image";

export type Credential = { value: string; label: string };
export type TimelineEntry = { date: string; text: string };
export type DoctorProfileProps = {
  // Hero
  eyebrow?: string;           // "— Dr. Jill Martenson —" — optional; usually omitted because it duplicates the H1
  name: string;               // "Dr. Jill A. Martenson, DDS"
  role: string;               // "Co-owner · Cosmetic & General Dentistry"
  intro: string;              // 1-2 sentence bio summary
  photo: string;              // /team/dr-martenson.webp
  photoAlt: string;
  credentials: Credential[];  // [{value: '29', label: 'Years experience'}, ...]
  // Body
  bioParagraphs?: string[];   // longer biography paragraphs
  education?: TimelineEntry[];
  career?: TimelineEntry[];
  specializations?: { title: string; body: string }[];
  associations?: string[];
  personal?: string[];        // bullet points about personal life/interests
  // Subject pronoun used in headings like "Where they trained." Defaults to "they".
  pronoun?: "he" | "she" | "they";
  // Layout
  index: string;              // Roman numeral for the eyebrow num e.g. "i"
};

export default function DoctorProfile(props: DoctorProfileProps) {
  const {
    eyebrow,
    name,
    role,
    intro,
    photo,
    photoAlt,
    credentials,
    bioParagraphs = [],
    education = [],
    career = [],
    specializations = [],
    associations = [],
    personal = [],
    pronoun = "they",
  } = props;

  return (
    <>
      {/* Hero */}
      <section className="page-hero doctor-hero">
        <div className="page-hero-inner doctor-hero-inner">
          <div className="page-hero-content">
            {eyebrow ? <div className="num">{eyebrow}</div> : null}
            <h1 className="doctor-name">{name}</h1>
            <p className="doctor-role">{role}</p>
            <p className="page-hero-sub">{intro}</p>

            <ul className="doctor-credentials">
              {credentials.map((c) => (
                <li key={c.label}>
                  <span className="dc-value">{c.value}</span>
                  <span className="dc-label">{c.label}</span>
                </li>
              ))}
            </ul>

            <div className="procedures-hero-actions">
              <a href="/contact" className="btn btn-primary btn-lg">
                Contact us →
              </a>
              <a href="/about/team" className="btn btn-ghost btn-lg">
                Meet the full team
              </a>
            </div>
          </div>

          <div className="doctor-portrait">
            <Image
              src={photo}
              alt={photoAlt}
              fill
              sizes="(max-width: 1080px) 100vw, 540px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
      </section>

      {/* Bio + body sections */}
      <section className="doctor-body">
        <div className="doctor-body-inner">
          {bioParagraphs.length > 0 && (
            <div className="doctor-section">
              <header className="section-head doctor-section-head">
                <div>
                  <div className="num">i. — Profile</div>
                  <h2>
                    A quick <em>introduction.</em>
                  </h2>
                </div>
                <div className="doctor-bio-text">
                  {bioParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </header>
            </div>
          )}

          {education.length > 0 && (
            <div className="doctor-section">
              <header className="section-head doctor-section-head">
                <div>
                  <div className="num">ii. — Education</div>
                  <h2>
                    Where {pronoun} <em>trained.</em>
                  </h2>
                </div>
                <ol className="doctor-timeline">
                  {education.map((e, i) => (
                    <li key={i}>
                      <span className="dt-date">{e.date}</span>
                      <span className="dt-text">{e.text}</span>
                    </li>
                  ))}
                </ol>
              </header>
            </div>
          )}

          {career.length > 0 && (
            <div className="doctor-section">
              <header className="section-head doctor-section-head">
                <div>
                  <div className="num">iii. — Career</div>
                  <h2>
                    The <em>path</em> here.
                  </h2>
                </div>
                <ol className="doctor-timeline">
                  {career.map((e, i) => (
                    <li key={i}>
                      <span className="dt-date">{e.date}</span>
                      <span className="dt-text">{e.text}</span>
                    </li>
                  ))}
                </ol>
              </header>
            </div>
          )}

          {specializations.length > 0 && (
            <div className="doctor-section">
              <header className="section-head doctor-section-head">
                <div>
                  <div className="num">iv. — Specialization</div>
                  <h2>
                    Areas of <em>focus.</em>
                  </h2>
                </div>
                <div className="doctor-specs">
                  {specializations.map((s) => (
                    <article key={s.title} className="doctor-spec-card">
                      <h3>{s.title}</h3>
                      <p>{s.body}</p>
                    </article>
                  ))}
                </div>
              </header>
            </div>
          )}

          {associations.length > 0 && (
            <div className="doctor-section">
              <header className="section-head doctor-section-head">
                <div>
                  <div className="num">v. — Affiliations</div>
                  <h2>
                    Professional <em>memberships.</em>
                  </h2>
                </div>
                <ul className="doctor-associations">
                  {associations.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </header>
            </div>
          )}

          {personal.length > 0 && (
            <div className="doctor-section">
              <header className="section-head doctor-section-head">
                <div>
                  <div className="num">vi. — Personal</div>
                  <h2>
                    Outside the <em>office.</em>
                  </h2>
                </div>
                <ul className="doctor-personal">
                  {personal.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </header>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
