"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { METHODOLOGY } from "@/lib/constants";

// ─── Result-row icons ────────────────────────────────────────────────
// Stroke-based 24×24 SVGs at h-6 w-6 (slightly larger than the prior
// h-5 to bump the result section's prominence without going graphic).
// Color is inherited from the parent text class so the result row can
// style icons together with the headings.

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 shrink-0"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="12" x2="12" y2="7.5" />
      <line x1="12" y1="12" x2="15.5" y2="13.5" />
    </svg>
  );
}

function ArrowsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 shrink-0"
      aria-hidden
    >
      <line x1="3" y1="9" x2="14" y2="9" />
      <polyline points="11,6 14,9 11,12" />
      <line x1="21" y1="15" x2="10" y2="15" />
      <polyline points="13,12 10,15 13,18" />
    </svg>
  );
}

function TrendingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 shrink-0"
      aria-hidden
    >
      <polyline points="3,17 9,11 13,15 21,7" />
      <polyline points="15,7 21,7 21,13" />
    </svg>
  );
}

const RESULT_ICONS = {
  clock: <ClockIcon />,
  arrows: <ArrowsIcon />,
  trending: <TrendingIcon />,
} as const;

// ─── Split-trace perimeter border ────────────────────────────────────
//
// Premium variant of the sequential-card highlight. Two light trails
// originate from the vertical centre of the active card's left edge
// and travel in opposite directions around the perimeter, meeting at
// the vertical centre of the right edge.
//
//   - Upper path: left-centre → up → top → down to right-centre
//   - Lower path: left-centre → down → bottom → up to right-centre
//
// Each path renders two layered strokes that share a single animated
// progress value:
//   - Tail: a long, dim warm streak that lags behind the head
//   - Head: a short, bright leading dot
//
// We read the parent card's pixel dimensions via ResizeObserver and
// draw the paths in actual pixel space (viewBox = card box). This
// keeps the head's screen length and the stroke uniformity equal on
// every edge, regardless of the card's aspect ratio.
//
// `runId` increments each time the orchestrator starts a fresh trace
// on this card; `active` controls the opacity fade-in/out so the
// previous card's trails dissolve gracefully as the next one ignites.

interface SplitTraceBorderProps {
  runId: number;
  active: boolean;
  durationSec: number;
}

// Visible head length and lagging tail length, both expressed in
// `pathLength=100` units (i.e. % of the path).
const HEAD_LEN = 3.6;
const TAIL_LEN = 30;

