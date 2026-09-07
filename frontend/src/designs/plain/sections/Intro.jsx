import { PROFILE } from "../../../constants/content";
import { SITE, SOCIAL_LINKS } from "../../../constants/site";
import { useCopyToClipboard } from "../../../hooks/useCopyToClipboard";
import { AppearGroup, AppearItem } from "../components/Appear";
import { Portrait } from "../../../shared/ui/Portrait";
import {
    CheckIcon,
    CopyIcon,
    GitHubIcon,
    LinkedInIcon,
    MailIcon,
} from "../../../shared/ui/icons";

const ICONS = { github: GitHubIcon, linkedin: LinkedInIcon, email: MailIcon };

/** Masthead: who this is, in as few lines as possible. */
export const Intro = () => {
    const { copy, copied } = useCopyToClipboard();

    return (
        <AppearGroup as="section" className="pt-10 pb-8 md:pt-14">
            <AppearItem className="flex items-center gap-4">
                <Portrait
                    width={64}
                    height={64}
                    className="size-16 shrink-0 rounded-xl border border-line object-cover"
                />

                <div>
                    <h1 className="flex flex-wrap items-baseline gap-x-2 text-2xl font-semibold tracking-tight text-ink">
                        {SITE.name}
                        <span className="pl-faint text-sm font-normal">
                            · {SITE.location}
                        </span>
                    </h1>
                    <p className="pl-muted mt-1 text-sm">{SITE.role}</p>
                </div>
            </AppearItem>

            <AppearItem
                as="p"
                className="pl-muted mt-6 max-w-2xl text-[0.9375rem] leading-relaxed"
            >
                {PROFILE.lead} {PROFILE.body[0]}
            </AppearItem>

            <AppearItem className="mt-5 flex items-center gap-2">
                <span className="pl-muted text-sm">{SITE.email}</span>
                <button
                    type="button"
                    onClick={() => copy(SITE.email)}
                    aria-label={copied ? "Email copied" : "Copy email address"}
                    className="pl-tap pl-faint transition-colors hover:text-ink"
                >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                </button>
            </AppearItem>

            <AppearItem className="mt-5 flex items-center gap-4">
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
                            <Icon width={20} height={20} />
                        </a>
                    );
                })}
            </AppearItem>
        </AppearGroup>
    );
};

export default Intro;
