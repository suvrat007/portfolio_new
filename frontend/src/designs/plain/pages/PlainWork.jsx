import { useMemo, useState } from "react";

import { DOMAIN_LABELS } from "../../../constants/api";
import { usePageMeta } from "../../../hooks/usePageMeta";
import { useContent } from "../../../hooks/useContent";
import { cn } from "../../../lib/cn";
import { AdminRowActions } from "../../../shared/admin/AdminRowActions";
import { SectionHeading } from "../components/Section";
import { ProjectItem } from "../sections/ProjectItem";

const ALL = "all";

const PlainWork = () => {
    usePageMeta({
        title: "Work",
        description:
            "Everything Suvrat Mittal has shipped and everything currently in progress.",
    });

    const { shipped, roadmap } = useContent();
    const [domain, setDomain] = useState(ALL);

    const all = useMemo(() => [...shipped, ...roadmap], [shipped, roadmap]);

    const filters = useMemo(() => {
        const counts = all.reduce((acc, project) => {
            acc[project.domain] = (acc[project.domain] ?? 0) + 1;
            return acc;
        }, {});

        return [
            { value: ALL, label: "All", count: all.length },
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
        <div className="pl-container py-10">
            <SectionHeading id="work">Work</SectionHeading>

            <p className="pl-muted max-w-2xl text-[0.9375rem] leading-relaxed">
                Everything shipped and everything in progress, across finance, data and
                engineering.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
                {filters.map((filter) => (
                    <button
                        key={filter.value}
                        type="button"
                        onClick={() => setDomain(filter.value)}
                        className={cn(
                            "pl-pill pl-tap text-[0.8125rem]",
                            domain === filter.value &&
                                "border-transparent bg-ink text-paper hover:bg-ink",
                        )}
                    >
                        {filter.label}
                        <span className="opacity-60">{filter.count}</span>
                    </button>
                ))}
            </div>

            <div className="mt-4 divide-y divide-line border-t border-line">
                {visible.map((project) => (
                    <ProjectItem
                        key={project.id}
                        project={project}
                        actions={<AdminRowActions project={project} />}
                    />
                ))}
            </div>
        </div>
    );
};

export default PlainWork;
