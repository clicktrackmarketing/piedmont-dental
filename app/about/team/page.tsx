import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import TeamFull from "@/components/TeamFull";
import AwardsStrip from "@/components/AwardsStrip";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "Meet the full team — three dentists plus seven practice staff: hygienists, assistants, and patient services. Real people who keep the practice running.",
  alternates: { canonical: "/about/team" },
  openGraph: {
    title: "Meet the Team — Piedmont Dental By Design",
    description:
      "Three dentists, six hygienists and assistants, and two practice managers — meet everyone at Piedmont Dental By Design.",
    url: "https://piedmontdentalbydesign.com/about/team",
    type: "website",
  },
};

const DOCTORS = [
  {
    href: "/about/dr-martenson",
    name: "Dr. Jill A. Martenson",
    role: "Cosmetic & General Dentistry",
    photo: "/team/dr-martenson.webp",
  },
  {
    href: "/about/dr-ma",
    name: "Dr. David Ma",
    role: "Cosmetic & General Dentistry",
    photo: "/team/dr-ma.webp",
  },
  {
    href: "/about/dr-cangini",
    name: "Dr. Filippo Cangini",
    role: "Periodontist",
    photo: "/team/dr-cangini.webp",
  },
];

export default function TeamPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="page-hero team-page-hero">
          <div className="page-hero-inner">
            <div className="page-hero-content">
              <div className="num">— Meet the Team —</div>
              <h1>
                Three dentists, <em>seven</em>
                <br />
                practice members.
              </h1>
              <p className="page-hero-sub">
                The same hygienist or assistant tends to handle the same patients
                visit after visit — that&apos;s how Piedmont Dental keeps care
                personal. Most of our staff have been here over a decade.
              </p>
              <div className="procedures-hero-actions">
                <a href="#team-list" className="btn btn-primary btn-lg">
                  Browse the team →
                </a>
                <a href="/contact" className="btn btn-ghost btn-lg">
                  Contact us
                </a>
              </div>
            </div>

            <div className="team-hero-photo">
              <Image
                src="/img/about/full-team.jpg"
                alt="The Piedmont Dental By Design team"
                width={2400}
                height={1600}
                sizes="(max-width: 1200px) 50vw, 600px"
                priority
              />
            </div>
          </div>
        </section>

        <section className="team-doctors-strip">
          <div className="team-doctors-strip-inner">
            <ul className="team-doctor-list team-doctor-list--row">
              {DOCTORS.map((d) => (
                <li key={d.name}>
                  <Link href={d.href} className="team-doctor-link">
                    <span className="team-doctor-photo">
                      <Image
                        src={d.photo}
                        alt={d.name}
                        fill
                        sizes="64px"
                        style={{ objectFit: "cover" }}
                      />
                    </span>
                    <div className="team-doctor-meta">
                      <h3>{d.name}</h3>
                      <p>{d.role}</p>
                    </div>
                    <span className="team-doctor-arrow">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <TeamFull />
        <AwardsStrip />
        <AboutCTA />
      </main>
      <SiteFooter />
      <BreadcrumbSchema
        crumbs={[
          { name: "About", url: "/about" },
          { name: "Meet the Team", url: "/about/team" },
        ]}
      />
    </>
  );
}
