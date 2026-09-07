const crypto = require("node:crypto");

const { CACHE, COLLECTION } = require("../constants");
const { projectModels } = require("../models/projectModel");
const StackCategory = require("../models/stackModel");

/**
 * The public site reads everything through one aggregate payload. Collapsing
 * four round-trips into one is the single biggest win against Render cold
 * starts: the process wakes once, not four times.
 *
 * The result is memoised in process memory and tagged with a content hash, so
 * a warm dyno answers repeat requests without touching MongoDB at all, and
 * browsers that already hold the payload get a 304.
 */
let cachedEntry = null;

const PROJECT_SORT = { order: 1, createdAt: -1 };

const hashPayload = (payload) =>
    `"${crypto.createHash("sha1").update(JSON.stringify(payload)).digest("hex")}"`;

const loadFromDatabase = async () => {
    const [featured, fullstack, react, js, stack] = await Promise.all([
        projectModels[COLLECTION.FEATURED].find().sort(PROJECT_SORT).lean(),
        projectModels[COLLECTION.FULLSTACK].find().sort(PROJECT_SORT).lean(),
        projectModels[COLLECTION.REACT].find().sort(PROJECT_SORT).lean(),
        projectModels[COLLECTION.JS].find().sort(PROJECT_SORT).lean(),
        StackCategory.find().sort({ order: 1, category: 1 }).lean(),
    ]);

    return {
        generatedAt: new Date().toISOString(),
        projects: {
            [COLLECTION.FEATURED]: featured,
            [COLLECTION.FULLSTACK]: fullstack,
            [COLLECTION.REACT]: react,
            [COLLECTION.JS]: js,
        },
        stack: stack.filter((group) => Array.isArray(group.techs)),
    };
};

const isFresh = (entry) => entry && Date.now() - entry.cachedAt < CACHE.CONTENT_TTL_MS;

/**
 * @param {{ force?: boolean }} [options]
 * @returns {Promise<{ payload: object, etag: string, cachedAt: number }>}
 */
const getContent = async ({ force = false } = {}) => {
    if (!force && isFresh(cachedEntry)) return cachedEntry;

    try {
        const payload = await loadFromDatabase();
        cachedEntry = { payload, etag: hashPayload(payload), cachedAt: Date.now() };
    } catch (error) {
        // A stale payload beats a 500 for a read-only public site.
        if (!cachedEntry) throw error;
        console.warn("[content] refresh failed, serving stale payload:", error.message);
    }

    return cachedEntry;
};

/** Called after every mutation so the next read rebuilds the aggregate. */
const invalidateContent = () => {
    cachedEntry = null;
};

module.exports = { getContent, invalidateContent };
