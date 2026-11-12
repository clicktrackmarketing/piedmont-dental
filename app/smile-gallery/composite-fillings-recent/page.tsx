import type { Metadata } from "next";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import AccordionFAQ, { type FAQItem } from "@/components/AccordionFAQ";
import AwardsStrip from "@/components/AwardsStrip";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";

import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
export const metadata: Metadata = {
  title: "Composite Fillings — Recent Cases",
  description:
    "Recent composite filling case studies from Piedmont Dental — tooth-colored repairs placed in a single visit, with answers to the questions patients ask most.",
  alternates: { canonical: "/smile-gallery/composite-fillings-recent" },
  openGraph: {
    title: "Composite Fillings — Recent Cases | Piedmont Dental By Design",
    description:
      "Recent tooth-colored composite filling transformations + answers to common patient questions.",
    url: "https://piedmontdentalbydesign.com/smile-gallery/composite-fillings-recent",
    type: "article",
  },
};

const STEPS = [
  {
    title: "Numb the area gently",
    body: "We start with a small amount of topical anesthetic before any injection — so the local anesthesia itself feels like nothing. Most patients are surprised by how comfortable it is.",
  },
  {
    title: "Remove decay & prep the tooth",
    body: "We carefully remove only the damaged or decayed tooth structure. Composite bonds chemically, so we don't need to over-prep the way we do with amalgam — most of your healthy tooth stays intact.",
  },
  {
    title: "Match the shade",
    body: "We hold a shade guide against your tooth in natural light and pick the closest match. The composite color is mixed to disappear into the rest of the tooth — no obvious filling line.",
  },
  {
    title: "Sculpt in layers",
    body: "Composite is applied in thin layers, each one shaped to your tooth's natural contour. Between layers, a blue curing light hardens the material — bonding it permanently in place.",
  },
  {
    title: "Polish to a natural shine",
    body: "Once the shape is right, we polish the surface to match the way natural enamel reflects light. By the time you leave, the only way to tell you had work done is the receipt.",
  },
];

const FAQS: FAQItem[] = [
  {
    q: "How long does a composite filling take?",
    a: "Most composite fillings — even on visible front teeth — are placed in a single appointment. The whole visit, including numbing and polishing, typically runs 30 to 60 minutes depending on the size of the repair.",
  },
  {
    q: "Will my composite filling be visible?",
    a: "No. We shade-match the composite to your surrounding tooth and polish it to mimic the way natural enamel catches light. Once it's in, even a dentist usually has to look closely to find it.",
  },
  {
    q: "How long does a composite filling last?",
    a: "With good oral hygiene and regular checkups, composite fillings typically last 7 to 10 years — sometimes longer. Like any restoration, lifespan depends on size, location, and bite forces. We check yours at every cleaning.",
  },
  {
    q: "Can composite replace my old silver fillings?",
    a: "Yes. We can replace amalgam fillings with composite at your request. It's a great way to remove visible silver from your smile, and many patients find the swap cosmetically dramatic — especially on lower molars that show when you laugh.",
  },
  {
    q: "Are composite fillings safe?",
    a: "Yes. Composite resins are biocompatible, contain no mercury, and have been the standard for cosmetic restorative work for decades. The bonding agents we use are FDA-approved and well-studied.",
  },
  {
    q: "What does aftercare involve?",
    a: "There's no special routine — just brush twice daily, floss every day, and skip biting hard objects like ice or pen caps. Composite is durable but, like a natural tooth, it can chip under enough force.",
  },
];

export default function CompositeFillingsRecentPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <section className="resource-hero">
          <div className="resource-hero-inner">
            <div className="resource-hero-text">
              <Link
                href="/smile-gallery/other-procedures"
                className="post-hero-back"
              >
                ← Back to Other Procedures
              </Link>
              <div className="num" style={{ marginTop: 12 }}>
                Smile Gallery · Composite Fillings · Recent
              </div>
              <h1 className="resource-hero-title">
                Recent Composite Filling Cases
              </h1>
              <p className="resource-hero-description">
                A recent composite restoration — plus straight answers to
                the questions patients ask most about tooth-colored fillings.
              </p>
            </div>
          </div>
        </section>

        <section className="cfr-body">
          <div className="cfr-inner">

            <div className="surgery-consent" role="note">
              <span className="surgery-consent-tag">Note</span>
              <p>
                The patient depicted in this case study has provided their consent
                to display their photos online. Results vary by case — schedule
                a consultation to discuss what&apos;s possible for your smile.
              </p>
            </div>

            {/* Solo case — large slider with caption above */}
            <article className="cfr-case">
              <span className="cfr-case-eyebrow">Recent case</span>
              <h2>A tooth-colored repair, finished in one visit</h2>
              <p className="cfr-case-caption">
                A composite filling shaded and sculpted in-office to blend
                naturally with the surrounding tooth — the kind of repair
                that&apos;s impossible to spot once it&apos;s polished.
              </p>
              <div className="cfr-case-slider">
                <BeforeAfterSlider
                  beforeSrc="/img/composite-fillings/case-before.jpg"
                  afterSrc="/img/composite-fillings/case-after.jpg"
                  beforeAlt="Tooth before composite filling"
                  afterAlt="Restored smile after composite filling"
                />
                <p className="cfr-case-hint">⇄&nbsp; Drag to compare</p>
              </div>
            </article>

            {/* Vertical numbered process timeline (different from horizontal numbered process on crowns-caps) */}
            <div className="cfr-process">
              <header>
                <span className="num">— How we do it</span>
                <h2>What a composite filling visit looks like</h2>
                <p>
                  Five short steps, one appointment. Here&apos;s exactly what
                  happens from the time you sit down to when you leave.
                </p>
              </header>
              <ol className="cfr-process-list">
                {STEPS.map((s, i) => (
                  <li key={s.title} className="cfr-process-step">
                    <div className="cfr-process-rail">
                      <span className="cfr-process-num">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {i < STEPS.length - 1 && (
                        <span className="cfr-process-line" aria-hidden />
                      )}
                    </div>
                    <div className="cfr-process-content">
                      <h3>{s.title}</h3>
                      <p>{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Accordion FAQ — the new interactive pattern */}
            <div className="cfr-faq">
              <header>
                <span className="num">— Questions we hear most</span>
                <h2>Composite fillings — frequently asked</h2>
                <p>
                  Six common questions about tooth-colored fillings, answered
                  honestly. Tap any question to expand.
                </p>
              </header>
              <AccordionFAQ items={FAQS} />
            </div>

            <div className="cfr-cta">
              <h2>Need a tooth repaired — without the silver?</h2>
              <p>
                Book a complimentary consultation. We&apos;ll evaluate the
                tooth, talk through whether composite is the right material,
                and complete most fillings in a single appointment.
              </p>
              <div className="cfr-cta-actions">
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
          { name: "Smile Gallery", url: "/smile-gallery" },
          { name: "Composite Fillings — Recent", url: "/smile-gallery/composite-fillings-recent" },
        ]}
      />
</>
  );
}
