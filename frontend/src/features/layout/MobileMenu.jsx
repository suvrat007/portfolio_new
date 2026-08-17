import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

import { DURATION, EASE, STAGGER } from "../../constants/motion";
import { NAV_LINKS, SOCIAL_LINKS, SITE } from "../../constants/site";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";

const panel = {
    hidden: { clipPath: "inset(0 0 100% 0)" },
    visible: {
        clipPath: "inset(0 0 0% 0)",
        transition: { duration: DURATION.slow, ease: EASE.entrance },
    },
    exit: {
        clipPath: "inset(0 0 100% 0)",
        transition: { duration: DURATION.base, ease: EASE.inOut },
    },
};

const item = {
    hidden: { y: "110%" },
    visible: { y: "0%", transition: { duration: DURATION.slow, ease: EASE.entrance } },
};

/** Full-screen navigation for small viewports. */
export const MobileMenu = ({ isOpen, onClose }) => {
    useLockBodyScroll(isOpen);

    return (
        <AnimatePresence>
            {isOpen ? (
                <motion.div
                    className="fixed inset-0 z-[150] flex flex-col bg-paper md:hidden"
                    variants={panel}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="u-container flex flex-1 flex-col justify-between py-8">
                        <div className="h-8" aria-hidden="true" />

                        <motion.nav
                            className="flex flex-col gap-3"
                            initial="hidden"
                            animate="visible"
                            transition={{ staggerChildren: STAGGER.loose, delayChildren: 0.15 }}
                        >
                            {NAV_LINKS.map((link) => (
                                <span className="u-mask" key={link.to}>
                                    <motion.span className="block" variants={item}>
                                        <Link
                                            to={link.to}
                                            onClick={onClose}
                                            className="u-headline flex items-baseline gap-4"
                                        >
                                            <span className="u-label u-numeric text-faint">
                                                {link.index}
                                            </span>
                                            {link.label}
                                        </Link>
                                    </motion.span>
                                </span>
                            ))}
                        </motion.nav>

                        <motion.div
                            className="flex flex-col gap-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.45, duration: DURATION.base }}
                        >
                            <div className="u-hairline" />
                            <div className="flex flex-wrap gap-x-6 gap-y-3">
                                {SOCIAL_LINKS.map((social) => (
                                    <a
                                        key={social.id}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="u-label text-muted"
                                    >
                                        {social.label} ↗
                                    </a>
                                ))}
                            </div>
                            <p className="u-label text-faint">{SITE.location}</p>
                        </motion.div>
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
};

export default MobileMenu;
