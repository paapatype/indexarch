"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import PricingCard from "./ui/PricingCard";
import { PRICING } from "@/lib/constants";

export default function Pricing() {
  return (
    <section id="pricing" className="py-section-sm lg:py-section bg-surface-sunken relative">
      <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.h2
            variants={fadeUp}
            className="font-serif text-4xl lg:text-5xl text-ink"
          >
            {PRICING.heading}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-lg text-ink-muted"
          >
            {PRICING.subtitle}
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-rule"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {PRICING.plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </motion.div>

        {/* Footnote */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 text-center font-mono text-xs text-ink-faint tracking-wide"
        >
          {PRICING.footnote}
        </motion.p>
      </div>
    </section>
  );
}
