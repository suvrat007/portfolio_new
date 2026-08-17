/**
 * Transport configuration. In production `/api` is rewritten to the Render
 * service by vercel.json; in development the same path is proxied by Vite.
 * Keeping one relative base means no component ever branches on environment.
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

export const ENDPOINTS = {
    health: "/health",
    content: "/content",
    projects: (collection) => `/projects/${collection}`,
    project: (collection, id) => `/projects/${collection}/${id}`,
    stack: "/stack",
    stackCategory: (category) => `/stack/${encodeURIComponent(category)}`,
    stackTechs: (category) => `/stack/${encodeURIComponent(category)}/techs`,
    stackTech: (category, tech) =>
        `/stack/${encodeURIComponent(category)}/techs/${encodeURIComponent(tech)}`,
    login: "/auth/login",
};

/** Project collections, mirrored from the API's COLLECTION constant. */
export const COLLECTIONS = {
    FEATURED: "featured",
    FULLSTACK: "fullstack",
    REACT: "react",
    JS: "js",
};

export const COLLECTION_LABELS = {
    [COLLECTIONS.FEATURED]: "Selected",
    [COLLECTIONS.FULLSTACK]: "Full-stack Systems",
    [COLLECTIONS.REACT]: "Interfaces",
    [COLLECTIONS.JS]: "Experiments",
};

export const DOMAINS = {
    FINANCE: "finance",
    DATA: "data",
    ENGINEERING: "engineering",
    RESEARCH: "research",
};

export const DOMAIN_LABELS = {
    [DOMAINS.FINANCE]: "Finance",
    [DOMAINS.DATA]: "Data",
    [DOMAINS.ENGINEERING]: "Engineering",
    [DOMAINS.RESEARCH]: "Research",
};

export const PROJECT_STATUS = {
    LIVE: "live",
    BUILDING: "building",
    PLANNED: "planned",
    ARCHIVED: "archived",
};

export const STATUS_LABELS = {
    [PROJECT_STATUS.LIVE]: "Live",
    [PROJECT_STATUS.BUILDING]: "In development",
    [PROJECT_STATUS.PLANNED]: "Planned",
    [PROJECT_STATUS.ARCHIVED]: "Archived",
};

export const TIMING = {
    /** Generous: a sleeping Render instance takes 30-50s to answer its first request. */
    REQUEST_TIMEOUT_MS: 45_000,
    /** Fire-and-forget wake-up ping issued before React mounts. */
    WARMUP_TIMEOUT_MS: 60_000,
    /** How long a network payload is trusted before a background refetch. */
    REVALIDATE_AFTER_MS: 5 * 60 * 1000,
    RETRY_ATTEMPTS: 2,
    RETRY_BACKOFF_MS: 2_000,
};
