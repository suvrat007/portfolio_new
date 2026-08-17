import { Link } from "react-router-dom";

import { ROUTES, SECTIONS } from "../../constants/site";
import { useContent } from "../../hooks/useContent";
import { Arrow } from "../../components/ui/Button";
import { Reveal } from "../../components/ui/Reveal";
import { Section } from "../../components/ui/Section";
import { AdminRowActions } from "../admin/AdminRowActions";
import { ProjectList } from "./ProjectList";

/** The four selected projects on the home page. */
export const FeaturedWork = () => {
    const { featured } = useContent();

    return (
        <Section
            id={SECTIONS.work.id}
            index={SECTIONS.work.index}
            label={SECTIONS.work.label}
            aside={
                <Link to={ROUTES.work} className="group flex items-center gap-2 text-ink">
                    <span className="u-link">Full index</span>
                    <Arrow direction="right" />
                </Link>
            }
        >
            <ProjectList
                projects={featured}
                renderActions={(project) => <AdminRowActions project={project} />}
                emptyTitle="No selected work yet"
                emptyDescription="Projects added through the admin panel appear here."
            />

            <Reveal className="mt-8 flex justify-end">
                <Link
                    to={ROUTES.work}
                    className="group flex items-center gap-3 text-sm text-ink"
                >
                    <span className="u-link">See everything</span>
                    <Arrow direction="right" />
                </Link>
            </Reveal>
        </Section>
    );
};

export default FeaturedWork;
