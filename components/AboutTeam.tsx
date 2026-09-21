import Image from "next/image";
import Link from "next/link";

type Member = {
  name: string;
  role: string;
  /** Optional: drop a headshot at /public/team/<file> and reference here. */
  photo?: string;
  /** CSS background used as a placeholder when no photo is set. */
  bg: string;
  /** Optional click-through to a profile page (used for dentists). */
  href?: string;
};

// Tasteful photo-style gradients that read as "image placeholder" until real headshots land.
// Each gradient is two-stop, light-top → dark-bottom, suggesting a portrait against a backdrop.
const GRADIENTS = {
  teal: "linear-gradient(140deg, #5dd0c2 0%, #2c8c82 100%)",
  ink: "linear-gradient(140deg, #4a4a4a 0%, #1a1a1a 100%)",
  warm: "linear-gradient(140deg, #8a7860 0%, #4a3a2a 100%)",
  tealDeep: "linear-gradient(140deg, #4dc4b6 0%, #1f6b62 100%)",
} as const;

const doctors: Member[] = [
  {
    name: "Dr. Jill A. Martenson, DDS",
    role: "Cosmetic & General Dentistry · UOP School of Dentistry",
    bg: GRADIENTS.teal,
    photo: "/team/dr-martenson.webp",
    href: "/about/dr-martenson",
  },
  {
    name: "Dr. David Ma",
    role: "Cosmetic & General Dentistry · UPenn School of Dental Medicine",
    bg: GRADIENTS.warm,
    photo: "/team/dr-ma.webp",
    href: "/about/dr-ma",
  },
  {
    name: "Dr. Filippo Cangini",
    role: "Periodontist",
    bg: GRADIENTS.ink,
    photo: "/team/dr-cangini.webp",
    href: "/about/dr-cangini",
  },
];

const PALETTE = [GRADIENTS.teal, GRADIENTS.ink, GRADIENTS.warm, GRADIENTS.tealDeep];

const staffRaw: Omit<Member, "bg">[] = [
  { name: "Christine", role: "Patient Services Manager · RDA", photo: "/img/team/christine.jpg" },
  { name: "Elaina", role: "Financial, Treatment & Business Manager", photo: "/img/team/elaina.jpg" },
  { name: "Michelle", role: "Registered Dental Hygienist", photo: "/img/team/michelle.jpg" },
  { name: "Kelley", role: "Registered Dental Hygienist", photo: "/img/team/kelley.jpg" },
  { name: "Cesar", role: "Registered Dental Hygienist", photo: "/img/team/cesar.jpg" },
  { name: "Lee'Lannee", role: "Expanded Function Dental Assistant 2", photo: "/img/team/lee-lannee.jpg" },
  { name: "Susana", role: "Registered Dental Assistant", photo: "/img/team/susana.jpg" },
];

const staff: Member[] = staffRaw.map((m, i) => ({
  ...m,
  bg: PALETTE[i % PALETTE.length],
}));

function PersonGlyph() {
  // Soft generic person silhouette — only shown when no photo is set.
  return (
    <svg
      className="team-avatar-glyph"
      viewBox="0 0 64 64"
      width="34"
      height="34"
      aria-hidden="true"
    >
      <circle cx="32" cy="22" r="10" fill="rgba(255,255,255,0.55)" />
      <path
        d="M12 56c0-11 9-18 20-18s20 7 20 18"
        fill="rgba(255,255,255,0.55)"
      />
    </svg>
  );
}

function TeamCard({ name, role, photo, bg, href }: Member) {
  const body = (
    <>
      <span className="team-avatar" style={!photo ? { background: bg } : undefined}>
        {photo ? (
          <Image
            src={photo}
            alt={name}
            fill
            sizes="64px"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <PersonGlyph />
        )}
      </span>
      <div className="team-card-text">
        <h4>{name}</h4>
        <p>{role}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="team-card team-card--link">
        {body}
      </Link>
    );
  }
  return <article className="team-card">{body}</article>;
}

export default function AboutTeam() {
  return (
    <section className="team-section" id="team">
      <div className="team-inner">
        <header className="section-head team-head">
          <div>
            <div className="num">ii. — Team</div>
            <h2>
              Meet the people behind <em>your care.</em>
            </h2>
          </div>
          <p className="lede">
            Three dentists and seven practice staff. The same hygienist or
            assistant tends to handle the same patients visit after visit —
            it&apos;s how we keep care personal.
          </p>
        </header>

        <div className="team-block">
          <h3 className="team-subhead">Dentists</h3>
          <div className="team-grid team-grid--doctors">
            {doctors.map((d) => (
              <TeamCard key={d.name} {...d} />
            ))}
          </div>
        </div>

        <div className="team-block">
          <h3 className="team-subhead">Practice team</h3>
          <div className="team-grid team-grid--staff">
            {staff.map((s) => (
              <TeamCard key={s.name} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
