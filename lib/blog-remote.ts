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

/*
 * Fee corrections for BabyLoveGrowth articles (2026-11-16).
 *
 * These BLG posts state outdated numbers as "our published fee". The real
 * fees are the ones on the procedure pages (see docs/blog-prices-2026-11-16.md):
 * implant from $8,474, three-unit bridge $5,847–$6,651, back-tooth crown
 * $1,949–$2,351. Until the articles are edited in the BLG dashboard, the exact
 * wrong ranges are rewritten here, only for these slugs, so cited national
 * estimates elsewhere in the same posts are left untouched. Once the dashboard
 * copy is fixed these patterns stop matching and this becomes a no-op.
 */
// Replacers are functions, not strings: in a replacement string "$1,949"
// would be read as capture group 1 followed by ",949".
const FEE_FIXES: { pattern: RegExp; replace: (m: string, sep?: string) => string }[] = [
  // Single implant: "$4,000 to $6,000" / "$4,000–$6,000"
  { pattern: /\$4,000\s*(?:to|–|-|—)\s*\$6,000/g, replace: () => "from $8,474" },
  // Three-unit bridge: "$3,000 to $4,500" / "$3,000–$4,500"
  { pattern: /\$3,000(\s*(?:to|–|-|—)\s*)\$4,500/g, replace: (_m, sep = " to ") => `$5,847${sep}$6,651` },
  // Crown (back tooth): "$1,200–$1,800"
  { pattern: /\$1,200(\s*(?:to|–|-|—)\s*)\$1,800/g, replace: (_m, sep = "–") => `$1,949${sep}$2,351` },
];
const FEE_FIX_SLUGS = new Set(["maryland-bridge", "implant-supported-dentures"]);

function fixFees(slug: string, text: string): string {
  if (!FEE_FIX_SLUGS.has(slug) || !text) return text;
  return FEE_FIXES.reduce((t, f) => t.replace(f.pattern, f.replace), text);
}

function fixFeesJson(
  slug: string,
  json: Record<string, unknown> | null,
): Record<string, unknown> | null {
  if (!json || !FEE_FIX_SLUGS.has(slug)) return json;
  return JSON.parse(fixFees(slug, JSON.stringify(json)));
}

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
    excerpt: fixFees(a.slug, a.excerpt || a.meta_description || ""),
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
    return {
      ...toPost(a),
      body: fixFees(a.slug, a.content_markdown),
      faqJsonLd: fixFeesJson(a.slug, a.faqJsonLd),
    };
  } catch (err) {
    console.error(`[blog] BabyLoveGrowth article "${slug}" failed:`, err);
    return null;
  }
}
