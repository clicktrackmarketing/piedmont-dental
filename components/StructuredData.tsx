// Global structured data — mounted in app/layout.tsx so it renders on every page.
//
// Covers ONLY entity-level information that's stable across the whole site:
//   - WebSite
//   - Organization / LocalBusiness / Dentist (the practice itself)
//   - Person entities for each doctor (so they can be referenced by @id from any page)
//
// Page-specific schema (FAQPage, Article, Service, BreadcrumbList, Speakable WebPage)
// lives in per-page components under components/schema/*.tsx so we never ship a
// FAQPage block on a page that doesn't actually display the FAQs — which is a
// known Google manual-action risk.
//
// Validate with:
//   - Google Rich Results Test:    https://search.google.com/test/rich-results
//   - Schema.org validator:        https://validator.schema.org

export const SITE = "https://piedmontdentalbydesign.com";

const services = [
  {
    name: "Porcelain Veneers",
    description:
      "Hand-shaped porcelain veneers, color-matched in person. Custom porcelain across 2–3 visits.",
    category: "Cosmetic Dentistry",
  },
  {
    name: "Teeth Whitening",
    description:
      "In-office and take-home whitening treatments supervised by Dr. Martenson.",
    category: "Cosmetic Dentistry",
  },
  {
    name: "Invisalign®",
    description:
      "Clear aligners planned in 3D with checkpoint visits. Most cases between 6 and 18 months.",
    category: "Cosmetic Dentistry",
  },
  {
    name: "Dental Implants",
    description:
      "Permanent replacement for missing teeth using surgical-grade implants.",
    category: "Restorative Dentistry",
  },
  {
    name: "CEREC Crowns",
    description:
      "Same-day digital crowns designed and milled in a single visit.",
    category: "Restorative Dentistry",
  },
  {
    name: "Full Mouth Restoration",
    description:
      "Comprehensive rebuild of bite and esthetics planned together with the patient.",
    category: "Restorative Dentistry",
  },
  {
    name: "Periodontal Care",
    description:
      "Gum disease treatment, grafting, scaling and root planing under Dr. Cangini.",
    category: "Periodontal Services",
  },
  {
    name: "Cleanings and Exams",
    description:
      "Routine cleanings, comprehensive exams, digital and panoramic X-rays for the whole family.",
    category: "Preventive Dentistry",
  },
];

