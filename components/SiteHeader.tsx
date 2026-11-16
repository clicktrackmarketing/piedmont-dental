"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SocialLinks from "@/components/SocialLinks";

const ABOUT_DROPDOWN = [
  { href: "/about/dr-martenson", label: "Dr. Jill Martenson" },
  { href: "/about/dr-ma", label: "Dr. David Ma" },
  { href: "/about/dr-cangini", label: "Dr. Filippo Cangini" },
  { href: "/about/team", label: "Meet the Team" },
  { href: "/about/tour", label: "Office Tour" },
];

const REVIEWS_DROPDOWN = [
  { href: "/patient-reviews", label: "All Patient Reviews" },
  { href: "/patient-reviews/testimonial", label: "Share a Testimonial" },
];

type DropdownItem = { href: string; label: string; muted?: boolean };
type DropdownGroup = { heading: string; items: DropdownItem[] };

const RESOURCES_DROPDOWN: DropdownGroup[] = [
  {
    heading: "Forms & Practical",
    items: [
      { href: "/resources", label: "All Resources" },
      { href: "/resources/patient-forms", label: "Patient Forms" },
      { href: "/resources/financing", label: "Financing" },
      { href: "/resources/insurance", label: "Insurance" },
      { href: "/resources/smile-analysis", label: "Smile Analysis" },
      { href: "/resources/links", label: "Useful Links" },
    ],
  },
  {
    heading: "Education",
    items: [
      { href: "/resources/dental-videos", label: "Dental Videos" },
      { href: "/resources/invisalign", label: "Invisalign® Info" },
      { href: "/resources/gummy-smile", label: "Treating a Gummy Smile" },
      { href: "/resources/cosmetic-dentistry", label: "Cosmetic Dentistry" },
    ],
  },
  {
    heading: "Smile Gallery · Cosmetic",
    items: [
      { href: "/smile-gallery", label: "Smile Gallery Hub" },
      { href: "/resources/porcelain-veneers", label: "Porcelain Veneers" },
      { href: "/resources/invisalign-results", label: "Invisalign® Results" },
      { href: "/resources/surgery", label: "Surgery" },
      { href: "/resources/full-mouth-restoration", label: "Full Mouth Restoration" },
    ],
  },
  {
    heading: "Smile Gallery · Restorations",
    items: [
      { href: "/resources/restorations", label: "All Restorations" },
      { href: "/resources/dental-implants", label: "Dental Implants" },
      { href: "/resources/restorations/crowns-caps", label: "Crowns (Caps)" },
      { href: "/resources/restorations/dentures", label: "Dentures & Partials" },
      { href: "/smile-gallery/other-procedures", label: "Other Procedures" },
      { href: "/smile-gallery/porcelain-crowns-caps", label: "Porcelain Crown Cases" },
      { href: "/smile-gallery/dental-implants", label: "Implant Cases" },
      { href: "/smile-gallery/composite-fillings", label: "Composite Fillings" },
      { href: "/smile-gallery/composite-fillings-recent", label: "Composite Fillings — Recent" },
    ],
  },
];

