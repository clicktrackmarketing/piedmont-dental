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
  title: "Surgery — Before & After",
  description:
    "Before-and-after cases from Dr. Martenson and Dr. Ma combining minor in-office gum reshaping with composite bonding and porcelain veneers.",
  alternates: { canonical: "/resources/surgery" },
  openGraph: {
    title: "Surgery — Before & After | Piedmont Dental By Design",
    description:
      "Before-and-after patient cases combining gum surgery with bonding and veneers.",
    url: "https://piedmontdentalbydesign.com/resources/surgery",
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
    before: "/img/surgery/case1-before.jpg",
    after: "/img/surgery/case1-after.jpg",
    beforeText:
      "Patient presented with chipped incisal edges and excess gum tissue, resulting in short, square-looking teeth.",
    afterText:
      "A balanced, natural smile achieved by bonding the chipped edges with composite and raising the gum tissue surgically — performed in our office under local anesthetic.",
    procedures: ["Gum surgery", "Composite bonding"],
  },
  {
    id: "case-2",
    before: "/img/surgery/case2-before.jpg",
    after: "/img/surgery/case2-after.jpg",
    beforeText:
      "Patient wanted a brighter, more balanced smile — with concerns about tooth shape, color, and gum proportion.",
    afterText:
      "Porcelain veneers paired with minor gum reshaping produced a more youthful, harmonious smile while preserving a completely natural appearance.",
    procedures: ["Porcelain veneers", "Gum surgery"],
  },
];

export default function SurgeryPage() {
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
                Patient Resources · Before & After
              </div>
              <h1 className="resource-hero-title">Surgery</h1>
              <p className="resource-hero-description">
                Real cases from the practice of Dr. Martenson and Dr. Ma, combining minor
                in-office gum surgery with bonding or veneers. Every result
                here was achieved with local anesthetic — no general
                anesthesia, no operating room.
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
                      alt={`Case ${i + 1} — before treatment`}
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
                      alt={`Case ${i + 1} — after treatment`}
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

            <div className="surgery-related">
              <span className="num">— Related procedure pages</span>
              <h2>Want to learn more about the techniques?</h2>
              <div className="surgery-related-grid">
                <Link
                  href="/procedures/periodontal-services/crown-lengthening"
                  className="surgery-related-card"
                >
                  <h3>Crown Lengthening</h3>
                  <p>The gum-reshaping technique used in these cases.</p>
                  <span>Learn more →</span>
                </Link>
                <Link
                  href="/procedures/cosmetic-dentistry/porcelain-veneers"
                  className="surgery-related-card"
                >
                  <h3>Porcelain Veneers</h3>
                  <p>Thin custom shells used in Case 2 to refine shape and color.</p>
                  <span>Learn more →</span>
                </Link>
                <Link
                  href="/resources/cosmetic-bonding"
                  className="surgery-related-card"
                >
                  <h3>Composite Bonding</h3>
                  <p>The tooth-colored composite used to rebuild chipped edges in Case 1.</p>
                  <span>Learn more →</span>
                </Link>
              </div>
            </div>

            <div className="surgery-cta">
              <h2>Curious if your smile could change like this?</h2>
              <p>
                Book a complimentary cosmetic consultation. We&apos;ll evaluate
                your smile, walk through realistic options, and put together a
                plan that fits your goals and budget.
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
          { name: "Surgery", url: "/resources/surgery" },
        ]}
      />
</>
  );
}

function romanize(n: number): string {
  const map = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"];
  return map[n - 1] ?? String(n);
}
