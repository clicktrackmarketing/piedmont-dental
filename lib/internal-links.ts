/**
 * Internal-linking template — the single source of truth for how pages link
 * to each other (run-plan decision #50; ships BEFORE Month 2's 12 city pages).
 *
 * Every derivation below is computed from the same registries that generate
 * the routes, so a page added to a registry auto-links everywhere it should
 * with no per-page edits:
 *
 *   - Procedure pages:  same-category siblings + grounded cross-category
 *     links (CROSS_LINKS) + that service's city pages (CITY_PAGES).
 *   - City pages (Month 2): parent service page + the same service in the
 *     other cities + the other services in the same city.
 *   - Guides: each post's sidebar links UP to the money pages it supports
 *     (explicit map for today's 13; slug-token derivation for future posts),
 *     and related-posts are picked by topic overlap, not list order.
 *
 * Adding Month 2's pages = append to CITY_PAGES. Nothing else to touch.
 *
 * Guarantees enforced at module load (build fails on violation):
 * every internal href must resolve to a registered route — no link is ever
 * emitted to a page that does not exist.
 */

import {
  PROCEDURE_CATEGORIES,
  type CategorySlug,
} from "@/lib/procedure-categories";
import { posts as POST_META, type Post } from "@/components/BlogIndex";

export type InternalLink = {
  href: string;
  title: string;
};

export type SidebarGroup = {
  /** Small uppercase label above the list (matches .proc-sidebar-label) */
  label: string;
  links: (InternalLink & { isCurrent?: boolean })[];
};

/* ------------------------------------------------------------------ */
/* Registries                                                          */
/* ------------------------------------------------------------------ */

/**
 * Month 2's service × city pages register here — one row per page.
 * The sidebar of the parent service page, the other cities' pages and the
 * city page itself all derive their links from this array.
 * (Empty until the 12 Oakland + Berkeley pages are built.)
 */
export type CityPage = {
  /** URL path of the city page, e.g. "/oakland/dental-implants" */
  href: string;
  /** e.g. "Dental Implants in Oakland" — used as the anchor text */
  title: string;
  /** City display name, e.g. "Oakland" */
  city: string;
  /** The procedure this page localises: category + slug of the parent page */
  service: { category: CategorySlug; slug: string };
};

export const CITY_PAGES: CityPage[] = [
  // Month 2 — append entries here; links appear automatically. Example:
  // {
  //   href: "/oakland/dental-implants",
  //   title: "Dental Implants in Oakland",
  //   city: "Oakland",
  //   service: { category: "restoration", slug: "dental-implants" },
  // },
];

/**
 * Cross-category relationships. Each pair is grounded in the pages' own
 * copy (the linked page discusses the counterpart by name) — do not add a
 * pair without that grounding. Rendered bidirectionally, capped at
 * CROSS_LINK_CAP per page.
 */
const CROSS_PAIRS: [
  { category: CategorySlug; slug: string },
  { category: CategorySlug; slug: string },
][] = [
  // CEREC is the same-day crown; the crowns page sells same-day CEREC crowns.
  [
    { category: "restoration", slug: "crowns-caps" },
    { category: "cosmetic-dentistry", slug: "cerec" },
  ],
  // Bone grafting is the implant-site prerequisite; both pages say so.
  [
    { category: "restoration", slug: "dental-implants" },
    { category: "periodontal-services", slug: "bone-grafting" },
  ],
  // Sinus augmentation exists to enable upper-jaw implants.
  [
    { category: "restoration", slug: "dental-implants" },
    { category: "periodontal-services", slug: "sinus-augmentation" },
  ],
  // Crown lengthening is done to make room for a crown.
  [
    { category: "periodontal-services", slug: "crown-lengthening" },
    { category: "restoration", slug: "crowns-caps" },
  ],
];

const CROSS_LINK_CAP = 3;
const POST_SERVICE_LINK_CAP = 3;

/**
 * Guide → money-page links for the current posts where slug tokens alone
 * would mislink (practice/roundup pieces). Future posts that match nothing
 * here fall through to slug-token derivation.
 */
const EXPLICIT_POST_SERVICES: Record<string, string[]> = {
  "what-is-smile-design-consultation": ["/procedures/cosmetic-dentistry"],
  "how-to-choose-cosmetic-dentist-east-bay": ["/procedures/cosmetic-dentistry"],
  "cosmetic-dentist-piedmont-ca": ["/procedures/cosmetic-dentistry"],
  "family-dentist-piedmont-ca": [
    "/procedures/cleanings-prevention",
    "/procedures/cleanings-prevention/dental-exams-cleanings",
  ],
  "family-dentist-piedmont": [
    "/procedures/cleanings-prevention",
    "/procedures/cleanings-prevention/dental-exams-cleanings",
  ],
  "trusted-dentist-oakland-ca": [
    "/procedures",
    "/procedures/cleanings-prevention/dental-exams-cleanings",
  ],
};

