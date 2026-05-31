"use client";

import { useId, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";

// ─── Content ───────────────────────────────────────────────────────
// Kept inline because this is a single bespoke section, not a
// data-driven list. The copy is the entire point of the section —
// pulling it into lib/constants would only add indirection.

const EYEBROW = "Pricing";
const HEADLINE = "It costs less than the deals you’re already losing.";
const SUBHEAD =
  "One project, one-time. We build your catalogue into a sales engine end-to-end — and the next step is a conversation, not a checkout.";

const PRICE_BAND = {
  caption: "Most projects land between",
  rangeLow: "$2,000",
  rangeHigh: "$6,000",
  qualifier: "(one-time)",
  paragraph:
    "Where you fall comes down mostly to how many products you carry — and how deep the spec filtering and variation go inside your range. We scope it exactly on the call — no surprises, no subscriptions quietly stacking up.",
};

// Midpoint of the $2k–$6k band. Used both in the payback math and
// disclosed in the caption beneath the result cards.
const PROJECT_COST = 4000;

// USD formatter — whole dollars, comma-grouped, no decimals. Used
// everywhere a figure renders so the slider readout, the calculator
// caption, and the result cards all match.
const fmtUSD = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

// ─── Section ───────────────────────────────────────────────────────

export default function Pricing() {
  // useId so the <label htmlFor> wiring is collision-safe under React
  // strict-mode double-renders and any future SSR/Suspense boundary
  // changes.
  const orderId = useId();
  const dealsId = useId();

  const [orderValue, setOrderValue] = useState(5000); // USD, step 500, 1k–50k
  const [extraDeals, setExtraDeals] = useState(1); // 1–10 per month

  // Derived figures. Recomputed only when a slider moves so the
  // result-card render stays cheap.
  const { extraAnnual, paybackDeals, firstYearReturn } = useMemo(() => {
    const extraAnnualV = orderValue * extraDeals * 12;
    const paybackDealsV = Math.max(1, Math.ceil(PROJECT_COST / orderValue));
    const firstYearReturnV = Math.round(extraAnnualV / PROJECT_COST);
    return {
      extraAnnual: extraAnnualV,
      paybackDeals: paybackDealsV,
      firstYearReturn: firstYearReturnV,
    };
  }, [orderValue, extraDeals]);

  return (
    <section
      id="pricing"
      className="relative py-16 lg:py-20 bg-surface-sunken"
    >
      <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
        {/* ── Header — asymmetric editorial grid, tightened.
            mb shrunk vs. the prior version so the unified panel
            below sits inside the same desktop viewport as the
            headline + subhead instead of being a scroll away. */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 mb-8 lg:mb-10 items-start"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div
            variants={fadeUp}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <span className="block font-mono text-xs tracking-widest uppercase text-ink-faint mb-3">
              {EYEBROW}
            </span>
            <h2
              className="font-serif text-[1.85rem] sm:text-4xl lg:text-[2.5rem] text-ink leading-[1.2] lg:leading-[1.15]"
              style={{ textWrap: "balance" as never }}
            >
              {HEADLINE}
            </h2>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="lg:col-span-5 lg:pt-3 text-base lg:text-lg text-ink-muted leading-relaxed max-w-md mx-auto lg:mx-0 text-center lg:text-left"
            style={{ textWrap: "pretty" as never }}
          >
            {SUBHEAD}
          </motion.p>
        </motion.div>

        {/* ── Unified panel ─────────────────────────────────────
            One bordered frame split into two halves on desktop:
              Left  → price band ($2,000 – $6,000 + context)
              Right → calculator (sliders + result cards)
            On mobile the two halves stack vertically with a hairline
            divider in between. The whole section now fits inside a
            single desktop viewport (no scroll required to see the
            full pricing picture). */}
        <motion.div
          className="mx-auto max-w-[1024px] border border-rule bg-surface-raised grid grid-cols-1 lg:grid-cols-2 lg:divide-x lg:divide-rule"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* ── Left half — price band ───────────────────────── */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col justify-center p-8 lg:p-10 text-center border-b lg:border-b-0 border-rule"
          >
            <span className="block font-mono text-xs tracking-widest uppercase text-ink-faint mb-4">
              {PRICE_BAND.caption}
            </span>
            <span className="block font-mono text-[1.85rem] sm:text-4xl lg:text-[2.5rem] text-ink leading-none tabular-nums whitespace-nowrap">
              {PRICE_BAND.rangeLow}
              <span className="mx-3 sm:mx-4 text-ink-faint">–</span>
              {PRICE_BAND.rangeHigh}
            </span>
            <span className="block mt-3 font-mono text-sm text-ink-muted">
              {PRICE_BAND.qualifier}
            </span>
            <p
              className="mt-6 lg:mt-7 text-sm lg:text-base text-ink-muted leading-relaxed max-w-sm mx-auto"
              style={{ textWrap: "pretty" as never }}
            >
              Where you fall comes down mostly to how many products you
              carry — and how deep the spec filtering and variation go
              inside your range. We scope it exactly on the call — no
              surprises, no subscriptions{" "}
              <span className="whitespace-nowrap">quietly stacking up.</span>
            </p>
          </motion.div>

          {/* ── Right half — calculator (sliders + results) ───── */}
          <motion.div variants={fadeUp} className="flex flex-col">
            {/* Two compact in-bar sliders with a small gap between
                them — each bar carries its own label + live value, so
                no separate label rows or tick rows are needed. A small
                hint above makes it clear the bars are draggable. */}
            <div className="flex flex-col gap-2.5 p-4 lg:p-5">
              <p className="flex items-center justify-center gap-2 font-mono text-[10px] tracking-widest uppercase text-ink-faint">
                <span aria-hidden>↔</span> Drag the sliders to your numbers
              </p>
              <SliderField
                id={orderId}
                label="Average order value"
                min={1000}
                max={50000}
                step={500}
                value={orderValue}
                onChange={setOrderValue}
                displayValue={fmtUSD(orderValue)}
                valueText={fmtUSD(orderValue)}
              />
              <SliderField
                id={dealsId}
                label="Extra deals closed / month"
                min={1}
                max={10}
                step={1}
                value={extraDeals}
                onChange={setExtraDeals}
                displayValue={String(extraDeals)}
                valueText={`${extraDeals} extra deal${extraDeals === 1 ? "" : "s"} per month`}
              />
            </div>

            {/* Result cards pinned to the bottom of the right half
                (mt-auto) so they line up with the bottom of the price
                band on desktop. 3-across on EVERY viewport (incl.
                mobile) so the two sliders + all three results fit in
                one phone screen without scrolling — previously they
                stacked vertically on mobile and pushed the last
                result off-screen. */}
            <div className="mt-auto border-t border-rule grid grid-cols-3 gap-px bg-rule">
              <ResultCard
                lines={["Extra", "revenue per year"]}
                figure={fmtUSD(extraAnnual)}
              />
              <ResultCard
                lines={["Pays for", "itself after"]}
                figure={`${paybackDeals} ${paybackDeals === 1 ? "deal" : "deals"}`}
              />
              <ResultCard
                lines={["First-year", "return"]}
                figure={`${firstYearReturn}×`}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* ── Caption — quiet small print under the unified panel. */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-5 font-mono text-xs text-ink-faint tracking-wide text-center max-w-md mx-auto leading-relaxed"
          style={{ textWrap: "balance" as never }}
        >
          Based on a one-time project cost of {fmtUSD(PROJECT_COST)} (midpoint
          of the $2k–$6k range). Your numbers, your math.
        </motion.p>

      </div>
    </section>
  );
}

// ─── Slider field — compact in-bar control ─────────────────────────
// The label and live value sit INSIDE a single horizontal bar (label
// left, value right) with a fill that grows from the left to show the
// position. This collapses each control to one ~52px row instead of
// the old stacked label-row + track + min/max-tick layout (~110px),
// so both sliders + the 3 result cards fit one phone screen.
//
// Interaction is driven by the Pointer Events API (pointerdown +
// pointermove with setPointerCapture), NOT a native <input type=range>.
// A transparent native range overlay refused to drag on mobile Safari
// even with touch-action:none; pointer events behave identically for
// mouse, touch, and pen. Accessibility is provided explicitly via
// role="slider" + aria-value* + arrow/Home/End keyboard handling.

interface SliderFieldProps {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  displayValue: string;
  valueText: string;
}

function SliderField({
  id,
  label,
  min,
  max,
  step,
  value,
  onChange,
  displayValue,
  valueText,
}: SliderFieldProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const pct = ((value - min) / (max - min)) * 100;

  const clamp = (n: number) => Math.min(max, Math.max(min, n));

  // Map a pointer's clientX to a stepped value, measured against the
  // visible track (so the thumb sits exactly under the finger).
  const valueFromX = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return value;
    const r = el.getBoundingClientRect();
    const ratio = r.width > 0 ? (clientX - r.left) / r.width : 0;
    const raw = min + Math.min(1, Math.max(0, ratio)) * (max - min);
    return clamp(Math.round(raw / step) * step);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    onChange(valueFromX(e.clientX));
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    onChange(valueFromX(e.clientX));
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* pointer already released */
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let next = value;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = value - step;
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") next = value + step;
    else if (e.key === "Home") next = min;
    else if (e.key === "End") next = max;
    else if (e.key === "PageUp") next = value + step * 5;
    else if (e.key === "PageDown") next = value - step * 5;
    else return;
    e.preventDefault();
    onChange(clamp(next));
  };

  return (
    <div
      id={id}
      role="slider"
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={valueText}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
      // touch-none = touch-action:none so touch drags adjust the slider
      // instead of scrolling the page. cursor-pointer + select-none for
      // the drag feel; focus-visible ring for keyboard users.
      className="relative h-[58px] cursor-pointer touch-none select-none overflow-hidden rounded-md bg-surface-sunken focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/30"
    >
      {/* Label (top-left) + live value (top-right), inside the bar. */}
      <span className="pointer-events-none absolute left-4 top-3 z-10 font-mono text-[11px] tracking-widest uppercase text-ink-muted">
        {label}
      </span>
      <span
        className="pointer-events-none absolute right-4 top-[9px] z-10 font-mono text-base text-ink tabular-nums"
        aria-hidden
      >
        {displayValue}
      </span>

      {/* Visible track + thumb along the bottom of the bar. The groove +
          round knob make it unmistakably a slider even at the minimum.
          pointer-events-none so the bar (not the track) owns the
          gesture; trackRef is only used to measure the geometry. */}
      <div
        ref={trackRef}
        className="pointer-events-none absolute inset-x-4 bottom-[14px] h-1 rounded-full bg-ink/15"
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-ink/40"
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] shadow-sm"
          style={{
            left: `${pct}%`,
            background: "var(--slider-thumb-bg)",
            borderColor: "var(--slider-thumb-border)",
          }}
        />
      </div>
    </div>
  );
}

