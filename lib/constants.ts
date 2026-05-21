// ── Navigation ──

export const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
  { label: "Blog", href: "/blog" },
] as const;

// ── Hero ──

export const HERO = {
  heading: "Your catalog is losing you deals.",
  subheading:
    "Technical buyers spend 10+ hours a week digging through PDFs.\nWe cut that to minutes.",
  ctaPrimary: "See a Live Example",
  ctaSecondary: "How It Works ↓",
  stats: [
    {
      value: "75%",
      label: "B2B buyers prefer a rep-free buying experience",
    },
  ],
} as const;

// ── Problem Section ──

export const PROBLEM = {
  quote: `"Do you have M36 Grade 10.9 in DIN?"\nYour sales team hears this 20 times a day. They dig through 300-page PDFs, cross-reference spec sheets, and reply hours later—if they reply at all. Meanwhile, the buyer moves on to a competitor who made it easy.`,
  cards: [
    {
      title: "Slow Response Times",
      description:
        "Every inquiry takes 2\u20134\u00A0hours of back-and-forth just to confirm basic\u00A0specs and\u00A0availability.",
    },
    {
      title: "Unreadable PDFs",
      description:
        "300-page catalogs that aren\u2019t searchable, aren\u2019t mobile-friendly, and definitely\u00A0aren\u2019t\u00A0impressive.",
    },
    {
      title: "Lost Buyers",
      description:
        "Technical buyers leave your site in under 30\u00A0seconds when they can\u2019t find what\u00A0they\u00A0need.",
    },
  ],
  stat: {
    value: "86%",
    label:
      "of B2B purchases stall during the buying process due to lack of clarity and information overload",
    source: "Forrester",
    sourceUrl: "https://www.forrester.com/press-newsroom/forrester-predictions-2025-b2b-marketing-sales/",
  },
  stat2: {
    value: "75%",
    label: "B2B buyers prefer a rep-free buying experience",
    source: "Gartner",
    sourceUrl:
      "https://www.gartner.com/en/sales/insights/b2b-buying-journey",
  },
} as const;

// ── Problem Carousel ──
//
// Three problems the catalogue work fixes, surfaced one at a time in
// the ProblemSection.  Each problem has a serif title + supporting
// copy on the left and a named graphic on the right.  The carousel
// auto-cycles every ~6s and pauses on hover.

export const PROBLEM_CAROUSEL = {
  // Each problem reads as a long sentence-style headline + a single
  // supporting paragraph, in the style of the original "Not just your
  // sales team — 20 times a day" framing. Layout is bare: serif title,
  // body, prev/next arrows underneath; a hairline divides it from the
  // graphic on the right. No surrounding container, no section eyebrow.
  problems: [
    {
      title:
        "Not just your sales team — anyone would get tired of answering questions like these 20 times a day.",
      description:
        "They dig through 300-page PDFs, cross-reference spec sheets, and reply hours later — if they reply at all. Meanwhile, the buyer moves on to a competitor who made it easy.",
      graphic: "workforce",
    },
    {
      title:
        "Half the day goes to time-zone delay — the other half to clarifying basics.",
      description:
        "When a buyer in another zone fires off a question, the back-and-forth balloons. Eight hours to confirm a dimension, sixteen to verify a finish, and the order that should have been one click becomes a week of email.",
      graphic: "globe",
    },
    {
      title:
        "Even when the right part is found, the hours go into verifying it.",
      description:
        "Cross-reference the rate, confirm the standard, verify the lead time, re-read the email to make sure nothing got missed. A catalogue that surfaces every spec up front collapses three rounds of confirmation into one.",
      graphic: "checklist",
    },
  ],
} as const;

// ── Solution Section ──

export const SOLUTION = {
  eyebrow: "What it does",
  heading: "Your sales engine, not just a catalogue.",
  subheading:
    "Built for how engineers and architects actually buy — search, compare, and submit a pre-qualified order without ever opening a PDF.",
  cards: [
    {
      title: "Smart Filtering",
      description:
        "Engineers filter by size, grade, material, standard—and find the exact product in seconds, not hours.",
    },
    {
      title: "Side-by-Side Comparison",
      description:
        "Let buyers compare 2–3 products visually with full specs. No more tabbing between PDF pages.",
    },
    {
      title: "Pre-Qualified Inquiries",
      description:
        "Every inquiry arrives with product name, spec, and quantity. Your sales team closes instead of clarifying.",
    },
  ],
  deviceNote:
    "Works on mobile, tablet, and desktop. No app download required.",
} as const;

