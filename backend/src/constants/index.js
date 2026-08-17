/**
 * Single source of truth for every literal the server depends on.
 * Nothing in the codebase below this file should contain a bare string key,
 * status code or duration.
 */

const SERVER = {
    DEFAULT_PORT: 8000,
    JSON_BODY_LIMIT: "1mb",
    SHUTDOWN_GRACE_MS: 10_000,
};

const HTTP = {
    OK: 200,
    CREATED: 201,
    NOT_MODIFIED: 304,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SERVER_ERROR: 500,
};

/** How long a successful aggregate response stays warm in process memory. */
const CACHE = {
    CONTENT_TTL_MS: 5 * 60 * 1000,
    /** Browser/CDN directive: serve instantly, revalidate in the background. */
    PUBLIC_HEADER: "public, max-age=60, stale-while-revalidate=86400",
    PRIVATE_HEADER: "no-store",
};

const TOKEN = {
    EXPIRES_IN: "30d",
    HEADER: "authorization",
    SCHEME: "Bearer",
};

const AUTH = {
    BCRYPT_ROUNDS: 10,
    /** Legacy rows were stored as plaintext; these prefixes mark a real hash. */
    HASH_PREFIXES: ["$2a$", "$2b$", "$2y$"],
};

/** Logical project tracks. `domain` drives which section a project renders in. */
const DOMAIN = {
    FINANCE: "finance",
    DATA: "data",
    ENGINEERING: "engineering",
    RESEARCH: "research",
};

const PROJECT_STATUS = {
    LIVE: "live",
    BUILDING: "building",
    PLANNED: "planned",
    ARCHIVED: "archived",
};

/** Maps a URL segment to its mongoose model key — avoids four near-identical routers. */
const COLLECTION = {
    FEATURED: "featured",
    FULLSTACK: "fullstack",
    REACT: "react",
    JS: "js",
};

const MESSAGES = {
    MISSING_CREDENTIALS: "Email and password are required",
    INVALID_CREDENTIALS: "Invalid credentials",
    USER_EXISTS: "An account with that email already exists",
    LOGIN_OK: "Login successful",
    UNAUTHORIZED: "Authentication required",
    NOT_FOUND: "Resource not found",
    CATEGORY_EXISTS: "Category already exists",
    CATEGORY_MISSING: "Category not found",
    TECH_EXISTS: "Technology already exists in this category",
    TECH_MISSING: "Technology not found in this category",
    SERVER_ERROR: "Something went wrong",
    UNKNOWN_COLLECTION: "Unknown project collection",
};

module.exports = {
    SERVER,
    HTTP,
    CACHE,
    TOKEN,
    AUTH,
    DOMAIN,
    PROJECT_STATUS,
    COLLECTION,
    MESSAGES,
};
