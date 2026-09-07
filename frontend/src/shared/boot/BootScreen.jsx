import { AnimatePresence, motion } from "framer-motion";

import { BOOT_TIMING } from "../../constants/boot";
import { BOOT_FACTS } from "../../constants/content";
import { SITE } from "../../constants/site";
import { useRotatingIndex } from "../../hooks/useInterval";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";

/**
 * Cold-start screen.
 *
 * Almost always a brief wordmark: the site ships a bundled snapshot, so this
 * exits after the minimum beat. The extra content only appears when the wait
 * is genuinely long, which is the case it exists for. Showing a fact counter,
 * an elapsed timer and a percentage on a 1.9s intro was noise.
 */
const SHOW_FACT_AFTER_MS = 2_500;

export const BootScreen = ({ progress, statusLabel, elapsedSeconds, isReturningVisitor }) => {
    const reduceMotion = usePrefersReducedMotion();

    // Only a slow start earns the extra copy.
    const isSlow = elapsedSeconds * 1000 > SHOW_FACT_AFTER_MS && !isReturningVisitor;

    const factIndex = useRotatingIndex(BOOT_FACTS.length, BOOT_TIMING.FACT_INTERVAL_MS, {
        active: isSlow,
    });

    return (
        <motion.div
            className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-paper px-6 text-center"
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                transition: { duration: BOOT_TIMING.EXIT_DURATION_MS / 1000 },
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <p className="text-sm font-medium tracking-tight text-ink">{SITE.name}</p>
                <p className="mt-1.5 text-xs text-muted">{SITE.role}</p>
            </motion.div>

            {/* One hairline, filling. No percentage, no timer. */}
            <div
                className="mt-8 h-px w-40 overflow-hidden bg-line"
                role="progressbar"
                aria-valuenow={Math.round(progress * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Loading"
            >
                <motion.div
                    className="h-full origin-left bg-ink"
                    style={{ scaleX: progress }}
                />
            </div>

            {/* Only on a genuinely cold start, to make the wait worth sitting through. */}
            <div className="mt-8 h-16 max-w-sm">
                <AnimatePresence mode="wait">
                    {isSlow ? (
                        <motion.p
                            key={factIndex}
                            className="text-xs leading-relaxed text-faint"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            {BOOT_FACTS[factIndex]}
                        </motion.p>
                    ) : null}
                </AnimatePresence>
            </div>

            <span className="sr-only" role="status">
                {statusLabel}
            </span>
        </motion.div>
    );
};

export default BootScreen;