// ── Impact Stats ──

export const IMPACT = {
  heading: "The impact",
  stats: [
    {
      value: "-60%",
      label: "Reduction in repetitive spec\u00A0inquiries to your sales\u00A0team",
    },
    {
      value: "+40%",
      label: "Increase in qualified inbound\u00A0leads from your\u00A0catalog",
    },
    {
      value: "10s",
      label: "Average time to find any\u00A0product spec in your\u00A0catalog",
    },
    {
      value: "24/7",
      label: "Your catalog works round\u00A0the\u00A0clock, even when your team\u00A0doesn\u2019t",
    },
  ],
  footnote:
    "Based on average results across Index clients. Individual results may vary.",
} as const;

// ── Methodology (How It Works) — single combined section ──
//
// All four beats now render as one 4-column static grid with a
// "The Result →" row underneath. No loader bar, no rotating active
// state — clean editorial layout.

export const METHODOLOGY = {
  eyebrow: "How it works",
  headingLines: ["We don't replace your", "catalogue, we unpack it."],
  // Right column reads as two paragraphs only. The second paragraph
  // pairs "The PDF buries them." with the emphasised closer "We pull
  // them to the surface." on the same line/flow.
  subtitleIntro:
    "Every catalogue already contains the structure a buyer needs — quality tiers, technical specs, the visual cues people match against a brief.",
  subtitleBuries: "The PDF buries them.",
  subtitleEmphasis: "We pull them to the surface.",
  beats: [
    {
      number: "01",
      // Every title is split into exactly THREE lines so all four
      // cards share the same heading-block height — bodies start on
      // the same baseline regardless of card.
      title: "We start with\nwhat you\nalready have",
      description:
        "A 30-minute discovery call on your buyers, your pain points, and the shape of your existing catalogue. Send us your PDF, spec sheets, and product images — we work with the data you already document.",
    },
    {
      number: "02",
      title: "Map out\nvariations of all\nshapes & sizes",
      description:
        "Every catalogue has structure hiding in it. We map quality tiers, quantity breakpoints, and how variants relate — so engineers, architects, and procurement leads each find their match without reading cover to cover.",
    },
    {
      number: "03",
      title: "Finding the\ntechnical hooks\nthat close deals",
      description:
        "Technical buyers don't buy by name; they buy by spec. We identify the factors that drive the inquiry — load rating, dimension, material grade, certification — and put them at the front of how products are filtered and compared.",
    },
    {
      number: "04",
      title: "Pull out the\nvisual identifiers\nthat matter",
      description:
        "A 3D rendering, a profile cross-section, a finish swatch — the visual cues a buyer matches against a project brief. We surface these consistently so the path from looking to ordering is one decision, not twelve.",
    },
  ],
  results: [
    {
      icon: "clock" as const,
      heading: "Faster decisions",
      body: "Underneath that buyers find the right fit in minutes not hours",
    },
    {
      icon: "arrows" as const,
      heading: "Fewer back-and-forth",
      body: "Technical clarity upfront means stronger enquiries land in your inbox.",
    },
    {
      icon: "trending" as const,
      heading: "Higher conversion",
      body: "Your catalogue works as hard as your sales team",
    },
  ],
} as const;

// ── Before / After (Kayu & Kov example) ──

export const BEFORE_AFTER = {
  eyebrow: "How it works",
  // Two explicit headline lines — renders as two block spans so the
  // wrap is deterministic, editorial.
  headingLines: ["From a PDF to", "smart sales engine"],
  // Right-column eyebrow split into a primary + secondary label so
  // "LIVE DEMO" reads as the emphasis and "See it in action" follows
  // in muted mono.
  liveDemoEyebrow: { primary: "Live Demo", secondary: "See it in action" },
  body: "An interactive catalogue we built for Kayu & Kov — 55 cladding profiles in 3D, filtered by section, dimension, and rate. Try it out below.",
  beforeLabel: "What they sent us",
  beforeMeta: "4 pages · 55 profiles",
  afterLabel: "What we shipped",
  afterMeta: "kayuandkov.com",
  // External link displayed in the AFTER panel header row.
  afterLink: { label: "Visit kayuandkov.com →", href: "https://www.kayuandkov.com" },
  afterCaption:
    "An interactive catalogue we built for Kayu & Kov — 55 cladding profiles in 3D, filtered by section, dimension, and rate. Try it out below.",
  cta: { label: "Read the full story →", href: "/blog/kayu-kov-cut-architect-emails" },
} as const;

