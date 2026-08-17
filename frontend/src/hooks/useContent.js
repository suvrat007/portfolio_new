import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    selectFeatured,
    selectRoadmap,
    selectShipped,
    selectStack,
    isEmptyContent,
} from "../lib/contentModel";
import { CONTENT_STATUS, loadContent } from "../store/contentSlice";

/**
 * The single read path for site content.
 *
 * Data is already present on first render — from the previous visit's cache or
 * the build-time snapshot — so this never returns an empty result while the
 * network catches up. The fetch it triggers is a background revalidation.
 */
export const useContent = () => {
    const dispatch = useDispatch();
    const { data, source, status, error, lastFetchedAt } = useSelector(
        (state) => state.content,
    );

    useEffect(() => {
        const promise = dispatch(loadContent());
        return () => promise.abort?.();
    }, [dispatch]);

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

/** Data-free variant for components that only need to know if content exists. */
export const useHasContent = () =>
    useSelector((state) => !isEmptyContent(state.content.data));
