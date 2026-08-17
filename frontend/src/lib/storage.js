/**
 * localStorage wrapper that never throws. Private browsing, disabled storage
 * and quota errors all degrade to "no cache" rather than a blank page.
 */

const canUseStorage = () => {
    try {
        return typeof window !== "undefined" && Boolean(window.localStorage);
    } catch {
        return false;
    }
};

export const readJSON = (key, fallback = null) => {
    if (!canUseStorage()) return fallback;
    try {
        const raw = window.localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
};

export const writeJSON = (key, value) => {
    if (!canUseStorage()) return false;
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch {
        return false;
    }
};

export const readString = (key, fallback = null) => {
    if (!canUseStorage()) return fallback;
    try {
        return window.localStorage.getItem(key) ?? fallback;
    } catch {
        return fallback;
    }
};

export const writeString = (key, value) => {
    if (!canUseStorage()) return false;
    try {
        window.localStorage.setItem(key, value);
        return true;
    } catch {
        return false;
    }
};

export const removeKey = (key) => {
    if (!canUseStorage()) return;
    try {
        window.localStorage.removeItem(key);
    } catch {
        /* nothing useful to do */
    }
};
