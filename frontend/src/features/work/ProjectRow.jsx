import { motion } from "framer-motion";

import { DOMAIN_LABELS, PROJECT_STATUS } from "../../constants/api";
import { fadeUp } from "../../constants/motion";
import { cn } from "../../lib/cn";
import { Arrow } from "../../components/ui/Button";
import { StatusDot, Tag } from "../../components/ui/Tag";

const pad = (index) => String(index + 1).padStart(2, "0");

const MAX_VISIBLE_TAGS = 5;

/**
 * One project, as a row in an index rather than a card in a grid. Keeps a long
 * list scannable and lets the type do the work.
 *
 * @param {{ project: object, index: number, actions?: import('react').ReactNode }} props
 */
export const ProjectRow = ({ project, index, onHover, onLeave, onMove, actions }) => {
    const extraTags = project.tags.length - MAX_VISIBLE_TAGS;
    const isUnshipped =
        project.status === PROJECT_STATUS.PLANNED ||
        project.status === PROJECT_STATUS.BUILDING;

    return (
        <motion.article
            variants={fadeUp}
            className="group relative border-b border-line"
            onMouseEnter={() => onHover?.(project)}
            onMouseLeave={() => onLeave?.()}
            onMouseMove={onMove}
        >
            <div className="grid gap-4 py-8 md:grid-cols-12 md:gap-8 md:py-10">
                {/* ── Identity ─────────────────────────────────────────────── */}
                <div className="flex items-start gap-4 md:col-span-4">
                    <span className="u-label u-numeric mt-1.5 shrink-0 text-faint">
                        {pad(index)}
                    </span>
                    <div>
                        <h3 className="u-title flex items-center gap-3">
                            <span
                                className={cn(
                                    "transition-opacity duration-500",
                                    isUnshipped && "opacity-70",
                                )}
                            >
                                {project.name}
                            </span>
                            <StatusDot status={project.status} />
                        </h3>
                        <p className="u-label mt-2.5 text-faint">
                            {DOMAIN_LABELS[project.domain] ?? project.domain}
                            {project.timeline ? ` · ${project.timeline}` : ""}
                        </p>
                    </div>
                </div>

                {/* ── Description ──────────────────────────────────────────── */}
                <div className="md:col-span-5">
                    <p className="u-pretty max-w-xl text-sm leading-relaxed text-muted">
                        {project.description}
                    </p>

                    {project.highlights.length > 0 ? (
                        <ul className="mt-4 flex flex-col gap-2">
                            {project.highlights.map((highlight) => (
                                <li
                                    key={highlight}
                                    className="u-pretty flex gap-3 text-sm text-faint"
                                >
                                    <span aria-hidden="true">—</span>
                                    {highlight}
                                </li>
                            ))}
                        </ul>
                    ) : null}

                    {project.tags.length > 0 ? (
                        <div className="mt-5 flex flex-wrap gap-2">
                            {project.tags.slice(0, MAX_VISIBLE_TAGS).map((tag) => (
                                <Tag key={tag}>{tag}</Tag>
                            ))}
                            {extraTags > 0 ? <Tag>+{extraTags}</Tag> : null}
                        </div>
                    ) : null}
                </div>

                {/* ── Links ────────────────────────────────────────────────── */}
                <div className="flex flex-wrap items-start gap-x-6 gap-y-3 md:col-span-3 md:justify-end">
                    {project.liveUrl ? (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link u-label flex items-center gap-1.5 text-ink"
                        >
                            <span className="u-link">Live</span>
                            <Arrow />
                        </a>
                    ) : null}

                    {project.github ? (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link u-label flex items-center gap-1.5 text-muted"
                        >
                            <span className="u-link">Source</span>
                            <Arrow />
                        </a>
                    ) : null}

                    {isUnshipped && !project.liveUrl && !project.github ? (
                        <span className="u-label text-faint">In progress</span>
                    ) : null}

                    {actions}
                </div>
            </div>
        </motion.article>
    );
};

export default ProjectRow;
