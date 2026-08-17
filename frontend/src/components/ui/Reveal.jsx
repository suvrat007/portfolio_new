import { motion } from "framer-motion";

import { fadeUp, staggerParent, VIEWPORT } from "../../constants/motion";
import { cn } from "../../lib/cn";

/**
 * Fades and lifts its children into view once. The default variant is shared
 * across the whole site so every section enters with the same weight.
 */
export const Reveal = ({
    as: Tag = "div",
    children,
    className,
    delay = 0,
    variants = fadeUp,
    ...rest
}) => {
    const MotionTag = motion[Tag] ?? motion.div;

    return (
        <MotionTag
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={variants}
            transition={delay ? { delay } : undefined}
            {...rest}
        >
            {children}
        </MotionTag>
    );
};

/** Parent that staggers any `Reveal`/`motion` children using the shared variants. */
export const RevealGroup = ({
    as: Tag = "div",
    children,
    className,
    stagger,
    delay = 0,
    ...rest
}) => {
    const MotionTag = motion[Tag] ?? motion.div;

    return (
        <MotionTag
            className={cn(className)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={staggerParent(stagger, delay)}
            {...rest}
        >
            {children}
        </MotionTag>
    );
};

export default Reveal;
