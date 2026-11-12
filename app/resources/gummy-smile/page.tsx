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
  title: "Treating a Gummy Smile",
  description:
    "What causes a gummy smile and the treatments that fix it — crown lengthening, gum contouring, veneers, and orthodontics for a balanced, confident look.",
  alternates: { canonical: "/resources/gummy-smile" },
  openGraph: {
    title: "Treating a Gummy Smile — Piedmont Dental By Design",
    description:
      "Causes and treatments for a gummy smile — from crown lengthening and gum contouring to veneers and Invisalign®.",
    url: "https://piedmontdentalbydesign.com/resources/gummy-smile",
    type: "article",
  },
};

export default function GummySmilePage() {
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
                Patient Resources · Procedure info
              </div>
              <h1 className="resource-hero-title">Treating a Gummy Smile</h1>
              <p className="resource-hero-description">
                A &ldquo;gummy smile&rdquo; is when more gum tissue shows above
                the teeth than feels balanced when you smile. It&apos;s common,
                completely treatable, and the right approach depends on what&apos;s
                causing it. Here&apos;s how we evaluate and treat it at
                Piedmont Dental.
              </p>
            </div>
          </div>
        </section>

        <section className="gummy-body">
          <div className="gummy-inner">
            {/* Lead card with featured image */}
            <div className="gummy-lead">
              <div className="gummy-lead-image">
                <Image
                  src="/img/gummy-smile-hero.png"
                  alt="Woman with a confident, balanced smile"
                  fill
                  sizes="(max-width: 1080px) 100vw, 520px"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
              <div className="gummy-lead-text">
                <span className="num">i. — The basics</span>
                <h2>What is a gummy smile?</h2>
                <p>
                  Clinicians use the term when more than about 3&nbsp;mm of gum
                  shows when you smile. It&apos;s not a health problem on its
                  own — many patients simply feel self-conscious about the
                  proportion between gum and tooth in photos and conversation.
                </p>
                <p>
                  The good news: it&apos;s one of the most fixable cosmetic
                  concerns we see. Treatments range from non-surgical contouring
                  to short procedures performed right here in our office.
                </p>
                <ul className="gummy-lead-stats">
                  <li>
                    <strong>30 min</strong>
                    <span>Initial cosmetic evaluation</span>
                  </li>
                  <li>
                    <strong>1&ndash;2 visits</strong>
                    <span>Typical for in-office contouring</span>
                  </li>
                  <li>
                    <strong>3&ndash;4 weeks</strong>
                    <span>Healing for most surgical reshaping</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Q&A — What causes a gummy smile */}
            <div className="gummy-qa">
              <span className="num">ii. — Why it happens</span>
              <h2>What causes a gummy smile?</h2>
              <p>
                Several different factors can produce the same visual result.
                The treatment that&apos;ll work best for you depends on which
                cause is at play — sometimes more than one.
              </p>
              <ul className="gummy-cause-list">
                <li>
                  <span className="gummy-cause-tag">A</span>
                  <div>
                    <strong>Excess gum tissue (altered passive eruption)</strong>
                    <p>
                      The gums never fully receded as the teeth erupted, leaving
                      teeth that look short. This is one of the most common
                      causes and is usually addressed with crown lengthening or
                      gum contouring.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="gummy-cause-tag">B</span>
                  <div>
                    <strong>A hyperactive upper lip</strong>
                    <p>
                      The muscles that raise the upper lip pull too high when
                      you smile, exposing extra gum. Options include
                      neuromodulator injections (Botox) or, in select cases,
                      lip-repositioning surgery.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="gummy-cause-tag">C</span>
                  <div>
                    <strong>Tooth position or wear</strong>
                    <p>
                      Teeth that have erupted too far down, or worn-down edges
                      that have shortened the teeth, can make the gum line
                      appear too prominent. Orthodontics or restorative work can
                      rebalance the smile.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="gummy-cause-tag">D</span>
                  <div>
                    <strong>Jaw development (vertical maxillary excess)</strong>
                    <p>
                      In rarer cases, the upper jaw grew longer than usual,
                      pushing the gum line down. Surgical correction may be
                      considered for severe cases — but most patients see
                      excellent results with simpler in-office options.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Treatment options grid */}
            <div className="gummy-treatments">
              <span className="num">iii. — Treatment options</span>
              <h2>How we treat a gummy smile</h2>
              <p>
                Dr. Martenson or Dr. Ma will walk through which of these is right for you
                during a cosmetic consultation. Many patients combine two
                approaches — for example, crown lengthening followed by veneers
                — for the most natural-looking result.
              </p>
              <div className="gummy-treatments-grid">
                <Link
                  href="/procedures/periodontal-services/crown-lengthening"
                  className="gummy-treatment-card"
                >
                  <span className="gummy-treatment-icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 17c2-2 6-2 8 0s6 2 8 0" />
                      <path d="M8 13V7M12 13V5M16 13V7" />
                    </svg>
                  </span>
                  <h3>Crown Lengthening</h3>
                  <p>
                    A short surgical procedure that gently reshapes the gum
                    line, revealing more of each tooth for a balanced smile.
                  </p>
                  <span className="gummy-treatment-cta">Learn more →</span>
                </Link>

                <Link
                  href="/procedures/cosmetic-dentistry/surgery"
                  className="gummy-treatment-card"
                >
                  <span className="gummy-treatment-icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 6.5-7 11-7 11z" />
                    </svg>
                  </span>
                  <h3>Gum Contouring</h3>
                  <p>
                    Cosmetic reshaping with our dental laser — minimally
                    invasive, performed under local anesthesia, healing in just
                    a few days.
                  </p>
                  <span className="gummy-treatment-cta">Learn more →</span>
                </Link>

                <Link
                  href="/procedures/cosmetic-dentistry/porcelain-veneers"
                  className="gummy-treatment-card"
                >
                  <span className="gummy-treatment-icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="6" y="4" width="12" height="16" rx="2" />
                      <path d="M9 9h6M9 13h6M9 17h4" />
                    </svg>
                  </span>
                  <h3>Porcelain Veneers</h3>
                  <p>
                    Custom porcelain shells that make teeth appear longer —
                    pairs beautifully with gum reshaping for a complete smile
                    transformation.
                  </p>
                  <span className="gummy-treatment-cta">Learn more →</span>
                </Link>

                <Link
                  href="/procedures/cosmetic-dentistry/invisalign"
                  className="gummy-treatment-card"
                >
                  <span className="gummy-treatment-icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 9c2-3 12-3 14 0v6c-2 3-12 3-14 0z" />
                      <path d="M9 9v6M15 9v6" />
                    </svg>
                  </span>
                  <h3>Invisalign®</h3>
                  <p>
                    Clear aligners that reposition over-erupted teeth and
                    address tooth-related causes of a gummy smile — without
                    metal braces.
                  </p>
                  <span className="gummy-treatment-cta">Learn more →</span>
                </Link>

                <div className="gummy-treatment-card gummy-treatment-card--info">
                  <span className="gummy-treatment-icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 8v4M12 16h.01" />
                    </svg>
                  </span>
                  <h3>Neuromodulator (Botox)</h3>
                  <p>
                    For hyperactive upper lip — small, targeted injections relax
                    the muscle so the lip rests lower when you smile. We&apos;ll
                    refer you to a trusted provider if this is the right option.
                  </p>
                </div>

                <div className="gummy-treatment-card gummy-treatment-card--info">
                  <span className="gummy-treatment-icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 12h18" />
                      <path d="M9 6l-6 6 6 6" />
                      <path d="M15 6l6 6-6 6" />
                    </svg>
                  </span>
                  <h3>Surgical correction</h3>
                  <p>
                    For severe vertical maxillary excess, orthognathic surgery
                    may be considered — rare, but we coordinate with specialist
                    surgeons when it&apos;s the right call.
                  </p>
                </div>
              </div>
            </div>

            {/* Q&A — Treatment process */}
            <div className="gummy-qa">
              <span className="num">iv. — What to expect</span>
              <h2>What does treatment involve?</h2>
              <p>
                Most patients are surprised by how straightforward the process
                is. Here&apos;s the typical flow from consultation to results.
              </p>
              <ol className="gummy-steps">
                <li>
                  <strong>Cosmetic evaluation.</strong> Dr. Martenson or Dr. Ma examines
                  your gum line, lip dynamics, and tooth proportions, then
                  recommends the simplest treatment that&apos;ll achieve the
                  look you want.
                </li>
                <li>
                  <strong>Treatment planning.</strong> Using digital photos and
                  imaging, we map out the new gum line so you can preview the
                  outcome before committing.
                </li>
                <li>
                  <strong>The procedure itself.</strong> In-office contouring
                  takes 30&ndash;60 minutes under local anesthesia. Surgical
                  crown lengthening is similar — comfortable, with no general
                  anesthesia required.
                </li>
                <li>
                  <strong>Healing & follow-up.</strong> Most gum tissue heals in
                  3&ndash;4 weeks. We&apos;ll see you back to confirm symmetry
                  and discuss any restorative steps (like veneers) if
                  they&apos;re part of your plan.
                </li>
              </ol>
            </div>

            {/* Q&A — Considerations */}
            <div className="gummy-qa">
              <span className="num">v. — Before you decide</span>
              <h2>A few things to keep in mind</h2>
              <ul className="gummy-considerations">
                <li>
                  <strong>Results are typically permanent</strong> for surgical
                  options like crown lengthening, while Botox-based treatments
                  require periodic touch-ups every 3&ndash;6 months.
                </li>
                <li>
                  <strong>Healthy gums come first.</strong> If you have active
                  gum disease, we&apos;ll address that before any cosmetic work
                  — it&apos;s essential for a lasting result.
                </li>
                <li>
                  <strong>It&apos;s OK to start small.</strong> Many patients
                  begin with the most conservative option and decide later
                  whether to add veneers or orthodontics. We&apos;ll never push
                  more treatment than you need.
                </li>
              </ul>
            </div>

            {/* Closing CTA */}
            <div className="gummy-cta">
              <h2>Curious if this is right for you?</h2>
              <p>
                Book a no-pressure cosmetic consultation — we&apos;ll evaluate
                your smile, talk through your options honestly, and put together
                a plan that fits your goals and your budget.
              </p>
              <div className="gummy-cta-actions">
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
          { name: "Treating a Gummy Smile", url: "/resources/gummy-smile" },
        ]}
      />
</>
  );
}
