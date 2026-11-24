/**
 * The cookie banner's own choice, replayed by this site before GTM loads.
 *
 * IntentWave (a GTM tag in container GTM-PLVLXN8R) draws the "Accept all / Reject
 * all / Manage preferences" banner and stores the choice in `cc_cookie`.
 * IntentWave's own Consent Mode integration, and any replay hosted as a GTM
 * Custom HTML tag, can only push a `consent update` after gtm.js has
 * downloaded AND executed — which is after GTM's All Pages tags have already
 * read consent.
 *
 * Measured on johnsonspinalcare.com (production, 2026-11-24), with a stored
 * "Reject all", timestamping `dataLayer.push` for consent commands and a
 * MutationObserver for the moment each vendor <script> is INSERTED (not when
 * its request completes, which is a different and misleading event):
 *
 *     194ms  consent default   ad=denied  [region-scoped]  wait=500
 *     194ms  consent default   ad=granted                  wait=500
 *     446ms  INSERTED  gtm.js
 *     694ms  (the wait_for_update window expires: 194 + 500)
 *     911ms  consent update    ad=denied analytics=denied   <- container tag
 *     919ms  INSERTED  clarity, meta, intentwave
 *
 * `wait_for_update` starts when the page-code default runs, so the window had
 * closed 217ms before the container's replay arrived. GTM proceeded on the
 * granted default, cleared the gated tags and inserted them. That is
 * structural, not a tuning problem: gtm.js took 465ms to load in that run and
 * 2651ms in another, so no practical wait value covers it.
 *
 * Replaying here, in the same inline script as the defaults, lands the update
 * before gtm.js exists. Re-measured after the fix shipped: the update appears
 * in the same millisecond as the defaults and NO vendor script is inserted at
 * all under a stored Reject, while a stored Accept still fires everything and
 * Google's pings still carry gcs=G111.
 *
 * `cc_cookie` holds URL-encoded JSON with a `categories` array: `necessary`
 * plus whatever was accepted (`ads`, `analytics`, `performance`, `social`,
 * `unclassified`, `emailmarketing`). Absence of a category is a refusal; no
 * cookie at all is not a refusal and denies nothing.
 *
 * This only ever DENIES. A banner Accept never grants what a region default,
 * Global Privacy Control or a manual opt-out already refused — those remain
 * authoritative and this is additive to them.
 *
 * It must be ES5: the same string shape is also used for GTM Custom HTML,
 * which is compiled as ES5 and rejects later syntax at publish time rather
 * than at write time. No let/const, no arrow functions, no template literals.
 */
export const REAPPLY_BANNER_CHOICE = [
  "try{",
  "var __cc=document.cookie.match(/(?:^|;\\s*)cc_cookie=([^;]*)/);",
  "if(__cc){",
  "var __cats=JSON.parse(decodeURIComponent(__cc[1])).categories;",
  "if(__cats instanceof Array){",
  "var __u={};",
  "var __any=false;",
  "if(__cats.indexOf('ads')<0){__u.ad_storage='denied';__u.ad_user_data='denied';__u.ad_personalization='denied';__any=true;}",
  "if(__cats.indexOf('analytics')<0){__u.analytics_storage='denied';__any=true;}",
  "if(__cats.indexOf('performance')<0){__u.functionality_storage='denied';__any=true;}",
  "if(__any){gtag('consent','update',__u);}",
  "}}}catch(e){}",
].join("");
