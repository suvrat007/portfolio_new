import { useEffect, useState } from "react";
import { useMotionValueEvent, useScroll, useSpring } from "framer-motion";

/** Smoothed 0→1 page scroll, for the progress rule under the header. */
export const useScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    return useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 });
};

/**
 * True once the page has moved off the top. The header stays fixed at all
 * times and uses this only to decide when to sit on a background and a rule,
 * so that it separates from the content scrolling underneath it.
 */
export const useIsScrolled = (threshold = 48) => {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (current) => {
        setIsScrolled((last) => {
            const next = current > threshold;
            return last === next ? last : next;
        });
    });

    return isScrolled;
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
