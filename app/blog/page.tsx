import type { Metadata } from "next";
import type { Post } from "@/components/BlogIndex";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import BlogHero from "@/components/BlogHero";
import BlogIndex from "@/components/BlogIndex";
import { getAllPostMeta } from "@/lib/blog";
import AboutCTA from "@/components/AboutCTA";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Blog — Dental Notes & Local Insights",
  description:
    "Posts on cosmetic dentistry, dental implants, family care and daily oral health from Dr. Martenson, Dr. Ma and the Piedmont Dental By Design team.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Piedmont Dental By Design",
    description:
      "Cosmetic dentistry, dental implants, family care, and daily oral health insights from a Best of the East Bay practice.",
    url: "https://piedmontdentalbydesign.com/blog",
    type: "website",
  },
};

function BlogStructuredData({ posts }: { posts: Post[] }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://piedmontdentalbydesign.com/blog#blog",
    name: "Piedmont Dental By Design — Blog",
    url: "https://piedmontdentalbydesign.com/blog",
    publisher: { "@id": "https://piedmontdentalbydesign.com/#org" },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `https://piedmontdentalbydesign.com/blog/${p.slug}`,
      datePublished: p.dateISO,
      image: p.image.startsWith("http")
        ? p.image
        : `https://piedmontdentalbydesign.com${p.image}`,
      author: { "@id": "https://piedmontdentalbydesign.com/#dr-martenson" },
      publisher: { "@id": "https://piedmontdentalbydesign.com/#org" },
      articleSection: p.category,
      description: p.excerpt,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

/** BabyLoveGrowth articles are re-fetched at most once a day. */
// Hourly, so scheduled posts (lib/publish) appear on their release day.
export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getAllPostMeta();
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <BlogHero />
        <BlogIndex posts={posts} />
        <AboutCTA />
      </main>
      <SiteFooter />
      <BlogStructuredData posts={posts} />
    </>
  );
}
