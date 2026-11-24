import { REAPPLY_BANNER_CHOICE } from "./bannerConsent";

/**
 * Google Consent Mode v2 defaults. This must run BEFORE gtm.js loads.
 *
 * Why this file exists: this site loaded GTM with no consent defaults at all.
 * Google treats an UNDECLARED signal as granted, so every consent gate set on
 * a tag inside container GTM-PLVLXN8R read as "gated" while being inert — the tags
 * fired regardless, including for EEA/UK/CH visitors, and a "Reject all" on
 * the cookie banner changed nothing.
 *
 * Two `default` calls, deliberately, region-scoped first:
 *   1. EEA/UK/CH — everything denied. Required there; consent is opt-in.
 *   2. everywhere else — granted. The US, including California, where CPRA is
 *      opt-out rather than opt-in.
 *
 * Both failure modes are real. All-granted is unlawful in the EEA/UK. But
 * all-denied with nothing to grant it silently drops 100% of GA4 hits
 * everywhere, forever, and the site looks perfectly healthy from outside — so
 * the global default stays granted rather than being "safely" denied.
 *
 * Global Privacy Control is then read synchronously. CPRA and several other
 * state laws require honouring it, and ignoring GPC was the basis of
 * California's first CCPA enforcement action. It must resolve before GTM
 * loads: a middleware round trip is too late, because an ad tag can already
 * have fired. Denying ad_storage is the single lever — any tag in the
 * container that requires ad_storage is then blocked without trusting each
 * vendor to police itself.
 *
 * Last, the stored cookie-banner choice is replayed. See ./bannerConsent for
 * the measurement showing why that cannot be left to a GTM-hosted tag.
 */

/* EEA-27 + Iceland, Liechtenstein, Norway, United Kingdom, Switzerland.
   Google matches the region from the request itself — we never geolocate. */
const CONSENT_DENIED_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH",
];

export const CONSENT_BOOTSTRAP = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{
  ad_storage:'denied',
  ad_user_data:'denied',
  ad_personalization:'denied',
  analytics_storage:'denied',
  functionality_storage:'denied',
  personalization_storage:'denied',
  security_storage:'granted',
  region:${JSON.stringify(CONSENT_DENIED_REGIONS)},
  wait_for_update:500
});
gtag('consent','default',{
  ad_storage:'granted',
  ad_user_data:'granted',
  ad_personalization:'granted',
  analytics_storage:'granted',
  functionality_storage:'granted',
  personalization_storage:'granted',
  security_storage:'granted',
  wait_for_update:500
});
try{if(navigator.globalPrivacyControl===true){gtag('consent','update',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});}}catch(e){}
${REAPPLY_BANNER_CHOICE}
`.trim();
