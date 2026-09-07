/**
 * Editorial copy for the site. Kept out of components so the positioning can be
 * rewritten without touching a single JSX file.
 */

export const HERO = {
    eyebrow: "Available for 2027 roles",
    headline: ["I build", "high-performance", "systems."],
    /** Rendered in the accent serif; sits inside the headline block. */
    accentWord: "high-performance",
    lede:
        "Low-latency compute cores, real-time data pipelines and the interfaces on top. I build the whole stack and ship it, whether the domain is markets or anything else.",
    primaryCta: { label: "Read the resume", target: "resume" },
    secondaryCta: { label: "Selected work", target: "work" },
    meta: [
        { label: "Discipline", value: "Systems & data" },
        { label: "Based", value: "Noida, IN" },
        { label: "Shortlisted", value: "Barclays HK, 2026" },
        { label: "Since", value: "2023" },
    ],
};

export const PROFILE = {
    /** Kept to one short line. It is set large, so length costs a lot of height. */
    lead: "I build systems, end to end.",
    body: [
        "B.Tech IT & Engineering at MAIT. Shortlisted for the Barclays Hong Kong Electronic Trading Associate summer internship, 2026.",
        "The finance work is not notebooks. Quantfolio runs a C++17 core behind a reproducible data pipeline, FinSight OS builds linked three-statement models from live filings, and a low-frequency trading stack is in progress. They are deployed and they have tests.",
    ],
    signature: "A backtest is a script. An execution stack is a system. I build the second one.",
};

/** The giant-numeral stat row, echoing the reference layout. */
export const STATS = [
    {
        value: "380",
        unit: "x faster",
        label: "Frontier computation",
        note: "57s to 150ms, C++ core",
    },
    { value: "9.2", unit: "/ 10", label: "CGPA", note: "B.Tech IT, MAIT" },
    { value: "10k+", unit: "", label: "Customers reached", note: "Exly, YC-19" },
    { value: "250+", unit: "", label: "LeetCode solved", note: "Plus 100+ SQL on HackerRank" },
];

/**
 * Two practice tracks. Finance leads deliberately, because it is the positioning.
 * Every claim here is carried by something in the work index.
 */
export const PRACTICE_TRACKS = [
    {
        id: "markets",
        index: "A",
        title: "Markets & Risk",
        summary: "Reading a business from its numbers, then pricing the risk.",
        items: [
            {
                name: "Financial Statement Analysis",
                detail:
                    "Linked three-statement models, DuPont decomposition, and liquidity, efficiency and solvency ratios, with balance sheet integrity checks built in. FinSight OS normalises accounting nomenclature across sources before it computes anything, because the alternative is comparing two things that were never the same line item.",
            },
            {
                name: "Portfolio & Risk",
                detail:
                    "Mean-variance optimisation, efficient frontier, Sharpe and Sortino, VaR and CVaR, maximum drawdown, Euler risk decomposition and Ledoit-Wolf shrinkage covariance estimation. All of it shipped in Quantfolio rather than described.",
            },
            {
                name: "Market Data & Execution",
                detail:
                    "Live Binance WebSocket ingestion with auto-reconnect and exponential backoff, feeding a rolling metrics engine and a strategy layer, with position and P&L held as state rather than recomputed. In progress as the low-frequency trading stack.",
            },
        ],
    },
    {
        id: "systems",
        index: "B",
        title: "Systems & Data",
        summary: "The engineering that makes the analysis trustworthy.",
        items: [
            {
                name: "Quant Core Engineering",
                detail:
                    "A C++17 core bound into Python through ctypes, taking efficient frontier computation from 57 seconds to 150 milliseconds. The optimiser is FISTA with exact projections for max-Sharpe and min-variance, validated against SciPy SLSQP so the speedup is not bought with wrong answers.",
            },
            {
                name: "Data Pipeline Architecture",
                detail:
                    "A Parquet lake behind nine quality gates, with point-in-time corporate action adjustment and idempotent ingest. Those gates caught a Yahoo Finance split-adjustment bug that had silently corrupted every downstream statistic, which is the entire argument for having them.",
            },
            {
                name: "Testing & Release",
                detail:
                    "102 tests running across three operating systems on GitHub Actions, plus Docker deployment. Catching failures before they reach anyone is the same discipline as operations risk under a different name.",
            },
            {
                name: "Concurrency & Streaming",
                detail:
                    "Producer-consumer threading over a lock-free queue, fault-tolerant socket ingestion with exponential backoff, and a rate-limited REST layer in front of it. Throughput matters less than not losing a message.",
            },
            {
                name: "Full-stack Delivery",
                detail:
                    "React, Redux, Node, Express and MongoDB. At Exly I shipped modular production components on a creator platform reaching 67% of active users across 10,000+ customers, cut unnecessary re-renders through debouncing and lazy loading, and helped stabilise the release pipeline.",
            },
        ],
    },
];

