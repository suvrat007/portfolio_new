import { ExternalLinkIcon, SourceIcon } from "../../../shared/ui/icons";
import { AppearItem } from "../components/Appear";
import { Pill, StatusDot, Tag } from "../components/Pill";

const MAX_TAGS = 4;

/**
 * One project row. Name and status, a sentence, the stack, then the two links.
 * No hover choreography: the plain design lets the content sit still.
 */
export const ProjectItem = ({ project, actions }) => {
    const extra = project.tags.length - MAX_TAGS;

    return (
        <AppearItem as="article" className="py-5">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <h3 className="flex items-center gap-2 text-base font-semibold text-ink">
                        {project.name}
                        <StatusDot status={project.status} />
                    </h3>
                    <p className="pl-muted mt-1.5 max-w-2xl text-sm leading-relaxed">
                        {project.description}
                    </p>
                </div>

                {project.timeline ? (
                    <span className="pl-faint shrink-0 whitespace-nowrap pt-1 text-xs">
                        {project.timeline}
                    </span>
                ) : null}
            </div>

            {project.tags.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, MAX_TAGS).map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                    ))}
                    {extra > 0 ? <Tag>+{extra}</Tag> : null}
                </div>
            ) : null}

            {(project.liveUrl || project.github || actions) && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                    {project.liveUrl ? (
                        <Pill href={project.liveUrl} className="text-[0.8125rem]">
                            <ExternalLinkIcon />
                            Website
                        </Pill>
                    ) : null}

                    {project.github ? (
                        <Pill href={project.github} className="text-[0.8125rem]">
                            <SourceIcon />
                            Source
                        </Pill>
                    ) : null}

                    {actions}
                </div>
            )}
        </AppearItem>
    );
};

export default ProjectItem;
