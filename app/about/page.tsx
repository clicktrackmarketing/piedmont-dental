import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import AboutHero from "@/components/AboutHero";
import AboutFeature from "@/components/AboutFeature";
import AboutValues from "@/components/AboutValues";
import AwardsStrip from "@/components/AwardsStrip";
import AboutTeam from "@/components/AboutTeam";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "About — Dr. Martenson, Dr. Ma & our team",
  description:
    "Meet Dr. Jill Martenson, DDS and Dr. David Ma — co-owners of Piedmont Dental By Design. 30 years of cosmetic and restorative dentistry on Grand Avenue.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Piedmont Dental By Design",
    description:
      "Meet Dr. Jill Martenson, Dr. David Ma, and the team behind Piedmont Dental By Design — 30 years of personalized cosmetic and restorative dentistry on Grand Avenue.",
    url: "https://piedmontdentalbydesign.com/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <AboutHero />
        <AboutFeature
          eyebrow="— Our dentists —"
          heading={
            <>
              Meet our dentists behind <em>your smile.</em>
            </>
          }
          body={[
            "For 30 years, Piedmont Dental By Design has remained a locally owned, family-oriented practice — devoted to restoring and enhancing the natural beauty of your smile using conservative, state-of-the-art procedures that result in beautiful, long-lasting smiles.",
            "Today the practice is led by its co-owners, Dr. Jill Martenson and Dr. David Ma, who share the same values that have guided the practice for three decades — trust, comfort, and personalized care.",
          ]}
          image="/img/about/doctors-martenson-ma.jpg"
          imageAlt="Dr. Jill Martenson and Dr. David Ma of Piedmont Dental By Design"
          imageSide="right"
        />
        <AboutValues />
        <AboutFeature
          eyebrow="— Why choose us —"
          heading={
            <>
              Why choose <em>Piedmont Dental By Design.</em>
            </>
          }
          body={[
            "At Piedmont Dental By Design, we take great pride in offering the very best in personal care. Our warm, family-oriented team values each patient relationship and prioritizes your comfort, making sure you receive the highest level of care tailored to your needs.",
            "Choosing the right cosmetic dentist to restore or renew your smile is crucial to achieving a beautiful, radiant result. From routine cleanings to complete smile transformations, our team is dedicated to your dental excellence and comfort.",
          ]}
          image="/img/about/dr-martenson-patient.jpg"
          imageAlt="Dr. Jill Martenson caring for a patient at Piedmont Dental By Design"
          imageSide="left"
        />
        <AwardsStrip />
        <AboutTeam />
        <AboutCTA />
      </main>
      <SiteFooter />
    </>
  );
}
