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

// Topic-specific tile illustrations — same line-art language as the rest
// of the site (low-opacity strokes at currentColor, subtle motion). The
// tag drives which one appears; unknown tags fall back to the layered
// shape so any new post still gets art.
function BlogTileArt({ tag }: { tag: string }) {
  const t = tag.toLowerCase();
  const className =
    "w-32 h-20 lg:w-40 lg:h-24 text-ink-faint transition-transform duration-500 group-hover:scale-105";

  if (t === "case study") {
    // Stack of profile cross-sections — nods to K&K's WPC profiles
    return (
      <svg viewBox="0 0 200 120" fill="none" stroke="currentColor" strokeWidth="0.7" className={className} aria-hidden="true">
        {/* Fluted profile, slight tilt */}
        <g transform="translate(28 72) rotate(-6)" opacity="0.55">
          <rect x="0" y="0" width="120" height="14" />
          <line x1="20" y1="0" x2="20" y2="14" />
          <line x1="40" y1="0" x2="40" y2="14" />
          <line x1="60" y1="0" x2="60" y2="14" />
          <line x1="80" y1="0" x2="80" y2="14" />
          <line x1="100" y1="0" x2="100" y2="14" />
        </g>
        {/* Hollow box profile */}
        <g transform="translate(36 50)" opacity="0.7">
          <rect x="0" y="0" width="80" height="18" />
          <rect x="6" y="4" width="32" height="10" opacity="0.5" />
          <rect x="42" y="4" width="32" height="10" opacity="0.5" />
        </g>
        {/* C-channel */}
        <g transform="translate(54 24)" opacity="0.55">
          <path d="M0 0 L0 14 L40 14 L40 0 M6 0 L6 8 L34 8 L34 0" />
        </g>
        {/* Top index marker */}
        <g opacity="0.4">
          <line x1="20" y1="14" x2="180" y2="14" strokeWidth="0.4" />
          <line x1="20" y1="14" x2="20" y2="10" strokeWidth="0.4" />
          <line x1="180" y1="14" x2="180" y2="10" strokeWidth="0.4" />
        </g>
      </svg>
    );
  }

  if (t === "technical") {
    // Wireframe cube — slowly rotating, suggests interactive 3D
    return (
      <svg viewBox="0 0 200 120" fill="none" stroke="currentColor" strokeWidth="0.6" className={className} aria-hidden="true">
        <motion.g
          style={{ transformOrigin: "100px 60px" }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {/* Front face */}
          <rect x="68" y="38" width="48" height="48" opacity="0.55" />
          {/* Back face (offset) */}
          <rect x="86" y="24" width="48" height="48" opacity="0.4" />
          {/* Connecting edges */}
          <line x1="68" y1="38" x2="86" y2="24" opacity="0.4" />
          <line x1="116" y1="38" x2="134" y2="24" opacity="0.4" />
          <line x1="68" y1="86" x2="86" y2="72" opacity="0.4" />
          <line x1="116" y1="86" x2="134" y2="72" opacity="0.4" />
        </motion.g>
        {/* Spec annotations — static */}
        <g opacity="0.35">
          <line x1="42" y1="32" x2="58" y2="32" />
          <line x1="42" y1="32" x2="42" y2="28" />
          <line x1="42" y1="32" x2="46" y2="34" />
          <line x1="146" y1="92" x2="160" y2="92" />
          <line x1="160" y1="92" x2="160" y2="88" />
          <line x1="160" y1="92" x2="156" y2="94" />
        </g>
      </svg>
    );
  }

  // Default + "strategy" — stack of PDF pages (the cost of static catalogues)
  return (
    <svg viewBox="0 0 200 120" fill="none" stroke="currentColor" strokeWidth="0.7" className={className} aria-hidden="true">
      {/* Back pages, fanned */}
      <g transform="translate(56 24) rotate(-6)" opacity="0.4">
        <rect x="0" y="0" width="56" height="74" />
        <line x1="6" y1="10" x2="44" y2="10" strokeWidth="0.4" />
        <line x1="6" y1="14" x2="40" y2="14" strokeWidth="0.4" />
        <line x1="6" y1="18" x2="46" y2="18" strokeWidth="0.4" />
      </g>
      <g transform="translate(64 22) rotate(-2)" opacity="0.55">
        <rect x="0" y="0" width="56" height="74" fill="currentColor" fillOpacity="0.04" />
        <line x1="6" y1="10" x2="44" y2="10" strokeWidth="0.4" />
        <line x1="6" y1="14" x2="40" y2="14" strokeWidth="0.4" />
        <line x1="6" y1="18" x2="46" y2="18" strokeWidth="0.4" />
      </g>
      {/* Top page */}
      <g transform="translate(72 20)" opacity="0.85">
        <rect x="0" y="0" width="56" height="74" fill="currentColor" fillOpacity="0.05" />
        <rect x="6" y="6" width="14" height="4" strokeWidth="0.4" opacity="0.6" />
        <line x1="6" y1="16" x2="48" y2="16" strokeWidth="0.4" />
        <line x1="6" y1="20" x2="44" y2="20" strokeWidth="0.4" />
        <line x1="6" y1="24" x2="46" y2="24" strokeWidth="0.4" />
        <rect x="6" y="30" width="44" height="14" strokeWidth="0.35" opacity="0.4" />
        <line x1="6" y1="50" x2="48" y2="50" strokeWidth="0.4" opacity="0.6" />
        <line x1="6" y1="54" x2="42" y2="54" strokeWidth="0.4" opacity="0.6" />
        <line x1="6" y1="58" x2="46" y2="58" strokeWidth="0.4" opacity="0.6" />
      </g>
    </svg>
  );
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
        {/* Tile illustration — topic-specific */}
        <div className="relative aspect-[16/9] bg-surface-sunken overflow-hidden border-b border-rule">
          <div className="absolute inset-0 flex items-center justify-center">
            <BlogTileArt tag={tag} />
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
