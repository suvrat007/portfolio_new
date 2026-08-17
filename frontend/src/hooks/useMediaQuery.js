import { useEffect, useState } from "react";

/** Subscribes to a CSS media query from JS. */
export const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(() => {
        if (typeof window === "undefined" || !window.matchMedia) return false;
        return window.matchMedia(query).matches;
    });

    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return undefined;

        const list = window.matchMedia(query);
        const onChange = (event) => setMatches(event.matches);

        setMatches(list.matches);
        list.addEventListener("change", onChange);
        return () => list.removeEventListener("change", onChange);
    }, [query]);

    return matches;
};

export const useIsDesktop = () => useMediaQuery("(min-width: 768px)");

/**
 * True when the visitor has asked for reduced motion, or is on a device where
 * hover-driven effects do not apply.
 */
export const usePrefersReducedMotion = () =>
    useMediaQuery("(prefers-reduced-motion: reduce)");

export const useHasFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");
