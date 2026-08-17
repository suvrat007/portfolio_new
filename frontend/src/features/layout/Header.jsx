import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import { NAV_LINKS, ROUTES, SECTIONS, SITE } from "../../constants/site";
import { useAuth } from "../../hooks/useAuth";
import { useClock } from "../../hooks/useClock";
import { useIsScrolled, useScrollProgress } from "../../hooks/useScrollProgress";
import { cn } from "../../lib/cn";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

/** Hairline under the header that tracks page scroll. */
const ScrollProgress = () => {
    const progress = useScrollProgress();
    return (
        <motion.div
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-ink"
            style={{ scaleX: progress }}
        />
    );
};

export const Header = ({ theme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { pathname } = useLocation();
    const { isAuthenticated, signOut } = useAuth();
    const time = useClock();
    const isScrolled = useIsScrolled();

    return (
        <>
            {/*
              * Pinned for the whole session. Once the page moves off the top it
              * picks up a translucent background and a rule so it stays legible
              * over whatever scrolls beneath it.
              */}
            <header
                className={cn(
                    "fixed inset-x-0 top-0 z-[160]",
                    "transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isScrolled && !isMenuOpen
                        ? "border-b border-line bg-paper/80 backdrop-blur-xl"
                        : "border-b border-transparent",
                )}
            >
                <div className="u-container flex h-16 items-center justify-between gap-6 md:h-20">
                    {/* Identity */}
                    <Link
                        to={ROUTES.home}
                        className="group flex items-baseline gap-3"
                        aria-label={`${SITE.name}, home`}
                    >
                        <span className="u-label text-ink">{SITE.name}</span>
                        <span className="u-label hidden text-faint sm:inline">
                            {SITE.role}
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden items-center gap-8 md:flex">
                        {NAV_LINKS.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    cn(
                                        "u-label group flex items-baseline gap-2 transition-colors duration-300",
                                        isActive ? "text-ink" : "text-faint hover:text-ink",
                                    )
                                }
                            >
                                <span className="u-numeric opacity-50">{link.index}</span>
                                <span className="u-link">{link.label}</span>
                            </NavLink>
                        ))}

                        {pathname === ROUTES.home ? (
                            <a
                                href={`#${SECTIONS.contact.id}`}
                                className="u-label text-faint transition-colors duration-300 hover:text-ink"
                            >
                                <span className="u-link">Contact</span>
                            </a>
                        ) : null}
                    </nav>

                    {/*
                      * Utilities. On phones only the menu button survives; the
                      * clock, sign-out and theme switch move into the menu
                      * itself, which keeps the bar uncrowded and every target
                      * comfortably tappable.
                      */}
                    <div className="flex items-center gap-4 md:gap-5">
                        <span className="u-label u-numeric hidden text-faint lg:inline">
                            IST {time}
                        </span>

                        {isAuthenticated ? (
                            <button
                                type="button"
                                onClick={signOut}
                                className="u-tap u-label hidden text-faint transition-colors hover:text-ink md:inline-flex"
                            >
                                Sign out
                            </button>
                        ) : null}

                        <ThemeToggle
                            isDark={theme.isDark}
                            onToggle={theme.toggleTheme}
                            className="hidden md:inline-flex"
                        />

                        <button
                            type="button"
                            className="u-tap u-label -mr-2 px-2 text-ink md:hidden"
                            onClick={() => setIsMenuOpen((open) => !open)}
                            aria-expanded={isMenuOpen}
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {isMenuOpen ? "Close" : "Menu"}
                        </button>
                    </div>
                </div>

                <ScrollProgress />
            </header>

            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
};

export default Header;
