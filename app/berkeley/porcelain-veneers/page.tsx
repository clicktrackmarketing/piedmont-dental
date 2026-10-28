import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import ProcedureDetail from "@/components/ProcedureDetail";
import AwardsStrip from "@/components/AwardsStrip";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";
import { getCategory } from "@/lib/procedure-categories";

// Month 2 city page — porcelain veneers × Berkeley. Reuses the procedure
// template; every clinical line is grounded in the parent porcelain-veneers
// page or a cited source listed at the foot of the page.

export const metadata: Metadata = {
  title: "Porcelain Veneers for Berkeley Patients",
  description:
    "Porcelain veneers for Berkeley patients — planned, shade-matched and bonded by Drs. Martenson and Ma on Grand Avenue in Piedmont, about 2.8 miles from Elmwood. Complimentary consultation.",
  alternates: { canonical: "/berkeley/porcelain-veneers" },
  openGraph: {
    title: "Porcelain Veneers for Berkeley Patients — Piedmont Dental By Design",
    description:
      "Custom porcelain veneers for Berkeley adults, a short drive down from Elmwood and Claremont: exam, shade match, preparation and bonding under one roof.",
    url: "https://piedmontdentalbydesign.com/berkeley/porcelain-veneers",
    type: "article",
    images: ["/img/procedures/cosmetic-dentistry/_index/figure-1.jpg"],
  },
};

const category = getCategory("cosmetic-dentistry");

export default function BerkeleyPorcelainVeneersPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="porcelain-veneers"
          cityPage={{ href: "/berkeley/porcelain-veneers", city: "Berkeley" }}
          title="Porcelain Veneers for Berkeley Patients"
          tagline="Lab-made porcelain for Berkeley smiles — shaped, shade-matched and bonded on Grand Avenue in Piedmont, about nine minutes from Elmwood."
          intro={[
            "Porcelain veneers are thin, custom-made shells of dental porcelain, built by a laboratory to your shape and shade and bonded to the front of the teeth that show when you smile. Dr. Jill Martenson and Dr. David Ma plan and place them at our office on Grand Avenue in Piedmont — about 2.8 miles from Elmwood, 3.6 miles from Claremont, and roughly a thirteen-minute drive from Downtown Berkeley BART without traffic.",
            "Berkeley has veneer dentists of its own, so the fair question is why anyone would make the drive down to see us. This page answers it plainly: what the treatment involves here, who it suits and who it doesn't, how porcelain compares with bonding and crowns, what the long-term evidence actually shows, and how to reach Piedmont from Berkeley by car, bus or BART. It is the same ground we cover, without charge, at a consultation.",
          ]}
          stats={[
            { value: "2.8 mi", label: "From Elmwood" },
            { value: "~13 min", label: "From Downtown Berkeley" },
            { value: "2 visits", label: "Preparation, then bonding" },
            { value: "0.3–0.5 mm", label: "Enamel removed, typically" },
          ]}
          sections={[
            {
              title: "Why Berkeley patients make the drive down to Piedmont",
              body: [
                "Veneers are the one cosmetic treatment where the dentist's eye counts for as much as the laboratory's hands. How much enamel to keep, where each edge should fall, which shade reads as natural beside your other teeth — these are judgment calls, and here they are made by one of the two co-owners, Dr. Martenson or Dr. Ma, who examines you, prepares the teeth, matches the color in person and bonds the porcelain. The same dentist sees you at every visit. For a treatment the ADA describes as not reversible (ADA MouthHealthy), that continuity is worth a few extra miles.",
                "And they are only a few. Our office is at 1331 Grand Avenue in Piedmont, the small city wrapped inside Oakland a short way down from Berkeley. From Elmwood, at College and Ashby, it is about 2.8 miles and roughly nine minutes without traffic; from Claremont, at Ashby and Domingo, about 3.6 miles and eleven minutes; from Downtown Berkeley BART or the UC Berkeley campus, about 4.3 to 4.4 miles and thirteen minutes. Even North Berkeley, at Shattuck and Vine, is about 4.9 miles and fifteen minutes away — and everything, from the exam to the bonding, happens in this one building.",
              ],
            },
            {
              title: "How porcelain veneers work here",
              body: [
                "It begins with a complimentary consultation. We look closely at the teeth you want to change and the ones beside them, check your gums and bite, and take X-rays where we need to rule out decay underneath — the ADA is clear that decay or gum disease must be treated before a veneer is placed (ADA MouthHealthy). Then we talk about what you actually want to see in the mirror and whether porcelain is the honest way to get there. If it is, treatment runs over two visits, usually with little or no anesthetic, and follows the same steps for everyone:",
              ],
              bullets: [
                "Preparation. The front of each tooth is lightly buffed and reshaped to make room for the porcelain — typically about 0.3 to 0.5 mm of enamel, a fraction of what a crown requires.",
                "Impression and shade. We take an impression of the prepared teeth, and you and the dentist choose the color together, in person.",
                "The laboratory. A dental laboratory makes each veneer to that impression and that shade; nothing comes from a stock kit.",
                "Bonding. At the second visit the teeth are cleaned with conditioning liquids so the cement can grip, each veneer is seated in bonding cement, and a curing light sets it hard.",
                "Aftercare. You leave with care instructions; from then on, brushing, cleaning between the teeth and your regular visits are what keep the veneers well.",
              ],
            },
            {
              title: "Who porcelain veneers are for",
              body: [
                "A veneer changes the face of a tooth — its color, its outline, its length and the space beside it — while leaving the rest of the tooth alone. In our practice it is the usual answer for adults whose teeth are sound but whose front teeth they dislike.",
                "How many you need depends on what shows when you smile: one veneer can rescue a single chipped or dark tooth, most cosmetic cases use six to eight across the upper front teeth, and a full smile design can run to ten upper and eight lower. We plan the number with you, not for you. Veneers suit:",
              ],
              bullets: [
                "Teeth stained too deeply for whitening to shift.",
                "Chips, and edges worn down over the years.",
                "Small gaps, or spacing that is uneven.",
                "Teeth that look too short, too narrow or oddly shaped beside their neighbors.",
                "A front tooth that is mildly crooked or rotated.",
                "A smile that is uneven in color and shape overall, where the aim is a uniform, natural-looking result.",
              ],
            },
            {
              title: "When we'll tell you veneers aren't the answer",
              body: [
                "Some people who arrive asking for veneers leave with a different plan, and we would rather say so at the consultation than bond porcelain to the wrong problem.",
                "Decay and gum disease come first, every time (ADA MouthHealthy). If you clench or grind your teeth, or have a deep overbite, the ADA says veneers may not be a good choice — and because fracture is the most common way a veneer fails, according to a 2021 systematic review of 6,500 veneers in the Journal of Clinical Medicine, we take that warning seriously. If a tooth is structurally damaged or heavily decayed, a crown that covers the whole tooth is the right repair, not a veneer. And if the underlying issue is crowding or a bite that is off, straightening first with Invisalign® — with veneers afterwards only if they are still wanted — is the more conservative route.",
              ],
            },
            {
              title: "Veneers vs bonding vs crowns",
              body: [
                "Composite bonding is tooth-colored resin shaped directly onto the tooth in a single visit. It needs less enamel removed and fewer visits, it costs less, and if it chips it can be patched in the chair — the ADA notes that composite is easier to fix if damaged (ADA MouthHealthy). The trade is that composite is not as stain- or wear-resistant as porcelain (ADA MouthHealthy), so it dulls and roughens sooner. For one small chip, or a change you want to try before committing, bonding is often the sensible choice; for several teeth at once, or a result you want to keep for a decade or more, porcelain is the longer answer.",
                "A crown covers the whole tooth, all the way round, and is the answer when the tooth itself is weak, cracked or heavily decayed. A veneer covers only the front face and the biting edge. On a healthy front tooth that simply looks wrong, a veneer keeps far more of your own tooth; on a damaged one, a crown is the safer structure.",
                "Two smaller notes. Whitening bleaches natural teeth only — porcelain does not change shade — so if you want a brighter smile overall, we whiten first and match the veneers to the new color. And a few teeth that are naturally small or worn can take a “no-prep” veneer with almost no enamel removed; we will tell you if yours qualify rather than promise it in advance.",
              ],
            },
            {
              title: "What to expect, visit by visit",
              body: [
                "Most Berkeley patients make three trips in all: the consultation, the preparation visit and the bonding visit. Because the consultation is free and the drive is short, we would rather you come once and talk than decide from a website. Bring examples of smiles you like and smiles you don't — the aim is a result that fits your face, not a magazine cover, and the commonest cosmetic mistake is veneers that are too white or too uniform.",
                "The preparation visit covers shaping, impression and shade. The laboratory then makes the veneers, which is what the gap between visits is for; there is nothing for you to attend in between. At the bonding visit the teeth are conditioned, each veneer is cemented and cured in place, and you leave with the finished smile and your care instructions.",
              ],
            },
            {
              title: "How long porcelain veneers last — what the evidence says",
              body: [
                "Porcelain veneers are durable but not permanent, and we say so up front: like any restoration, they may one day need replacing. The long-term numbers are reassuring. A 2021 systematic review of 25 studies and 6,500 porcelain veneers put ten-year cumulative survival at 95.5 percent; counting fracture alone the figure was 96.3 percent, and debonding alone 99.2 percent (Journal of Clinical Medicine, 2021). A 2024 meta-analysis of 7,753 veneers followed for an average of 10.4 years found the same pattern, with survival between roughly 94 and 97 percent depending on the ceramic (Journal of Esthetic and Restorative Dentistry, 2024).",
                "Which side of those numbers you land on is largely settled before the veneer is made. Enamel is the big one: in a 2025 study of 672 veneers followed for one to fifteen years, those bonded entirely to enamel survived at 96.7 percent against 93.9 percent where more than 30 percent of the bonded surface was dentin, and any dentin exposure raised the odds of failure 3.47 times (Journal of Esthetic and Restorative Dentistry, 2025). Design matters too: the 2021 review found veneers that stopped short of the biting edge failed more often than those that covered it. Both shape how conservatively we prepare each tooth and how the porcelain is designed.",
              ],
            },
            {
              title: "Living with veneers day to day",
              body: [
                "Veneers ask for nothing exotic. Brush twice a day with a fluoride toothpaste, clean between your teeth daily (ADA MouthHealthy), and keep your regular exams and cleanings — that is the whole routine.",
                "The habits that shorten a veneer's life are the ones that chip natural teeth: biting fingernails, tearing packaging open with your teeth, chewing ice. Porcelain does not stain the way composite does, but it does not bleach either, so a veneer that looks dull beside teeth you have since whitened cannot be lightened, only replaced. And a veneer can chip, crack, wear or loosen over time; when it does, the ADA's guidance is that your dentist re-bonds, repairs or replaces it (ADA MouthHealthy) — a phone call and a short drive down from Berkeley.",
              ],
            },
            {
              title: "Getting here from Berkeley",
              body: [
                "We are at 1331 Grand Avenue, Piedmont — a two-storey building; the practice is on the upper level and the parking entrance sits below it. The address is shared with The Oldershaw Clinic, so look for our sign on the railing and take the planted walkway from the parking area to the front door.",
              ],
              bullets: [
                "Driving: about 2.8 miles from Elmwood (College and Ashby), 3.3 miles from Ashby BART, 3.6 miles from Claremont (Ashby and Domingo), 4.3 miles from Downtown Berkeley BART, 4.4 miles from the UC Berkeley campus and 4.9 miles from North Berkeley (Shattuck and Vine) — between about nine and fifteen minutes without traffic.",
                "Parking: street parking is generally available on Grand Avenue near the entrance.",
                "By bus: AC Transit's Line 88 runs from Downtown Berkeley via University Avenue, Sacramento Street, Market Street and Downtown Oakland to Highland Avenue and Highland Way in Piedmont, about a mile from the office. Line 12, from Gilman and 6th, comes down through Temescal and Piedmont Avenue to Grand Avenue and stops at Grand and Euclid, about three-quarters of a mile below us; it does not climb into Piedmont.",
                "BART: Ashby and Downtown Berkeley are the Berkeley-side stations; from either, the office is a short drive.",
              ],
            },
            {
              title: "Cost and coverage, without the runaround",
              body: [
                "Delta Dental puts the range for porcelain laminate veneers at about $1,180 to $2,185 per tooth without insurance, and notes that the price moves with the material, the location of the practice and your coverage (Delta Dental). Bay Area fees run above these national figures. See our current fees on the Porcelain Veneers page. Multiply that by the number of teeth that show when you smile and a full set is a real investment, which is why we give a complete written quote after the consultation — never a figure over the phone.",
                "On insurance, be realistic: veneers are commonly treated as cosmetic and are often not covered by employer, family or individual dental plans, though some plans do include them, so check your benefit details (Delta Dental). For whatever your plan does not pay, CareCredit financing is available.",
              ],
            },
          ]}
          faqs={[
            {
              q: "Do you see veneer patients from Berkeley?",
              a: "Yes. Our office is on Grand Avenue in Piedmont, about 2.8 miles from Elmwood and roughly nine minutes by car without traffic; Downtown Berkeley is about thirteen minutes. Dr. Martenson and Dr. Ma treat adults from Berkeley, Oakland and across the East Bay.",
            },
            {
              q: "How far is the office from Elmwood, Claremont and Downtown Berkeley?",
              a: "About 2.8 miles from Elmwood at College and Ashby, 3.6 miles from Claremont at Ashby and Domingo, and 4.3 miles from Downtown Berkeley BART — roughly nine, eleven and thirteen minutes without traffic. North Berkeley, at Shattuck and Vine, is about 4.9 miles and fifteen minutes.",
            },
            {
              q: "Can I get there from Berkeley by bus or BART?",
              a: "AC Transit's Line 88 runs direct from Downtown Berkeley to Highland Avenue and Highland Way in Piedmont, about a mile from the office. Line 12 from Gilman and 6th reaches Grand and Euclid, about three-quarters of a mile below us. Ashby and Downtown Berkeley are the nearest BART stations; from either, the office is a short drive.",
            },
            {
              q: "Is there parking?",
              a: "Street parking is generally available on Grand Avenue near the entrance. The parking entrance is beneath the building, and a planted walkway leads up to the front door on the upper level. We share the address with The Oldershaw Clinic, so look for our sign on the railing.",
            },
            {
              q: "How many trips from Berkeley will veneers take?",
              a: "Usually three: a complimentary consultation, the preparation visit where the teeth are shaped and the impression and shade are taken, and the bonding visit when the finished porcelain goes on. The laboratory work happens between the last two, so there is nothing to attend in between.",
            },
            {
              q: "How much do porcelain veneers cost in Berkeley?",
              a: "Delta Dental's published range for porcelain laminate veneers is about $1,180 to $2,185 per tooth without insurance, varying with material, location and coverage. Bay Area fees run above these national figures. See our current fees on the Porcelain Veneers page. We quote in writing after the consultation, never over the phone. Veneers are usually classed as cosmetic and often not covered, so check your plan; CareCredit financing is available.",
            },
            {
              q: "How long do porcelain veneers last?",
              a: "Many years, but not forever. A 2021 systematic review of 6,500 veneers found 95.5 percent still in place at ten years (Journal of Clinical Medicine), and a 2024 meta-analysis of 7,753 veneers found roughly 94 to 97 percent surviving at an average of 10.4 years. Two things the evidence singles out: bonding to enamel rather than exposed dentin, and not clenching or grinding on them.",
            },
            {
              q: "Do veneers damage your natural teeth?",
              a: "A thin layer of enamel — typically 0.3 to 0.5 mm — is removed to make room for the porcelain, and that step cannot be undone: the ADA describes veneer treatment as not reversible, and the tooth will always need a veneer or crown from then on. It is far less than a crown removes, and we take as little as the case allows.",
            },
            {
              q: "Can veneers be whitened?",
              a: "No. Porcelain does not respond to bleaching, so a veneer keeps the shade it was made in. If you want whiter teeth, we whiten your natural teeth first and match the veneers to the new color; a veneer that later looks dark beside whitened teeth can only be replaced.",
            },
            {
              q: "Will my veneers look fake?",
              a: "Not if they are planned well. Color, shape and translucency are chosen to suit your face and the teeth around them, and the shade is matched in person by the dentist who places them. The most common cosmetic mistake is veneers that are too white or too uniform, and we will steer you away from it.",
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
                "Journal of Esthetic and Restorative Dentistry, 2025 — Survival of Ceramic Veneers: Impact of Dentin Exposure and Tooth Vitality After 1 to 15 Years of Follow-Up",
              href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12618969",
            },
            {
              label:
                "Journal of Esthetic and Restorative Dentistry, 2024 — Survival and Complication Rates of Feldspathic, Leucite-Reinforced, Lithium Disilicate and Zirconia Ceramic Laminate Veneers: A Systematic Review and Meta-Analysis",
              href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12076113",
            },
            {
              label: "Delta Dental — Dental veneers cost and insurance: What you need to know",
              href: "https://www.deltadental.com/protect-my-smile/procedures/veneers/cost-and-insurance-coverage/",
            },
          ]}
          featuredImage="/img/home-services/porcelain-veneers.jpg"
          featuredAlt="Porcelain Veneers — Piedmont Dental By Design, serving Berkeley"
        />
        <AwardsStrip />
        <AboutCTA />
      </main>
      <SiteFooter />
    </>
  );
}
