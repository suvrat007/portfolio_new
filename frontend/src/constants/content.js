/**
 * Editorial copy for the site. Kept out of components so the positioning can be
 * rewritten without touching a single JSX file.
 */

export const HERO = {
    eyebrow: "Available — 2027 analyst & engineering roles",
    headline: ["I build", "financial", "systems."],
    /** Rendered in the accent serif; sits inside the headline block. */
    accentWord: "financial",
    lede:
        "Engineer by training, markets by intent. I build the pipelines, models and terminals that turn raw market and operating data into decisions — then ship them to production.",
    primaryCta: { label: "Read the resume", target: "resume" },
    secondaryCta: { label: "Selected work", target: "work" },
    meta: [
        { label: "Discipline", value: "Financial systems" },
        { label: "Based", value: "Noida, IN" },
        { label: "Since", value: "2023" },
    ],
};

export const PROFILE = {
    lead:
        "I am a B.Tech IT & Engineering student specialising in machine learning and data analytics, and I spend the other half of my time on capital markets.",
    body: [
        "The engineering half is production-scale: real-time analytics dashboards, data pipelines and full-stack platforms — including React data visualisation components at Exly (YC W19) that reach 10,000+ B2B customers.",
        "The markets half is deliberate. Financial statement analysis, intrinsic valuation, portfolio theory and options pricing — studied properly, then rebuilt as software. A DCF is a model; a valuation engine is a system. I am interested in the second one.",
    ],
    signature: "Where data systems meet capital markets.",
};

/** The giant-numeral stat row, echoing the reference layout. */
export const STATS = [
    { value: "9.18", unit: "/ 10", label: "CGPA", note: "ML & Data Analytics" },
    { value: "10k+", unit: "", label: "B2B users reached", note: "Exly · YC W19" },
    { value: "1.6k", unit: "commits", label: "Last 12 months", note: "GitHub" },
    { value: "192", unit: "+", label: "Problems solved", note: "LeetCode" },
];

/**
 * Two practice tracks. Finance leads deliberately — it is the positioning.
 */
export const PRACTICE_TRACKS = [
    {
        id: "markets",
        index: "A",
        title: "Markets & Valuation",
        summary: "Reading a business from its numbers, then pricing it.",
        items: [
            {
                name: "Financial Statement Analysis",
                detail:
                    "General ledger mechanics, ratio decomposition, cash-flow reconstruction. Reading a business from its filings rather than its narrative.",
            },
            {
                name: "Intrinsic Valuation",
                detail:
                    "DCF construction, comparables, sensitivity and scenario tables. Built in Excel first, then codified into something reusable.",
            },
            {
                name: "Portfolio Management",
                detail:
                    "CAPM, the security market line, efficient frontiers and risk-adjusted return attribution.",
            },
            {
                name: "Derivatives & Pricing",
                detail:
                    "Black-Scholes, the greeks, and implied volatility surfaces — written as pricing engines meant to be deployed, not plotted once.",
            },
        ],
    },
    {
        id: "systems",
        index: "B",
        title: "Systems & Data",
        summary: "The infrastructure that makes the analysis operational.",
        items: [
            {
                name: "Data Pipeline Architecture",
                detail:
                    "Ingestion through processing to visualisation, owned end to end. The same shape a research dashboard needs to monitor signals across large datasets.",
            },
            {
                name: "Real-time Analytics",
                detail:
                    "Streaming dashboards that stay legible under load — 300+ categorised signals with contextual tagging, updating live.",
            },
            {
                name: "Full-stack Delivery",
                detail:
                    "React, Node, TypeScript, MongoDB and PostgreSQL. Modular, production-ready components shipped on agile cycles.",
            },
            {
                name: "Production Infrastructure",
                detail:
                    "CI/CD, containerisation and release stability. Catching failures before they reach the client — the same rigour as operations risk.",
            },
        ],
    },
];

/**
 * Work that is committed to but not yet published through the admin panel.
 * Anything added to the database with a matching name supersedes the entry
 * here, so this list shrinks on its own as projects ship.
 */
