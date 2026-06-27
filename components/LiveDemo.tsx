"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { asset } from "@/lib/asset";

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

// The live catalogue is a Three.js / WebGL app: ~750KB cold, dominated by
// three.min.js (603KB, cdnjs) plus OrbitControls / OBJLoader and the 3D
// models. Two levers keep it feeling fast:
//   1. Preconnect to the three origins it pulls from.
//   2. On desktop, warm-load the iframe in the background once the section
//      nears the viewport, so it's already downloaded by the time someone
//      clicks. Mobile stays strictly tap-to-load to spare cellular data.
const CATALOGUE_URL = "https://paapatype.github.io/kayu-kov-catalogue/";
const POSTER_SRC = "/kayu-kov/shots/01-overview-poster.jpg";

function PrewarmLinks() {
  // Rendered in the component tree; React hoists <link> to <head>. No
  // crossOrigin — the catalogue's scripts/doc are loaded as classic
  // (non-CORS) requests, so an anonymous preconnect would sit unused.
  return (
    <>
      <link rel="preconnect" href="https://paapatype.github.io" />
      <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
      <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
      <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
    </>
  );
}

function PosterButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Load the interactive Kayu & Kov catalogue"
      className="group absolute inset-0 z-10 flex flex-col items-center justify-center overflow-hidden bg-surface-sunken cursor-pointer"
    >
      <Image
        src={asset(POSTER_SRC)}
        alt="Preview of the Kayu & Kov interactive catalogue"
        fill
        sizes="(min-width: 768px) 860px, 100vw"
        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <span
        className="absolute inset-0 bg-ink/35 transition-colors duration-300 group-hover:bg-ink/45"
        aria-hidden
      />
      <span className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-raised/95 shadow-card transition-transform duration-300 group-hover:scale-105 group-active:scale-[0.96]">
          {/* Play triangle nudged 1px right for optical centering. */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 text-ink" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span className="font-sans text-sm font-medium text-sand-50">
          Load the live catalogue
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-sand-50/80">
          Interactive · loads on tap
        </span>
      </span>
    </button>
  );
}

function LoadingVeil() {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-surface-sunken">
      <span className="h-8 w-8 rounded-full border-2 border-rule border-t-ink animate-spin" aria-hidden />
      <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
        Loading the live catalogue…
      </span>
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
 * Live K&K catalogue embed with a fast-perceived load:
 *   • Desktop warm-loads the (heavy) iframe in the background as the
 *     section approaches the viewport, then reveals it instantly on click.
 *   • Mobile mounts the iframe only on tap (saves cellular data), with a
 *     loading veil for feedback.
 * Desktop and mobile track state separately so only the on-screen variant
 * ever mounts an iframe.
 */
export default function LiveDemo({
  scale = 0.78,
  internalWidth = 1100,
  internalHeight = 1180,
  className = "",
}: LiveDemoProps) {
  const displayWidth = internalWidth * scale;
  const displayHeight = internalHeight * scale;

  // Desktop: warm (iframe mounted + loading in background) → open (poster
  // dismissed) → loaded (onLoad fired). Mobile: open (mounted on tap) →
  // loaded.
  const [dWarm, setDWarm] = useState(false);
  const [dOpen, setDOpen] = useState(false);
  const [dLoaded, setDLoaded] = useState(false);
  const [mOpen, setMOpen] = useState(false);
  const [mLoaded, setMLoaded] = useState(false);

  const desktopRef = useRef<HTMLDivElement>(null);

  // Warm-load the desktop iframe once the section is within ~1.5 screens
  // of the viewport. The desktop wrapper is display:none on mobile, so the
  // observer naturally never fires there — no cellular data is spent.
  useEffect(() => {
    const el = desktopRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setDWarm(true);
          io.disconnect();
        }
      },
      { rootMargin: "1200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={className}>
      <PrewarmLinks />

      {/* Desktop: browser frame with scaled iframe inside */}
      <div ref={desktopRef} className="hidden md:block relative border border-rule bg-surface-raised">
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
            at internalWidth × internalHeight, then transform-scaled. The
            iframe loads behind the poster (warm-load) so revealing it on
            click is instant. */}
        <div
          className="relative overflow-hidden mx-auto"
          style={{ width: `${displayWidth}px`, height: `${displayHeight}px`, maxWidth: "100%" }}
        >
          {dWarm && (
            <iframe
              src={CATALOGUE_URL}
              title="Kayu &amp; Kov interactive catalogue — filtering and search"
              loading="eager"
              sandbox="allow-scripts allow-same-origin"
              onLoad={() => setDLoaded(true)}
              style={{
                width: `${internalWidth}px`,
                height: `${internalHeight}px`,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                border: 0,
                display: "block",
              }}
            />
          )}
          {dOpen && !dLoaded && <LoadingVeil />}
          {!dOpen && (
            <PosterButton
              onClick={() => {
                setDWarm(true);
                setDOpen(true);
              }}
            />
          )}
        </div>
      </div>

      {/* Mobile: direct iframe, mounted only on tap */}
      <div className="md:hidden relative border border-rule bg-surface-raised rounded-lg overflow-hidden">
        <div className="relative w-full" style={{ height: "70vh" }}>
          {mOpen && (
            <iframe
              src={CATALOGUE_URL}
              title="Kayu &amp; Kov interactive catalogue — mobile view"
              className="absolute inset-0 w-full h-full"
              loading="eager"
              sandbox="allow-scripts allow-same-origin"
              onLoad={() => setMLoaded(true)}
            />
          )}
          {mOpen && !mLoaded && <LoadingVeil />}
          {!mOpen && <PosterButton onClick={() => setMOpen(true)} />}
        </div>
      </div>
    </div>
  );
}
