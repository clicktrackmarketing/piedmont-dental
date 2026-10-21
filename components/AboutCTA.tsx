export default function AboutCTA() {
  return (
    <section className="about-cta-section" id="visit-cta">
      <div className="about-cta-inner">
        <div className="num">iii. — Visit</div>
        <h2>
          Take a tour, or <em>schedule</em> your visit.
        </h2>
        <p>
          Experience the practice first-hand. Send us a message, or call us
          during open hours — most weeks we have same-week availability.
        </p>
        <div className="actions">
          <a href="/contact" className="btn btn-teal btn-lg">
            Contact us →
          </a>
          <a href="tel:5103503937" className="btn btn-ghost-light btn-lg">
            Call (510) 350-3937
          </a>
        </div>

        <div className="about-cta-meta">
          <div className="meta-chunk">
            <span className="meta-label">Address</span>
            <span className="meta-value">
              1331 Grand Ave, Piedmont, CA 94610
            </span>
          </div>
          <span className="meta-divider" aria-hidden="true" />
          <div className="meta-chunk">
            <span className="meta-label">Hours</span>
            <span className="meta-value">
              Mon &amp; Wed 7–5 · Tue &amp; Thu 7–3
            </span>
          </div>
        </div>

        <p className="about-cta-oakland">
          Coming from Oakland? <a href="/oakland">See our page for Oakland patients →</a>
        </p>
      </div>
    </section>
  );
}