export default function StructuredData() {
  const graph = [
    /* WebSite */
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: `${SITE}/`,
      name: "Piedmont Dental By Design",
      publisher: { "@id": `${SITE}/#org` },
      inLanguage: "en-US",
    },
    /* LocalBusiness + Dentist */
    {
      "@type": ["LocalBusiness", "Dentist", "MedicalBusiness"],
      "@id": `${SITE}/#org`,
      name: "Piedmont Dental By Design",
      alternateName: ["PDxD", "Piedmont Dental"],
      url: `${SITE}/`,
      logo: `${SITE}/icon-512.png`,
      image: `${SITE}/og-doctors.jpg`,
      telephone: "+1-510-350-3937",
      priceRange: "$$",
      /* Payment facts come from /resources/financing, which lists exactly these.
         NOTE: no aggregateRating here, deliberately. The site displays 4.9 / 350
         as hardcoded text; marking a self-reported rating up as schema on your
         own pages is the "spammy structured markup" pattern Google issues manual
         actions for. The real reviews already live on Google and Yelp, which are
         linked from sameAs. Do not add one. */
      paymentAccepted: "Cash, Check, Money Order, CareCredit, Visa, Mastercard, American Express, Discover",
      currenciesAccepted: "USD",
      medicalSpecialty: "Dentistry",
      isAcceptingNewPatients: true,
      foundingDate: "1996",
      slogan: "Cosmetic Dentistry in Piedmont Since 1996.",
      description:
        "Cosmetic and restorative dental practice in Piedmont, California — celebrating 30 years of personalized care, co-owned by Dr. Jill Martenson and Dr. David Ma. Voted Best of the East Bay: Best Dental Practice 2025 and Best Esthetic Dentist 2024 & 2025.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1331 Grand Ave",
        addressLocality: "Piedmont",
        addressRegion: "CA",
        postalCode: "94610",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 37.8205693,
        longitude: -122.2445268,
      },
      hasMap:
        "https://www.google.com/maps/place/Piedmont+Dental+By+Design/@37.8205693,-122.2445268,17z/data=!3m1!4b1!4m6!3m5!1s0x808f875ddc627445:0x728b6ab91f29e59d!8m2!3d37.8205693!4d-122.2445268",
      areaServed: [
        { "@type": "City", name: "Piedmont", "@id": "https://en.wikipedia.org/wiki/Piedmont,_California" },
        { "@type": "City", name: "Oakland", "@id": "https://en.wikipedia.org/wiki/Oakland,_California" },
        { "@type": "Place", name: "Lake Merritt" },
        { "@type": "Place", name: "Montclair" },
        { "@type": "Place", name: "Rockridge" },
        { "@type": "City", name: "Berkeley", "@id": "https://en.wikipedia.org/wiki/Berkeley,_California" },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Wednesday"],
          opens: "07:00",
          closes: "17:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Tuesday", "Thursday"],
          opens: "07:00",
          closes: "15:00",
        },
      ],
      memberOf: [
        {
          "@type": "Organization",
          name: "American Academy of Cosmetic Dentistry",
          url: "https://aacd.com",
        },
        {
          "@type": "Organization",
          name: "American Dental Association",
          url: "https://www.ada.org",
        },
        {
          "@type": "Organization",
          name: "California Dental Association",
          url: "https://www.cda.org",
        },
      ],
      award: [
        "Best Dental Practice 2025 — Best of the East Bay",
        "Best Esthetic Dentist 2024 & 2025 — Best of the East Bay",
      ],
      knowsAbout: [
        "Cosmetic Dentistry",
        "Porcelain Veneers",
        "Smile Design",
        "Teeth Whitening",
        "Invisalign®",
        "Dental Implants",
        "CEREC Crowns",
        "Periodontal Treatment",
        "Restorative Dentistry",
        "Preventive Dental Care",
      ],
      employee: [
        { "@id": `${SITE}/#dr-martenson` },
        { "@id": `${SITE}/#dr-cangini` },
        { "@id": `${SITE}/#dr-ma` },
      ],
      // No aggregateRating here on purpose: Google disallows self-serving
      // review markup on a business's own Organization/LocalBusiness schema
      // when it isn't backed by a live, verifiable feed (Places API, a
      // review platform's structured export, etc.) — see manual-action
      // guidance in Google's review snippet documentation. Star rich
      // results come from the Google Business Profile, not on-site markup.
      // The "4.9 on Google" copy in Reviews.tsx/AwardsStrip.tsx/Hero.tsx is
      // fine to keep as plain visible text; it just can't be marked up here
      // without a real data source behind it.
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Dental services at Piedmont Dental By Design",
        itemListElement: services.map((s, i) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.name,
            description: s.description,
            category: s.category,
            provider: { "@id": `${SITE}/#org` },
            areaServed: "Piedmont, CA",
          },
          position: i + 1,
        })),
      },
      sameAs: [
        "https://www.facebook.com/piedmontdentalbydesign/",
        "https://www.instagram.com/piedmontdentalbydesign/",
        "https://www.youtube.com/@piedmontdentalbydesign",
        "https://www.yelp.com/biz/piedmont-dental-by-design-piedmont-6",
        "https://www.google.com/maps/place/Piedmont+Dental+By+Design",
      ],
    },
    /* Persons */
    {
      "@type": "Person",
      "@id": `${SITE}/#dr-martenson`,
      name: "Jill A. Martenson",
      givenName: "Jill",
      familyName: "Martenson",
      honorificSuffix: "DDS",
      jobTitle: "Cosmetic & General Dentist",
      worksFor: { "@id": `${SITE}/#org` },
      /* A degree marked up as EducationalOccupationalCredential is a verifiable,
         machine-readable qualification an answer engine can cite when asked who
         is qualified to treat someone. Every value below is already published on
         /about/dr-martenson — nothing here is a new claim.
         Deliberately NOT done for Dr. Cangini: his pages state "board-certified"
         four times and never name the certifying board, so there is nothing
         verifiable to mark up until the practice confirms it. */
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: "Doctor of Dental Surgery (DDS)",
        educationalLevel: "Doctoral",
        recognizedBy: {
          "@type": "CollegeOrUniversity",
          name: "University of the Pacific, Arthur A. Dugoni School of Dentistry",
          sameAs: "https://en.wikipedia.org/wiki/University_of_the_Pacific_(United_States)",
        },
      },
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "University of the Pacific, Arthur A. Dugoni School of Dentistry",
          sameAs: "https://en.wikipedia.org/wiki/University_of_the_Pacific_(United_States)",
        },
        {
          "@type": "CollegeOrUniversity",
          name: "University of California, Los Angeles",
          sameAs: "https://en.wikipedia.org/wiki/University_of_California,_Los_Angeles",
        },
      ],
      knowsAbout: [
        "Cosmetic Dentistry",
        "Porcelain Veneers",
        "Smile Design",
        "Invisalign®",
        "Teeth Whitening",
      ],
      award:
        "Best Esthetic Dentist 2024 & 2025 — Best of the East Bay",
      memberOf: [
        { "@type": "Organization", name: "American Academy of Cosmetic Dentistry" },
        { "@type": "Organization", name: "American Dental Association" },
        { "@type": "Organization", name: "California Dental Association" },
      ],
    },
    {
      "@type": "Person",
      "@id": `${SITE}/#dr-cangini`,
      name: "Filippo Cangini",
      jobTitle: "Periodontist",
      worksFor: { "@id": `${SITE}/#org` },
      knowsAbout: ["Periodontics", "Gum Grafting", "Bone Grafting"],
    },
    {
      "@type": "Person",
      "@id": `${SITE}/#dr-ma`,
      name: "David Ma",
      jobTitle: "Cosmetic & General Dentist",
      worksFor: { "@id": `${SITE}/#org` },
      knowsAbout: [
        "Cosmetic Dentistry",
        "Cosmetic Bonding",
        "Porcelain Veneers",
        "Invisalign®",
        "Porcelain Crowns",
        "Full Mouth Rehabilitation",
        "Dental Implants",
        "Restorative Dentistry",
        "Preventive Dental Care",
      ],
      /* Schools only. His graduation years are one of the open client questions,
         so no dates are asserted here — alumniOf does not require them. */
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "University of Pennsylvania School of Dental Medicine",
          sameAs: "https://en.wikipedia.org/wiki/University_of_Pennsylvania_School_of_Dental_Medicine",
        },
        {
          "@type": "CollegeOrUniversity",
          name: "University of California, Davis",
          sameAs: "https://en.wikipedia.org/wiki/University_of_California,_Davis",
        },
      ],
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
