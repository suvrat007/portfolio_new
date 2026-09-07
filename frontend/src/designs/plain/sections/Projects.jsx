import { Link } from "react-router-dom";

import { ROUTES, SECTIONS } from "../../../constants/site";
import { useContent } from "../../../hooks/useContent";
import { AdminRowActions } from "../../../shared/admin/AdminRowActions";
import { AppearGroup } from "../components/Appear";
import { Section } from "../components/Section";
import { ProjectItem } from "./ProjectItem";

/** Shipped work. The full index lives on /work. */
export const Projects = ({ limit = 6 }) => {
    const { shipped } = useContent();
    const visible = shipped.slice(0, limit);

    return (
        <Section
            id={SECTIONS.work.id}
            title="Projects"
            aside={
                <Link to={ROUTES.work} className="pl-link">
                    View all →
                </Link>
            }
        >
            {visible.length === 0 ? (
                <p className="pl-faint text-sm">Nothing published yet.</p>
            ) : (
                <AppearGroup className="divide-y divide-line">
                    {visible.map((project) => (
                        <ProjectItem
                            key={project.id}
                            project={project}
                            actions={<AdminRowActions project={project} />}
                        />
                    ))}
                </AppearGroup>
            )}
        </Section>
    );
};

export default Projects;
