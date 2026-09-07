import { useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import { useProjectMutations } from "../../hooks/useProjectMutations";
import { ProjectForm } from "./ProjectForm";

/**
 * Inline edit/delete controls rendered into a project row.
 *
 * Renders nothing for signed-out visitors and for roadmap placeholders, which
 * have no database record to act on.
 */
export const AdminRowActions = ({ project }) => {
    const { isAuthenticated } = useAuth();
    const { deleteProject, isSaving } = useProjectMutations();
    const [isEditing, setIsEditing] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);

    if (!isAuthenticated || !project?.collection || project.isPlaceholder) return null;

    const handleDelete = async () => {
        if (!isConfirming) {
            setIsConfirming(true);
            return;
        }
        try {
            await deleteProject(project.collection, project.id);
        } finally {
            setIsConfirming(false);
        }
    };

    return (
        <>
            <span className="flex items-center gap-4 border-l border-line pl-4">
                <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="u-label text-faint transition-colors hover:text-ink"
                >
                    Edit
                </button>
                <button
                    type="button"
                    onClick={handleDelete}
                    onBlur={() => setIsConfirming(false)}
                    disabled={isSaving}
                    className="u-label text-faint transition-colors hover:text-signal"
                >
                    {isConfirming ? "Confirm?" : "Delete"}
                </button>
            </span>

            {isEditing ? (
                <ProjectForm
                    isOpen={isEditing}
                    onClose={() => setIsEditing(false)}
                    project={project}
                />
            ) : null}
        </>
    );
};

export default AdminRowActions;
