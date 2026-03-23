"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BlogCard from "@/components/ui/BlogCard";
import { BLOG_POSTS } from "@/lib/constants";

export default function BlogListClient() {
  return (
    <>
      <Nav />
      <main>
        {/* Blog Hero */}
        <section className="pt-[calc(var(--header-height)+4rem)] pb-12 lg:pb-16">
          <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.span
                variants={fadeUp}
                className="block font-mono text-xs tracking-widest uppercase text-ink-muted mb-4"
              >
                Blog
              </motion.span>
              <motion.h1
                variants={fadeUp}
                className="font-serif text-5xl lg:text-6xl text-ink leading-tight max-w-2xl"
              >
                Insights on B2B catalogs
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="mt-6 text-lg text-ink-muted max-w-xl"
              >
                Practical guides for manufacturers ready to sell smarter online.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Hairline */}
        <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
          <div className="hairline-bottom" />
        </div>

        {/* Blog Grid */}
        <section className="py-12 lg:py-20">
          <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {BLOG_POSTS.map((post) => (
                <BlogCard
                  key={post.slug}
                  slug={post.slug}
                  tag={post.tag}
                  title={post.title}
                  excerpt={post.excerpt}
                  readTime={post.readTime}
                  date={post.date}
                />
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
