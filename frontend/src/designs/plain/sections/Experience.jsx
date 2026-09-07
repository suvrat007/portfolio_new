import { useState } from "react";

import { CURRICULUM, EXPERIENCE } from "../../../constants/content";
import { cn } from "../../../lib/cn";
import { Section } from "../components/Section";

/** Collapsible role. Closed by default so the page stays scannable. */
const Entry = ({ entry }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="py-4">
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                aria-expanded={isOpen}
                className="flex w-full items-start gap-3 text-left"
            >
                <span className="pl-tile mt-0.5 text-[0.625rem]">{entry.badge}</span>

                <span className="min-w-0 flex-1">
                    <span className="block text-[0.9375rem] font-semibold text-ink">
                        {entry.org}
                    </span>
                    <span className="pl-muted block text-sm">{entry.role}</span>
                </span>

                <span className="shrink-0 text-right">
                    <span className="pl-faint block text-xs">{entry.period}</span>
                    <span className="pl-faint block text-xs">{entry.location}</span>
                </span>

                <span
                    aria-hidden="true"
                    className={cn(
                        "pl-faint mt-1 shrink-0 transition-transform duration-200",
                        isOpen && "rotate-180",
                    )}
                >
                    ⌄
                </span>
            </button>

            {isOpen ? (
                <ul className="mt-3 flex flex-col gap-2 pl-[3.25rem]">
                    {entry.points.map((point) => (
                        <li key={point} className="pl-muted text-sm leading-relaxed">
                            {point}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};

export const Experience = () => (
    <Section id={SECTION_ID} title="Experience">
        <div className="divide-y divide-line">
            {EXPERIENCE.map((entry) => (
                <Entry key={entry.org} entry={entry} />
            ))}
        </div>
    </Section>
);

const SECTION_ID = "experience";

/** The self-directed finance curriculum, as a plain status table. */
export const Curriculum = () => (
    <Section id="curriculum" title="Curriculum" aside={CURRICULUM.note}>
        <div className="divide-y divide-line">
            {CURRICULUM.items.map((item) => (
                <div
                    key={item.name}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3"
                >
                    <span className="text-sm text-ink">{item.name}</span>
                    <span className="pl-faint flex-1 text-xs sm:px-4">{item.detail}</span>
                    <span className="pl-muted text-xs">{item.status}</span>
                </div>
            ))}
        </div>
    </Section>
);

export default Experience;
