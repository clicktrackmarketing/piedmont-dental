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

const FORM_SOURCE = "smile-analysis";

const QUESTIONS: string[] = [
  "Are any of your teeth yellow, stained, or somewhat discolored?",
  "Would you like your teeth to be whiter?",
  "Do you have any gaps or spaces between your teeth?",
  "Are any of your teeth turned, crooked, or uneven?",
  "Are you missing any teeth?",
  "Do you see any pitting or defects on the surfaces of your teeth?",
  "Are the edges of any teeth worn down, chipped, or uneven?",
  "Do any of your teeth appear too small, short, large, or long?",
  "Do you have any prior dental work that appears unnatural?",
  "Do you have any crowns or bridges that appear dark at the edge of your gums?",
  "Do you have any gray, black, or silver (mercury) fillings in your teeth?",
  "Do you have a “gummy” smile (too much of your gums show when smiling)?",
  "Are your gums red, sore, puffy, bleeding, or receded?",
  "Does the appearance of your smile inhibit you from laughing or smiling?",
  "When being photographed, do you smile with your lips closed instead of flashing a full smile?",
  "Are you self-conscious about your teeth or smile?",
  "Would you like to change anything about the appearance of your teeth or smile?",
];

type Answers = Record<number, "yes" | "no" | undefined>;

