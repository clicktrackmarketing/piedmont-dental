"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Doctor = {
  id: string;
  initials: string;
  bg: string;
  name: string;
  suffix?: string;
  role: string;
  yearsLabel?: string;
  awardLabel?: string;
  photo: string;
  photoAlt: string;
  /** Headline question (e.g. "Who is Dr. Jill Martenson?") */
  question: string;
  /** Body paragraphs — 1-2 short paragraphs */
  paragraphs: string[];
  /** Link to the full dedicated page */
  href: string;
};

const DOCTORS: Doctor[] = [
  {
    id: "martenson",
    initials: "JM",
    bg: "var(--teal)",
    name: "Dr. Jill A. Martenson",
    role: "Cosmetic & General Dentistry",
    yearsLabel: "DDS · 30 years",
    awardLabel: "Best Esthetic Dentist 2024 & 2025",
    photo:
      "/img/lIVE Piedmont website images/Headshot_Dr-Jill-Martenson-scaled.jpg",
    photoAlt: "Dr. Jill Martenson at Piedmont Dental By Design",
    question: "Who is Dr. Jill Martenson?",
    paragraphs: [
      "Dr. Jill A. Martenson, DDS, has cared for the Piedmont community for 30 years across the full range of cosmetic and general dentistry. She earned her Doctor of Dental Surgery with high honors from the University of the Pacific School of Dentistry in 1996, after graduating with honors from UCLA, and completed a General Practice Residency at the University of Colorado Health Science Center. She was voted Best Esthetic Dentist by Best of the East Bay readers in 2024 and 2025, and is a member of the AACD, ADA, and CDA — three of the professional associations most associated with cosmetic dental standards.",
      "She practices alongside Dr. David Ma, who treats the same full range of cosmetic and general cases; board-certified periodontist Dr. Filippo Cangini completes the team — so patients can stay with one practice for cosmetic, gum, and structural care.",
    ],
    href: "/about/dr-martenson",
  },
  {
    id: "ma",
    initials: "DM",
    bg: "var(--teal-deep)",
    name: "Dr. David Ma",
    role: "Cosmetic & General Dentistry",
    yearsLabel: "UPenn-trained",
    awardLabel: "Cosmetic & general dentistry",
    photo: "/team/dr-ma.webp",
    photoAlt: "Dr. David Ma, cosmetic and general dentist",
    question: "Who is Dr. David Ma?",
    paragraphs: [
      "Dr. David Ma, DMD, began his path into dentistry with neurobiology at UC Davis before graduating with honors from the University of Pennsylvania School of Dental Medicine — bringing both rigor and craft to every case he takes on.",
      "He completed his General Practice Residency at the Northern California VA Hospital, where he gained extensive experience in complex treatment planning. Today his work spans cosmetic bonding, porcelain veneers, Invisalign®, and porcelain crowns, alongside the full range of general and family dentistry.",
    ],
    href: "/about/dr-ma",
  },
  {
    id: "cangini",
    initials: "FC",
    bg: "var(--ink)",
    name: "Dr. Filippo Cangini",
    role: "Periodontics",
    yearsLabel: "26 years",
    awardLabel: "Board-certified periodontist",
    photo: "/team/dr-cangini.webp",
    photoAlt: "Dr. Filippo Cangini, board-certified periodontist",
    question: "Who is Dr. Filippo Cangini?",
    paragraphs: [
      "Dr. Cangini brings over two decades of clinical and academic experience to Piedmont Dental — training that spans three institutions across general dentistry, periodontics, and oral sciences.",
      "As a board-certified periodontist, his focus is gums and the structures that support your teeth — treating gum disease, performing gum and bone grafting, and surgically placing dental implants in coordination with the rest of the practice.",
    ],
    href: "/about/dr-cangini",
  },
];

export default function About() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = DOCTORS[activeIdx];

  return (
    <section className="about" id="about">
      <div className="about-portrait">
        {/* Render all portraits stacked so swap is instant and pre-cached */}
        {DOCTORS.map((d, i) => (
          <div
            key={d.id}
            className={`about-portrait-layer ${
              i === activeIdx ? "about-portrait-layer--active" : ""
            }`}
            aria-hidden={i !== activeIdx}
          >
            <Image
              src={d.photo}
              alt={d.photoAlt}
              fill
              sizes="(max-width: 1080px) 100vw, 540px"
              style={{ objectFit: "cover" }}
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      <div className="about-text">
        <span className="num">iii. — The dentists</span>
        <h2>
          Thirty years of cosmetic dentistry, <em>in the East Bay.</em>
        </h2>

        <div className="about-doc-content" key={active.id}>
          {active.paragraphs.map((p, i) => (
            <p
              key={i}
              className={i === 0 ? "about-answer" : undefined}
            >
              {p}
            </p>
          ))}

        </div>

        <div className="about-team" role="tablist" aria-label="Choose a doctor">
          {DOCTORS.map((d, i) => (
            <button
              key={d.id}
              type="button"
              role="tab"
              aria-selected={i === activeIdx}
              onClick={() => setActiveIdx(i)}
              className={`doc doc--btn ${
                i === activeIdx ? "doc--active" : ""
              }`}
            >
              <span
                className="doc-avatar doc-avatar--photo"
                aria-hidden="true"
              >
                <Image
                  src={d.photo}
                  alt=""
                  fill
                  sizes="56px"
                  style={{ objectFit: "cover" }}
                />
              </span>
              <div>
                <h4>{d.name}{d.suffix ? `, ${d.suffix}` : ""}</h4>
                <p>{d.role}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="about-cta">
          <Link href={active.href} className="btn btn-primary">
            About Dr. {active.name.split(" ").slice(-1)[0]} →
          </Link>
          <a href="/contact" className="btn btn-ghost">
            Contact us
          </a>
        </div>
      </div>
    </section>
  );
}
