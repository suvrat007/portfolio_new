import { useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import { useProjectMutations } from "../../hooks/useProjectMutations";
import { Button } from "../../components/ui/Button";
import { Field } from "../../components/ui/Field";
import { Modal } from "../../components/ui/Modal";

/** "Add" / "Remove" controls on a toolkit category heading. */
export const AdminStackActions = ({ category }) => {
    const { isAuthenticated } = useAuth();
    const { addTech, deleteCategory, isSaving, error } = useProjectMutations();
    const [isAdding, setIsAdding] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [values, setValues] = useState({ name: "", image: "" });

    if (!isAuthenticated) return null;

    const handleAdd = async (event) => {
        event.preventDefault();
        if (!values.name.trim()) return;
        try {
            await addTech(category, {
                name: values.name.trim(),
                image: values.image.trim(),
            });
            setValues({ name: "", image: "" });
            setIsAdding(false);
        } catch {
            // `error` is rendered in the dialog.
        }
    };

    const handleDeleteCategory = async () => {
        if (!isConfirming) {
            setIsConfirming(true);
            return;
        }
        try {
            await deleteCategory(category);
        } finally {
            setIsConfirming(false);
        }
    };

    return (
        <>
            <span className="flex items-center gap-3 border-l border-line pl-3">
                <button
                    type="button"
                    onClick={() => setIsAdding(true)}
                    className="u-label text-faint transition-colors hover:text-ink"
                >
                    Add
                </button>
                <button
                    type="button"
                    onClick={handleDeleteCategory}
                    onBlur={() => setIsConfirming(false)}
                    disabled={isSaving}
                    className="u-label text-faint transition-colors hover:text-signal"
                >
                    {isConfirming ? "Confirm?" : "Remove"}
                </button>
            </span>

            <Modal
                isOpen={isAdding}
                onClose={() => setIsAdding(false)}
                title={`Add to ${category}`}
            >
                <form onSubmit={handleAdd} className="flex flex-col gap-6">
                    <Field
                        label="Name"
                        value={values.name}
                        onChange={(event) =>
                            setValues((current) => ({ ...current, name: event.target.value }))
                        }
                        placeholder="Monte Carlo Simulation"
                        required
                    />
                    <Field
                        label="Icon URL"
                        value={values.image}
                        onChange={(event) =>
                            setValues((current) => ({ ...current, image: event.target.value }))
                        }
                        placeholder="https://"
                        hint="Optional. Omit for non-software competencies"
                    />

                    {error ? <p className="text-sm text-signal">{error}</p> : null}

                    <Button type="submit" disabled={isSaving} magnetic={false}>
                        {isSaving ? "Saving" : "Add"}
                    </Button>
                </form>
            </Modal>
        </>
    );
};

/** The small cross beside an individual technology. */
export const AdminTechAction = ({ category, techName }) => {
    const { isAuthenticated } = useAuth();
    const { removeTech, isSaving } = useProjectMutations();

    if (!isAuthenticated) return null;

    return (
        <button
            type="button"
            onClick={() => removeTech(category, techName).catch(() => {})}
            disabled={isSaving}
            aria-label={`Remove ${techName}`}
            className="u-label ml-1 text-faint opacity-0 transition-opacity duration-300 hover:text-signal group-hover/tech:opacity-100"
        >
            ×
        </button>
    );
};

export default AdminStackActions;