/**
 * Slug-token → procedure-page vocabulary for derivation. Keys are single
 * tokens (or hyphen-joined bigrams) found in post slugs; values are route
 * paths. Specific (bigram) entries win over single tokens.
 */
const TOKEN_VOCABULARY: Record<string, string> = {
  // bigrams first — the matcher checks these before single tokens
  "dental-implants": "/procedures/restoration/dental-implants",
  "teeth-whitening": "/procedures/cosmetic-dentistry/tooth-whitening",
  "gum-disease": "/procedures/periodontal-services/what-is-periodontal-gum-disease",
  // single tokens
  implants: "/procedures/restoration/dental-implants",
  implant: "/procedures/restoration/dental-implants",
  cerec: "/procedures/cosmetic-dentistry/cerec",
  crowns: "/procedures/restoration/crowns-caps",
  crown: "/procedures/restoration/crowns-caps",
  veneers: "/procedures/cosmetic-dentistry/porcelain-veneers",
  bonding: "/procedures/restoration/composite-fillings",
  whitening: "/procedures/cosmetic-dentistry/tooth-whitening",
  invisalign: "/procedures/cosmetic-dentistry/invisalign",
  braces: "/procedures/cosmetic-dentistry/invisalign",
  flossing: "/procedures/cleanings-prevention/how-to-properly-brush-floss",
  waterpik: "/procedures/cleanings-prevention/how-to-properly-brush-floss",
  dentures: "/procedures/restoration/dentures-partial-dentures",
  bridges: "/procedures/restoration/fixed-bridges",
  fillings: "/procedures/restoration/composite-fillings",
  gums: "/procedures/periodontal-services",
  periodontal: "/procedures/periodontal-services",
};

/* ------------------------------------------------------------------ */
/* Route registry + validation                                         */
/* ------------------------------------------------------------------ */

function procedureHref(category: CategorySlug, slug: string): string {
  return `/procedures/${category}/${slug}`;
}

/** Every internal route this module is allowed to emit a link to. */
function buildRouteRegistry(): Map<string, string> {
  const routes = new Map<string, string>(); // href -> title
  routes.set("/procedures", "All Procedures");
  routes.set("/blog", "Blog");
  for (const cat of PROCEDURE_CATEGORIES) {
    routes.set(`/procedures/${cat.slug}`, cat.label);
    for (const item of cat.items) {
      routes.set(procedureHref(cat.slug, item.slug), item.title);
    }
  }
  for (const post of POST_META) {
    routes.set(`/blog/${post.slug}`, post.title);
  }
  for (const page of CITY_PAGES) {
    routes.set(page.href, page.title);
  }
  return routes;
}

const ROUTES = buildRouteRegistry();

function assertRegistered(href: string, source: string): void {
  if (!ROUTES.has(href)) {
    throw new Error(
      `internal-links: ${source} points at "${href}", which is not a registered route. ` +
        `Register the page (procedure-categories / BlogIndex / CITY_PAGES) or fix the path.`,
    );
  }
}

// Fail the build immediately if any hand-written map targets a page that
// does not exist.
for (const [a, b] of CROSS_PAIRS) {
  assertRegistered(procedureHref(a.category, a.slug), "CROSS_PAIRS");
  assertRegistered(procedureHref(b.category, b.slug), "CROSS_PAIRS");
}
for (const [postSlug, hrefs] of Object.entries(EXPLICIT_POST_SERVICES)) {
  for (const href of hrefs) assertRegistered(href, `EXPLICIT_POST_SERVICES["${postSlug}"]`);
}
for (const href of Object.values(TOKEN_VOCABULARY)) {
  assertRegistered(href, "TOKEN_VOCABULARY");
}
for (const page of CITY_PAGES) {
  assertRegistered(
    procedureHref(page.service.category, page.service.slug),
    `CITY_PAGES["${page.href}"].service`,
  );
}

/* ------------------------------------------------------------------ */
/* Procedure-page sidebar                                              */
/* ------------------------------------------------------------------ */

/**
 * The sidebar for a procedure detail page, as ordered groups:
 * 1. same-category siblings (current page marked, not linked)
 * 2. grounded cross-category treatments (absent if none)
 * 3. this service in the cities we serve (absent until Month 2 registers them)
 */