export const ROADMAP = [
    {
        name: "Equity Research Terminal",
        description:
            "A screening and coverage terminal: filings ingestion, ratio history, comparable sets and a written thesis per name — the analyst workflow as one deployed surface.",
        tags: ["React", "Node.js", "PostgreSQL", "Market Data APIs"],
        status: "building",
        domain: "finance",
    },
    {
        name: "Options Pricing Engine",
        description:
            "Black-Scholes and binomial pricing with a live greeks surface and implied volatility solving, exposed as both an API and an interactive board.",
        tags: ["Python", "Black-Scholes", "Greeks", "Implied Volatility"],
        status: "building",
        domain: "finance",
    },
    {
        name: "DCF Valuation Suite",
        description:
            "Intrinsic valuation from the statements up — driver-based forecasting, WACC construction and sensitivity grids. Shipped as a linked Excel model and a web build.",
        tags: ["Excel", "DCF", "WACC", "Scenario Analysis"],
        status: "planned",
        domain: "finance",
    },
    {
        name: "Portfolio Risk Dashboard",
        description:
            "CAPM and SML attribution over a live holdings set, with drawdown, beta decomposition and efficient-frontier positioning.",
        tags: ["Portfolio Theory", "CAPM", "Risk Attribution"],
        status: "planned",
        domain: "finance",
    },
];

export const EXPERIENCE = [
    {
        org: "Exly",
        badge: "YC W19",
        role: "Software Engineer Intern — Frontend",
        period: "Jan 2026 — Apr 2026",
        location: "Mumbai (Remote)",
        points: [
            "Built and optimised React data visualisation components for the creator analytics platform, reaching 67% of active users across 10,000+ B2B customers.",
            "Resolved critical failing tests and stabilised the release pipeline.",
            "Shipped modular, production-ready components across agile sprint cycles.",
        ],
    },
    {
        org: "Maharaja Agrasen Institute of Technology",
        badge: "B.Tech",
        role: "Information Technology & Engineering",
        period: "2023 — 2027",
        location: "Specialisation: ML & Data Analytics",
        points: [
            "CGPA 9.18 / 10.",
            "Self-directed finance track: financial accounting, portfolio theory, Black-Scholes pricing and DCF valuation.",
        ],
    },
];

export const CONTACT = {
    heading: ["Let's talk about", "what you're building."],
    lede:
        "Open to analyst, quantitative research and engineering roles where market thinking and system building are the same job. Also happy to talk about a model you think is wrong.",
    availability: "Currently taking conversations for 2026–27.",
};

/**
 * Shown on the cold-start screen. Long enough to be worth reading, short enough
 * to finish before the next one rotates in.
 */
export const BOOT_FACTS = [
    "Studying financial statement analysis — general ledger mechanics, ratio decomposition and cash-flow reconstruction.",
    "Shipped React analytics components at Exly (YC W19) that reach 10,000+ B2B customers.",
    "Building an equity research terminal and a Black-Scholes options pricing engine.",
    "Portfolio theory in practice: CAPM, the security market line and risk-adjusted attribution.",
    "B.Tech IT & Engineering, specialising in machine learning and data analytics. CGPA 9.18.",
    "Ru-Ok runs a real-time pipeline over 300+ categorised emotional signals with contextual tagging.",
    "192+ problems solved on LeetCode. 100+ SQL problems on HackerRank.",
    "Intrinsic valuation, built in Excel first — then rewritten as something that deploys.",
    "PacketLens captures live TCP traffic and renders it as a global intelligence map.",
    "1,668 GitHub contributions in the last twelve months.",
];

/** Honest status lines for the cold-start screen, keyed to the fetch state. */
export const BOOT_STATUS = {
    idle: "Initialising",
    warming: "Waking the API — free-tier instances spin down when idle",
    hydrating: "Loading from local snapshot",
    fetching: "Fetching latest",
    ready: "Ready",
    timeout: "Serving the last known snapshot",
    error: "Serving the last known snapshot",
};

export const FOOTER = {
    note: "Designed and built from scratch. React, Vite, Node and MongoDB.",
    colophon: "Inter Tight · Instrument Serif · JetBrains Mono",
};
