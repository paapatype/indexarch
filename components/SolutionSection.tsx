"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import FeatureCard from "./ui/FeatureCard";
import { SOLUTION } from "@/lib/constants";

// Geometric SVG icons for solution cards
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

const GUIDE_STEPS = [
  {
    number: "01",
    text: "Scroll through the catalog to browse products",
    subtext: "Keep going — explore the full range",
  },
  {
    number: "02",
    text: "Type in the search bar to find products instantly",
    subtext: "Try searching for a material or profile type",
  },
  {
    number: "03",
    text: "Click any filter category on the left to narrow results",
    subtext: "Filter by Sheets, Pipes, Angles, and more",
  },
  {
    number: "04",
    text: "Click on any product card to see full details",
    subtext: "View specs, dimensions, and finishes",
  },
  {
    number: "05",
    text: "Drag the 3D model to rotate and view it from any angle",
    subtext: "Click and hold on the product visual, then move your mouse",
  },
];

function DemoGuide() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance every 7 seconds, pause when user interacts
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % GUIDE_STEPS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [paused]);

  const goTo = (i: number) => {
    setStep(i);
    setPaused(true);
    // Resume auto-advance after 15 seconds of inactivity
    setTimeout(() => setPaused(false), 15000);
  };

  const current = GUIDE_STEPS[step];

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {/* Step indicator dots — clickable */}
      <div className="flex gap-2">
        {GUIDE_STEPS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              i === step ? "w-6 bg-ink" : "w-1.5 bg-rule hover:bg-ink-faint"
            }`}
            aria-label={`Step ${i + 1}`}
          />
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3 }}
          className="flex items-baseline gap-3"
        >
          <span className="font-mono text-xs text-ink-faint tracking-wider shrink-0">
            {current.number}
          </span>
          <div>
            <span className="text-sm font-medium text-ink">{current.text}</span>
            <span className="text-xs text-ink-muted ml-2">{current.subtext}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next arrows */}
      <div className="flex gap-1 ml-auto">
        <button
          onClick={() => goTo((step - 1 + GUIDE_STEPS.length) % GUIDE_STEPS.length)}
          className="w-7 h-7 flex items-center justify-center border border-rule text-ink-muted hover:text-ink hover:border-ink-faint transition-colors cursor-pointer text-xs"
          aria-label="Previous step"
        >
          &larr;
        </button>
        <button
          onClick={() => goTo((step + 1) % GUIDE_STEPS.length)}
          className="w-7 h-7 flex items-center justify-center border border-rule text-ink-muted hover:text-ink hover:border-ink-faint transition-colors cursor-pointer text-xs"
          aria-label="Next step"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}

export default function SolutionSection() {
  return (
    <section className="py-section-sm lg:py-section relative">
      <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
        {/* Section Header — asymmetric */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.h2
            variants={fadeUp}
            className="lg:col-span-5 font-serif text-4xl lg:text-5xl text-ink leading-tight"
          >
            {SOLUTION.heading}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="lg:col-span-7 text-lg text-ink-muted leading-relaxed lg:pt-3"
          >
            {SOLUTION.subheading}
          </motion.p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-rule"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {SOLUTION.cards.map((card, i) => (
            <FeatureCard
              key={card.title}
              title={card.title}
              description={card.description}
              icon={icons[i]}
            />
          ))}
        </motion.div>

        {/* Device Note */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 font-mono text-xs text-ink-faint tracking-wide text-center"
        >
          {SOLUTION.deviceNote}
        </motion.p>

        {/* ── Live Interactive Demo ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16"
        >
          {/* Demo header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <span className="block font-mono text-xs tracking-widest uppercase text-ink-faint mb-2">
                Live Demo
              </span>
              <h3 className="font-serif text-2xl lg:text-3xl text-ink">
                See it in action
              </h3>
            </div>
            <p className="text-sm text-ink-muted max-w-sm">
              An interactive catalog we built for a tiles manufacturer — 55 products with filtering, search, and detailed specs.
            </p>
          </div>

          {/* Guide — above the iframe, hidden on mobile */}
          <div className="hidden md:block border border-rule border-b-0 bg-surface-raised px-5 py-4">
            <DemoGuide />
          </div>

          {/* Desktop: browser frame — hidden on mobile */}
          <div className="hidden md:block relative border border-rule bg-surface-raised">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-rule bg-sand-100">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sand-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-sand-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-sand-300" />
              </div>
              <div className="flex-1 mx-3">
                <div className="max-w-md mx-auto bg-surface-raised border border-rule px-3 py-1.5 font-mono text-xs text-ink-faint text-center truncate">
                  catalogue.indexarch.com/demo
                </div>
              </div>
            </div>
            <div className="relative w-full" style={{ height: "600px" }}>
              <iframe
                src="https://paapatype.github.io/kayu-kov-catalogue/"
                title="Interactive product catalog demo — filtering and search"
                className="absolute inset-0 w-full h-full"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>

          {/* Mobile: direct iframe — no chrome, clean view */}
          <div className="md:hidden relative border border-rule bg-surface-raised rounded-lg overflow-hidden">
            <div className="relative w-full" style={{ height: "70vh" }}>
              <iframe
                src="https://paapatype.github.io/kayu-kov-catalogue/"
                title="Interactive product catalog demo — mobile view"
                className="absolute inset-0 w-full h-full"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>

          {/* Caption */}
          <p className="mt-4 font-mono text-xs text-ink-faint tracking-wide text-center">
            A live catalog built by Index — 55 products with category filtering, instant search, and detailed product views.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
