import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import ProcedureDetail from "@/components/ProcedureDetail";
import AwardsStrip from "@/components/AwardsStrip";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";
import { getCategory } from "@/lib/procedure-categories";

// Month 2 city page — Porcelain Veneers × Oakland (run-plan #47/#48). Reuses the
// procedure template; every clinical line is grounded in the parent Porcelain
// Veneers page or a cited source listed at the foot of the page.

export const metadata: Metadata = {
  title: "Porcelain Veneers for Oakland Patients",
  description:
    "Porcelain veneers for Oakland patients — planned by Drs. Martenson and Ma on Grand Avenue in Piedmont, 1.4 miles from Lake Merritt. Complimentary consultation.",
  alternates: { canonical: "/oakland/porcelain-veneers" },
  openGraph: {
    title: "Porcelain Veneers for Oakland Patients — Piedmont Dental By Design",
    description:
      "Custom porcelain veneers for Oakland patients, a few minutes up Grand Avenue: exam, shade chosen in person, lab-made shells bonded in two visits.",
    url: "https://piedmontdentalbydesign.com/oakland/porcelain-veneers",
    type: "article",
    images: ["/img/procedures/cosmetic-dentistry/_index/figure-1.jpg"],
  },
};

const category = getCategory("cosmetic-dentistry");

export default function OaklandPorcelainVeneersPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="porcelain-veneers"
          cityPage={{ href: "/oakland/porcelain-veneers", city: "Oakland" }}
          title="Porcelain Veneers for Oakland Patients"
          tagline="Hand-shaped, color-matched porcelain — planned and bonded a few minutes up Grand Avenue from the lake."
          intro={[
            "Porcelain veneers are thin, custom-made shells bonded to the front of teeth to correct chips, gaps, stains and uneven shapes. For Oakland patients, Dr. Jill Martenson and Dr. David Ma plan and place them at our Grand Avenue office in Piedmont — about 1.4 miles from Lake Merritt, and roughly seven minutes from Rockridge BART or Montclair Village without traffic.",
            "The Oakland city line is only a few blocks below our door, and Grand Avenue runs from the lake straight up to it. This page covers how veneers are done in this office, who they suit and who they don't, how they compare with bonding and crowns, what the research says about how long they last, and what the visits from Oakland involve.",
          ]}
          stats={[
            { value: "~6 min", label: "From Lake Merritt, no traffic" },
            { value: "2.6 mi", label: "From Rockridge BART" },
            { value: "2 visits", label: "To prepare and bond" },
            { value: "0.3–0.5 mm", label: "Enamel removed per tooth" },
          ]}
          sections={[
            {
              title: "Why Oakland patients come up Grand Avenue for veneers",
              body: [
                "Veneers are the most personal thing a dentist makes for you: shape, length, shade and how light passes through the porcelain are all decided face to face. Here the dentist who examines you, chooses the shade with you and bonds the finished veneers is one of the two co-owners, Dr. Martenson or Dr. Ma — not a different clinician at every visit.",
                "The other reason is geography. Piedmont is the small city Oakland surrounds, and our office at 1331 Grand Avenue sits a few blocks above the city line: about 1.4 miles from Lake Merritt, 2.6 miles from Rockridge BART and 3.1 miles from Montclair Village, six or seven minutes each without traffic. Veneer cases from this practice are in the before-and-after resource on this site.",
              ],
            },
            {
              title: "How porcelain veneers are done here",
              body: [
                "Every case begins with a complimentary consultation: we examine your teeth and gums, take digital and panoramic X-rays where needed, and tell you honestly whether veneers are the right tool — or whether whitening, bonding, Invisalign® or a crown would serve you better. If they are, treatment usually takes two visits, with little or no anesthesia:",
              ],
              bullets: [
                "Preparation: the front of each tooth is lightly buffed and shaped to make room for the veneer — typically 0.3 to 0.5 millimeters of enamel.",
                "Impression and shade: a mold of the prepared teeth is taken, and you and the dentist choose the color together, in person.",
                "The laboratory: a professional dental laboratory makes each veneer by hand to that mold and shade.",
                "Bonding: at the second visit the teeth are cleaned with special conditioning liquids, bonding cement goes between tooth and veneer, and a curing light sets it. You leave with care instructions.",
              ],
            },
            {
              title: "Who porcelain veneers are for",
              body: [
                "Veneers change the surface of a tooth, not its position or its health, so they suit teeth that are sound but do not look the way you want. Most cosmetic cases here use six to eight upper veneers — the teeth that show when you smile — and a single veneer is common for one chipped or stained tooth. The American Dental Association lists chipped, stained, crooked or misshapen teeth and gaps among the things veneers correct (ADA MouthHealthy). We recommend them for:",
              ],
              bullets: [
                "Chipped or worn front teeth.",
                "Stains that whitening cannot lift.",
                "Uneven or unwanted spaces.",
                "Teeth that are too small, too large or oddly shaped.",
                "Mildly crooked front teeth, where a straight-looking result matters more than moving the tooth.",
              ],
            },
            {
              title: "When we'll tell you veneers aren't the answer",
              body: [
                "Because enamel is removed, a veneer is not reversible — the ADA says so in as many words (ADA MouthHealthy) — so we say no more often than you might expect. If you clench or grind, or have a deep overbite, the ADA notes veneers may not be a good choice, and that habit has to be understood before any porcelain goes on. Significantly crowded or rotated teeth usually do better with Invisalign® first and veneers afterwards, if still needed. A structurally damaged or decayed tooth needs a crown, not a shell.",
                "What lies underneath matters too. A 2025 study of 672 veneers followed for up to fifteen years found 96.7 percent survival when the veneer was bonded entirely to enamel, against 93.9 percent when more than 30 percent of the surface was dentin; any dentin exposure raised the odds of failure about three and a half times (Etienne et al., Journal of Esthetic and Restorative Dentistry, 2025). That is why we keep preparations thin, and why heavily worn teeth are sometimes a crown conversation instead. And if what you actually want is a whiter smile, we will say so: porcelain cannot be bleached, so we whiten natural teeth first and match the veneers to the new shade.",
              ],
            },
            {
              title: "Veneers vs bonding vs crowns",
              body: [
                "Composite bonding is tooth-colored filling material shaped directly on the tooth in one visit. It costs less, removes little or no enamel and is easy to repair, but the ADA notes it is not as stain- or wear-resistant as porcelain (ADA MouthHealthy); in our experience it lasts five to seven years before it needs refreshing. It suits a small chip, a single edge, or someone not ready for something irreversible.",
                "A porcelain veneer covers only the front and biting edge of the tooth: laboratory-made, two visits, does not stain, holds up for many years — the long-term answer for front teeth that are healthy but unattractive.",
                "A crown encases the whole tooth. It is right when a tooth is structurally weak or decayed, and wrong for a sound tooth that simply looks wrong, because it removes far more tooth than a veneer; the ADA draws the same line between covering the front surface and the entire tooth structure (ADA MouthHealthy).",
              ],
            },
            {
              title: "What the timeline looks like from Oakland",
              body: [
                "Count on three trips up Grand Avenue. The first is the consultation, with X-rays and a candid conversation about what veneers can and cannot do for your teeth. The second is the preparation visit — shaping, impression, shade — and the longest of the three. The laboratory then needs about two weeks. The third is the bonding visit, when the veneers are tried in, adjusted and cemented for good. Whitening, if you want it, comes before the preparation visit so the shade we match is the one you will keep.",
              ],
            },
            {
              title: "How long porcelain veneers last — what the evidence says",
              body: [
                "Most practices say ten to fifteen years; the published evidence is more useful. A 2021 systematic review in the Journal of Clinical Medicine pooled 25 studies and about 6,500 porcelain laminate veneers and put ten-year survival at 95.5 percent — 96.3 percent when only fracture counted as failure, 99.2 percent for debonding and 99.3 percent for new decay under the veneer. Veneers that covered the biting edge failed less often than those that did not, which is how ours are designed.",
                "Porcelain veneers are very durable and, with good care, last 15 years or more, though they may one day need replacing. The ADA notes a chipped, worn or loosened veneer can often be re-bonded or repaired rather than replaced (ADA MouthHealthy).",
              ],
            },
            {
              title: "Living with veneers day to day",
              body: [
                "Veneers need no special products — just the habits that keep natural teeth healthy, and some respect for the fact that porcelain is strong but not indestructible.",
              ],
              bullets: [
                "Brush twice a day with a non-abrasive toothpaste and floss daily; the veneer cannot decay, but the tooth behind it and the gumline can.",
                "Do not bite fingernails, pen caps, ice or packaging, and wear a mouthguard for contact sports — the ADA's own list of how veneers get chipped (ADA MouthHealthy).",
                "Porcelain does not absorb stain the way enamel does, but your natural teeth still do; the ADA advises limiting staining foods and drinks so the two stay matched (ADA MouthHealthy).",
                "Keep your six-month visits — we polish the veneers and check the seal at each one — and if you grind, say so.",
              ],
            },
            {
              title: "Getting here from Oakland",
              body: [
                "Our office is at 1331 Grand Avenue, Piedmont, in a two-storey building: the practice is on the upper level and the parking entrance is below it. The address is shared with The Oldershaw Clinic — look for our sign on the railing and take the planted walkway from the parking area to the front door.",
              ],
              bullets: [
                "Driving: Grand Avenue runs from Lake Merritt straight to our door — about 1.4 miles, roughly six minutes without traffic. Rockridge BART is about 2.6 miles and Montclair Village about 3.1 miles, each around seven minutes; MacArthur BART is a short drive.",
                "Parking: street parking is generally available on Grand Avenue near the entrance.",
                "Bus: AC Transit's Line 12 comes up Grand Avenue from the lake and stops at Grand & Euclid, about three-quarters of a mile below the office; it does not climb into Piedmont. Line 88 ends on Highland Avenue in Piedmont, about a mile away.",
              ],
            },
            {
              title: "Cost and coverage, without the runaround",
              body: [
                "We will not quote a fee on a web page, because a veneer fee depends on your teeth, the number of veneers and the laboratory work — and because you deserve a number that comes from an examination, in writing. The market picture: Delta Dental puts porcelain laminate veneers at roughly $1,180 to $2,185 per tooth without insurance, moved by the material, the location of the practice and your coverage; it also describes veneers as commonly considered cosmetic and often not covered, though some plans include them (Delta Dental). Bay Area fees run above these national figures. See our current fees on the Porcelain Veneers page. Check your benefits first. CareCredit financing is available for the balance.",
                "One caution about cheap deals. In May 2024 the American Dental Association warned about unlicensed “veneer technicians,” citing infection from unsterilized adhesives and curing devices, nerve damage from improper trimming of teeth and a choking hazard during placement, and reminded the public that altering the structure of teeth without a dentist's supervision can cause irreversible harm (ADA statement, 14 May 2024). A veneer is a dental procedure, and its price includes the diagnosis behind it.",
              ],
            },
          ]}
          faqs={[
            {
              q: "Do you take veneer patients from Oakland?",
              a: "Yes. Oakland is next door — our office is on Grand Avenue in Piedmont, a few blocks above the city line, about 1.4 miles from Lake Merritt and roughly seven minutes from Rockridge or Montclair without traffic. Dr. Martenson and Dr. Ma see patients from across the East Bay.",
            },
            {
              q: "How many trips from Oakland will veneers take?",
              a: "Usually three: a complimentary consultation with X-rays, a preparation visit when the teeth are shaped and the shade chosen, and a bonding visit about two weeks later once the laboratory has made the veneers. Each is a short drive up Grand Avenue, and Dr. Martenson or Dr. Ma sees you at all three.",
            },
            {
              q: "How far are you from Lake Merritt, Rockridge and Montclair?",
              a: "About 1.4 miles from Lake Merritt — roughly six minutes without traffic — and about 2.6 miles from Rockridge BART and 3.1 miles from Montclair Village, each around seven minutes. Grand Avenue runs from the lake directly to our door.",
            },
            {
              q: "Where do I park, and is there a bus?",
              a: "Street parking is generally available on Grand Avenue near the entrance; the parking entrance is below the building and a planted walkway leads up to the door. AC Transit's Line 12 stops at Grand & Euclid, about three-quarters of a mile below us; Line 88 ends on Highland Avenue in Piedmont, about a mile away. MacArthur BART is a short drive.",
            },
            {
              q: "How long do porcelain veneers last?",
              a: "A 2021 systematic review of about 6,500 veneers found 95.5 percent still in place at ten years, and veneers bonded to enamel do best. With good care, porcelain veneers last 15 years or more. They are not permanent, though, and a chipped one can often be repaired or re-bonded.",
            },
            {
              q: "Do veneers ruin your natural teeth?",
              a: "They change them permanently, but conservatively. About 0.3 to 0.5 millimeters of enamel is removed, and the ADA is clear the treatment is not reversible because of it; that tooth will always need a veneer or a crown. For some naturally small or worn teeth, veneers can be placed with little or no preparation.",
            },
            {
              q: "Can porcelain veneers be whitened?",
              a: "No. Porcelain does not respond to bleach, so if you want a brighter smile we whiten your natural teeth first and match the veneers to the new shade. Whitening afterwards would leave the veneers darker than the teeth around them.",
            },
            {
              q: "How much do porcelain veneers cost in Oakland?",
              a: "Delta Dental puts porcelain laminate veneers at about $1,180 to $2,185 per tooth without insurance, and most plans treat them as cosmetic and do not cover them. Bay Area fees run above these national figures. See our current fees on the Porcelain Veneers page. Your figure depends on how many teeth are involved and the laboratory work, so we quote in writing after the consultation; CareCredit financing is available.",
            },
            {
              q: "Will my veneers look fake?",
              a: "Not if they are made for your face. Shade, shape, length and translucency are chosen with you in person, and the veneers are made by hand in a professional dental laboratory to that plan. The usual mistake is porcelain that is too white and too uniform; we aim for teeth that look like your own, only better.",
            },
          ]}
          sources={[
            {
              label: "American Dental Association, MouthHealthy — Veneers",
              href: "https://www.mouthhealthy.org/all-topics-a-z/veneers",
            },
            {
              label:
                "Journal of Clinical Medicine, 2021 — Long-Term Survival and Complication Rates of Porcelain Laminate Veneers in Clinical Studies: A Systematic Review",
              href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7961608",
            },
            {
              label:
                "Etienne et al., Journal of Esthetic and Restorative Dentistry, 2025 — Survival of Ceramic Veneers: Impact of Dentin Exposure and Tooth Vitality After 1 to 15 Years of Follow-Up",
              href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12618969",
            },
            {
              label: "Delta Dental — Dental veneers cost and insurance: What you need to know",
              href: "https://www.deltadental.com/protect-my-smile/procedures/veneers/cost-and-insurance-coverage/",
            },
            {
              label:
                "American Dental Association — Statement on Recent Reports of “Veneer Technicians” (14 May 2024)",
              href: "https://www.ada.org/about/press-releases/statement-on-recent-reports-of-veneer-technicians",
            },
          ]}
          featuredImage="/img/home-services/porcelain-veneers.jpg"
          featuredAlt="Porcelain veneers — Piedmont Dental By Design, serving Oakland"
        />
        <AwardsStrip />
        <AboutCTA />
      </main>
      <SiteFooter />
    </>
  );
}
