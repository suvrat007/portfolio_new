import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

import { DURATION } from "../../constants/motion";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";
import { cn } from "../../lib/cn";

const easeOut = (t) => 1 - (1 - t) ** 3;

/**
 * Counts a numeric value up when it scrolls into view. Non-numeric values
 * (e.g. "10k+") render as-is, so the stat row can mix both.
 */
export const Counter = ({ value, className, durationS = DURATION.reveal }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.6 });
    const reduceMotion = usePrefersReducedMotion();

    const target = Number.parseFloat(value);
    const decimals = String(value).includes(".") ? String(value).split(".")[1].length : 0;
    const isNumeric = Number.isFinite(target) && String(value).match(/^[\d.]+$/);

    const [display, setDisplay] = useState(() =>
        isNumeric ? (0).toFixed(decimals) : value,
    );

    useEffect(() => {
        if (!isNumeric) return undefined;
        if (reduceMotion) {
            setDisplay(target.toFixed(decimals));
            return undefined;
        }
        if (!isInView) return undefined;

        let frame;
        const start = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - start) / (durationS * 1000), 1);
            setDisplay((target * easeOut(progress)).toFixed(decimals));
            if (progress < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [isInView, isNumeric, target, decimals, durationS, reduceMotion]);

    return (
        <span ref={ref} className={cn("u-numeric", className)}>
            {isNumeric ? display : value}
        </span>
    );
};

export default Counter;
