import type { MetadataRoute } from "next";
import { posts } from "@/components/BlogIndex";
import { getRemotePosts } from "@/lib/blog-remote";

const SITE = "https://piedmontdentalbydesign.com";

/* `lastModified` used to be `new Date()` — the build timestamp — shared by every
   static entry below. That told Google all 68 pages changed on every deploy,
   which is how a site teaches Google to ignore its own lastmod values. Google's
   guidance is explicit: omit the date rather than publish one you cannot stand
   behind.

   So: a page gets a date only when we know the date its CONTENT changed. Those
   live in EDITED below. Everything else omits lastmod entirely — `undefined`,
   which Next drops from the XML. Blog posts keep their real publish dates.

   When you edit a page, add or update its entry here in the same commit. */
const EDITED: Record<string, string> = {
  // 2026-08-13 — Month 1 remediation.
  "/": "2026-08-13", // credentials strip, title + description
  "/about": "2026-08-13", // credentials strip, description
  "/about/dr-ma": "2026-08-13", // practice city named, description
  "/contact": "2026-08-13", // credentials strip, description
  "/faqs": "2026-08-13", // description
  "/blog": "2026-08-13", // description
  "/procedures/cosmetic-dentistry": "2026-08-13", // description
  "/procedures/restoration/crowns-caps": "2026-08-13", // same-day CEREC lead, FAQ
  "/resources/financing": "2026-08-13", // out-of-network disclosure, title
  "/resources/dental-implants": "2026-08-13", // description
  "/resources/full-mouth-restoration": "2026-08-13", // description
  "/resources/invisalign-results": "2026-10-12", // bonding case moved out to /resources/cosmetic-bonding
  "/resources/patient-forms": "2026-08-13", // title
  "/resources/restorations/crowns-caps": "2026-08-13", // description
  "/resources/smile-analysis": "2026-08-13", // description
  "/resources/surgery": "2026-08-13", // description
  "/about/tour": "2026-08-13", // title
  "/smile-gallery/dental-implants": "2026-08-13", // description
  "/smile-gallery/porcelain-crowns-caps": "2026-08-13", // crown timing label
  "/procedures/restoration": "2026-08-13", // hub rebuilt: choosing guide, prices, FAQ
  "/procedures/cleanings-prevention": "2026-08-13", // hub rebuilt: visit table, cost-of-delay, FAQ
  // 2026-10-12 — Dr. Ma's image + case-placement fixes.
  "/resources/cosmetic-bonding": "2026-10-12", // gap-closure case 03 (moved from Invisalign)
  "/smile-gallery": "2026-10-12", // Invisalign tile no longer shows the bonding case
  // 2026-10-21 — Oakland patients page (GeoReputation October report).
  "/oakland": "2026-10-21", // new page
};

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const localSlugs = new Set(posts.map((p) => p.slug));
  const remotePosts = (await getRemotePosts()).filter(
    (p) => !localSlugs.has(p.slug),
  );
  const editedOn = (path: string) =>
    EDITED[path] ? new Date(EDITED[path]) : undefined;
  const blogPosts: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE}/blog/${p.slug}`,
    lastModified: new Date(p.dateISO),
    changeFrequency: "yearly",
    priority: 0.6,
  }));
  // BabyLoveGrowth articles: lastmod is the real last-edit time from the API.
  blogPosts.push(
    ...remotePosts.map((p) => ({
      url: `${SITE}/blog/${p.slug}`,
      lastModified: new Date(p.updatedISO),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );

  return [
    { url: `${SITE}/`, lastModified: editedOn("/"), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/about`, lastModified: editedOn("/about"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/about/dr-martenson`, lastModified: editedOn("/about/dr-martenson"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/about/dr-cangini`, lastModified: editedOn("/about/dr-cangini"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/about/dr-ma`, lastModified: editedOn("/about/dr-ma"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/about/team`, lastModified: editedOn("/about/team"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/about/tour`, lastModified: editedOn("/about/tour"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/oakland`, lastModified: editedOn("/oakland"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/procedures`, lastModified: editedOn("/procedures"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/procedures/restoration`, lastModified: editedOn("/procedures/restoration"), changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/procedures/restoration/dental-implants`, lastModified: editedOn("/procedures/restoration/dental-implants"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/procedures/restoration/composite-fillings`, lastModified: editedOn("/procedures/restoration/composite-fillings"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/procedures/restoration/crowns-caps`, lastModified: editedOn("/procedures/restoration/crowns-caps"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/procedures/restoration/dentures-partial-dentures`, lastModified: editedOn("/procedures/restoration/dentures-partial-dentures"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/procedures/restoration/fixed-bridges`, lastModified: editedOn("/procedures/restoration/fixed-bridges"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/procedures/cosmetic-dentistry`, lastModified: editedOn("/procedures/cosmetic-dentistry"), changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/procedures/cosmetic-dentistry/porcelain-veneers`, lastModified: editedOn("/procedures/cosmetic-dentistry/porcelain-veneers"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/procedures/cosmetic-dentistry/tooth-whitening`, lastModified: editedOn("/procedures/cosmetic-dentistry/tooth-whitening"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/procedures/cosmetic-dentistry/cerec`, lastModified: editedOn("/procedures/cosmetic-dentistry/cerec"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/procedures/cosmetic-dentistry/invisalign`, lastModified: editedOn("/procedures/cosmetic-dentistry/invisalign"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/procedures/cosmetic-dentistry/surgery`, lastModified: editedOn("/procedures/cosmetic-dentistry/surgery"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/procedures/periodontal-services`, lastModified: editedOn("/procedures/periodontal-services"), changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/procedures/periodontal-services/what-is-periodontal-gum-disease`, lastModified: editedOn("/procedures/periodontal-services/what-is-periodontal-gum-disease"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/procedures/periodontal-services/treatment`, lastModified: editedOn("/procedures/periodontal-services/treatment"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/procedures/periodontal-services/maintenance`, lastModified: editedOn("/procedures/periodontal-services/maintenance"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/procedures/periodontal-services/gum-grafting`, lastModified: editedOn("/procedures/periodontal-services/gum-grafting"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/procedures/periodontal-services/bone-grafting`, lastModified: editedOn("/procedures/periodontal-services/bone-grafting"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/procedures/periodontal-services/crown-lengthening`, lastModified: editedOn("/procedures/periodontal-services/crown-lengthening"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/procedures/periodontal-services/periodontal-scaling-root-planing`, lastModified: editedOn("/procedures/periodontal-services/periodontal-scaling-root-planing"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/procedures/periodontal-services/sinus-augmentation`, lastModified: editedOn("/procedures/periodontal-services/sinus-augmentation"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/procedures/cleanings-prevention`, lastModified: editedOn("/procedures/cleanings-prevention"), changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/procedures/cleanings-prevention/dental-exams-cleanings`, lastModified: editedOn("/procedures/cleanings-prevention/dental-exams-cleanings"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/procedures/cleanings-prevention/dental-x-rays`, lastModified: editedOn("/procedures/cleanings-prevention/dental-x-rays"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/procedures/cleanings-prevention/panoramic-x-rays`, lastModified: editedOn("/procedures/cleanings-prevention/panoramic-x-rays"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/procedures/cleanings-prevention/fluoride-treatment`, lastModified: editedOn("/procedures/cleanings-prevention/fluoride-treatment"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/procedures/cleanings-prevention/home-care`, lastModified: editedOn("/procedures/cleanings-prevention/home-care"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/procedures/cleanings-prevention/how-to-properly-brush-floss`, lastModified: editedOn("/procedures/cleanings-prevention/how-to-properly-brush-floss"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/resources`, lastModified: editedOn("/resources"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/resources/financing`, lastModified: editedOn("/resources/financing"), changeFrequency: "monthly", priority: 0.65 },
    { url: `${SITE}/resources/insurance`, lastModified: editedOn("/resources/insurance"), changeFrequency: "monthly", priority: 0.65 },
    { url: `${SITE}/resources/patient-forms`, lastModified: editedOn("/resources/patient-forms"), changeFrequency: "monthly", priority: 0.65 },
    { url: `${SITE}/resources/dental-videos`, lastModified: editedOn("/resources/dental-videos"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/resources/links`, lastModified: editedOn("/resources/links"), changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE}/resources/invisalign`, lastModified: editedOn("/resources/invisalign"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/resources/surgery`, lastModified: editedOn("/resources/surgery"), changeFrequency: "monthly", priority: 0.65 },
    { url: `${SITE}/resources/smile-analysis`, lastModified: editedOn("/resources/smile-analysis"), changeFrequency: "monthly", priority: 0.65 },
    { url: `${SITE}/resources/gummy-smile`, lastModified: editedOn("/resources/gummy-smile"), changeFrequency: "monthly", priority: 0.65 },
    { url: `${SITE}/resources/cosmetic-dentistry`, lastModified: editedOn("/resources/cosmetic-dentistry"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/resources/dental-implants`, lastModified: editedOn("/resources/dental-implants"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/resources/porcelain-veneers`, lastModified: editedOn("/resources/porcelain-veneers"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/resources/invisalign-results`, lastModified: editedOn("/resources/invisalign-results"), changeFrequency: "monthly", priority: 0.55 },
    { url: `${SITE}/resources/cosmetic-bonding`, lastModified: editedOn("/resources/cosmetic-bonding"), changeFrequency: "monthly", priority: 0.55 },
    { url: `${SITE}/resources/full-mouth-restoration`, lastModified: editedOn("/resources/full-mouth-restoration"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/resources/restorations`, lastModified: editedOn("/resources/restorations"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/resources/restorations/crowns-caps`, lastModified: editedOn("/resources/restorations/crowns-caps"), changeFrequency: "monthly", priority: 0.55 },
    { url: `${SITE}/resources/restorations/dentures`, lastModified: editedOn("/resources/restorations/dentures"), changeFrequency: "monthly", priority: 0.55 },
    { url: `${SITE}/smile-gallery`, lastModified: editedOn("/smile-gallery"), changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE}/smile-gallery/other-procedures`, lastModified: editedOn("/smile-gallery/other-procedures"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/smile-gallery/composite-fillings`, lastModified: editedOn("/smile-gallery/composite-fillings"), changeFrequency: "monthly", priority: 0.55 },
    { url: `${SITE}/smile-gallery/dental-implants`, lastModified: editedOn("/smile-gallery/dental-implants"), changeFrequency: "monthly", priority: 0.55 },
    { url: `${SITE}/smile-gallery/porcelain-crowns-caps`, lastModified: editedOn("/smile-gallery/porcelain-crowns-caps"), changeFrequency: "monthly", priority: 0.55 },
    { url: `${SITE}/smile-gallery/composite-fillings-recent`, lastModified: editedOn("/smile-gallery/composite-fillings-recent"), changeFrequency: "monthly", priority: 0.55 },
    { url: `${SITE}/faqs`, lastModified: editedOn("/faqs"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/blog`, lastModified: editedOn("/blog"), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE}/patient-reviews`, lastModified: editedOn("/patient-reviews"), changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE}/patient-reviews/testimonial`, lastModified: editedOn("/patient-reviews/testimonial"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/contact`, lastModified: editedOn("/contact"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/terms-and-conditions`, lastModified: editedOn("/terms-and-conditions"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/privacy-policy-2`, lastModified: editedOn("/privacy-policy-2"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/notice-of-privacy-practices`, lastModified: editedOn("/notice-of-privacy-practices"), changeFrequency: "yearly", priority: 0.3 },
    ...blogPosts,
  ];
}
