import { Link, NavLink } from "react-router-dom";

import { useDesign } from "../../../app/DesignProvider";
import { useTheme } from "../../../app/ThemeProvider";
import { NAV_LINKS, ROUTES, SITE } from "../../../constants/site";
import { cn } from "../../../lib/cn";
import { MoonIcon, SunIcon } from "../../../shared/ui/icons";

/**
 * Sticky document header. Deliberately sparse: identity, routes, the design
 * switch and the theme switch, and nothing else.
 */
export const PlainHeader = () => {
    const { meta, toggleDesign } = useDesign();
    const { isDark, toggleTheme } = useTheme();

    return (
        <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
            <div className="pl-container flex h-14 items-center justify-between gap-3">
                <div className="flex items-center gap-4 md:gap-6">
                    <Link to={ROUTES.home} aria-label="Home">
                        <span className="pl-tile size-9 text-xs">{SITE.initials}</span>
                    </Link>

                    <nav className="flex items-center gap-4 text-sm md:gap-5">
                        {NAV_LINKS.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                end={link.to === ROUTES.home}
                                className={({ isActive }) =>
                                    cn(
                                        "pl-tap transition-colors",
                                        isActive
                                            ? "font-medium text-ink"
                                            : "pl-muted hover:text-ink",
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
                            className="pl-tap pl-muted text-sm transition-colors hover:text-ink"
                        >
                            Resume
                        </a>
                    </nav>
                </div>

                <div className="flex items-center gap-2">
                    {/*
                      * The reason two design systems exist: the visitor starts
                      * on the plain one and opts in to the designed one here.
                      */}
                    <button
                        type="button"
                        onClick={toggleDesign}
                        className="pl-pill pl-tap whitespace-nowrap text-xs md:text-sm"
                    >
                        {meta.switchLabel}
                    </button>

                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
                        className="pl-tap pl-muted grid size-9 place-items-center rounded-full transition-colors hover:text-ink"
                    >
                        {isDark ? <SunIcon /> : <MoonIcon />}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default PlainHeader;
