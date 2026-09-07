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

/**
 * One role or qualification. Collapsed to a single line by default so the page
 * stays scannable; the detail is one click away.
 */
const Entry = ({ entry }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <AppearItem className="py-4">
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                aria-expanded={isOpen}
                className="flex w-full items-start gap-3 text-left"
            >
                <span className="mt-0.5 shrink-0">
                    <OrgMark entry={entry} />
                </span>

                <span className="min-w-0 flex-1">
                    <span className="block text-[0.9375rem] font-semibold text-ink">
                        {entry.org}
                    </span>
                    <span className="pl-muted block text-sm">{entry.role}</span>
                </span>

                <span className="hidden shrink-0 text-right sm:block">
                    <span className="pl-faint block text-xs">{entry.period}</span>
                    <span className="pl-faint block text-xs">{entry.location}</span>
                </span>

                <span
                    aria-hidden="true"
                    className={cn(
                        "pl-faint mt-1 shrink-0 text-xs transition-transform duration-300",
                        isOpen && "rotate-180",
                    )}
                >
                    ▾
                </span>
            </button>

            <div className="pl-faint mt-1 flex gap-3 text-xs sm:hidden">
                <span>{entry.period}</span>
                <span>{entry.location}</span>
            </div>

            {isOpen ? (
                <ul className="mt-3 flex flex-col gap-2 pl-[3.25rem]">
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
