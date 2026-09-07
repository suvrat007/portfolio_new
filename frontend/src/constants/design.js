/**
 * The two design systems the site ships.
 *
 * `plain` is what a visitor gets by default: a single-column document layout,
 * flat surfaces, almost no motion. `editorial` is the designed presentation,
 * opt-in from the header.
 *
 * Both render the same content from the same selectors. A design system owns
 * presentation only; it never owns data.
 */
export const DESIGN_IDS = {
    PLAIN: "plain",
    EDITORIAL: "editorial",
};

export const DEFAULT_DESIGN = DESIGN_IDS.PLAIN;

export const DESIGN_META = {
    [DESIGN_IDS.PLAIN]: {
        id: DESIGN_IDS.PLAIN,
        name: "Plain",
        /** Label on the control that switches away from this design. */
        switchLabel: "Add design",
        description: "The straightforward version. Content first, no ornament.",
    },
    [DESIGN_IDS.EDITORIAL]: {
        id: DESIGN_IDS.EDITORIAL,
        name: "Editorial",
        switchLabel: "Plain version",
        description: "The designed version: editorial typography and motion.",
    },
};

export const isDesignId = (value) => Object.values(DESIGN_IDS).includes(value);
