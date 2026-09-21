// Homepage-specific structured data.
//
// Includes the WebPage entity (with Speakable selectors that target homepage CSS
// classes), and the FAQPage that mirrors the FAQ block displayed in <FAQ />.
//
// This component is mounted on the homepage only — never globally — so we never
// ship FAQ schema on a page that doesn't actually show the FAQs (a Google
// manual-action risk per the structured-data docs).
//
// Keep the FAQ list here exactly in sync with components/FAQ.tsx.

const SITE = "https://piedmontdentalbydesign.com";

const homepageFaqs = [
  {
    q: "What insurance do you accept?",
    a: "Piedmont Dental By Design accepts most dental insurance plans as an out-of-network provider, including non-managed care, indemnity (traditional) and PPO out-of-network plans. The simplest path is to call (510) 350-3937 with your card and our team will verify your specific coverage and walk you through what is included before your visit. Financing is also available for treatments not fully covered.",
  },
  {
    q: "What should I bring to my first visit?",
    a: "Bring your insurance card, a photo ID, a list of any medications you take, and any dental records or X-rays from a previous practice if you have them. New patient forms can be completed online or at the office; allow an extra ten minutes if you would rather fill them out in our waiting area.",
  },
  {
    q: "I am anxious about the dentist. How do you handle that?",
    a: "Dental anxiety is common and we take it seriously. Tell us before your appointment and we will plan accordingly with slower pacing, longer breaks, and clear explanations of what comes next. Per a Google review of Dr. Martenson, her gentle touch ensures the experience is as pain free as possible.",
  },
  {
    q: "Where do I park?",
    a: "Street parking is generally available on Grand Avenue near our entrance at 1331 Grand Ave. We are about a five-minute drive from MacArthur BART, and AC Transit serves the area. If accessibility is a concern, mention it when booking and we will guide you to the closest spot.",
  },
  {
    q: "Should I get veneers or Invisalign®?",
    a: "It depends on what you want to change. Veneers reshape the front of teeth — color, length, alignment — typically across two to three visits. Invisalign® moves teeth into a new position over six to eighteen months without altering tooth structure. We will review options together at your consultation.",
  },
  {
    q: "Do you offer financing?",
    a: "Yes. We offer financing for treatments that go beyond insurance coverage, including monthly payment plans through third-party financing partners. Our team will outline the available options at your consultation, with no obligation to commit. Ask in advance by calling (510) 350-3937.",
  },
  {
    q: "Do you see kids?",
    a: "We welcome younger patients for routine care including cleanings, exams, and preventive work. For specialized pediatric procedures, we will refer to a colleague when appropriate. From a recent Google review of a child's first appointment, the team did a great job calming her and making her feel safe.",
  },
  {
    q: "Do you handle dental emergencies?",
    a: "If you are a current patient and have a dental emergency during open hours such as a chipped tooth, lost crown, or severe pain, call (510) 350-3937 and we will do our best to fit you in the same day. For after-hours emergencies, urgent care or your nearest emergency room is the right first call.",
  },
];

export default function HomepageSchema() {
  const graph = [
    /* WebPage with Speakable specification — homepage selectors */
    {
      "@type": "WebPage",
      "@id": `${SITE}/#webpage`,
      url: `${SITE}/`,
      name: "Piedmont Dental By Design — Cosmetic dentistry in Piedmont, CA",
      isPartOf: { "@id": `${SITE}/#website` },
      about: { "@id": `${SITE}/#org` },
      primaryImageOfPage: `${SITE}/og-doctors.jpg`,
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [
          ".hero-headline",
          ".hero-sub",
          ".g-faq-question",
          ".g-faq-answer",
          ".visit-card",
        ],
      },
      inLanguage: "en-US",
    },
    /* FAQPage — mirrors the visible FAQ block in <FAQ /> */
    {
      "@type": "FAQPage",
      "@id": `${SITE}/#homepage-faq`,
      mainEntity: homepageFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    },
  ];

  const json = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
