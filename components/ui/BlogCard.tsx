"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { fadeUp } from "@/lib/animations";

interface BlogCardProps {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  compact?: boolean;
}

export default function BlogCard({
  slug,
  tag,
  title,
  excerpt,
  readTime,
  date,
  compact = false,
}: BlogCardProps) {
  return (
    <motion.article variants={fadeUp}>
      <Link
        href={`/blog/${slug}`}
        className="group block border border-rule bg-surface-raised transition-shadow duration-300 hover:shadow-card-hover"
      >
        {/* Placeholder image area */}
        <div className="relative aspect-[16/9] bg-sand-200 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Geometric placeholder — different per tag */}
            <svg
              viewBox="0 0 200 120"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="w-24 h-16 text-sand-400 transition-transform duration-500 group-hover:scale-110"
              aria-hidden="true"
            >
              <ellipse cx="100" cy="60" rx="80" ry="40" opacity="0.5" />
              <ellipse cx="100" cy="60" rx="55" ry="28" opacity="0.4" transform="rotate(15 100 60)" />
              <ellipse cx="100" cy="60" rx="30" ry="16" opacity="0.3" transform="rotate(-10 100 60)" />
              <circle cx="100" cy="60" r="3" fill="currentColor" opacity="0.5" />
            </svg>
          </div>
        </div>

        {/* Card body */}
        <div className={compact ? "p-5" : "p-6 lg:p-8"}>
          <span className="inline-block font-mono text-xs tracking-widest uppercase text-ink-muted mb-3">
            {tag}
          </span>
          <h3
            className={`font-serif text-ink leading-snug group-hover:text-accent transition-colors duration-200 ${
              compact ? "text-lg mb-2" : "text-xl lg:text-2xl mb-3"
            }`}
          >
            {title}
          </h3>
          {!compact && (
            <p className="text-sm text-ink-muted leading-relaxed mb-4 line-clamp-2">
              {excerpt}
            </p>
          )}
          <div className="flex items-center gap-3 font-mono text-xs text-ink-faint">
            <span>{readTime}</span>
            <span className="text-rule">|</span>
            <span>{date}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
