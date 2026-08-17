import { describe, expect, it } from "vitest";

import { COLLECTIONS, DOMAINS, PROJECT_STATUS } from "../constants/api";
import { ROADMAP } from "../constants/content";
import {
    isEmptyContent,
    normaliseContent,
    selectAllProjects,
    selectFeatured,
    selectRoadmap,
    selectShipped,
} from "./contentModel";
import snapshot from "../data/snapshot.json";

const raw = (overrides = {}) => ({
    projects: { featured: [], fullstack: [], react: [], js: [], ...overrides.projects },
    stack: overrides.stack ?? [],
});

describe("normaliseContent", () => {
    it("fills in every optional field so components need no guards", () => {
        const content = normaliseContent(
            raw({ projects: { featured: [{ _id: "a", name: "Axon", description: "x" }] } }),
        );
        const [project] = content.projects[COLLECTIONS.FEATURED];

        expect(project).toMatchObject({
            id: "a",
            slug: "axon",
            collection: COLLECTIONS.FEATURED,
            image: "",
            liveUrl: "",
            domain: DOMAINS.ENGINEERING,
            status: PROJECT_STATUS.LIVE,
            tags: [],
            highlights: [],
            order: 0,
        });
    });

    it("survives null, undefined and malformed payloads", () => {
        for (const input of [null, undefined, {}, { projects: "nope", stack: 7 }]) {
            const content = normaliseContent(input);
            expect(Object.keys(content.projects)).toHaveLength(4);
            expect(content.stack).toEqual([]);
            expect(isEmptyContent(content)).toBe(true);
        }
    });

    it("drops stack groups whose techs are not an array", () => {
        const content = normaliseContent(
            raw({ stack: [{ category: "Good", techs: [] }, { category: "Bad" }] }),
        );
        expect(content.stack.map((group) => group.category)).toEqual(["Good"]);
    });

    it("sorts by order, then by recency", () => {
        const content = normaliseContent(
            raw({
                projects: {
                    featured: [
                        { _id: "1", name: "C", description: "", order: 2 },
                        { _id: "2", name: "A", description: "", order: 0, createdAt: "2025-01-01" },
                        { _id: "3", name: "B", description: "", order: 0, createdAt: "2026-01-01" },
                    ],
                },
            }),
        );
        expect(selectFeatured(content).map((p) => p.name)).toEqual(["B", "A", "C"]);
    });
});

describe("selectors", () => {
    const content = normaliseContent(
        raw({
            projects: {
                featured: [{ _id: "1", name: "Axon", description: "" }],
                // Same project, also present in a category collection.
                fullstack: [
                    { _id: "2", name: "Axon", description: "" },
                    {
                        _id: "3",
                        name: "Pricer",
                        description: "",
                        status: PROJECT_STATUS.BUILDING,
                        domain: DOMAINS.FINANCE,
                    },
                ],
            },
        }),
    );

    it("de-duplicates a project that appears in two collections", () => {
        expect(selectAllProjects(content).filter((p) => p.name === "Axon")).toHaveLength(1);
    });

    it("keeps unshipped work out of the shipped list", () => {
        expect(selectShipped(content).map((p) => p.name)).toEqual(["Axon"]);
    });

    it("puts database work-in-progress on the roadmap", () => {
        expect(selectRoadmap(content).some((p) => p.name === "Pricer")).toBe(true);
    });

    it("appends roadmap constants that have not been superseded", () => {
        const names = selectRoadmap(content).map((p) => p.name);
        expect(names).toContain(ROADMAP[0].name);
    });

    it("drops a roadmap constant once a project of that name is published", () => {
        const published = normaliseContent(
            raw({
                projects: {
                    featured: [{ _id: "9", name: ROADMAP[0].name, description: "shipped" }],
                },
            }),
        );
        const names = selectRoadmap(published).map((p) => p.name);
        expect(names).not.toContain(ROADMAP[0].name);
    });
});

describe("bundled snapshot", () => {
    it("contains real content, so the first paint is never blank", () => {
        const content = normaliseContent(snapshot);
        expect(isEmptyContent(content)).toBe(false);
        expect(selectFeatured(content).length).toBeGreaterThan(0);
        expect(content.stack.length).toBeGreaterThan(0);
    });

    it("leads the toolkit with the markets track", () => {
        const content = normaliseContent(snapshot);
        expect(content.stack[0].category).toMatch(/markets/i);
    });
});
