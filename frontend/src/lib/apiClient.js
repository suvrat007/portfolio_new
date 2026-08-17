import axios from "axios";

import { API_BASE_URL, ENDPOINTS, TIMING } from "../constants/api";
import { STORAGE_KEYS } from "../constants/storage";
import { readString, removeKey } from "./storage";

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: TIMING.REQUEST_TIMEOUT_MS,
    headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
    const token = readString(STORAGE_KEYS.token);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // An expired admin session should not leave a dead token behind.
        if (error.response?.status === 401) removeKey(STORAGE_KEYS.token);
        return Promise.reject(error);
    },
);

/** Normalises axios/network failures into one readable message. */
export const toErrorMessage = (error, fallback = "Something went wrong") => {
    if (error?.code === "ECONNABORTED") return "The request timed out. Try again.";
    return error?.response?.data?.message ?? error?.message ?? fallback;
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fires the cheapest possible request at the API so a spun-down instance starts
 * booting immediately. Called once at module load, before React mounts —
 * deliberately not awaited by anything.
 */
export const warmUpApi = () => {
    const start = performance.now();
    return apiClient
        .get(ENDPOINTS.health, { timeout: TIMING.WARMUP_TIMEOUT_MS })
        .then(() => ({ ok: true, ms: Math.round(performance.now() - start) }))
        .catch(() => ({ ok: false, ms: Math.round(performance.now() - start) }));
};

/**
 * Fetches the aggregate payload with conditional-request support. A matching
 * ETag returns `{ notModified: true }` and costs no bandwidth.
 *
 * @param {{ etag?: string|null, signal?: AbortSignal }} [options]
 */
export const fetchContent = async ({ etag, signal } = {}) => {
    let attempt = 0;

    for (;;) {
        try {
            const response = await apiClient.get(ENDPOINTS.content, {
                signal,
                headers: etag ? { "If-None-Match": etag } : undefined,
                // 304 is a success for our purposes, not an error.
                validateStatus: (status) => status === 200 || status === 304,
            });

            if (response.status === 304) return { notModified: true };

            return {
                notModified: false,
                payload: response.data,
                etag: response.headers?.etag ?? null,
            };
        } catch (error) {
            const aborted = signal?.aborted || axios.isCancel(error);
            if (aborted || attempt >= TIMING.RETRY_ATTEMPTS) throw error;

            attempt += 1;
            await wait(TIMING.RETRY_BACKOFF_MS * attempt);
        }
    }
};
