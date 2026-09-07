import { useState } from "react";

import { STAGGER } from "../../../constants/motion";
import { RevealGroup } from "../components/Reveal";
import { EmptyState } from "../../../shared/ui/EmptyState";
import { HoverPreview, useHoverPreview } from "./HoverPreview";
import { ProjectRow } from "./ProjectRow";

/**
 * Renders projects as an index. Owns the single cursor-following preview so
 * only one image is mounted no matter how long the list gets.
 *
 * @param {{ projects: object[], renderActions?: (project) => import('react').ReactNode }} props
 */
export const ProjectList = ({ projects, renderActions, emptyTitle, emptyDescription }) => {
    const [hovered, setHovered] = useState(null);
    const preview = useHoverPreview();

    if (projects.length === 0) {
        return (
            <EmptyState
                title={emptyTitle ?? "Nothing published yet"}
                description={emptyDescription}
            />
        );
    }

    return (
        <>
            <RevealGroup className="border-t border-line" stagger={STAGGER.base}>
                {projects.map((project, index) => (
                    <ProjectRow
                        key={project.id}
                        project={project}
                        index={index}
                        onHover={(next) => preview.enabled && setHovered(next)}
                        onLeave={() => setHovered(null)}
                        onMove={preview.track}
                        actions={renderActions?.(project)}
                    />
                ))}
            </RevealGroup>

            <HoverPreview
                image={hovered?.image}
                name={hovered?.name}
                x={preview.x}
                y={preview.y}
            />
        </>
    );
};

export default ProjectList;
