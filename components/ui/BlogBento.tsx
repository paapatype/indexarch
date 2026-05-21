"use client";

/**
 * Editorial bento blocks for blog posts.
 *
 * Each component is referenced from a post's `content` array via a
 * marker string (e.g. `[BENTO:pdf-cost-grid]`), detected by the blog
 * renderer in `app/blog/[slug]/BlogPostClient.tsx`. Visuals follow the
 * same line-art family as `BlogDiagram` (thin warm strokes, no fills
 * outside of solid glyphs) and respect `prefers-reduced-motion` via
 * the CSS hooks defined in `app/globals.css` under "Blog bento".
 */

import type { ReactNode } from "react";

// ─── 2×2 cost grid ───────────────────────────────────────────────────
// Used by: "Why your PDF catalogue is costing you deals"
// Marker:  [BENTO:pdf-cost-grid]

interface CostCard {
  icon: ReactNode;
  label: string;
  metric: string;
  body: string;
}

const PDF_COST_CARDS: CostCard[] = [
  {
    label: "Sales team time",
    metric: "2–4 hrs",
    body: "Spent per inquiry clarifying specs that should be self-service.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="12" x2="12" y2="7" />
        <line x1="12" y1="12" x2="15.5" y2="13.5" />
      </svg>
    ),
  },
  {
    label: "Response lag",
    metric: "24–48 hrs",
    body: "Delay before a buyer gets the answer a digital catalogue could provide instantly.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M3 17 H19" />
        <polyline points="15,13 19,17 15,21" />
        <path d="M21 7 H5" opacity="0.55" />
        <polyline points="9,3 5,7 9,11" opacity="0.55" />
      </svg>
    ),
  },
  {
    label: "Mobile unusability",
    metric: "60%+",
    body: "B2B product research increasingly happens on mobile, where PDFs are difficult to use.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="7" y="3" width="10" height="18" rx="1.2" />
        <line x1="10" y1="18" x2="14" y2="18" />
        <line x1="9" y1="6" x2="15" y2="6" opacity="0.5" />
      </svg>
    ),
  },
  {
    label: "Zero analytics",
    metric: "No visibility",
    body: "You do not know which products buyers view, compare, abandon, or search for.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="11" cy="11" r="6.5" />
        <line x1="16" y1="16" x2="20.5" y2="20.5" />
        <line x1="8" y1="11" x2="14" y2="11" opacity="0.4" />
        <line x1="11" y1="8" x2="11" y2="14" opacity="0.4" />
      </svg>
    ),
  },
];

export function CostBentoGrid() {
  return (
    <section
      className="blog-bento-grid my-12 grid grid-cols-1 sm:grid-cols-2 gap-px bg-rule border border-rule"
      aria-label="The real costs of keeping a PDF catalogue"
    >
      {PDF_COST_CARDS.map((card) => (
        <article
          key={card.label}
          className="blog-bento-card bg-surface p-6 lg:p-7 flex flex-col gap-3"
        >
          <div className="flex items-center gap-3 text-ink-faint">
            <span className="text-ink-muted">{card.icon}</span>
            <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink-faint">
              {card.label}
            </span>
          </div>
          <p className="font-serif text-2xl text-ink leading-none mt-1">
            {card.metric}
          </p>
          <p
            className="text-sm text-ink-muted leading-relaxed"
            style={{ textWrap: "pretty" as never }}
          >
            {card.body}
          </p>
        </article>
      ))}
    </section>
  );
}

// ─── Buyer-comment block ─────────────────────────────────────────────
// Used by: "Why your PDF catalogue is costing you deals"
// Marker:  [QUOTE:buyer-search]
//
// A bordered comment box that reads as a real (anonymised) buyer
// comment, not a pull quote. Initials avatar replaces a profile photo.

interface BuyerCommentProps {
  initials?: string;
  quote: string;
  role?: string;
}

