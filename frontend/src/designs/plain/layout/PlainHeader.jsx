import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { useDesign } from "../../../app/DesignProvider";
import { useTheme } from "../../../app/ThemeProvider";
import { NAV_LINKS, ROUTES, SITE } from "../../../constants/site";
import { cn } from "../../../lib/cn";
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from "../../../shared/ui/icons";

const ICON_BUTTON =
    "pl-tap grid size-9 shrink-0 place-items-center rounded-full border border-line " +
    "text-muted transition-colors hover:border-line-strong hover:text-ink";

/**
 * Sticky document header.
 *
 * Below sm the routes collapse behind a menu button. Trying to fit the mark,
 * four destinations, the design switch and the theme switch on one phone row
 * does not work: flex shrinks the boxes but not the text inside them, so the
 * items overlap. A menu removes the constraint instead of fighting it.
 */
export const PlainHeader = () => {
    const { meta, toggleDesign } = useDesign();
    const { isDark, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { pathname } = useLocation();

    // Navigating away should not leave the panel hanging open behind the page.
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    const routes = (
        <>
            {NAV_LINKS.map((link) => (
                <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === ROUTES.home}
                    className={({ isActive }) =>
                        cn(
                            "pl-tap py-1 transition-colors",
                            isActive ? "font-medium text-ink" : "pl-muted hover:text-ink",
                        )
                    }
                >
                    {link.label}
                </NavLink>
            ))}
            <a
                href={SITE.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pl-tap pl-muted py-1 transition-colors hover:text-ink"
            >
                Resume
            </a>
        </>
    );

    return (
        <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
            <div className="pl-container flex h-14 items-center justify-between gap-3">
                <Link to={ROUTES.home} aria-label="Home" className="shrink-0">
                    <span className="pl-tile size-9 text-xs">{SITE.initials}</span>
                </Link>

                {/* Inline routes from sm up; behind the menu button below it. */}
                <nav className="hidden items-center gap-5 text-sm sm:flex">{routes}</nav>

                <div className="flex shrink-0 items-center gap-2">
                    {/*
                     * The reason two design systems exist: the visitor starts
                     * on the plain one and opts in to the designed one here.
                     */}
                    <button
                        type="button"
                        onClick={toggleDesign}
                        className="pl-pill pl-tap hidden whitespace-nowrap px-3.5 text-sm sm:inline-flex"
                    >
                        {meta.switchLabel}
                    </button>

                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
                        className={ICON_BUTTON}
                    >
                        {isDark ? <SunIcon /> : <MoonIcon />}
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsMenuOpen((open) => !open)}
                        aria-expanded={isMenuOpen}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className={cn(ICON_BUTTON, "sm:hidden")}
                    >
                        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
            </div>

            {/* Panel carries the routes and the design switch on small screens. */}
            {isMenuOpen ? (
                <div className="border-t border-line sm:hidden">
                    <nav className="pl-container flex flex-col items-start gap-1 py-3 text-base">
                        {routes}
                        <button
                            type="button"
                            onClick={() => {
                                toggleDesign();
                                setIsMenuOpen(false);
                            }}
                            className="pl-pill pl-tap mt-2 whitespace-nowrap px-3.5 text-sm"
                        >
                            {meta.switchLabel}
                        </button>
                    </nav>
                </div>
            ) : null}
        </header>
    );
};

export default PlainHeader;
