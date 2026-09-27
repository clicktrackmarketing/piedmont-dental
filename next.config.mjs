import migrationRedirects from "./redirects.mjs";

/** @type {import('next').NextConfig} */

/* Third-party origins, grouped by vendor. Everything below is injected at
   runtime by the GTM container (GTM-PLVLXN8R) rather than by app code, so a tag
   added in the GTM UI needs its origins added here or the browser silently
   blocks it. Keep the groups named — the next marketing tag should be a
   one-line addition, not a CSP rewrite. */
const GTM = ["https://www.googletagmanager.com"];

const GOOGLE_ANALYTICS = [
  "https://www.google-analytics.com",
  "https://*.google-analytics.com",
  // Bare host is required alongside the wildcard: a `*.` CSP wildcard matches
  // subdomains only, so https://*.analytics.google.com does NOT cover
  // https://analytics.google.com, which is where GA4 posts /g/collect.
  "https://analytics.google.com",
  "https://*.analytics.google.com",
  // GA4 ad-signal / audience pings.
  "https://stats.g.doubleclick.net",
  "https://www.google.com",
];

// GoHighLevel chat widget (widgets.leadconnectorhq.com/loader.js).
const LEADCONNECTOR = [
  "https://widgets.leadconnectorhq.com",
  "https://*.leadconnectorhq.com",
  "https://*.msgsndr.com",
];

/* IntentWave cookie-consent banner (cdn.intentwave.com/tag.js).
   All five origins are load-bearing — d0fc77f allowed only script-src and
   connect-src, which leaves the banner rendering unstyled: its stylesheet is
   served from cdn.intentwave.com and pulls Roboto from Bunny Fonts, and both
   are style-src/font-src concerns rather than script-src ones.

   Do not judge this tag by whether a banner appears. IntentWave geo-gates it
   itself: outside a consent-required region it sets __blockEnabled:false and
   never initialises, so it correctly renders nothing from most of the world.
   Check `typeof window.IntentWave === 'object'` instead. That distinction is
   almost certainly what sank the first attempt (d0fc77f allowed it, 2304eca
   reverted 14 minutes later with no reason recorded). */
const INTENTWAVE = [
  "https://cdn.intentwave.com",
  "https://*.intentwave.com",
  "https://fonts.bunny.net",
];

/* Click Track Analytics (ct.js), the first-party attribution collector loaded
   in the root layout. Two hosts, not one: the tag requests
   app.clicktrackanalytics.com and that 308s to www.clicktrackanalytics.com,
   and CSP re-checks the redirect target against the source list. Allowing
   only the app host leaves the tag present in the page but blocked, which is
   exactly the "it's in the HTML so it must be working" trap the IntentWave
   note above warns about. Confirm with `typeof window.CT === 'object'`, not
   by eyeballing the markup. The app host also needs connect-src for the
   one-shot install beacon. */
const CLICK_TRACK = [
  "https://app.clicktrackanalytics.com",
  "https://www.clicktrackanalytics.com",
  // ct.js v2: the script (ct.v2.js) and its hits (/c) are both on the collector host.
  "https://c.clicktrackanalytics.com",
];

const THIRD_PARTY = [...GTM, ...GOOGLE_ANALYTICS, ...LEADCONNECTOR, ...INTENTWAVE, ...CLICK_TRACK];

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    // Lenient CSP — allows the Google Maps iframe in Visit, the next/image optimization,
    // Google Fonts via next/font, inline JSON-LD, and the GTM-injected tags above.
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      ["script-src 'self' 'unsafe-inline' 'unsafe-eval'", ...THIRD_PARTY].join(" "),
      ["style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", ...LEADCONNECTOR, ...INTENTWAVE].join(" "),
      ["font-src 'self' data: https://fonts.gstatic.com", ...LEADCONNECTOR, ...INTENTWAVE].join(" "),
      "img-src 'self' data: blob: https:",
      // The chat widget plays a notification sound on incoming messages.
      ["media-src 'self' data:", ...LEADCONNECTOR].join(" "),
      ["frame-src 'self' https://maps.google.com https://www.google.com https://www.googletagmanager.com", ...LEADCONNECTOR, ...INTENTWAVE].join(" "),
      // IntentWave's own pulse.intentwave.com connect-src entries above are https-scheme,
      // which does not cover the wss:// socket it opens for consent-banner analytics.
      ["connect-src 'self'", ...THIRD_PARTY, "wss://*.leadconnectorhq.com", "wss://*.intentwave.com"].join(" "),
      // The chat widget runs its realtime transport in a blob-backed worker.
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    /* AVIF ahead of WebP: same visual quality at roughly 20-30% smaller, so a
       higher quality tier costs little. Next falls back to WebP, then the
       original, for browsers without AVIF. */
    formats: ["image/avif", "image/webp"],
    /* Next 15 whitelists the quality values a page may request. 75 is the
       default and stays for decorative imagery; 90 is for the clinical
       before/after photography, where compression artefacts read as blur. */
    qualities: [75, 90],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return migrationRedirects;
  },
};

export default nextConfig;
