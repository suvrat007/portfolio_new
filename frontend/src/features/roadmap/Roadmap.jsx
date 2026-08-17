import { motion } from "framer-motion";

import { STATUS_LABELS } from "../../constants/api";
import { fadeUp, STAGGER } from "../../constants/motion";
import { SECTIONS } from "../../constants/site";
import { useContent } from "../../hooks/useContent";
import { RevealGroup } from "../../components/ui/Reveal";
import { Section } from "../../components/ui/Section";
import { StatusDot, Tag } from "../../components/ui/Tag";

const pad = (index) => String(index + 1).padStart(2, "0");

/**
 * Committed but unshipped work. Presented as a manifest rather than a portfolio
 * grid, these are stated intentions, and the layout should say so.
 */
const RoadmapEntry = ({ entry, index }) => (
    <motion.article
        variants={fadeUp}
        className="group flex flex-col border-t border-line pt-6"
    >
        <div className="flex items-baseline justify-between gap-4">
            <span className="u-label u-numeric text-faint">{pad(index)}</span>
            <StatusDot status={entry.status} withLabel />
        </div>

        <h3 className="u-title mt-8">{entry.name}</h3>

        <p className="u-pretty mt-4 flex-1 text-sm leading-relaxed text-muted">
            {entry.description}
        </p>

        {entry.tags.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                ))}
            </div>
        ) : null}
    </motion.article>
);

export const Roadmap = () => {
    const { roadmap } = useContent();

    if (roadmap.length === 0) return null;

    const buildingCount = roadmap.filter(
        (entry) => entry.status === "building",
    ).length;

    return (
        <Section
            id={SECTIONS.building.id}
            index={SECTIONS.building.index}
            label={SECTIONS.building.label}
            aside={`${buildingCount} active · ${roadmap.length} committed`}
        >
            <RevealGroup
                className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-4"
                stagger={STAGGER.base}
            >
                {roadmap.map((entry, index) => (
                    <RoadmapEntry key={entry.id} entry={entry} index={index} />
                ))}
            </RevealGroup>

            <motion.p
                className="u-label mt-16 max-w-lg text-faint"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                {STATUS_LABELS.building} entries ship to this page as they are completed.
            </motion.p>
        </Section>
    );
};

export default Roadmap;
