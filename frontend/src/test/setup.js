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

/*
 * A real IntersectionObserver fires when the target is on screen; a no-op mock
 * never does. Everything driven by whileInView then stays at its hidden
 * variant, which is invisible in a browser but perfectly findable in jsdom, so
 * an entirely blank page passes its tests. This mock reports the target as
 * intersecting so that code path is actually exercised.
 */
if (!window.IntersectionObserver) {
    window.IntersectionObserver = class {
        constructor(callback) {
            this.callback = callback;
            this.elements = new Set();
        }

        observe(element) {
            this.elements.add(element);
            this.callback(
                [
                    {
                        target: element,
                        isIntersecting: true,
                        intersectionRatio: 1,
                        boundingClientRect: element.getBoundingClientRect?.() ?? {},
                        intersectionRect: element.getBoundingClientRect?.() ?? {},
                        rootBounds: null,
                        time: 0,
                    },
                ],
                this,
            );
        }

        unobserve(element) {
            this.elements.delete(element);
        }

        disconnect() {
            this.elements.clear();
        }

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
