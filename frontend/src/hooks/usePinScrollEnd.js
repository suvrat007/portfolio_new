import { useEffect, useRef } from "react";

/**
 * Pins a horizontal scroller to its right edge until the visitor moves it.
 *
 * The contribution graph runs oldest to newest, but a scroll container opens
 * at its left edge, so the default view is a year-old activity. The content
 * arrives asynchronously and in several passes, hence the MutationObserver:
 * a single effect on mount would fire before the graph has any width.
 *
 * Once the visitor scrolls, drags or wheels the element, it stops re-pinning
 * so their position is never yanked away.
 *
 * @returns {import('react').RefObject<HTMLElement>} ref for the scroller
 */
export const usePinScrollEnd = () => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return undefined;

        let released = false;

        const pin = () => {
            if (released) return;
            element.scrollLeft = element.scrollWidth;
        };

        const release = () => {
            released = true;
        };

        pin();

        const observer = new MutationObserver(pin);
        observer.observe(element, { childList: true, subtree: true });

        const events = ["pointerdown", "wheel", "touchstart", "keydown"];
        events.forEach((name) =>
            element.addEventListener(name, release, { passive: true }),
        );

        return () => {
            observer.disconnect();
            events.forEach((name) => element.removeEventListener(name, release));
        };
    }, []);

    return ref;
};
