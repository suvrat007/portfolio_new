import { useEffect, useMemo, useRef, useState } from "react";

import { BOOT_TIMING } from "../constants/boot";
import { BOOT_STATUS } from "../constants/content";
import { STORAGE_KEYS } from "../constants/storage";
import { readString, writeString } from "../lib/storage";
import { CONTENT_SOURCE, CONTENT_STATUS } from "../store/contentSlice";

/**
 * Drives the cold-start screen.
 *
 * Three rules, in order:
 *  1. Never exit before MIN_DURATION_MS — a screen that flashes reads as a bug.
 *  2. Exit as soon as usable data exists past that floor. Because a snapshot is
 *     bundled, that is almost always immediate.
 *  3. Never hold past MAX_DURATION_MS, whatever the API is doing.
 *
 * Returning visitors get RETURNING_DURATION_MS instead of the full intro.
 *
 * @param {{ hasData: boolean, status: string, source: string|null }} content
 */
export const useBootSequence = ({ hasData, status, source }) => {
    const isReturningVisitor = useRef(readString(STORAGE_KEYS.visited) === "1");

    const [isComplete, setIsComplete] = useState(false);
    const [progress, setProgress] = useState(0);
    const [elapsed, setElapsed] = useState(0);

    const startedAt = useRef(performance.now());

    const minDuration = isReturningVisitor.current
        ? BOOT_TIMING.RETURNING_DURATION_MS
        : BOOT_TIMING.MIN_DURATION_MS;

    /* Progress creeps toward a ceiling while waiting, then snaps to 1 on exit. */
    useEffect(() => {
        if (isComplete) return undefined;

        const id = setInterval(() => {
            const ms = performance.now() - startedAt.current;
            setElapsed(ms);

            const floorRatio = Math.min(ms / minDuration, 1);
            const ceilingRatio = Math.min(ms / BOOT_TIMING.MAX_DURATION_MS, 1);
            // Weighted so the bar moves convincingly early, then eases off.
            const value = hasData
                ? floorRatio
                : Math.min(ceilingRatio ** 0.55, BOOT_TIMING.PROGRESS_CEILING);

            setProgress((current) => Math.max(current, value));
        }, BOOT_TIMING.PROGRESS_TICK_MS);

        return () => clearInterval(id);
    }, [isComplete, hasData, minDuration]);

    /* Exit conditions. */
    useEffect(() => {
        if (isComplete) return undefined;

        const remaining = Math.max(0, minDuration - (performance.now() - startedAt.current));
        const settled = hasData || status === CONTENT_STATUS.ERROR;

        const finish = () => {
            setProgress(1);
            setIsComplete(true);
            writeString(STORAGE_KEYS.visited, "1");
        };

        if (settled) {
            const id = setTimeout(finish, remaining);
            return () => clearTimeout(id);
        }

        const hardStop = setTimeout(
            finish,
            Math.max(0, BOOT_TIMING.MAX_DURATION_MS - (performance.now() - startedAt.current)),
        );
        return () => clearTimeout(hardStop);
    }, [hasData, status, isComplete, minDuration]);

    const statusLabel = useMemo(() => {
        if (isComplete) return BOOT_STATUS.ready;
        if (status === CONTENT_STATUS.ERROR) return BOOT_STATUS.error;
        if (elapsed > BOOT_TIMING.MAX_DURATION_MS * 0.75) return BOOT_STATUS.timeout;
        if (hasData && source !== CONTENT_SOURCE.NETWORK) return BOOT_STATUS.hydrating;
        if (status === CONTENT_STATUS.LOADING && elapsed > 2_500) return BOOT_STATUS.warming;
        if (status === CONTENT_STATUS.LOADING) return BOOT_STATUS.fetching;
        return BOOT_STATUS.idle;
    }, [isComplete, status, source, hasData, elapsed]);

    return {
        isComplete,
        progress,
        statusLabel,
        isReturningVisitor: isReturningVisitor.current,
        /** Seconds elapsed, for the ticking counter on the boot screen. */
        elapsedSeconds: elapsed / 1000,
    };
};
