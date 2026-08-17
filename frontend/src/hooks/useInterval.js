import { useEffect, useRef, useState } from "react";

/** setInterval that always calls the latest callback and cleans itself up. */
export const useInterval = (callback, delayMs) => {
    const saved = useRef(callback);

    useEffect(() => {
        saved.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delayMs === null) return undefined;
        const id = setInterval(() => saved.current(), delayMs);
        return () => clearInterval(id);
    }, [delayMs]);
};

/** Cycles an index through `length` on an interval — used by the boot facts. */
export const useRotatingIndex = (length, delayMs, { active = true } = {}) => {
    const [index, setIndex] = useState(0);

    useInterval(
        () => setIndex((current) => (current + 1) % Math.max(length, 1)),
        active && length > 1 ? delayMs : null,
    );

    return index;
};