/**
 * The self-directed finance curriculum. Rendered as an appendix under the
 * practice tracks so the claim to a markets background is specific rather than
 * asserted. "Applied" means there is a shipped project behind it.
 */
export const CURRICULUM = {
    label: "Curriculum",
    note: "Self-directed, alongside the degree.",
    items: [
        {
            name: "Portfolio Theory & CAPM",
            detail: "Efficient frontier, security market line, beta",
            status: "Applied",
        },
        {
            name: "Mean-Variance Optimisation",
            detail: "Max-Sharpe, min-variance, shrinkage covariance",
            status: "Applied",
        },
        {
            name: "Financial Statement Analysis",
            detail: "3-statement models, DuPont, liquidity, solvency",
            status: "Applied",
        },
        {
            name: "Market Microstructure & Execution",
            detail: "Order flow, rolling metrics, position and P&L state",
            status: "In progress",
        },
        {
            name: "Intrinsic Valuation",
            detail: "FCFF DCF, WACC, Gordon Growth, sensitivity",
            status: "Studied",
        },
    ],
};

/**
 * Work that is committed to but not yet published through the admin panel.
 * Anything added to the database with a matching name supersedes the entry
 * here, so this list shrinks on its own as projects ship.
 */
export const ROADMAP = [
    // Empty by design. Unshipped work currently comes from the database, where
    // anything flagged building or planned lands in the pipeline section.
    // Add an entry here only to announce work that has no record yet; it
    // disappears on its own once a project of the same name is published.
];

export const EXPERIENCE = [
    {
        org: "Exly",
        badge: "YC-19",
        /** Served from /public so it needs no bundler import. */
        logo: "/logos/exly.svg",
        role: "Software Engineer Intern, Frontend",
        period: "Jan 2026 to Apr 2026",
        location: "Mumbai, remote",
        points: [
            "Developed and optimised React interfaces for the creator platform, directly impacting 67% of active users and scaling support to 10,000+ customers.",
            "Engineered modular, production-ready components alongside design and backend, improving maintainability and accelerating delivery.",
            "Owned features end to end through agile sprints, partnered with QA to resolve critical failing tests, and improved performance through debouncing and lazy loading on high-traffic components.",
        ],
    },
];

/** Kept separate from EXPERIENCE so each renders under its own heading. */
export const EDUCATION = [
    {
        org: "Maharaja Agrasen Institute of Technology",
        badge: "MAIT",
        logo: "",
        role: "B.Tech, Information Technology & Engineering",
        period: "2023 to 2027",
        location: "CGPA 9.2 / 10",
        points: [
            "Shortlisted for the Barclays Hong Kong Electronic Trading Associate summer internship, 2026.",
            "250+ LeetCode problems solved in Java, plus 100+ SQL problems on HackerRank.",
        ],
    },
];

export const CONTACT = {
    heading: ["Let's talk about", "what you're building."],
    lede:
        "Open to engineering roles where performance and correctness actually matter, in markets or anywhere else. Also happy to talk about a system you think is wrong.",
    availability: "Currently taking conversations for 2026 and 2027.",
};

/**
 * Shown on the cold-start screen. Long enough to be worth reading, short enough
 * to finish before the next one rotates in.
 */
export const BOOT_FACTS = [
    "Quantfolio runs a C++17 quant core behind Python, taking efficient frontier computation from 57 seconds to 150 milliseconds.",
    "Shortlisted for the Barclays Hong Kong Electronic Trading Associate summer internship, 2026.",
    "FinSight OS builds linked three-statement models from live filings, with DuPont decomposition and 15+ ratios.",
    "Nine data quality gates caught a Yahoo Finance split-adjustment bug that had corrupted every downstream statistic.",
    "A low-frequency trading stack in progress: Binance WebSocket ingestion, a lock-free queue and stateful P&L tracking.",
    "102 tests across three operating systems, running on GitHub Actions.",
    "At Exly, React interfaces reaching 67% of active users across 10,000+ customers.",
    "Risk decomposition in practice: Sharpe, Sortino, VaR, CVaR, maximum drawdown and Euler contributions.",
    "B.Tech IT & Engineering, CGPA 9.2. 250+ LeetCode problems solved, and counting through NeetCode 150.",
    "Ledoit-Wolf shrinkage, because a sample covariance matrix on sixty names is mostly noise.",
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
    colophon: "Inter Tight, Instrument Serif, JetBrains Mono",
};
