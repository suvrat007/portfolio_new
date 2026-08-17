/**
 * Every localStorage key the app owns, namespaced and versioned. Bumping a
 * version string invalidates that cache for every visitor at once.
 */
export const STORAGE_KEYS = {
    content: "sm.content.v2",
    contentEtag: "sm.content.etag.v2",
    theme: "sm.theme.v1",
    token: "sm.admin.token.v1",
    /** Set once the intro has played, so returning visitors skip it. */
    visited: "sm.visited.v1",
};

/** Cached content older than this is discarded rather than shown. */
export const CONTENT_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export const THEMES = {
    LIGHT: "light",
    DARK: "dark",
};

export const DEFAULT_THEME = THEMES.LIGHT;
