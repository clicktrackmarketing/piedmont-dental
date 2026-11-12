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
  title: "Dentures — Before & After Gallery",
  description:
    "Real patient denture cases — full and partial dentures, often combined with dental implants and porcelain crowns, for a natural-looking smile and full function.",
  alternates: { canonical: "/resources/restorations/dentures" },
  openGraph: {
    title: "Dentures & Partial Dentures — Before & After | Piedmont Dental By Design",
    description:
      "Before-and-after denture cases combining implants, crowns, and full-arch rehabilitation.",
    url: "https://piedmontdentalbydesign.com/resources/restorations/dentures",
    type: "article",
  },
};

type Case = {
  id: string;
  before: string;
  after: string;
  beforeText: string;
  afterText: string;
  procedures: string[];
};

const CASES: Case[] = [
  {
    id: "case-1",
    before: "/img/dentures/case1-before.jpg",
    after: "/img/dentures/case1-after.jpg",
    beforeText:
      "Patient presented with significant tooth loss affecting bite function, facial tissue support, and confidence in their smile.",
    afterText:
      "A natural-looking, fully functional smile restored through implant-supported denture work — chewing function and facial proportions returned, with a result that reads as the patient's own teeth.",
    procedures: [
      "Dentures & Partial Dentures",
      "Dental Implants",
      "Porcelain Crowns",
    ],
  },
  {
    id: "case-2",
    before: "/img/dentures/case2-before.jpg",
    after: "/img/dentures/case2-after.jpg",
    beforeText:
      "Patient needed upper and lower arch rehabilitation — addressing both function and aesthetics across the full mouth.",
    afterText:
      "A great smile, restored chewing function, and proper facial tissue support — achieved with an upper denture supported by implants, plus lower implants and porcelain crowns.",
    procedures: [
      "Full-Arch Rehab",
      "Dental Implants",
      "Implant-Supported Denture",
      "Porcelain Crowns",
    ],
  },
];

