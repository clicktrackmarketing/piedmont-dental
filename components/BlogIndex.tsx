import Image from "next/image";

export type Post = {
  slug: string;
  title: string;
  date: string; // human-readable
  dateISO: string; // ISO 8601 for schema/datetime
  category: string;
  image: string;
  alt: string;
  excerpt: string;
  /** Optional path the user has migrated. Defaults to /blog/<slug>. */
  href?: string;
  external?: boolean;
};

export const posts: Post[] = [
  {
    slug: "what-is-smile-design-consultation",
    title: "What Is a Smile Design Consultation?",
    date: "June 15, 2026",
    dateISO: "2026-06-15",
    category: "Cosmetic",
    image: "/img/blog/what-is-smile-design-consultation/hero.jpg",
    alt: "Dentist and patient reviewing a digital smile design mockup on screen",
    excerpt:
      "A smile design consultation is a structured evaluation that treats your smile as a whole, not tooth by tooth. Here's what it involves and who needs one.",
  },
  {
    slug: "how-to-choose-cosmetic-dentist-east-bay",
    title:
      "How to Choose a Cosmetic Dentist in the East Bay — A Checklist",
    date: "June 1, 2026",
    dateISO: "2026-06-01",
    category: "Cosmetic",
    image: "/img/blog/how-to-choose-cosmetic-dentist-east-bay/hero.jpg",
    alt: "Cosmetic dentist in clinical setting preparing for a patient consultation",
    excerpt:
      "Cosmetic dentistry is as much art as science. Use this East Bay checklist to vet a dentist's credentials, portfolio, and process before you commit.",
  },
  {
    slug: "teeth-whitening-piedmont-professional-vs-at-home",
    title:
      "Teeth Whitening Options in Piedmont: Professional vs. At-Home",
    date: "May 18, 2026",
    dateISO: "2026-05-18",
    category: "Cosmetic",
    image:
      "/img/blog/teeth-whitening-piedmont-professional-vs-at-home/hero.jpg",
    alt: "Bright white teeth after a professional whitening treatment",
    excerpt:
      "Whitening is the most requested cosmetic procedure in the East Bay. Here's how in-office, take-home, and store-bought options actually compare.",
  },
  {
    slug: "cerec-same-day-crowns-oakland",
    title:
      "CEREC Same-Day Crowns: What Oakland Patients Need to Know",
    date: "May 4, 2026",
    dateISO: "2026-05-04",
    category: "Restorative",
    image: "/img/blog/cerec-same-day-crowns-oakland/hero.jpg",
    alt: "Digital dental scan and same-day CEREC crown workflow",
    excerpt:
      "CEREC designs, mills, and bonds a permanent crown in a single visit — no temporaries, no gooey impressions. Here's how the workflow really works.",
  },
  {
    slug: "invisalign-vs-braces-adults-east-bay",
    title: "Invisalign vs. Braces for Adults: East Bay Patient Guide",
    date: "April 20, 2026",
    dateISO: "2026-04-20",
    category: "Cosmetic",
    image: "/img/blog/invisalign-vs-braces-adults-east-bay/hero.jpg",
    alt: "Adult holding a clear Invisalign aligner tray",
    excerpt:
      "Invisalign and braces both move teeth effectively, but differ in comfort, aesthetics, treatment time, and cost. An honest side-by-side for adults.",
  },
  {
    slug: "veneers-cost-oakland-2026",
    title: "How Much Do Veneers Cost in Oakland? A 2026 Guide",
    date: "April 6, 2026",
    dateISO: "2026-04-06",
    category: "Cosmetic",
    image: "/img/blog/veneers-cost-oakland-2026/hero.jpg",
    alt: "Porcelain veneer shade guide next to a bright natural smile",
    excerpt:
      "What should porcelain veneers cost in Oakland in 2026? A transparent breakdown by veneer type, number of teeth, and the financing options available.",
  },
  {
    slug: "porcelain-veneers-vs-dental-bonding",
    title:
      "Porcelain Veneers vs. Dental Bonding — Which Is Right for You?",
    date: "March 23, 2026",
    dateISO: "2026-03-23",
    category: "Cosmetic",
    image: "/img/blog/porcelain-veneers-vs-dental-bonding/hero.jpg",
    alt: "Cosmetic dentist comparing porcelain veneers and composite bonding for a patient",
    excerpt:
      "Chips, stains, small gaps and uneven edges have two popular fixes: porcelain veneers and dental bonding. Here's a side-by-side to help you choose.",
  },
  {
    slug: "dental-implants-piedmont-ca",
    title:
      "Dental Implants in Piedmont, CA: The Permanent Solution for Missing Teeth",
    date: "March 9, 2026",
    dateISO: "2026-03-09",
    category: "Restorative",
    image: "/img/blog/dental-implants-piedmont-ca/hero.jpg",
    alt: "Dental implants illustration",
    excerpt:
      "Dental implants are the only option that replaces the whole tooth, root included — for a result that looks, feels, and functions like a natural tooth.",
  },
  {
    slug: "cosmetic-dentist-piedmont-ca",
    title:
      "Cosmetic Dentistry in Piedmont, CA: Invisalign®, Teeth Whitening and More",
    date: "February 9, 2026",
    dateISO: "2026-02-09",
    category: "Cosmetic",
    image: "/img/blog/cosmetic-dentist-piedmont-ca/hero.jpg",
    alt: "Cosmetic dentistry results",
    excerpt:
      "Whether you're preparing for a milestone or simply ready to feel better about your teeth, modern cosmetic dentistry can deliver a lasting transformation.",
  },
  {
    slug: "family-dentist-piedmont-ca",
    title:
      "Why Piedmont Families Trust a General Dentist for Complete Oral Health",
    date: "January 9, 2026",
    dateISO: "2026-01-09",
    category: "Family Care",
    image: "/img/blog/family-dentist-piedmont-ca/hero.jpg",
    alt: "Family general dentist appointment",
    excerpt:
      "From a child's first visit to a grandparent's routine cleaning, a trusted general dentist builds the foundation for a whole family's lifelong oral health.",
  },
  {
    slug: "trusted-dentist-oakland-ca",
    title: "Trusted Dentist Near Oakland, CA – Piedmont Dental by Design",
    date: "December 9, 2025",
    dateISO: "2025-12-09",
    category: "Practice",
    image: "/img/blog/trusted-dentist-oakland-ca/hero.jpg",
    alt: "Practice exterior — trusted dentist near Oakland",
    excerpt:
      "Piedmont Dental by Design has cared for the Oakland and Piedmont communities for over 30 years from our Grand Avenue office. Here's what to expect.",
  },
  {
    slug: "waterpik-vs-flossing",
    title: "Waterpik vs. Flossing: Which One Is Better for Your Teeth?",
    date: "November 9, 2025",
    dateISO: "2025-11-09",
    category: "Daily Care",
    image: "/img/blog/waterpik-vs-flossing/hero.jpg",
    alt: "Waterpik vs traditional dental floss",
    excerpt:
      "Brushing is only half the battle. Traditional floss or a Waterpik — here's how they compare, and which actually cleans between your teeth better.",
  },
  {
    slug: "family-dentist-piedmont",
    title:
      "Family Dentists Near Me: Why Choosing a Local Family Dentist Matters",
    date: "October 9, 2025",
    dateISO: "2025-10-09",
    category: "Family Care",
    image: "/img/blog/family-dentist-piedmont/hero.jpg",
    alt: "Local family dentist visit",
    excerpt:
      "A family dentist provides comprehensive care for every age — so instead of visiting multiple specialists, you can simplify with one provider you trust.",
  },
];

