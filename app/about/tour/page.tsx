import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import AwardsStrip from "@/components/AwardsStrip";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Office Tour",
  description:
    "Take a guided tour — 10 views inside our practice at 1331 Grand Ave, Piedmont. Modern operatories, digital imaging, and a comfortable patient experience.",
  alternates: { canonical: "/about/tour" },
  openGraph: {
    title: "Office Tour — Piedmont Dental By Design",
    description: "A 10-stop walkthrough of the practice in Piedmont, California.",
    url: "https://piedmontdentalbydesign.com/about/tour",
    type: "website",
    images: ["/office/01.webp"],
  },
};

type Stop = {
  num: string;
  title: string;
  caption: string;
  description: string;
  src: string;
};

// 10 photos pulled directly from the live office-tour page.
// Reordered into a natural walk-through (arrival → reception → treatment → patio).
// File paths stay 01–10 (URL-stable); display order is determined here.
const STOPS: Stop[] = [
  {
    num: "01",
    title: "1331 Grand Avenue",
    caption: "The building",
    description:
      "The two-story building on Grand Avenue. Our practice is on the upper level; the parking entrance sits below. We share the address with The Oldershaw Clinic — look for our sign on the railing.",
    src: "/office/09.webp",
  },
  {
    num: "02",
    title: "Up the walkway",
    caption: "The approach",
    description:
      "A planted walkway runs along the side of the building from the parking area to the front entrance. Year-round flower beds and herb planters line the path.",
    src: "/office/10.webp",
  },
  {
    num: "03",
    title: "You've arrived",
    caption: "The practice signage",
    description:
      "The signage at the entrance — piedmont dental BY DESIGN, Jill A. Martenson, DDS. The leaf mark in the logo is the same one you see in this site's header.",
    src: "/office/08.webp",
  },
  {
    num: "04",
    title: "The waiting room",
    caption: "Compact, daylit, calm",
    description:
      "Two armchairs and a sofa rather than rows of clinic chairs. Plants on the windowsills, framed photographs on the walls, a quiet corner desk. The room is intentionally small — most patients are called back within a few minutes of arrival.",
    src: "/office/01.webp",
  },
  {
    num: "05",
    title: "The front desk",
    caption: "Where you check in",
    description:
      "Patient services and treatment scheduling are handled here by Christine and Elaina (see Meet the Team). New-patient paperwork is handled here too — call ahead and we'll get yours started before you arrive.",
    src: "/office/02.webp",
  },
  {
    num: "06",
    title: "Dr. Martenson's credentials",
    caption: "The diploma wall",
    description:
      "Behind the front desk: Dr. Martenson's diplomas and certifications. University of the Pacific School of Dentistry. The University of Colorado Health Science Center General Practice Residency. Continuing-education certificates from the AACD, Spear, and others.",
    src: "/office/03.webp",
  },
  {
    num: "07",
    title: "Treatment hallway",
    caption: "Into the operatories",
    description:
      "The hallway behind the front desk leads to four operatories and the imaging room. Each treatment room is numbered (you can just see room 3 at the end of this hall).",
    src: "/office/04.webp",
  },
  {
    num: "08",
    title: "An operatory",
    caption: "Where treatment happens",
    description:
      "Inside one of the treatment rooms — chair, overhead operating light, integrated sink, and the panoramic window above the chair. Each operatory is set up identically.",
    src: "/office/06.webp",
  },
  {
    num: "09",
    title: "Digital panoramic imaging",
    caption: "Lower-radiation X-rays",
    description:
      "The panoramic X-ray unit captures the entire upper and lower jaw in one rotation. Digital radiography reduces radiation exposure by 80–90% versus traditional film and produces instant detailed images — used heavily for treatment planning before implant work.",
    src: "/office/05.webp",
  },
  {
    num: "10",
    title: "The outdoor patio",
    caption: "End of tour",
    description:
      "Off the back of the practice — a small private patio with planters, table seating, and the view back toward the operatories. End of tour. When you're ready to see it in person, book a visit below.",
    src: "/office/07.webp",
  },
];

type PracticeDetail = {
  label: string;
  value: ReactNode;
  meta: string;
};

const PRACTICE_DETAILS: PracticeDetail[] = [
  { label: "Address", value: "1331 Grand Ave", meta: "Piedmont, CA 94610" },
  {
    label: "Hours",
    value: (
      <>
        Mon &amp; Wed 7–5
        <br />
        Tue &amp; Thu 7–3
      </>
    ),
    meta: "Fri–Sun closed",
  },
  { label: "Phone", value: "(510) 350-3937", meta: "Or text the practice" },
];

export default function OfficeTourPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="page-hero tour-hero">
          <div className="page-hero-inner">
            <div className="page-hero-content">
              <div className="num">— Office Tour —</div>
              <h1>
                A guided look <em>inside.</em>
              </h1>
              <p className="page-hero-sub">
                Take the tour at your own pace, then get in touch when
                you&apos;re ready to see it in person.
              </p>
              <div className="procedures-hero-actions">
                <a href="#stop-01" className="btn btn-primary btn-lg">
                  Begin tour →
                </a>
                <a href="/contact" className="btn btn-ghost btn-lg">
                  Contact us
                </a>
              </div>
            </div>

            <ul className="tour-details">
              {PRACTICE_DETAILS.map((d) => (
                <li key={d.label}>
                  <span className="td-label">{d.label}</span>
                  <span className="td-value">{d.value}</span>
                  <span className="td-meta">{d.meta}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Tour body — 10 zig-zag stops with sticky progress nav */}
        <section className="tour-body">
          <aside className="tour-progress" aria-label="Tour progress">
            <ol>
              {STOPS.map((s) => (
                <li key={s.num}>
                  <a href={`#stop-${s.num}`}>
                    <span className="tp-num">{s.num}</span>
                    <span className="tp-label">{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="tour-stops">
            {STOPS.map((s, i) => (
              <article
                key={s.num}
                id={`stop-${s.num}`}
                className={`tour-stop ${i % 2 === 0 ? "is-left" : "is-right"}`}
              >
                <div className="tour-stop-image">
                  <Image
                    src={s.src}
                    alt={s.caption}
                    fill
                    sizes="(max-width: 1080px) 100vw, 56vw"
                    style={{ objectFit: "cover" }}
                    priority={i === 0}
                  />
                  <span className="tour-stop-tag">
                    Stop {s.num} / {String(STOPS.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="tour-stop-content">
                  <span className="tour-stop-num">{s.num}</span>
                  <h2 className="tour-stop-title">{s.title}</h2>
                  <p className="tour-stop-caption">{s.caption}</p>
                  <p className="tour-stop-desc">{s.description}</p>
                  {i < STOPS.length - 1 ? (
                    <a
                      href={`#stop-${STOPS[i + 1].num}`}
                      className="tour-stop-next"
                    >
                      Continue to {STOPS[i + 1].title} →
                    </a>
                  ) : (
                    <a href="/contact" className="btn btn-teal btn-lg">
                      Contact us →
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <AwardsStrip />
        <AboutCTA />
      </main>
      <SiteFooter />
      <BreadcrumbSchema
        crumbs={[
          { name: "About", url: "/about" },
          { name: "Office Tour", url: "/about/tour" },
        ]}
      />
    </>
  );
}
