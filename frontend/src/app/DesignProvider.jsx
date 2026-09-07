import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import {
    DEFAULT_DESIGN,
    DESIGN_IDS,
    DESIGN_META,
    isDesignId,
} from "../constants/design";
import { DESIGN_STORAGE_KEY } from "../constants/storage";
import { readString, writeString } from "../lib/storage";

const DesignContext = createContext(null);

/**
 * Stamped on <html> so the stylesheet can select tokens per design, the same
 * way data-theme works. Mirrored by the inline script in index.html so the
 * first paint is already correct.
 */
const applyDesign = (design) => {
    document.documentElement.dataset.design = design;
};

const resolveInitialDesign = () => {
    const stored = readString(DESIGN_STORAGE_KEY);
    return isDesignId(stored) ? stored : DEFAULT_DESIGN;
};

/**
 * Owns which design system is active.
 *
 * Kept in context rather than in a hook's local state: the header switch, the
 * layout and the router all read it, and independent copies would drift apart
 * the moment one of them toggled.
 */
export const DesignProvider = ({ children }) => {
    const [design, setDesign] = useState(resolveInitialDesign);

    useEffect(() => {
        applyDesign(design);
        writeString(DESIGN_STORAGE_KEY, design);
    }, [design]);

    const toggleDesign = useCallback(() => {
        setDesign((current) =>
            current === DESIGN_IDS.PLAIN ? DESIGN_IDS.EDITORIAL : DESIGN_IDS.PLAIN,
        );
    }, []);

    const value = useMemo(
        () => ({
            design,
            meta: DESIGN_META[design],
            setDesign,
            toggleDesign,
            isPlain: design === DESIGN_IDS.PLAIN,
            isEditorial: design === DESIGN_IDS.EDITORIAL,
        }),
        [design, toggleDesign],
    );

    return <DesignContext.Provider value={value}>{children}</DesignContext.Provider>;
};

export const useDesign = () => {
    const context = useContext(DesignContext);
    if (!context) throw new Error("useDesign must be used within a DesignProvider");
    return context;
};
