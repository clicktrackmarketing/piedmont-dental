/**
 * CPRA §1798.135 "Do Not Sell or Share My Personal Information" opt-out.
 *
 * Why this is a stored flag replayed before GTM, and not a vendor setting:
 * this site runs IntentWave (a tag in container GTM-PLVLXN8R) which resolves
 * otherwise anonymous visitors to identified people. That tag requires
 * `ad_storage`, so denying the three advertising signals is what actually
 * stops identification. The opt-out is then enforced by the tag's own consent
 * check rather than by trusting a vendor to honour a flag we send it.
 *
 * Timing is the whole point. The replay runs in the same inline script as the
 * Consent Mode defaults, before gtm.js exists. An opt-out applied after gtm.js
 * has executed is too late: GTM has already cleared and inserted its All Pages
 * tags. See ./bannerConsent for the measurement that established this.
 *
 * It only ever DENIES. A visitor who has opted out is never re-granted by a
 * later banner Accept.
 */

/** localStorage key written by the /do-not-sell control. */
export const DO_NOT_SELL_KEY = "optout_sale_share";

/**
 * Inline JS appended to CONSENT_BOOTSTRAP. Assumes `gtag` is defined by the
 * defaults above it. Wrapped in try/catch because localStorage throws rather
 * than returning null in a blocked-storage context, and a throw here would
 * abort the rest of the bootstrap.
 */
export const DO_NOT_SELL_REPLAY = `
try{if(localStorage.getItem(${JSON.stringify(DO_NOT_SELL_KEY)})==='1'){gtag('consent','update',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});window.dataLayer.push({event:'do_not_sell_opt_out',optOut:true});}}catch(e){}
`.trim();