export function getProcedureSidebar(
  category: CategorySlug,
  slug: string,
): SidebarGroup[] {
  const cat = PROCEDURE_CATEGORIES.find((c) => c.slug === category);
  if (!cat) throw new Error(`internal-links: unknown category "${category}"`);

  const groups: SidebarGroup[] = [];

  groups.push({
    label: "In this category",
    links: cat.items.map((item) => ({
      href: procedureHref(category, item.slug),
      title: item.title,
      isCurrent: item.slug === slug,
    })),
  });

  const cross: InternalLink[] = [];
  for (const [a, b] of CROSS_PAIRS) {
    let other: { category: CategorySlug; slug: string } | null = null;
    if (a.category === category && a.slug === slug) other = b;
    else if (b.category === category && b.slug === slug) other = a;
    if (!other) continue;
    const href = procedureHref(other.category, other.slug);
    if (cross.some((l) => l.href === href)) continue;
    cross.push({ href, title: ROUTES.get(href)! });
  }
  if (cross.length > 0) {
    groups.push({ label: "Related treatments", links: cross.slice(0, CROSS_LINK_CAP) });
  }

  const cityLinks = CITY_PAGES.filter(
    (p) => p.service.category === category && p.service.slug === slug,
  ).map((p) => ({ href: p.href, title: p.title }));
  if (cityLinks.length > 0) {
    groups.push({ label: "In your area", links: cityLinks });
  }

  return groups;
}

/* ------------------------------------------------------------------ */
/* City pages (Month 2)                                                */
/* ------------------------------------------------------------------ */

/**
 * Links for a service × city page: the parent service page first, then the
 * same service in the other cities, then the other services in this city.
 * City pages consume this from day one, so building the 12 pages requires
 * no hand-linking.
 */
export function getCityPageLinks(cityPageHref: string): {
  parentService: InternalLink;
  sameServiceOtherCities: InternalLink[];
  sameCityOtherServices: InternalLink[];
} {
  const page = CITY_PAGES.find((p) => p.href === cityPageHref);
  if (!page) {
    throw new Error(`internal-links: "${cityPageHref}" is not in CITY_PAGES`);
  }
  const parentHref = procedureHref(page.service.category, page.service.slug);
  return {
    parentService: { href: parentHref, title: ROUTES.get(parentHref)! },
    sameServiceOtherCities: CITY_PAGES.filter(
      (p) =>
        p.href !== page.href &&
        p.service.category === page.service.category &&
        p.service.slug === page.service.slug,
    ).map((p) => ({ href: p.href, title: p.title })),
    sameCityOtherServices: CITY_PAGES.filter(
      (p) => p.href !== page.href && p.city === page.city,
    ).map((p) => ({ href: p.href, title: p.title })),
  };
}

/* ------------------------------------------------------------------ */
/* Guides (blog)                                                       */
/* ------------------------------------------------------------------ */

function tokensOf(slug: string): string[] {
  return slug.split("-").filter(Boolean);
}

/**
 * The money pages a guide supports — rendered in the post sidebar's
 * "Looking for a service?" card. Explicit map first; otherwise derived
 * from the slug's tokens (bigrams before single tokens), capped.
 */
export function getServiceLinksForPost(postSlug: string): InternalLink[] {
  const explicit = EXPLICIT_POST_SERVICES[postSlug];
  if (explicit) {
    return explicit.map((href) => ({ href, title: ROUTES.get(href)! }));
  }

  const tokens = tokensOf(postSlug);
  const hrefs: string[] = [];
  for (let i = 0; i < tokens.length - 1; i++) {
    const bigram = `${tokens[i]}-${tokens[i + 1]}`;
    const href = TOKEN_VOCABULARY[bigram];
    if (href && !hrefs.includes(href)) hrefs.push(href);
  }
  for (const token of tokens) {
    const href = TOKEN_VOCABULARY[token];
    if (href && !hrefs.includes(href)) hrefs.push(href);
  }
  return hrefs
    .slice(0, POST_SERVICE_LINK_CAP)
    .map((href) => ({ href, title: ROUTES.get(href)! }));
}

/**
 * Related posts by topic: shared slug tokens and shared category score a
 * post up; ties broken by recency; the list is filled to `limit` with the
 * most recent remaining posts so the grid never collapses.
 */
export function getRelatedPostMeta(
  postSlug: string,
  limit = 3,
  pool: Post[] = POST_META,
): Post[] {
  const current = pool.find((p) => p.slug === postSlug);
  const currentTokens = new Set(tokensOf(postSlug));
  // "ca"/"vs" and geography carry no topical signal between posts
  const STOP = new Set(["ca", "vs", "a", "the", "to", "how", "what", "is", "in", "piedmont", "oakland", "east", "bay", "2026"]);

  const scored = pool.filter((p) => p.slug !== postSlug).map((p) => {
    let score = 0;
    for (const t of tokensOf(p.slug)) {
      if (!STOP.has(t) && currentTokens.has(t)) score += 2;
    }
    if (current && p.category === current.category) score += 1;
    return { post: p, score };
  });

  scored.sort(
    (a, b) =>
      b.score - a.score ||
      Date.parse(b.post.dateISO) - Date.parse(a.post.dateISO),
  );

  return scored.slice(0, limit).map((s) => s.post);
}
