/**
 * Editorial copy for the site. Kept out of components so the positioning can be
 * rewritten without touching a single JSX file.
 */

export const HERO = {
    eyebrow: "Available for 2027 analyst & engineering roles",
    headline: ["I build", "financial", "systems."],
    /** Rendered in the accent serif; sits inside the headline block. */
    accentWord: "financial",
    lede:
        "Engineer by training, markets by intent. I build the pipelines, models and terminals that turn raw market and operating data into decisions, then ship them to production.",
    primaryCta: { label: "Read the resume", target: "resume" },
    secondaryCta: { label: "Selected work", target: "work" },
    meta: [
        { label: "Discipline", value: "Financial systems" },
        { label: "Based", value: "Noida, IN" },
        { label: "Reading", value: "Filings & ratios" },
        { label: "Since", value: "2023" },
    ],
};

export const PROFILE = {
    /** Kept to one short line. It is set large, so length costs a lot of height. */
    lead: "I build data systems. I study markets.",
    body: [
        "B.Tech IT & Engineering, specialising in ML and data analytics. At Exly (YC W19) I shipped React analytics components reaching 67% of active users across 10,000+ B2B customers.",
        "The markets side is self-taught and deliberate: accounting and portfolio theory now, options pricing and valuation next.",
    ],
    signature: "A DCF is a model. A valuation engine is a system. I build the second one.",
};

/** The giant-numeral stat row, echoing the reference layout. */
export const STATS = [
    { value: "9.18", unit: "/ 10", label: "CGPA", note: "ML & Data Analytics" },
    { value: "10k+", unit: "", label: "B2B users reached", note: "Exly · YC W19" },
    { value: "1.6k", unit: "commits", label: "Last 12 months", note: "GitHub" },
    { value: "192+", unit: "", label: "Problems solved", note: "LeetCode" },
];

/**
 * Two practice tracks. Finance leads deliberately, because it is the positioning.
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
                    "General ledger mechanics, ratio decomposition and cash-flow reconstruction. Reading a business from its filings rather than from its narrative, and knowing which of the three statements is lying.",
            },
            {
                name: "Intrinsic Valuation",
                detail:
                    "DCF construction from the drivers up: revenue build, margin bridge, working capital, WACC, terminal value, then sensitivity and scenario grids. Built in Excel first, because a model you cannot audit by hand is a model you do not understand.",
            },
            {
                name: "Portfolio Management",
                detail:
                    "CAPM and the security market line, efficient frontiers, beta decomposition and risk-adjusted return attribution. Judging a return by the risk that produced it.",
            },
            {
                name: "Derivatives & Pricing",
                detail:
                    "Black-Scholes, the greeks and implied volatility surfaces, written as pricing engines meant to be deployed and queried rather than plotted once in a notebook.",
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
                    "Ingestion through processing to visualisation, owned end to end. The same shape a research dashboard needs to monitor signals across a large dataset without falling over.",
            },
            {
                name: "Real-time Analytics",
                detail:
                    "Streaming dashboards that stay legible under load. Ru-Ok categorises 300+ emotional signals with contextual tagging and keeps the view current while it does it.",
            },
            {
                name: "Full-stack Delivery",
                detail:
                    "React, Redux, TypeScript, Node, Express, MongoDB and PostgreSQL. Modular, production-ready components shipped on agile cycles and reviewed before they merge.",
            },
            {
                name: "Production Infrastructure",
                detail:
                    "Docker, CI/CD and release stability. Catching failures before they reach the client, which is the same discipline as operations risk under a different name.",
            },
        ],
    },
];

/**
 * The self-directed finance curriculum, listed plainly. Rendered as an appendix
 * under the practice tracks so the claim to a markets background is specific
 * rather than asserted.
 */
export const CURRICULUM = {
    label: "Studying",
    note: "A self-directed finance curriculum running alongside the degree.",
    items: [
        { name: "Financial Accounting", detail: "General ledger, ratio analysis, cash flow statements", status: "In progress" },
        { name: "Portfolio Theory", detail: "CAPM, security market line, efficient frontier", status: "In progress" },
        { name: "Options Pricing", detail: "Black-Scholes, greeks, implied volatility", status: "Planned" },
        { name: "Intrinsic Valuation", detail: "DCF, WACC, terminal value, sensitivity analysis", status: "Planned" },
        { name: "Statistical Modelling", detail: "Regression, inference, time series", status: "Planned" },
    ],
};

/**
 * Work that is committed to but not yet published through the admin panel.
 * Anything added to the database with a matching name supersedes the entry
 * here, so this list shrinks on its own as projects ship.
 */
export const ROADMAP = [
    {
        name: "Equity Research Terminal",
        description:
            "A screening and coverage terminal: filings ingestion, ratio history, comparable sets and a written thesis per name. The analyst workflow as one deployed surface rather than nine spreadsheets.",
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
            "Intrinsic valuation from the statements up: driver-based forecasting, WACC construction and sensitivity grids. Shipped as a linked Excel model and a web build, so the workings stay inspectable.",
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
        role: "Software Engineer Intern, Frontend",
        period: "Jan 2026 to Apr 2026",
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
        period: "2023 to 2027",
        location: "Specialisation: ML & Data Analytics",
        points: [
            "CGPA 9.18 / 10.",
            "Core: machine learning, statistical modelling, system design, databases.",
            "Self-directed finance track running alongside: accounting, portfolio theory, options pricing, valuation.",
        ],
    },
    {
        org: "Practice",
        badge: "Ongoing",
        role: "Problem solving and fundamentals",
        period: "2023 to present",
        location: "LeetCode · HackerRank",
        points: [
            "192+ problems solved on LeetCode.",
            "100+ SQL problems solved on HackerRank.",
        ],
    },
];

export const CONTACT = {
    heading: ["Let's talk about", "what you're building."],
    lede:
        "Open to analyst, quantitative research and engineering roles where market thinking and system building are the same job. Also happy to talk about a model you think is wrong.",
    availability: "Currently taking conversations for 2026 and 2027.",
};

/**
 * Shown on the cold-start screen. Long enough to be worth reading, short enough
 * to finish before the next one rotates in.
 */
export const BOOT_FACTS = [
    "Studying financial statement analysis: general ledger mechanics, ratio decomposition and cash-flow reconstruction.",
    "Shipped React analytics components at Exly (YC W19) that reach 67% of active users across 10,000+ B2B customers.",
    "Building an equity research terminal and a Black-Scholes options pricing engine.",
    "Working through portfolio theory: CAPM, the security market line and risk-adjusted attribution.",
    "B.Tech IT & Engineering, specialising in machine learning and data analytics. CGPA 9.18 out of 10.",
    "Ru-Ok runs a real-time pipeline over 300+ categorised emotional signals with contextual tagging.",
    "192+ problems solved on LeetCode. 100+ SQL problems on HackerRank.",
    "Intrinsic valuation, built in Excel first, then rewritten as something that deploys.",
    "PacketLens captures live TCP traffic and renders it as a global intelligence map.",
    "Tutora cut manual operational errors by roughly 80% for the educators running on it.",
    "Also writes Solidity: Foundry, Anvil and Hardhat, for when the ledger is the product.",
    "1,668 GitHub contributions in the last twelve months.",
];

/** Honest status lines for the cold-start screen, keyed to the fetch state. */
export const BOOT_STATUS = {
    idle: "Initialising",
    warming: "Waking the API, free-tier instances spin down when idle",
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
