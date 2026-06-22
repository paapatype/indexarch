"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const GUIDE_STEPS = [
  {
    number: "01",
    text: "Scroll through the catalogue to browse products",
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
    // Trimmed so step 05 reads at roughly the same length as the
    // other four steps — keeps the DemoGuide bar at a constant
    // single-line height without wrapping into a taller component.
    text: "Drag the 3D model to rotate it",
    subtext: "Click, hold, and move your mouse",
  },
];

export function DemoGuide() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);

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
    setTimeout(() => setPaused(false), 15000);
  };

  const current = GUIDE_STEPS[step];

  return (
    <div className="flex items-center gap-4 flex-wrap border border-rule bg-surface-raised px-5 py-4 min-h-[3.25rem]">
      <div className="flex gap-2">
        {GUIDE_STEPS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-[width,background-color] duration-500 cursor-pointer ${
              i === step ? "w-6 bg-ink" : "w-1.5 bg-rule hover:bg-ink-faint"
            }`}
            aria-label={`Step ${i + 1}`}
          />
        ))}
      </div>

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

      {/* Prev/next nav. On mobile (where the strip wraps into stacked
          rows) the buttons get their own full-width row and are
          centred + sized for a 44×44 touch target. On desktop they
          collapse back to the original tight pair pushed to the right
          edge with ml-auto. */}
      <div className="flex gap-2 md:gap-1 w-full md:w-auto justify-center md:justify-start md:ml-auto">
        <button
          onClick={() => goTo((step - 1 + GUIDE_STEPS.length) % GUIDE_STEPS.length)}
          className="w-11 h-11 md:w-7 md:h-7 flex items-center justify-center border border-rule text-ink-muted hover:text-ink hover:border-ink-faint transition-colors cursor-pointer text-base md:text-xs"
          aria-label="Previous step"
        >
          &larr;
        </button>
        <button
          onClick={() => goTo((step + 1) % GUIDE_STEPS.length)}
          className="w-11 h-11 md:w-7 md:h-7 flex items-center justify-center border border-rule text-ink-muted hover:text-ink hover:border-ink-faint transition-colors cursor-pointer text-base md:text-xs"
          aria-label="Next step"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}

interface LiveDemoProps {
  /**
   * CSS scale applied to the iframe content. < 1 makes the K&K page render
   * at a larger internal viewport (so its responsive layout switches to
   * fewer columns) and then visually shrinks back to fit the container —
   * net effect: more rows/columns of product visible at once.
   */
  scale?: number;
  /**
   * Internal iframe width in pixels — this is the viewport the K&K page
   * actually renders against. ~1100px lands K&K on its 3-column layout.
   */
  internalWidth?: number;
  /**
   * Internal iframe height in pixels — must be tall enough that, after
   * scale, the visible window shows ~3 rows of product cards.
   */
  internalHeight?: number;
  className?: string;
}

/**
 * Live K&K catalogue embed. The iframe is rendered at a larger internal
 * viewport then scaled down via CSS transform so the visible window
 * shows ~3 columns × 3 rows of products at a comfortable size.
 */
export default function LiveDemo({
  scale = 0.78,
  internalWidth = 1100,
  internalHeight = 1180,
  className = "",
}: LiveDemoProps) {
  const displayWidth = internalWidth * scale;
  const displayHeight = internalHeight * scale;

  return (
    <div className={className}>
      {/* Desktop: browser frame with scaled iframe inside */}
      <div className="hidden md:block relative border border-rule bg-surface-raised">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-rule bg-sand-100">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sand-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-sand-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-sand-300" />
          </div>
          <div className="flex-1 mx-3">
            <div className="max-w-md mx-auto bg-surface-raised border border-rule px-3 py-1.5 font-mono text-xs text-ink-faint text-center truncate">
              kayuandkov.com
            </div>
          </div>
        </div>
        {/* Outer clip with the visible-size dimensions; iframe rendered
            at internalWidth × internalHeight, then transform-scaled. */}
        <div
          className="relative overflow-hidden mx-auto"
          style={{ width: `${displayWidth}px`, height: `${displayHeight}px`, maxWidth: "100%" }}
        >
          <iframe
            src="https://paapatype.github.io/kayu-kov-catalogue/"
            title="Kayu &amp; Kov interactive catalogue — filtering and search"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            style={{
              width: `${internalWidth}px`,
              height: `${internalHeight}px`,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              border: 0,
              display: "block",
            }}
          />
        </div>
      </div>

      {/* Mobile: direct iframe, no scaling */}
      <div className="md:hidden relative border border-rule bg-surface-raised rounded-lg overflow-hidden">
        <div className="relative w-full" style={{ height: "70vh" }}>
          <iframe
            src="https://paapatype.github.io/kayu-kov-catalogue/"
            title="Kayu &amp; Kov interactive catalogue — mobile view"
            className="absolute inset-0 w-full h-full"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
}
