import { useEffect, useState } from "react";
import { useMotionValueEvent, useScroll, useSpring } from "framer-motion";

/** Smoothed 0→1 page scroll, for the progress rule under the header. */
export const useScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    return useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 });
};

/**
 * Tracks scroll direction and whether the page has moved off the top — used to
 * collapse the header on the way down and restore it on the way up.
 */
export const useScrollDirection = (threshold = 12) => {
    const { scrollY } = useScroll();
    const [state, setState] = useState({ direction: "up", isScrolled: false });

    useMotionValueEvent(scrollY, "change", (current) => {
        const previous = scrollY.getPrevious() ?? 0;
        const delta = current - previous;

        setState((last) => {
            const isScrolled = current > threshold * 4;
            if (Math.abs(delta) < threshold) {
                return last.isScrolled === isScrolled ? last : { ...last, isScrolled };
            }
            const direction = delta > 0 ? "down" : "up";
            if (last.direction === direction && last.isScrolled === isScrolled) return last;
            return { direction, isScrolled };
        });
    });

    return state;
};

/**
 * Reports which section id is currently in view. Uses IntersectionObserver
 * rather than scroll maths so it stays cheap on long pages.
 */
export const useActiveSection = (sectionIds) => {
    const [activeId, setActiveId] = useState(sectionIds[0] ?? null);

    useEffect(() => {
        if (typeof IntersectionObserver === "undefined") return undefined;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible) setActiveId(visible.target.id);
            },
            { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
        );

        sectionIds
            .map((id) => document.getElementById(id))
            .filter(Boolean)
            .forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, [sectionIds]);

    return activeId;
};
