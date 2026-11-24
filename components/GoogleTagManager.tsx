import Script from "next/script";

import { CONSENT_BOOTSTRAP } from "@/lib/consentBootstrap";

export const GTM_ID = "GTM-PLVLXN8R";

/**
 * GTM container loader. strategy="afterInteractive" is the Next.js-recommended
 * placement for GTM (see Next.js docs on third-party scripts) — it loads after
 * the page becomes interactive rather than blocking hydration.
 */
export function GTMScript() {
  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

/** Noscript fallback iframe — must be the first element inside <body>. */
export function GTMNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}

/**
 * Consent Mode v2 defaults, GPC and the stored cookie-banner choice.
 *
 * strategy="beforeInteractive" so Next hoists it ahead of everything that
 * reads consent. ct.js (ClickTrackAnalytics) is beforeInteractive too and
 * would otherwise initialise before the defaults existed; GTMScript above is
 * afterInteractive and runs later still. Render this FIRST among the
 * beforeInteractive scripts — Next preserves their source order.
 *
 * Google treats an undeclared signal as GRANTED, so without this every consent
 * gate on every tag in GTM-PLVLXN8R is inert.
 */
export function ConsentBootstrap() {
  return (
    <Script id="consent-bootstrap" strategy="beforeInteractive">
      {CONSENT_BOOTSTRAP}
    </Script>
  );
}
