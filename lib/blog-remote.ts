/**
 * Server-only loader for articles published through BabyLoveGrowth (BLG).
 *
 * The 13 hand-written posts in `components/BlogIndex.tsx` + `content/blog/*.md`
 * stay the source of truth for the existing archive; BLG articles are fetched
 * at build/ISR time and merged into the same /blog page, post route and
 * sitemap. If the API key is missing or the API is down this returns [] so the
 * blog still builds with the existing posts.
 */

import { BlogClient, type BlogArticleSummary } from "babylovegrowth-next-js-blog";
import type { Post } from "@/components/BlogIndex";

/** BLG data is cached for a day in production, ~10s in dev. */
export const BLOG_REVALIDATE_SECONDS =
  process.env.NODE_ENV === "development" ? 10 : 86400;

const FALLBACK_IMAGE = "/blog/general-dentist.jpg";
const DEFAULT_CATEGORY = "Dental Health";

const client = process.env.BABYLOVEGROWTH_BLOG_API_KEY
  ? new BlogClient({
      apiKey: process.env.BABYLOVEGROWTH_BLOG_API_KEY,
      baseUrl: process.env.BABYLOVEGROWTH_BLOG_API_URL,
      revalidate: BLOG_REVALIDATE_SECONDS,
    })
  : null;

export type RemotePost = Post & {
  /** ISO timestamp of the last BLG edit (for sitemap lastmod). */
  updatedISO: string;
  source: "blg";
};

export type RemoteBlogPost = RemotePost & {
  body: string;
  /** BLG-provided Article/FAQ JSON-LD, if any. */
  faqJsonLd: Record<string, unknown> | null;
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function toPost(a: BlogArticleSummary): RemotePost {
  const published = a.published_at || a.created_at;
  return {
    slug: a.slug,
    title: a.title,
    date: formatDate(published),
    dateISO: published.slice(0, 10),
    category: a.keywords?.[0] ?? a.seedKeyword ?? DEFAULT_CATEGORY,
    image: a.hero_image_url || FALLBACK_IMAGE,
    alt: a.title,
    excerpt: a.excerpt || a.meta_description || "",
    updatedISO: a.updated_at || published,
    source: "blg",
  };
}

export async function getRemotePosts(): Promise<RemotePost[]> {
  if (!client) return [];
  try {
    const articles = await client.getAllArticles({ publishedOnly: true });
    return articles.map(toPost);
  } catch (err) {
    console.error("[blog] BabyLoveGrowth fetch failed:", err);
    return [];
  }
}

export async function getRemotePostBySlug(
  slug: string,
): Promise<RemoteBlogPost | null> {
  if (!client) return null;
  try {
    const a = await client.getArticleBySlug(slug);
    if (!a || !a.published) return null;
    return { ...toPost(a), body: a.content_markdown, faqJsonLd: a.faqJsonLd };
  } catch (err) {
    console.error(`[blog] BabyLoveGrowth article "${slug}" failed:`, err);
    return null;
  }
}
