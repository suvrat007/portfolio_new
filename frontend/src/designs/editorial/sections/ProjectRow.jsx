import { motion } from "framer-motion";

import { DOMAIN_LABELS, PROJECT_STATUS } from "../../../constants/api";
import { fadeUp } from "../../../constants/motion";
import { cn } from "../../../lib/cn";
import { StatusDot, Tag } from "../../../shared/ui/Tag";
import { ExternalLinkIcon, SourceIcon } from "../../../shared/ui/icons";

const pad = (index) => String(index + 1).padStart(2, "0");

const MAX_VISIBLE_TAGS = 5;

/**
 * Outbound project link. A raised, icon-led pill so it reads unmistakably as a
 * button rather than as running text. Opens in a new tab with the opener
 * reference severed.
 */
const ProjectLink = ({ href, label, icon: Icon }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
            "inline-flex items-center gap-2 rounded-full border border-line bg-raised",
            "px-4 py-2 text-[0.8125rem] font-medium tracking-[-0.01em] text-ink shadow-sm",
            "transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "hover:border-ink hover:bg-ink hover:text-paper",
        )}
    >
        <Icon />
        {label}
    </a>
);

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
                {/* Identity */}
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

                {/* Description */}
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
                                    <span aria-hidden="true">·</span>
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

                    {/* Links sit directly under the stack, where the eye lands last. */}
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                        {project.liveUrl ? (
                            <ProjectLink
                                href={project.liveUrl}
                                label="Website"
                                icon={ExternalLinkIcon}
                            />
                        ) : null}

                        {project.github ? (
                            <ProjectLink
                                href={project.github}
                                label="Source"
                                icon={SourceIcon}
                            />
                        ) : null}

                        {!project.liveUrl && !project.github ? (
                            <span className="u-label text-faint">
                                {isUnshipped ? "In progress" : "Not public"}
                            </span>
                        ) : null}
                    </div>
                </div>

                {/* Admin controls only; the outbound links live with the content. */}
                <div className="flex flex-wrap items-start gap-2 md:col-span-3 md:justify-end">
                    {actions}
                </div>
            </div>
        </motion.article>
    );
};

export default ProjectRow;