export function BuyerComment({
  initials = "TB",
  quote,
  role = "Technical buyer · Procurement / Engineering",
}: BuyerCommentProps) {
  return (
    <aside className="buyer-comment-box my-12 border border-rule bg-surface-sunken p-7 lg:p-9">
      <header className="flex items-center gap-3 mb-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-rule bg-surface-raised font-mono text-[11px] tracking-[0.14em] uppercase text-ink-muted">
          {initials}
        </div>
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-faint">
          Buyer comment
        </span>
      </header>
      <blockquote
        className="font-serif text-lg lg:text-xl text-ink leading-relaxed italic"
        style={{ textWrap: "pretty" as never }}
      >
        &ldquo;{quote}&rdquo;
      </blockquote>
      <p className="mt-5 pt-4 border-t border-rule font-mono text-[11px] tracking-[0.14em] uppercase text-ink-faint">
        {role}
      </p>
    </aside>
  );
}

// ─── Industry-by-industry visual treatment grid ──────────────────────
// Used by: "3D catalogues, visual discovery, and what your product actually needs"
// Marker:  [BENTO:industry-grid]
//
// Six categories laid out as scannable cards instead of six prose
// sub-sections. Each card carries:
//   • a thin-line icon hinting at the recommended visual treatment
//   • a small uppercase "lead" tag (Spec-first / Surface-first / ...)
//   • the category name (serif)
//   • a one-line description
//   • a hairline-divided footer noting whether 3D earns its place
//
// Layout: 1 col on mobile, 2 cols on tablet, 3 cols on desktop.

interface IndustryCard {
  name: string;
  lead: string;
  body: string;
  threeD: string;
  icon: ReactNode;
}

const INDUSTRY_CARDS: IndustryCard[] = [
  {
    name: "Fasteners",
    lead: "Spec-first",
    body: "Buyers filter by thread, grade, finish, length. The visual is a thumbnail — a hex-head outline with the standard noted.",
    threeD: "Skip",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <polygon points="6,9 14,4 22,9 22,19 14,24 6,19" />
        <circle cx="14" cy="14" r="4" opacity="0.55" />
      </svg>
    ),
  },
  {
    name: "Tiles, ceramics, laminates",
    lead: "Surface-first",
    body: "Texture, finish, and colour at realistic scale. High-resolution photography on a neutral background wins.",
    threeD: "Skip",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <rect x="4" y="4" width="20" height="20" />
        <line x1="7" y1="22" x2="11" y2="6" strokeWidth="0.7" opacity="0.55" />
        <line x1="12" y1="22" x2="16" y2="6" strokeWidth="0.7" opacity="0.55" />
        <line x1="17" y1="22" x2="21" y2="6" strokeWidth="0.7" opacity="0.55" />
      </svg>
    ),
  },
  {
    name: "Profiles & extrusions",
    lead: "Section-first",
    body: "The cross-section is the product. Show the section drawn at scale alongside an extrusion view — they serve different purposes.",
    threeD: "Pair with section",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <polyline points="4,9 24,9 24,13 16,13 16,23 12,23 12,13 4,13 4,9" />
        <line x1="4" y1="25" x2="24" y2="25" strokeWidth="0.55" opacity="0.5" />
        <line x1="4" y1="24" x2="4" y2="26" strokeWidth="0.55" opacity="0.5" />
        <line x1="24" y1="24" x2="24" y2="26" strokeWidth="0.55" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: "Connectors & hardware",
    lead: "Layout-first",
    body: "Pin positions, mating partner, environmental rating. Cleanly-drawn flat layouts beat a model the buyer has to rotate to read.",
    threeD: "Optional",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <circle cx="14" cy="14" r="9" />
        <circle cx="11" cy="11" r="1" fill="currentColor" />
        <circle cx="17" cy="11" r="1" fill="currentColor" />
        <circle cx="8" cy="14" r="1" fill="currentColor" />
        <circle cx="14" cy="14" r="1" fill="currentColor" />
        <circle cx="20" cy="14" r="1" fill="currentColor" />
        <circle cx="11" cy="17" r="1" fill="currentColor" />
        <circle cx="17" cy="17" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Sheet metal, fabricated parts",
    lead: "Process-first",
    body: "Bend lines, joining method, and tolerances called out. 3D helps when the part is geometrically complex.",
    threeD: "When complex",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <polyline points="4,18 12,18 12,8 24,8" strokeWidth="1.3" />
        <line x1="12" y1="8" x2="12" y2="18" strokeDasharray="1 1.5" opacity="0.5" />
        <polyline points="22,6 24,8 22,10" strokeWidth="0.7" opacity="0.55" />
      </svg>
    ),
  },
  {
    name: "Custom-machined",
    lead: "Tolerance-first",
    body: "Surface finish, tolerance class, material certifications. The visual is supporting evidence — the spec is the lead.",
    threeD: "Supporting only",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <rect x="6" y="10" width="3" height="12" />
        <rect x="19" y="10" width="3" height="12" />
        <line x1="9" y1="16" x2="19" y2="16" strokeWidth="0.7" />
        <polyline points="11,14 9,16 11,18" strokeWidth="0.6" opacity="0.7" />
        <polyline points="17,14 19,16 17,18" strokeWidth="0.6" opacity="0.7" />
        <line x1="6" y1="8" x2="22" y2="8" strokeWidth="0.55" opacity="0.4" />
      </svg>
    ),
  },
];