// ── Process ──

export const PROCESS = {
  heading: "From PDF to online sales engine in 4 weeks",
  subtitle:
    "We handle the build end-to-end. You share your existing catalogue. Buyers browse, filter, and submit pre-qualified orders that drop directly into your inbox — ready to fulfil.",
  steps: [
    {
      number: "01",
      title: "Share Your Catalog",
      description:
        "Send us your existing PDF catalog, spec sheets, and product images. We audit your product data and plan the structure.",
    },
    {
      number: "02",
      title: "We Build It",
      description:
        "Our team converts your catalog into an interactive 3D experience with smart filtering, comparison tools, and inquiry forms.",
    },
    {
      number: "03",
      title: "Go Live",
      description:
        "Embed on your website or use as a standalone link. Works on every device—phone, tablet, laptop, desktop. We handle hosting, updates, and analytics. You focus on closing deals.",
    },
  ],
  footnote:
    "Average turnaround: 4 weeks from kickoff. Includes 2 rounds of revisions.",
} as const;

// ── Pricing ──

export const PRICING = {
  heading: "Simple, transparent pricing",
  subtitle:
    "One-time setup fee. No monthly subscriptions. Your catalog, your asset.",
  plans: [
    {
      name: "Simple",
      price: "₹1,20,000",
      period: "One-time setup",
      popular: false,
      features: [
        "Up to 50 products",
        "Smart filtering",
        "Mobile responsive",
        "Inquiry form",
        "1 round of revisions",
      ],
      cta: "Start Project →",
    },
    {
      name: "Professional",
      price: "₹2,00,000",
      period: "One-time setup",
      popular: true,
      features: [
        "Up to 200 products",
        "Smart filtering + comparison",
        "3D product views",
        "Pre-qualified inquiries",
        "Analytics dashboard",
        "2 rounds of revisions",
      ],
      cta: "Start Project →",
    },
    {
      name: "Enterprise",
      price: "₹3,00,000",
      period: "One-time setup",
      popular: false,
      features: [
        "Unlimited products",
        "Everything in Professional",
        "Multi-language support",
        "CRM integration",
        "Custom branding",
        "Priority support",
      ],
      cta: "Start Project →",
    },
  ],
  footnote:
    "All plans include hosting for 12 months, SSL, and CDN. Annual renewal at 15% of setup cost.",
} as const;

// ── Industries ──

export const INDUSTRIES = {
  heading: "Built for manufacturers who export or serve technical buyers",
  cards: [
    {
      title: "Fasteners",
      description:
        "Bolts, nuts, screws, washers—thousands of SKUs across DIN, ISO, and ANSI standards. Make every spec instantly findable.",
    },
    {
      title: "Tiles & Ceramics",
      description:
        "Showcase textures, finishes, and sizes in 3D. Let architects visualize products before they specify them.",
    },
    {
      title: "Profiles & Hardware",
      description:
        "Aluminum profiles, architectural hardware, industrial fittings—complex specs made simple and searchable.",
    },
    {
      title: "Connectors & Electrical",
      description:
        "Motorsport connectors, circular MIL-spec interfaces, wire configurations—cross-reference competitor parts and decode part numbers instantly.",
    },
  ],
} as const;

// ── FAQ ──

