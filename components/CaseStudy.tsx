"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { fadeUp, staggerContainer, slideInLeft } from "@/lib/animations";
import SectionLabel from "./ui/SectionLabel";
import { CASE_STUDY } from "@/lib/constants";

export default function CaseStudy() {
  return (
    <section id="case-study" className="py-section-sm lg:py-section bg-sand-200 relative">
      <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Rotated vertical label */}
          <div className="hidden lg:flex lg:col-span-1 items-start justify-center pt-2">
            <SectionLabel>{CASE_STUDY.label}</SectionLabel>
          </div>

          {/* Content */}
          <motion.div
            className="lg:col-span-11"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Mobile label */}
            <motion.span
              variants={fadeUp}
              className="block lg:hidden font-mono text-xs tracking-widest uppercase text-ink-muted mb-6"
            >
              {CASE_STUDY.label}
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="font-serif text-4xl lg:text-5xl text-ink leading-tight max-w-2xl"
            >
              {CASE_STUDY.heading}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-8 text-lg text-ink-muted leading-relaxed max-w-2xl"
            >
              {CASE_STUDY.body}
            </motion.p>

            {/* Before / After Metrics */}
            <motion.div
              variants={fadeUp}
              className="mt-12 grid grid-cols-1 sm:grid-cols-3 border border-rule bg-surface-raised"
            >
              {CASE_STUDY.metrics.map((metric) => (
                <div
                  key={metric.before}
                  className="p-6 lg:p-8 border-b sm:border-b-0 sm:border-r border-rule last:border-r-0 last:border-b-0"
                >
                  <p className="font-mono text-xs text-ink-faint tracking-wide uppercase mb-2">
                    Before
                  </p>
                  <p className="text-sm text-ink-muted line-through decoration-rule">
                    {metric.before}
                  </p>
                  <p className="font-mono text-xs text-ink-faint tracking-wide uppercase mt-4 mb-2">
                    After
                  </p>
                  <p className="text-sm font-semibold text-ink">
                    {metric.after}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp}>
              <Link
                href={CASE_STUDY.cta.href}
                className="inline-block mt-8 font-sans text-sm font-medium text-ink hover:text-accent transition-colors underline underline-offset-4 decoration-rule hover:decoration-accent"
              >
                {CASE_STUDY.cta.label}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