export function IndustryGrid() {
  return (
    <section
      className="blog-bento-grid my-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-rule border border-rule"
      aria-label="Recommended visual treatment by manufacturing category"
    >
      {INDUSTRY_CARDS.map((card) => (
        <article
          key={card.name}
          className="blog-bento-card bg-surface p-6 lg:p-7 flex flex-col gap-3"
        >
          <div className="text-ink-muted">{card.icon}</div>
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink-faint">
            {card.lead}
          </span>
          <h3 className="font-serif text-lg text-ink leading-snug">
            {card.name}
          </h3>
          <p
            className="text-sm text-ink-muted leading-relaxed"
            style={{ textWrap: "pretty" as never }}
          >
            {card.body}
          </p>
          <p className="mt-auto pt-3 border-t border-rule font-mono text-[10px] tracking-[0.16em] uppercase text-ink-faint">
            3D&nbsp;<span className="text-ink-muted">·&nbsp;{card.threeD}</span>
          </p>
        </article>
      ))}
    </section>
  );
}

// ─── 3D decision grid (when 3D earns it vs when it's the wrong tool) ─
// Used by: "3D catalogues, visual discovery, and what your product actually needs"
// Marker:  [BENTO:3d-decision]
//
// 2-column × 3-row grid. Left column collects the "EARNS IT" cases
// (each tagged with a warm-bronze status pill), right column collects
// the "WRONG TOOL" cases (muted-grey status). Cards are interleaved in
// the array (earns/wrong/earns/wrong/...) so a `grid-cols-2` row-flow
// renders left-to-right in the right reading order.

interface DecisionCard {
  verdict: "earns" | "wrong";
  title: string;
  body: string;
}

const DECISION_CARDS: DecisionCard[] = [
  {
    verdict: "earns",
    title: "Geometry that doesn't read in 2D",
    body: "Architectural hardware, complex connectors, machined assemblies — visual complexity the buyer has to rotate to land.",
  },
  {
    verdict: "wrong",
    title: "Driven by a number on a spec table",
    body: "Most fasteners, fluid components, resistors — the decision is the spec, not the shape.",
  },
  {
    verdict: "earns",
    title: "Buyer needs to confirm specific geometry",
    body: "Connectors with unusual pin layouts, valves with off-axis ports — the eye has to inspect, not just read.",
  },
  {
    verdict: "wrong",
    title: "Defining feature is a surface, not a shape",
    body: "Tiles, fabrics, laminates — what matters is texture and colour at scale, not how it rotates.",
  },
  {
    verdict: "earns",
    title: "Specified into a larger visualisation",
    body: "Cladding profiles dropped into elevations, hardware dropped into BIM models — 3D as a downstream asset.",
  },
  {
    verdict: "wrong",
    title: "Adds loading time without clarity",
    body: "Most consumer-facing decorative presentations. If the 3D doesn't answer a real visual question, it's noise.",
  },
];

