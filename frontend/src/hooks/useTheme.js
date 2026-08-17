import { useCallback, useEffect, useState } from "react";

import { DEFAULT_THEME, STORAGE_KEYS, THEMES } from "../constants/storage";
import { readString, writeString } from "../lib/storage";

const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
};

/** Mirrors the inline script in index.html, which sets the theme before paint. */
export const resolveInitialTheme = () => {
    const stored = readString(STORAGE_KEYS.theme);
    if (stored === THEMES.LIGHT || stored === THEMES.DARK) return stored;

    if (typeof window !== "undefined" && window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? THEMES.DARK
            : DEFAULT_THEME;
    }
    return DEFAULT_THEME;
};

export const useTheme = () => {
    const [theme, setTheme] = useState(resolveInitialTheme);

    useEffect(() => {
        applyTheme(theme);
        writeString(STORAGE_KEYS.theme, theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme((current) => (current === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK));
    }, []);

    return { theme, setTheme, toggleTheme, isDark: theme === THEMES.DARK };
};
