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
            {/*
              * The date shares the title row rather than sitting beside the
              * description. As a shrink-0 sibling it reserved its width for the
              * description's whole height, so every line wrapped short while
              * the space beside it stayed empty.
              */}
            <div className="flex items-baseline justify-between gap-3">
                <h3 className="flex min-w-0 items-center gap-2 text-base font-semibold text-ink">
                    <span className="truncate">{project.name}</span>
                    <StatusDot status={project.status} />
                </h3>

                {project.timeline ? (
                    <span className="pl-faint shrink-0 whitespace-nowrap text-xs">
                        {project.timeline}
                    </span>
                ) : null}
            </div>

            <p className="pl-muted mt-2 max-w-2xl text-[0.8125rem] leading-relaxed sm:text-sm">
                {project.description}
            </p>

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
