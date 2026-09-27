import Script from "next/script";

const CT_KEY = "cta_piedmontdentalbydesign_com_v1";
// The site's key in Click Track Analytics V2 (core.client_sites): turns on visit tracking.
const CT_SITE = "BE9Zz3yKbj7M8jH0MmhZkF4pXM2LIEVE";

/**
 * Click Track Analytics (ct.js v2) - first-party attribution collector.
 *
 * v2 keeps v1's storage key (CT_KEY), so first touch and the form hand-off carry over, and adds
 * the site key (CT_SITE): with it, page views, form submits and call clicks are sent to Click
 * Track Analytics, by consent only (visitors in the EU, UK and Switzerland opt in; the browser's
 * Global Privacy Control signal is honoured as an opt-out).
 *
 * strategy="beforeInteractive" is deliberate, not cosmetic. Next hoists these
 * into <head> and runs them ahead of every other script, which is what the
 * install SOP means by "before any form scripts": a form script can only read
 * window.CT once the loader has run. It also means ct.js samples the real
 * landing URL and referrer before any client-side navigation can rewrite them,
 * so landing_page_first / referrer_url_captured stay honest.
 *
 * Forms read the captured record at submit time via
 * window.CT.ghlCustomFields(); a native-submit form can instead carry
 * data-ct-capture and ct.js injects the hidden inputs itself.
 */
export function ClickTrackAnalytics() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script
        id="click-track-analytics"
        src="https://c.clicktrackanalytics.com/ct.v2.js"
        data-key={CT_KEY}
        data-site={CT_SITE}
        strategy="beforeInteractive"
      />
    </>
  );
}
