import { motion } from "framer-motion";

import { CONTACT } from "../../constants/content";
import { fadeUp, STAGGER } from "../../constants/motion";
import { SECTIONS, SITE, SOCIAL_LINKS } from "../../constants/site";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";
import { Arrow, Button } from "../../components/ui/Button";
import { MaskedLines } from "../../components/ui/MaskedLines";
import { Reveal, RevealGroup } from "../../components/ui/Reveal";
import { Section } from "../../components/ui/Section";
import { StatusDot } from "../../components/ui/Tag";

export const Contact = () => {
    const { copy, copied } = useCopyToClipboard();

    return (
        <Section
            id={SECTIONS.contact.id}
            index={SECTIONS.contact.index}
            label={SECTIONS.contact.label}
            aside={SITE.location}
        >
            <MaskedLines
                as="h2"
                lines={CONTACT.heading}
                className="u-display max-w-5xl"
            />

            <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-8">
                <Reveal className="md:col-span-5">
                    <p className="u-lede u-pretty max-w-lg text-ink">{CONTACT.lede}</p>

                    <div className="mt-8 flex items-center gap-3">
                        <StatusDot status="live" />
                        <span className="u-label text-muted">{CONTACT.availability}</span>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <Button as="a" href={`mailto:${SITE.email}`}>
                            Start a conversation
                            <Arrow />
                        </Button>
                        <Button
                            variant="outline"
                            magnetic={false}
                            onClick={() => copy(SITE.email)}
                        >
                            {copied ? "Copied" : "Copy email"}
                        </Button>
                    </div>
                </Reveal>

                {/* Direct links */}
                <RevealGroup
                    className="flex flex-col md:col-span-6 md:col-start-7"
                    stagger={STAGGER.base}
                >
                    {SOCIAL_LINKS.map((social) => (
                        <motion.a
                            key={social.id}
                            variants={fadeUp}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-baseline justify-between gap-6 border-b border-line py-5"
                        >
                            <span className="u-title transition-opacity duration-500 group-hover:opacity-60">
                                {social.label}
                            </span>
                            <span className="u-label flex items-center gap-2 text-faint">
                                {social.handle}
                                <Arrow />
                            </span>
                        </motion.a>
                    ))}

                    <motion.div
                        variants={fadeUp}
                        className="flex items-baseline justify-between gap-6 border-b border-line py-5"
                    >
                        <span className="u-title opacity-60">Phone</span>
                        <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="u-label text-faint">
                            <span className="u-link">{SITE.phone}</span>
                        </a>
                    </motion.div>
                </RevealGroup>
            </div>
        </Section>
    );
};

export default Contact;
