"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { attributionForDataLayer, getAttributionData } from "@/lib/attribution";
import SmsConsent, { SMS_CONSENT_TEXT } from "@/components/SmsConsent";
import HoneypotField from "@/components/HoneypotField";
import { FILL_MS_FIELD, HONEYPOT_FIELD } from "@/lib/spam-guard-fields";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const FORM_SOURCE = "contact-page";

function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts.shift() || "";
  return { firstName, lastName: parts.join(" ") };
}

export default function ContactHero() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [patientStatus, setPatientStatus] = useState<"New Patient" | "Existing Patient" | "">("");
  const [message, setMessage] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [consentError, setConsentError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // Anti-spam: honeypot value + when the form first rendered (for time-to-submit).
  const [honeypot, setHoneypot] = useState("");
  const renderedAt = useRef(0);
  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    if (!smsConsent) {
      setConsentError("Please check the box above to consent to text messages before sending.");
      return;
    }
    setConsentError("");
    setSubmitting(true);

    const { firstName, lastName } = splitName(name);
    const nowIso = new Date().toISOString();
    const attribution = getAttributionData();

    const payload = {
      [HONEYPOT_FIELD]: honeypot,
      [FILL_MS_FIELD]: renderedAt.current ? Date.now() - renderedAt.current : 0,
      first_name: firstName,
      last_name: lastName || undefined,
      full_name: name,
      email,
      phone,
      form_source: FORM_SOURCE,
      form_name: "Contact Form",
      form_source_url: typeof window !== "undefined" ? window.location.href : undefined,
      form_intent_type: "contact",
      form_message: message,
      patient_message: message,
      are_you_a_new_or_existing_patient: patientStatus || undefined,
      form_consent_sms: true,
      form_consent_marketing: true,
      form_consent_sms_timestamp: nowIso,
      form_consent_sms_text: SMS_CONSENT_TEXT,
      note: `Contact form submission — ${patientStatus || "patient status not given"}.\n\nMessage:\n${message}`,
      ...attribution,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        console.error("[contact form] submission failed", json);
        setErrorMessage(
          json?.error ||
            "Something went wrong sending your message. Please call us at (510) 350-3937 or try again."
        );
        setSubmitting(false);
        return;
      }

      // Only count a real lead — spam-filtered submissions come back ok
      // but with no contactId, and must not fire a GA4 conversion.
      if (json.contactId) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "generate_lead",
          form_source: FORM_SOURCE,
          form_intent_type: "contact",
          // visitor_id (the HighLevel join key) stays out of GTM.
          ...attributionForDataLayer(attribution),
        });
      }

      setSubmitted(true);
      setSubmitting(false);
    } catch (err) {
      console.error("[contact form] network error", err);
      setErrorMessage(
        "Something went wrong sending your message. Please call us at (510) 350-3937 or try again."
      );
      setSubmitting(false);
    }
  }

  return (
    <section className="page-hero contact-hero">
      <div className="page-hero-inner contact-hero-inner">
        <div className="page-hero-content">
          <div className="num">— Contact Us —</div>
          <h1>
            Get in <em>touch.</em>
          </h1>
          <p className="page-hero-sub">
            We encourage you to contact us with any questions or comments. Send a
            message using the form, or reach the practice directly through the
            channels below — we usually reply within an hour during open hours.
          </p>

          <ul className="contact-channels">
            <li>
              <span className="cc-label">Front desk</span>
              <a href="tel:5103503937" className="cc-value">
                (510) 350-3937
              </a>
              <span className="cc-meta">During open hours · text-friendly</span>
            </li>
            <li>
              <span className="cc-label">Email</span>
              <a
                href="mailto:info@piedmontdentalbydesign.com"
                className="cc-value"
              >
                info@piedmontdentalbydesign.com
              </a>
              <span className="cc-meta">General questions &amp; appointments</span>
            </li>
            <li>
              <span className="cc-label">Visit</span>
              <span className="cc-value">1331 Grand Ave, Piedmont, CA 94610</span>
              <span className="cc-meta">5 minutes from MacArthur BART</span>
            </li>
          </ul>
        </div>

        <aside className="contact-form-wrap" id="form">
          {submitted ? (
            <div className="contact-form-thanks">
              <div className="num">— Thanks —</div>
              <h2>Your message is on its way.</h2>
              <p>
                We&apos;ve received your message and will follow up within one
                business day — usually much sooner during open hours.
              </p>
              <p className="contact-form-thanks-note">
                Need us sooner? Call{" "}
                <a href="tel:5103503937">(510) 350-3937</a> during open hours.
              </p>
            </div>
          ) : (
            <form
              className="contact-form"
              aria-label="Contact Piedmont Dental"
              onSubmit={handleSubmit}
            >
              <header className="contact-form-head">
                <h2>Send a message</h2>
                <span className="contact-form-meta">~ 1 minute</span>
              </header>

              <HoneypotField value={honeypot} onChange={setHoneypot} />

              <div className="form-row">
                <label htmlFor="contact-name">
                  Name <span className="req" aria-label="required">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-row form-row--split">
                <div>
                  <label htmlFor="contact-email">
                    Email <span className="req">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone">
                    Phone <span className="req">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="(510) 555-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <fieldset className="form-radiogroup">
                <legend>
                  Are you a new or existing patient?{" "}
                  <span className="req">*</span>
                </legend>
                <div className="form-radiogroup-options">
                  <label className="form-radio">
                    <input
                      type="radio"
                      name="patient_status"
                      value="New Patient"
                      required
                      checked={patientStatus === "New Patient"}
                      onChange={() => setPatientStatus("New Patient")}
                    />
                    <span>New patient</span>
                  </label>
                  <label className="form-radio">
                    <input
                      type="radio"
                      name="patient_status"
                      value="Existing Patient"
                      checked={patientStatus === "Existing Patient"}
                      onChange={() => setPatientStatus("Existing Patient")}
                    />
                    <span>Existing patient</span>
                  </label>
                </div>
              </fieldset>

              <div className="form-row">
                <label htmlFor="contact-message">
                  Message <span className="req">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell us a bit about what brings you in — new patient, specific procedure, scheduling question, etc."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <SmsConsent
                id="contact-sms-consent"
                checked={smsConsent}
                onCheckedChange={(v) => {
                  setSmsConsent(v);
                  if (v) setConsentError("");
                }}
                errorMessage={consentError}
              />

              <p className="form-disclaimer">
                <strong>Disclaimer:</strong> We do not accept Medi-cal and
                Medi-care.
              </p>

              {errorMessage && (
                <p className="form-error" role="alert">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                className="btn btn-teal btn-lg form-submit"
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Send message →"}
              </button>
              <p className="form-fineprint">
                We typically reply within an hour during open hours · Required
                fields marked with <span className="req">*</span>
              </p>
            </form>
          )}
        </aside>
      </div>
    </section>
  );
}
