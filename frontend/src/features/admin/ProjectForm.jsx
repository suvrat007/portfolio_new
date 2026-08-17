import { useState } from "react";

import {
    COLLECTION_LABELS,
    COLLECTIONS,
    DOMAIN_LABELS,
    PROJECT_STATUS,
    STATUS_LABELS,
} from "../../constants/api";
import { useProjectMutations } from "../../hooks/useProjectMutations";
import { Button } from "../../components/ui/Button";
import { Field } from "../../components/ui/Field";
import { Modal } from "../../components/ui/Modal";

const SELECT_CLASS =
    "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-sm text-ink " +
    "focus:border-ink focus:outline-none transition-colors duration-300";

/** Comma-separated text ⇄ array, so tags and highlights stay easy to edit. */
const toList = (value) =>
    value
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean);

const fromList = (list) => (Array.isArray(list) ? list.join(", ") : "");

const buildInitialValues = (project, defaultCollection) => ({
    collection: project?.collection ?? defaultCollection,
    name: project?.name ?? "",
    description: project?.description ?? "",
    image: project?.image ?? "",
    github: project?.github ?? "",
    liveUrl: project?.liveUrl ?? "",
    domain: project?.domain ?? "engineering",
    status: project?.status ?? PROJECT_STATUS.LIVE,
    tags: fromList(project?.tags),
    timeline: project?.timeline ?? "",
    highlights: fromList(project?.highlights),
    order: project?.order ?? 0,
});

/**
 * Create/edit dialog for a project. The `collection` select doubles as a move
 * control: saving an existing project into a different collection is not
 * supported by the API, so it is disabled while editing.
 */
export const ProjectForm = ({
    isOpen,
    onClose,
    project = null,
    defaultCollection = COLLECTIONS.FEATURED,
}) => {
    const isEditing = Boolean(project?.id && project?.collection);
    const [values, setValues] = useState(() =>
        buildInitialValues(project, defaultCollection),
    );
    const { createProject, updateProject, isSaving, error } = useProjectMutations();

    const setField = (field) => (event) =>
        setValues((current) => ({ ...current, [field]: event.target.value }));

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            name: values.name.trim(),
            description: values.description.trim(),
            image: values.image.trim(),
            github: values.github.trim(),
            liveUrl: values.liveUrl.trim(),
            domain: values.domain,
            status: values.status,
            tags: toList(values.tags),
            timeline: values.timeline.trim(),
            highlights: toList(values.highlights),
            order: Number(values.order) || 0,
        };

        try {
            if (isEditing) {
                await updateProject(project.collection, project.id, payload);
            } else {
                await createProject(values.collection, payload);
            }
            onClose();
        } catch {
            // `error` from the hook is rendered below; keep the dialog open.
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEditing ? `Edit ${project.name}` : "Add project"}
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                        <span className="u-label text-faint">Collection</span>
                        <select
                            value={values.collection}
                            onChange={setField("collection")}
                            disabled={isEditing}
                            className={SELECT_CLASS}
                        >
                            {Object.values(COLLECTIONS).map((collection) => (
                                <option key={collection} value={collection}>
                                    {COLLECTION_LABELS[collection]}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Field
                        label="Order"
                        type="number"
                        value={values.order}
                        onChange={setField("order")}
                        hint="Lower sorts first"
                    />
                </div>

                <Field
                    label="Name"
                    value={values.name}
                    onChange={setField("name")}
                    placeholder="Equity Research Terminal"
                    required
                />

                <Field
                    as="textarea"
                    label="Description"
                    value={values.description}
                    onChange={setField("description")}
                    placeholder="What it does and why it exists."
                    rows={4}
                    required
                />

                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                        <span className="u-label text-faint">Domain</span>
                        <select
                            value={values.domain}
                            onChange={setField("domain")}
                            className={SELECT_CLASS}
                        >
                            {Object.entries(DOMAIN_LABELS).map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <span className="u-label text-faint">Status</span>
                        <select
                            value={values.status}
                            onChange={setField("status")}
                            className={SELECT_CLASS}
                        >
                            {Object.entries(STATUS_LABELS).map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <Field
                    label="Tags"
                    value={values.tags}
                    onChange={setField("tags")}
                    placeholder="Python, Black-Scholes, PostgreSQL"
                    hint="Comma separated"
                />

                <Field
                    label="Highlights"
                    value={values.highlights}
                    onChange={setField("highlights")}
                    placeholder="Prices 10k contracts/s, Live greeks surface"
                    hint="Comma separated bullet points"
                />

                <Field
                    label="Timeline"
                    value={values.timeline}
                    onChange={setField("timeline")}
                    placeholder="Jun 2026 to Aug 2026"
                />

                <div className="grid gap-6 sm:grid-cols-2">
                    <Field
                        label="Live URL"
                        value={values.liveUrl}
                        onChange={setField("liveUrl")}
                        placeholder="https://"
                    />
                    <Field
                        label="Repository"
                        value={values.github}
                        onChange={setField("github")}
                        placeholder="https://github.com/"
                    />
                </div>

                <Field
                    label="Preview image"
                    value={values.image}
                    onChange={setField("image")}
                    placeholder="https://"
                    hint="Optional. Shown on hover in the work index"
                />

                {error ? <p className="text-sm text-signal">{error}</p> : null}

                <div className="mt-2 flex items-center gap-3">
                    <Button type="submit" disabled={isSaving} magnetic={false}>
                        {isSaving ? "Saving" : isEditing ? "Save changes" : "Publish"}
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        magnetic={false}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default ProjectForm;
