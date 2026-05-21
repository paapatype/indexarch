"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SOLUTION, INDUSTRIES } from "@/lib/constants";

// ─── Feature icons (Smart Filtering, Compare, Pre-Qualified) ──────

const featureIcons = [
  <svg key="filter" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
    <polygon points="8,12 56,12 36,36" />
    <line x1="36" y1="36" x2="36" y2="52" />
    <line x1="28" y1="36" x2="28" y2="48" />
    <circle cx="48" cy="44" r="8" />
    <line x1="48" y1="40" x2="48" y2="48" />
    <line x1="44" y1="44" x2="52" y2="44" />
  </svg>,
  <svg key="compare" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
    <rect x="6" y="12" width="22" height="40" rx="1" />
    <rect x="36" y="12" width="22" height="40" rx="1" />
    <line x1="32" y1="18" x2="32" y2="46" strokeDasharray="2 3" />
    <line x1="12" y1="24" x2="22" y2="24" />
    <line x1="12" y1="30" x2="20" y2="30" />
    <line x1="42" y1="24" x2="52" y2="24" />
    <line x1="42" y1="30" x2="50" y2="30" />
    <polyline points="29,32 32,28 35,32" />
  </svg>,
  <svg key="inquiry" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
    <rect x="12" y="8" width="40" height="48" rx="1" />
    <polyline points="20,22 24,26 30,18" />
    <line x1="34" y1="22" x2="44" y2="22" />
    <polyline points="20,34 24,38 30,30" />
    <line x1="34" y1="34" x2="44" y2="34" />
    <rect x="20" y="42" width="10" height="6" rx="1" />
    <line x1="34" y1="45" x2="44" y2="45" />
  </svg>,
];

// ─── Industry icons ───────────────────────────────────────────────

const industryIcons = [
  // Fasteners — hexagonal bolt head
  <svg key="fastener" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
    <polygon points="32,8 52,18 52,38 32,48 12,38 12,18" />
    <circle cx="32" cy="28" r="10" />
    <line x1="32" y1="48" x2="32" y2="58" />
    <line x1="26" y1="52" x2="38" y2="52" />
    <line x1="26" y1="55" x2="38" y2="55" />
  </svg>,
  // Tiles — grid of squares with depth
  <svg key="tiles" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
    <rect x="8" y="8" width="22" height="22" />
    <rect x="34" y="8" width="22" height="22" />
    <rect x="8" y="34" width="22" height="22" />
    <rect x="34" y="34" width="22" height="22" />
    <line x1="8" y1="19" x2="30" y2="19" opacity="0.4" />
    <line x1="19" y1="8" x2="19" y2="30" opacity="0.4" />
    <line x1="45" y1="34" x2="45" y2="56" opacity="0.4" />
  </svg>,
  // Profiles — cross-section
  <svg key="profile" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
    <rect x="8" y="16" width="48" height="8" />
    <rect x="16" y="24" width="8" height="24" />
    <rect x="40" y="24" width="8" height="24" />
    <rect x="8" y="48" width="48" height="8" />
    <line x1="24" y1="28" x2="40" y2="28" strokeDasharray="2 3" opacity="0.5" />
    <line x1="24" y1="36" x2="40" y2="36" strokeDasharray="2 3" opacity="0.5" />
    <line x1="24" y1="44" x2="40" y2="44" strokeDasharray="2 3" opacity="0.5" />
  </svg>,
  // Connectors — circular connector with pins
  <svg key="connector" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
    <circle cx="32" cy="32" r="22" />
    <circle cx="32" cy="32" r="16" />
    <circle cx="32" cy="22" r="2.5" />
    <circle cx="24" cy="28" r="2.5" />
    <circle cx="40" cy="28" r="2.5" />
    <circle cx="26" cy="37" r="2.5" />
    <circle cx="38" cy="37" r="2.5" />
    <circle cx="32" cy="43" r="2" />
    <line x1="20" y1="10" x2="16" y2="6" strokeWidth="1" opacity="0.4" />
    <line x1="44" y1="10" x2="48" y2="6" strokeWidth="1" opacity="0.4" />
  </svg>,
];

