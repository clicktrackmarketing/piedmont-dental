import type { Metadata } from "next";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import DoNotSellClient from "./DoNotSellClient";

export const metadata: Metadata = {
  title: "Do Not Sell or Share My Personal Information",
  description: "Opt out of the sale or sharing of your personal information, as provided under the California Consumer Privacy Act.",
  alternates: { canonical: "/do-not-sell" },
  robots: { index: true, follow: false },
  openGraph: {
    title: "Do Not Sell or Share My Personal Information — Piedmont Dental By Design",
    description: "Opt out of the sale or sharing of your personal information, as provided under the California Consumer Privacy Act.",
    url: "https://piedmontdentalbydesign.com/do-not-sell",
    type: "article",
  },
};

export default function DoNotSellPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <section className="legal-hero">
          <div className="legal-hero-inner">
            <div className="num">Legal</div>
            <h1 className="legal-hero-title">Do Not Sell or Share My Personal Information</h1>
            <p className="legal-hero-effective">
              California Consumer Privacy Act, as amended by the California Privacy
              Rights Act.
            </p>
          </div>
        </section>

        <section className="legal-body">
          <div className="legal-body-inner">
            <p>This site uses advertising and visitor-identification technologies. Under California law, that use may count as &ldquo;sharing&rdquo; your personal information for cross-context behavioral advertising, and you have the right to tell us to stop.</p>
            <p>We do not sell your personal information for money. We do use services that can recognize a returning visitor and build an advertising audience, and California treats that as sharing whether or not any money changes hands.</p>
            <p>We also honor Global Privacy Control automatically. If your browser sends that signal, advertising and visitor-identification technologies are switched off for your visit without you needing to do anything here.</p>

            <DoNotSellClient />

            <p>
              For the full account of what we collect and who we share it with, see our{" "}
              <Link href="/privacy-policy-2">Privacy Policy</Link> and our{" "}
              <Link href="/notice-of-privacy-practices">Notice of Privacy Practices</Link>.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
