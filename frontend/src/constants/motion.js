/**
 * Shared motion language. Components import variants from here so timing and
 * easing stay consistent across every section.
 */

export const EASE = {
    /** Default: fast out, long settle. Reads as "expensive" rather than bouncy. */
    out: [0.16, 1, 0.3, 1],
    inOut: [0.65, 0, 0.35, 1],
    entrance: [0.22, 1, 0.36, 1],
};

export const DURATION = {
    fast: 0.3,
    base: 0.6,
    slow: 0.9,
    reveal: 1.1,
};

export const STAGGER = {
    tight: 0.04,
    base: 0.07,
    loose: 0.12,
};

/** Fraction of the element that must be visible before it animates in. */
export const VIEWPORT = { once: true, amount: 0.2, margin: "0px 0px -10% 0px" };

export const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: DURATION.base, ease: EASE.out },
    },
};

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE.out } },
};

/** Wraps a group whose children each use `fadeUp`. */
export const staggerParent = (stagger = STAGGER.base, delay = 0) => ({
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/** Per-line mask reveal used by the hero and section headings. */
export const lineReveal = {
    hidden: { y: "110%" },
    visible: {
        y: "0%",
        transition: { duration: DURATION.reveal, ease: EASE.entrance },
    },
};

export const scaleInX = {
    hidden: { scaleX: 0 },
    visible: {
        scaleX: 1,
        transition: { duration: DURATION.slow, ease: EASE.inOut },
    },
};

export const pageTransition = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE.out } },
    exit: { opacity: 0, y: -8, transition: { duration: DURATION.fast, ease: EASE.inOut } },
};

/** Motion tuning that is not a variant. */
export const MOTION_CONFIG = {
    magneticStrength: 0.28,
    magneticRadius: 90,
    marqueeDurationS: 38,
    cursorStiffness: 320,
    cursorDamping: 34,
};
