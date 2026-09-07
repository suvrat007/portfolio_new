import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { ENDPOINTS } from "../constants/api";
import { apiClient, toErrorMessage } from "../lib/apiClient";
import { invalidate, loadContent } from "../store/contentSlice";

/**
 * Write path for the admin panel. Every mutation invalidates the content cache
 * and refetches, so the public view and the editor never disagree.
 */
export const useProjectMutations = () => {
    const dispatch = useDispatch();
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    const refresh = useCallback(() => {
        dispatch(invalidate());
        return dispatch(loadContent());
    }, [dispatch]);

    const run = useCallback(
        async (request) => {
            setIsSaving(true);
            setError(null);
            try {
                const result = await request();
                await refresh();
                return result;
            } catch (caught) {
                const message = toErrorMessage(caught, "The change could not be saved");
                setError(message);
                throw new Error(message);
            } finally {
                setIsSaving(false);
            }
        },
        [refresh],
    );

    const createProject = useCallback(
        (collection, values) =>
            run(() => apiClient.post(ENDPOINTS.projects(collection), values)),
        [run],
    );

    const updateProject = useCallback(
        (collection, id, values) =>
            run(() => apiClient.put(ENDPOINTS.project(collection, id), values)),
        [run],
    );

    const deleteProject = useCallback(
        (collection, id) => run(() => apiClient.delete(ENDPOINTS.project(collection, id))),
        [run],
    );

    const createCategory = useCallback(
        (category) => run(() => apiClient.post(ENDPOINTS.stack, { category })),
        [run],
    );

    const deleteCategory = useCallback(
        (category) => run(() => apiClient.delete(ENDPOINTS.stackCategory(category))),
        [run],
    );

    const addTech = useCallback(
        (category, tech) => run(() => apiClient.post(ENDPOINTS.stackTechs(category), tech)),
        [run],
    );

    const removeTech = useCallback(
        (category, techName) =>
            run(() => apiClient.delete(ENDPOINTS.stackTech(category, techName))),
        [run],
    );

    return {
        isSaving,
        error,
        clearError: () => setError(null),
        createProject,
        updateProject,
        deleteProject,
        createCategory,
        deleteCategory,
        addTech,
        removeTech,
    };
};
