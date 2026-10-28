import Image from "next/image";
import Link from "next/link";
import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { BlogPost as BlogPostData } from "@/lib/blog";
import type { Post } from "@/components/BlogIndex";
import { isUnreleasedPostHref } from "@/lib/publish";
import {
  getServiceLinksForPost,
  getCityLinksForPost,
} from "@/lib/internal-links";

export default function BlogPost({
  post,
  related,
}: {
  post: BlogPostData;
  related: Post[];
}) {
  const cityLinks = getCityLinksForPost(post.slug);
  return (
    <>
      {/* Hero */}
      <section className="post-hero">
        <div className="post-hero-inner">
          <div className="post-hero-text">
            <div className="post-hero-meta">
              <Link href="/blog" className="post-hero-back">
                ← Back to blog
              </Link>
              <span className="post-hero-cat">{post.category}</span>
              <time className="post-hero-date" dateTime={post.dateISO}>
                {post.date}
              </time>
              <span className="post-hero-byline">
                By{" "}
                <Link href="/about/dr-martenson" rel="author">
                  Dr. Jill Martenson
                </Link>
              </span>
            </div>
            <h1 className="post-hero-title">{post.title}</h1>
            <p className="post-hero-excerpt">{post.excerpt}</p>
          </div>
          <div className="post-hero-image">
            <Image
              src={post.image}
              alt={post.alt}
              fill
              sizes="(max-width: 1080px) 50vw, 540px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="post-body">
        <div className="post-body-inner">
          <article className="post-prose">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              // react-markdown's default urlTransform strips any protocol outside
              // http/https/mailto, which silently emptied `tel:` hrefs — click-to-call
              // links in post bodies rendered as <a href="">. Allow tel: through.
              urlTransform={(url) =>
                url.startsWith("tel:") ? url : defaultUrlTransform(url)
              }
              components={{
                // Skip the H1 — the hero already shows the title
                h1: () => null,
                a: ({ href, children, ...rest }) => {
                  // A link to one of our posts that isn't released yet would 404 — show its text only.
                  if (isUnreleasedPostHref(href)) return <>{children}</>;
                  const isExternal =
                    href?.startsWith("http") &&
                    !href.startsWith("https://piedmontdentalbydesign.com");
                  if (isExternal) {
                    return (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        {...rest}
                      >
                        {children}
                        <span className="sr-only"> (opens in a new window)</span>
                      </a>
                    );
                  }
                  return (
                    <a href={href} {...rest}>
                      {children}
                    </a>
                  );
                },
              }}
            >
              {post.body}
            </ReactMarkdown>
          </article>

          <aside className="post-sidebar">
            <div className="post-sidebar-card">
              <span className="num">i. — Quick links</span>
              <h3>Looking for a service?</h3>
              {/* Per-post links from the internal-linking template — the
                  guide points up to the money pages it supports. */}
              <ul>
                {getServiceLinksForPost(post.slug).map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.title} →</Link>
                  </li>
                ))}
                <li>
                  <Link href="/procedures">All procedures →</Link>
                </li>
              </ul>
              {/* City pages for the service this guide supports (#50) */}
              {cityLinks.length > 0 && (
                <>
                  <h3 className="post-sidebar-subhead">In your area</h3>
                  <ul>
                    {cityLinks.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href}>{l.title} →</Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <a href="/contact" className="btn btn-primary post-sidebar-cta">
                Contact us →
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="post-related">
          <div className="post-related-inner">
            <header className="section-head">
              <div>
                <div className="num">ii. — More reading</div>
                <h2>
                  Other <em>articles.</em>
                </h2>
              </div>
              <Link href="/blog" className="post-related-all">
                Browse all posts →
              </Link>
            </header>
            <div className="post-related-grid">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={p.href ?? `/blog/${p.slug}`}
                  className="post-related-card"
                >
                  <div className="post-related-media">
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      sizes="(max-width: 1080px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    <span className="post-related-cat">{p.category}</span>
                  </div>
                  <div className="post-related-body">
                    <time dateTime={p.dateISO}>{p.date}</time>
                    <h3>{p.title}</h3>
                    <span className="post-related-cta">Read article →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