export function ThreeDDecisionGrid() {
  return (
    <section
      className="blog-bento-grid my-12 grid grid-cols-1 md:grid-cols-2 gap-px bg-rule border border-rule"
      aria-label="When 3D earns its place and when it is the wrong tool"
    >
      {DECISION_CARDS.map((card, i) => (
        <article
          key={i}
          className="blog-bento-card bg-surface p-6 lg:p-7 flex flex-col gap-3"
        >
          <span
            className="font-mono text-[10px] tracking-[0.2em] uppercase"
            style={{
              color:
                card.verdict === "earns"
                  ? "var(--color-verdict-yes)"
                  : "var(--color-verdict-no)",
            }}
          >
            {card.verdict === "earns" ? "✓ Earns it" : "✗ Wrong tool"}
          </span>
          <h3
            className="font-serif text-lg text-ink leading-snug"
            style={{ textWrap: "balance" as never }}
          >
            {card.title}
          </h3>
          <p
            className="text-sm text-ink-muted leading-relaxed"
            style={{ textWrap: "pretty" as never }}
          >
            {card.body}
          </p>
        </article>
      ))}
    </section>
  );
}

// ─── Alternative feature bento (5 cards with micro-animations) ───────
// Used by: "Why your PDF catalogue is costing you deals"
// Marker:  [BENTO:alternatives]
//
// Layout: card 1 spans full width on desktop (hero), then 4 cards in
// a 2×2 grid below. Each card carries a small SVG illustration whose
// inner elements animate via CSS keyframes scoped in globals.css
// (`@keyframes blog-anim-*`). Animations pause for `prefers-reduced-motion`.

interface FeatureCard {
  title: string;
  body: string;
  illustration: ReactNode;
  ariaLabel: string;
  variant?: "large" | "normal";
}

