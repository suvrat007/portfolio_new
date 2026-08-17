/**
 * Cold-start screen timing.
 *
 * The site ships with a build-time snapshot, so in practice the screen exits at
 * MIN_DURATION_MS. MAX_DURATION_MS only matters on a genuinely cold visit with
 * no snapshot and no cache — it guarantees the visitor is never held longer
 * than the API's realistic worst case.
 */
export const BOOT_TIMING = {
    /** Long enough for the intro to read as intentional, short enough not to annoy. */
    MIN_DURATION_MS: 1_900,
    /** Hard ceiling. After this the site renders with whatever data it has. */
    MAX_DURATION_MS: 30_000,
    /** Returning visitors get a much shorter beat. */
    RETURNING_DURATION_MS: 650,
    /** How long each fact stays on screen. */
    FACT_INTERVAL_MS: 3_400,
    /** Progress creeps toward this while waiting, then completes on data arrival. */
    PROGRESS_CEILING: 0.92,
    PROGRESS_TICK_MS: 90,
    /** Fade-out length, mirrored in the exit transition. */
    EXIT_DURATION_MS: 700,
};
