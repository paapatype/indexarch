"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import BlogCard from "@/components/ui/BlogCard";
import BlogDiagram from "@/components/ui/BlogDiagram";
import {
  CostBentoGrid,
  BuyerComment,
  AlternativeBentoGrid,
  IndustryGrid,
  ThreeDDecisionGrid,
} from "@/components/ui/BlogBento";
import type { BlogPost } from "@/lib/constants";

function Figure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-12">
      <div className="relative aspect-[1440/900] w-full border border-rule bg-surface-sunken overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 768px, 100vw"
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 font-mono text-xs tracking-wide text-ink-faint">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function renderContent(block: string) {
  // Figure \u2014 markdown image syntax: ![alt](src) or ![alt](src "caption")
  if (block.startsWith("![")) {
    const m = block.match(/^!\[([^\]]*)\]\(([^"\s)]+)(?:\s+"([^"]+)")?\)\s*$/);
    if (m) {
      const [, alt, src, caption] = m;
      return <Figure src={src} alt={alt} caption={caption} />;
    }
  }

  // Inline diagram \u2014 [DIAGRAM:name]
  if (block.startsWith("[DIAGRAM:")) {
    const m = block.match(/^\[DIAGRAM:([a-z0-9-]+)\]\s*$/);
    if (m) return <BlogDiagram name={m[1]} />;
  }

  // Editorial bento blocks. New marker types are added in this dispatch
  // so the markdown-ish content arrays in lib/constants.ts can drop
  // visual breaks in without escaping JSX.
  if (block.startsWith("[BENTO:")) {
    const m = block.match(/^\[BENTO:([a-z0-9-]+)\]\s*$/);
    if (m) {
      if (m[1] === "pdf-cost-grid") return <CostBentoGrid />;
      if (m[1] === "alternatives") return <AlternativeBentoGrid />;
      if (m[1] === "industry-grid") return <IndustryGrid />;
      if (m[1] === "3d-decision") return <ThreeDDecisionGrid />;
    }
  }

  // Buyer-comment box \u2014 quote text lives between the colons so the
  // content is still authored in plain markdown-like syntax.
  // [QUOTE:buyer-search:I don\u2019t want to email a sales rep ...]
  if (block.startsWith("[QUOTE:")) {
    const m = block.match(/^\[QUOTE:([a-z0-9-]+):([\s\S]+)\]\s*$/);
    if (m && m[1] === "buyer-search") {
      return <BuyerComment quote={m[2].trim()} />;
    }
  }

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

        {/* Cover image — wider than the body column, sits between the
            post hero and the article copy. Only rendered when the post
            declares one. */}
        {post.coverImage && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-5xl px-6 lg:px-8 mb-12 lg:mb-16"
          >
            <div className="relative aspect-[16/8] w-full overflow-hidden border border-rule bg-surface-raised">
              <Image
                src={post.coverImage.src}
                alt={post.coverImage.alt}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        )}

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

          {/* Post CTA — echoes the homepage methodology framing
              ("we don't replace your catalogue, we unpack it") instead
              of contradicting it. */}
          <div className="mt-16 border border-rule p-8 lg:p-10 bg-surface-sunken text-center">
            <h3 className="font-serif text-2xl text-ink mb-3">
              Let&rsquo;s unpack your catalogue.
            </h3>
            <p className="text-sm text-ink-muted mb-6 max-w-md mx-auto">
              Send us your PDF — we&rsquo;ll build a free 5-product demo
              from the structure already inside it. No contracts, no
              credit card required.
            </p>
            <Button variant="primary" href="/#contact">
              Get a free 5-product demo
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
