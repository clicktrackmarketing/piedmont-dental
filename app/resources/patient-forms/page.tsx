import type { Metadata } from "next";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import AwardsStrip from "@/components/AwardsStrip";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";

import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "New Patient Forms",
  description:
    "New-patient and update forms for your visit — call the office ahead or arrive 10 minutes early and we'll hand you an iPad to complete them.",
  alternates: { canonical: "/resources/patient-forms" },
  openGraph: {
    title: "Patient Forms — Piedmont Dental By Design",
    description:
      "New-patient and update forms for your visit — call the office ahead or arrive 10 minutes early and we'll hand you an iPad.",
    url: "https://piedmontdentalbydesign.com/resources/patient-forms",
    type: "article",
  },
};

export default function PatientFormsPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <section className="resource-hero">
          <div className="resource-hero-inner">
            <div className="resource-hero-text">
              <Link href="/resources" className="post-hero-back">
                ← Back to resources
              </Link>
              <div className="num" style={{ marginTop: 12 }}>
                Patient Resources
              </div>
              <h1 className="resource-hero-title">Patient Forms</h1>
              <p className="resource-hero-description">
                New patient, or an existing patient updating your details?
                Give us a call before your appointment and we&apos;ll get your
                paperwork started, so we can attend to your medical needs the
                moment you walk through the door.
              </p>
            </div>
          </div>
        </section>

        <section className="forms-body">
          <div className="forms-inner">
            <div className="forms-portal-card">
              <span className="num">i. — Get your forms</span>
              <h2>Call ahead and we&apos;ll set you up</h2>
              <p>
                Existing patient updating your info, or new patient prepping
                for your first visit? Call the office and we&apos;ll take care
                of your paperwork before you arrive.
              </p>
              <a
                href="tel:5103503937"
                className="btn btn-primary btn-lg forms-portal-cta"
              >
                Call (510) 350-3937 →
              </a>
              <p className="forms-portal-note">
                Prefer to write? <Link href="/contact">Send us a message</Link>{" "}
                and we&apos;ll follow up.
              </p>
            </div>

            <div className="forms-info">
              <span className="num">ii. — Before your visit</span>
              <h2>A few things to know</h2>
              <ul className="forms-info-list">
                <li>
                  <strong>No printing needed.</strong> We&apos;ll hand you an
                  iPad in the office — nothing for you to print or post.
                </li>
                <li>
                  <strong>New patients:</strong> arrive 10 minutes before your
                  appointment to complete your forms. It lets us focus on your
                  care rather than paperwork.
                </li>
                <li>
                  <strong>Short on time?</strong> Call us ahead of your visit
                  and we&apos;ll get as much of your paperwork started as we
                  can before you arrive.
                </li>
              </ul>
              <p className="forms-info-callout">
                Questions about any of this? Call our office at{" "}
                <a href="tel:5103503937">(510) 350-3937</a> — we&apos;re happy
                to walk you through it.
              </p>
            </div>

            <div className="forms-cta">
              <h2>Ready for your next visit?</h2>
              <p>
                Send us a message or call and we&apos;ll set up a comprehensive
                exam with Dr. Martenson or Dr. Ma at a time that works for you.
              </p>
              <div className="forms-cta-actions">
                <Link href="/contact" className="btn btn-primary btn-lg">
                  Contact us →
                </Link>
                <a href="tel:5103503937" className="btn btn-ghost btn-lg">
                  or call (510) 350-3937
                </a>
              </div>
            </div>
          </div>
        </section>

        <AwardsStrip />
        <AboutCTA />
      </main>
      <SiteFooter />
    
      <BreadcrumbSchema
        crumbs={[
          { name: "Resources", url: "/resources" },
          { name: "Patient Forms", url: "/resources/patient-forms" },
        ]}
      />
</>
  );
}
