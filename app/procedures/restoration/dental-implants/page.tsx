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
    "Dental Implants in Piedmont, CA",
  description:
    "Dental implants — the gold standard for replacing missing teeth. Surgically placed artificial roots restore chewing, speech, and a natural-looking smile.",
  alternates: { canonical: "/procedures/restoration/dental-implants" },
  openGraph: {
    title: "Dental Implants — Piedmont Dental By Design",
    description:
      "Permanent tooth replacement with implants — placed by specialist Dr. Filippo Cangini, restored by Dr. Jill Martenson.",
    url: "https://piedmontdentalbydesign.com/procedures/restoration/dental-implants",
    type: "article",
    images: ["/img/procedures/restoration/dental-implants/hero.png"],
  },
};

const category = getCategory("restoration");

export default function DentalImplantsPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="dental-implants"
          title="Dental Implants"
          tagline="Transform your smile with the gold standard for missing teeth."
          intro={[
            "Dental implants are a great way to replace missing teeth and also provide a fixed solution to having removable partial or complete dentures. Implants provide excellent support and stability for these dental appliances.",
            "Dental implants are artificial roots and teeth (usually titanium) that are surgically placed into the upper or lower jaw bone by a dentist or periodontist — a specialist of the gums and supporting bone. The teeth attached to implants are very natural-looking and often enhance or restore a patient's smile.",
            "Dental implants are very strong, stable, and durable and will last many years, but on occasion, they will have to be re-tightened or replaced due to normal wear.",
          ]}
          stats={[
            { value: "Multiple", label: "Visits over months" },
            { value: "~6 mo", label: "Healing & integration" },
            { value: "Titanium", label: "Implant material" },
            { value: "Lifetime", label: "Designed to last" },
          ]}
          sections={[
            {
              title: "Reasons for dental implants",
              bullets: [
                "Replace one or more missing teeth without affecting adjacent teeth.",
                "Resolve joint pain or bite problems caused by teeth shifting into missing tooth space.",
                "Restore a patient's confident smile.",
                "Restore chewing, speech, and digestion.",
                "Restore or enhance facial tissues.",
                "Support a bridge or denture, making them more secure and comfortable.",
              ],
            },
            {
              title: "What does getting dental implants involve?",
              body: [
                "The process of getting implants requires a number of visits over several months.",
                "X-rays and impressions (molds) are taken of the jaw and teeth to determine bone, gum tissue, and spacing available for an implant. While the area is numb, the implant will be surgically placed into the bone and allowed to heal and integrate itself onto the bone for up to six months. Depending on the type of implant, a second surgery may be required in order to place the post that will hold the artificial tooth in place. With other implants the post and anchor are already attached and placed at the same time.",
                "After several weeks of healing the artificial teeth are made and fitted to the post portion of the anchor. Because several fittings may be required, this step may take one to two months to complete. After a healing period, the artificial teeth are securely attached to the implant, providing excellent stability and comfort to the patient.",
                "You will receive care instructions when your treatment is completed. Good oral hygiene, eating habits, and regular dental visits will aid in the life of your new implant.",
              ],
            },
            {
              title: "Service area",
              body: [
                "We proudly serve patients throughout the surrounding communities of Oakland, the East Bay, Lake Merritt, Montclair, Rockridge, and Berkeley.",
              ],
            },
          ]}
          faqs={[
            {
              q: "Am I a candidate for dental implants?",
              a: "Most healthy adults with one or more missing teeth are candidates. The two requirements are enough jawbone to support the implant and healthy gum tissue. If you've been missing teeth for a long time and have experienced bone loss, a bone graft may be recommended first. Dr. Martenson or Dr. Cangini will evaluate your jaw with X-rays and a 3D scan during your consultation.",
            },
            {
              q: "How long does the dental implant process take from start to finish?",
              a: "Most cases run 4–6 months. The implant post is placed in a single surgical visit; then we wait 3–6 months for the bone to fuse around it (osseointegration). Once integrated, we attach the abutment and your custom porcelain crown. Cases that need bone grafting first may add 3–4 months. We'll give you a specific timeline at your consultation.",
            },
            {
              q: "Are dental implants painful?",
              a: "The implant placement itself is done under local anesthesia and most patients report less discomfort than a tooth extraction. Mild soreness for 3–5 days after surgery is normal and managed with over-the-counter pain relief. We coordinate placement with Dr. Filippo Cangini, our board-certified periodontist, who specializes in comfortable surgical technique.",
            },
            {
              q: "How long do dental implants last?",
              a: "The implant post itself (titanium, fused to your jawbone) is designed to last a lifetime. The porcelain crown attached to the implant typically lasts 15–25 years with good care, though it can be replaced without disturbing the underlying implant. Studies show 10-year implant success rates above 95%.",
            },
            {
              q: "How much do dental implants cost in Piedmont, CA?",
              a: "A single-tooth implant (post + abutment + crown) starts at $8,474 at our practice. Cases requiring bone grafting, sinus lifts, or multiple implants will be priced individually. We provide a complete written estimate at your consultation and offer financing through CareCredit and Sunbit — no surprise charges.",
            },
            {
              q: "Are dental implants covered by insurance?",
              a: "Coverage varies widely by plan. Most dental insurance covers a portion of the crown but treats the implant post itself as a non-covered prosthetic. Medical insurance occasionally covers implants after accidents or oral cancer. Our front desk team verifies your benefits and files claims directly so you know your out-of-pocket cost upfront.",
            },
            {
              q: "What's the difference between an implant and a bridge?",
              a: "A bridge anchors a replacement tooth to the two healthy teeth on either side, which must be filed down for crowns. An implant stands alone — your adjacent teeth aren't touched, and the implant stimulates the jawbone the way a natural root does. Bridges typically last 10–15 years; implants are designed to last a lifetime. For most single-tooth cases, an implant is the better long-term investment.",
            },
            {
              q: "Will my dental implant look like a real tooth?",
              a: "Yes. The visible part of an implant is a custom porcelain crown shaded and contoured to match your surrounding teeth. Implants integrate fully with the gumline — most patients can't tell their implant from their natural teeth in the mirror, and neither can other people.",
            },
            {
              q: "Can dental implants fail?",
              a: "Implant failure is rare — success rates exceed 95% over 10 years. The main risk factors are smoking (which reduces blood supply to healing tissue), uncontrolled diabetes, and poor oral hygiene that leads to peri-implantitis (inflammation around the implant). With routine cleanings every 6 months and good home care, the vast majority of implants last for life.",
            },
            {
              q: "How do I care for my dental implants?",
              a: "Brush twice daily and floss around the implant exactly as you would a natural tooth. We may recommend a water flosser or interdental brush for the implant area. Continue regular cleanings and exams every 6 months so we can check the implant, surrounding gum tissue, and bone level with X-rays. Avoid using your front implants to bite hard objects like ice or pen caps.",
            },
          ]}
          featuredImage="/img/procedures/restoration/dental-implants/hero.png"
        />
        <AwardsStrip />
        <AboutCTA />
      </main>
      <SiteFooter />
    </>
  );
}
