"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { METHODOLOGY } from "@/lib/constants";

export default function Methodology() {
  return (
    <section
      id="how-it-works"
      className="relative py-section-sm lg:py-section hairline-top"
    >
      <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
        {/* Header — asymmetric, mirrors SolutionSection rhythm */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mb-16 lg:mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} className="lg:col-span-6">
            <span className="block font-mono text-xs tracking-widest uppercase text-ink-faint mb-4">
              {METHODOLOGY.eyebrow}
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl text-ink leading-tight">
              {METHODOLOGY.heading}
            </h2>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="lg:col-span-6 text-lg text-ink-muted leading-relaxed lg:pt-14"
          >
            {METHODOLOGY.subtitle}
          </motion.p>
        </motion.div>

        {/* Beats — 2×2 on desktop, single column on mobile, hairline grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-rule border border-rule"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {METHODOLOGY.beats.map((beat) => (
            <motion.article
              key={beat.number}
              variants={fadeUp}
              className="bg-surface p-8 lg:p-10 group"
            >
              <div className="flex items-baseline gap-5 mb-5">
                <span className="font-mono text-sm text-ink-faint tracking-widest">
                  {beat.number}
                </span>
                <span
                  className="h-px flex-1 bg-rule transition-colors duration-500 group-hover:bg-ink-faint"
                  aria-hidden
                />
              </div>
              <h3 className="font-serif text-2xl lg:text-[1.65rem] text-ink leading-snug mb-4">
                {beat.title}
              </h3>
              <p className="text-base text-ink-muted leading-relaxed">
                {beat.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
