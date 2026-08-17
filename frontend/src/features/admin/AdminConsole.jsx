import { useState } from "react";

import { COLLECTION_LABELS, COLLECTIONS } from "../../constants/api";
import { SITE } from "../../constants/site";
import { useAuth } from "../../hooks/useAuth";
import { useContent } from "../../hooks/useContent";
import { useProjectMutations } from "../../hooks/useProjectMutations";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { Field } from "../../components/ui/Field";
import { Modal } from "../../components/ui/Modal";
import { Reveal } from "../../components/ui/Reveal";
import { Rule } from "../../components/ui/Section";
import { StatusDot } from "../../components/ui/Tag";
import { AdminRowActions } from "./AdminRowActions";
import { ProjectForm } from "./ProjectForm";

const AddCategoryDialog = ({ isOpen, onClose }) => {
    const { createCategory, isSaving, error } = useProjectMutations();
    const [category, setCategory] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!category.trim()) return;
        try {
            await createCategory(category.trim());
            setCategory("");
            onClose();
        } catch {
            // `error` is rendered below.
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add toolkit category">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <Field
                    label="Category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    placeholder="Markets & Valuation"
                    required
                />
                {error ? <p className="text-sm text-signal">{error}</p> : null}
                <Button type="submit" disabled={isSaving} magnetic={false}>
                    {isSaving ? "Saving" : "Create"}
                </Button>
            </form>
        </Modal>
    );
};

const CollectionBlock = ({ collection, projects }) => (
    <div className="mt-16">
        <div className="flex items-baseline justify-between gap-4 pb-4">
            <h2 className="u-label text-ink">{COLLECTION_LABELS[collection]}</h2>
            <span className="u-label u-numeric text-faint">{projects.length}</span>
        </div>
        <Rule />

        {projects.length === 0 ? (
            <p className="u-label py-8 text-faint">Nothing in this collection.</p>
        ) : (
            <ul>
                {projects.map((project) => (
                    <li
                        key={project.id}
                        className="flex flex-wrap items-center justify-between gap-4 border-b border-line py-4"
                    >
                        <span className="flex items-center gap-3">
                            <StatusDot status={project.status} />
                            <span className="text-sm text-ink">{project.name}</span>
                            <span className="u-label text-faint">{project.domain}</span>
                        </span>
                        <AdminRowActions project={project} />
                    </li>
                ))}
            </ul>
        )}
    </div>
);

/** Signed-in editor: publish, edit and remove everything the site renders. */
export const AdminConsole = () => {
    const { user, signOut } = useAuth();
    const { content, stack } = useContent();
    const [isAddingProject, setIsAddingProject] = useState(false);
    const [isAddingCategory, setIsAddingCategory] = useState(false);

    const totalProjects = Object.values(content.projects).reduce(
        (count, list) => count + list.length,
        0,
    );

    return (
        <div className="u-container py-16 md:py-24">
            <Reveal>
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <div>
                        <p className="u-label text-faint">{SITE.name}</p>
                        <h1 className="u-headline mt-3">Console</h1>
                        <p className="u-label mt-4 text-faint">
                            {user?.email ?? "Signed in"} · {totalProjects} projects ·{" "}
                            {stack.length} toolkit categories
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Button magnetic={false} onClick={() => setIsAddingProject(true)}>
                            Add project
                        </Button>
                        <Button
                            variant="outline"
                            magnetic={false}
                            onClick={() => setIsAddingCategory(true)}
                        >
                            Add category
                        </Button>
                        <Button variant="ghost" magnetic={false} onClick={signOut}>
                            Sign out
                        </Button>
                    </div>
                </div>
            </Reveal>

            <Reveal className="mt-12 border border-line p-6">
                <p className="u-label text-faint">Publishing note</p>
                <p className="u-pretty mt-3 max-w-2xl text-sm text-muted">
                    Changes go live immediately for anyone who loads the site fresh. The
                    bundled snapshot that makes the first paint instant is regenerated on
                    each deploy, so redeploy the frontend when you want new work to appear
                    before the API has woken up.
                </p>
            </Reveal>

            {totalProjects === 0 ? (
                <EmptyState
                    className="mt-16"
                    title="No projects yet"
                    description="Add your first one to see it on the public site."
                />
            ) : (
                Object.values(COLLECTIONS).map((collection) => (
                    <CollectionBlock
                        key={collection}
                        collection={collection}
                        projects={content.projects[collection]}
                    />
                ))
            )}

            {isAddingProject ? (
                <ProjectForm
                    isOpen={isAddingProject}
                    onClose={() => setIsAddingProject(false)}
                />
            ) : null}

            <AddCategoryDialog
                isOpen={isAddingCategory}
                onClose={() => setIsAddingCategory(false)}
            />
        </div>
    );
};

export default AdminConsole;
