import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import DoctorProfile from "@/components/DoctorProfile";
import AwardsStrip from "@/components/AwardsStrip";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Dr. Filippo Cangini, Periodontist",
  description:
    "Dr. Filippo Cangini — board-certified periodontist, 26 years' experience. Trained at U. of Siena, Buffalo, and Rochester's Eastman Dental Center.",
  alternates: { canonical: "/about/dr-cangini" },
  openGraph: {
    title: "Dr. Filippo Cangini — Periodontist at Piedmont Dental By Design",
    description:
      "Board-certified periodontist · 26 years of experience · specialized training in periodontics and implant dentistry.",
    url: "https://piedmontdentalbydesign.com/about/dr-cangini",
    type: "profile",
    images: ["/team/dr-cangini.webp"],
  },
};

export default function DrCanginiPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <DoctorProfile
          index="i"
          pronoun="he"
          name="Dr. Filippo Cangini"
          role="Board-Certified Periodontist"
          intro="Dr. Filippo Cangini is a board-certified periodontist. He graduated from the University of Siena in 1994, earned a Master of Oral Sciences from the University at Buffalo in 2000, and completed specialized training in periodontics and implant dentistry at the University of Rochester in 2011."
          photo="/team/dr-cangini.webp"
          photoAlt="Dr. Filippo Cangini, periodontist"
          credentials={[
            { value: "26 yrs", label: "Experience" },
            { value: "Board", label: "Certified Periodontist" },
            { value: "1994", label: "University of Siena, Italy" },
            { value: "2011", label: "U. Rochester (Eastman Dental)" },
          ]}
          bioParagraphs={[
            "Dr. Cangini brings over two decades of clinical and academic experience to Piedmont Dental by Design. His training spans three institutions and three specialties — general dentistry at the University of Rochester's Eastman Dental Center, periodontics at the same institution, and oral sciences at the University at Buffalo.",
            "As a board-certified periodontist, his focus is on the gums and supporting structures of the teeth — gum disease treatment, gum and bone grafting, and the surgical placement of dental implants in close coordination with the rest of the practice.",
          ]}
          education={[
            {
              date: "1994",
              text: "Graduated from the University of Siena, Italy — Dental School.",
            },
            {
              date: "2000",
              text: "Master of Oral Sciences from the University at Buffalo.",
            },
            {
              date: "2006",
              text: "Advanced Education in General Dentistry at the University of Rochester, Eastman Dental Center, New York.",
            },
            {
              date: "2011",
              text: "Certificate in Periodontics and Implant Dentistry from the University of Rochester, Eastman Dental Center.",
            },
          ]}
          specializations={[
            {
              title: "Periodontics",
              body: "Diagnosis and treatment of gum disease in all its stages — from gingivitis through advanced periodontitis.",
            },
            {
              title: "Implant dentistry",
              body: "Surgical placement of dental implants, with complete planning coordinated with the restorative dentist.",
            },
            {
              title: "Soft- and hard-tissue grafting",
              body: "Gum grafting, bone grafting, and sinus augmentation to rebuild structures lost to disease or trauma.",
            },
          ]}
          associations={[
            "Board-Certified Periodontist",
            "American Dental Association (ADA)",
            "California Dental Association (CDA)",
          ]}
        />
        <AwardsStrip />
        <AboutCTA />
      </main>
      <SiteFooter />
      <BreadcrumbSchema
        crumbs={[
          { name: "About", url: "/about" },
          { name: "Dr. Filippo Cangini", url: "/about/dr-cangini" },
        ]}
      />
    </>
  );
}
