import { AnimatePresence, motion } from "framer-motion";

import { BOOT_TIMING } from "../../constants/boot";
import { BOOT_FACTS } from "../../constants/content";
import { DURATION, EASE } from "../../constants/motion";
import { SITE } from "../../constants/site";
import { useRotatingIndex } from "../../hooks/useInterval";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";

const pad = (value) => String(value).padStart(2, "0");

/**
 * The cold-start screen.
 *
 * It exists because the API sleeps on Render's free tier. The site already
 * paints from a bundled snapshot, so this is usually a brief intro — but on a
 * genuinely cold visit it holds for up to 30s, and it has to be worth reading
 * for that long. Hence: rotating facts about the work, a live elapsed counter,
 * and an honest status line rather than a spinner.
 */
export const BootScreen = ({ progress, statusLabel, elapsedSeconds, isReturningVisitor }) => {
    const reduceMotion = usePrefersReducedMotion();
    const factIndex = useRotatingIndex(BOOT_FACTS.length, BOOT_TIMING.FACT_INTERVAL_MS, {
        active: !isReturningVisitor,
    });

    return (
        <motion.div
            className="fixed inset-0 z-[500] flex flex-col bg-paper text-ink"
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                filter: "blur(6px)",
                transition: {
                    duration: BOOT_TIMING.EXIT_DURATION_MS / 1000,
                    ease: EASE.inOut,
                },
            }}
        >
            {/* A single hairline sweeping down the page — the only ambient motion. */}
            {!reduceMotion ? (
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-line-strong"
                    style={{ animation: "u-scan 6s cubic-bezier(0.65,0,0.35,1) infinite" }}
                />
            ) : null}

            <div className="u-container flex flex-1 flex-col justify-between py-8 md:py-12">
                {/* ── Masthead ─────────────────────────────────────────────── */}
                <motion.header
                    className="flex items-start justify-between gap-6"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: DURATION.base, ease: EASE.out }}
                >
                    <div>
                        <p className="u-label text-ink">{SITE.name}</p>
                        <p className="u-label mt-2 text-faint">{SITE.role}</p>
                    </div>
                    <div className="text-right">
                        <p className="u-label u-numeric text-ink">
                            {elapsedSeconds.toFixed(1)}s
                        </p>
                        <p className="u-label mt-2 text-faint">{SITE.location}</p>
                    </div>
                </motion.header>

                {/* ── Rotating facts ───────────────────────────────────────── */}
                <div className="flex flex-1 items-center py-16">
                    <div className="w-full max-w-4xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={factIndex}
                                initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: reduceMotion ? 0 : -14 }}
                                transition={{ duration: DURATION.base, ease: EASE.out }}
                            >
                                <p className="u-label u-numeric mb-6 text-faint">
                                    {pad(factIndex + 1)} / {pad(BOOT_FACTS.length)}
                                </p>
                                <p className="u-headline u-balance max-w-3xl">
                                    {BOOT_FACTS[factIndex]}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* ── Progress ─────────────────────────────────────────────── */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: DURATION.slow, delay: 0.2 }}
                >
                    <div className="mb-4 flex items-baseline justify-between gap-4">
                        <p className="u-label text-muted">{statusLabel}</p>
                        <p className="u-label u-numeric text-ink">
                            {Math.round(progress * 100)}%
                        </p>
                    </div>

                    <div
                        className="h-px w-full overflow-hidden bg-line"
                        role="progressbar"
                        aria-valuenow={Math.round(progress * 100)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="Loading"
                    >
                        <motion.div
                            className="h-full origin-left bg-ink"
                            style={{ scaleX: progress }}
                            transition={{ duration: 0.3, ease: EASE.out }}
                        />
                    </div>
                </motion.footer>
            </div>
        </motion.div>
    );
};

export default BootScreen;
