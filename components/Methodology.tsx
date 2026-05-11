"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate, useMotionValueEvent } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { METHODOLOGY } from "@/lib/constants";

const stepIcons = [
  <svg key="pdf" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
    <rect x="16" y="8" width="32" height="48" rx="2" />
    <line x1="22" y1="22" x2="42" y2="22" strokeWidth="1" opacity="0.55" />
    <line x1="22" y1="28" x2="38" y2="28" strokeWidth="1" opacity="0.55" />
    <rect x="22" y="34" width="20" height="10" strokeWidth="1" opacity="0.4" />
    <line x1="22" y1="48" x2="36" y2="48" strokeWidth="1" opacity="0.55" />
    <path d="M44 8 L48 12 L48 8 Z" opacity="0.5" />
  </svg>,
  <svg key="branch" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
    <circle cx="14" cy="32" r="3" />
    <circle cx="44" cy="14" r="3" />
    <circle cx="44" cy="32" r="3" />
    <circle cx="44" cy="50" r="3" />
    <line x1="17" y1="32" x2="41" y2="14" />
    <line x1="17" y1="32" x2="41" y2="32" />
    <line x1="17" y1="32" x2="41" y2="50" />
    <circle cx="54" cy="14" r="2" strokeWidth="1.2" opacity="0.5" />
    <line x1="47" y1="14" x2="52" y2="14" strokeWidth="1" opacity="0.5" />
    <circle cx="54" cy="32" r="2" strokeWidth="1.2" opacity="0.5" />
    <line x1="47" y1="32" x2="52" y2="32" strokeWidth="1" opacity="0.5" />
    <circle cx="54" cy="50" r="2" strokeWidth="1.2" opacity="0.5" />
    <line x1="47" y1="50" x2="52" y2="50" strokeWidth="1" opacity="0.5" />
  </svg>,
  <svg key="hooks" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
    <line x1="12" y1="20" x2="52" y2="20" />
    <line x1="12" y1="32" x2="52" y2="32" />
    <line x1="12" y1="44" x2="52" y2="44" />
    <circle cx="22" cy="20" r="3" fill="currentColor" />
    <circle cx="40" cy="32" r="3" fill="currentColor" />
    <circle cx="30" cy="44" r="3" fill="currentColor" />
    <polyline points="46,42 49,45 53,40" strokeWidth="1.2" opacity="0.55" />
  </svg>,
  <svg key="visual" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
    <polygon points="14,24 32,16 50,24 50,46 32,54 14,46" />
    <line x1="14" y1="24" x2="32" y2="32" strokeWidth="1" opacity="0.45" />
    <line x1="50" y1="24" x2="32" y2="32" strokeWidth="1" opacity="0.45" />
    <line x1="32" y1="32" x2="32" y2="54" strokeWidth="1" opacity="0.45" />
    <circle cx="50" cy="24" r="2.5" fill="currentColor" opacity="0.55" />
  </svg>,
];

// Per-card duration. Bumped 25% slower than before (3600 → 4500ms).
const STEP_DURATION_MS = 4500;

interface DividerRange {
  left: number;
  right: number;
}

// Fraction of each card's step the orb spends traversing the loader
// line. The remainder is spent invisible "between" cards, where the
// orb would otherwise sit on the "01"/"02" label area.
const ORB_VISIBLE_PORTION = 0.85;

