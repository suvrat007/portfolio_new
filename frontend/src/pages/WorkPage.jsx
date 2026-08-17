import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { DOMAIN_LABELS } from "../constants/api";
import { DURATION, EASE } from "../constants/motion";
import { usePageMeta } from "../hooks/usePageMeta";
import { useContent } from "../hooks/useContent";
import { cn } from "../lib/cn";
import { MaskedLines } from "../components/ui/MaskedLines";
import { Reveal } from "../components/ui/Reveal";
import { Rule } from "../components/ui/Section";
import { AdminRowActions } from "../features/admin/AdminRowActions";
import { ProjectList } from "../features/work/ProjectList";

const ALL = "all";

/** Segmented filter with a sliding indicator behind the active option. */
const DomainFilter = ({ options, active, onChange }) => (
    <div className="flex flex-wrap gap-1">
        {options.map((option) => {
            const isActive = active === option.value;
            return (
                <button
                    key={option.value}
                    type="button"
                    onClick={() => onChange(option.value)}
                    className={cn(
                        "u-label relative rounded-full px-4 py-2.5 transition-colors duration-300",
                        isActive ? "text-paper" : "text-faint hover:text-ink",
                    )}
                >
                    {isActive ? (
                        <motion.span
                            layoutId="domain-filter-pill"
                            className="absolute inset-0 rounded-full bg-ink"
                            transition={{ duration: DURATION.base, ease: EASE.out }}
                        />
                    ) : null}
                    <span className="relative z-10">
                        {option.label}
                        <span className="u-numeric ml-2 opacity-50">{option.count}</span>
                    </span>
                </button>
            );
        })}
    </div>
);

const WorkPage = () => {
    usePageMeta({
        title: "Work",
        description:
            "Selected and complete work by Suvrat Mittal: financial systems, data pipelines and full-stack platforms.",
    });

    const { shipped, roadmap } = useContent();
    const [domain, setDomain] = useState(ALL);

    const all = useMemo(() => [...shipped, ...roadmap], [shipped, roadmap]);

    const options = useMemo(() => {
        const counts = all.reduce((acc, project) => {
            acc[project.domain] = (acc[project.domain] ?? 0) + 1;
            return acc;
        }, {});

        return [
            { value: ALL, label: "Everything", count: all.length },
            ...Object.entries(DOMAIN_LABELS)
                .filter(([value]) => counts[value] > 0)
                .map(([value, label]) => ({ value, label, count: counts[value] })),
        ];
    }, [all]);

    const visible = useMemo(
        () => (domain === ALL ? all : all.filter((project) => project.domain === domain)),
        [all, domain],
    );

    return (
        <div className="u-container py-16 md:py-24">
            <MaskedLines
                as="h1"
                lines={["Complete", <span className="u-serif" key="index">index</span>]}
                className="u-display"
            />

            <Reveal className="mt-10 flex flex-wrap items-end justify-between gap-8">
                <p className="u-lede max-w-md">
                    Everything shipped and everything committed to, across finance, data
                    and engineering.
                </p>
                <DomainFilter options={options} active={domain} onChange={setDomain} />
            </Reveal>

            <div className="mt-8">
                <Rule />
            </div>

            <motion.div layout className="mt-0">
                <ProjectList
                    key={domain}
                    projects={visible}
                    renderActions={(project) => <AdminRowActions project={project} />}
                    emptyTitle="Nothing in this track yet"
                    emptyDescription="Work published through the admin panel appears here."
                />
            </motion.div>
        </div>
    );
};

export default WorkPage;
