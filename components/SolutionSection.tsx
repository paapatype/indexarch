"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SOLUTION } from "@/lib/constants";

// Geometric SVG icons for solution cards. Same line-art language as the
// rest of the site — currentColor strokes, varied scale, no fill.
const icons = [
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

export default function SolutionSection() {
  return (
    <section className="relative py-section-sm lg:py-section">
      <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
        {/* Header — asymmetric, matches Methodology rhythm */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mb-16 lg:mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} className="lg:col-span-6">
            <span className="block font-mono text-xs tracking-widest uppercase text-ink-faint mb-4">
              {SOLUTION.eyebrow}
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl text-ink leading-tight">
              {SOLUTION.heading}
            </h2>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="lg:col-span-6 text-lg text-ink-muted leading-relaxed lg:pt-14"
          >
            {SOLUTION.subheading}
          </motion.p>
        </motion.div>

        {/* Three feature beats — hairline grid, mirrors Methodology */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-rule border border-rule"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {SOLUTION.cards.map((card, i) => (
            <motion.article
              key={card.title}
              variants={fadeUp}
              className="bg-surface p-8 lg:p-10 group"
            >
              <div className="flex items-baseline gap-5 mb-6">
                <div className="h-10 w-10 text-ink-faint transition-colors duration-500 group-hover:text-ink">
                  {icons[i]}
                </div>
                <span
                  className="h-px flex-1 bg-rule transition-colors duration-500 group-hover:bg-ink-faint"
                  aria-hidden
                />
              </div>
              <h3 className="font-serif text-2xl lg:text-[1.65rem] text-ink leading-snug mb-4">
                {card.title}
              </h3>
              <p className="text-base text-ink-muted leading-relaxed">
                {card.description}
              </p>
            </motion.article>
          ))}
        </motion.div>

        {/* Device note — quiet aside */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 font-mono text-xs text-ink-faint tracking-wide text-center"
        >
          {SOLUTION.deviceNote}
        </motion.p>
      </div>
    </section>
  );
}
