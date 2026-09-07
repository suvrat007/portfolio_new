import { CONTACT } from "../../../constants/content";
import { SECTIONS, SITE, SOCIAL_LINKS } from "../../../constants/site";
import { AppearGroup, AppearItem } from "../components/Appear";
import { Section } from "../components/Section";

const githubHref = SOCIAL_LINKS.find((social) => social.id === "github")?.href;
const linkedinHref = SOCIAL_LINKS.find((social) => social.id === "linkedin")?.href;

export const Contact = () => (
    <Section id={SECTIONS.contact.id} title="Get in Touch">
        <AppearGroup>
        <AppearItem as="p" className="pl-muted max-w-2xl text-[0.9375rem] leading-relaxed">
            {CONTACT.lede}
        </AppearItem>

        <AppearItem as="p" className="pl-muted mt-3 max-w-2xl text-[0.9375rem] leading-relaxed">
            <a href={`mailto:${SITE.email}`} className="pl-link">
                Send me an email
            </a>
            {", "}
            <a
                href={linkedinHref}
                target="_blank"
                rel="noopener noreferrer"
                className="pl-link"
            >
                message me on LinkedIn
            </a>
            {", or "}
            <a
                href={githubHref}
                target="_blank"
                rel="noopener noreferrer"
                className="pl-link"
            >
                read the code
            </a>
            .
        </AppearItem>

        <AppearItem as="p" className="pl-faint mt-4 text-sm">
            {CONTACT.availability}
        </AppearItem>

        <AppearItem className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {SOCIAL_LINKS.map((social) => (
                <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pl-muted hover:text-ink"
                >
                    {social.label}
                </a>
            ))}
        </AppearItem>
        </AppearGroup>
    </Section>
);

export default Contact;