// 1. Smart Filtering — premium 6.5 s loop.
//    Storyline: cursor enters with a curved approach → clicks the
//    dropdown (button lifts, soft ring expands) → options panel
//    unfolds downward and stagger-fades in → cursor descends to the
//    middle option → option row warms on hover → click (ring 2 +
//    check-mark draws on the selected row) → dropdown closes →
//    selected value replaces the placeholder → matching product
//    tiles brighten and lift, non-matching tiles dim + softly blur,
//    each in a staggered cascade → hold → gentle reset → loop.
const SmartFilteringIllustration = () => (
  <svg
    viewBox="0 0 240 130"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="feature-animation feature-animation--filter w-full h-full"
  >
    {/* Small label above the dropdown ("MATERIAL") — implied via a
        short bar in the same uppercase-mono aesthetic the rest of the
        site uses for category labels. */}
    <line x1="8" y1="11" x2="36" y2="11" opacity="0.4" />

    {/* ── Dropdown button — 90×24, real-select proportions ─────── */}
    <rect className="anim-filter-button" x="8" y="17" width="90" height="24" />

    {/* Placeholder value bar — visible while no filter is applied. */}
    <line className="anim-filter-placeholder-bar" x1="15" y1="29" x2="42" y2="29" />

    {/* Selected value bar — fades in once an option is chosen, same
        baseline so the swap reads as a value change in place. */}
    <line className="anim-filter-selected-bar" x1="15" y1="29" x2="62" y2="29" />

    {/* Vertical hairline between value area and chevron. */}
    <line x1="78" y1="22" x2="78" y2="36" opacity="0.3" />

    {/* Chevron — rotation pivots around its local origin (0,0 in the
        translated parent = visual centre of the chevron in viewBox). */}
    <g transform="translate(88 29)">
      <g className="anim-filter-chevron">
        <polyline points="-3.5,-2 0,2 3.5,-2" opacity="0.7" />
      </g>
    </g>

    {/* ── Options panel ── Unfolds downward with translateY(-6→0) +
        scaleY(0.96→1) + opacity 0→1, pivoting from its top edge so
        the panel reads as opening *out of* the button. Individual
        options stagger in after the panel begins to settle. */}
    <g className="anim-filter-options">
      <rect x="8" y="45" width="90" height="54" />

      {/* Hover overlay on the middle option — drawn under the
          dividers so the divider edges stay crisp. */}
      <rect
        className="anim-filter-option-hover"
        x="8" y="63" width="90" height="18" stroke="none"
      />

      {/* Row dividers */}
      <line x1="8" y1="63" x2="98" y2="63" opacity="0.3" />
      <line x1="8" y1="81" x2="98" y2="81" opacity="0.3" />

      {/* Option 1 (top) */}
      <g className="anim-filter-option anim-filter-option-1">
        <line x1="15" y1="54" x2="50" y2="54" opacity="0.6" />
      </g>
      {/* Option 2 (middle) — the one selected; carries the check */}
      <g className="anim-filter-option anim-filter-option-2">
        <line x1="15" y1="72" x2="60" y2="72" opacity="0.78" />
        <polyline
          className="anim-filter-option-check"
          points="82,72 86,76 92,68"
        />
      </g>
      {/* Option 3 (bottom) */}
      <g className="anim-filter-option anim-filter-option-3">
        <line x1="15" y1="90" x2="46" y2="90" opacity="0.6" />
      </g>
    </g>

    {/* ── Click rings ── soft circular ripples that expand from the
        click points. Ring 1 fires at the dropdown click, ring 2 at
        the option click. */}
    <circle className="anim-filter-ring anim-filter-ring-1" cx="45" cy="29" r="1" />
    <circle className="anim-filter-ring anim-filter-ring-2" cx="45" cy="72" r="1" />

    {/* Vertical divider between filter UI and results */}
    <line x1="110" y1="14" x2="110" y2="116" opacity="0.22" />

    {/* ── Product tiles — 3 columns × 2 rows ──
        Three non-adjacent tiles (top-left, top-right, bottom-middle)
        respond as MATCHES; the other three soften as MISSES. Each
        tile sits in its own group so we can lift/fill/bracket the
        matches and dim/blur the misses on staggered delays. */}

    {/* Tile (HIT) — top-left */}
    <g className="anim-filter-tile-hit-group anim-filter-tile-hit-group-1">
      <rect className="anim-filter-tile-hit-rect" x="120" y="22" width="32" height="32" />
      <polyline
        className="anim-filter-bracket anim-filter-bracket-1"
        points="120,28 120,22 126,22"
      />
    </g>

    {/* Tile (MISS) — top-middle */}
    <g className="anim-filter-tile-miss-group anim-filter-tile-miss-group-1">
      <rect x="156" y="22" width="32" height="32" />
    </g>

    {/* Tile (HIT) — top-right */}
    <g className="anim-filter-tile-hit-group anim-filter-tile-hit-group-2">
      <rect className="anim-filter-tile-hit-rect" x="192" y="22" width="32" height="32" />
      <polyline
        className="anim-filter-bracket anim-filter-bracket-2"
        points="192,28 192,22 198,22"
      />
    </g>

    {/* Tile (MISS) — bottom-left */}
    <g className="anim-filter-tile-miss-group anim-filter-tile-miss-group-2">
      <rect x="120" y="62" width="32" height="32" />
    </g>

    {/* Tile (HIT) — bottom-middle */}
    <g className="anim-filter-tile-hit-group anim-filter-tile-hit-group-3">
      <rect className="anim-filter-tile-hit-rect" x="156" y="62" width="32" height="32" />
      <polyline
        className="anim-filter-bracket anim-filter-bracket-3"
        points="156,68 156,62 162,62"
      />
    </g>

    {/* Tile (MISS) — bottom-right */}
    <g className="anim-filter-tile-miss-group anim-filter-tile-miss-group-3">
      <rect x="192" y="62" width="32" height="32" />
    </g>

    {/* Cursor — drawn last so it sits on top of everything. */}
    <g className="anim-filter-cursor">
      <path d="M0 0 L0 14 L4 10 L7 16 L9 15 L6 10 L11 9 Z" fill="currentColor" />
    </g>
  </svg>
);