export const FAQ = {
  heading: "Common questions",
  items: [
    {
      question: "How do I know if this is right for my business?",
      answer:
        "If your buyers need to search through specs, compare products, or request quotes based on technical parameters—you're a fit. It doesn't matter if you make fasteners, tiles, aluminium profiles, or electrical connectors. If your sales team spends time answering repetitive spec questions, or if buyers struggle to find the right product in your catalog, an interactive catalog will directly reduce that friction and increase qualified inquiries.",
    },
    {
      question: "How long does the entire process take?",
      answer:
        "From kickoff to launch, most projects take 4 weeks. This includes data audit, design, development, and 2 rounds of revisions. Enterprise projects with 500+ products may take 6–8 weeks.",
    },
    {
      question: "What do I need to provide?",
      answer:
        "Your existing PDF catalog, product spec sheets, and high-resolution product images. If you have a product database or spreadsheet, even better. We handle everything else—design, development, hosting, and optimization.",
    },
    {
      question: "Can I update products after launch?",
      answer:
        "Yes. We provide a simple admin panel where you can add, edit, or remove products. For major catalog overhauls, our team handles the update at a flat fee. Small changes (pricing, availability) are self-service.",
    },
    {
      question: "Does it work on mobile devices?",
      answer:
        "Absolutely. Every catalog is fully responsive and optimized for mobile, tablet, and desktop. Over 60% of B2B product searches now happen on mobile—your catalog will be ready.",
    },
    {
      question: "What about the free 5-product demo?",
      answer:
        "We build a fully functional demo with 5 of your products at no cost. You get to see exactly how your catalogue will look and work before committing. No contracts, no obligations. If you love it, we scale it up.",
    },
  ],
} as const;

// ── Contact ──

export const CONTACT = {
  heading: "Stop losing deals to messy PDFs.",
  subheading:
    "The free demo includes 5 products from your catalogue. No contracts, no credit card required.",
  submitLabel: "Get a free 5-product demo",
  productOptions: ["1–50", "51–200", "201–500", "500+", "Other"],
  industryOptions: [
    "Fasteners",
    "Tiles & Ceramics",
    "Profiles & Hardware",
    "Connectors & Electrical",
    "Other",
  ],
} as const;

// ── Blog ──

