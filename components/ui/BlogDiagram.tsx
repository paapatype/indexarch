"use client";

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
  // PDF row vs Web tile — same product, two presentations.
  "pdf-vs-tile": {
    caption:
      "Same profile, two presentations. The PDF row buries the spec; the web tile leads with it.",
    svg: (
      <svg viewBox="0 0 480 200" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-auto max-h-[260px]">
        {/* LEFT: PDF table row */}
        <g>
          {/* Page edge */}
          <rect x="20" y="20" width="180" height="160" strokeWidth="0.7" opacity="0.4" />
          {/* Table header */}
          <line x1="30" y1="42" x2="190" y2="42" strokeWidth="0.6" opacity="0.4" />
          <text x="40" y="38" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.55">SR</text>
          <text x="60" y="38" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.55">PROFILE</text>
          <text x="115" y="38" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.55">RATE</text>
          <text x="145" y="38" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.55">DIM</text>
          {/* Highlighted row */}
          <rect x="22" y="68" width="176" height="16" fill="currentColor" fillOpacity="0.08" strokeWidth="0" />
          <line x1="22" y1="68" x2="198" y2="68" strokeWidth="0.6" opacity="0.45" />
          <line x1="22" y1="84" x2="198" y2="84" strokeWidth="0.6" opacity="0.45" />
          <text x="32" y="79" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor">1.</text>
          <text x="50" y="79" fontSize="6.5" fontFamily="ui-monospace, monospace" fill="currentColor">Fluted-3 145×18</text>
          <text x="118" y="79" fontSize="6.5" fontFamily="ui-monospace, monospace" fill="currentColor">348</text>
          <text x="148" y="79" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.6">145mm</text>
          {/* Other rows blurred */}
          {[100, 116, 132, 148, 164].map((y, i) => (
            <g key={i} opacity="0.35">
              <line x1="30" y1={y} x2="190" y2={y} strokeWidth="0.5" />
              <line x1="32" y1={y - 6} x2="44" y2={y - 6} strokeWidth="0.5" />
              <line x1="50" y1={y - 6} x2="106" y2={y - 6} strokeWidth="0.5" />
              <line x1="116" y1={y - 6} x2="130" y2={y - 6} strokeWidth="0.5" />
            </g>
          ))}
        </g>

        {/* Connector arrow */}
        <g opacity="0.6">
          <line x1="210" y1="100" x2="270" y2="100" strokeWidth="1.2" />
          <polyline points="262,94 270,100 262,106" strokeWidth="1.2" />
        </g>

        {/* RIGHT: Web tile (card) */}
        <g>
          <rect x="282" y="36" width="178" height="128" rx="3" strokeWidth="1" />
          {/* Number badge */}
          <rect x="292" y="46" width="14" height="14" rx="2" strokeWidth="0.8" fill="currentColor" fillOpacity="0.2" />
          <text x="296" y="56" fontSize="8" fontFamily="ui-monospace, monospace" fill="currentColor">1</text>
          <text x="316" y="55" fontSize="9" fontFamily="ui-serif, serif" fill="currentColor">Fluted Profile-3</text>
          <rect x="420" y="46" width="28" height="11" rx="2" strokeWidth="0.6" opacity="0.55" />
          <text x="425" y="54" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.7">FLUTED</text>
          {/* 3D rendering placeholder — three offset stripes suggesting depth */}
          <g transform="translate(310 75)" opacity="0.7">
            <polygon points="0,18 40,0 80,18 80,46 40,64 0,46" strokeWidth="0.9" />
            <line x1="0" y1="18" x2="40" y2="36" strokeWidth="0.6" opacity="0.55" />
            <line x1="80" y1="18" x2="40" y2="36" strokeWidth="0.6" opacity="0.55" />
            <line x1="40" y1="36" x2="40" y2="64" strokeWidth="0.6" opacity="0.55" />
          </g>
          {/* Dimension + rate row */}
          <text x="292" y="158" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.7">145 × 18mm</text>
          <text x="430" y="158" fontSize="9" fontFamily="ui-monospace, monospace" fill="currentColor">₹348</text>
        </g>

        {/* Labels */}
        <text x="110" y="194" fontSize="6.5" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.5" textAnchor="middle">PDF ROW</text>
        <text x="371" y="194" fontSize="6.5" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.5" textAnchor="middle">WEB TILE</text>
      </svg>
    ),
  },

  // Architect's mental flow: brief → filter → order.
  "brief-to-order": {
    caption:
      "How an architect actually uses the catalogue: come in with a brief, narrow to a match, send the order.",
    svg: (
      <svg viewBox="0 0 480 200" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-auto max-h-[260px]">
        {/* STEP 1 — Brief: speech bubble with text lines */}
        <g transform="translate(20 50)">
          <path d="M0 16 Q0 4 12 4 L100 4 Q112 4 112 16 L112 56 Q112 68 100 68 L24 68 L14 80 L18 68 L12 68 Q0 68 0 56 Z" strokeWidth="1.1" />
          <line x1="12" y1="22" x2="100" y2="22" strokeWidth="0.7" opacity="0.6" />
          <line x1="12" y1="32" x2="92" y2="32" strokeWidth="0.7" opacity="0.6" />
          <line x1="12" y1="42" x2="98" y2="42" strokeWidth="0.7" opacity="0.6" />
          <line x1="12" y1="52" x2="80" y2="52" strokeWidth="0.7" opacity="0.6" />
          <text x="56" y="98" fontSize="8" fontFamily="ui-monospace, monospace" fill="currentColor" textAnchor="middle">01 · BRIEF</text>
        </g>

        {/* Arrow 1 */}
        <g opacity="0.55">
          <line x1="148" y1="86" x2="178" y2="86" strokeWidth="1.1" />
          <polyline points="170,80 178,86 170,92" strokeWidth="1.1" />
        </g>

        {/* STEP 2 — Filter: chips + a few results */}
        <g transform="translate(186 50)">
          <rect x="0" y="0" width="120" height="72" rx="3" strokeWidth="1.1" />
          {/* Filter chips */}
          <rect x="8" y="8" width="22" height="9" rx="4.5" strokeWidth="0.7" fill="currentColor" fillOpacity="0.18" />
          <rect x="34" y="8" width="22" height="9" rx="4.5" strokeWidth="0.7" opacity="0.6" />
          <rect x="60" y="8" width="22" height="9" rx="4.5" strokeWidth="0.7" opacity="0.6" />
          <rect x="86" y="8" width="22" height="9" rx="4.5" strokeWidth="0.7" opacity="0.6" />
          {/* Results grid */}
          <rect x="8" y="24" width="32" height="20" rx="1.5" strokeWidth="0.7" opacity="0.7" />
          <polygon points="14,32 22,28 30,32 30,40 22,44 14,40" strokeWidth="0.6" opacity="0.5" />
          <rect x="44" y="24" width="32" height="20" rx="1.5" strokeWidth="0.7" opacity="0.6" />
          <rect x="80" y="24" width="32" height="20" rx="1.5" strokeWidth="0.7" opacity="0.45" />
          {/* Spec lines */}
          <line x1="8" y1="50" x2="40" y2="50" strokeWidth="0.6" opacity="0.5" />
          <line x1="8" y1="56" x2="32" y2="56" strokeWidth="0.5" opacity="0.4" />
          <line x1="8" y1="62" x2="36" y2="62" strokeWidth="0.5" opacity="0.4" />
          <text x="60" y="98" fontSize="8" fontFamily="ui-monospace, monospace" fill="currentColor" textAnchor="middle">02 · FILTER</text>
        </g>

        {/* Arrow 2 */}
        <g opacity="0.55">
          <line x1="314" y1="86" x2="344" y2="86" strokeWidth="1.1" />
          <polyline points="336,80 344,86 336,92" strokeWidth="1.1" />
        </g>

        {/* STEP 3 — Order: envelope + tick */}
        <g transform="translate(352 50)">
          <rect x="0" y="14" width="108" height="56" rx="3" strokeWidth="1.1" />
          <polyline points="0,14 54,52 108,14" strokeWidth="0.9" opacity="0.6" />
          {/* Tick / confirmation badge */}
          <circle cx="92" cy="60" r="14" fill="currentColor" fillOpacity="0.18" strokeWidth="0.9" />
          <polyline points="86,60 91,65 99,55" strokeWidth="1.4" />
          <text x="54" y="98" fontSize="8" fontFamily="ui-monospace, monospace" fill="currentColor" textAnchor="middle">03 · ORDER</text>
        </g>
      </svg>
    ),
  },
};
