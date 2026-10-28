/**
 * Server-only utilities for loading blog posts from `content/blog/*.md`.
 * The markdown bodies are paired with the structured metadata in
 * `components/BlogIndex.tsx` (title/date/category/image/excerpt) — this
 * file just provides the article body.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { posts as POST_META, type Post } from "@/components/BlogIndex";
import { getRelatedPostMeta } from "@/lib/internal-links";
import {
  getRemotePostBySlug,
  getRemotePosts,
} from "@/lib/blog-remote";
import { isPublished } from "@/lib/publish";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPost = Post & {
  /** The article markdown body (without YAML frontmatter). */
  body: string;
};

/** Hand-written posts whose release date has arrived (see lib/publish). */
function releasedMeta(): Post[] {
  return POST_META.filter((p) => isPublished(p.dateISO));
}

export function getPostSlugs(): string[] {
  return releasedMeta().map((p) => p.slug);
}

/**
 * Look up a post by slug. Throws if the slug isn't in the index, or if
 * the markdown file is missing.
 */
export function getPostBySlug(slug: string): BlogPost {
  const meta = POST_META.find((p) => p.slug === slug);
  if (!meta) {
    throw new Error(`Unknown blog slug: ${slug}`);
  }
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);
  return { ...meta, body: content };
}

export function getAllPosts(): BlogPost[] {
  return releasedMeta().map((p) => getPostBySlug(p.slug));
}

export function getRelatedPosts(
  slug: string,
  limit = 3,
  pool?: Post[],
): Post[] {
  // Topic-scored via the internal-linking template (decision #50) — was a
  // positional slice that gave most posts the same three "related" articles.
  return getRelatedPostMeta(slug, limit, pool);
}

/**
 * Every post for the index, sitemap and related-post pools: the hand-written
 * archive plus whatever BabyLoveGrowth has published, newest first. A local
 * slug always wins over a BLG article with the same slug.
 */
export async function getAllPostMeta(): Promise<Post[]> {
  const remote = await getRemotePosts();
  const local = new Set(POST_META.map((p) => p.slug));
  const merged: Post[] = [
    ...releasedMeta(),
    ...remote.filter((p) => !local.has(p.slug)),
  ];
  return merged.sort(
    (a, b) => Date.parse(b.dateISO) - Date.parse(a.dateISO),
  );
}

/** Local post first, then BLG. Returns null when neither has the slug. */
export async function findPostBySlug(slug: string): Promise<BlogPost | null> {
  const local = POST_META.find((p) => p.slug === slug);
  if (local) return isPublished(local.dateISO) ? getPostBySlug(slug) : null;
  const remote = await getRemotePostBySlug(slug);
  return remote ? { ...remote } : null;
}