// 2. Side-by-side comparison — two distinct product cards (a hex bolt
//    head vs a round Phillips head, both in plan view), each with
//    four spec rows. Rows 1 and 3 are the same length on both cards
//    (shared specs) and brighter; rows 2 and 4 differ between cards
//    (diverging specs) and are dimmer. No centre line.
const ComparisonIllustration = () => (
  <svg
    viewBox="0 0 240 130"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="feature-animation feature-animation--compare w-full h-full"
  >
    {/* ── Card 1: hex bolt head (top-down) ── */}
    <g>
      <rect x="14" y="12" width="100" height="108" opacity="0.6" />
      {/* Hex polygon centred near (64, 35) */}
      <polygon points="50,35 57,23 71,23 78,35 71,47 57,47" />
      {/* Inner drive socket (hex) */}
      <circle cx="64" cy="35" r="5" opacity="0.5" />
      {/* Spec rows */}
      <line
        className="anim-compare-row anim-compare-row-shared anim-compare-row-1"
        x1="24" y1="70" x2="94" y2="70"
      />
      <line
        className="anim-compare-row anim-compare-row-diff anim-compare-row-2"
        x1="24" y1="82" x2="69" y2="82"
      />
      <line
        className="anim-compare-row anim-compare-row-shared anim-compare-row-3"
        x1="24" y1="94" x2="84" y2="94"
      />
      <line
        className="anim-compare-row anim-compare-row-diff anim-compare-row-4"
        x1="24" y1="106" x2="54" y2="106"
      />
    </g>

    {/* ── Card 2: round head with Phillips drive (top-down) ── */}
    <g>
      <rect x="126" y="12" width="100" height="108" opacity="0.6" />
      <circle cx="176" cy="35" r="14" />
      {/* Phillips cross */}
      <line x1="170" y1="35" x2="182" y2="35" opacity="0.55" />
      <line x1="176" y1="29" x2="176" y2="41" opacity="0.55" />
      <circle cx="176" cy="35" r="3" opacity="0.4" />
      {/* Spec rows — rows 1 + 3 match card 1; rows 2 + 4 are longer. */}
      <line
        className="anim-compare-row anim-compare-row-shared anim-compare-row-1"
        x1="136" y1="70" x2="206" y2="70"
      />
      <line
        className="anim-compare-row anim-compare-row-diff anim-compare-row-2"
        x1="136" y1="82" x2="201" y2="82"
      />
      <line
        className="anim-compare-row anim-compare-row-shared anim-compare-row-3"
        x1="136" y1="94" x2="196" y2="94"
      />
      <line
        className="anim-compare-row anim-compare-row-diff anim-compare-row-4"
        x1="136" y1="106" x2="191" y2="106"
      />
    </g>
  </svg>
);

// 3. Mobile-first — desktop / tablet / phone outlines. Three product
//    cards are pre-positioned at the correct size/centre for each
//    device's content area; the animation crossfades their opacity so
//    one card is visible per device at any moment. This gives a
//    proportional fit on every device instead of the prior "same card
//    stretched/squashed" effect.
const MobileFirstIllustration = () => (
  <svg
    viewBox="0 0 240 130"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="feature-animation feature-animation--mobile w-full h-full"
  >
    {/* Desktop */}
    <g>
      <rect x="16" y="24" width="84" height="58" />
      <line x1="36" y1="86" x2="80" y2="86" opacity="0.55" />
      <line x1="48" y1="90" x2="68" y2="90" opacity="0.4" />
    </g>
    {/* Tablet */}
    <rect x="118" y="28" width="44" height="62" rx="1.5" />
    {/* Phone */}
    <g>
      <rect x="180" y="34" width="26" height="52" rx="2" />
      <line x1="190" y1="80" x2="196" y2="80" opacity="0.55" />
    </g>

    {/* Three pre-sized catalogue cards — one per device. Only one
        is visible at a time via the opacity crossfade in the keyframe.
        Sizes are ~80% of each device's inner content area, centred. */}
    <rect
      className="anim-mobile-card-desktop"
      x="26" y="32" width="64" height="42"
      fill="currentColor" fillOpacity="0.18"
    />
    <rect
      className="anim-mobile-card-tablet"
      x="124" y="36" width="32" height="46"
      fill="currentColor" fillOpacity="0.18"
    />
    <rect
      className="anim-mobile-card-phone"
      x="184" y="42" width="18" height="34"
      fill="currentColor" fillOpacity="0.18"
    />
  </svg>
);

