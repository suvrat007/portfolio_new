import { Link, NavLink } from "react-router-dom";

import { useDesign } from "../../../app/DesignProvider";
import { useTheme } from "../../../app/ThemeProvider";
import { NAV_LINKS, ROUTES, SITE } from "../../../constants/site";
import { cn } from "../../../lib/cn";
import { MoonIcon, SunIcon } from "../../../shared/ui/icons";

const linkClass = ({ isActive }) =>
    cn(
        "pl-tap py-1 transition-colors",
        isActive ? "font-medium text-ink" : "pl-muted hover:text-ink",
    );

/**
 * Sticky document header.
 *
 * Six controls do not fit one phone row: at 390px the nav and the actions
 * overlapped. Rather than shrinking text until it collides, the bar wraps. On
 * a phone the mark and the actions share the first row and the nav takes the
 * second; from sm upward it is a single row. Order is set with CSS so the
 * markup is not duplicated between breakpoints.
 */
export const PlainHeader = () => {
    const { meta, toggleDesign } = useDesign();
    const { isDark, toggleTheme } = useTheme();

    return (
        <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
            <div className="pl-container flex flex-wrap items-center gap-x-3 gap-y-1 py-2 sm:h-14 sm:flex-nowrap sm:py-0">
                <Link to={ROUTES.home} aria-label="Home" className="order-1 shrink-0">
                    <span className="pl-tile size-8 text-[0.6875rem] sm:size-9 sm:text-xs">
                        {SITE.initials}
                    </span>
                </Link>

                {/* Right-aligned on both layouts; last in the row from sm up. */}
                <div className="order-2 ml-auto flex shrink-0 items-center gap-2 sm:order-3">
                    {/*
                     * The reason two design systems exist: the visitor starts
                     * on the plain one and opts in to the designed one here.
                     */}
                    <button
                        type="button"
                        onClick={toggleDesign}
                        className="pl-pill pl-tap whitespace-nowrap px-3 text-xs sm:px-3.5 md:text-sm"
                    >
                        <span className="sm:hidden">{meta.shortSwitchLabel}</span>
                        <span className="hidden sm:inline">{meta.switchLabel}</span>
                    </button>

                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
                        className="pl-tap pl-muted grid size-8 shrink-0 place-items-center rounded-full transition-colors hover:text-ink sm:size-9"
                    >
                        {isDark ? <SunIcon /> : <MoonIcon />}
                    </button>
                </div>

                {/* Full width on its own row below sm; inline from sm up. */}
                <nav className="order-3 flex w-full items-center gap-4 overflow-x-auto pb-1 text-[0.8125rem] sm:order-2 sm:ml-3 sm:w-auto sm:gap-5 sm:overflow-visible sm:pb-0 sm:text-sm">
                    {NAV_LINKS.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.to === ROUTES.home}
                            className={linkClass}
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
                </nav>
            </div>
        </header>
    );
};

export default PlainHeader;
