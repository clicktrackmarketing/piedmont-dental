const cols = [
  {
    heading: "Care",
    links: [
      { label: "Cosmetic", href: "/procedures/cosmetic-dentistry" },
      { label: "Restoration", href: "/procedures/restoration" },
      { label: "Periodontal", href: "/procedures/periodontal-services" },
      { label: "Cleanings", href: "/procedures/cleanings-prevention" },
    ],
  },
  {
    heading: "Practice",
    links: [
      { label: "About", href: "/about" },
      { label: "Meet the team", href: "/about/team" },
      { label: "For Oakland patients", href: "/oakland" },
      { label: "Smile gallery", href: "/smile-gallery" },
      { label: "Patient resources", href: "/resources" },
    ],
  },
  {
    heading: "Visit",
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "Insurance", href: "/resources/insurance" },
      { label: "Financing", href: "/resources/financing" },
      { label: "FAQ", href: "/faqs" },
    ],
  },
  {
    heading: "Patients",
    links: [
      { label: "New patient forms", href: "/resources/patient-forms" },
      { label: "Referral portal", href: "/resources/patient-forms" },
      { label: "Smile analysis", href: "/resources/smile-analysis" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const LAST_UPDATED = "May 2026";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="col-brand">
          <a href="/" className="brand" aria-label="Piedmont Dental By Design — Home">
            <img
              src="/logo.webp"
              alt="Piedmont Dental By Design"
              width={210}
              height={90}
              className="brand-logo"
            />
          </a>
          <p>
            1331 Grand Ave
            <br />
            Piedmont, CA 94610
            <br />
            (510) 350-3937 · Mon–Thu
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.heading}>
            <h4>{col.heading}</h4>
            <ul>
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <span>
          © 2026 Piedmont Dental By Design · Piedmont, CA
          <span className="footer-updated"> · Last updated {LAST_UPDATED}</span>
        </span>
        <nav className="footer-legal" aria-label="Legal">
          <a href="/terms-and-conditions">Terms</a>
          <a href="/privacy-policy-2">Privacy</a>
          <a href="/notice-of-privacy-practices">Notice of Privacy Practices</a>
        </nav>
        <div className="footer-social">
          <a href="https://www.instagram.com/piedmontdentalbydesign/" aria-label="Instagram">
            IG
          </a>
          <a href="https://www.facebook.com/piedmontdentalbydesign/" aria-label="Facebook">
            FB
          </a>
          <a href="https://www.youtube.com/" aria-label="YouTube">
            YT
          </a>
          <a href="https://www.google.com/maps" aria-label="Google">
            G
          </a>
        </div>
        <p className="footer-credit">
          <a
            href="https://clicktrackmarketing.com/?utm_source=piedmont-dental&utm_medium=referral&utm_campaign=footer-credit"
            target="_blank"
            rel="noopener noreferrer"
          >
            Designed &amp; Built by Click Track Marketing
            <span className="sr-only"> (opens in a new window)</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
