import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback } from "react";

import { MOTION_CONFIG } from "../../constants/motion";
import { useHasFinePointer, usePrefersReducedMotion } from "../../hooks/useMediaQuery";

const PREVIEW_WIDTH = 300;
const PREVIEW_HEIGHT = 200;
const CURSOR_OFFSET = 24;

/**
 * A project thumbnail that follows the cursor while a row is hovered.
 *
 * Lives once at the list level rather than per row, so only one image is ever
 * mounted and the spring stays continuous as the cursor moves between rows.
 * Inert on touch devices and under reduced-motion.
 */
export const useHoverPreview = () => {
    const finePointer = useHasFinePointer();
    const reduceMotion = usePrefersReducedMotion();
    const enabled = finePointer && !reduceMotion;

    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const config = {
        stiffness: MOTION_CONFIG.cursorStiffness,
        damping: MOTION_CONFIG.cursorDamping,
        mass: 0.5,
    };

    const track = useCallback(
        (event) => {
            if (!enabled) return;
            rawX.set(event.clientX + CURSOR_OFFSET);
            rawY.set(event.clientY - PREVIEW_HEIGHT / 2);
        },
        [enabled, rawX, rawY],
    );

    return {
        enabled,
        track,
        x: useSpring(rawX, config),
        y: useSpring(rawY, config),
    };
};

export const HoverPreview = ({ image, name, x, y }) => (
    <AnimatePresence>
        {image ? (
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[120] hidden overflow-hidden bg-sunken md:block"
                style={{ x, y, width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT }}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                aria-hidden="true"
            >
                <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover grayscale"
                    loading="lazy"
                />
                <span className="u-label absolute bottom-3 left-3 text-paper mix-blend-difference">
                    {name}
                </span>
            </motion.div>
        ) : null}
    </AnimatePresence>
);

export default HoverPreview;
