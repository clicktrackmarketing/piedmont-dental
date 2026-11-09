type Bullets = { title?: string; items: string[] };

export type FAQ = {
  id: string;
  q: string;
  cat: "care" | "conditions" | "cosmetic";
  /** Lead paragraph(s) — multiple separated by \n\n */
  body: string;
  bullets?: Bullets;
  bullets2?: Bullets;
  /** Optional follow-on paragraph(s) after the bullets */
  outro?: string;
  /** Plain text for FAQPage schema (joins everything) */
  schemaText: string;
};

const f = (
  id: string,
  q: string,
  cat: FAQ["cat"],
  body: string,
  extras: Partial<FAQ> = {}
): FAQ => {
  const text = [
    body,
    extras.bullets
      ? `${extras.bullets.title ?? ""} ${extras.bullets.items.join("; ")}`
      : "",
    extras.bullets2
      ? `${extras.bullets2.title ?? ""} ${extras.bullets2.items.join("; ")}`
      : "",
    extras.outro ?? "",
  ]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  return { id, q, cat, body, schemaText: text, ...extras };
};

export const faqs: FAQ[] = [
  f(
    "bad-breath",
    "What should I do if I have bad breath?",
    "care",
    "Bad breath (halitosis) can be unpleasant and embarrassing. Most of us don't realize when we have it, but everyone gets bad breath from time to time — especially in the morning. Microbial deposits on the tongue are a major cause; simply brushing the tongue can reduce bad breath by as much as 70 percent.",
    {
      bullets: {
        title: "Common causes:",
        items: [
          "Morning (reduced saliva flow overnight)",
          "Certain foods like garlic and onions",
          "Poor oral hygiene habits",
          "Periodontal (gum) disease",
          "Dental cavities and improperly fitted appliances",
          "Dry mouth (xerostomia)",
          "Tobacco products",
          "Dieting, dehydration, hunger, or missed meals",
          "Certain medical conditions",
        ],
      },
      bullets2: {
        title: "To prevent bad breath:",
        items: [
          "Brush twice a day, floss daily, and clean your tongue",
          "Visit the dentist twice a year",
          "Stop using tobacco",
          "Drink water throughout the day",
          "Use an antiseptic mouthwash or rinse",
        ],
      },
    }
  ),
  f(
    "brush-floss",
    "How often should I brush and floss?",
    "care",
    "Brushing and flossing help control the plaque and bacteria that cause dental disease. Brush at least twice a day — especially before bed — with an ADA-approved soft-bristle toothbrush and toothpaste. Hold the brush at a 45-degree angle to the gums and use small circular strokes across the inside, outside, and chewing surfaces of every tooth. Use the brush tip on the inside of the front teeth. Electric toothbrushes are also recommended.\n\nFloss daily. It's the best way to clean between teeth and under the gumline where the brush can't reach. Take 12 to 16 inches of floss, wrap it around your middle fingers, and curve it into a C-shape around each tooth, gently sliding it under the gumline."
  ),
  f(
    "amalgam-safe",
    "Are amalgam (silver) fillings safe?",
    "conditions",
    "Yes. The American Dental Association, the CDC, the World Health Organization, the FDA, and other authorities all support amalgam fillings as safe, durable, and cost-effective. Studies have not found any link between amalgam fillings and any medical disorder.",
    {
      outro:
        "An amalgam is a blend of copper, silver, tin, and zinc, bound by elemental mercury. Dentists have used this blend for more than 100 years; up to 76% of dentists still use it. The only reason not to use silver fillings is if you have an allergy to one of the components — fewer than 100 such cases have ever been reported. Alternative options include composite (tooth-colored), porcelain, and gold fillings.",
    }
  ),
  f(
    "exam-frequency",
    "How often should I have a dental exam and cleaning?",
    "conditions",
    "At least twice a year, though your dentist or hygienist may recommend more frequent visits depending on your oral health. Regular dental exams and cleanings are essential for preventing dental problems and maintaining the health of your teeth and gums.",
    {
      bullets: {
        title: "A comprehensive exam includes:",
        items: [
          "Medical history review",
          "Examination of diagnostic X-rays",
          "Oral cancer screening",
          "Gum disease evaluation",
          "Examination of tooth decay",
          "Examination of existing restorations",
          "Removal of calculus (tartar)",
          "Removal of plaque",
          "Teeth polishing",
          "Oral hygiene recommendations",
          "Dietary review",
        ],
      },
    }
  ),
  f(
    "gum-disease",
    "How can I tell if I have gingivitis or periodontitis?",
    "conditions",
    "According to the CDC, about 42% of U.S. adults 30 and older have periodontitis, and many don't know it. Unlike tooth decay, the early stages of gum disease are usually painless — so it's possible to have it without obvious symptoms. Risk factors and warning signs are listed below; if any apply, schedule an evaluation.",
    {
      bullets: {
        title: "Risk factors include:",
        items: [
          "Smoking or chewing tobacco",
          "Improperly fitted teeth or appliances",
          "Certain medications (steroids, cancer therapy drugs, blood pressure meds)",
          "Pregnancy, oral contraceptives, puberty",
          "Systemic diseases (diabetes, HIV/AIDS)",
          "Genetic predisposition",
        ],
      },
      bullets2: {
        title: "Signs and symptoms:",
        items: [
          "Red and puffy gums",
          "Bleeding gums",
          "Persistent bad breath",
          "New spacing between teeth",
          "Loose teeth",
          "Pus around teeth and gums",
          "Receding gums",
          "Tenderness or discomfort",
        ],
      },
      outro:
        "Prevention starts with good oral hygiene, a balanced diet, and regular dental visits.",
    }
  ),
  f(
    "why-floss",
    "Why is it important to use dental floss?",
    "care",
    "Brushing removes food particles, plaque, and bacteria from all tooth surfaces — except in between the teeth. Daily flossing is the best way to clean those gaps and under the gumline. It disrupts plaque colonies before they damage gums, teeth, and bone.\n\nPlaque is a sticky, almost invisible film of bacteria, food debris, and saliva. The bacteria produce toxins that cause cavities and inflame the gums. Flossing daily — using a 12-to-16-inch piece curved into a C-shape around each tooth — helps you keep a healthy, beautiful smile for life."
  ),
  f(
    "cosmetic-help",
    "How can cosmetic dentistry help my smile?",
    "cosmetic",
    "If you feel self-conscious about your teeth or want to improve your smile, cosmetic dental treatments can give you a more beautiful, confident smile. Cosmetic dentistry has become more popular thanks to advances in procedures and materials, plus a growing focus on overall health and appearance. Treatments range from restoring a single tooth to a full-mouth makeover.",
    {
      bullets: {
        title: "Common cosmetic procedures:",
        items: [
          "Teeth whitening — lightens stains from age, food, drink, and tobacco",
          "Composite (tooth-colored) fillings — repair cavities or replace defective amalgam fillings",
          "Porcelain veneers — thin custom-made shells bonded onto the fronts of teeth",
          "Porcelain crowns — full custom-made coverings that restore the original shape and size of a tooth",
          "Dental implants — artificial roots placed in the jaw to replace missing teeth",
          "Orthodontics — less visible brackets and clear aligners make alignment more appealing for adults",
        ],
      },
    }
  ),
  f(
    "veneers",
    "What are porcelain veneers, and how can they improve my smile?",
    "cosmetic",
    "Porcelain veneers are very thin shells of tooth-shaped porcelain individually crafted to cover the fronts of teeth. They're durable and won't stain, making them a popular solution for restoring or enhancing a smile.",
    {
      bullets: {
        title: "Veneers can address:",
        items: [
          "Severely discolored or stained teeth",
          "Unwanted or uneven spaces",
          "Worn or chipped teeth",
          "Slight tooth crowding",
          "Misshapen teeth",
          "Teeth that are too small or too large",
        ],
      },
      outro:
        "Getting veneers usually requires two visits. We take an impression of your teeth and send it to a professional dental laboratory, where each veneer is custom-made for shape and color. At placement, we lightly buff and shape the front of the teeth to allow for the thickness of the veneer, then bond them onto the tooth surface with special bonding cements; a specialized light may be used to set the bond.",
    }
  ),
  f(
    "whitening",
    "What can I do about stained or discolored teeth?",
    "cosmetic",
    "Teeth whitening is now the number one aesthetic concern for many patients. Professional whitening (or bleaching) is a simple, non-invasive treatment that changes the color of natural tooth enamel. Over-the-counter products are available but are much less effective than professional treatments — and may not be ADA-approved.\n\nAs we age, the outer layer of enamel wears away, revealing a darker or yellow shade. Smoking, coffee, tea, wine, certain medications (like tetracycline), and excessive fluoride can all contribute to discoloration. Most patients are good candidates for whitening; tetracycline and fluorosis stains can be more difficult to bleach, in which case veneers or crowns may be a better option.",
    {
      bullets: {
        title: "At-home whitening:",
        items: [
          "Custom gel trays fitted to your teeth",
          "Worn twice a day for 30 minutes or overnight while you sleep",
          "Several weeks to reach the desired result, depending on starting shade",
        ],
      },
      bullets2: {
        title: "In-office whitening:",
        items: [
          "Done at the practice with immediate results",
          "May require more than one visit, each 30 to 60 minutes",
          "Gums are protected while a bleaching solution — sometimes paired with a special light — is applied",
        ],
      },
      outro:
        "Some patients experience temporary tooth sensitivity that subsides within a few days to a week. Whitening isn't permanent — a touch-up every few years keeps your smile bright.",
    }
  ),
];