function SplitTraceBorder({ runId, active, durationSec }: SplitTraceBorderProps) {
  // `progress` ∈ [0, 100 - HEAD_LEN]. The head's leading edge sits at
  // path position `progress`; the head's tail-edge at `progress + HEAD_LEN`.
  // The lagging tail sits at `[progress - TAIL_LEN, progress]`.
  const progress = useMotionValue(0);
  const headOffset = useTransform(progress, (v) => -v);
  const tailOffset = useTransform(progress, (v) => -v + TAIL_LEN);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  // Read the card's real pixel size so the paths are drawn in screen
  // coords (no aspect-ratio stretch, uniform dash and stroke widths).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!svgRef.current) return;
    const parent = svgRef.current.parentElement;
    if (!parent) return;
    const update = () => {
      const r = parent.getBoundingClientRect();
      setSize({ w: r.width, h: r.height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  // Fresh sweep whenever `runId` ticks. Slight ease so the head has a
  // tiny breath at the start/end rather than purely mechanical linear.
  useEffect(() => {
    if (runId <= 0) return;
    progress.set(0);
    const controls = animate(progress, 100 - HEAD_LEN, {
      duration: durationSec,
      ease: [0.4, 0, 0.6, 1],
    });
    return () => controls.stop();
  }, [runId, durationSec, progress]);

  const { w, h } = size;

  // Path geometry — split at left-centre, both halves end at right-centre.
  const upperPath =
    w && h ? `M 0 ${h / 2} L 0 0 L ${w} 0 L ${w} ${h / 2}` : "";
  const lowerPath =
    w && h ? `M 0 ${h / 2} L 0 ${h} L ${w} ${h} L ${w} ${h / 2}` : "";

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      viewBox={w && h ? `0 0 ${w} ${h}` : "0 0 100 100"}
      preserveAspectRatio="none"
      aria-hidden
    >
      {w > 0 && h > 0 && (
        <>
          {/* Warm-highlight along the full perimeter — "you are here"
              cue for the active card. Crossfades with the next card's
              frame so the baton pass feels calm and intentional. */}
          <motion.rect
            x={0}
            y={0}
            width={w}
            height={h}
            fill="none"
            stroke="var(--color-trail-frame)"
            strokeWidth={0.8}
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 0.28 : 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            vectorEffect="non-scaling-stroke"
          />

          {/* ── UPPER half ── */}
          {/* Tail */}
          <motion.path
            d={upperPath}
            fill="none"
            stroke="var(--color-trail-tail)"
            strokeWidth={1.1}
            pathLength={100}
            strokeDasharray={`${TAIL_LEN} ${100 - TAIL_LEN}`}
            style={{ strokeDashoffset: tailOffset }}
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 0.55 : 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
          />
          {/* Head */}
          <motion.path
            d={upperPath}
            fill="none"
            stroke="var(--color-trail-head)"
            strokeWidth={1.7}
            pathLength={100}
            strokeDasharray={`${HEAD_LEN} ${100 - HEAD_LEN}`}
            style={{ strokeDashoffset: headOffset }}
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
          />

          {/* ── LOWER half ── */}
          {/* Tail */}
          <motion.path
            d={lowerPath}
            fill="none"
            stroke="var(--color-trail-tail)"
            strokeWidth={1.1}
            pathLength={100}
            strokeDasharray={`${TAIL_LEN} ${100 - TAIL_LEN}`}
            style={{ strokeDashoffset: tailOffset }}
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 0.55 : 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
          />
          {/* Head */}
          <motion.path
            d={lowerPath}
            fill="none"
            stroke="var(--color-trail-head)"
            strokeWidth={1.7}
            pathLength={100}
            strokeDasharray={`${HEAD_LEN} ${100 - HEAD_LEN}`}
            style={{ strokeDashoffset: headOffset }}
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

// ─── Static fallback (prefers-reduced-motion) ────────────────────────
// When reduce-motion is set we don't animate anything — just paint a
// quiet warm-highlight border on the first card so the section still
// has a visible "anchor" without movement.

function StaticAccentBorder() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      aria-hidden
    >
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="none"
        stroke="var(--color-trail-frame)"
        strokeWidth="1"
        opacity="0.45"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}


// ─── Section ─────────────────────────────────────────────────────────

export default function Methodology() {
  // Per-card reading-paced durations: 170 wpm, clamped 7–16s. Computed
  // once from the static METHODOLOGY data.
  const durations = useMemo(
    () =>
      METHODOLOGY.beats.map((beat) => {
        const text = `${beat.title.replace(/\n/g, " ")} ${beat.description}`;
        const words = text.split(/\s+/).filter(Boolean).length;
        return Math.min(16, Math.max(7, (words / 170) * 60));
      }),
    []
  );

  // Per-card "run id" — incremented each time the orchestrator starts
  // a fresh sweep on that card. The TrailingBorder useEffect keys off
  // this value so the same card can be re-animated on each loop.
  const [runIds, setRunIds] = useState<number[]>(() =>
    METHODOLOGY.beats.map(() => 0)
  );
  // The card currently lit. -1 means everything is faded out (during
  // the brief gap between cards or the 2s pause between full loops).
  const [activeIdx, setActiveIdx] = useState<number>(-1);
  const [reduceMotion, setReduceMotion] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  // Result-row auto-trigger: on mobile (no hover) we need the perimeter
  // trail to play on its own when the row scrolls into view, then stay
  // available for tap-retrigger. `activeResultIdx === -1` means no card
  // is highlighted; a number means that index card is in its "hovered"
  // state via `data-active="true"` (matched by globals.css alongside
  // `.result-card:hover`).
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const [activeResultIdx, setActiveResultIdx] = useState<number>(-1);

  // Reduce-motion preference. Read once on mount and listen for change.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Sequence orchestrator. Once the section becomes visible we start
  // cycling cards 0→1→2→3 with a 400ms fade between each and a 2s
  // pause after the last before looping. Cleaned up on unmount or if
  // reduce-motion flips on.
  useEffect(() => {
    if (reduceMotion) return;
    if (!sectionRef.current) return;
    if (typeof window === "undefined") return;

    let timeoutId: number | undefined;
    let started = false;
    let idx = 0;

    const runStep = () => {
      setActiveIdx(idx);
      setRunIds((prev) => {
        const next = [...prev];
        next[idx] = next[idx] + 1;
        return next;
      });
      const dwell = durations[idx] * 1000;
      timeoutId = window.setTimeout(() => {
        // Advance immediately — the trail layers each carry a 700ms
        // ease-out opacity transition, so the outgoing card's head
        // gracefully dims at right-centre while the incoming card's
        // head rises at left-centre. The crossfade overlap means the
        // perimeter is never empty during the hand-off. The 2s pause
        // only happens after the final card before looping back.
        const wasLast = idx === durations.length - 1;
        if (wasLast) {
          setActiveIdx(-1); // brief darkness during the loop pause
          timeoutId = window.setTimeout(() => {
            idx = 0;
            runStep();
          }, 2000);
        } else {
          idx = idx + 1;
          runStep();
        }
      }, dwell);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && !started) {
          started = true;
          runStep();
        }
      },
      // Lower threshold + early rootMargin so the trail sequence fires
      // as soon as the section starts entering the viewport — important
      // on mobile where the section is much taller than the screen and
      // a 0.25 threshold would only fire deep into the scroll.
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [durations, reduceMotion]);

  // Result-row scroll-trigger: when the result strip enters the
  // viewport, cycle each card through its "active" state (~2.6s each)
  // so mobile users see the hover treatment without needing a cursor.
  // Runs only once per page-load; tap on a card retriggers that card
  // individually via the click handler below.
  useEffect(() => {
    if (reduceMotion) return;
    if (typeof window === "undefined") return;
    if (!resultsRef.current) return;

    let timeouts: number[] = [];
    let started = false;
    const cycle = () => {
      const dwell = 2600;
      const gap = 220;
      const order = [0, 1, 2];
      order.forEach((cardIdx, i) => {
        const startAt = i * (dwell + gap);
        timeouts.push(
          window.setTimeout(() => setActiveResultIdx(cardIdx), startAt)
        );
        timeouts.push(
          window.setTimeout(
            () => setActiveResultIdx(-1),
            startAt + dwell
          )
        );
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && !started) {
          started = true;
          cycle();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(resultsRef.current);

    return () => {
      observer.disconnect();
      timeouts.forEach((t) => window.clearTimeout(t));
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-12 lg:py-16 hairline-top"
    >
      <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
        {/* Header — asymmetric: heading on the left (col-span-7), the
            3-paragraph subtitle on the right (col-span-5).
            Bottom margin tightened so the 4-step card row fits inside
            the same desktop viewport as the headline without cutting
            cards off below the fold. */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-10 lg:mb-12 items-start"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} className="lg:col-span-7 text-center lg:text-left">
            <span className="block font-mono text-xs tracking-widest uppercase text-ink-faint mb-3">
              {METHODOLOGY.eyebrow}
            </span>
            <h2 className="font-serif text-[1.85rem] sm:text-4xl lg:text-[2.5rem] text-ink leading-[1.18] lg:leading-[1.15]">
              {/* Mobile heading: 2 cleaner lines — "We don't replace
                  your catalogue," / "we unpack it." Desktop keeps the
                  original split where each lg:col-span-7 line fits
                  comfortably without overflow. */}
              <span className="block lg:hidden">
                We don&rsquo;t replace your catalogue,
              </span>
              <span className="block lg:hidden">we unpack it.</span>
              <span className="hidden lg:block">
                {METHODOLOGY.headingLines[0]}
              </span>
              <span className="hidden lg:block">
                {METHODOLOGY.headingLines[1]}
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="lg:col-span-5 lg:pt-3 text-base lg:text-base text-ink-muted leading-relaxed space-y-2 max-w-md mx-auto lg:mx-0 text-center lg:text-left"
            style={{ textWrap: "pretty" as never }}
          >
            <p>{METHODOLOGY.subtitleIntro}</p>
            {/* "The PDF buries them." flows on the same line as
                "We pull them to the surface." — second sentence is an
                inline span with text-ink for emphasis, but they share
                one paragraph so the leading stays equal across the
                column. */}
            <p>
              {METHODOLOGY.subtitleBuries}{" "}
              <span className="text-ink">{METHODOLOGY.subtitleEmphasis}</span>
            </p>
            {/* Skip-link — for visitors who clicked "How It Works"
                already convinced and want to see the example. Quiet
                underline-style link, mirrors the Back-link inside the
                Kayu & Kov section. */}
            <p className="pt-4">
              <a
                href="#example"
                className="inline-flex items-center gap-1.5 font-sans text-sm text-ink underline underline-offset-4 decoration-rule hover:decoration-ink transition-colors"
              >
                Skip straight to example
                <span aria-hidden>→</span>
              </a>
            </p>
          </motion.div>
        </motion.div>

        {/* Step grid — single 4-column row of static cards. Each card
            sits on `position: relative` so the TrailingBorder SVG can
            be absolutely positioned within. */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-rule border border-rule"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {METHODOLOGY.beats.map((beat, i) => (
            <motion.article
              key={beat.number}
              variants={fadeUp}
              // Equal padding on all four sides — more spacious and
              // minimal. Same on every card so the inside layout
              // reads as one consistent editorial system. `relative`
              // anchors the absolute TrailingBorder overlay.
              // Padding tightened (p-6 / lg:p-8) and the previous
              // lg:min-h-[460px] dropped so cards size to content;
              // the result is the 4-card row + the section heading
              // fit inside a single desktop viewport.
              className="relative bg-surface p-6 lg:p-8 flex flex-col text-center lg:text-left items-center lg:items-stretch"
            >
              {/* Split-trace perimeter overlay — two trails launch
                  from the left-centre and sweep around in opposite
                  directions to meet at the right-centre. Static accent
                  on card 1 only when reduce-motion is set. */}
              {reduceMotion ? (
                i === 0 ? <StaticAccentBorder /> : null
              ) : (
                <SplitTraceBorder
                  runId={runIds[i]}
                  active={activeIdx === i}
                  durationSec={durations[i]}
                />
              )}

              <span className="block font-mono text-xs tracking-widest uppercase text-ink-faint mb-4">
                Step {beat.number.replace(/^0+/, "")}
              </span>
              {/* Title lines are explicit — split on "\n" so all four
                  titles emit exactly three blocks. `whitespace-nowrap`
                  on each block locks every line to a single row, so
                  every card's title is guaranteed to be exactly 3
                  lines. Font size is set so the longest segment fits
                  inside the card's content width. */}
              <h3
                className="font-serif text-lg lg:text-xl text-ink leading-snug mb-5 min-h-[3lh]"
              >
                {beat.title.split("\n").map((line, j) => (
                  <span key={j} className="block whitespace-nowrap">
                    {line}
                  </span>
                ))}
              </h3>
              <p
                className="text-sm text-ink-muted leading-relaxed"
                style={{ textWrap: "pretty" as never }}
              >
                {beat.description}
              </p>
            </motion.article>
          ))}
        </motion.div>

        {/* ─── RESULT — bumped prominence ─────────────────────────
            Still lives inside the max-w container so it reads as the
            outcome of the steps above. Compared to the prior quiet
            treatment, this version adds:
              • a serif sub-heading under "THE RESULT" eyebrow so the
                section has a voice, not just a label
              • larger icons (h-6) at full ink colour
              • serif result headings (text-xl/2xl) for parity with the
                rest of the editorial system
              • larger body type and tighter measure
            Framing stays a single hairline-top so we don't slide into
            an enclosed "box" treatment. */}
        <motion.div
          className="mt-20 lg:mt-28 pt-14 lg:pt-20 border-t border-rule"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-start mb-14 lg:mb-16"
          >
            <div className="lg:col-span-7">
              <span className="block font-mono text-xs tracking-widest uppercase text-ink-faint mb-4">
                The Result
              </span>
              <h3 className="font-serif text-2xl lg:text-[2rem] text-ink leading-snug max-w-xl">
                Three changes your sales team feels in the first month.
              </h3>
            </div>
            <p
              className="lg:col-span-5 lg:pt-2 text-base lg:text-lg text-ink-muted leading-relaxed max-w-md"
              style={{ textWrap: "pretty" as never }}
            >
              Not vanity metrics — the kind of shift you notice in the
              inbox, the calendar, and the deals that come in already
              halfway closed.
            </p>
          </motion.div>

          <motion.div
            ref={resultsRef}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10"
          >
            {METHODOLOGY.results.map((result, idx) => (
              // The motion.div handles the staggered fade-in
              // choreography. The inner `.result-card` div carries the
              // hover bevel + perimeter trail — kept separate so the
              // CSS transform doesn't collide with framer-motion's
              // inline y-translation during the entry animation.
              <motion.div key={result.heading} variants={fadeUp}>
                <div
                  className="result-card flex flex-col gap-4"
                  tabIndex={0}
                  data-active={activeResultIdx === idx ? "true" : undefined}
                  // Tap retriggers this card's active state for ~2.6s
                  // so mobile users can replay the effect on demand.
                  onClick={() => {
                    setActiveResultIdx(idx);
                    window.setTimeout(() => {
                      setActiveResultIdx((curr) => (curr === idx ? -1 : curr));
                    }, 2600);
                  }}
                >
                  {/* Border SVG — three layered rects, opacities driven
                      by the parent's :hover/:focus-visible. See
                      .result-card__border-* in globals.css for tuning. */}
                  <svg
                    className="result-card__border"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <rect
                      className="result-card__border-base"
                      x="0"
                      y="0"
                      width="100"
                      height="100"
                      fill="none"
                    />
                    <rect
                      className="result-card__border-trail"
                      x="0"
                      y="0"
                      width="100"
                      height="100"
                      fill="none"
                      pathLength={100}
                    />
                    <rect
                      className="result-card__border-head"
                      x="0"
                      y="0"
                      width="100"
                      height="100"
                      fill="none"
                      pathLength={100}
                    />
                  </svg>

                  <div className="result-card__icon h-6 w-6 flex items-center justify-center">
                    {RESULT_ICONS[result.icon]}
                  </div>
                  <h4 className="font-serif text-xl lg:text-2xl text-ink leading-snug mt-1">
                    {result.heading}
                  </h4>
                  <p
                    className="result-card__body text-sm lg:text-base text-ink-muted leading-relaxed max-w-[34ch]"
                    style={{ textWrap: "pretty" as never }}
                  >
                    {result.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
