"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DO_NOT_SELL_KEY } from "@/lib/doNotSell";

/**
 * The opt-out control.
 *
 * Storing the flag is only half of it: the stored value is re-applied on every
 * later page load by the bootstrap in @/lib/consentBootstrap.ts, before
 * gtm.js loads. Applying the consent update here as well is what makes the
 * choice take effect on THIS page view without a reload.
 *
 * Global Privacy Control is treated as an opt-out the visitor's browser has
 * already made, so the control reports it and does not offer to rescind a
 * choice this site did not set.
 */
const DENIED = { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" };
const GRANTED = { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" };

function applyConsent(signals: Record<string, string>, optOut: boolean) {
  const w = window as unknown as {
    gtag?: (...a: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  };
  w.gtag?.("consent", "update", signals);
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: "do_not_sell_opt_out", optOut });
}

export default function DoNotSellClient() {
  // null until storage has been read, so the control never renders the wrong state
  const [optedOut, setOptedOut] = useState<boolean | null>(null);
  const [gpc, setGpc] = useState(false);

  useEffect(() => {
    setGpc(!!(navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl);
    try {
      setOptedOut(localStorage.getItem(DO_NOT_SELL_KEY) === "1");
    } catch {
      setOptedOut(false);
    }
  }, []);

  const optOut = () => {
    try {
      localStorage.setItem(DO_NOT_SELL_KEY, "1");
    } catch {
      /* storage blocked; the consent update below still covers this visit */
    }
    applyConsent(DENIED, true);
    setOptedOut(true);
  };

  const rescind = () => {
    try {
      localStorage.removeItem(DO_NOT_SELL_KEY);
    } catch {
      /* nothing stored to clear */
    }
    applyConsent(GRANTED, false);
    setOptedOut(false);
  };

  const effectivelyOptedOut = gpc || optedOut === true;

  return (
    <section className="legal-footer-callout">
      {optedOut === null ? (
        <p className="">Checking your current setting.</p>
      ) : effectivelyOptedOut ? (
        <>
          <p className="">
            <strong className="">You are opted out.</strong> We are not sharing
            your personal information for advertising or visitor identification on this
            browser.
          </p>
          {gpc && (
            <p className="">
              Your browser is sending a Global Privacy Control signal, which we honor
              automatically. That applies on every site that respects it, so there is
              nothing further to set here.
            </p>
          )}
          {!gpc && (
            <button type="button" onClick={rescind} className="btn btn-ghost">
              Allow sharing again
            </button>
          )}
        </>
      ) : (
        <>
          <p className="">
            Opting out stops the advertising and visitor-identification technologies on this
            site for this browser. It takes effect immediately and does not require an
            account.
          </p>
          <button type="button" onClick={optOut} className="btn btn-primary">
            Do not sell or share my personal information
          </button>
        </>
      )}

      <p className="">
        The setting is stored in this browser only. Clearing your site data, or using a
        different browser or device, will clear it. For a request that covers our records
        rather than this browser, see the contact details in our{" "}
        <Link href="/privacy-policy-2" className="">
          Privacy Policy
        </Link>
        .
      </p>
    </section>
  );
}
