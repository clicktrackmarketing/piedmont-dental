import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import AwardsStrip from "@/components/AwardsStrip";
import SiteFooter from "@/components/SiteFooter";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import {
  OaklandHero,
  OaklandDoctors,
  OaklandCare,
  OaklandAreas,
  OaklandReading,
  OaklandCTA,
} from "@/components/OaklandPatients";

export const metadata: Metadata = {
  title: "Dentist for Oakland Patients",
  description:
    "Piedmont Dental By Design, 1331 Grand Avenue, about five minutes from MacArthur BART. General, cosmetic and restorative dentistry for Oakland patients since 1996.",
  alternates: { canonical: "/oakland" },
  openGraph: {
    title: "A dentist for Oakland patients | Piedmont Dental By Design",
    description:
      "General, cosmetic and restorative dentistry for Oakland patients on Grand Avenue since 1996, about five minutes from MacArthur BART.",
    url: "https://piedmontdentalbydesign.com/oakland",
    type: "website",
  },
};

export default function OaklandPage() {
  return (
    <>
      <BreadcrumbSchema
        crumbs={[
          { name: "About", url: "/about" },
          { name: "For Oakland patients", url: "/oakland" },
        ]}
      />
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <OaklandHero />
        <OaklandDoctors />
        <OaklandCare />
        <OaklandAreas />
        <AwardsStrip />
        <OaklandReading />
        <OaklandCTA />
      </main>
      <SiteFooter />
    </>
  );
}
