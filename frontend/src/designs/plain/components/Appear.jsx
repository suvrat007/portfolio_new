import { motion } from "framer-motion";

import { usePrefersReducedMotion } from "../../../hooks/useMediaQuery";

/**
 * Entrance animation for the plain design.
 *
 * Deliberately smaller than the editorial system's reveals: a short fade and a
 * few pixels of lift, once, on scroll. The plain design should feel calm, so
 * the motion is there to soften arrival rather than to perform.
 */
const VIEWPORT = { once: true, amount: 0.15, margin: "0px 0px -8% 0px" };

const variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    },
};

export const Appear = ({ as = "div", children, className, delay = 0, ...rest }) => {
    const reduceMotion = usePrefersReducedMotion();
    const Tag = motion[as] ?? motion.div;

    if (reduceMotion) {
        const Plain = as;
        return (
            <Plain className={className} {...rest}>
                {children}
            </Plain>
        );
    }

    return (
        <Tag
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={variants}
            transition={delay ? { delay } : undefined}
            {...rest}
        >
            {children}
        </Tag>
    );
};

/** Parent that staggers `Appear`-style children sharing the same variants. */
export const AppearGroup = ({ as = "div", children, className, stagger = 0.06, ...rest }) => {
    const reduceMotion = usePrefersReducedMotion();
    const Tag = motion[as] ?? motion.div;

    if (reduceMotion) {
        const Plain = as;
        return (
            <Plain className={className} {...rest}>
                {children}
            </Plain>
        );
    }

    return (
        <Tag
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
            {...rest}
        >
            {children}
        </Tag>
    );
};

/** Child of AppearGroup. Inherits the parent's stagger timing. */
export const AppearItem = ({ as = "div", children, className, ...rest }) => {
    const reduceMotion = usePrefersReducedMotion();
    const Tag = motion[as] ?? motion.div;

    if (reduceMotion) {
        const Plain = as;
        return (
            <Plain className={className} {...rest}>
                {children}
            </Plain>
        );
    }

    return (
        <Tag className={className} variants={variants} {...rest}>
            {children}
        </Tag>
    );
};

export default Appear;
