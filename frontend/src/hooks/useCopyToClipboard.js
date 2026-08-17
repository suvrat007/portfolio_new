import { useCallback, useEffect, useRef, useState } from "react";

const RESET_MS = 2_000;

/** Copies text and reports a short-lived "copied" flag for UI feedback. */
export const useCopyToClipboard = () => {
    const [copied, setCopied] = useState(false);
    const timer = useRef(null);

    useEffect(() => () => clearTimeout(timer.current), []);

    const copy = useCallback(async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            clearTimeout(timer.current);
            timer.current = setTimeout(() => setCopied(false), RESET_MS);
            return true;
        } catch {
            return false;
        }
    }, []);

    return { copy, copied };
};
