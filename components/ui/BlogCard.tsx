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

// Topic-specific tile illustrations. One clear idea per tag, dead simple
// line-art at consistent stroke weight so a glance is enough to read it.
//   Strategy  — line graph trending down (the cost of a bad catalogue)
//   Case Study — PDF → arrow → search bar (the K&K transformation)
//   Technical — cube on a phone, rotation arc (interactive 3D)
//   Industry  — hex bolt + signal arcs (fasteners going digital)
function BlogTileArt({ tag }: { tag: string }) {
  const t = tag.toLowerCase();
  const className =
    "w-36 h-22 lg:w-44 lg:h-26 text-ink-faint transition-transform duration-500 group-hover:scale-[1.04] group-hover:text-ink";
  const stroke = "currentColor";

  if (t === "case study") {
    return (
      <svg viewBox="0 0 200 120" fill="none" stroke={stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        {/* PDF on the left */}
        <rect x="34" y="38" width="34" height="44" />
        <line x1="42" y1="50" x2="60" y2="50" strokeWidth="0.7" opacity="0.55" />
        <line x1="42" y1="56" x2="58" y2="56" strokeWidth="0.7" opacity="0.55" />
        <line x1="42" y1="62" x2="60" y2="62" strokeWidth="0.7" opacity="0.55" />
        <line x1="42" y1="68" x2="54" y2="68" strokeWidth="0.7" opacity="0.55" />
        {/* dog ear */}
        <path d="M62 38 L68 44 L62 44 Z" strokeWidth="0.9" opacity="0.7" />
        {/* arrow */}
        <line x1="78" y1="60" x2="100" y2="60" />
        <polyline points="94,55 100,60 94,65" />
        {/* Search bar on the right */}
        <rect x="108" y="50" width="60" height="14" rx="7" />
        <circle cx="116" cy="57" r="2.6" strokeWidth="0.9" />
        <line x1="118" y1="59" x2="121" y2="62" strokeWidth="0.9" />
        <line x1="126" y1="57" x2="158" y2="57" strokeWidth="0.7" opacity="0.45" />
        {/* filter chips below the bar */}
        <rect x="108" y="70" width="14" height="6" rx="3" strokeWidth="0.7" opacity="0.55" />
        <rect x="126" y="70" width="14" height="6" rx="3" strokeWidth="0.7" opacity="0.55" />
        <rect x="144" y="70" width="14" height="6" rx="3" strokeWidth="0.7" opacity="0.55" />
      </svg>
    );
  }

  if (t === "technical") {
    return (
      <svg viewBox="0 0 200 120" fill="none" stroke={stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        {/* Phone frame */}
        <rect x="62" y="20" width="76" height="84" rx="6" />
        <line x1="92" y1="26" x2="108" y2="26" strokeWidth="0.7" opacity="0.55" />
        {/* Screen inset */}
        <rect x="68" y="32" width="64" height="62" strokeWidth="0.7" opacity="0.4" />
        {/* 3D cube on screen */}
        <polygon points="86,52 100,44 114,52 114,70 100,78 86,70" strokeWidth="0.9" />
        <line x1="86" y1="52" x2="100" y2="60" strokeWidth="0.7" opacity="0.5" />
        <line x1="114" y1="52" x2="100" y2="60" strokeWidth="0.7" opacity="0.5" />
        <line x1="100" y1="60" x2="100" y2="78" strokeWidth="0.7" opacity="0.5" />
        {/* Rotation arc with arrow */}
        <path d="M122 88 Q140 88 144 70" strokeWidth="0.9" opacity="0.75" />
        <polyline points="139,75 144,70 148,75" strokeWidth="0.9" opacity="0.75" />
      </svg>
    );
  }

  if (t === "industry") {
    return (
      <svg viewBox="0 0 200 120" fill="none" stroke={stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        {/* Hex bolt head */}
        <polygon points="50,42 66,32 82,42 82,62 66,72 50,62" strokeWidth="1.1" />
        <circle cx="66" cy="52" r="4" strokeWidth="0.7" opacity="0.5" />
        {/* Threaded shaft */}
        <line x1="66" y1="72" x2="66" y2="100" strokeWidth="1.1" />
        <line x1="60" y1="78" x2="72" y2="78" strokeWidth="0.7" opacity="0.5" />
        <line x1="60" y1="84" x2="72" y2="84" strokeWidth="0.7" opacity="0.5" />
        <line x1="60" y1="90" x2="72" y2="90" strokeWidth="0.7" opacity="0.5" />
        <line x1="60" y1="96" x2="72" y2="96" strokeWidth="0.7" opacity="0.5" />
        {/* Wireless signal arcs on the right */}
        <circle cx="118" cy="80" r="1.6" fill={stroke} />
        <path d="M118 70 Q132 70 138 56" strokeWidth="0.9" opacity="0.85" />
        <path d="M118 60 Q142 60 152 38" strokeWidth="0.9" opacity="0.6" />
        <path d="M118 50 Q150 50 164 22" strokeWidth="0.9" opacity="0.4" />
        {/* Subtle dashed gap between bolt and signal */}
        <line x1="86" y1="58" x2="116" y2="76" strokeDasharray="2 3" strokeWidth="0.7" opacity="0.4" />
      </svg>
    );
  }

  // Default + "strategy" — line graph trending down
  return (
    <svg viewBox="0 0 200 120" fill="none" stroke={stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {/* axis */}
      <line x1="40" y1="32" x2="40" y2="92" strokeWidth="0.7" opacity="0.4" />
      <line x1="40" y1="92" x2="170" y2="92" strokeWidth="0.7" opacity="0.4" />
      {/* y-axis tick marks */}
      <line x1="38" y1="48" x2="40" y2="48" strokeWidth="0.6" opacity="0.4" />
      <line x1="38" y1="64" x2="40" y2="64" strokeWidth="0.6" opacity="0.4" />
      <line x1="38" y1="80" x2="40" y2="80" strokeWidth="0.6" opacity="0.4" />
      {/* downward data line */}
      <polyline points="50,42 78,52 106,62 134,76 162,88" strokeWidth="1.2" />
      <circle cx="50" cy="42" r="1.8" fill={stroke} />
      <circle cx="78" cy="52" r="1.8" fill={stroke} opacity="0.85" />
      <circle cx="106" cy="62" r="1.8" fill={stroke} opacity="0.7" />
      <circle cx="134" cy="76" r="1.8" fill={stroke} opacity="0.55" />
      <circle cx="162" cy="88" r="1.8" fill={stroke} opacity="0.4" />
      {/* down arrow at the trailing point */}
      <line x1="162" y1="88" x2="172" y2="100" strokeWidth="1" opacity="0.7" />
      <polyline points="167,98 172,100 170,95" strokeWidth="1" opacity="0.7" />
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
