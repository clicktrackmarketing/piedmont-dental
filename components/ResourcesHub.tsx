type Resource = {
  title: string;
  desc: string;
  href: string;
  external?: boolean;
  iconPath: string; // SVG path data
};

// Each icon is a single SVG path. Style is uniform (1.5px stroke, currentColor).
const ICONS = {
  forms:
    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6M9 13h6M9 17h4",
  postOp:
    "M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
  account:
    "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  videos:
    "M23 7l-7 5 7 5V7zM14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z",
  analysis: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35",
  gallery:
    "M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM21 15l-5-5L5 21",
  links:
    "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  faq:
    "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z",
};

// Matches the live patient-resources page card order exactly.
// Source: https://piedmontdentalbydesign.com/patient-resources/
const resources: Resource[] = [
  {
    title: "Patient Forms",
    desc: "New-patient paperwork for your visit — how to get it done before you arrive.",
    href: "/resources/patient-forms",
    iconPath: ICONS.forms,
  },
  {
    title: "Post Op Instructions",
    desc: "Care guidance after your procedure. Contact us for specifics on your treatment.",
    href: "/contact",
    iconPath: ICONS.postOp,
  },
  {
    title: "View Your Account",
    desc: "Questions about statements, treatment history, or your balance? Get in touch and we'll pull it up.",
    href: "/contact",
    iconPath: ICONS.account,
  },
  {
    title: "Dental Videos",
    desc: "Animated explanations of common procedures and what to expect.",
    href: "/resources/dental-videos",
    iconPath: ICONS.videos,
  },
  {
    title: "Smile Analysis",
    desc: "What a comprehensive smile evaluation covers — shape, color, gum line, bite.",
    href: "/resources/smile-analysis",
    iconPath: ICONS.analysis,
  },
  {
    title: "Smile Gallery",
    desc: "Real before-and-after results from the practice — by procedure.",
    href: "/smile-gallery",
    iconPath: ICONS.gallery,
  },
  {
    title: "Links",
    desc: "Vetted dental and health resources from leading professional organizations.",
    href: "/resources/links",
    iconPath: ICONS.links,
  },
  {
    title: "FAQ's",
    desc: "Common patient questions answered — about visits, procedures, and care.",
    href: "/faqs",
    iconPath: ICONS.faq,
  },
];

function ResourceCard({
  title,
  desc,
  href,
  external,
  iconPath,
}: Resource) {
  const targetProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <a className="resource-card" href={href} {...targetProps}>
      <span className="resource-icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d={iconPath}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <div className="resource-text">
        <h4>
          {title}
          {external && (
            <span className="resource-external" aria-label="Opens in a new tab">
              ↗
            </span>
          )}
        </h4>
        <p>{desc}</p>
      </div>
      <span className="resource-arrow" aria-hidden="true">
        →
      </span>
    </a>
  );
}

export default function ResourcesHub() {
  return (
    <section className="resources-hub" id="hub">
      <div className="resources-hub-inner">
        <header className="section-head">
          <div>
            <div className="num">i. — Resources</div>
            <h2>
              Empower your <em>dental journey.</em>
            </h2>
            <p className="about-question">What can I do without calling?</p>
          </div>
          <p className="lede">
            Forms, your account, smile gallery, educational videos — most
            patient questions and tasks have a self-service answer here.
          </p>
        </header>

        <div className="resources-grid resources-grid--single">
          {resources.map((item) => (
            <ResourceCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
