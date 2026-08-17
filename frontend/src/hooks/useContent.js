import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    isEmptyContent,
    selectFeatured,
    selectRoadmap,
    selectShipped,
    selectStack,
} from "../lib/contentModel";
import { CONTENT_STATUS, loadContent } from "../store/contentSlice";

/**
 * Read path for site content.
 *
 * Data is already present on first render — from the previous visit's cache or
 * the build-time snapshot — so this never returns an empty result while the
 * network catches up.
 *
 * Read-only by design: the fetch is owned by `useContentBootstrap` in App, so
 * that a component unmounting can never abort a request another component is
 * still waiting on.
 */
export const useContent = () => {
    const { data, source, status, error, lastFetchedAt } = useSelector(
        (state) => state.content,
    );

    return useMemo(
        () => ({
            content: data,
            featured: selectFeatured(data),
            shipped: selectShipped(data),
            roadmap: selectRoadmap(data),
            stack: selectStack(data),
            source,
            status,
            error,
            /** True once a live payload has been reconciled with what is on screen. */
            isRevalidated: Boolean(lastFetchedAt),
            isRevalidating: status === CONTENT_STATUS.LOADING,
            hasData: !isEmptyContent(data),
        }),
        [data, source, status, error, lastFetchedAt],
    );
};

/**
 * Kicks off the single background revalidation for the session. Mounted once,
 * at the root.
 */
export const useContentBootstrap = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadContent());
    }, [dispatch]);

    return useContent();
};
