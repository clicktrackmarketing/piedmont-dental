import SocialLinks from "@/components/SocialLinks";

export default function AnnouncementBar() {
  return (
    <div className="announce">
      <p className="announce-msg">
        <span className="star">★</span>
        Voted <b>Best of the East Bay 2024, 2025 &amp; 2026</b>
        <span className="star">·</span>
        <a href="/contact">Now accepting new patients →</a>
      </p>
      <SocialLinks variant="announce" />
    </div>
  );
}
