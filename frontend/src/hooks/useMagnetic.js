import { useCallback, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

import { MOTION_CONFIG } from "../constants/motion";
import { useHasFinePointer, usePrefersReducedMotion } from "./useMediaQuery";

/**
 * Pulls an element gently toward the cursor while it is hovered.
 *
 * Returns props to spread onto the element plus the springs to bind to `style`.
 * Disabled entirely for touch input and reduced-motion visitors, in which case
 * the springs stay pinned at zero.
 */
export const useMagnetic = (strength = MOTION_CONFIG.magneticStrength) => {
    const ref = useRef(null);
    const reduceMotion = usePrefersReducedMotion();
    const finePointer = useHasFinePointer();
    const enabled = finePointer && !reduceMotion;

    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const springConfig = { stiffness: 260, damping: 20, mass: 0.6 };
    const x = useSpring(rawX, springConfig);
    const y = useSpring(rawY, springConfig);

    const handleMouseMove = useCallback(
        (event) => {
            if (!enabled || !ref.current) return;

            const bounds = ref.current.getBoundingClientRect();
            const offsetX = event.clientX - (bounds.left + bounds.width / 2);
            const offsetY = event.clientY - (bounds.top + bounds.height / 2);

            rawX.set(offsetX * strength);
            rawY.set(offsetY * strength);
        },
        [enabled, rawX, rawY, strength],
    );

    const handleMouseLeave = useCallback(() => {
        rawX.set(0);
        rawY.set(0);
    }, [rawX, rawY]);

    return {
        ref,
        enabled,
        style: { x, y },
        handlers: enabled
            ? { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave }
            : {},
    };
};
