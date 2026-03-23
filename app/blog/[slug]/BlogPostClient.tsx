"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import BlogCard from "@/components/ui/BlogCard";
import type { BlogPost } from "@/lib/constants";

function renderContent(block: string) {
  // Headings
  if (block.startsWith("## ")) {
    return (
      <h2 className="font-serif text-3xl text-ink mt-12 mb-4">
        {block.slice(3)}
      </h2>
    );
  }
  if (block.startsWith("### ")) {
    return (
      <h3 className="font-sans text-lg font-semibold text-ink mt-8 mb-3">
        {block.slice(4)}
      </h3>
    );
  }

  // Blockquote
  if (block.startsWith("> ")) {
    return (
      <blockquote className="pull-quote my-8">
        {block.slice(2).replace(/^"/, "\u201C").replace(/"$/, "\u201D")}
      </blockquote>
    );
  }

  // List
  if (block.startsWith("- ")) {
    const items = block.split("\n").map((line) => line.replace(/^- /, ""));
    return (
      <ul className="space-y-3 my-6 ml-1">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-ink-light leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-faint" />
            <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
          </li>
        ))}
      </ul>
    );
  }

  // Paragraph
  return (
    <p
      className="text-ink-light leading-[1.8] my-5"
      dangerouslySetInnerHTML={{ __html: formatInline(block) }}
    />
  );
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-ink font-medium">$1</strong>')
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/₹/g, "₹");
}

export default function BlogPostClient({
  post,
  related,
}: {
  post: BlogPost;
  related: BlogPost[];
}) {
  return (
    <>
      <Nav />
      <main>
        {/* Post Hero */}
        <section className="pt-[calc(var(--header-height)+4rem)] pb-10 lg:pb-14">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.span
                variants={fadeUp}
                className="inline-block font-mono text-xs tracking-widest uppercase text-ink-muted mb-4"
              >
                {post.tag}
              </motion.span>
              <motion.h1
                variants={fadeUp}
                className="font-serif text-4xl lg:text-5xl text-ink leading-tight"
              >
                {post.title}
              </motion.h1>
              <motion.div
                variants={fadeUp}
                className="mt-6 flex flex-wrap items-center gap-3 font-mono text-sm text-ink-muted"
              >
                <span>{post.readTime}</span>
                <span className="text-rule">&middot;</span>
                <span>{post.date}</span>
                <span className="text-rule">&middot;</span>
                <span>By {post.author.name}</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Hairline */}
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="hairline-bottom" />
        </div>

        {/* Post Content */}
        <motion.article
          className="mx-auto max-w-3xl px-6 lg:px-8 py-10 lg:py-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {post.content.map((block, i) => (
            <div key={i}>{renderContent(block)}</div>
          ))}

          {/* Post CTA */}
          <div className="mt-16 border border-rule p-8 lg:p-10 bg-surface-sunken text-center">
            <h3 className="font-serif text-2xl text-ink mb-3">
              Ready to replace your PDF catalog?
            </h3>
            <p className="text-sm text-ink-muted mb-6 max-w-md mx-auto">
              Get a free 10-product demo built with your actual products. No
              cost, no commitment.
            </p>
            <Button variant="primary" href="/#contact">
              Get Free Demo →
            </Button>
          </div>

          {/* Author */}
          <div className="mt-14 flex items-start gap-5 border-t border-rule pt-8">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-rule font-mono text-sm text-ink-muted">
              {post.author.initials}
            </div>
            <div>
              <p className="font-sans text-sm font-semibold text-ink">
                {post.author.name}
              </p>
              <p className="text-sm text-ink-muted leading-relaxed mt-1">
                {post.author.bio}
              </p>
            </div>
          </div>
        </motion.article>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="py-12 lg:py-20 bg-surface-sunken">
            <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
              <h3 className="font-serif text-2xl text-ink mb-8">
                Related articles
              </h3>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                {related.map((r) => (
                  <BlogCard
                    key={r.slug}
                    slug={r.slug}
                    tag={r.tag}
                    title={r.title}
                    excerpt={r.excerpt}
                    readTime={r.readTime}
                    date={r.date}
                    compact
                  />
                ))}
              </motion.div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
