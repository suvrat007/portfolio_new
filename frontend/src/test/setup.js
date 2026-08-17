import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

/* jsdom implements neither of these, and the app calls both on mount. */

if (!window.matchMedia) {
    window.matchMedia = (query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
    });
}

if (!window.IntersectionObserver) {
    window.IntersectionObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
        takeRecords() {
            return [];
        }
    };
    global.IntersectionObserver = window.IntersectionObserver;
}

if (!window.ResizeObserver) {
    window.ResizeObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
    };
    global.ResizeObserver = window.ResizeObserver;
}

window.scrollTo = () => {};

afterEach(() => {
    cleanup();
    localStorage.clear();
    vi.restoreAllMocks();
});
