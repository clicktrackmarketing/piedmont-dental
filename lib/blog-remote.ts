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
import fs from "node:fs";
import path from "node:path";
import type { Post } from "@/components/BlogIndex";

/** BLG data is cached for a day in production, ~10s in dev. */
export const BLOG_REVALIDATE_SECONDS =
  process.env.NODE_ENV === "development" ? 10 : 86400;

/**
 * Generated-but-unpublished BLG articles are shown only on Vercel preview
 * deployments (or when BABYLOVEGROWTH_INCLUDE_DRAFTS=true locally) so they can
 * be reviewed before anyone publishes them in BLG. Production never sees them.
 */
const INCLUDE_DRAFTS =
  process.env.VERCEL_ENV === "preview" ||
  process.env.BABYLOVEGROWTH_INCLUDE_DRAFTS === "true";

const FALLBACK_IMAGE = "/blog/general-dentist.jpg";
const DEFAULT_CATEGORY = "Dental Health";

/* BLG rate-limits each API key (2 req/s, 30 req/min). A build renders every
   article page, often from several workers at once, so space requests out in
   this process and back off + retry on 429 instead of silently dropping the
   article. */
const MIN_GAP_MS = 700;
const MAX_RETRIES = 3;
let lastRequestAt = 0;
let queue: Promise<unknown> = Promise.resolve();
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const throttledFetch: typeof fetch = (input, init) => {
  const run = async () => {
    for (let attempt = 0; ; attempt++) {
      const wait = lastRequestAt + MIN_GAP_MS - Date.now();
      if (wait > 0) await sleep(wait);
      lastRequestAt = Date.now();
      const res = await fetch(input, init);
      if (res.status !== 429 || attempt >= MAX_RETRIES) return res;
      await sleep(3000 * (attempt + 1));
    }
  };
  const result = queue.then(run, run);
  queue = result.catch(() => undefined);
  return result;
};

const client = process.env.BABYLOVEGROWTH_BLOG_API_KEY
  ? new BlogClient({
      apiKey: process.env.BABYLOVEGROWTH_BLOG_API_KEY,
      baseUrl: process.env.BABYLOVEGROWTH_BLOG_API_URL,
      revalidate: BLOG_REVALIDATE_SECONDS,
      fetch: throttledFetch,
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

type DraftArticle = BlogArticleSummary & {
  content_markdown: string;
  faqJsonLd: Record<string, unknown> | null;
};

/** Generated-only articles snapshotted by scripts/blg-sync-drafts.mjs. */
function loadDrafts(): DraftArticle[] {
  if (!INCLUDE_DRAFTS) return [];
  try {
    const file = path.join(process.cwd(), "content", "blg", "drafts.json");
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch {
    return [];
  }
}

let listPromise: Promise<RemotePost[]> | null = null;

/** One list request per process, however many pages ask for it. */
export function getRemotePosts(): Promise<RemotePost[]> {
  listPromise ??= (async () => {
    const drafts = loadDrafts().map(toPost);
    if (!client) return drafts;
    try {
      const articles = await client.getAllArticles({ publishedOnly: true });
      const live = articles.map(toPost);
      const liveSlugs = new Set(live.map((p) => p.slug));
      return [...live, ...drafts.filter((d) => !liveSlugs.has(d.slug))];
    } catch (err) {
      console.error("[blog] BabyLoveGrowth fetch failed:", err);
      return drafts;
    }
  })();
  return listPromise;
}

export async function getRemotePostBySlug(
  slug: string,
): Promise<RemoteBlogPost | null> {
  const draft = loadDrafts().find((d) => d.slug === slug);
  if (draft) return { ...toPost(draft), body: draft.content_markdown, faqJsonLd: draft.faqJsonLd };
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
