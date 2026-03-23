"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { IMPACT } from "@/lib/constants";

function parseNumeric(value: string): { prefix: string; num: number; suffix: string } | null {
  const match = value.match(/^([+\-]?)(\d+(?:\.\d+)?)\s*(.*)$/);
  if (!match) return null;
  return {
    prefix: match[1],
    num: parseFloat(match[2]),
    suffix: match[3] ? ` ${match[3]}`.trimEnd() : "",
  };
}

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!isInView) return;
    const parsed = parseNumeric(value);
    if (!parsed) { setDisplay(value); return; }

    const duration = 1400;
    const steps = 45;
    const stepTime = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const eased = 1 - Math.pow(1 - current / steps, 3);
      const currentNum = parsed.num * eased;
      const formatted = parsed.num % 1 !== 0
        ? currentNum.toFixed(1)
        : Math.round(currentNum).toString();
      setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);
      if (current >= steps) { clearInterval(timer); setDisplay(value); }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{display}</span>;
}

// Small geometric accents per quadrant
const accents = [
  // Down arrow — reduction
  <svg key="a0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1" className="w-6 h-6 text-ink-faint" aria-hidden="true">
    <line x1="16" y1="4" x2="16" y2="24" />
    <polyline points="10,18 16,24 22,18" />
  </svg>,
  // Up arrow — increase
  <svg key="a1" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1" className="w-6 h-6 text-ink-faint" aria-hidden="true">
    <line x1="16" y1="28" x2="16" y2="8" />
    <polyline points="10,14 16,8 22,14" />
  </svg>,
  // Stopwatch — speed
  <svg key="a2" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1" className="w-6 h-6 text-ink-faint" aria-hidden="true">
    <circle cx="16" cy="18" r="10" />
    <line x1="16" y1="18" x2="16" y2="12" />
    <line x1="14" y1="4" x2="18" y2="4" />
    <line x1="16" y1="4" x2="16" y2="8" />
  </svg>,
  // Clock — always on
  <svg key="a3" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1" className="w-6 h-6 text-ink-faint" aria-hidden="true">
    <circle cx="16" cy="16" r="12" />
    <polyline points="16,8 16,16 22,16" />
  </svg>,
];

export default function ImpactStats() {
  return (
    <section className="py-section-sm lg:py-section relative overflow-hidden">
      <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
        {/* Header — asymmetric */}
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
            {IMPACT.heading}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="lg:col-span-7 text-sm text-ink-faint font-mono tracking-wide lg:pt-4 lg:text-right"
          >
            {IMPACT.footnote}
          </motion.p>
        </motion.div>

        {/* 2x2 Quadrant Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-0"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {IMPACT.stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              variants={fadeUp}
              className={`relative group p-10 lg:p-14 transition-colors duration-300 hover:bg-sand-100 ${
                // Borders: right border on left column, bottom border on top row
                i % 2 === 0 ? "sm:border-r border-rule" : ""
              } ${i < 2 ? "border-b border-rule" : ""}`}
            >
              {/* Quadrant number */}
              <span className="block font-mono text-xs text-rule tracking-wider mb-5">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Stat + Label side by side */}
              <div className="flex items-start gap-6 lg:gap-8">
                {/* Stat value — fixed width, centered for cross-row alignment */}
                <div className="font-mono text-4xl lg:text-5xl font-medium text-ink leading-none tracking-tight shrink-0 w-28 lg:w-36 text-center">
                  <CountUp value={stat.value} />
                </div>

                {/* Label — right */}
                <p className="text-sm text-ink-muted leading-relaxed pt-1" style={{ textWrap: "balance" }}>
                  {stat.label}
                </p>
              </div>

              {/* Geometric accent — bottom right */}
              <div className="absolute bottom-8 right-8 lg:bottom-10 lg:right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {accents[i]}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