// 4. Pre-qualified enquiries — three source cards on the left. One at
//    a time gets highlighted, then a "travelling card" slides smoothly
//    from that card to the form on the right (which is now A4-sized,
//    tall). On arrival the selected-product row of the form populates,
//    the rest of the form fields draw in, and a checkmark appears at
//    the bottom-right. After a hold, everything resets and the next
//    source card takes its turn. Full cycle = 24 s (~8 s per card).
const InquiriesIllustration = () => (
  <svg
    viewBox="0 0 240 130"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="feature-animation feature-animation--inquiry w-full h-full"
  >
    {/* ── 3 source cards on the left ── */}
    {/* Card 1 */}
    <g>
      <rect x="8" y="8" width="42" height="32" />
      <rect x="14" y="14" width="30" height="12" opacity="0.4" />
      <line x1="14" y1="30" x2="40" y2="30" opacity="0.5" />
      <line x1="14" y1="34" x2="34" y2="34" opacity="0.3" />
      <rect className="anim-inquiry-highlight anim-inquiry-highlight-1" x="8" y="8" width="42" height="32" />
    </g>
    {/* Card 2 */}
    <g>
      <rect x="8" y="48" width="42" height="32" />
      <rect x="14" y="54" width="30" height="12" opacity="0.4" />
      <line x1="14" y1="70" x2="40" y2="70" opacity="0.5" />
      <line x1="14" y1="74" x2="34" y2="74" opacity="0.3" />
      <rect className="anim-inquiry-highlight anim-inquiry-highlight-2" x="8" y="48" width="42" height="32" />
    </g>
    {/* Card 3 */}
    <g>
      <rect x="8" y="88" width="42" height="32" />
      <rect x="14" y="94" width="30" height="12" opacity="0.4" />
      <line x1="14" y1="110" x2="40" y2="110" opacity="0.5" />
      <line x1="14" y1="114" x2="34" y2="114" opacity="0.3" />
      <rect className="anim-inquiry-highlight anim-inquiry-highlight-3" x="8" y="88" width="42" height="32" />
    </g>

    {/* ── Travelling card — moves from current source to the form ──
        Starts hidden at card-1 origin; the keyframe cycles its
        position through card 1 → form, card 2 → form, card 3 → form. */}
    <g className="anim-inquiry-traveller">
      <rect x="0" y="0" width="38" height="22" />
      <rect x="3" y="3" width="32" height="9" opacity="0.5" />
      <line x1="3" y1="16" x2="29" y2="16" opacity="0.55" />
    </g>

    {/* ── Form on right — A4-style (taller than wide) ── */}
    <g>
      <rect x="108" y="6" width="124" height="118" />
      {/* Letterhead rule */}
      <line x1="113" y1="22" x2="227" y2="22" opacity="0.55" />

      {/* Selected-product row — only populates when the traveller
          arrives. Border + product summary lines drawn together. */}
      <g className="anim-inquiry-form-row-1">
        <rect x="113" y="28" width="114" height="20" />
        <line x1="118" y1="36" x2="208" y2="36" opacity="0.55" />
        <line x1="118" y1="42" x2="178" y2="42" opacity="0.35" />
      </g>

      {/* Form fields — five rows at 10-unit pitch from y=58 to y=98,
          leaving a clear band below for the confirmation cell. The
          bottom-most field (y=98) is shortened to x2=190 so its right
          edge sits 8 units left of the confirmation cell, with no
          horizontal collision. */}
      <line className="anim-inquiry-form-field anim-inquiry-form-field-1" x1="113" y1="58" x2="207" y2="58" />
      <line className="anim-inquiry-form-field anim-inquiry-form-field-2" x1="113" y1="68" x2="193" y2="68" />
      <line className="anim-inquiry-form-field anim-inquiry-form-field-3" x1="113" y1="78" x2="223" y2="78" />
      <line className="anim-inquiry-form-field anim-inquiry-form-field-4" x1="113" y1="88" x2="183" y2="88" />
      <line className="anim-inquiry-form-field anim-inquiry-form-field-5" x1="113" y1="98" x2="190" y2="98" />

      {/* ── Submit-confirmation cell ──
          Square (18×18) bordered box for the checkmark at the bottom-
          right of the form. Square proportions mean the tick can sit
          centred without looking awkward in a wide rectangle. The
          right edge has an 8-unit margin from the form edge (form at
          x=232, box right at x=224); the bottom edge has a 4-unit
          margin (form bottom at y=124, box bottom at y=120). */}
      <rect x="206" y="102" width="18" height="18" opacity="0.55" />

      {/* Checkmark — sits centred inside the square cell (centre
          ≈ (215, 111)). Path length ≈ 12.7, so stroke-dasharray:13 in
          the CSS draws the whole stroke cleanly to dashoffset 0. */}
      <polyline
        className="anim-inquiry-check"
        points="211,112 214,115 220,108"
        strokeWidth="1.6"
      />
    </g>
  </svg>
);