// ─── Result card ───────────────────────────────────────────────────
// `min-h` locks the card height so the figure swap as a user drags
// never reflows the panel. `aria-live="polite"` on the figure lets
// screen readers hear updates without spam.

interface ResultCardProps {
  // Two explicit label lines so every card's label is exactly 2 lines.
  // That keeps the gap between label and figure identical across all
  // three cards (a 1-line label left a big uneven gap under
  // "First-year return"). It also lets us control the wording — e.g.
  // "revenue per year" instead of "revenue / year".
  lines: [string, string];
  figure: string;
}

function ResultCard({ lines, figure }: ResultCardProps) {
  return (
    // 3-across on every viewport, so the card stays compact enough that
    // even the widest value ("$6,000,000") fits a ~109px mobile column.
    // The label is forced to exactly 2 lines (one block span each) for
    // consistent height; the figure scales up with viewport.
    <div className="bg-surface-raised px-2 py-4 lg:px-5 lg:py-5 min-h-[5.5rem] lg:min-h-[6rem] flex flex-col items-center justify-between text-center">
      <span className="font-mono text-[8.5px] sm:text-[10px] tracking-wide sm:tracking-widest uppercase text-ink-muted leading-tight">
        <span className="block">{lines[0]}</span>
        <span className="block">{lines[1]}</span>
      </span>
      <span
        className="block mt-2 font-mono text-base sm:text-xl lg:text-[1.15rem] text-ink leading-none tabular-nums tracking-tight"
        aria-live="polite"
      >
        {figure}
      </span>
    </div>
  );
}
