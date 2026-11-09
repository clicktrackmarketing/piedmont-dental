"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Member = {
  name: string;
  role: string;
  initials: string;
  bg: string;
  /** Optional real photo from the live site harvest. */
  photo?: string;
  quote: string;
};

const GRADIENTS = {
  teal: "linear-gradient(140deg, #5dd0c2 0%, #2c8c82 100%)",
  ink: "linear-gradient(140deg, #4a4a4a 0%, #1a1a1a 100%)",
  warm: "linear-gradient(140deg, #8a7860 0%, #4a3a2a 100%)",
  tealDeep: "linear-gradient(140deg, #4dc4b6 0%, #1f6b62 100%)",
};

const PALETTE = [GRADIENTS.teal, GRADIENTS.ink, GRADIENTS.warm, GRADIENTS.tealDeep];

const team: Omit<Member, "bg">[] = [
  {
    name: "Christine",
    role: "Patient Services Manager · Registered Dental Assistant",
    initials: "C",
    photo: "/img/team/christine.jpg",
    quote:
      "I graduated from the Dental Assisting Program at College of Alameda in 2008 and started working here at Piedmont Dental by Design right after graduation. I worked as an assistant for many years until I recently transitioned up front to work as Patient Services Manager. My many years in the back caring for patients chairside have helped me in my new role of Patient Services Manager in helping educate patients on their oral health and I have a better understanding of how the practice works together front and back. When I am not at work I enjoy spending time with my husband and kids at family get-togethers, camping, and visiting fun places.",
  },
  {
    name: "Elaina",
    role: "Financial, Treatment & Business Manager",
    initials: "E",
    photo: "/img/team/elaina.jpg",
    quote:
      "I began working at the front desk in January 2012 as the Patient Services Manager and transitioned to the Financial/Business Manager August 2014. I have over 20 years of front office experience in the dental field. I enjoy working with patients and helping them in any way that I can. I have been married for many years and we have a young daughter, Angelina. When I'm not in the office, I take my daughter to her sporting events and play dates with her cousins. I love spending time with my large family, taking photos of them, and visiting fun places.",
  },
  {
    name: "Michelle",
    role: "Registered Dental Hygienist",
    initials: "M",
    photo: "/img/team/michelle.jpg",
    quote:
      "I am a registered dental hygienist and have been working for Piedmont Dental by Design since 1999. I truly have a passion for my profession and love educating patients about their oral health. On my time off I enjoy spending time with my husband and two sons. We enjoy outdoor events such as boating, swimming and hiking. My sons play sports such as soccer, basketball and baseball so we spend a lot of time at games and practice. I also enjoy kickboxing and working out.",
  },
  {
    name: "Kelley",
    role: "Registered Dental Hygienist",
    initials: "K",
    photo: "/img/team/kelley.jpg",
    quote:
      "I've been working in the dental field for 26+ years, beginning my career as a front and back office assistant at the early age of 16. In 2009, I graduated from University of the Pacific with my degree in dental hygiene. My goal as a dental hygienist is to provide each patient with high quality, individualized care and educate them on the importance of good oral health. Outside of work most of my time and energy is spent keeping up with my very active and curious daughter. I enjoy traveling, going to outdoor food and music festivals, and binge watching shows on HGTV.",
  },
  {
    name: "Cesar",
    role: "Registered Dental Hygienist",
    initials: "C",
    photo: "/img/team/cesar.jpg",
    quote:
      "I have over 10 years of experience working in the dental field. I started my career as a Dental Assistant and was eventually promoted to a management position. After a few years in management, I realized I wanted to further my career in the dental field, so I made the decision to start my journey into the Dental Hygiene Program. I graduated from Diablo Valley College Dental Hygiene Program in 2024. I'm committed to applying my extensive skills in oral care procedures to enhance dental experiences for patients. Outside of work, I enjoy spending time with my wife and two kids. We enjoy traveling and trying new food.",
  },
  {
    name: "Lee'Lannee",
    role: "Expanded Function Dental Assistant 2",
    initials: "L",
    photo: "/img/team/lee-lannee.jpg",
    quote:
      "After graduating College of Alameda Dental Assistant School, I joined Piedmont Dental by Design in 1999, as a Registered Dental Assistant. In 2019, I graduated University of the Pacific: Expanded Functions Program which allows me to utilize additional skills as a Registered Dental Assistant. My goal as working chairside is to make patients feel at ease during treatment as well as to educate patients on their oral health. When not at work, I enjoy spending quality time with my loved ones and vacation!",
  },
  {
    name: "Susana",
    role: "Registered Dental Assistant",
    initials: "S",
    photo: "/img/team/susana.jpg",
    quote:
      "I graduated from College of Alameda Dental Assisting program in 2020. I started my externship here at Piedmont Dental while being in school in February 2020, and in July of 2020 I joined the team! This office has treated me like family and I love being here and making patients smile. In my free time I like getting together with family and friends.",
  },
];

const members: Member[] = team.map((m, i) => ({
  ...m,
  bg: PALETTE[i % PALETTE.length],
}));

export default function TeamFull() {
  // Set of currently-open card indices
  const [open, setOpen] = useState<Set<number>>(new Set());

  // Whether we're on a viewport that renders the grid in 2 columns.
  // When 2-col, clicking one card also opens its row partner so the
  // other half of the row isn't a tall empty box.
  const [pairMode, setPairMode] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // The grid switches to 1 column at the same breakpoint as the global
    // mobile breakpoint (720px).
    const mq = window.matchMedia("(min-width: 720px)");
    const apply = () => setPairMode(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const partnerOf = (idx: number): number | null => {
    if (!pairMode) return null;
    const partner = idx % 2 === 0 ? idx + 1 : idx - 1;
    if (partner < 0 || partner >= members.length) return null;
    return partner;
  };

  const toggle = (idx: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      const wasOpen = next.has(idx);
      const partner = partnerOf(idx);
      if (wasOpen) {
        next.delete(idx);
        if (partner !== null) next.delete(partner);
      } else {
        next.add(idx);
        if (partner !== null) next.add(partner);
      }
      return next;
    });
  };

  return (
    <section className="team-full" id="team-list">
      <div className="team-full-inner">
        <header className="section-head team-full-head">
          <div>
            <div className="num">i. — Practice team</div>
            <h2>
              The people who <em>actually run</em> the practice.
            </h2>
          </div>
          <p className="lede">
            Seven team members across patient services, hygiene, and dental
            assisting — most have been with the practice for a decade or more.
            Click any card to read their full bio.
          </p>
        </header>

        <div className="team-full-grid">
          {members.map((m, i) => {
            const isOpen = open.has(i);
            const panelId = `team-bio-${i}`;
            return (
              <article
                className={`team-full-card ${isOpen ? "is-open" : ""}`}
                key={m.name}
              >
                <button
                  type="button"
                  className="team-full-summary"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                >
                  <span
                    className={`team-full-avatar${m.photo ? " has-photo" : ""}`}
                    style={m.photo ? undefined : { background: m.bg }}
                  >
                    {m.photo ? (
                      <Image
                        src={m.photo}
                        alt={m.name}
                        fill
                        sizes="64px"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      m.initials
                    )}
                  </span>
                  <div className="team-full-meta">
                    <h3>{m.name}</h3>
                    <p>{m.role}</p>
                  </div>
                  <svg
                    className="team-full-chevron"
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
                </button>
                <div
                  id={panelId}
                  className="team-full-panel"
                  role="region"
                  aria-hidden={!isOpen}
                >
                  <blockquote className="team-full-quote">{m.quote}</blockquote>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