export default function DenturesResourcePage() {
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
                Patient Resources · Restorations · Before & After
              </div>
              <h1 className="resource-hero-title">
                Dentures & Partial Dentures
              </h1>
              <p className="resource-hero-description">
                Real denture and full-arch cases from the practice of Dr.
                Martenson and Dr. Ma. When dentures are combined with implants and porcelain
                crowns, the result restores not just your smile — but chewing
                function and the facial proportions teeth have always
                supported.
              </p>
            </div>
          </div>
        </section>

        <section className="surgery-body">
          <div className="surgery-inner">

            <div className="surgery-consent" role="note">
              <span className="surgery-consent-tag">Note</span>
              <p>
                Patients depicted in these case studies have provided their
                consent to display their photos online. Results vary by case —
                schedule a consultation to discuss what&apos;s possible for
                your smile.
              </p>
            </div>

            {CASES.map((c, i) => (
              <article key={c.id} className="surgery-case">
                <header className="surgery-case-head">
                  <span className="num">
                    {romanize(i + 1)}. — Case study
                  </span>
                  <h2>Journey of change · before & after</h2>
                  <div className="surgery-procedure-tags">
                    {c.procedures.map((p) => (
                      <span key={p} className="surgery-procedure-tag">
                        {p}
                      </span>
                    ))}
                  </div>
                </header>

                <div className="surgery-case-photos">
                  <figure className="surgery-photo">
                    <span className="surgery-photo-label surgery-photo-label--before">
                      Before
                    </span>
                    <Image
                      src={c.before}
                      alt={`Denture case ${i + 1} — before treatment`}
                      width={1200}
                      height={800}
                      sizes="(max-width: 720px) 100vw, (max-width: 1080px) 100vw, 480px"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </figure>
                  <figure className="surgery-photo">
                    <span className="surgery-photo-label surgery-photo-label--after">
                      After
                    </span>
                    <Image
                      src={c.after}
                      alt={`Denture case ${i + 1} — after treatment`}
                      width={1200}
                      height={800}
                      sizes="(max-width: 720px) 100vw, (max-width: 1080px) 100vw, 480px"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </figure>
                </div>

                <div className="surgery-case-text">
                  <div className="surgery-text-col">
                    <span className="surgery-text-label">Before</span>
                    <p>{c.beforeText}</p>
                  </div>
                  <div className="surgery-text-col">
                    <span className="surgery-text-label surgery-text-label--after">
                      After
                    </span>
                    <p>{c.afterText}</p>
                  </div>
                </div>
              </article>
            ))}

            {/* Quick at-a-glance facts about modern denture treatment */}
            <div className="dentures-facts">
              <span className="num">— What modern dentures involve</span>
              <h2>A quick refresher on today&apos;s denture options</h2>
              <div className="dentures-facts-grid">
                <div className="dentures-fact">
                  <span className="dentures-fact-icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 17c2-2 6-2 8 0s6 2 8 0" />
                      <path d="M8 13V7M12 13V5M16 13V7" />
                    </svg>
                  </span>
                  <h3>Full Dentures</h3>
                  <p>
                    Replace all teeth in an arch (upper, lower, or both). Custom
                    shaped and shaded so the result reads as your own smile.
                  </p>
                </div>
                <div className="dentures-fact">
                  <span className="dentures-fact-icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="6" width="18" height="12" rx="2" />
                      <path d="M9 6v12M15 6v12" />
                    </svg>
                  </span>
                  <h3>Partial Dentures</h3>
                  <p>
                    For patients still keeping some natural teeth — a removable
                    appliance that fills the gaps and clasps to remaining teeth
                    for stability.
                  </p>
                </div>
                <div className="dentures-fact">
                  <span className="dentures-fact-icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3v18" />
                      <path d="M8 7h8" />
                      <circle cx="12" cy="14" r="3" />
                    </svg>
                  </span>
                  <h3>Implant-Supported</h3>
                  <p>
                    Anchored to titanium implants in the jaw — no adhesives,
                    full chewing power, and the bone-preserving stability of a
                    fixed restoration.
                  </p>
                </div>
              </div>
            </div>

            {/* Related procedure links */}
            <div className="surgery-related">
              <span className="num">— Learn more</span>
              <h2>Related procedure pages</h2>
              <div className="surgery-related-grid">
                <Link
                  href="/procedures/restoration/dentures-partial-dentures"
                  className="surgery-related-card"
                >
                  <h3>Dentures &amp; Partial Dentures</h3>
                  <p>Full and partial denture options, fitting process, and what daily wear involves.</p>
                  <span>Learn more →</span>
                </Link>
                <Link
                  href="/procedures/restoration/dental-implants"
                  className="surgery-related-card"
                >
                  <h3>Dental Implants</h3>
                  <p>Titanium implants used to anchor dentures, crowns, and full-arch rehabilitation.</p>
                  <span>Learn more →</span>
                </Link>
                <Link
                  href="/procedures/restoration/crowns-caps"
                  className="surgery-related-card"
                >
                  <h3>Crowns & Caps</h3>
                  <p>The porcelain crowns paired with implant work for the most natural look.</p>
                  <span>Learn more →</span>
                </Link>
              </div>
            </div>

            <div className="surgery-cta">
              <h2>Curious if dentures or implants are right for you?</h2>
              <p>
                Book a complimentary restorative consultation. Dr. Martenson
                or Dr. Ma will evaluate your bite, talk through your options
                honestly — full dentures, partials, implant-supported — and put
                together a plan that fits your goals and budget.
              </p>
              <div className="surgery-cta-actions">
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
          { name: "Dentures & Partial Dentures", url: "/resources/restorations/dentures" },
        ]}
      />
</>
  );
}

function romanize(n: number): string {
  const map = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"];
  return map[n - 1] ?? String(n);
}