// ─── Section ──────────────────────────────────────────────────────

export default function SolutionSection() {
  return (
    <section className="relative py-section hairline-top">
      <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
        {/* Unified header — "what it does" + "who it's for" framed as
            one statement. Asymmetric grid like the methodology header
            so the typography reads consistently across the page. */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mb-16 lg:mb-20 items-start"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} className="lg:col-span-7">
            <span className="block font-mono text-xs tracking-widest uppercase text-ink-faint mb-4">
              What you get
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl text-ink leading-[1.15]">
              {SOLUTION.heading}
            </h2>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="lg:col-span-5 lg:pt-8 text-base lg:text-lg text-ink-muted leading-relaxed max-w-md"
            style={{ textWrap: "pretty" as never }}
          >
            Built for how engineers and architects actually buy — and
            for the manufacturers who export or serve technical buyers.
            Search, compare, and submit a pre-qualified order without
            ever opening a PDF.
          </motion.p>
        </motion.div>

        {/* Two halves: LEFT — what it does (3 features). RIGHT — who
            it's for (4 industries). A vertical hairline divides them
            so the section reads as "the system on the left, the
            audience on the right". */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-rule border border-rule"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* LEFT HALF — What it does */}
          <motion.div
            variants={fadeUp}
            className="bg-surface p-10 lg:p-12 flex flex-col"
          >
            <span className="block font-mono text-xs tracking-widest uppercase text-ink-faint mb-10 lg:mb-12">
              What it does
            </span>
            <div className="flex flex-col gap-10 lg:gap-12">
              {SOLUTION.cards.map((card, i) => (
                <article
                  key={card.title}
                  className={`flex flex-col gap-3 ${
                    i > 0 ? "pt-10 lg:pt-12 border-t border-rule" : ""
                  }`}
                >
                  <div className="h-9 w-9 mb-2 text-ink-faint">
                    {featureIcons[i]}
                  </div>
                  <h3 className="font-serif text-xl lg:text-2xl text-ink leading-snug">
                    {card.title}
                  </h3>
                  <p
                    className="text-sm lg:text-base text-ink-muted leading-relaxed"
                    style={{ textWrap: "pretty" as never }}
                  >
                    {card.description}
                  </p>
                </article>
              ))}
            </div>
          </motion.div>

          {/* RIGHT HALF — Who it's for */}
          <motion.div
            variants={fadeUp}
            className="bg-surface p-10 lg:p-12 flex flex-col"
          >
            <span className="block font-mono text-xs tracking-widest uppercase text-ink-faint mb-10 lg:mb-12">
              Who it&rsquo;s for
            </span>
            <p
              className="text-sm lg:text-base text-ink-muted leading-relaxed mb-10 lg:mb-12 max-w-md"
              style={{ textWrap: "pretty" as never }}
            >
              Built for manufacturers who export or serve technical
              buyers — across the kinds of products where every spec
              decision matters.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-rule border border-rule">
              {INDUSTRIES.cards.map((card, i) => (
                <article
                  key={card.title}
                  className="bg-surface p-6 lg:p-7 flex flex-col gap-3"
                >
                  <div className="h-7 w-7 text-ink-faint">
                    {industryIcons[i]}
                  </div>
                  <h4 className="font-serif text-base lg:text-lg text-ink leading-snug">
                    {card.title}
                  </h4>
                </article>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Footnote — the device note sits flush below the bento
            grid as a quiet closer. */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 lg:mt-12 font-mono text-xs text-ink-faint tracking-wide text-center"
        >
          {SOLUTION.deviceNote}
        </motion.p>
      </div>
    </section>
  );
}
