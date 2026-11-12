import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import ProcedureDetail from "@/components/ProcedureDetail";
import AwardsStrip from "@/components/AwardsStrip";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";
import { getCategory } from "@/lib/procedure-categories";

export const metadata: Metadata = {
  title:
    "Panoramic X-Rays in Piedmont, CA",
  description:
    "Panoramic X-rays — extraoral wraparound imaging for wisdom teeth evaluation, TMJ assessment, jawbone fractures, and dental implant planning.",
  alternates: { canonical: "/procedures/cleanings-prevention/panoramic-x-rays" },
  openGraph: {
    title: "Panoramic X-Rays — Piedmont Dental By Design",
    description:
      "Wraparound imaging — wisdom teeth, sinus, TMJ, mandibular nerve, implant planning.",
    url: "https://piedmontdentalbydesign.com/procedures/cleanings-prevention/panoramic-x-rays",
    type: "article",
  },
};

const category = getCategory("cleanings-prevention");

export default function PanoramicXRaysPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="panoramic-x-rays"
          title="Panoramic X-Rays"
          tagline="Wraparound imaging for the whole mouth — extraoral, simple, and revealing."
          featuredImage="/img/lIVE Piedmont website images/Panoramic X-Rays.png"
          intro={[
            "Panoramic X-rays (also known as Panorex® or orthopantomograms) are wraparound photographs of the face and teeth. They offer a view that would otherwise be invisible to the naked eye — exposing hidden structures like wisdom teeth, revealing preliminary signs of cavities, and showing fractures and bone loss.",
            "Panoramic X-rays are extraoral and simple to perform. Where most dental X-rays involve film placed inside the mouth, panoramic film sits inside a mechanism that rotates around the outside of the head.",
          ]}
          stats={[
            { value: "Extraoral", label: "Outside the mouth" },
            { value: "As-needed", label: "Not bi-annual like bite-wings" },
            { value: "Ear-to-ear", label: "View of upper + lower jaw" },
            { value: "Lower dose", label: "Less radiation than other types" },
          ]}
          sections={[
            {
              title: "When panoramic X-rays are used",
              body: [
                "Unlike bite-wing X-rays, which are typically taken once or twice a year, panoramic X-rays are generally only taken on an as-needed basis. They aren't a detailed view of each tooth — instead they provide a better view of the sinus areas, nasal areas, and mandibular nerve.",
                "Panoramic X-rays are preferable to bite-wing X-rays when a patient is in extreme pain, and when a sinus problem is suspected to have caused dental issues. The most common uses are revealing the positioning of wisdom teeth and checking whether dental implants will affect the mandibular nerve (the nerve extending toward the lower lip).",
              ],
            },
            {
              title: "What panoramic X-rays may reveal",
              bullets: [
                "Assessment for patients with an extreme gag reflex.",
                "Progression of TMJ disorders.",
                "Cysts and abnormalities.",
                "Impacted teeth.",
                "Jawbone fractures.",
                "Treatment planning for full and partial dentures, braces, and implants.",
                "Gum disease and cavities.",
              ],
            },
            {
              title: "How the imaging works",
              body: [
                "The Panorex equipment consists of a rotating arm that holds the X-ray generator and a moving film attachment that holds the pictures. Your head is positioned between these two devices. The X-ray generator moves around the head taking pictures as orthogonally as possible.",
                "The positioning of the head and body determines how sharp, clear, and useful the X-rays will be. Correct positioning also keeps distortion of the image to a minimum.",
                "Panoramic X-rays are an important diagnostic tool and are also valuable for planning future treatment. They are safer than other types of X-rays because less radiation enters the body.",
              ],
            },
          ]}
          faqs={[
            {
              q: "What's the difference between a panoramic X-ray and a regular dental X-ray?",
              a: "A regular bite-wing or periapical X-ray is taken with a small sensor inside your mouth and shows a few teeth in detail. A panoramic X-ray is taken from outside the mouth by a machine that rotates around your head — it captures all upper and lower teeth, both jaws, sinuses, and TMJ joints in a single wraparound image. Less detail per tooth, much broader view.",
            },
            {
              q: "When is a panoramic X-ray needed?",
              a: "Most often for wisdom-teeth evaluation, dental implant planning, suspected sinus problems causing tooth pain, jaw fractures, TMJ assessment, and orthodontic planning. It's also helpful for patients with severe gag reflexes who can't tolerate intraoral sensors. Most patients don't need a panoramic X-ray at every visit — it's done on an as-needed basis.",
            },
            {
              q: "Do I have to bite down on anything for a panoramic X-ray?",
              a: "Just a small plastic bite tab to hold your front teeth in the right position. You stand still while the machine rotates around your head — typically 15–20 seconds. The plastic positioning piece can feel a little awkward, but the X-ray itself is fast and painless.",
            },
            {
              q: "How long does a panoramic X-ray take?",
              a: "About 5 minutes total — most of it positioning. The scan itself is 15–20 seconds while the rotating arm moves around your head. The image appears on the screen immediately for the dentist to review.",
            },
            {
              q: "Is a panoramic X-ray safer than other X-rays?",
              a: "Per image, yes — panoramic X-rays deliver less radiation than a full-mouth series of intraoral X-rays because they capture everything in a single exposure rather than 14–20 individual films. They also avoid film placement in the mouth, which is helpful for patients with strong gag reflexes.",
            },
            {
              q: "Will a panoramic X-ray show cavities?",
              a: "Small cavities between teeth — no, not reliably. The image isn't sharp enough at the tooth level. For that, we rely on bite-wing X-rays. Panoramic X-rays show structural problems: impacted teeth, jaw fractures, large cysts, bone loss, sinus involvement, and developmental abnormalities.",
            },
            {
              q: "Why does the dentist need a panoramic X-ray to plan implants?",
              a: "To check the position of the mandibular nerve (the major nerve running through your lower jaw) and the floor of the sinus (in the upper jaw). Implants must be placed without contacting either. The panoramic image — sometimes combined with a 3D cone-beam scan — maps out the safe placement zone.",
            },
            {
              q: "Can a panoramic X-ray detect TMJ problems?",
              a: "It can show the bony structures of the TMJ joints and any obvious fractures or arthritis. For soft-tissue diagnosis of the disc or muscle problems, MRI is more useful. Panoramic imaging is often the first imaging step when TMJ pain is suspected.",
            },
          ]}
        />
        <AwardsStrip />
        <AboutCTA />
      </main>
      <SiteFooter />
    </>
  );
}
