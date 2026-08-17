import { motion } from "framer-motion";

import { EXPERIENCE, PROFILE, STATS } from "../../constants/content";
import { fadeUp, STAGGER } from "../../constants/motion";
import { SECTIONS } from "../../constants/site";
import { Reveal, RevealGroup } from "../../components/ui/Reveal";
import { Section } from "../../components/ui/Section";

/**
 * Oversized figure with its unit and caption.
 *
 * The value is rendered at its final size rather than counted up. A count-up
 * grows the digit count as it runs ("8" to "192"), which shoves the unit
 * suffix sideways on every frame and reads as a twitch.
 */
const Stat = ({ stat }) => (
    <motion.div variants={fadeUp} className="group border-t border-line pt-5">
        <p className="u-numeric flex items-baseline gap-1.5 text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[0.9] tracking-[-0.05em]">
            {stat.value}
            {stat.unit ? (
                <span className="u-label mb-1 text-faint">{stat.unit}</span>
            ) : null}
        </p>
        <p className="u-label mt-5 text-ink">{stat.label}</p>
        <p className="u-label mt-2 text-faint">{stat.note}</p>
    </motion.div>
);

const ExperienceRow = ({ entry }) => (
    <motion.article
        variants={fadeUp}
        className="u-row grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-8"
    >
        <div className="md:col-span-3">
            <h3 className="u-title flex items-baseline gap-3">
                {entry.org}
                {entry.badge ? (
                    <span className="u-label text-faint">{entry.badge}</span>
                ) : null}
            </h3>
        </div>

        <div className="md:col-span-6">
            <p className="text-sm text-ink">{entry.role}</p>
            <ul className="mt-4 flex flex-col gap-2.5">
                {entry.points.map((point) => (
                    <li key={point} className="u-pretty flex gap-3 text-sm text-muted">
                        <span aria-hidden="true" className="text-faint">·</span>
                        {point}
                    </li>
                ))}
            </ul>
        </div>

        <div className="md:col-span-3 md:text-right">
            <p className="u-label text-ink">{entry.period}</p>
            <p className="u-label mt-2 text-faint">{entry.location}</p>
        </div>
    </motion.article>
);

export const Profile = () => (
    <Section
        id={SECTIONS.profile.id}
        index={SECTIONS.profile.index}
        label={SECTIONS.profile.label}
        aside="Engineering × Markets"
    >
        {/* Statement */}
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            {/*
              * Set at title rather than headline size: this column is 7 of 12,
              * so display-scale type here runs to a dozen lines.
              */}
            <Reveal className="md:col-span-7">
                <p className="u-title u-balance max-w-lg">{PROFILE.lead}</p>
            </Reveal>

            <RevealGroup className="flex flex-col gap-6 md:col-span-4 md:col-start-9 md:pt-3">
                {PROFILE.body.map((paragraph) => (
                    <motion.p
                        key={paragraph.slice(0, 24)}
                        variants={fadeUp}
                        className="u-pretty text-sm leading-relaxed text-muted"
                    >
                        {paragraph}
                    </motion.p>
                ))}
                <motion.p variants={fadeUp} className="u-serif text-xl text-ink">
                    {PROFILE.signature}
                </motion.p>
            </RevealGroup>
        </div>

        {/* Numbers */}
        <RevealGroup
            className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-16 md:grid-cols-4"
            stagger={STAGGER.base}
        >
            {STATS.map((stat) => (
                <Stat key={stat.label} stat={stat} />
            ))}
        </RevealGroup>

        {/* Track record */}
        <div className="mt-14 md:mt-16">
            <Reveal className="u-label mb-8 text-faint">Track record</Reveal>
            <RevealGroup className="border-t border-line">
                {EXPERIENCE.map((entry) => (
                    <ExperienceRow key={entry.org} entry={entry} />
                ))}
            </RevealGroup>
        </div>
    </Section>
);

export default Profile;
