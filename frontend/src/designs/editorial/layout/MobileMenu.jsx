import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

import { DURATION, EASE, STAGGER } from "../../../constants/motion";
import { NAV_LINKS, ROUTES, SECTIONS, SITE, SOCIAL_LINKS } from "../../../constants/site";
import { useAuth } from "../../../hooks/useAuth";
import { useClock } from "../../../hooks/useClock";
import { useLockBodyScroll } from "../../../hooks/useLockBodyScroll";
import { useTheme } from "../../../app/ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";

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

/**
 * Full-screen navigation for phones.
 *
 * It carries the utilities the header drops at this width (theme, clock,
 * sign-out) as well as the in-page contact anchor, so nothing is unreachable
 * on a small screen.
 */
export const MobileMenu = ({ isOpen, onClose }) => {
    useLockBodyScroll(isOpen);
    const theme = useTheme();
    const time = useClock();
    const { isAuthenticated, signOut } = useAuth();

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
                    <div className="u-container flex flex-1 flex-col justify-between overflow-y-auto py-8">
                        {/* Clears the fixed header. */}
                        <div className="h-10 shrink-0" aria-hidden="true" />

                        <motion.nav
                            className="flex flex-col gap-2 py-8"
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
                                            className="u-headline flex items-baseline gap-4 py-1"
                                        >
                                            <span className="u-label u-numeric text-faint">
                                                {link.index}
                                            </span>
                                            {link.label}
                                        </Link>
                                    </motion.span>
                                </span>
                            ))}

                            <span className="u-mask">
                                <motion.span className="block" variants={item}>
                                    <Link
                                        to={`${ROUTES.home}#${SECTIONS.contact.id}`}
                                        onClick={onClose}
                                        className="u-headline flex items-baseline gap-4 py-1"
                                    >
                                        <span className="u-label u-numeric text-faint">
                                            {SECTIONS.contact.index}
                                        </span>
                                        Contact
                                    </Link>
                                </motion.span>
                            </span>
                        </motion.nav>

                        <motion.div
                            className="flex shrink-0 flex-col gap-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: DURATION.base }}
                        >
                            <div className="u-hairline" />

                            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                {SOCIAL_LINKS.map((social) => (
                                    <a
                                        key={social.id}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="u-tap u-label py-2 text-muted"
                                    >
                                        {social.label} ↗
                                    </a>
                                ))}
                            </div>

                            <div className="u-hairline" />

                            <div className="flex items-center justify-between gap-4 pb-2">
                                <div className="flex flex-col gap-1.5">
                                    <span className="u-label text-faint">{SITE.location}</span>
                                    <span className="u-label u-numeric text-faint">
                                        IST {time}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4">
                                    {isAuthenticated ? (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                signOut();
                                                onClose();
                                            }}
                                            className="u-tap u-label px-1 text-muted"
                                        >
                                            Sign out
                                        </button>
                                    ) : null}

                                    <ThemeToggle
                                        isDark={theme.isDark}
                                        onToggle={theme.toggleTheme}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
};

export default MobileMenu;