function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  const href = post.href ?? `/blog/${post.slug}`;
  const targetProps = post.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <article className={`blog-card${featured ? " blog-card--featured" : ""}`}>
      <a className="blog-card-link" href={href} {...targetProps}>
        <div className="blog-card-media">
          <Image
            src={post.image}
            alt={post.alt}
            fill
            sizes={featured ? "(max-width: 1080px) 100vw, 720px" : "(max-width: 1080px) 100vw, 33vw"}
            style={{ objectFit: "cover" }}
            priority={featured}
          />
          <span className="blog-card-cat">{post.category}</span>
        </div>
        <div className="blog-card-body">
          <div className="blog-card-meta">
            <time dateTime={post.dateISO}>{post.date}</time>
            <span className="dot" aria-hidden="true" />
            <span>5 min read</span>
          </div>
          <h3 className="blog-card-title">{post.title}</h3>
          <p className="blog-card-excerpt">{post.excerpt}</p>
          <span className="blog-card-cta">Read article →</span>
        </div>
      </a>
    </article>
  );
}

export default function BlogIndex({ posts: all = posts }: { posts?: Post[] }) {
  const [featured, ...rest] = all;
  return (
    <section className="blog-index" id="latest">
      <div className="blog-index-inner">
        <header className="section-head blog-index-head">
          <div>
            <div className="num">i. — Latest</div>
            <h2>
              The <em>most recent</em> post.
            </h2>
          </div>
          <p className="lede">
            We publish around once a month — long-form articles on cosmetic
            dentistry, implants, family care, and the practical day-to-day of
            keeping a healthy smile.
          </p>
        </header>

        {/* Featured (most recent) post */}
        <PostCard post={featured} featured />

        {/* Remaining posts in 3-col grid */}
        <header className="section-head blog-index-head blog-index-head--archive">
          <div>
            <div className="num">ii. — Archive</div>
            <h2>
              Earlier <em>articles.</em>
            </h2>
          </div>
          <p className="lede">
            {rest.length} previously published posts, most recent first.
          </p>
        </header>

        <div className="blog-grid">
          {rest.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
