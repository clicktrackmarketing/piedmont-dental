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
    "Invisalign® Clear Aligners in Piedmont, CA",
  description:
    "Invisalign® aligners — a discreet alternative to traditional braces for adults. Mess-free iTero scans, custom clear trays, 22 hours of daily wear.",
  alternates: { canonical: "/procedures/cosmetic-dentistry/invisalign" },
  openGraph: {
    title: "Invisalign® — Piedmont Dental By Design",
    description:
      "Discreet teeth straightening with clear plastic aligners. iTero digital scanning, custom-made trays, comfortable removal for eating.",
    url: "https://piedmontdentalbydesign.com/procedures/cosmetic-dentistry/invisalign",
    type: "article",
    images: ["/img/procedures/cosmetic-dentistry/invisalign/hero.jpg"],
  },
};

const category = getCategory("cosmetic-dentistry");

export default function InvisalignPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProcedureDetail
          category={{ slug: category.slug, label: category.label }}
          slug="invisalign"
          title="Invisalign® Clear Aligners"
          tagline="Discreet teeth straightening — clear plastic, removable, planned in 3D."
          intro={[
            "Your smile is too important to not look, feel, and function at its best. If you are looking to correct crooked teeth or a misaligned bite without noticeable metal braces, we may have the solution for you. Dr. Jill Martenson and Dr. David Ma offer Invisalign® — a popular alternative to traditional orthodontics that focuses on preserving your personal aesthetics.",
            "We blend reliable techniques with advanced technology and safe materials to provide you with a one-of-a-kind smile. Our Invisalign® dentist and team take the time to craft a personalized treatment plan based on your needs.",
          ]}
          stats={[
            { value: "6–18 mo", label: "Typical treatment" },
            { value: "22 hrs", label: "Daily wear required" },
            { value: "Adults 18+", label: "Recommended for" },
            { value: "iTero", label: "Digital scan, no goop" },
          ]}
          sections={[
            {
              title: "How does Invisalign® work?",
              body: [
                "Conventional braces use metal brackets, wires, and tension to guide your teeth into healthier positions. Invisalign® can do the same without requiring metal components of any kind. It works by using a series of clear, smooth plastic aligners. Each is designed to fit over your teeth comfortably.",
                "Instead of using tension, your trays target specific teeth in need of straightening and apply gentle pressure to guide your smile into ideal alignment. We begin treatment with a thorough consultation and exam. We use digital and panoramic X-rays to gain detailed images of your teeth, gums, and jaws. These pictures provide us with the information we need to determine if Invisalign® is your best option.",
                "If you qualify, we will take mess-free impressions of your smile with our iTero scanner. With this technology, we can create a digital blueprint which we send to a lab. There, they create a series of aligners made just for you. You wear each set of trays for 22 hours a day before graduating to the next every two weeks.",
              ],
            },
            {
              title: "Who qualifies for Invisalign® treatment?",
              body: [
                "Our team can ensure greater success for those willing to comply with treatment guidelines. Since the aligners are removable, it can be challenging for some individuals to wear them for 22 hours daily. We typically recommend Invisalign® for those who are serious about wanting to improve their smile. The treatment is often ideal for correcting mild to moderate concerns that can impact dental function, aesthetics, and long-term health.",
              ],
              bullets: [
                "Crooked teeth.",
                "Crowded teeth.",
                "Noticeable dental gaps.",
                "Underbites.",
                "Crossbites.",
                "Overbites.",
                "Open bites.",
              ],
            },
            {
              title: "Invisalign® benefits you can expect",
              body: [
                "There is no question that straighter teeth make for a stunning smile. They also usually enable greater long-term oral health. Teeth in their ideal positions are easier to clean, making the removal of harmful dental plaque, tartar, and bacteria easier. Being able to clean your smile more effectively helps reduce your chances of gum disease and tooth decay.",
                "When teeth meet correctly, they are at less risk of abnormal wear and other concerns like TMJ disorders. An aligned bite can prevent the need for more complex treatment in the future.",
                "When you choose to straighten your smile with Invisalign®, you may continue to enjoy your favorite foods and beverages. You need only remove your aligners before eating and drinking. The treatment also allows you to go about your daily life without interruptions and compromises.",
              ],
            },
            {
              title: "Does getting Invisalign® hurt?",
              body: [
                "Preparing for treatment does not require any intrusive preparation. The only discomfort you should experience is when wearing your new set of aligners. Some slight pressure and soreness are expected and should subside quickly as your teeth adjust. Because your trays are made from smooth plastic, irritation or injury is unlikely.",
              ],
            },
            {
              title: "How long does Invisalign® take?",
              body: [
                "Your length of treatment depends on the severity of your situation. If your needs are more moderate, it may take longer to align your smile. Typically, Invisalign® can take anywhere from six to eighteen months to complete.",
              ],
            },
            {
              title: "How do I care for my Invisalign® trays?",
              body: [
                "Cleaning and caring for your aligners is simple and straightforward. Be sure to remove them before eating and clean them using a soft-bristled toothbrush and clear soap or an approved cleaning rinse (not toothpaste, which can scratch them). Make sure to rinse your trays after removal and before putting them back in your smile. You may do this with room-temperature water.",
              ],
            },
          ]}
          faqs={[
            {
              q: "How much does Invisalign® cost in Piedmont, CA?",
              a: "Most cases at our practice range from $4,500–$7,500 depending on complexity (how many trays, total treatment length, and whether refinements are needed). We provide a complete written quote after your consultation and iTero scan. CareCredit and Sunbit financing are available.",
            },
            {
              q: "Can I eat with my Invisalign® aligners in?",
              a: "No — you remove the aligners for every meal, snack, and any drink other than water. This is actually one of Invisalign®'s biggest advantages over traditional braces: no food restrictions, no broken brackets from popcorn or bagels. You just brush before putting them back in.",
            },
            {
              q: "How long does Invisalign® treatment take?",
              a: "Most adult cases run 6–18 months depending on the severity of misalignment. Simple cases (minor crowding, small gaps) can finish in 6–9 months. Moderate cases (crossbites, deeper crowding) typically run 12–18 months. Dr. Martenson will give you a specific timeline after the iTero scan.",
            },
            {
              q: "Will Invisalign® work for severe cases?",
              a: "Invisalign® handles mild to moderate orthodontic concerns extremely well — crooked teeth, crowding, gaps, mild overbites/underbites/crossbites. For severely rotated teeth, large skeletal jaw discrepancies, or cases that require surgical correction, traditional braces or referral to an orthodontist may be more appropriate. We'll be honest about whether Invisalign® is the right tool for your case.",
            },
            {
              q: "Are there age restrictions for Invisalign®?",
              a: "Invisalign® is recommended for adults 18+ in our practice — the 22-hour daily wear requirement is the make-or-break factor, and adults are typically more reliable about compliance. Teen versions exist but require strong family support. The aligners work mechanically the same at any age.",
            },
            {
              q: "Does Invisalign® hurt?",
              a: "Mild pressure and soreness when you switch to a new aligner — usually fades within 24–48 hours. Because the trays are smooth plastic, you don't get the cheek and lip irritation that traditional metal braces cause. Most patients describe the discomfort as much milder than they expected.",
            },
            {
              q: "How do I clean my Invisalign® aligners?",
              a: "Rinse them with room-temperature water every time you take them out. Brush them gently with a soft-bristled toothbrush and clear soap (not toothpaste — it can scratch). Don't use hot water or run them through the dishwasher — heat warps the plastic. Invisalign® sells official cleaning crystals as an optional weekly soak.",
            },
            {
              q: "What happens if I lose an aligner?",
              a: "Tell us right away — usually we can either advance you to the next aligner (if you've worn the current one long enough) or order a replacement from Invisalign®. Don't go without an aligner for more than 24 hours; your teeth will start to shift back and you may need to backtrack a tray.",
            },
            {
              q: "Will I need a retainer after Invisalign®?",
              a: "Yes — for life, just like with traditional braces. Teeth naturally try to drift back toward their original positions after any orthodontic treatment. We make clear Vivera retainers at the end of your case; most patients wear them nightly indefinitely. Skipping the retainer is the #1 reason teeth relapse.",
            },
          ]}
          featuredImage="/img/procedures/cosmetic-dentistry/invisalign/hero.jpg"
        />
        <AwardsStrip />
        <AboutCTA />
      </main>
      <SiteFooter />
    </>
  );
}
