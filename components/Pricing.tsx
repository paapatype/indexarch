"use client";

import { useId, useMemo, useState } from "react";
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
            {/* Sliders stacked vertically; hairline between the two
                fields keeps each slider feeling like its own discrete
                row. */}
            <div className="flex flex-col divide-y divide-rule">
              <div className="px-5 py-5 lg:px-7 lg:py-6">
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
                  minLabel="$1k"
                  maxLabel="$50k"
                />
              </div>
              <div className="px-5 py-5 lg:px-7 lg:py-6">
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
                  minLabel="1"
                  maxLabel="10"
                />
              </div>
            </div>

            {/* Result cards pinned to the bottom of the right half
                (mt-auto) so they line up with the bottom of the price
                band on desktop. */}
            <div className="mt-auto border-t border-rule grid grid-cols-1 sm:grid-cols-3 gap-px bg-rule">
              <ResultCard
                label="Extra revenue / year"
                figure={fmtUSD(extraAnnual)}
              />
              <ResultCard
                label="Pays for itself after"
                figure={`${paybackDeals} ${paybackDeals === 1 ? "deal" : "deals"}`}
              />
              <ResultCard
                label="First-year return"
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

// ─── Slider field (label + value readout + native range) ───────────
// Extracted so the markup for both sliders is symmetrical and the
// accessibility wiring is impossible to forget on one of them.
// `pricing-range` is the class globals.css uses to recolour the
// native range track/thumb to the editorial palette.

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
  minLabel: string;
  maxLabel: string;
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
  minLabel,
  maxLabel,
}: SliderFieldProps) {
  return (
    <div>
      {/* Label + value:
          – Mobile: stacked vertically and centred so the slider
            field reads as a single centred unit (matches the
            centred price band and calculator lead-in above).
          – sm: and up: side-by-side with the label on the left and
            the value on the right, which gives the wider desktop
            slider room to breathe without feeling cramped. */}
      <div className="flex flex-col items-center text-center gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:text-left sm:gap-3 mb-3">
        <label
          htmlFor={id}
          className="font-mono text-xs tracking-widest uppercase text-ink-faint"
        >
          {label}
        </label>
        {/* tabular-nums keeps digit columns aligned so dragging never
            jiggles the readout's width. aria-hidden because the
            range's aria-valuetext already announces the value. */}
        <span
          className="font-mono text-base lg:text-lg text-ink tabular-nums"
          aria-hidden
        >
          {displayValue}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={valueText}
        className="pricing-range w-full"
      />
      {/* Min/max tick labels stay anchored to the slider's range
          endpoints on every viewport — they're positional cues, not
          centred text. Bumped from text-[10px] text-ink-faint to a
          larger, less-muted text-xs text-ink-muted so the endpoints
          read as real anchors and not afterthought captions. */}
      <div className="mt-3 flex items-center justify-between font-mono text-xs tracking-[0.12em] uppercase text-ink-muted">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

// ─── Result card ───────────────────────────────────────────────────
// `min-h` locks the card height so the figure swap as a user drags
// never reflows the panel. `aria-live="polite"` on the figure lets
// screen readers hear updates without spam.

interface ResultCardProps {
  label: string;
  figure: string;
}

function ResultCard({ label, figure }: ResultCardProps) {
  return (
    // text-center across every viewport so the three result cards
    // read as a centred trio of units (the figures sit visually
    // under their label rather than left-anchored against the cell
    // edge).
    //
    // Figure sizing tuned so the widest possible value ("$6,000,000",
    // 10 characters at the max slider setting) fits comfortably
    // inside the narrow desktop card (~170px wide inside the right
    // half of the unified panel):
    //   – mobile (cards stack full-width): text-2xl (~24px)
    //   – sm   (3-col grid kicks in, cards get tighter): text-lg
    //   – lg   (still 3-col, ~170px each): text-[1.15rem] (~18.4px)
    // tabular-nums + tracking-tight + leading-none keep the figure
    // compact, and break-words/word-break-keep-all stop a stray
    // figure from clipping the cell's right edge.
    <div className="bg-surface-raised p-4 lg:p-5 min-h-[6rem] flex flex-col items-center justify-between text-center">
      <span className="block font-mono text-[10.5px] tracking-widest uppercase text-ink-muted">
        {label}
      </span>
      <span
        className="block mt-2 font-mono text-2xl sm:text-lg lg:text-[1.15rem] text-ink leading-none tabular-nums tracking-tight"
        aria-live="polite"
      >
        {figure}
      </span>
    </div>
  );
}
