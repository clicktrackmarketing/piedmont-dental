import { posts as POST_META } from "@/components/BlogIndex";

/**
 * Scheduled release for hand-written posts. A post's `dateISO` doubles as its
 * publish date: before that UTC calendar day it is left out of the blog index,
 * the sitemap and related-post grids, and its route 404s. The blog routes and
 * the sitemap revalidate hourly, so each post appears within an hour of
 * midnight UTC on its day with no redeploy.
 *
 * PUBLISH_DATE_OVERRIDE (YYYY-MM-DD) pins "today" for testing a schedule;
 * never set it on production.
 */
export function today(): string {
  return process.env.PUBLISH_DATE_OVERRIDE ?? new Date().toISOString().slice(0, 10);
}

export function isPublished(dateISO: string): boolean {
  return dateISO.slice(0, 10) <= today();
}

const LOCAL = new Map(POST_META.map((p) => [`/blog/${p.slug}`, p.dateISO]));

/** True for a link to one of our own posts that hasn't been released yet. */
export function isUnreleasedPostHref(href: string | undefined): boolean {
  if (!href) return false;
  const path = href
    .replace(/^https:\/\/piedmontdentalbydesign\.com/, "")
    .split(/[?#]/)[0]
    .replace(/\/$/, "");
  const iso = LOCAL.get(path);
  return iso !== undefined && !isPublished(iso);
}
