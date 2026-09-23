import type { Metadata } from "next";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import CategoryIndex from "@/components/CategoryIndex";
import AwardsStrip from "@/components/AwardsStrip";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";
import FAQPageSchema from "@/components/schema/FAQPageSchema";
import { getCategory } from "@/lib/procedure-categories";

export const metadata: Metadata = {
  title:
    "Dental Restoration in Piedmont, CA",
  description:
    "Fillings, crowns, bridges, dentures and implants in Piedmont, CA — which one you need, what each costs, and how to choose. From $361 fillings to implants.",
  alternates: { canonical: "/procedures/restoration" },
  openGraph: {
    title: "Restoration — Piedmont Dental By Design",
    description:
      "Implants, crowns, fillings, bridges, and dentures — restoring damaged or missing teeth.",
    url: "https://piedmontdentalbydesign.com/procedures/restoration",
    type: "website",
  },
};

const category = getCategory("restoration");

/* Hub content added 2026-08-13. This page held 2,709 impressions at position 35
   while carrying 329 words — less than every child page beneath it (1,005–1,228).
   A hub has to earn the broad term ("restorative dentistry Piedmont") and help a
   visitor who does not yet know which procedure they need.

   Every figure and comparison below is lifted from the child pages, which already
   publish them. Nothing here is a new clinical or pricing claim — if a child page
   changes its range, change it here in the same commit.

   NOT included, deliberately: the six-town service-area block. That list is an
   open client question, so it is not published here as fact. */

/* Cost table rows. Ranges and timelines are copied from each treatment page —
   change them there and here together. Dentures carry no published figure, so
   the cell says so rather than inventing one. */
const COSTS = [
  { treatment: "Composite filling", slug: "composite-fillings", range: "$361–$565", unit: "per filling", visits: "1 visit" },
  { treatment: "Porcelain crown", slug: "crowns-caps", range: "$1,949–$2,351", unit: "back tooth — front teeth from $2,379", visits: "Same day with CEREC®, or 2 visits" },
  { treatment: "Fixed bridge", slug: "fixed-bridges", range: "$5,847–$6,651", unit: "typical three-unit", visits: "2+ visits" },
  { treatment: "Dental implant", slug: "dental-implants", range: "$8,474+", unit: "single tooth", visits: "Several visits over months" },
  { treatment: "Dentures & partials", slug: "dentures-partial-dentures", range: "$2,976–$3,173", unit: "varies by arch", visits: "Several visits over weeks" },
];

/* The decision aid. This is the thing a hub owes a visitor that a list of links
   does not: which of these five do I actually need? Both columns are drawn from
   the child pages' own FAQ answers. */
const DECISION = [
  {
    tag: "The tooth is still there",
    lead: "Repair what is left",
    win: false,
    points: [
      ["Composite filling", "Decay, a chip or a small fracture — repaired in one visit, colour-matched to the tooth."],
      ["Porcelain crown", "Too little sound tooth left for a filling: a cracked tooth, a large old filling, or a tooth after root canal treatment. The crown covers what remains and takes the chewing force."],
    ],
  },
  {
    tag: "The tooth is gone",
    lead: "Replace what is missing",
    win: true,
    points: [
      ["Dental implant", "Stands alone in the jawbone and leaves the neighbouring teeth untouched — the more conservative choice when those teeth are healthy."],
      ["Fixed bridge", "Anchors to the teeth either side. Faster and usually cheaper, but those anchor teeth are filed down permanently and need crowns from then on."],
      ["Dentures & partials", "Replaces a full arch, or fills larger gaps where several teeth are missing."],
    ],
  },
];

const HUB_FAQS = [
  {
    q: "A tooth is missing — should I get an implant or a bridge?",
    a: "A bridge anchors to the natural teeth either side of the gap; an implant stands alone as an artificial root in the jawbone. Bridges are faster (2–3 weeks against 4–9 months) and usually cost less, but the anchor teeth must be filed down permanently and will need crowns from then on. When those neighbouring teeth are healthy and untouched, an implant is the more conservative choice because it leaves them alone.",
  },
  {
    q: "How much does each restoration cost?",
    a: "Composite fillings run $361–$565 depending on size. Porcelain crowns are $1,949–$2,351 per tooth at the back of the mouth; front teeth start at $2,379. A typical three-unit fixed bridge is $5,847–$6,651. A single dental implant starts at $8,474; cases needing bone grafting or a sinus lift cost more. Dentures and partials run $2,976–$3,173 depending on the arch. We give you a written estimate before treatment, and we submit a pre-treatment estimate to your insurer so you know your share up front.",
  },
  {
    q: "Can a badly damaged tooth be saved, or does it have to come out?",
    a: "Usually it can be saved. A composite filling handles decay, chips and small fractures. When too little healthy structure remains for a filling — a cracked tooth, a large old filling, or a tooth after root canal treatment — a crown encases what is left and protects it from breaking. Extraction and replacement is the last option, not the first, and we will tell you plainly which category your tooth falls into.",
  },
  {
    q: "How long do restorations last?",
    a: "Composite fillings and bridges last many years with good care; porcelain crowns commonly last 15–25 years and some go beyond 30. Implants are designed to last a lifetime — the titanium root rarely fails, though the crown on top may need replacing after 15–20 years. What usually fails first is not the restoration but the natural tooth underneath, if new decay forms at the margin.",
  },
  {
    q: "Can any of this be done in one visit?",
    a: "Composite fillings are a single appointment. Many crowns are too — with CEREC we scan, mill and bond the permanent crown in our office in about 1.5 to 2 hours, with no temporary. Bridges take two or more visits, dentures several over some weeks, and implants span months because the jawbone has to integrate with the implant before the final tooth goes on.",
  },
];