export interface BlogPost {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    initials: string;
    bio: string;
  };
  /** Optional hero illustration shown between the post header and body. */
  coverImage?: {
    src: string;
    alt: string;
  };
  content: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "pdf-catalog-costing-you-deals",
    tag: "Strategy",
    title: "Why your PDF catalogue is costing you deals",
    excerpt:
      "The hidden cost of static catalogs: lost leads, slow responses, and buyers who never come back.",
    readTime: "8 min read",
    date: "Feb 10, 2026",
    author: {
      name: "Sankalp Shetty",
      initials: "SS",
      bio: "Founder of IndexArch. Helping manufacturers turn static catalogues into interactive sales tools.",
    },
    content: [
      `Here's a number that should concern every B2B manufacturer: **86% of B2B purchases stall** when buyers can't easily find the product information they need. And if your primary sales tool is a 200-page PDF catalog, you're almost certainly losing deals you don't even know about.`,
      `We've worked with dozens of manufacturers across fasteners, tiles, and industrial hardware. The pattern is always the same: great products, terrible product discovery. Let's break down exactly how your PDF catalog is costing you money—and what to do about it.`,
      `## The Hidden Cost of "It Works Fine"`,
      `Most manufacturers we talk to say the same thing: "Our PDF catalog works fine. We've been using it for years." And they're right—it does work. The problem is what "works" means in 2026.`,
      `Your PDF catalog "works" the way a fax machine "works." It transmits information. But it doesn't help your buyers find what they need, compare options, or make decisions. It just dumps 300 pages of specs into their lap and hopes for the best.`,
      `### The real costs:`,
      `- **Sales team time:** Your team spends 2–4 hours per inquiry just clarifying specs that should be self-service.
- **Response lag:** Average response time of 24–48 hours. Your competitor with a digital catalog responds instantly.
- **Mobile unusability:** 60%+ of B2B product research happens on mobile. PDFs are unreadable on phones.
- **Zero analytics:** You have no idea which products buyers are looking at, where they drop off, or what they search for.`,
      `## What Technical Buyers Actually Want`,
      `We surveyed 150 engineers, architects, and procurement managers across India and the Middle East. Here's what they told us:`,
      `> "I don't want to email a sales rep and wait 2 days just to find out if you make a bolt in M36 DIN. I want to search, filter, and find it myself. If I can't do that in 30 seconds, I move on."`,
      `The message is clear: technical buyers want **self-service product discovery**. They want to search by spec, filter by standard, compare options side-by-side, and only reach out when they're ready to buy.`,
      `This isn't about fancy 3D animations or flashy design. It's about making your product information *accessible*. A buyer who can find what they need in 10 seconds is a buyer who converts. A buyer who has to email and wait is a buyer who goes to your competitor.`,
      `## The Math: What One Lost Deal Costs You`,
      `Let's do some simple math. Say your average deal size is ₹5,00,000. If your PDF catalog causes you to lose just 2 deals per month because of slow response times or poor product discovery, that's ₹1,00,00,000 in annual lost revenue.`,
      `Now compare that to the cost of an interactive catalog: a one-time investment of ₹1,50,000–₹3,00,000. The ROI isn't just positive—it's obvious.`,
      `### But it's not just about the deals you lose.`,
      `It's about the deals you never see. The engineer who visited your website, downloaded your PDF, couldn't find what they needed, and went to a competitor—all without your sales team ever knowing. That's the invisible cost of a bad catalog experience.`,
      `## What the Alternative Looks Like`,
      `An interactive product catalog isn't a "nice to have" anymore. It's the baseline expectation for serious B2B buyers. Here's what a modern catalog does that your PDF can't:`,
      `- **Smart filtering:** Search by any attribute—size, grade, material, standard, finish.
- **Side-by-side comparison:** Compare 2–3 products with full specs in a single view.
- **Mobile-first:** Works perfectly on phones, tablets, and desktops.
- **Pre-qualified inquiries:** Every inquiry arrives with product, spec, and quantity already filled in.
- **Analytics:** Know exactly which products get viewed, compared, and inquired about.`,
      `## The Bottom Line`,
      `Your products are excellent. Your engineering is world-class. But if the way buyers discover and evaluate your products is a 300-page PDF, you're bringing a knife to a gunfight.`,
      `The manufacturers who win in the next decade won't just have the best products. They'll have the best product *experiences*. And that starts with replacing the PDF.`,
    ],
  },
  {
    slug: "kayu-kov-cut-architect-emails",
    tag: "Case Study",
    title: "Kayu & Kov asked for a PDF redesign. We built them a search engine.",
    excerpt:
      "A WPC profiles manufacturer came to us wanting a cleaner-looking catalogue. We told them why a website would do more for their architect customers — and shipped one in 4 weeks.",
    readTime: "5 min read",
    date: "Jan 28, 2026",
    author: {
      name: "Sankalp Shetty",
      initials: "SS",
      bio: "Founder of IndexArch. Helping manufacturers turn static catalogues into interactive sales tools.",
    },
    content: [
      `Kayu & Kov makes WPC — wood-plastic composite — profiles out of Bangalore. Fluted profiles, hollow boxes, sheet profiles, louvers, door frames. Their customers are architects and contractors who specify these into projects across India.`,
      `They came to us with a 4-page PDF catalogue listing 55 profiles, and a simple ask: redesign the PDF so it looks better and is easier to read.`,
      `![The Kayu & Kov listed-price PDF — 55 profiles, four pages of dense tables, exactly as it landed in our inbox.](/kayu-kov/page-1.png "The catalogue they sent us. 55 profiles, four pages of tables.")`,
      `We didn't redesign the PDF.`,
      `## The conversation we had instead`,
      `Looking at the catalogue, the problem wasn't that it looked bad. It looked fine — clean tables, 2D dimensions, 3D renderings, codes, rates per RFT. The problem was *how* architects were expected to use it: open the PDF, scroll through 55 rows, find a profile that fits the section type, dimension, and rate they need, then email the sales team to confirm availability.`,
      `For 55 profiles across four pages, this is roughly the worst possible interaction. Too many products to remember by name; too few categories to navigate by intuition; and every spec hidden inside a row that has to be read top-to-bottom before you know whether it's even relevant.`,
      `[DIAGRAM:pdf-vs-tile]`,
      `So we made the case for replacing the PDF entirely.`,
      `## What an architect actually needs`,
      `Architects don't shop a catalogue the way a consumer shops a website. They come in with a brief — *"I need a fluted profile around 145mm wide, ideally under ₹400 per RFT, with a 3D rendering I can drop into my visualisation."* The job of a catalogue, for that user, is to let them filter to the matching profiles in seconds and see the visual identifier they need.`,
      `[DIAGRAM:brief-to-order]`,
      `A PDF can't do that. A website can. So we built one.`,
      `## What we shipped`,
      `In four weeks, Kayu & Kov got a live web catalogue covering all 55 profiles. Same brand. Same renderings. New shape.`,
      `![The Kayu & Kov catalogue homepage — filter chips for each section type, a search bar, and the 55 profiles in a grid below.](/kayu-kov/shots/01-overview.png "All 55 profiles, browsable in seconds. Filter chips across the top, product grid below.")`,
      `Three moves did most of the work:`,
      `- **Filter by section type** — sheets, hollow boxes, fluted profiles, louvers, door frames, rods, channels — as one-click chips along the top.
- **Search by code, dimension, or description** — for the architects who already know what they're looking for.
- **One-tap order on every card** — the sales team gets an email with product code, dimension, and rate pre-filled.`,
      `### Search resolves a dimension instantly`,
      `Architects often arrive with a number — "I need something around 145mm wide". Typing that into the search bar narrows 55 profiles down to the one that matches. No scrolling, no cross-referencing.`,
      `![The catalogue with "145 x 18" typed into the search bar — 55 profiles narrowed down to a single Fluted Profile-3 result.](/kayu-kov/shots/03-search.png "Type a dimension; the catalogue resolves to a single profile.")`,
      `### Filters cut 55 down to the family you care about`,
      `For architects who don't have a specific number in mind yet — "show me what hollow boxes are available" — the filter chips do the same job categorically.`,
      `![The catalogue with a category filter active, showing only profiles from one section family.](/kayu-kov/shots/04-filter.png "One chip narrows the grid to a single section type.")`,
      `### Every card opens to a useful spec page`,
      `When the architect has a candidate, tapping any card opens a full-size spec view: the 3D rendering at scale, full dimensions, code, rate, and the one-click order button. None of these existed in the PDF.`,
      `![A product detail view showing a single profile at scale, with dimensions and the order button.](/kayu-kov/shots/05-detail.png "Tap any profile to see it at scale, with the order button right there.")`,
      `Everything works on mobile too, because architects do half their spec work on phones in site meetings.`,
      `## The takeaway`,
      `The right answer to "redesign our PDF" wasn't a prettier PDF. It was a different shape of object entirely — one that matches how the customer actually uses the information.`,
      `A catalogue isn't content to be read; it's a search problem to be solved. Once you see it that way, the redesign brief writes itself.`,
      `If you have a catalogue that's drowning your team in spec emails, that's the conversation we'd want to have with you too.`,
    ],
  },
  {
    slug: "3d-product-catalogs-what-works",
    tag: "Technical",
    title: "3D Product Catalogs: What Actually Works in 2026",
    excerpt:
      "Not all interactive catalogs are created equal. Here's what separates tools that convert from tools that confuse.",
    readTime: "10 min read",
    date: "Jan 15, 2026",
    author: {
      name: "Sankalp Shetty",
      initials: "SS",
      bio: "Founder of IndexArch. Helping manufacturers turn static catalogues into interactive sales tools.",
    },
    content: [
      `The phrase "3D product catalog" gets thrown around a lot in manufacturing circles. But there's a massive gap between a spinning 3D model on a webpage and a catalog that actually helps engineers find products, compare specs, and place orders.`,
      `We've built catalogs for fastener manufacturers, tile companies, and hardware distributors. Here's what we've learned about what actually works—and what's just expensive decoration.`,
      `## The Fundamentals: Search and Filter First`,
      `The single most important feature in any product catalog isn't 3D. It's search. Specifically, the ability to filter products by the exact attributes your buyers care about: size, grade, material, standard, finish, load rating, whatever matters in your industry.`,
      `If an engineer can't find the right M36 Grade 10.9 bolt in under 10 seconds, your catalog has failed—no matter how beautiful the 3D rendering is.`,
      `## 3D That Serves a Purpose`,
      `3D visualization works brilliantly for products where spatial understanding matters: tiles (how does this texture look at scale?), profiles (what's the cross-section?), hardware (how do these components fit together?). It fails when it's added just because it looks impressive.`,
      `The test: does the 3D view help the buyer make a decision faster? If yes, invest in it. If it's just a spinning model that adds loading time, skip it.`,
      `## Comparison Tools: The Underrated Feature`,
      `In our experience, side-by-side comparison is the single highest-converting feature in B2B catalogs. Engineers and procurement managers don't buy the first product they find—they evaluate 2–3 options against each other. Make that comparison effortless, and you remove a major friction point in the buying process.`,
      `## Pre-Qualified Inquiries: Stop Wasting Sales Time`,
      `A generic "Contact Us" form is a missed opportunity. When a buyer has already found the product they want, your inquiry form should capture what they found: product name, spec, quantity, and application. This means your sales team gets a qualified lead instead of a vague question.`,
      `## Mobile: Non-Negotiable`,
      `Over 60% of B2B product research now happens on mobile devices. If your catalog doesn't work perfectly on a phone, you're invisible to the majority of your potential buyers.`,
      `## The Bottom Line`,
      `The best catalogs in 2026 aren't the flashiest. They're the ones that respect the buyer's time. Fast search, smart filters, useful comparisons, and pre-qualified inquiries. Everything else is optional.`,
    ],
  },
  // Stashed for now \u2014 restore by removing the surrounding `/* */`.
  /*
  {
    slug: "fastener-industry-digital-gap",
    tag: "Industry",
    title: "The Fastener Industry\u2019s Digital Gap",
    excerpt:
      "Why fastener manufacturers are losing export deals to competitors with better digital catalogs.",
    readTime: "7 min read",
    date: "Jan 5, 2026",
    // coverImage is intentionally omitted until the hero illustration
    // file lands at public/blog/fastener-hero.png — uncomment then.
    // coverImage: {
    //   src: "/blog/fastener-hero.png",
    //   alt: "A 3D bolt linking continents on a world map, alongside a browser frame showing a fastener product page with ISO/DIN/ANSI standards badges and search, compare, download, and 3D viewer actions.",
    // },
    author: {
      name: "Sankalp Shetty",
      initials: "SS",
      bio: "Founder of IndexArch. Helping manufacturers turn static catalogues into interactive sales tools.",
    },
    content: [
      `India is the world's third-largest fastener producer. We manufacture everything from standard hex bolts to aerospace-grade specialty fasteners. But when it comes to how we present these products to international buyers, we're stuck in the 1990s.`,
      `The digital gap in Indian fastener manufacturing isn't about capability—it's about presentation. And it's costing the industry export deals every single day.`,
      `## The Current State`,
      `Talk to any fastener manufacturer in Ludhiana, Rajkot, or Mumbai, and you'll find a similar setup: a PDF catalog (usually outdated), a basic website with a product list, and a sales team that handles everything via email and WhatsApp. This approach worked when the competition was other Indian manufacturers using the same methods.`,
      `It doesn't work when your competition is a European manufacturer with an interactive digital catalog, instant spec lookup, and a polished buyer experience.`,
      `## What International Buyers Expect`,
      `We interviewed procurement managers at automotive, construction, and industrial companies across Europe and the Middle East. The consistent feedback: Indian manufacturers have competitive products and pricing, but the buying experience is frustrating.`,
      `Buyers want to search for a specific bolt by DIN standard, ISO class, material grade, and size—and find it in seconds. They want to compare options. They want to download a spec sheet or 3D model. They want to submit a quote request with all details pre-filled.`,
      `They don't want to email someone and wait 2 days for a PDF attachment.`,
      `## The Opportunity`,
      `The fastener manufacturers who invest in digital product experiences today will have a significant competitive advantage in export markets. The gap between "great products, bad presentation" and "great products, great presentation" is the difference between winning and losing international deals.`,
      `The cost of bridging this gap is modest compared to the value of even a single additional export contract. The question isn't whether to invest in digital—it's how quickly you can get there.`,
    ],
  },
  */
];

// ── Footer ──

export const FOOTER = {
  brand: {
    description:
      "We turn static PDF catalogs into interactive 3D experiences that help manufacturers sell more to technical buyers.",
  },
  links: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Blog", href: "/blog" },
  ],
  contact: {
    email: "hello@indexstudio.in",
    phone: "+91 98765 43210",
    location: "Mumbai, India",
  },
  copyright: "© 2026 IndexArch. All rights reserved. Built with care in India.",
} as const;
