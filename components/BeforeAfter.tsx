"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { BEFORE_AFTER } from "@/lib/constants";

// Stylised catalogue UI — same line-art language as ProcessIllustration.
// Larger so it holds the right side of the before/after at parity with the
// PDF stack on the left. Subtle motion on the search caret + a slow rotate
// on the 3D shapes inside each card so the panel feels alive.
function CatalogueMockup() {
  return (
    <svg viewBox="0 0 200 260" fill="none" className="w-full h-full text-ink-faint" aria-hidden="true">
      {/* Browser frame */}
      <rect x="2" y="2" width="196" height="256" rx="3" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
      {/* Title bar */}
      <line x1="2" y1="14" x2="198" y2="14" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
      <circle cx="8" cy="8" r="1.4" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
      <circle cx="13" cy="8" r="1.4" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
      <circle cx="18" cy="8" r="1.4" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
      {/* URL bar */}
      <rect x="40" y="5" width="120" height="6" rx="3" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
      <line x1="46" y1="8" x2="80" y2="8" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />

      {/* Search bar with blinking caret */}
      <g transform="translate(0, 22)">
        <rect x="8" y="0" width="184" height="10" rx="5" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
        <circle cx="16" cy="5" r="2" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        <line x1="17.5" y1="6.5" x2="19.5" y2="8.5" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        <line x1="24" y1="5" x2="58" y2="5" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
        <motion.line
          x1="60" y1="2.5" x2="60" y2="7.5"
          stroke="currentColor" strokeWidth="0.6"
          animate={{ opacity: [0, 0.7, 0.7, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, times: [0, 0.1, 0.5, 0.6] }}
        />
      </g>

      {/* Filter sidebar — chips */}
      <g transform="translate(8, 40)">
        <line x1="0" y1="0" x2="22" y2="0" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(0, ${5 + i * 9})`}>
            <rect x="0" y="0" width="44" height="6" rx="3" stroke="currentColor" strokeWidth="0.4" opacity={i === 1 ? 0.7 : 0.3} fill={i === 1 ? "currentColor" : "none"} fillOpacity={i === 1 ? 0.06 : 0} />
            <circle cx="4" cy="3" r="1.2" stroke="currentColor" strokeWidth="0.4" opacity={i === 1 ? 0.6 : 0.35} fill={i === 1 ? "currentColor" : "none"} fillOpacity={i === 1 ? 0.6 : 0} />
            <line x1="9" y1="3" x2={i === 1 ? 32 : 24 + (i % 3) * 4} y2="3" stroke="currentColor" strokeWidth="0.35" opacity="0.4" />
          </g>
        ))}
      </g>

      {/* Product grid — 2 columns × 3 rows */}
      <g transform="translate(60, 40)">
        {[0, 1, 2].flatMap((row) =>
          [0, 1].map((col) => {
            const i = row * 2 + col;
            const cx = col * 68 + 33;
            const cy = row * 56 + 26;
            return (
              <g key={i} transform={`translate(${col * 68}, ${row * 56})`}>
                <rect x="0" y="0" width="64" height="52" rx="2" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                {/* 3D viewport */}
                <rect x="3" y="3" width="58" height="28" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
                {/* Slowly rotating shape inside the viewport — different per cell */}
                <motion.g
                  style={{ transformOrigin: `${cx}px ${cy - 9}px` }}
                  animate={{ rotate: i % 2 === 0 ? [0, 360] : [0, -360] }}
                  transition={{ duration: 16 + (i % 3) * 4, repeat: Infinity, ease: "linear" }}
                >
                  {i % 3 === 0 && (
                    <rect x={cx - 6} y={cy - 15} width="12" height="12" rx="1" stroke="currentColor" strokeWidth="0.5" opacity="0.55" />
                  )}
                  {i % 3 === 1 && (
                    <polygon
                      points={`${cx - 7},${cy - 5} ${cx + 7},${cy - 5} ${cx + 8},${cy - 9} ${cx},${cy - 14} ${cx - 8},${cy - 9}`}
                      stroke="currentColor"
                      strokeWidth="0.5"
                      opacity="0.55"
                    />
                  )}
                  {i % 3 === 2 && (
                    <>
                      <circle cx={cx} cy={cy - 9} r="6" stroke="currentColor" strokeWidth="0.5" opacity="0.55" />
                      <circle cx={cx} cy={cy - 9} r="2.5" stroke="currentColor" strokeWidth="0.4" opacity="0.4" />
                    </>
                  )}
                </motion.g>
                {/* Title + spec line */}
                <line x1="3" y1="36" x2="36" y2="36" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
                <line x1="3" y1="40" x2="28" y2="40" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
                {/* Rate + CTA */}
                <line x1="3" y1="46" x2="14" y2="46" stroke="currentColor" strokeWidth="0.4" opacity="0.45" />
                <rect x="42" y="44" width="18" height="5" rx="2.5" stroke="currentColor" strokeWidth="0.35" opacity="0.5" fill="currentColor" fillOpacity="0.05" />
              </g>
            );
          })
        )}
      </g>

      {/* Floating order pill at bottom — animates in */}
      <motion.g
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: [0, 0.8, 0.8], y: [4, 0, 0] }}
        transition={{ duration: 2, delay: 1.2, repeat: Infinity, repeatDelay: 6, times: [0, 0.3, 1] }}
      >
        <rect x="40" y="234" width="120" height="14" rx="7" stroke="currentColor" strokeWidth="0.5" opacity="0.7" fill="currentColor" fillOpacity="0.06" />
        <line x1="50" y1="241" x2="118" y2="241" stroke="currentColor" strokeWidth="0.45" opacity="0.5" />
        <polyline points="130,239 134,243 142,236" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      </motion.g>
    </svg>
  );
}

// PDF stack — uses real screenshots of the K&K catalogue, fanned slightly
// like a deck so the multi-page density reads at a glance.
function PdfStack() {
  return (
    <div className="relative w-full h-full">
      {/* Pages stacked back-to-front so page-1 sits on top */}
      {[4, 3, 2, 1].map((n, idx) => {
        const angles = [-7, -3.5, 1.5, 0]; // back pages tilt outward, top page squared up
        const offsets = [
          { x: -22, y: 12 },
          { x: -10, y: 6 },
          { x: 6, y: 2 },
          { x: 0, y: 0 },
        ];
        const o = offsets[idx];
        const isTop = n === 1;
        return (
          <motion.div
            key={n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `translate(${o.x}px, ${o.y}px) rotate(${angles[idx]}deg)`,
              zIndex: idx,
            }}
          >
            <div
              className="relative w-[78%] aspect-[1241/1754] bg-surface-raised border border-rule shadow-card overflow-hidden"
              style={{ filter: isTop ? "none" : "saturate(0.7) brightness(0.95)" }}
            >
              <Image
                src={`/kayu-kov/page-${n}.png`}
                alt={isTop ? "Kayu & Kov original PDF — page 1" : ""}
                fill
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-cover object-top"
                priority={isTop}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function BeforeAfter() {
  return (
    <section className="relative py-section-sm lg:py-section bg-surface-sunken">
      <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mb-14 lg:mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} className="lg:col-span-5">
            <span className="block font-mono text-xs tracking-widest uppercase text-ink-faint mb-4">
              {BEFORE_AFTER.eyebrow}
            </span>
            <h2 className="font-serif text-3xl lg:text-5xl text-ink leading-tight">
              {BEFORE_AFTER.heading}
            </h2>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="lg:col-span-7 text-lg text-ink-muted leading-relaxed lg:pt-12"
          >
            {BEFORE_AFTER.body}
          </motion.p>
        </motion.div>

        {/* Side-by-side panels */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* BEFORE */}
          <motion.div variants={fadeUp} className="flex flex-col">
            <div className="flex items-baseline justify-between mb-5">
              <span className="font-mono text-xs tracking-widest uppercase text-ink-faint">
                Before
              </span>
              <span className="font-mono text-xs text-ink-faint">
                {BEFORE_AFTER.beforeMeta}
              </span>
            </div>
            <div className="relative aspect-[4/5] w-full">
              <PdfStack />
            </div>
            <p className="mt-6 text-sm text-ink-muted">
              {BEFORE_AFTER.beforeLabel}
            </p>
          </motion.div>

          {/* AFTER */}
          <motion.div variants={fadeUp} className="flex flex-col">
            <div className="flex items-baseline justify-between mb-5">
              <span className="font-mono text-xs tracking-widest uppercase text-ink">
                After
              </span>
              <span className="font-mono text-xs text-ink-faint">
                {BEFORE_AFTER.afterMeta}
              </span>
            </div>
            <div className="relative aspect-[4/5] w-full bg-surface-raised border border-rule p-6 lg:p-8 shadow-card">
              <CatalogueMockup />
            </div>
            <p className="mt-6 text-sm text-ink-muted">
              {BEFORE_AFTER.afterLabel}
            </p>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <Link
            href={BEFORE_AFTER.cta.href}
            className="inline-block font-sans text-sm text-ink underline underline-offset-4 decoration-rule hover:decoration-ink transition-colors"
          >
            {BEFORE_AFTER.cta.label}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
