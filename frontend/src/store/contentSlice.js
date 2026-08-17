import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { TIMING } from "../constants/api";
import { CONTENT_CACHE_TTL_MS, STORAGE_KEYS } from "../constants/storage";
import { fetchContent, toErrorMessage } from "../lib/apiClient";
import { EMPTY_CONTENT, isEmptyContent, normaliseContent } from "../lib/contentModel";
import { readJSON, readString, writeJSON, writeString } from "../lib/storage";
import snapshot from "../data/snapshot.json";

export const CONTENT_SOURCE = {
    SNAPSHOT: "snapshot",
    CACHE: "cache",
    NETWORK: "network",
};

export const CONTENT_STATUS = {
    IDLE: "idle",
    LOADING: "loading",
    READY: "ready",
    ERROR: "error",
};

/**
 * Reads the previous visit's payload. Anything past the TTL is ignored so a
 * long-dormant visitor does not see months-old work.
 */
const readCache = () => {
    const cached = readJSON(STORAGE_KEYS.content);
    if (!cached?.payload || !cached?.savedAt) return null;
    if (Date.now() - cached.savedAt > CONTENT_CACHE_TTL_MS) return null;
    return cached;
};

/**
 * Resolves the best data available before a single byte crosses the network:
 * last visit's cache if it is fresh, otherwise the snapshot baked in at build
 * time. Either way the first paint is real content, not a spinner.
 */
const resolveInitialState = () => {
    const cached = readCache();

    if (cached) {
        return {
            data: normaliseContent(cached.payload),
            source: CONTENT_SOURCE.CACHE,
            etag: readString(STORAGE_KEYS.contentEtag),
        };
    }

    const fromSnapshot = normaliseContent(snapshot);
    if (!isEmptyContent(fromSnapshot)) {
        return { data: fromSnapshot, source: CONTENT_SOURCE.SNAPSHOT, etag: null };
    }

    return { data: EMPTY_CONTENT, source: null, etag: null };
};

const initial = resolveInitialState();

const initialState = {
    data: initial.data,
    source: initial.source,
    etag: initial.etag,
    status: CONTENT_STATUS.IDLE,
    lastFetchedAt: null,
    error: null,
};

export const loadContent = createAsyncThunk(
    "content/load",
    async (_arg, { getState, rejectWithValue, signal }) => {
        const { etag } = getState().content;

        try {
            return await fetchContent({ etag, signal });
        } catch (error) {
            return rejectWithValue(toErrorMessage(error, "Could not reach the API"));
        }
    },
    {
        /** Skip a refetch while one is in flight or the payload is still fresh. */
        condition: (_arg, { getState }) => {
            const { status, lastFetchedAt } = getState().content;
            if (status === CONTENT_STATUS.LOADING) return false;
            if (!lastFetchedAt) return true;
            return Date.now() - lastFetchedAt > TIMING.REVALIDATE_AFTER_MS;
        },
    },
);

const contentSlice = createSlice({
    name: "content",
    initialState,
    reducers: {
        /** Called after an admin mutation to force the next load through. */
        invalidate(state) {
            state.lastFetchedAt = null;
            state.etag = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadContent.pending, (state) => {
                state.status = CONTENT_STATUS.LOADING;
                state.error = null;
            })
            .addCase(loadContent.fulfilled, (state, action) => {
                state.status = CONTENT_STATUS.READY;
                state.lastFetchedAt = Date.now();

                if (action.payload.notModified) return;

                state.data = normaliseContent(action.payload.payload);
                state.source = CONTENT_SOURCE.NETWORK;
                state.etag = action.payload.etag;

                writeJSON(STORAGE_KEYS.content, {
                    payload: action.payload.payload,
                    savedAt: Date.now(),
                });
                if (action.payload.etag) {
                    writeString(STORAGE_KEYS.contentEtag, action.payload.etag);
                }
            })
            .addCase(loadContent.rejected, (state, action) => {
                // Snapshot or cache is already on screen; surface the error without
                // discarding what the visitor can see.
                state.status = CONTENT_STATUS.ERROR;
                state.error = action.payload ?? action.error?.message ?? null;
            });
    },
});

export const { invalidate } = contentSlice.actions;
export default contentSlice.reducer;