const groups = [
  { id: "care", label: "Daily care", num: "i", count: 3 },
  { id: "conditions", label: "Conditions & treatments", num: "ii", count: 3 },
  { id: "cosmetic", label: "Cosmetic", num: "iii", count: 3 },
];

function FAQItem({ faq, idx }: { faq: FAQ; idx: number }) {
  return (
    <details className="g-faq big-faq" id={faq.id}>
      <summary className="g-faq-summary">
        <span className="g-faq-num">{String(idx + 1).padStart(2, "0")}</span>
        <h3 className="g-faq-question">{faq.q}</h3>
        <svg
          className="g-faq-chevron"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 9l6 6 6-6"
          />
        </svg>
      </summary>
      <div className="big-faq-answer">
        {faq.body.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
        {faq.bullets && (
          <>
            {faq.bullets.title && <p className="bullets-title">{faq.bullets.title}</p>}
            <ul>
              {faq.bullets.items.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </>
        )}
        {faq.bullets2 && (
          <>
            {faq.bullets2.title && <p className="bullets-title">{faq.bullets2.title}</p>}
            <ul>
              {faq.bullets2.items.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </>
        )}
        {faq.outro && <p>{faq.outro}</p>}
      </div>
    </details>
  );
}

export default function FAQsList() {
  let counter = 0;
  return (
    <section className="big-faqs" id="all-faqs">
      <div className="big-faqs-inner">
        {groups.map((g) => {
          const groupFaqs = faqs.filter((f) => f.cat === g.id);
          return (
            <div className="big-faq-group" id={g.id} key={g.id}>
              <header className="big-faq-group-head">
                <span className="big-faq-group-num">{g.num}.</span>
                <h2 className="big-faq-group-label">{g.label}</h2>
                <span className="big-faq-group-count">
                  {groupFaqs.length} questions
                </span>
              </header>
              <div className="big-faq-list">
                {groupFaqs.map((q) => {
                  const node = <FAQItem faq={q} idx={counter} key={q.id} />;
                  counter++;
                  return node;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
