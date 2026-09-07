import { Link } from "react-router-dom";

import { NAV_LINKS, ROUTES, SITE, SOCIAL_LINKS } from "../../../constants/site";
import { GitHubIcon, LinkedInIcon, MailIcon } from "../../../shared/ui/icons";

const ICONS = { github: GitHubIcon, linkedin: LinkedInIcon, email: MailIcon };

export const PlainFooter = () => (
    <footer className="mt-6 border-t border-line">
        <div className="pl-container grid gap-10 py-10 sm:grid-cols-2">
            <div>
                <p className="text-base font-semibold text-ink">{SITE.name}</p>
                <p className="pl-muted mt-1 text-sm">{SITE.role}</p>

                <div className="mt-4 flex items-center gap-4">
                    {SOCIAL_LINKS.filter((social) => ICONS[social.id]).map((social) => {
                        const Icon = ICONS[social.id];
                        return (
                            <a
                                key={social.id}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="pl-tap pl-faint transition-colors hover:text-ink"
                            >
                                <Icon />
                            </a>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm sm:justify-items-end">
                <div>
                    <p className="pl-faint mb-3 text-xs uppercase tracking-widest">Pages</p>
                    <ul className="flex flex-col gap-2">
                        {NAV_LINKS.map((link) => (
                            <li key={link.to}>
                                <Link to={link.to} className="pl-muted hover:text-ink">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link to={ROUTES.admin} className="pl-faint hover:text-ink">
                                Admin
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <p className="pl-faint mb-3 text-xs uppercase tracking-widest">Connect</p>
                    <ul className="flex flex-col gap-2">
                        {SOCIAL_LINKS.map((social) => (
                            <li key={social.id}>
                                <a
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="pl-muted hover:text-ink"
                                >
                                    {social.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

        <div className="pl-container pb-8">
            <p className="pl-faint text-xs">
                © {new Date().getFullYear()} {SITE.name}
            </p>
        </div>
    </footer>
);

export default PlainFooter;