export default function Methodology() {
  const beats = METHODOLOGY.beats;
  const [hovering, setHovering] = useState(false);
  const [active, setActive] = useState(0);
  const [orbTop, setOrbTop] = useState<number | null>(null);
  const [dividerRanges, setDividerRanges] = useState<DividerRange[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Measure each divider line's exact left/right and the shared Y so
  // the orb travels along the loader line itself (not the full card
  // width). Polls for 5s to catch the post-fadeUp final layout, and
  // re-measures on resize / scroll.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const measure = () => {
      const articles = wrapper.querySelectorAll("article");
      if (articles.length === 0) return;
      const wRect = wrapper.getBoundingClientRect();
      const ranges: DividerRange[] = [];
      let topY: number | null = null;
      articles.forEach((art) => {
        const divider = art.querySelector(".bg-rule") as HTMLElement | null;
        if (!divider) return;
        const dRect = divider.getBoundingClientRect();
        ranges.push({
          left: dRect.left - wRect.left,
          right: dRect.right - wRect.left,
        });
        if (topY === null) topY = dRect.top + dRect.height / 2 - wRect.top;
      });
      if (topY !== null) {
        setOrbTop((prev) =>
          prev !== null && Math.abs(prev - topY!) < 0.5 ? prev : topY
        );
      }
      setDividerRanges((prev) => {
        if (prev.length !== ranges.length) return ranges;
        const same = ranges.every(
          (r, i) =>
            Math.abs(r.left - prev[i].left) < 0.5 &&
            Math.abs(r.right - prev[i].right) < 0.5
        );
        return same ? prev : ranges;
      });
    };
    measure();
    const id = setInterval(measure, 80);
    const stop = setTimeout(() => clearInterval(id), 5000);
    const ro = new ResizeObserver(measure);
    ro.observe(wrapper);
    window.addEventListener("scroll", measure, { passive: true });
    return () => {
      clearInterval(id);
      clearTimeout(stop);
      ro.disconnect();
      window.removeEventListener("scroll", measure);
    };
  }, []);

  // Continuous cycle progress: 0 → 1 across all 4 cards, linear, repeating.
  // The orb's X position and the active-card index both derive from this
  // single value so the orb never "teleports" between cards.
  const progress = useMotionValue(0);

  // Map progress → orb X (in px, along the divider lines) and → opacity
  // (sine arc 0 → 1 → 0 within each tile, 0 in the gap between tiles
  // where the orb would otherwise sit on the "01"/"02" label area).
  const orbLeft = useTransform(progress, (p) => {
    if (dividerRanges.length === 0) return 0;
    const totalSteps = p * beats.length;
    const stepIdx = Math.min(beats.length - 1, Math.floor(totalSteps));
    const localStep = totalSteps - stepIdx;
    const r = dividerRanges[stepIdx];
    const localTile = Math.min(1, localStep / ORB_VISIBLE_PORTION);
    return r.left + localTile * (r.right - r.left);
  });
  const orbOpacity = useTransform(progress, (p) => {
    if (dividerRanges.length === 0) return 0;
    const totalSteps = p * beats.length;
    const stepIdx = Math.floor(totalSteps);
    const localStep = totalSteps - stepIdx;
    if (localStep >= ORB_VISIBLE_PORTION) return 0;
    return Math.sin((localStep / ORB_VISIBLE_PORTION) * Math.PI);
  });

  // Drive the cycle. Re-starts whenever hover state changes — when hover
  // ends the cycle restarts at the current progress so no visible jump.
  useEffect(() => {
    if (hovering) return;
    const controls = animate(progress, [progress.get(), 1], {
      duration: (1 - progress.get()) * (STEP_DURATION_MS * beats.length) / 1000,
      ease: "linear",
      onComplete: () => {
        progress.set(0);
      },
    });
    return () => controls.stop();
    // Re-trigger when progress wraps via onComplete (which resets value).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovering, beats.length]);

  // Loop forever by detecting completion and restarting.
  useMotionValueEvent(progress, "change", (p) => {
    if (p >= 0.999 && !hovering) {
      // Restart the cycle
      progress.set(0);
      animate(progress, 1, {
        duration: (STEP_DURATION_MS * beats.length) / 1000,
        ease: "linear",
        onComplete: () => progress.set(0),
      });
    }
    // Update active card from the same motion value.
    const newActive = Math.min(beats.length - 1, Math.floor(p * beats.length));
    if (newActive !== active) setActive(newActive);
  });

  return (
    <section
      id="how-it-works"
      className="relative py-section-sm lg:py-section hairline-top"
    >
      <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
        {/* Header — both columns align at the top so the right paragraph's
            first line sits on the same baseline as the headline's first
            line. Right column narrowed (col-span-5) and capped to keep
            the paragraph to ~3 lines. */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mb-16 lg:mb-20 items-start"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} className="lg:col-span-7">
            <span className="block font-mono text-xs tracking-widest uppercase text-ink-faint mb-4">
              {METHODOLOGY.eyebrow}
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl text-ink leading-[1.15]">
              {METHODOLOGY.headingLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </motion.div>
          <motion.div
            variants={fadeUp}
            // Match the eyebrow + headline-line-1 baseline. The eyebrow is
            // mb-4 above the headline; the right paragraph mirrors that
            // top offset so its first line aligns with "We don't replace
            // your catalogue."
            className="lg:col-span-5 lg:pt-[2.1rem] text-base lg:text-lg text-ink-muted leading-relaxed space-y-2 max-w-md"
          >
            {METHODOLOGY.subtitleLines.map((line, i) => (
              <p
                key={i}
                className={
                  i === METHODOLOGY.subtitleLines.length - 1
                    ? "text-ink"
                    : ""
                }
              >
                {line}
              </p>
            ))}
          </motion.div>
        </motion.div>

        {/* Steps. The orb is positioned at the section level so it can
            travel continuously across all four cards. Cards highlight
            via a subtle bg shift + scale instead of blurring others. */}
        <div
          ref={wrapperRef}
          className="relative"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <motion.div
            className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-rule border border-rule"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {beats.map((beat, i) => {
              const isActive = !hovering && i === active;
              return (
                <Card
                  key={beat.number}
                  beat={beat}
                  icon={stepIcons[i]}
                  isActive={isActive}
                  isPast={!hovering && i < active}
                  cardIndex={i}
                  progress={progress}
                  totalSteps={beats.length}
                />
              );
            })}
          </motion.div>

          {/* Continuous orb — single element, traverses 0% → 100% of the
              cards row in one smooth pass. Positioned over the divider
              line at approximately the divider's Y. */}
          {!hovering && orbTop !== null && dividerRanges.length > 0 && (
            <motion.span
              aria-hidden
              className="hidden lg:block absolute z-20 pointer-events-none rounded-full bg-ink"
              style={{
                top: `${orbTop}px`,
                left: orbLeft,
                opacity: orbOpacity,
                width: "var(--orb-size)",
                height: "var(--orb-size)",
                transform: "translate(-50%, -50%)",
                boxShadow: "var(--orb-shadow)",
                filter: "var(--orb-blur)",
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

interface CardProps {
  beat: { number: string; title: string; description: string };
  icon: React.ReactNode;
  isActive: boolean;
  isPast: boolean;
  cardIndex: number;
  progress: ReturnType<typeof useMotionValue<number>>;
  totalSteps: number;
}

// Per-card fill bar driven directly off the global progress motion value
// so the bar grows in lockstep with the orb. No setTimeout, no per-card
// keyframe restart.
function Card({ beat, icon, isActive, isPast, cardIndex, progress, totalSteps }: CardProps) {
  const fillRef = useRef<HTMLSpanElement>(null);

  // Each card "owns" 1/totalSteps of the progress range.
  // Fill = clamp((progress * totalSteps - cardIndex), 0, 1) * 100%
  useMotionValueEvent(progress, "change", (p) => {
    const local = Math.max(0, Math.min(1, p * totalSteps - cardIndex));
    if (fillRef.current) {
      fillRef.current.style.width = `${local * 100}%`;
    }
  });

  return (
    <motion.article
      variants={fadeUp}
      animate={{
        backgroundColor: isActive ? "var(--color-surface-raised)" : "var(--color-surface)",
        scale: isActive ? 1.018 : 1,
      }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-surface p-8 lg:p-10 lg:min-h-[420px] flex flex-col cursor-default"
      style={{ zIndex: isActive ? 2 : 1 }}
    >
      <div
        className={`h-11 w-11 mb-7 transition-colors duration-700 ${
          isActive ? "text-ink" : "text-ink-faint"
        }`}
      >
        {icon}
      </div>

      <div className="flex items-baseline gap-4 mb-5">
        <span
          className={`font-mono text-sm tracking-widest transition-colors duration-700 ${
            isActive ? "text-ink" : "text-ink-faint"
          }`}
        >
          {beat.number}
        </span>
        <div className="relative h-px flex-1 bg-rule overflow-visible">
          <span
            ref={fillRef}
            className="absolute inset-y-0 left-0 bg-ink"
            style={{ width: isPast ? "100%" : "0%" }}
          />
        </div>
      </div>

      <h3
        className={`font-serif text-xl lg:text-[1.45rem] leading-snug mb-4 transition-colors duration-700 ${
          isActive ? "text-accent" : "text-ink"
        }`}
      >
        {beat.title}
      </h3>
      <p className="text-sm lg:text-[0.95rem] text-ink-muted leading-relaxed">
        {beat.description}
      </p>
    </motion.article>
  );
}
