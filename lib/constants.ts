// ── Navigation ──

export const NAV_LINKS = [
  { label: "How It Works", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Case Study", href: "#case-study" },
  { label: "Blog", href: "/blog" },
] as const;

// ── Hero ──

export const HERO = {
  heading: "Your catalog is losing you deals.",
  subheading:
    "Engineers spend 4.5 hours searching PDFs for a single spec. With Index, it takes 10 seconds.",
  ctaPrimary: "See a Live Example",
  ctaSecondary: "How It Works ↓",
  stats: [
    { value: "4.5 hrs", label: "Avg. time engineers spend searching PDFs" },
    {
      value: "73%",
      label: "Buyers prefer self-service product discovery",
    },
    { value: "10 sec", label: "Time to find any spec with Index" },
  ],
} as const;

// ── Problem Section ──

export const PROBLEM = {
  quote: `"Do you have M36 Grade 10.9 in DIN?"\nYour sales team hears this 20 times a day. They dig through 300-page PDFs, cross-reference spec sheets, and reply hours later—if they reply at all. Meanwhile, the buyer moves on to a competitor who made it easy.`,
  cards: [
    {
      title: "Slow Response Times",
      description:
        "Every inquiry takes 2–4 hours of back-and-forth just to confirm basic specs and availability.",
    },
    {
      title: "Unreadable PDFs",
      description:
        "300-page catalogs that aren't searchable, aren't mobile-friendly, and definitely aren't impressive.",
    },
    {
      title: "Lost Buyers",
      description:
        "Technical buyers leave your site in under 30 seconds when they can't find what they need.",
    },
  ],
  stat: {
    value: "86%",
    label:
      "of B2B purchases stall when buyers can't find product information easily",
    source: "Gartner B2B Buying Report",
  },
} as const;

// ── Solution Section ──

export const SOLUTION = {
  heading: "What your 3D catalog does",
  subheading:
    "Everything your PDF can't. Interactive, filterable, and built for how engineers actually buy.",
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

// ── Case Study ──

export const CASE_STUDY = {
  label: "Case Study",
  heading: "40% reduction in architect back-and-forth",
  body: "Kayu & Kov, a premium tiles manufacturer, replaced their 200-page PDF with an interactive 3D catalog. The result? Architects stopped emailing for specs—and started sending purchase orders.",
  metrics: [
    { before: "48hr response", after: "Instant access" },
    { before: "Manual lookup", after: "+35% qualified inquiries" },
    { before: "200-page PDF", after: "-40% email volume" },
  ],
  cta: { label: "Read full case study →", href: "/case-study" },
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

// ── Process ──

export const PROCESS = {
  heading: "From PDF to 3D in 4 weeks",
  subtitle:
    "We handle everything. You just share your existing catalog and product data.",
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
      question: "What about the free 10-product demo?",
      answer:
        "We build a fully functional demo with 10 of your products at no cost. You get to see exactly how your catalog will look and work before committing. No contracts, no obligations. If you love it, we scale it up.",
    },
  ],
} as const;

// ── Contact ──

export const CONTACT = {
  heading: "Stop losing deals to messy PDFs.",
  subheading:
    "Get a free 10-product demo of your catalog. See the difference before you commit.",
  submitLabel: "Get Free Demo →",
  footnote:
    "Free demo includes 10 products from your catalog. No contracts. No credit card required.",
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
  content: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "pdf-catalog-costing-you-deals",
    tag: "Strategy",
    title: "Why Your PDF Catalog Is Costing You Deals",
    excerpt:
      "The hidden cost of static catalogs: lost leads, slow responses, and buyers who never come back.",
    readTime: "8 min read",
    date: "Feb 10, 2026",
    author: {
      name: "Arjun Patel",
      initials: "AP",
      bio: "Founder at Index Studio. Helping manufacturers turn static catalogs into interactive sales tools. Previously at Tata Digital and McKinsey.",
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
    title: "How Kayu & Kov Cut Architect Emails by 40%",
    excerpt:
      "A premium tiles manufacturer replaced their PDF catalog and transformed their sales process overnight.",
    readTime: "6 min read",
    date: "Jan 28, 2026",
    author: {
      name: "Arjun Patel",
      initials: "AP",
      bio: "Founder at Index Studio. Helping manufacturers turn static catalogs into interactive sales tools. Previously at Tata Digital and McKinsey.",
    },
    content: [
      `Kayu & Kov is a premium tiles manufacturer based in Morbi, Gujarat, with over 180 SKUs across porcelain, vitrified, and ceramic categories. Their products are specified by architects across India and the Middle East.`,
      `The problem? Their sales team was drowning in repetitive emails from architects asking for the same spec information—information that was buried in a 200-page PDF catalog.`,
      `## The Before: Death by Email`,
      `Before Index, Kayu & Kov's sales process looked like this: an architect would download their PDF, struggle to find the right tile specs, and email the sales team. The team would spend 2–4 hours finding the answer and responding. By the time they replied, the architect had often already specified a competitor's product.`,
      `Their metrics told the story: 120 spec-related emails per month, 48-hour average response time, and only 15 qualified inquiries making it through the noise.`,
      `## The Solution: Interactive 3D Catalog`,
      `We built Kayu & Kov an interactive catalog with smart filtering by size, finish, material, and application. Architects could compare tiles side-by-side, view them in 3D, and submit pre-qualified inquiries with all specs already attached.`,
      `The entire project took 5 weeks from kickoff to launch.`,
      `## The Results`,
      `Within 3 months of launch, the numbers spoke for themselves:`,
      `- **Email volume dropped 40%**: From 120/month to 72/month. Architects were finding answers themselves.
- **Response time went from 48 hours to instant**: Self-service meant no waiting.
- **Qualified inquiries increased 47%**: From 15/month to 22/month. Architects who reached out were ready to buy.
- **Sample requests nearly doubled**: From 8/month to 14/month. More engagement, more pipeline.`,
      `## The Takeaway`,
      `Kayu & Kov didn't change their products. They didn't hire more salespeople. They didn't run ads. They simply made it easier for architects to find and evaluate their tiles. The result was less noise, more signal, and a sales team that could focus on closing instead of clarifying.`,
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
      name: "Arjun Patel",
      initials: "AP",
      bio: "Founder at Index Studio. Helping manufacturers turn static catalogs into interactive sales tools. Previously at Tata Digital and McKinsey.",
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
  {
    slug: "fastener-industry-digital-gap",
    tag: "Industry",
    title: "The Fastener Industry\u2019s Digital Gap",
    excerpt:
      "Why fastener manufacturers are losing export deals to competitors with better digital catalogs.",
    readTime: "7 min read",
    date: "Jan 5, 2026",
    author: {
      name: "Arjun Patel",
      initials: "AP",
      bio: "Founder at Index Studio. Helping manufacturers turn static catalogs into interactive sales tools. Previously at Tata Digital and McKinsey.",
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
];

// ── Footer ──

export const FOOTER = {
  brand: {
    description:
      "We turn static PDF catalogs into interactive 3D experiences that help manufacturers sell more to technical buyers.",
  },
  links: [
    { label: "How It Works", href: "#process" },
    { label: "Pricing", href: "#pricing" },
    { label: "Case Study", href: "#case-study" },
    { label: "Blog", href: "/blog" },
  ],
  contact: {
    email: "hello@indexstudio.in",
    phone: "+91 98765 43210",
    location: "Mumbai, India",
  },
  copyright: "© 2026 Index Studio. All rights reserved. Built with care in India.",
} as const;