// 5. Analytics — a small chart with dots that pop in along an upward
//    path, connected by a rising line.
const AnalyticsIllustration = () => (
  <svg
    viewBox="0 0 240 130"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="feature-animation feature-animation--analytics w-full h-full"
  >
    {/* Frame */}
    <line x1="28" y1="22" x2="28" y2="104" opacity="0.45" />
    <line x1="28" y1="104" x2="216" y2="104" opacity="0.45" />
    {/* Tick guides */}
    <line x1="28" y1="80" x2="216" y2="80" opacity="0.15" strokeDasharray="2 4" />
    <line x1="28" y1="56" x2="216" y2="56" opacity="0.15" strokeDasharray="2 4" />
    <line x1="28" y1="32" x2="216" y2="32" opacity="0.15" strokeDasharray="2 4" />
    {/* Rising line — animated stroke */}
    <polyline
      className="anim-analytics-line"
      points="36,92 70,80 100,66 138,56 174,42 206,30"
      fill="none"
      strokeWidth="1.4"
    />
    {/* Dots pop in along the line */}
    <g fill="currentColor" stroke="none">
      <circle className="anim-analytics-dot anim-analytics-dot-1" cx="36" cy="92" r="2.4" />
      <circle className="anim-analytics-dot anim-analytics-dot-2" cx="70" cy="80" r="2.4" />
      <circle className="anim-analytics-dot anim-analytics-dot-3" cx="100" cy="66" r="2.4" />
      <circle className="anim-analytics-dot anim-analytics-dot-4" cx="138" cy="56" r="2.4" />
      <circle className="anim-analytics-dot anim-analytics-dot-5" cx="174" cy="42" r="2.4" />
      <circle className="anim-analytics-dot anim-analytics-dot-6" cx="206" cy="30" r="2.4" />
    </g>
  </svg>
);

const ALTERNATIVE_CARDS: FeatureCard[] = [
  {
    title: "Smart filtering",
    body: "Search by any attribute — size, grade, material, standard, finish — and find the right product in seconds.",
    illustration: <SmartFilteringIllustration />,
    ariaLabel: "Filter chips activate and the matching product tile highlights.",
    variant: "large",
  },
  {
    title: "Side-by-side comparison",
    body: "Compare 2–3 products with full specs in a single view, without flipping between PDF pages.",
    illustration: <ComparisonIllustration />,
    ariaLabel: "Three product columns align their spec rows.",
  },
  {
    title: "Mobile-first",
    body: "Works perfectly on phones, tablets, and desktops — the device your buyer is actually on.",
    illustration: <MobileFirstIllustration />,
    ariaLabel: "A product card moves between desktop, tablet, and phone outlines.",
  },
  {
    title: "Pre-qualified enquiries",
    body: "Every enquiry arrives with product, spec, and quantity already filled in.",
    illustration: <InquiriesIllustration />,
    ariaLabel: "Spec chips attach to a selected product and form into an enquiry.",
  },
  {
    title: "Analytics",
    body: "Know which products get viewed, compared, and enquired about — and where buyers drop off.",
    illustration: <AnalyticsIllustration />,
    ariaLabel: "A chart line rises as data points appear.",
  },
];

export function AlternativeBentoGrid() {
  return (
    <section
      className="blog-bento-grid my-12 grid grid-cols-1 sm:grid-cols-2 gap-px bg-rule border border-rule"
      aria-label="Features of a modern interactive catalogue"
    >
      {ALTERNATIVE_CARDS.map((card) => (
        <article
          key={card.title}
          className={`blog-bento-card bg-surface flex flex-col ${
            card.variant === "large" ? "sm:col-span-2" : ""
          }`}
        >
          <div
            className="blog-bento-card__illustration relative aspect-[12/5] border-b border-rule bg-surface-raised text-ink-faint"
            aria-label={card.ariaLabel}
            role="img"
          >
            <div className="absolute inset-0 flex items-center justify-center p-5">
              {card.illustration}
            </div>
          </div>
          <div className="p-6 lg:p-7 flex flex-col gap-2">
            <h3 className="font-serif text-lg lg:text-xl text-ink leading-snug">
              {card.title}
            </h3>
            <p
              className="text-sm text-ink-muted leading-relaxed"
              style={{ textWrap: "pretty" as never }}
            >
              {card.body}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
