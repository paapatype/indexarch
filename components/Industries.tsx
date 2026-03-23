"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import FeatureCard from "./ui/FeatureCard";
import { INDUSTRIES } from "@/lib/constants";

// Geometric SVG icons per industry
const icons = [
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
  // Profiles — cross-section of an aluminum extrusion
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

export default function Industries() {
  return (
    <section className="py-section-sm lg:py-section relative">
      <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="font-serif text-3xl lg:text-4xl text-ink text-center max-w-2xl mx-auto mb-16 leading-tight"
        >
          {INDUSTRIES.heading}
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-rule"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {INDUSTRIES.cards.map((card, i) => (
            <FeatureCard
              key={card.title}
              title={card.title}
              description={card.description}
              icon={icons[i]}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
