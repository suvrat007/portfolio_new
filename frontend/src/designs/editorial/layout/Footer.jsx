import { Link } from "react-router-dom";

import { FOOTER } from "../../../constants/content";
import { NAV_LINKS, ROUTES, SITE, SOCIAL_LINKS } from "../../../constants/site";
import { useContent } from "../../../hooks/useContent";
import { Reveal } from "../components/Reveal";
import { CONTENT_SOURCE } from "../../../store/contentSlice";

const year = new Date().getFullYear();

const SOURCE_NOTE = {
    [CONTENT_SOURCE.NETWORK]: "Live",
    [CONTENT_SOURCE.CACHE]: "Cached",
    [CONTENT_SOURCE.SNAPSHOT]: "Snapshot",
};

export const Footer = () => {
    const { source, isRevalidating } = useContent();

    return (
        <footer className="border-t border-line">
            <div className="u-container py-16 md:py-20">
                <Reveal className="grid gap-12 md:grid-cols-12">
                    {/* Wordmark */}
                    <div className="md:col-span-5">
                        <p className="u-title max-w-xs u-balance">{SITE.name}</p>
                        <p className="u-label mt-4 text-faint">{SITE.role}</p>
                        <p className="u-label mt-2 text-faint">{SITE.location}</p>
                    </div>

                    {/* Navigation */}
                    <nav className="md:col-span-3">
                        <p className="u-label mb-5 text-faint">Pages</p>
                        <ul className="flex flex-col gap-3">
                            {NAV_LINKS.map((link) => (
                                <li key={link.to}>
                                    <Link to={link.to} className="text-sm text-muted">
                                        <span className="u-link">{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link to={ROUTES.admin} className="text-sm text-faint">
                                    <span className="u-link">Admin</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Elsewhere */}
                    <div className="md:col-span-4">
                        <p className="u-label mb-5 text-faint">Elsewhere</p>
                        <ul className="flex flex-col gap-3">
                            {SOCIAL_LINKS.map((social) => (
                                <li key={social.id}>
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-baseline justify-between gap-4 text-sm text-muted"
                                    >
                                        <span className="u-link">{social.label}</span>
                                        <span className="u-label text-faint">
                                            {social.handle}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Reveal>

                <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
                    <p className="u-label text-faint">
                        © {year} {SITE.name}
                    </p>
                    <p className="u-label max-w-md text-faint">{FOOTER.note}</p>
                    <p className="u-label text-faint" title="Where this page's data came from">
                        {isRevalidating ? "Syncing" : (SOURCE_NOTE[source] ?? "Static")}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
