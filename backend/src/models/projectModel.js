const mongoose = require("mongoose");

const { DOMAIN, PROJECT_STATUS, COLLECTION } = require("../constants");

/**
 * Every project collection shares one shape. Only `name` and `description` are
 * required so that non-visual work (an Excel valuation model, a research note)
 * can be published from the admin panel without a screenshot or a repo.
 */
const projectFields = {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, default: "", trim: true },
    github: { type: String, default: "", trim: true },
    liveUrl: { type: String, default: "", trim: true },
    /** Drives which track the project renders under on the site. */
    domain: {
        type: String,
        enum: Object.values(DOMAIN),
        default: DOMAIN.ENGINEERING,
        index: true,
    },
    status: {
        type: String,
        enum: Object.values(PROJECT_STATUS),
        default: PROJECT_STATUS.LIVE,
    },
    /** Free-form stack/technique labels, e.g. ["Python", "Black-Scholes"]. */
    tags: { type: [String], default: [] },
    /** Human readable, e.g. "Jun 2025 to Aug 2025". */
    timeline: { type: String, default: "", trim: true },
    /** Bullet points surfaced on the project detail row. */
    highlights: { type: [String], default: [] },
    /** Lower sorts first; ties fall back to newest. */
    order: { type: Number, default: 0 },
};

const createProjectSchema = () =>
    new mongoose.Schema(projectFields, {
        timestamps: true,
        toJSON: { virtuals: true },
    });

/**
 * Model names are preserved verbatim from the original implementation so the
 * underlying MongoDB collections keep resolving to the existing documents.
 */
const projectModels = {
    [COLLECTION.FEATURED]: mongoose.model("TopFourSchema", createProjectSchema()),
    [COLLECTION.FULLSTACK]: mongoose.model("FullStackSchema", createProjectSchema()),
    [COLLECTION.REACT]: mongoose.model("ReactJSSchema", createProjectSchema()),
    [COLLECTION.JS]: mongoose.model("JSProjectsSchema", createProjectSchema()),
};

const getProjectModel = (collection) => projectModels[collection] ?? null;

module.exports = { projectModels, getProjectModel };