export default function SmileAnalysisForm() {
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [consentError, setConsentError] = useState("");
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    additional: "",
  });
  // Anti-spam: honeypot value + when the form first rendered (for time-to-submit).
  const [honeypot, setHoneypot] = useState("");
  const renderedAt = useRef(0);
  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  const yesCount = Object.values(answers).filter((a) => a === "yes").length;
  const answeredCount = Object.values(answers).filter((a) => a !== undefined)
    .length;
  const allAnswered = answeredCount === QUESTIONS.length;

  function handleAnswer(i: number, value: "yes" | "no") {
    setAnswers((prev) => ({ ...prev, [i]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    if (!smsConsent) {
      setConsentError("Please check the box above to consent to text messages before submitting.");
      return;
    }
    setConsentError("");
    setSubmitting(true);

    const formattedAnswers = [
      `Yes count: ${yesCount} / ${QUESTIONS.length}`,
      "",
      "Answers:",
      ...QUESTIONS.map(
        (q, i) => `${i + 1}. ${q}\n   → ${(answers[i] ?? "—").toUpperCase()}`
      ),
      "",
      "Additional info:",
      contactData.additional || "(none provided)",
    ].join("\n");

    const nowIso = new Date().toISOString();
    const attribution = getAttributionData();

    const payload = {
      [HONEYPOT_FIELD]: honeypot,
      [FILL_MS_FIELD]: renderedAt.current ? Date.now() - renderedAt.current : 0,
      form_message: contactData.additional || undefined,
      first_name: contactData.firstName,
      last_name: contactData.lastName,
      full_name: `${contactData.firstName} ${contactData.lastName}`.trim(),
      email: contactData.email,
      phone: contactData.phone,
      form_source: FORM_SOURCE,
      form_name: "Smile Analysis",
      form_source_url: typeof window !== "undefined" ? window.location.href : undefined,
      form_intent_type: "consultation",
      smile_analysis_yes_count: yesCount,
      smile_analysis_answers: formattedAnswers,
      form_consent_sms: true,
      form_consent_marketing: true,
      form_consent_sms_timestamp: nowIso,
      form_consent_sms_text: SMS_CONSENT_TEXT,
      note: `Smile Analysis quiz — ${yesCount}/${QUESTIONS.length} yes answers.\n\n${formattedAnswers}`,
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
        console.error("[smile analysis] submission failed", json);
        setErrorMessage(
          json?.error ||
            "Something went wrong sending your analysis. Please call us at (510) 350-3937 or try again."
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
          form_intent_type: "consultation",
          // visitor_id (the HighLevel join key) stays out of GTM.
          ...attributionForDataLayer(attribution),
        });
      }

      setSubmitted(true);
      setSubmitting(false);
    } catch (err) {
      console.error("[smile analysis] network error", err);
      setErrorMessage(
        "Something went wrong sending your analysis. Please call us at (510) 350-3937 or try again."
      );
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="smile-analysis-thanks">
        <div className="num">— Thanks —</div>
        <h2>
          Your analysis is on its way.
        </h2>
        <p>
          We&apos;ve received your responses and will review them and follow
          up within one business day.
        </p>
        <p className="smile-analysis-thanks-note">
          Need us sooner? Email{" "}
          <a href="mailto:info@piedmontdentalbydesign.com">
            info@piedmontdentalbydesign.com
          </a>{" "}
          or call <a href="tel:5103503937">(510) 350-3937</a>.
        </p>
        <a href="/" className="btn btn-ghost btn-lg">
          Back to home
        </a>
      </div>
    );
  }

  return (
    <form className="smile-analysis-form" onSubmit={handleSubmit}>
      <HoneypotField value={honeypot} onChange={setHoneypot} />

      <fieldset className="smile-analysis-questions">
        <legend className="smile-analysis-legend">
          <span className="num">i. — 17 questions</span>
          <span className="smile-analysis-progress" aria-live="polite">
            {answeredCount} of {QUESTIONS.length} answered
          </span>
        </legend>

        <ol>
          {QUESTIONS.map((q, i) => (
            <li key={i} className="smile-analysis-q">
              <div className="smile-analysis-q-text">
                <span className="smile-analysis-q-num">{i + 1}.</span>
                <span>{q}</span>
              </div>
              <div
                className="smile-analysis-q-answers"
                role="radiogroup"
                aria-label={q}
              >
                {(["yes", "no"] as const).map((v) => (
                  <label
                    key={v}
                    className={`smile-analysis-pill ${
                      answers[i] === v ? "is-selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q-${i}`}
                      value={v}
                      required
                      checked={answers[i] === v}
                      onChange={() => handleAnswer(i, v)}
                    />
                    <span>{v === "yes" ? "Yes" : "No"}</span>
                  </label>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </fieldset>

      <div className="smile-analysis-bridge">
        <p>
          If you answered <strong>YES</strong> to <strong>ANY</strong> of the
          questions above, there are often several alternatives to improve your
          teeth and smile. To receive a personalized response to your smile
          analysis, please complete the form below. You can have the smile
          you&apos;ve always wanted — schedule a <strong>FREE, no-obligation
          office consultation</strong> with us today.
        </p>
        {allAnswered && (
          <p className="smile-analysis-result">
            <strong>Your result:</strong> {yesCount} of {QUESTIONS.length}{" "}
            answered <em>yes</em>.{" "}
            {yesCount === 0
              ? "Great — your smile sounds healthy. Even so, a routine consultation is the best way to confirm."
              : yesCount <= 4
                ? "A few targeted cosmetic options could likely make a meaningful difference."
                : yesCount <= 10
                  ? "Several treatments could help. A consultation will help us prioritize."
                  : "A comprehensive consultation will help us put together a personalized plan."}
          </p>
        )}
      </div>

      <fieldset className="smile-analysis-contact">
        <legend className="smile-analysis-legend">
          <span className="num">ii. — Your contact details</span>
        </legend>

        <div className="form-row form-row--split">
          <div>
            <label htmlFor="sa-first">
              First name <span className="req">*</span>
            </label>
            <input
              id="sa-first"
              type="text"
              required
              autoComplete="given-name"
              value={contactData.firstName}
              onChange={(e) =>
                setContactData((d) => ({ ...d, firstName: e.target.value }))
              }
            />
          </div>
          <div>
            <label htmlFor="sa-last">
              Last name <span className="req">*</span>
            </label>
            <input
              id="sa-last"
              type="text"
              required
              autoComplete="family-name"
              value={contactData.lastName}
              onChange={(e) =>
                setContactData((d) => ({ ...d, lastName: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="form-row form-row--split">
          <div>
            <label htmlFor="sa-email">
              Email <span className="req">*</span>
            </label>
            <input
              id="sa-email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={contactData.email}
              onChange={(e) =>
                setContactData((d) => ({ ...d, email: e.target.value }))
              }
            />
          </div>
          <div>
            <label htmlFor="sa-phone">
              Phone <span className="req">*</span>
            </label>
            <input
              id="sa-phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="(510) 555-0000"
              value={contactData.phone}
              onChange={(e) =>
                setContactData((d) => ({ ...d, phone: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="form-row">
          <label htmlFor="sa-additional">Additional info</label>
          <textarea
            id="sa-additional"
            rows={4}
            placeholder="Anything else you'd like us to know before reaching out?"
            value={contactData.additional}
            onChange={(e) =>
              setContactData((d) => ({ ...d, additional: e.target.value }))
            }
          />
        </div>

        <SmsConsent
          id="smile-analysis-sms-consent"
          checked={smsConsent}
          onCheckedChange={(v) => {
            setSmsConsent(v);
            if (v) setConsentError("");
          }}
          errorMessage={consentError}
        />

        {errorMessage && (
          <p className="form-error" role="alert">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          className="btn btn-primary btn-lg smile-analysis-submit"
          disabled={!allAnswered || submitting}
        >
          {submitting ? "Sending…" : "Submit my analysis →"}
        </button>
        {!allAnswered && (
          <p className="smile-analysis-hint">
            Answer all {QUESTIONS.length} questions above to enable submission.
          </p>
        )}
      </fieldset>
    </form>
  );
}
