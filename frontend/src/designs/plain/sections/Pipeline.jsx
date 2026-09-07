import { STATUS_LABELS } from "../../../constants/api";
import { SECTIONS } from "../../../constants/site";
import { useContent } from "../../../hooks/useContent";
import { Section } from "../components/Section";
import { StatusDot, Tag } from "../components/Pill";

/**
 * Work in progress and work committed to. Kept visually distinct from shipped
 * projects so nothing here can be mistaken for something finished.
 */
export const Pipeline = () => {
    const { roadmap } = useContent();

    if (roadmap.length === 0) return null;

    return (
        <Section
            id={SECTIONS.building.id}
            title="Pipeline"
            aside={`${roadmap.length} in progress`}
        >
            <div className="divide-y divide-line">
                {roadmap.map((entry) => (
                    <article key={entry.id} className="py-5">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                            <h3 className="flex items-center gap-2 text-base font-semibold text-ink">
                                {entry.name}
                                <StatusDot status={entry.status} />
                            </h3>
                            <span className="pl-faint text-xs">
                                {STATUS_LABELS[entry.status] ?? entry.status}
                            </span>
                        </div>

                        <p className="pl-muted mt-2 max-w-2xl text-sm leading-relaxed">
                            {entry.description}
                        </p>

                        {entry.tags.length > 0 ? (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {entry.tags.map((tag) => (
                                    <Tag key={tag}>{tag}</Tag>
                                ))}
                            </div>
                        ) : null}
                    </article>
                ))}
            </div>
        </Section>
    );
};

export default Pipeline;