const PROCEDURES_DROPDOWN: DropdownGroup[] = [
  {
    heading: "Restoration",
    items: [
      { href: "/procedures/restoration", label: "Overview" },
      { href: "/procedures/restoration/dental-implants", label: "Dental Implants" },
      { href: "/procedures/restoration/composite-fillings", label: "Composite Fillings" },
      { href: "/procedures/restoration/crowns-caps", label: "Crowns (Caps)" },
      { href: "/procedures/restoration/dentures-partial-dentures", label: "Dentures & Partial Dentures" },
      { href: "/procedures/restoration/fixed-bridges", label: "Fixed Bridges" },
    ],
  },
  {
    heading: "Cosmetic Dentistry",
    items: [
      { href: "/procedures/cosmetic-dentistry", label: "Overview" },
      { href: "/procedures/cosmetic-dentistry/porcelain-veneers", label: "Porcelain Veneers" },
      { href: "/procedures/cosmetic-dentistry/tooth-whitening", label: "Teeth Whitening" },
      { href: "/procedures/cosmetic-dentistry/cerec", label: "CEREC®" },
      { href: "/procedures/cosmetic-dentistry/invisalign", label: "Invisalign®" },
      { href: "/procedures/cosmetic-dentistry/surgery", label: "Cosmetic Surgery" },
    ],
  },
  {
    heading: "Periodontal Services",
    items: [
      { href: "/procedures/periodontal-services", label: "Overview" },
      { href: "/procedures/periodontal-services/what-is-periodontal-gum-disease", label: "What Is Gum Disease?" },
      { href: "/procedures/periodontal-services/treatment", label: "Treatment" },
      { href: "/procedures/periodontal-services/maintenance", label: "Maintenance" },
      { href: "/procedures/periodontal-services/gum-grafting", label: "Gum Grafting" },
      { href: "/procedures/periodontal-services/bone-grafting", label: "Bone Grafting" },
      { href: "/procedures/periodontal-services/crown-lengthening", label: "Crown Lengthening" },
      { href: "/procedures/periodontal-services/periodontal-scaling-root-planing", label: "Scaling & Root Planing" },
      { href: "/procedures/periodontal-services/sinus-augmentation", label: "Sinus Augmentation" },
    ],
  },
  {
    heading: "Cleanings & Prevention",
    items: [
      { href: "/procedures/cleanings-prevention", label: "Overview" },
      { href: "/procedures/cleanings-prevention/dental-exams-cleanings", label: "Dental Exams & Cleanings" },
      { href: "/procedures/cleanings-prevention/dental-x-rays", label: "Dental X-Rays" },
      { href: "/procedures/cleanings-prevention/panoramic-x-rays", label: "Panoramic X-Rays" },
      { href: "/procedures/cleanings-prevention/fluoride-treatment", label: "Fluoride Treatment" },
      { href: "/procedures/cleanings-prevention/home-care", label: "Home Care" },
      { href: "/procedures/cleanings-prevention/how-to-properly-brush-floss", label: "How to Brush & Floss" },
    ],
  },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close menu whenever route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll when menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
    <header className="site-header">
      <nav className="nav" aria-label="Main">
        <div className="nav-links nav-links--left">
          <div className="nav-dropdown nav-dropdown--wide">
            <Link href="/procedures" className="nav-dropdown-trigger">
              Procedures
              <svg
                className="nav-dropdown-icon"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 9l6 6 6-6"
                />
              </svg>
            </Link>
            <div className="nav-dropdown-menu nav-dropdown-menu--grouped" role="menu">
              {PROCEDURES_DROPDOWN.map((group) => (
                <div className="nav-dropdown-group" key={group.heading}>
                  <span className="nav-dropdown-heading">{group.heading}</span>
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      className={item.muted ? "is-muted" : undefined}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="nav-dropdown">
            <Link href="/about" className="nav-dropdown-trigger">
              About
              <svg
                className="nav-dropdown-icon"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 9l6 6 6-6"
                />
              </svg>
            </Link>
            <div className="nav-dropdown-menu" role="menu">
              {ABOUT_DROPDOWN.map((item) => (
                <Link key={item.href} href={item.href} role="menuitem">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="nav-dropdown nav-dropdown--wide">
            <Link href="/resources" className="nav-dropdown-trigger">
              Patient Resources
              <svg
                className="nav-dropdown-icon"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 9l6 6 6-6"
                />
              </svg>
            </Link>
            <div className="nav-dropdown-menu nav-dropdown-menu--grouped" role="menu">
              {RESOURCES_DROPDOWN.map((group) => (
                <div className="nav-dropdown-group" key={group.heading}>
                  <span className="nav-dropdown-heading">{group.heading}</span>
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      className={item.muted ? "is-muted" : undefined}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="nav-dropdown">
            <Link href="/patient-reviews" className="nav-dropdown-trigger">
              Reviews
              <svg
                className="nav-dropdown-icon"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 9l6 6 6-6"
                />
              </svg>
            </Link>
            <div className="nav-dropdown-menu" role="menu">
              {REVIEWS_DROPDOWN.map((item) => (
                <Link key={item.href} href={item.href} role="menuitem">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

        </div>
        <Link href="/" className="brand" aria-label="Piedmont Dental By Design — Home">
          <Image
            src="/logo.webp"
            alt="Piedmont Dental By Design"
            width={210}
            height={90}
            priority
            className="brand-logo"
          />
        </Link>
        <div className="nav-right">
          <div className="nav-links nav-links--right">
            <Link href="/blog">Blog</Link>
            <Link href="/faqs">FAQs</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <a href="tel:5103503937" className="phone-link">
            (510) 350-3937
          </a>
          <Link href="/contact" className="btn btn-teal nav-cta">
            Book Appointment
          </Link>
          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`nav-toggle-bars ${open ? "is-open" : ""}`} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </nav>
    </header>

    {/* Mobile backdrop + drawer — rendered OUTSIDE the header so its
        position: fixed is relative to the viewport. The .site-header has
        backdrop-filter, which creates a containing block for fixed
        descendants and would otherwise clip the drawer. */}
      <button
        type="button"
        className={`mobile-menu-backdrop ${open ? "is-open" : ""}`}
        aria-label="Close menu"
        aria-hidden={!open}
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
        inert={!open}
      />
      <aside
        id="mobile-menu"
        className={`mobile-menu ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!open}
        inert={!open}
      >
        <button
          type="button"
          className="mobile-menu-close"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              d="M6 6l12 12M18 6L6 18"
            />
          </svg>
        </button>
        <div className="mobile-menu-inner">
          <div className="mobile-menu-section">
            <span className="mobile-menu-heading">Procedures</span>
            <Link href="/procedures" className="mobile-menu-link">All procedures</Link>

            {PROCEDURES_DROPDOWN.map((group) => (
              <div className="mobile-menu-group" key={group.heading}>
                <span className="mobile-menu-subheading">{group.heading}</span>
                {group.items.map((item) =>
                  item.muted ? (
                    <span key={item.href} className="mobile-menu-link is-muted">
                      {item.label} <em>· coming soon</em>
                    </span>
                  ) : (
                    <Link key={item.href} href={item.href} className="mobile-menu-link">
                      {item.label}
                    </Link>
                  )
                )}
              </div>
            ))}
          </div>

          <div className="mobile-menu-section">
            <span className="mobile-menu-heading">About</span>
            <Link href="/about" className="mobile-menu-link">About the practice</Link>
            {ABOUT_DROPDOWN.map((item) => (
              <Link key={item.href} href={item.href} className="mobile-menu-link">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mobile-menu-section">
            <span className="mobile-menu-heading">Patient Resources</span>

            {RESOURCES_DROPDOWN.map((group) => (
              <div className="mobile-menu-group" key={group.heading}>
                <span className="mobile-menu-subheading">{group.heading}</span>
                {group.items.map((item) => (
                  <Link key={item.href} href={item.href} className="mobile-menu-link">
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          <div className="mobile-menu-section">
            <span className="mobile-menu-heading">Reviews</span>
            {REVIEWS_DROPDOWN.map((item) => (
              <Link key={item.href} href={item.href} className="mobile-menu-link">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mobile-menu-section">
            <span className="mobile-menu-heading">More</span>
            <Link href="/blog" className="mobile-menu-link">Blog</Link>
            <Link href="/faqs" className="mobile-menu-link">FAQs</Link>
            <Link href="/contact" className="mobile-menu-link">Contact</Link>
          </div>

          <div className="mobile-menu-section">
            <span className="mobile-menu-heading">Follow us</span>
            <SocialLinks variant="menu" showLabel={false} />
          </div>

          <div className="mobile-menu-cta">
            <a href="tel:5103503937" className="mobile-menu-phone">
              <span className="mobile-menu-phone-label">Call the office</span>
              <span className="mobile-menu-phone-num">(510) 350-3937</span>
            </a>
            <Link href="/contact" className="btn btn-primary btn-lg mobile-menu-book">
              Book Appointment →
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
