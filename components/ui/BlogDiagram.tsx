"use client";

import { motion } from "motion/react";

interface BlogDiagramProps {
  name: string;
}

/**
 * Simple inline diagrams used inside blog posts. Same line-art language
 * as the rest of the site: currentColor strokes, low opacity for
 * secondary detail, no fills except where a glyph is solid by design.
 *
 * Diagrams are referenced from blog content via `[DIAGRAM:name]` markers
 * which the post renderer recognises.
 */
export default function BlogDiagram({ name }: BlogDiagramProps) {
  const diagram = DIAGRAMS[name];
  if (!diagram) return null;
  return (
    <figure className="my-12 border border-rule bg-surface-raised">
      <div className="aspect-[3/1.4] flex items-center justify-center text-ink-faint p-6">
        {diagram.svg}
      </div>
      <figcaption className="border-t border-rule px-6 py-3 font-mono text-xs tracking-wide text-ink-faint">
        {diagram.caption}
      </figcaption>
    </figure>
  );
}

const DIAGRAMS: Record<string, { caption: string; svg: React.ReactElement }> = {
  // PDF row vs Web tile — same product, two presentations. Left side
  // now mirrors the actual Kayu & Kov PDF (logo top-left, blue header
  // row with the real column titles, highlighted Fluted-3 row). Right
  // side's 3D shape rotates continuously to suggest "interactive".
  "pdf-vs-tile": {
    caption:
      "Same profile, two presentations. The PDF row buries the spec; the web tile leads with it.",
    svg: (
      <svg viewBox="0 0 480 200" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-auto max-h-[260px]">
        {/* ─── LEFT: PDF page (Kayu & Kov-styled) ─── */}
        <g>
          {/* Page edge */}
          <rect x="20" y="14" width="200" height="172" strokeWidth="0.7" opacity="0.4" />

          {/* KAYU&KOV logo block — circle "K" + wordmark */}
          <g transform="translate(28 24)">
            <circle cx="8" cy="8" r="7" strokeWidth="0.9" fill="currentColor" fillOpacity="0.25" />
            <text x="8" y="11" textAnchor="middle" fontSize="8" fontWeight="700" fontFamily="ui-sans-serif, system-ui, sans-serif" fill="currentColor">K</text>
            <text x="20" y="11" fontSize="7" fontWeight="600" fontFamily="ui-sans-serif, system-ui, sans-serif" fill="currentColor" letterSpacing="0.5">KAYU&amp;KOV</text>
          </g>

          {/* "Updated profile and / Suggested Listed price - 2025" headline */}
          <text x="28" y="50" fontSize="6" fontFamily="ui-sans-serif, system-ui, sans-serif" fill="currentColor" opacity="0.7">
            Updated profile and /Suggested Listed price -2025
          </text>

          {/* Blue header band with column titles */}
          <rect x="24" y="56" width="192" height="14" fill="currentColor" fillOpacity="0.18" strokeWidth="0" />
          <line x1="48" y1="56" x2="48" y2="70" strokeWidth="0.5" opacity="0.55" />
          <line x1="106" y1="56" x2="106" y2="70" strokeWidth="0.5" opacity="0.55" />
          <line x1="132" y1="56" x2="132" y2="70" strokeWidth="0.5" opacity="0.55" />
          <line x1="170" y1="56" x2="170" y2="70" strokeWidth="0.5" opacity="0.55" />
          <text x="36" y="65" textAnchor="middle" fontSize="5" fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="600" fill="currentColor" opacity="0.85">Sr.No.</text>
          <text x="77" y="65" textAnchor="middle" fontSize="5" fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="600" fill="currentColor" opacity="0.85">Profile</text>
          <text x="119" y="65" textAnchor="middle" fontSize="5" fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="600" fill="currentColor" opacity="0.85">Rate</text>
          <text x="151" y="65" textAnchor="middle" fontSize="5" fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="600" fill="currentColor" opacity="0.85">Dimensions</text>
          <text x="193" y="65" textAnchor="middle" fontSize="5" fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="600" fill="currentColor" opacity="0.85">Dimensions</text>

          {/* Highlighted row — Fluted Profile-3 */}
          <rect x="24" y="74" width="192" height="22" fill="currentColor" fillOpacity="0.06" strokeWidth="0" />
          <line x1="24" y1="74" x2="216" y2="74" strokeWidth="0.5" opacity="0.45" />
          <line x1="24" y1="96" x2="216" y2="96" strokeWidth="0.5" opacity="0.45" />
          <line x1="48" y1="74" x2="48" y2="96" strokeWidth="0.4" opacity="0.45" />
          <line x1="106" y1="74" x2="106" y2="96" strokeWidth="0.4" opacity="0.45" />
          <line x1="132" y1="74" x2="132" y2="96" strokeWidth="0.4" opacity="0.45" />
          <line x1="170" y1="74" x2="170" y2="96" strokeWidth="0.4" opacity="0.45" />
          <text x="36" y="88" textAnchor="middle" fontSize="6" fontFamily="ui-sans-serif, system-ui, sans-serif" fill="currentColor">1.</text>
          <text x="55" y="85" fontSize="5.5" fontFamily="ui-sans-serif, system-ui, sans-serif" fill="currentColor">Fluted Profile-3</text>
          <text x="55" y="92" fontSize="4.5" fontFamily="ui-sans-serif, system-ui, sans-serif" fill="currentColor" opacity="0.55">145 x 18mm</text>
          <text x="119" y="88" textAnchor="middle" fontSize="6" fontFamily="ui-sans-serif, system-ui, sans-serif" fill="currentColor">348</text>
          {/* 2D dimension drawing (cross-section sketch) */}
          <g transform="translate(140 82)" opacity="0.7">
            <rect x="0" y="0" width="24" height="6" strokeWidth="0.45" />
            <line x1="4" y1="0" x2="4" y2="6" strokeWidth="0.35" />
            <line x1="10" y1="0" x2="10" y2="6" strokeWidth="0.35" />
            <line x1="16" y1="0" x2="16" y2="6" strokeWidth="0.35" />
            <line x1="22" y1="0" x2="22" y2="6" strokeWidth="0.35" />
          </g>
          {/* 3D rendering — small isometric block */}
          <g transform="translate(180 82)" opacity="0.75">
            <polygon points="0,4 8,0 18,4 18,9 10,13 0,9" strokeWidth="0.5" fill="currentColor" fillOpacity="0.18" />
            <line x1="0" y1="4" x2="8" y2="8" strokeWidth="0.35" opacity="0.55" />
            <line x1="18" y1="4" x2="8" y2="8" strokeWidth="0.35" opacity="0.55" />
            <line x1="8" y1="8" x2="8" y2="13" strokeWidth="0.35" opacity="0.55" />
          </g>

          {/* Dim siblings beneath */}
          {[104, 120, 136, 152, 168].map((y) => (
            <g key={y} opacity="0.25">
              <line x1="24" y1={y} x2="216" y2={y} strokeWidth="0.45" />
              <text x="36" y={y + 6} textAnchor="middle" fontSize="5" fontFamily="ui-sans-serif, system-ui, sans-serif" fill="currentColor">·</text>
              <line x1="50" y1={y + 4} x2="100" y2={y + 4} strokeWidth="0.4" />
              <line x1="110" y1={y + 4} x2="128" y2={y + 4} strokeWidth="0.4" />
            </g>
          ))}
        </g>

        {/* Connector arrow */}
        <g opacity="0.6">
          <line x1="228" y1="100" x2="270" y2="100" strokeWidth="1.2" />
          <polyline points="262,94 270,100 262,106" strokeWidth="1.2" />
        </g>

        {/* ─── RIGHT: Web tile (card) ─── */}
        <g>
          <rect x="282" y="36" width="178" height="128" rx="3" strokeWidth="1" />
          <rect x="292" y="46" width="14" height="14" rx="2" strokeWidth="0.8" fill="currentColor" fillOpacity="0.2" />
          <text x="296" y="56" fontSize="8" fontFamily="ui-monospace, monospace" fill="currentColor">1</text>
          <text x="316" y="55" fontSize="9" fontFamily="ui-serif, serif" fill="currentColor">Fluted Profile-3</text>
          <rect x="420" y="46" width="28" height="11" rx="2" strokeWidth="0.6" opacity="0.55" />
          <text x="425" y="54" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.7">FLUTED</text>

          {/* 3D rendering — slowly rotates around the card's centre */}
          <motion.g
            style={{ transformOrigin: "371px 99px", transformBox: "fill-box" as never }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          >
            <polygon
              points="335,113 371,67 407,113 407,141 371,159 335,141"
              strokeWidth="0.9"
              opacity="0.75"
            />
            <line x1="335" y1="113" x2="371" y2="125" strokeWidth="0.6" opacity="0.55" />
            <line x1="407" y1="113" x2="371" y2="125" strokeWidth="0.6" opacity="0.55" />
            <line x1="371" y1="125" x2="371" y2="159" strokeWidth="0.6" opacity="0.55" />
          </motion.g>

          {/* Dimension + rate row */}
          <text x="292" y="158" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.7">145 × 18mm</text>
          <text x="430" y="158" fontSize="9" fontFamily="ui-monospace, monospace" fill="currentColor">₹348</text>
        </g>

        {/* Labels */}
        <text x="120" y="194" fontSize="6.5" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.5" textAnchor="middle">PDF ROW</text>
        <text x="371" y="194" fontSize="6.5" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.5" textAnchor="middle">WEB TILE</text>
      </svg>
    ),
  },

  // Architect's mental flow: brief → filter → order.
  // Eight-second editorial animation driven entirely by CSS keyframes
  // scoped to `blog-diagram-bto` in globals.css. The story:
  //   brief requirement lines draw in → indexing packet travels to the
  //   filter interface → filter chips activate one by one → the ribbed
  //   WPC profile card resolves as the match (corner brackets + non-
  //   matches dim) → selected packet travels to the order card →
  //   product row populates → form fields draw in → submit-confirmation
  //   tick draws inside its badge → hold → reset → loop.
  "brief-to-order": {
    caption:
      "How an architect actually uses the catalogue: come in with a brief, narrow to a match, send the order.",
    svg: (
      <svg
        viewBox="0 0 480 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-auto max-h-[260px] blog-diagram-bto"
      >
        {/* ── STAGE 1: BRIEF — speech-bubble card ── */}
        <path
          className="bto-brief-card"
          d="M16,40 L124,40 Q130,40 130,46 L130,108 Q130,114 124,114 L34,114 L24,124 L26,114 L16,114 Q10,114 10,108 L10,46 Q10,40 16,40 Z"
          strokeWidth="1.1"
        />
        {/* Header (always visible — quiet) */}
        <line x1="20" y1="50" x2="58" y2="50" strokeWidth="1" opacity="0.65" />
        <line x1="20" y1="54" x2="42" y2="54" strokeWidth="0.5" opacity="0.4" />
        {/* Requirement lines — stagger draw-in via stroke-dashoffset */}
        <line className="bto-brief-line bto-brief-line-1" x1="20" y1="66" x2="120" y2="66" />
        <line className="bto-brief-line bto-brief-line-2" x1="20" y1="74" x2="108" y2="74" />
        <line className="bto-brief-line bto-brief-line-3" x1="20" y1="82" x2="115" y2="82" />
        {/* Requirement chips (size / finish / profile) */}
        <rect className="bto-brief-chip bto-brief-chip-1" x="20" y="94" width="22" height="9" rx="2" />
        <rect className="bto-brief-chip bto-brief-chip-2" x="46" y="94" width="28" height="9" rx="2" />
        <rect className="bto-brief-chip bto-brief-chip-3" x="78" y="94" width="32" height="9" rx="2" />

        {/* ── Connector 1: brief → filter ── */}
        <line
          className="bto-connector bto-connector-1"
          x1="140"
          y1="78"
          x2="160"
          y2="78"
          strokeWidth="0.7"
          strokeDasharray="3 2"
        />
        {/* Packet 1 — small dot moving from brief to filter */}
        <circle
          className="bto-packet bto-packet-1"
          cx="0"
          cy="0"
          r="2"
          fill="currentColor"
        />

        {/* ── STAGE 2: FILTER — catalogue interface ── */}
        <rect
          className="bto-filter-card"
          x="162"
          y="40"
          width="158"
          height="74"
          strokeWidth="1.1"
        />

        {/* Filter chips row */}
        <rect x="168" y="46" width="28" height="9" rx="2" strokeWidth="0.7" opacity="0.65" />
        <rect className="bto-filter-chip-active bto-filter-chip-1" x="168" y="46" width="28" height="9" rx="2" />

        <rect x="200" y="46" width="28" height="9" rx="2" strokeWidth="0.7" opacity="0.65" />
        <rect className="bto-filter-chip-active bto-filter-chip-2" x="200" y="46" width="28" height="9" rx="2" />

        <rect x="232" y="46" width="28" height="9" rx="2" strokeWidth="0.7" opacity="0.65" />
        <rect className="bto-filter-chip-active bto-filter-chip-3" x="232" y="46" width="28" height="9" rx="2" />

        <rect x="264" y="46" width="28" height="9" rx="2" strokeWidth="0.7" opacity="0.65" />
        <rect className="bto-filter-chip-active bto-filter-chip-4" x="264" y="46" width="28" height="9" rx="2" />

        {/* Profile cards — 2×2 grid */}
        {/* Card 1 (top-left) — fluted */}
        <g className="bto-card bto-card-1">
          <rect x="168" y="60" width="70" height="22" strokeWidth="0.85" />
          <polyline
            points="178,78 178,66 180,66 180,68 182,66 184,68 186,66 188,68 190,66 192,68 194,66 196,68 198,66 200,68 202,66 204,68 206,66 208,68 210,66 212,68 214,66 216,68 218,66 220,68 222,66 224,68 226,66 226,78 178,78"
            strokeWidth="0.5"
            opacity="0.6"
          />
        </g>
        {/* Card 2 (top-right) — hollow box */}
        <g className="bto-card bto-card-2">
          <rect x="244" y="60" width="70" height="22" strokeWidth="0.85" />
          <rect x="265" y="64" width="28" height="14" strokeWidth="0.6" opacity="0.65" />
          <rect x="270" y="68" width="18" height="6" strokeWidth="0.45" opacity="0.45" />
        </g>
        {/* Card 3 (bottom-left) — RIBBED (the match) */}
        <g className="bto-card-match">
          <rect x="168" y="86" width="70" height="22" strokeWidth="0.85" />
          <rect x="176" y="90" width="54" height="14" strokeWidth="0.6" opacity="0.8" />
          <line x1="180" y1="92" x2="180" y2="102" strokeWidth="0.4" opacity="0.55" />
          <line x1="184" y1="92" x2="184" y2="102" strokeWidth="0.4" opacity="0.55" />
          <line x1="188" y1="92" x2="188" y2="102" strokeWidth="0.4" opacity="0.55" />
          <line x1="192" y1="92" x2="192" y2="102" strokeWidth="0.4" opacity="0.55" />
          <line x1="196" y1="92" x2="196" y2="102" strokeWidth="0.4" opacity="0.55" />
          <line x1="200" y1="92" x2="200" y2="102" strokeWidth="0.4" opacity="0.55" />
          <line x1="204" y1="92" x2="204" y2="102" strokeWidth="0.4" opacity="0.55" />
          <line x1="208" y1="92" x2="208" y2="102" strokeWidth="0.4" opacity="0.55" />
          <line x1="212" y1="92" x2="212" y2="102" strokeWidth="0.4" opacity="0.55" />
          <line x1="216" y1="92" x2="216" y2="102" strokeWidth="0.4" opacity="0.55" />
          <line x1="220" y1="92" x2="220" y2="102" strokeWidth="0.4" opacity="0.55" />
          <line x1="224" y1="92" x2="224" y2="102" strokeWidth="0.4" opacity="0.55" />
        </g>
        {/* Card 4 (bottom-right) — louver */}
        <g className="bto-card bto-card-4">
          <rect x="244" y="86" width="70" height="22" strokeWidth="0.85" />
          <line x1="252" y1="91" x2="306" y2="89" strokeWidth="0.4" opacity="0.6" />
          <line x1="252" y1="95" x2="306" y2="93" strokeWidth="0.4" opacity="0.6" />
          <line x1="252" y1="99" x2="306" y2="97" strokeWidth="0.4" opacity="0.6" />
          <line x1="252" y1="103" x2="306" y2="101" strokeWidth="0.4" opacity="0.6" />
        </g>

        {/* Focus brackets around match card (3 units outside its corners) */}
        <g className="bto-brackets">
          <polyline points="165,91 165,83 173,83" strokeWidth="0.9" />
          <polyline points="233,83 241,83 241,91" strokeWidth="0.9" />
          <polyline points="165,103 165,111 173,111" strokeWidth="0.9" />
          <polyline points="233,111 241,111 241,103" strokeWidth="0.9" />
        </g>

        {/* ── Connector 2: filter → order ── */}
        <line
          className="bto-connector bto-connector-2"
          x1="322"
          y1="78"
          x2="344"
          y2="78"
          strokeWidth="0.7"
          strokeDasharray="3 2"
        />
        <circle
          className="bto-packet bto-packet-2"
          cx="0"
          cy="0"
          r="2"
          fill="currentColor"
        />

        {/* ── STAGE 3: ORDER — enquiry sheet ── */}
        <rect
          className="bto-order-card"
          x="346"
          y="40"
          width="124"
          height="74"
          strokeWidth="1.1"
        />
        {/* Letterhead */}
        <line x1="354" y1="50" x2="430" y2="50" strokeWidth="0.7" opacity="0.6" />
        <line x1="354" y1="53" x2="400" y2="53" strokeWidth="0.5" opacity="0.4" />

        {/* Selected-product row — only populates once packet arrives */}
        <g className="bto-order-product">
          <rect x="354" y="58" width="108" height="14" strokeWidth="0.7" />
          {/* Tiny ribbed thumbnail */}
          <rect x="358" y="61" width="14" height="8" strokeWidth="0.5" opacity="0.7" />
          <line x1="360" y1="62" x2="360" y2="68" strokeWidth="0.3" opacity="0.5" />
          <line x1="362" y1="62" x2="362" y2="68" strokeWidth="0.3" opacity="0.5" />
          <line x1="364" y1="62" x2="364" y2="68" strokeWidth="0.3" opacity="0.5" />
          <line x1="366" y1="62" x2="366" y2="68" strokeWidth="0.3" opacity="0.5" />
          <line x1="368" y1="62" x2="368" y2="68" strokeWidth="0.3" opacity="0.5" />
          <line x1="370" y1="62" x2="370" y2="68" strokeWidth="0.3" opacity="0.5" />
          {/* Inline spec lines */}
          <line x1="376" y1="63" x2="448" y2="63" strokeWidth="0.4" opacity="0.55" />
          <line x1="376" y1="68" x2="420" y2="68" strokeWidth="0.4" opacity="0.4" />
        </g>

        {/* Form fields — stagger draw-in via stroke-dashoffset */}
        <line className="bto-order-field bto-order-field-1" x1="354" y1="80" x2="448" y2="80" strokeWidth="0.55" />
        <line className="bto-order-field bto-order-field-2" x1="354" y1="86" x2="432" y2="86" strokeWidth="0.55" />
        <line className="bto-order-field bto-order-field-3" x1="354" y1="92" x2="458" y2="92" strokeWidth="0.55" />
        <line className="bto-order-field bto-order-field-4" x1="354" y1="98" x2="420" y2="98" strokeWidth="0.55" />

        {/* Submit-confirmation badge + check */}
        <g className="bto-check-group">
          <circle
            className="bto-check-badge"
            cx="450"
            cy="106"
            r="6.5"
            strokeWidth="0.9"
          />
          <polyline
            className="bto-check-mark"
            points="446,106 449,109 454,103"
            strokeWidth="1.3"
          />
        </g>

        {/* ── Stage labels ── */}
        <text
          className="bto-label bto-label-brief"
          x="70"
          y="148"
          fontSize="7.5"
          fontFamily="ui-monospace, monospace"
          letterSpacing="1.6"
          textAnchor="middle"
          fill="currentColor"
        >
          01 · BRIEF
        </text>
        <text
          className="bto-label bto-label-filter"
          x="241"
          y="148"
          fontSize="7.5"
          fontFamily="ui-monospace, monospace"
          letterSpacing="1.6"
          textAnchor="middle"
          fill="currentColor"
        >
          02 · FILTER
        </text>
        <text
          className="bto-label bto-label-order"
          x="408"
          y="148"
          fontSize="7.5"
          fontFamily="ui-monospace, monospace"
          letterSpacing="1.6"
          textAnchor="middle"
          fill="currentColor"
        >
          03 · ORDER
        </text>
      </svg>
    ),
  },
};
