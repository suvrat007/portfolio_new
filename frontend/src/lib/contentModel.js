import { COLLECTIONS, DOMAINS, PROJECT_STATUS } from "../constants/api";
import { ROADMAP } from "../constants/content";

const EMPTY_PROJECTS = Object.freeze({
    [COLLECTIONS.FEATURED]: [],
    [COLLECTIONS.FULLSTACK]: [],
    [COLLECTIONS.REACT]: [],
    [COLLECTIONS.JS]: [],
});

const asArray = (value) => (Array.isArray(value) ? value : []);

const slugify = (value) =>
    String(value ?? "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

/**
 * Fills in every optional field so components can render a project without
 * defensive checks, regardless of whether it came from the API, the bundled
 * snapshot or the static roadmap.
 */
const normaliseProject = (project, collection) => ({
    id: project._id ?? project.id ?? slugify(project.name),
    slug: slugify(project.name),
    collection,
    name: project.name ?? "Untitled",
    description: project.description ?? "",
    image: project.image ?? "",
    github: project.github ?? "",
    liveUrl: project.liveUrl ?? "",
    domain: project.domain ?? DOMAINS.ENGINEERING,
    status: project.status ?? PROJECT_STATUS.LIVE,
    tags: asArray(project.tags),
    timeline: project.timeline ?? "",
    highlights: asArray(project.highlights),
    order: Number.isFinite(project.order) ? project.order : 0,
    createdAt: project.createdAt ?? null,
    /** Roadmap entries are placeholders until the real project is published. */
    isPlaceholder: Boolean(project.isPlaceholder),
});

const byOrderThenRecency = (a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return String(b.createdAt ?? "").localeCompare(String(a.createdAt ?? ""));
};

/** Reshapes a raw API/snapshot payload into the structure the UI consumes. */
export const normaliseContent = (raw) => {
    const rawProjects = raw?.projects ?? {};

    const projects = Object.keys(EMPTY_PROJECTS).reduce((acc, collection) => {
        acc[collection] = asArray(rawProjects[collection])
            .map((project) => normaliseProject(project, collection))
            .sort(byOrderThenRecency);
        return acc;
    }, {});

    const stack = asArray(raw?.stack)
        .filter((group) => Array.isArray(group?.techs))
        .map((group, index) => ({
            id: group._id ?? group.category ?? String(index),
            category: group.category ?? "Other",
            order: Number.isFinite(group.order) ? group.order : index,
            techs: asArray(group.techs).map((tech, techIndex) => ({
                id: tech._id ?? `${group.category}-${techIndex}`,
                name: tech.name ?? "",
                image: tech.image ?? "",
            })),
        }))
        .sort((a, b) => a.order - b.order);

    return {
        generatedAt: raw?.generatedAt ?? null,
        projects,
        stack,
    };
};

export const EMPTY_CONTENT = normaliseContent(null);

export const isEmptyContent = (content) =>
    !content ||
    (content.stack.length === 0 &&
        Object.values(content.projects).every((list) => list.length === 0));

/* ------------------------------------------------------------------ *
 * Selectors
 * ------------------------------------------------------------------ */

export const selectFeatured = (content, limit = 4) =>
    (content?.projects?.[COLLECTIONS.FEATURED] ?? []).slice(0, limit);

/**
 * Every project across every collection, de-duplicated by name. A project that
 * appears both as featured and in a category collection is listed once.
 */
export const selectAllProjects = (content) => {
    const seen = new Set();
    return Object.values(content?.projects ?? {})
        .flat()
        .filter((project) => {
            if (seen.has(project.slug)) return false;
            seen.add(project.slug);
            return true;
        })
        .sort(byOrderThenRecency);
};

export const selectByDomain = (content, domain) =>
    selectAllProjects(content).filter((project) => project.domain === domain);

const UNSHIPPED = new Set([PROJECT_STATUS.BUILDING, PROJECT_STATUS.PLANNED]);

/**
 * Work that is committed to but not yet shipped: anything in the database
 * flagged building/planned, plus the static roadmap entries that have not been
 * superseded by a real project of the same name.
 */
export const selectRoadmap = (content) => {
    const published = selectAllProjects(content);
    const publishedSlugs = new Set(published.map((project) => project.slug));

    const fromDatabase = published.filter((project) => UNSHIPPED.has(project.status));

    const fromConstants = ROADMAP.filter(
        (entry) => !publishedSlugs.has(slugify(entry.name)),
    ).map((entry) => normaliseProject({ ...entry, isPlaceholder: true }, null));

    return [...fromDatabase, ...fromConstants];
};

/** Shipped work only. The roadmap is presented in its own section. */
export const selectShipped = (content) =>
    selectAllProjects(content).filter((project) => !UNSHIPPED.has(project.status));

export const selectStack = (content) => content?.stack ?? [];
