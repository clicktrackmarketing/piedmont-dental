import { SOCIAL_LINKS } from "@/lib/social";

type Variant = "announce" | "footer" | "menu" | "card";

// Linked icon group for the practice's social profiles. Each variant is styled
// in globals.css under `.social--<variant>`; the markup is identical so the
// icons, order and labels can never drift between placements.
export default function SocialLinks({
  variant,
  label = "Follow us",
  showLabel = true,
}: {
  variant: Variant;
  label?: string;
  showLabel?: boolean;
}) {
  return (
    <div className={`social social--${variant}`}>
      {showLabel && <span className="social-label">{label}</span>}
      <ul className="social-list" aria-label="Piedmont Dental By Design on social media">
        {SOCIAL_LINKS.map((s) => (
          <li key={s.id}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-link social-link--${s.id}`}
              aria-label={`${s.label} (opens in a new window)`}
              title={s.label}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
                <path fill="currentColor" d={s.path} />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