const CARDS = [
  {
    slug: "dental-implants",
    title: "Dental Implants",
    description:
      "Titanium artificial roots and teeth surgically placed into the jaw — the gold standard for replacing missing teeth without affecting adjacent ones.",
    meta: "Several visits over months · Lifetime",
  },
  {
    slug: "composite-fillings",
    title: "Composite Fillings",
    description:
      "Tooth-colored fillings that repair decay, chips, fractures, and worn teeth — closely matched to natural enamel for a discreet result.",
    meta: "1 visit · Many years",
  },
  {
    slug: "crowns-caps",
    title: "Crowns (Caps)",
    description:
      "Custom porcelain coverings that restore the shape, size, and strength of damaged teeth — the most popular restoration for cracked or large-filling teeth.",
    meta: "2 visits · Many years",
  },
  {
    slug: "dentures-partial-dentures",
    title: "Dentures & Partial Dentures",
    description:
      "Removable replacements for missing teeth — complete dentures for full arches, partials for gaps, both crafted to look and feel natural.",
    meta: "Several visits · Many years",
  },
  {
    slug: "fixed-bridges",
    title: "Fixed Bridges",
    description:
      "Non-removable porcelain-fused-to-metal appliances that fill the gap left by one or more missing teeth, anchored to adjacent crowns.",
    meta: "2+ visits · Many years",
  },
];

export default function RestorationCategoryPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <CategoryIndex
          slug={category.slug}
          label={category.label}
          eyebrow="Procedures · Restoration"
          title="Restoration"
          intro={[
            "Restorative dentistry repairs teeth that are damaged, decayed or missing. At Piedmont Dental By Design that covers five treatments — composite fillings, porcelain crowns, fixed bridges, dentures and dental implants — chosen according to how much healthy tooth is left and whether the tooth is still there at all.",
            "As a rule: a filling repairs a tooth with decay or a small fracture; a crown covers a tooth too damaged to hold a filling; a bridge or an implant replaces a tooth that is already gone. Dr. Jill Martenson, DDS and Dr. David Ma will tell you which category your tooth falls into and what each option costs before anything is scheduled.",
          ]}
          image="/img/lIVE Piedmont website images/Fusion-Dental-Care-Raleigh-NC-Oral-Surgery-1596x1024-1.jpeg"
          imageAlt="Restorative dentistry consultation at Piedmont Dental By Design"
          cards={CARDS}
        />

        <section className="rest-guide" aria-labelledby="choosing-heading">
          <div className="rest-guide-inner">
            <header className="rest-guide-head">
              <span className="num">i. — Where to start</span>
              <h2 id="choosing-heading">Which treatment do you need?</h2>
              <p>
                Most people arrive knowing something is wrong, not knowing which
                treatment fixes it. One question decides it.
              </p>
            </header>

            <div className="rest-decide-grid">
              {DECISION.map((col) => (
                <div
                  key={col.tag}
                  className={`rest-decide-col${col.win ? " rest-decide-col--accent" : ""}`}
                >
                  <span className="rest-decide-tag">{col.tag}</span>
                  <h3>{col.lead}</h3>
                  <ul>
                    {col.points.map(([name, body]) => (
                      <li key={name}>
                        <strong>{name}</strong>
                        <span>{body}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <header className="rest-guide-head rest-guide-head--tight">
              <span className="num">ii. — What it costs</span>
              <h2>Typical ranges, before insurance</h2>
              <p>
                Your figure depends on the tooth, the materials and your plan. We
                give a written estimate before treatment and submit a pre-treatment
                estimate to your insurer, so you know your share in advance.
              </p>
            </header>

            <div className="rest-costs-wrap">
              <table className="rest-costs">
                <thead>
                  <tr>
                    <th scope="col">Treatment</th>
                    <th scope="col">Typical range</th>
                    <th scope="col">Timeline</th>
                  </tr>
                </thead>
                <tbody>
                  {COSTS.map((c) => (
                    <tr key={c.slug}>
                      <th scope="row">
                        <Link href={`/procedures/restoration/${c.slug}`}>
                          {c.treatment}
                        </Link>
                      </th>
                      <td>
                        <span className="rest-costs-range">{c.range}</span>
                        <span className="rest-costs-unit">{c.unit}</span>
                      </td>
                      <td>{c.visits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <header className="rest-guide-head rest-guide-head--tight">
              <span className="num">iii. — Common questions</span>
              <h2 id="restoration-faqs-heading">Frequently asked questions</h2>
            </header>
            <div className="proc-faq-list">
              {HUB_FAQS.map((f, i) => (
                <details key={i} className="proc-faq-item">
                  <summary className="proc-faq-question">
                    <span>{f.q}</span>
                    <span className="proc-faq-icon" aria-hidden>
                      +
                    </span>
                  </summary>
                  <div className="proc-faq-answer">
                    <p>{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <AwardsStrip />
        <AboutCTA />
      </main>
      <FAQPageSchema faqs={HUB_FAQS} />
      <SiteFooter />
    </>
  );
}
