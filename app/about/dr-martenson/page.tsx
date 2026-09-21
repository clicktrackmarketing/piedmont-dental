import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import DoctorProfile from "@/components/DoctorProfile";
import AwardsStrip from "@/components/AwardsStrip";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Dr. Jill Martenson — Cosmetic & General Dentistry",
  description:
    "Dr. Jill A. Martenson of Piedmont Dental By Design. UCLA & UOP-trained, with over 30 years of cosmetic and general dentistry experience.",
  alternates: { canonical: "/about/dr-martenson" },
  openGraph: {
    title: "Dr. Jill Martenson — Piedmont Dental By Design",
    description:
      "Cosmetic & general dentistry · over 30 years in Piedmont · Best of the East Bay 2024 & 2025.",
    url: "https://piedmontdentalbydesign.com/about/dr-martenson",
    type: "profile",
    images: ["/team/dr-martenson.webp"],
  },
};

export default function DrMartensonPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <DoctorProfile
          index="i"
          pronoun="she"
          name="Dr. Jill A. Martenson"
          role="Cosmetic & General Dentistry"
          intro="For over 30 years, Dr. Jill Martenson has been a trusted, award-winning dentist serving the Piedmont community with exceptional, patient-centered care focused on preventative, restorative, and cosmetic dentistry."
          photo="/team/dr-martenson.webp"
          photoAlt="Dr. Jill Martenson"
          credentials={[
            { value: "30 yrs", label: "Experience" },
            { value: "2025", label: "Best of the East Bay" },
            { value: "2024 & 2025", label: "Best Esthetic Dentist" },
            { value: "2025", label: "Best Dental Practice" },
          ]}
          bioParagraphs={[
            "For over 30 years, Dr. Jill Martenson has been a trusted, award-winning dentist proudly serving the Piedmont community with exceptional, patient-centered care. Known for her dedication to excellence and compassionate approach, Dr. Martenson has built a reputation as a highly respected leader in dentistry.",
            "She graduated with honors from UCLA in 1991 with a Bachelor of Science degree in Kinesiology, followed by earning her Doctor of Dental Surgery degree with high honors from the University of the Pacific School of Dentistry in 1996. Dr. Martenson's deep commitment to her profession, advanced expertise, and passion for creating healthy, confident smiles have made her a cornerstone of dental care in the community.",
          ]}
          education={[
            {
              date: "1991",
              text: "Graduated with honors from UCLA with a BS degree in Kinesiology.",
            },
            {
              date: "1996",
              text: "Graduated with high honors from UOP School of Dentistry.",
            },
            {
              date: "Post-Graduation",
              text: "Completed a General Practice Residency at the University of Colorado Health Science Center in Denver — an advanced dental educational program.",
            },
          ]}
          career={[
            {
              date: "1997",
              text: "Returned to the Bay Area and joined Piedmont Dental by Design as an associate dentist.",
            },
            {
              date: "2000",
              text: "Became a partner with Dr. Herrero at Piedmont Dental by Design.",
            },
            {
              date: "2014",
              text: "After Dr. Herrero's retirement, Dr. Martenson acquired the practice and continues to provide high-quality dental care.",
            },
          ]}
          specializations={[
            {
              title: "Implant treatment planning",
              body: "Member of an Implant Study Club since 1997. Incorporates implant treatment planning and restoration into the practice as a core service.",
            },
            {
              title: "Aesthetics & bonding",
              body: "Consistently adds CE hours in cosmetic dentistry, bonding, and esthetic restoration to stay current with technique and materials.",
            },
            {
              title: "Preventive & restorative",
              body: "Preventive care and restorative treatments such as fillings, crowns, and bridges, designed to repair damage and maintain optimal oral health.",
            },
          ]}
          associations={[
            "American Dental Association (ADA)",
            "California Dental Association (CDA)",
            "Alameda County Dental Society",
            "American Academy of Cosmetic Dentistry (AACD)",
            "New Dentists Alliance",
            "Academy of General Dentistry",
            "International Congress of Implantology",
          ]}
          personal={[
            "Married to Mike McDonald, with two daughters — Jenner and Erin.",
            "Family enjoys exploring the East Bay's parks, lakes, and local farmer's markets.",
            "Loves skiing trips to Lake Tahoe, beach outings to Santa Cruz, and traveling across the country to visit family.",
          ]}
        />
        <AwardsStrip />
        <AboutCTA />
      </main>
      <SiteFooter />
      <BreadcrumbSchema
        crumbs={[
          { name: "About", url: "/about" },
          { name: "Dr. Jill Martenson", url: "/about/dr-martenson" },
        ]}
      />
    </>
  );
}
