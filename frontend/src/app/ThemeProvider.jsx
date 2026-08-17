import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { DEFAULT_THEME, STORAGE_KEYS, THEMES } from "../constants/storage";
import { readString, writeString } from "../lib/storage";

const ThemeContext = createContext(null);

const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
};

/** Mirrors the inline script in index.html, which sets the theme before paint. */
const resolveInitialTheme = () => {
    const stored = readString(STORAGE_KEYS.theme);
    if (stored === THEMES.LIGHT || stored === THEMES.DARK) return stored;

    if (typeof window !== "undefined" && window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? THEMES.DARK
            : DEFAULT_THEME;
    }
    return DEFAULT_THEME;
};

/**
 * Theme lives in context rather than in a hook's local state: several
 * components read it (header toggle, contribution graph), and independent
 * copies would drift out of sync the moment one of them toggled.
 */
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(resolveInitialTheme);

    useEffect(() => {
        applyTheme(theme);
        writeString(STORAGE_KEYS.theme, theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme((current) => (current === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK));
    }, []);

    const value = useMemo(
        () => ({ theme, setTheme, toggleTheme, isDark: theme === THEMES.DARK }),
        [theme, toggleTheme],
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
