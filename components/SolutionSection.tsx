"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SOLUTION, INDUSTRIES } from "@/lib/constants";

// ─── Feature icons (Smart Filtering, Compare, Pre-qualified Enquiries)
// Thin-line SVGs that match the rest of the site's editorial icon set.

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

// ─── Industry belt (Who-it's-for marquee) ────────────────────────────
//
// A single horizontal row that scrolls infinitely. Tiles are rendered
// twice so a translateX(-50%) loop hands the second copy back to where
// the first started — seamless. CSS (.industry-belt / .industry-track)
// supplies the overflow clip, mask fades, pause-on-hover, and the
// reduce-motion fallback that wraps tiles statically.
//
// Per-belt `direction` and `duration` are passed inline so they're easy
// to tune from one place in the SolutionSection render.

interface IndustryBeltProps {
  items: readonly string[];
  direction: "left" | "right";
  duration: number; // seconds for one full loop
}

function IndustryBelt({ items, direction, duration }: IndustryBeltProps) {
  return (
    <div className="industry-belt">
      <div
        className="industry-track"
        style={{
          animationName:
            direction === "left" ? "industry-belt-left" : "industry-belt-right",
          animationDuration: `${duration}s`,
        }}
      >
        {items.map((label) => (
          <IndustryTile key={`a-${label}`} label={label} />
        ))}
        {/* Second copy — aria-hidden so screen readers don't announce
            duplicate labels, and CSS hides this whole set in reduced
            motion mode. */}
        {items.map((label) => (
          <IndustryTile key={`b-${label}`} label={label} duplicate />
        ))}
      </div>
    </div>
  );
}

function IndustryTile({
  label,
  duplicate = false,
}: {
  label: string;
  duplicate?: boolean;
}) {
  // Hover state: warmer border, warmer text, faintly warm translucent
  // background fill. Stays within the IndexArch palette.
  return (
    <span
      role={duplicate ? "presentation" : "listitem"}
      aria-hidden={duplicate || undefined}
      className="inline-flex shrink-0 items-center border border-rule px-3 py-1.5 font-mono text-[10.5px] tracking-[0.16em] uppercase text-ink-muted whitespace-nowrap cursor-default transition-colors duration-200 hover:border-ink-faint hover:text-ink hover:bg-surface-raised/50"
    >
      {label}
    </span>
  );
}

// ─── Section ──────────────────────────────────────────────────────────
// One composed offer-section that reads in a single glance:
//   header (eyebrow + headline + intro paragraph)
//   ──────────────────────────────────────────────
//   3 features in one row (hairline verticals between)
//   ──────────────────────────────────────────────
//   Who-it's-for line + industry chips
//
// Replaces the prior two-half bento, which spread the same information
// across roughly twice the vertical height.

export default function SolutionSection() {
  return (
    <section className="relative py-section-sm lg:py-24 hairline-top">
      <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
        {/* ── Header — asymmetric editorial grid ──────────────────── */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mb-8 lg:mb-10 items-start"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} className="lg:col-span-7 text-center lg:text-left">
            <span className="block font-mono text-xs tracking-widest uppercase text-ink-faint mb-4">
              What you get
            </span>
            <h2 className="font-serif text-[2rem] sm:text-4xl lg:text-5xl text-ink leading-[1.2] lg:leading-[1.15]">
              {SOLUTION.heading}
            </h2>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="lg:col-span-5 lg:pt-7 text-base lg:text-lg text-ink-muted leading-relaxed max-w-md"
            style={{ textWrap: "pretty" as never }}
          >
            Built for how engineers and architects actually buy — and
            for the manufacturers who export or serve technical buyers.
            Search, compare, and submit a pre-qualified order without
            ever opening a PDF.
          </motion.p>
        </motion.div>

        {/* ── Offer panel — features + who-it's-for in one frame ───
            Outer border ties the two rows together so the section
            reads as ONE composed product offer. */}
        <motion.div
          className="border border-rule"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Feature row — 3 items in a single horizontal line on
              desktop, vertical-stacked on mobile. `gap-px bg-rule`
              creates clean 1px hairlines between cells; the parent's
              border supplies the outer frame. */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-rule">
            {SOLUTION.cards.map((card, i) => (
              <motion.article
                variants={fadeUp}
                key={card.title}
                className="bg-surface p-6 lg:p-8 flex flex-col gap-3"
              >
                <div className="h-8 w-8 mb-1 text-ink-faint">
                  {featureIcons[i]}
                </div>
                <h3 className="font-serif text-lg lg:text-xl text-ink leading-snug">
                  {card.title}
                </h3>
                <p
                  className="text-sm text-ink-muted leading-relaxed"
                  style={{ textWrap: "pretty" as never }}
                >
                  {card.description}
                </p>
              </motion.article>
            ))}
          </div>

          {/* Who-it's-for row — lives inside the same outer panel,
              separated by a hairline. Eyebrow + line sit on the left
              (col-span-4 ≈ 33% width). Three slowly-drifting marquee
              belts of category tiles fill the right (col-span-8 ≈ 67%).
              The mask on each belt fades tiles in/out so they never
              visually crash into the copy column. */}
          <motion.div
            variants={fadeUp}
            className="bg-surface border-t border-rule grid grid-cols-1 lg:grid-cols-12 lg:items-center"
          >
            <div className="lg:col-span-4 p-6 lg:p-8 lg:pr-4">
              <span className="block font-mono text-xs tracking-widest uppercase text-ink-faint mb-2">
                Who it&rsquo;s for
              </span>
              <p
                className="text-sm lg:text-base text-ink-muted leading-relaxed max-w-sm"
                style={{ textWrap: "pretty" as never }}
              >
                Built for manufacturers who export or serve technical
                buyers — across products where every spec decision
                matters.
              </p>
            </div>
            <div
              className="lg:col-span-8 flex flex-col gap-2.5 py-6 lg:py-8"
              role="list"
              aria-label="Manufacturing categories IndexArch supports"
            >
              {INDUSTRIES.belts.map((belt, i) => {
                // Speeds + directions cycle through a small set so any
                // number of belts (currently 5) drift with mismatched
                // periods and alternating sides — never locked together.
                const durations = [62, 70, 58, 66, 74];
                const directions: Array<"left" | "right"> = [
                  "right",
                  "left",
                  "right",
                  "left",
                  "right",
                ];
                return (
                  <IndustryBelt
                    key={i}
                    items={belt}
                    direction={directions[i % directions.length]}
                    duration={durations[i % durations.length]}
                  />
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Device note — quiet closer flush below the panel. */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 lg:mt-8 font-mono text-xs text-ink-faint tracking-wide text-center"
        >
          {SOLUTION.deviceNote}
        </motion.p>
      </div>
    </section>
  );
}
