import { useState } from "react";

import { EDUCATION, EXPERIENCE } from "../../../constants/content";
import { cn } from "../../../lib/cn";
import { AppearGroup, AppearItem } from "../components/Appear";
import { Section } from "../components/Section";

/** Organisation mark: the real logo when there is one, initials otherwise. */
const OrgMark = ({ entry }) =>
    entry.logo ? (
        <img
            src={entry.logo}
            alt={entry.org}
            width={40}
            height={40}
            loading="lazy"
            className="pl-tile object-cover p-0"
            onError={(event) => {
                event.currentTarget.style.display = "none";
            }}
        />
    ) : (
        <span className="pl-tile text-[0.625rem]">{entry.badge}</span>
    );

/** One role or qualification, with its detail shown and collapsible. */
const Entry = ({ entry }) => {
    // Open by default: the detail is the point, and collapsing it by default
    // just adds a click between the visitor and the content.
    const [isOpen, setIsOpen] = useState(true);

    return (
        <AppearItem className="py-4">
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-3 text-left"
            >
                <span className="shrink-0">
                    <OrgMark entry={entry} />
                </span>

                {/*
                  * min-w-0 is what lets the truncation actually happen: a flex
                  * child defaults to min-width:auto and refuses to shrink below
                  * its content, which is what pushed the dates off screen.
                  */}
                <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.9375rem] font-semibold text-ink">
                        {entry.org}
                    </span>
                    <span className="pl-muted block truncate text-sm">{entry.role}</span>
                </span>

                <span className="shrink-0 text-right">
                    <span className="pl-faint block whitespace-nowrap text-xs">
                        {entry.period}
                    </span>
                    <span className="pl-faint block whitespace-nowrap text-xs">
                        {entry.location}
                    </span>
                </span>

                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cn(
                        "pl-faint shrink-0 transition-transform duration-300",
                        isOpen && "rotate-180",
                    )}
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>

            {isOpen ? (
                <ul className="mt-3 flex flex-col gap-2 sm:pl-[3.25rem]">
                    {entry.points.map((point) => (
                        <li key={point} className="pl-muted text-sm leading-relaxed">
                            {point}
                        </li>
                    ))}
                </ul>
            ) : null}
        </AppearItem>
    );
};

const EntryList = ({ entries }) => (
    <AppearGroup className="divide-y divide-line">
        {entries.map((entry) => (
            <Entry key={entry.org} entry={entry} />
        ))}
    </AppearGroup>
);

export const Experience = () => (
    <Section id="experience" title="Experience">
        <EntryList entries={EXPERIENCE} />
    </Section>
);

/** Education gets its own heading rather than sharing the experience list. */
export const Education = () => (
    <Section id="education" title="Education">
        <EntryList entries={EDUCATION} />
    </Section>
);

export default Experience;
