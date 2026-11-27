import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import ProcedureDetail from "@/components/ProcedureDetail";
import AwardsStrip from "@/components/AwardsStrip";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";
import { getCategory } from "@/lib/procedure-categories";

export const metadata: Metadata = {
  title:
    "Gum Grafting in Piedmont, CA",
  description:
    "Gum grafting at our Piedmont office: graft types, what surgery and recovery involve, risks, cost factors and how a graft covers exposed roots.",
  alternates: { canonical: "/procedures/periodontal-services/gum-grafting" },
  openGraph: {
    title: "Gum Grafting — Piedmont Dental By Design",
    description:
      "Surgical correction of gum recession — cover exposed roots, reduce sensitivity, improve aesthetics.",
    url: "https://piedmontdentalbydesign.com/procedures/periodontal-services/gum-grafting",
    type: "article",
  },
};

const category = getCategory("periodontal-services");

export default function GumGraftingPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="gum-grafting"
          title="Gum Grafting"
          tagline="Cover exposed tooth roots, reduce sensitivity, and protect against further recession."
          featuredImage="/img/lIVE Piedmont website images/63e2da680b885fcdefe302c1_Crown-Lengthening2-scaled.jpg"
          intro={[
            "Gum grafting is a minor surgery that covers tooth roots exposed by gum recession, using tissue from the roof of your mouth or processed donor tissue. It is done under local anesthetic, one graft site usually takes about an hour, and most people are back at work in one to two days, with the gums fully settled in about six weeks.",
            "Gum grafting covers exposed tooth roots, reduces sensitivity and protects your teeth against further recession. A gum graft (also known as a gingival graft or periodontal plastic surgery) is the collective name for surgical procedures that cover exposed root surfaces with grafted oral tissue. Exposed roots are usually the result of gum recession from periodontal disease, but overly aggressive brushing, trauma, grinding and naturally thin gums are common causes too. The name sounds daunting, but gum grafting is one of the most common periodontal procedures in the US, and at Piedmont Dental By Design it is planned and performed in-house at our Grand Avenue office in Piedmont."
          ]}
          stats={[
            { value: "Local", label: "Anesthetic only" },
            { value: "~6 weeks", label: "Full healing" },
            { value: "3 types", label: "Free, connective tissue, allograft" },
            { value: "Multi-benefit", label: "Sensitivity, aesthetics, health" },
          ]}
          sections={[
            {
              "title": "Gum grafting at a glance",
              "bullets": [
                "Gum recession is common: a review of US surveys found 88% of people 65 and older and 50% of people aged 18 to 64 have at least one site of recession.",
                "There are three common graft types: free gingival, connective tissue and donor-tissue (allograft) grafts.",
                "Cleveland Clinic reports gum grafting success rates above 90% and a typical recovery of one to two weeks.",
                "Receded gum does not grow back on its own; a graft adds new tissue, and treating the cause keeps it from recurring."
              ]
            },
            {
              "title": "Types of gum grafts we use",
              "body": [
                "There are three common types of gum graft, and the right one depends on why the root is exposed, how thick your gum tissue is and whether you want to avoid a second surgical site. Cleveland Clinic notes that periodontists most often take tissue from the palate, and sometimes use material from a licensed tissue bank instead.",
                "Free gingival graft — A thin layer of tissue is taken from the palate and placed where the gum has receded. It is mostly used to thicken thin gum tissue so it resists further recession. Both sites heal without permanent damage.",
                "Subepithelial connective tissue graft — This is the most common choice for covering exposed roots. Tissue is taken from just beneath the outer layer of the palate, which is left in place, and positioned over the root under a flap of your own gum.",
                "Acellular dermal matrix allograft — Medically processed, donated human tissue is used as the graft. No tissue is taken from your palate, so there is no second site and recovery is usually more comfortable. It suits people treating several teeth at once or who want to avoid a palate site."
              ]
            },
            {
              "title": "Signs you may need a gum graft",
              "body": [
                "You may need a gum graft if a tooth looks longer than its neighbours, you can see or feel a notch where the gum meets the tooth, or one area stings with cold drinks. Cleveland Clinic advises seeing your dentist if you have thin, painful or bleeding gums, or visible tooth roots. Exposed roots raise the risk of decay, sensitivity and bone loss around the tooth, so recession is worth assessing early, even when it doesn't hurt."
              ]
            },
            {
              "title": "Which graft fits which situation",
              "bullets": [
                "Thin gums with little or no root exposed: a free gingival graft thickens the tissue.",
                "One or two teeth with visible roots and sensitivity: a connective tissue graft is usually the most predictable way to cover them.",
                "Several neighbouring teeth, or a wish to avoid a palate site: an allograft can treat a wider area with one surgical site.",
                "Recession driven by active gum disease: the disease is treated first, then the graft is planned once the gums are healthy."
              ]
            },
            {
              "title": "Gum grafting at our Piedmont office",
              "body": [
                "Gum grafting is done in our own office at 1331 Grand Avenue in Piedmont, by Dr. Filippo Cangini, our periodontist, so your exam, surgery and follow-ups happen in one place rather than being referred across town. Cleveland Clinic notes that a periodontist completes three additional years of focused training after dental school.",
                "Many of our grafting patients come from Oakland and Berkeley as well as Piedmont and the wider East Bay. If gum disease is part of the picture, your cleanings, periodontal treatment and graft are coordinated by the same team, which keeps the plan simple and the healing checks close to home."
              ]
            },
            {
              "title": "What gum grafting involves, step by step",
              "body": [
                "A gum graft is a planned, staged treatment rather than a one-off appointment. One graft site usually takes about an hour; several sites take longer."
              ],
              "bullets": [
                "Examination and measurement. We measure the recession around each tooth and the pocket depths, and look for the cause, whether gum disease, brushing habits, grinding or thin tissue.",
                "Treating the cause first. Teeth are cleaned thoroughly above and below the gum line to remove calculus and bacteria, and any active gum disease is treated. We share home-care guidance so the problem doesn't keep recurring.",
                "The procedure. The area is numbed with local anesthetic. Small incisions create a pocket at the recipient site, the graft is placed between the layers of tissue, and sutures hold it still so it can't shift.",
                "Protecting the site. A surgical dressing protects the area during the first week of healing, and you go home with written aftercare instructions.",
                "Follow-ups. We see you at one week to check the graft and remove the dressing, then again at about 4 and 12 weeks to check how it is integrating."
              ]
            },
            {
              "title": "Recovery, day by day",
              "body": [
                "Cleveland Clinic gives this typical recovery timeline, and most people find it matches their experience:",
                "Most people return to work or school in one to two days."
              ],
              "bullets": [
                "The first day: some bleeding, swelling and discomfort. Rest, take medication exactly as prescribed and stick to soft, cool foods such as yogurt or smoothies.",
                "The first week: bleeding should stop within 24 to 48 hours, and swelling lasts three to four days. Don't brush or floss on the graft itself. Avoid exercise and heavy lifting.",
                "The second week: swelling and any bruising fade. Softer solid foods come back, but avoid hard, crunchy or spicy food until you are cleared.",
                "About six weeks: the gums are uniform and fully healed, with final settling continuing for a few months."
              ]
            },
            {
              "title": "Risks and when to call us",
              "body": [
                "Complications after gum grafting are uncommon. Cleveland Clinic lists infection, excessive bleeding and graft failure as the main ones. A graft that has lost its blood supply usually shows as a large patch of white tissue coming away from the tooth.",
                "Call us straight away if you notice heavy bleeding, pus, a white patch lifting off the tooth or a fever over 101°F."
              ]
            },
            {
              "title": "What affects the cost of a gum graft",
              "body": [
                "The cost of gum grafting depends on how many teeth are treated, which graft type is used and whether gum disease needs treating first. Cleveland Clinic notes that treating several areas takes longer than a single site, and that drives the fee.",
                "After your exam we give you a written estimate, and we submit a pre-treatment estimate to your insurer so you know your share before you decide."
              ],
              "bullets": [
                "Number of sites: one tooth costs less than a row of teeth.",
                "Graft type: an allograft involves donor tissue costs but no palate site; a connective tissue graft uses your own tissue.",
                "Preparatory treatment: deep cleaning or periodontal treatment before the graft is planned and estimated separately.",
                "Insurance: many plans treat gum grafting as periodontal surgery, but coverage varies."
              ]
            },
            {
              "title": "Why patients choose us for gum grafting",
              "body": [
                "Patients choose us because grafting, the treatment of its cause and the long-term maintenance all happen in one office with a periodontist on the team. The practice has cared for families in Piedmont since 1996, with a 4.9-star rating from 350 Google reviews."
              ],
              "bullets": [
                "In-house periodontist. Dr. Filippo Cangini plans and performs grafts here, so you don't start over with a new office.",
                "The cause is treated, not just the symptom. Gum disease, brushing technique and grinding are addressed so the result lasts.",
                "Clear expectations. You get a written plan, an honest view of what grafting can and can't change, and follow-ups at 1, 4 and 12 weeks.",
                "Calm, unhurried visits. If you are nervous about surgery, tell us and we will walk you through every step first."
              ]
            },
            {
              "title": "Related treatments and nearby patients",
              "body": [
                "Gum grafting often sits alongside other periodontal care at our office in Piedmont.",
                "If gum disease caused your recession, gum disease treatment comes first, and if bone loss is involved, bone grafting may be part of the plan. Both are done here, alongside gum grafting, and you will find them in the periodontal services menu.",
              "Many patients travel in from Oakland and Berkeley for periodontal care, and their consultation, surgery and follow-ups all happen at our Grand Avenue office."
              ]
            }
          ]}
          faqs={[
            {
              "q": "What causes gum recession in the first place?",
              "a": "The two most common causes are periodontal disease and overly aggressive brushing with a hard-bristled brush. Other contributors include trauma, grinding or clenching, naturally thin tissue and orthodontic movement. Identifying the cause is part of the treatment so it doesn't keep recurring."
            },
            {
              "q": "Is a gum graft painful?",
              "a": "The procedure is done under local anesthesia and is comfortable throughout. Most discomfort comes from the palate if tissue was taken there, which feels like a pizza burn for about a week. With an allograft there is no second site and discomfort is milder. Most patients return to work the next day."
            },
            {
              "q": "How long does it take to heal after gum grafting?",
              "a": "Initial soft-tissue healing takes about two weeks. The grafted tissue fully integrates over about six weeks, and final settling continues for several months. We see you at one week, then at 4 and 12 weeks."
            },
            {
              "q": "Where does the tissue come from for a gum graft?",
              "a": "Either your own palate (free gingival or connective tissue graft, the most common and predictable), or processed donor tissue from a tissue bank (acellular dermal matrix allograft, no second site). Dr. Cangini recommends the right approach for your case at the consultation."
            },
            {
              "q": "Can gums grow back without a graft?",
              "a": "No. Receded gum tissue doesn't regenerate on its own. If recession is caught early, treating the cause can stop further loss, but rebuilding what's gone requires a graft."
            },
            {
              "q": "Will my teeth still feel sensitive after grafting?",
              "a": "Usually much less. The graft covers the exposed root, which is sensitive because it lacks the protective enamel of the crown. Most patients notice a clear drop in hot and cold sensitivity within a few weeks of healing."
            },
            {
              "q": "How long does a gum graft last?",
              "a": "When it is done by a periodontist and cared for properly, a gum graft is permanent. Failures usually come from ongoing periodontal disease or continued aggressive brushing, so we coach you on technique and home care to protect the result."
            },
            {
              "q": "Will the grafted area look natural?",
              "a": "Yes. Modern grafting techniques blend the new tissue with the surrounding gum over the first few months, and patients are typically happy with both the comfort and the appearance."
            },
            {
              "q": "When can I brush normally again?",
              "a": "Brush and floss your other teeth as usual, but leave the graft alone until we clear you, usually after the first one to two weeks, then use a very soft brush on the area."
            }
          ]}
          sources={[
            {
              "label": "Cleveland Clinic: Gum Graft Surgery",
              "href": "https://my.clevelandclinic.org/health/treatments/23504-gum-graft-surgery"
            },
            {
              "label": "Kassab & Cohen, The etiology and prevalence of gingival recession (JADA, 2003)",
              "href": "https://pubmed.ncbi.nlm.nih.gov/12636127/"
            }
          ]}
        />
        <AwardsStrip />
        <AboutCTA />
      </main>
      <SiteFooter />
    </>
  );
}
