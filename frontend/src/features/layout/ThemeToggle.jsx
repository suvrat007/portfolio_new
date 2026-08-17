import { AnimatePresence, motion } from "framer-motion";

import { DURATION, EASE } from "../../constants/motion";
import { cn } from "../../lib/cn";

/**
 * Light/dark switch. The label itself animates rather than an icon, which keeps
 * the header entirely typographic.
 */
export const ThemeToggle = ({ isDark, onToggle, className }) => (
    <button
        type="button"
        onClick={onToggle}
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
        className={cn(
            // Tall enough to be a comfortable target on touch.
            "u-label relative h-10 w-[4.5rem] overflow-hidden rounded-full border border-line",
            "text-faint transition-colors duration-500 hover:border-line-strong hover:text-ink",
            className,
        )}
    >
        <AnimatePresence mode="wait" initial={false}>
            <motion.span
                key={isDark ? "dark" : "light"}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: DURATION.fast, ease: EASE.out }}
            >
                {isDark ? "Dark" : "Light"}
            </motion.span>
        </AnimatePresence>
    </button>
);

export default ThemeToggle;
