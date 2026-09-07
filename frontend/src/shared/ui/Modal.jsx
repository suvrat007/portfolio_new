import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

import { DURATION, EASE } from "../../constants/motion";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { cn } from "../../lib/cn";

/** Dialog used by the admin panel. Escape closes; scroll is locked while open. */
export const Modal = ({ isOpen, onClose, title, children, className }) => {
    useLockBodyScroll(isOpen);

    useEffect(() => {
        if (!isOpen) return undefined;
        const onKeyDown = (event) => {
            if (event.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isOpen, onClose]);

    if (typeof document === "undefined") return null;

    return createPortal(
        <AnimatePresence>
            {isOpen ? (
                <div className="fixed inset-0 z-[200] flex items-end justify-center p-0 sm:items-center sm:p-6">
                    <motion.button
                        type="button"
                        aria-label="Close dialog"
                        className="absolute inset-0 bg-ink/25 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: DURATION.fast }}
                        onClick={onClose}
                    />

                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label={title}
                        className={cn(
                            "relative z-10 max-h-[90dvh] w-full overflow-y-auto border border-line",
                            "bg-paper p-6 sm:max-w-2xl sm:rounded-sm sm:p-10",
                            className,
                        )}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        transition={{ duration: DURATION.base, ease: EASE.out }}
                    >
                        <div className="mb-8 flex items-start justify-between gap-6">
                            <h2 className="u-title">{title}</h2>
                            <button
                                type="button"
                                onClick={onClose}
                                className="u-label shrink-0 text-faint transition-colors hover:text-ink"
                            >
                                Close
                            </button>
                        </div>
                        {children}
                    </motion.div>
                </div>
            ) : null}
        </AnimatePresence>,
        document.body,
    );
};

export default Modal;
