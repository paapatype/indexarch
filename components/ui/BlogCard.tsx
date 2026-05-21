"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { fadeUp } from "@/lib/animations";

interface BlogCardProps {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  compact?: boolean;
}

// Topic-specific tile illustrations. One clear idea per tag, dead simple
// line-art at consistent stroke weight so a glance is enough to read it.
//   Strategy  — line graph trending down (the cost of a bad catalogue)
//   Case Study — PDF → arrow → search bar (the K&K transformation)
//   Technical — cube on a phone, rotation arc (interactive 3D)
//   Industry  — hex bolt + signal arcs (fasteners going digital)
function BlogTileArt({ tag }: { tag: string }) {
  const t = tag.toLowerCase();
  const className =
    "w-44 h-28 lg:w-56 lg:h-32 text-ink-faint transition-transform duration-500 group-hover:scale-[1.04] group-hover:text-ink";
  const stroke = "currentColor";

  if (t === "case study") {
    return (
      <svg viewBox="0 0 200 120" fill="none" stroke={stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        {/* PDF on the left */}
        <rect x="34" y="38" width="34" height="44" />
        <line x1="42" y1="50" x2="60" y2="50" strokeWidth="0.7" opacity="0.55" />
        <line x1="42" y1="56" x2="58" y2="56" strokeWidth="0.7" opacity="0.55" />
        <line x1="42" y1="62" x2="60" y2="62" strokeWidth="0.7" opacity="0.55" />
        <line x1="42" y1="68" x2="54" y2="68" strokeWidth="0.7" opacity="0.55" />
        {/* dog ear */}
        <path d="M62 38 L68 44 L62 44 Z" strokeWidth="0.9" opacity="0.7" />
        {/* arrow */}
        <line x1="78" y1="60" x2="100" y2="60" />
        <polyline points="94,55 100,60 94,65" />
        {/* Search bar on the right */}
        <rect x="108" y="50" width="60" height="14" rx="7" />
        <circle cx="116" cy="57" r="2.6" strokeWidth="0.9" />
        <line x1="118" y1="59" x2="121" y2="62" strokeWidth="0.9" />
        <line x1="126" y1="57" x2="158" y2="57" strokeWidth="0.7" opacity="0.45" />
        {/* filter chips below the bar */}
        <rect x="108" y="70" width="14" height="6" rx="3" strokeWidth="0.7" opacity="0.55" />
        <rect x="126" y="70" width="14" height="6" rx="3" strokeWidth="0.7" opacity="0.55" />
        <rect x="144" y="70" width="14" height="6" rx="3" strokeWidth="0.7" opacity="0.55" />
      </svg>
    );
  }

  if (t === "technical") {
    return (
      <svg
        viewBox="0 0 200 120"
        fill="none"
        stroke={stroke}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} blog-cover-technical`}
        aria-hidden="true"
      >
        {/* ── Faint axis guides — quiet construction marks ── */}
        <line x1="100" y1="6" x2="100" y2="114" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.18" />
        <line x1="6" y1="60" x2="194" y2="60" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.18" />

        {/* ── Central product — sits under examination. Subtle isometric
            block with interior wireframe lines that brighten during the
            "3D" beat. Wrapped in a group so the whole product can rotate
            a few degrees around its centre (100, 60). ── */}
        <g className="bct-product">
          {/* Front face */}
          <rect x="84" y="46" width="32" height="28" strokeWidth="1.1" />
          {/* Top face — perspective */}
          <polyline points="84,46 92,38 124,38 116,46" strokeWidth="0.85" opacity="0.6" />
          {/* Right face — perspective */}
          <polyline points="116,46 124,38 124,66 116,74" strokeWidth="0.85" opacity="0.6" />
          {/* Interior wireframe */}
          <line x1="84" y1="60" x2="116" y2="60" strokeWidth="0.6" opacity="0.3" className="bct-product-wire" />
          <line x1="100" y1="46" x2="100" y2="74" strokeWidth="0.6" opacity="0.3" className="bct-product-wire" />
          <line x1="92" y1="38" x2="92" y2="46" strokeWidth="0.6" opacity="0.25" className="bct-product-wire" />
          <line x1="100" y1="46" x2="108" y2="38" strokeWidth="0.6" opacity="0.25" className="bct-product-wire" />
        </g>

        {/* Focus ring — pulses around the central product during 3D beat */}
        <circle
          className="bct-focus-ring"
          cx="100"
          cy="60"
          r="22"
          strokeWidth="0.8"
        />

        {/* ── SPEC panel (top-left): tiny spec table rows. ── */}
        <g className="bct-panel bct-panel-spec">
          <rect x="14" y="20" width="34" height="24" />
          <line x1="19" y1="26" x2="43" y2="26" strokeWidth="0.55" opacity="0.55" />
          <line x1="19" y1="31" x2="38" y2="31" strokeWidth="0.55" opacity="0.55" />
          <line x1="19" y1="36" x2="43" y2="36" strokeWidth="0.55" opacity="0.55" />
          <line x1="19" y1="41" x2="34" y2="41" strokeWidth="0.55" opacity="0.4" />
          {/* Dimension tick on the right */}
          <line x1="45" y1="26" x2="45" y2="41" strokeWidth="0.45" opacity="0.35" />
          <line x1="43.5" y1="26" x2="46.5" y2="26" strokeWidth="0.45" opacity="0.35" />
          <line x1="43.5" y1="41" x2="46.5" y2="41" strokeWidth="0.45" opacity="0.35" />
        </g>
        <g className="bct-brackets bct-brackets-spec">
          <polyline points="11,23 11,17 17,17" strokeWidth="0.9" />
          <polyline points="45,17 51,17 51,23" strokeWidth="0.9" />
          <polyline points="11,41 11,47 17,47" strokeWidth="0.9" />
          <polyline points="45,47 51,47 51,41" strokeWidth="0.9" />
        </g>

        {/* ── SURFACE panel (top-right): diagonal grain/finish hatching. ── */}
        <g className="bct-panel bct-panel-surface">
          <rect x="152" y="20" width="34" height="24" />
          <line x1="156" y1="40" x2="160" y2="24" strokeWidth="0.5" opacity="0.5" />
          <line x1="162" y1="40" x2="166" y2="24" strokeWidth="0.5" opacity="0.5" />
          <line x1="168" y1="40" x2="172" y2="24" strokeWidth="0.5" opacity="0.5" />
          <line x1="174" y1="40" x2="178" y2="24" strokeWidth="0.5" opacity="0.5" />
          <line x1="180" y1="40" x2="184" y2="24" strokeWidth="0.5" opacity="0.5" />
          {/* Small swatch corner marker */}
          <circle cx="156" cy="40" r="0.9" fill="currentColor" opacity="0.4" />
        </g>
        <g className="bct-brackets bct-brackets-surface">
          <polyline points="149,23 149,17 155,17" strokeWidth="0.9" />
          <polyline points="183,17 189,17 189,23" strokeWidth="0.9" />
          <polyline points="149,41 149,47 155,47" strokeWidth="0.9" />
          <polyline points="183,47 189,47 189,41" strokeWidth="0.9" />
        </g>

        {/* ── SECTION panel (bottom-left): T-profile cross-section with
            dimension tick. ── */}
        <g className="bct-panel bct-panel-section">
          <rect x="14" y="76" width="34" height="24" />
          {/* T-profile silhouette */}
          <polyline
            points="21,82 41,82 41,86 33,86 33,94 29,94 29,86 21,86 21,82"
            strokeWidth="0.7"
            opacity="0.75"
          />
          {/* Dimension callout below */}
          <line x1="21" y1="97" x2="41" y2="97" strokeWidth="0.45" opacity="0.4" />
          <line x1="21" y1="95.5" x2="21" y2="98.5" strokeWidth="0.45" opacity="0.4" />
          <line x1="41" y1="95.5" x2="41" y2="98.5" strokeWidth="0.45" opacity="0.4" />
        </g>
        <g className="bct-brackets bct-brackets-section">
          <polyline points="11,79 11,73 17,73" strokeWidth="0.9" />
          <polyline points="45,73 51,73 51,79" strokeWidth="0.9" />
          <polyline points="11,97 11,103 17,103" strokeWidth="0.9" />
          <polyline points="45,103 51,103 51,97" strokeWidth="0.9" />
        </g>

        {/* ── LAYOUT panel (bottom-right): pin grid inside a connector
            ghost circle — represents electrical / hardware layouts. ── */}
        <g className="bct-panel bct-panel-layout">
          <rect x="152" y="76" width="34" height="24" />
          {/* Connector outline */}
          <circle cx="169" cy="88" r="10" strokeWidth="0.55" opacity="0.45" />
          {/* Pin grid — 5 dots */}
          <circle cx="165" cy="84" r="0.9" fill="currentColor" opacity="0.65" />
          <circle cx="173" cy="84" r="0.9" fill="currentColor" opacity="0.65" />
          <circle cx="161" cy="88" r="0.9" fill="currentColor" opacity="0.65" />
          <circle cx="169" cy="88" r="0.9" fill="currentColor" opacity="0.65" />
          <circle cx="177" cy="88" r="0.9" fill="currentColor" opacity="0.65" />
          <circle cx="165" cy="92" r="0.9" fill="currentColor" opacity="0.65" />
          <circle cx="173" cy="92" r="0.9" fill="currentColor" opacity="0.65" />
        </g>
        <g className="bct-brackets bct-brackets-layout">
          <polyline points="149,79 149,73 155,73" strokeWidth="0.9" />
          <polyline points="183,73 189,73 189,79" strokeWidth="0.9" />
          <polyline points="149,97 149,103 155,103" strokeWidth="0.9" />
          <polyline points="183,103 189,103 189,97" strokeWidth="0.9" />
        </g>
      </svg>
    );
  }

  if (t === "industry") {
    return (
      <svg viewBox="0 0 200 120" fill="none" stroke={stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        {/* Hex bolt head */}
        <polygon points="50,42 66,32 82,42 82,62 66,72 50,62" strokeWidth="1.1" />
        <circle cx="66" cy="52" r="4" strokeWidth="0.7" opacity="0.5" />
        {/* Threaded shaft */}
        <line x1="66" y1="72" x2="66" y2="100" strokeWidth="1.1" />
        <line x1="60" y1="78" x2="72" y2="78" strokeWidth="0.7" opacity="0.5" />
        <line x1="60" y1="84" x2="72" y2="84" strokeWidth="0.7" opacity="0.5" />
        <line x1="60" y1="90" x2="72" y2="90" strokeWidth="0.7" opacity="0.5" />
        <line x1="60" y1="96" x2="72" y2="96" strokeWidth="0.7" opacity="0.5" />
        {/* Wireless signal arcs on the right */}
        <circle cx="118" cy="80" r="1.6" fill={stroke} />
        <path d="M118 70 Q132 70 138 56" strokeWidth="0.9" opacity="0.85" />
        <path d="M118 60 Q142 60 152 38" strokeWidth="0.9" opacity="0.6" />
        <path d="M118 50 Q150 50 164 22" strokeWidth="0.9" opacity="0.4" />
        {/* Subtle dashed gap between bolt and signal */}
        <line x1="86" y1="58" x2="116" y2="76" strokeDasharray="2 3" strokeWidth="0.7" opacity="0.4" />
      </svg>
    );
  }

  // Default + "strategy" — clock fires dollar signs that accelerate
  // toward a wall, hit it, rebound and tumble down into a stacked pile.
  // The strategy tile renders bigger than the other variants so the
  // sequence reads at a glance.
  return <StrategyAnim stroke={stroke} />;
}

// Three dollar tokens, each on its own phase, repeating forever.
const DOLLAR_PHASE_MS = 2400;
const DOLLAR_COUNT = 3;
// Layout — equally spaced (clock → wall → PDF, 68 viewBox units apart)
// and ~25% bigger than the prior pass.
const CLOCK_X = 36;
const CLOCK_Y = 60;
const WALL_X = 104;
const WALL_Y_TOP = 18;
const WALL_Y_BOT = 102;
const IMPACT_Y = 60;
const PDF_LEFT = 151;
const PDF_TOP = 32;

function StrategyAnim({ stroke }: { stroke: string }) {
  // 25% larger render size — still respects the card's aspect-[16/9]
  // padding via Tailwind utility caps.
  const className =
    "w-64 h-40 lg:w-[22rem] lg:h-[13rem] text-ink-faint transition-transform duration-500 group-hover:scale-[1.04] group-hover:text-ink";
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      stroke={stroke}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Clock — face + hour markers + three live hands. Each hand
          rotates continuously; second hand whips around so time
          visibly burns away while the PDF sits untouched. */}
      <g transform={`translate(${CLOCK_X} ${CLOCK_Y})`} opacity="0.9">
        <circle r="18" strokeWidth="1.2" />
        {/* Hour markers at 12, 3, 6, 9 */}
        <line x1="0" y1="-17" x2="0" y2="-14" strokeWidth="0.9" opacity="0.45" />
        <line x1="17" y1="0" x2="14" y2="0" strokeWidth="0.9" opacity="0.45" />
        <line x1="0" y1="17" x2="0" y2="14" strokeWidth="0.9" opacity="0.45" />
        <line x1="-17" y1="0" x2="-14" y2="0" strokeWidth="0.9" opacity="0.45" />
        {/* Hour hand — thick, short, slowest */}
        <motion.line
          x1="0"
          y1="0"
          x2="0"
          y2="-9"
          strokeWidth="1.6"
          stroke={stroke}
          strokeLinecap="round"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ originX: 0.5, originY: 1 }}
        />
        {/* Minute hand — medium */}
        <motion.line
          x1="0"
          y1="0"
          x2="0"
          y2="-13"
          strokeWidth="1.2"
          stroke={stroke}
          strokeLinecap="round"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ originX: 0.5, originY: 1 }}
        />
        {/* Second hand — thin, fastest. ~2s per revolution so it reads
            as time burning while the catalogue sits unbothered. */}
        <motion.line
          x1="0"
          y1="0"
          x2="0"
          y2="-15"
          strokeWidth="0.7"
          stroke={stroke}
          opacity="0.75"
          strokeLinecap="round"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ originX: 0.5, originY: 1 }}
        />
        {/* Center pin */}
        <circle r="1.7" fill={stroke} />
      </g>

      {/* PDF (25% bigger) — equally spaced from the wall */}
      <g transform={`translate(${PDF_LEFT} ${PDF_TOP})`} opacity="0.9">
        <rect x="0" y="0" width="42" height="56" rx="2" strokeWidth="1.2" />
        <path d="M 32 0 L 42 10 L 32 10 Z" strokeWidth="0.9" opacity="0.6" />
        <line x1="7" y1="17" x2="32" y2="17" strokeWidth="0.7" opacity="0.55" />
        <line x1="7" y1="24" x2="26" y2="24" strokeWidth="0.7" opacity="0.55" />
        <line x1="7" y1="31" x2="32" y2="31" strokeWidth="0.7" opacity="0.55" />
        <line x1="7" y1="38" x2="23" y2="38" strokeWidth="0.7" opacity="0.55" />
        <line x1="7" y1="45" x2="29" y2="45" strokeWidth="0.7" opacity="0.55" />
      </g>

      {/* Wall — sits at the midpoint between clock and PDF. */}
      <line
        x1={WALL_X}
        y1={WALL_Y_TOP}
        x2={WALL_X}
        y2={WALL_Y_BOT}
        strokeWidth="1.2"
        opacity="0.7"
      />

      {/* Floor pile — 4 dollars only, scattered (not in a row) and
          rotated so they read as "lying down". Soft opacities so the
          pile feels like it's settled, not stacked. */}
      <g>
        <text
          x="80"
          y="110"
          fontSize="11"
          fontFamily="ui-serif, serif"
          fill={stroke}
          opacity="0.42"
          textAnchor="middle"
          transform="rotate(86 80 110)"
        >
          $
        </text>
        <text
          x="98"
          y="113"
          fontSize="10"
          fontFamily="ui-serif, serif"
          fill={stroke}
          opacity="0.32"
          textAnchor="middle"
          transform="rotate(74 98 113)"
        >
          $
        </text>
        <text
          x="90"
          y="106"
          fontSize="11"
          fontFamily="ui-serif, serif"
          fill={stroke}
          opacity="0.5"
          textAnchor="middle"
          transform="rotate(96 90 106)"
        >
          $
        </text>
        <text
          x="70"
          y="114"
          fontSize="9"
          fontFamily="ui-serif, serif"
          fill={stroke}
          opacity="0.26"
          textAnchor="middle"
          transform="rotate(106 70 114)"
        >
          $
        </text>
      </g>

      {/* Flying dollars + impact pulses, sequenced. */}
      {Array.from({ length: DOLLAR_COUNT }).map((_, i) => (
        <FlyingDollar key={`d${i}`} index={i} stroke={stroke} />
      ))}
      {Array.from({ length: DOLLAR_COUNT }).map((_, i) => (
        <ImpactPulse key={`p${i}`} index={i} stroke={stroke} />
      ))}
    </svg>
  );
}

function FlyingDollar({ index, stroke }: { index: number; stroke: string }) {
  const total = DOLLAR_PHASE_MS * DOLLAR_COUNT;
  const offset = index * DOLLAR_PHASE_MS;
  const fmt = (ms: number) => (offset + ms) / total;
  // Landing scattered near the static pile but not overlapping any
  // single floor dollar.
  const landingX = 66 + ((index * 13) % 30);
  const landingRot = index % 2 ? 18 : -12;

  return (
    <motion.text
      fontSize="14"
      fontFamily="ui-serif, serif"
      fill={stroke}
      textAnchor="middle"
      initial={{ opacity: 0 }}
      animate={{
        // launch → accelerate → impact squash → rebound → gravity fall
        // → land → fade.
        x: [
          CLOCK_X + 8,
          CLOCK_X + 10,
          WALL_X,
          WALL_X,
          WALL_X - 12,
          landingX + 5,
          landingX,
          landingX,
          landingX,
        ],
        y: [
          IMPACT_Y,
          IMPACT_Y,
          IMPACT_Y,
          IMPACT_Y,
          IMPACT_Y + 2,
          IMPACT_Y + 22,
          IMPACT_Y + 44,
          IMPACT_Y + 44,
          IMPACT_Y + 44,
        ],
        scaleX: [1, 1, 1, 0.5, 1.12, 1, 1, 1, 1],
        scaleY: [1, 1, 1, 1.45, 0.88, 1, 1, 1, 1],
        rotate: [0, 0, 0, -6, 14, 44, landingRot, landingRot, landingRot],
        opacity: [0, 1, 1, 1, 1, 0.95, 0.55, 0.55, 0],
      }}
      transition={{
        duration: total / 1000,
        repeat: Infinity,
        ease: [
          "easeOut",
          [0.55, 0, 0.95, 0.4], // accelerate aggressively into wall
          [0.35, 0, 0.65, 1],
          [0.2, 0.8, 0.4, 1],
          [0.4, 0, 0.85, 0.4],
          [0.2, 0.6, 0.4, 1],
          "linear",
          "easeIn",
        ] as never,
        times: [
          fmt(0),
          fmt(80),
          fmt(680),
          fmt(760),
          fmt(880),
          fmt(1180),
          fmt(1600),
          fmt(2000),
          fmt(DOLLAR_PHASE_MS),
        ],
      }}
      style={{ transformOrigin: "center" } as never}
    >
      $
    </motion.text>
  );
}

// Gentle pulse along the wall at the moment of impact. Two short
// strokes radiate up and down from the impact point, fading as they
// extend. Sized small and faint so it reads as a ripple, not a flash.
function ImpactPulse({ index, stroke }: { index: number; stroke: string }) {
  const total = DOLLAR_PHASE_MS * DOLLAR_COUNT;
  const offset = index * DOLLAR_PHASE_MS;
  // Impact happens around 680ms into each dollar's slot (when the
  // dollar reaches the wall). Pulse lasts ~900ms.
  const IMPACT = 680;
  const PULSE = 900;
  const slotEnd = DOLLAR_PHASE_MS;
  const times = [
    offset / total,
    (offset + IMPACT - 30) / total,
    (offset + IMPACT + 60) / total,
    (offset + IMPACT + PULSE) / total,
    (offset + slotEnd) / total,
  ];
  const transition = {
    duration: total / 1000,
    repeat: Infinity,
    ease: "easeOut",
    times,
  } as const;
  return (
    <g>
      {/* Up trail — thin line that travels from the impact point UP
          the wall to its top end. Same stroke width as the wall itself
          so it reads as the wall's own ripple, not a separate flash. */}
      <motion.line
        x1={WALL_X}
        x2={WALL_X}
        y1={IMPACT_Y}
        strokeWidth="1.2"
        strokeLinecap="round"
        stroke={stroke}
        animate={{
          y2: [IMPACT_Y, IMPACT_Y, IMPACT_Y - 6, WALL_Y_TOP, WALL_Y_TOP],
          opacity: [0, 0, 0.95, 0.4, 0],
        }}
        transition={transition}
      />
      {/* Down trail — same idea, travels DOWN the wall to its bottom. */}
      <motion.line
        x1={WALL_X}
        x2={WALL_X}
        y1={IMPACT_Y}
        strokeWidth="1.2"
        strokeLinecap="round"
        stroke={stroke}
        animate={{
          y2: [IMPACT_Y, IMPACT_Y, IMPACT_Y + 6, WALL_Y_BOT, WALL_Y_BOT],
          opacity: [0, 0, 0.95, 0.4, 0],
        }}
        transition={transition}
      />
    </g>
  );
}

export default function BlogCard({
  slug,
  tag,
  title,
  excerpt,
  readTime,
  date,
  compact = false,
}: BlogCardProps) {
  return (
    <motion.article variants={fadeUp}>
      <Link
        href={`/blog/${slug}`}
        className="group block border border-rule bg-surface-raised transition-shadow duration-300 hover:shadow-card-hover"
      >
        {/* Tile illustration — topic-specific */}
        <div className="relative aspect-[16/9] bg-surface-sunken overflow-hidden border-b border-rule">
          <div className="absolute inset-0 flex items-center justify-center">
            <BlogTileArt tag={tag} />
          </div>
        </div>

        {/* Card body */}
        <div className={compact ? "p-5" : "p-6 lg:p-8"}>
          <span className="inline-block font-mono text-xs tracking-widest uppercase text-ink-muted mb-3">
            {tag}
          </span>
          <h3
            className={`font-serif text-ink leading-snug group-hover:text-accent transition-colors duration-200 ${
              compact ? "text-lg mb-2" : "text-xl lg:text-2xl mb-3"
            }`}
            style={{ textWrap: "balance" as never }}
          >
            {title}
          </h3>
          {!compact && (
            <p className="text-sm text-ink-muted leading-relaxed mb-4 line-clamp-2">
              {excerpt}
            </p>
          )}
          <div className="flex items-center gap-3 font-mono text-xs text-ink-faint">
            <span>{readTime}</span>
            <span className="text-rule">|</span>
            <span>{date}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
