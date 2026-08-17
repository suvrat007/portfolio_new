import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { CURRICULUM, PRACTICE_TRACKS } from "../../constants/content";
import { DURATION, EASE, fadeUp } from "../../constants/motion";
import { SECTIONS } from "../../constants/site";
import { cn } from "../../lib/cn";
import { Reveal, RevealGroup } from "../../components/ui/Reveal";
import { Section } from "../../components/ui/Section";

const pad = (index) => String(index + 1).padStart(2, "0");

/**
 * A single capability. Collapsed it is one line; open it explains itself.
 * Accordions keep the section short without hiding the substance.
 */
const PracticeItem = ({ item, index, isOpen, onToggle }) => (
    <motion.div variants={fadeUp} className="border-b border-line">
        <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            className="group flex w-full items-baseline gap-4 py-4 text-left md:gap-6 md:py-5"
        >
            <span className="u-label u-numeric shrink-0 text-faint">{pad(index)}</span>

            <span
                className={cn(
                    "flex-1 text-base transition-colors duration-500 md:text-lg",
                    isOpen ? "text-ink" : "text-muted group-hover:text-ink",
                )}
            >
                {item.name}
            </span>

            <span
                aria-hidden="true"
                className={cn(
                    "u-label shrink-0 text-faint transition-transform duration-500",
                    "ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isOpen && "rotate-45",
                )}
            >
                +
            </span>
        </button>

        <AnimatePresence initial={false}>
            {isOpen ? (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: DURATION.base, ease: EASE.out }}
                    className="overflow-hidden"
                >
                    <p className="u-pretty max-w-xl pb-5 pl-9 text-sm leading-relaxed text-muted md:pb-6 md:pl-14">
                        {item.detail}
                    </p>
                </motion.div>
            ) : null}
        </AnimatePresence>
    </motion.div>
);

const Track = ({ track }) => {
    // First item opens by default so the section never reads as an empty list.
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <div className="grid gap-8 md:grid-cols-12">
            <Reveal className="md:col-span-4">
                <p className="u-label mb-4 text-faint">Track {track.index}</p>
                <h3 className="u-title u-balance max-w-xs">{track.title}</h3>
                <p className="u-pretty mt-4 max-w-xs text-sm text-muted">{track.summary}</p>
            </Reveal>

            <RevealGroup className="md:col-span-7 md:col-start-6">
                {track.items.map((item, index) => (
                    <PracticeItem
                        key={item.name}
                        item={item}
                        index={index}
                        isOpen={openIndex === index}
                        onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                    />
                ))}
            </RevealGroup>
        </div>
    );
};

/**
 * The finance curriculum, listed plainly. Keeps the markets claim specific:
 * named topics with a completion state, rather than an adjective.
 */
const Curriculum = () => (
    <div className="grid gap-8 md:grid-cols-12">
        <Reveal className="md:col-span-4">
            <p className="u-label mb-4 text-faint">{CURRICULUM.label}</p>
            <p className="u-pretty max-w-xs text-sm text-muted">{CURRICULUM.note}</p>
        </Reveal>

        <RevealGroup className="md:col-span-7 md:col-start-6">
            {CURRICULUM.items.map((item) => (
                <motion.div
                    key={item.name}
                    variants={fadeUp}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-4"
                >
                    <span className="text-sm text-ink">{item.name}</span>
                    <span className="u-label order-3 w-full text-faint sm:order-2 sm:w-auto sm:flex-1 sm:px-6">
                        {item.detail}
                    </span>
                    <span className="u-label order-2 text-muted sm:order-3">
                        {item.status}
                    </span>
                </motion.div>
            ))}
        </RevealGroup>
    </div>
);

export const Practice = () => (
    <Section
        id={SECTIONS.practice.id}
        index={SECTIONS.practice.index}
        label={SECTIONS.practice.label}
        aside="Two disciplines, one job"
    >
        <div className="flex flex-col gap-16 md:gap-20">
            {PRACTICE_TRACKS.map((track) => (
                <Track key={track.id} track={track} />
            ))}
            <Curriculum />
        </div>
    </Section>
);

export default Practice;
