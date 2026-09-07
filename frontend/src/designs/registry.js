import { DEFAULT_DESIGN, DESIGN_IDS } from "../constants/design";
import { editorialDesign } from "./editorial";
import { plainDesign } from "./plain";

/**
 * Every design system the app can render, keyed by id.
 *
 * A design system is a presentation layer only. It supplies a Layout and one
 * component per public route; content arrives through the shared hooks and
 * selectors, so adding a third design means adding a directory here and
 * nothing else.
 *
 * @typedef {object} DesignSystem
 * @property {string} id
 * @property {string} name
 * @property {string} switchLabel   Label on the control that leaves this design
 * @property {import('react').ComponentType} Layout   Must render an <Outlet />
 * @property {{ home: import('react').ComponentType, work: import('react').ComponentType }} routes
 */
export const DESIGN_SYSTEMS = {
    [DESIGN_IDS.PLAIN]: plainDesign,
    [DESIGN_IDS.EDITORIAL]: editorialDesign,
};

export const getDesignSystem = (id) =>
    DESIGN_SYSTEMS[id] ?? DESIGN_SYSTEMS[DEFAULT_DESIGN];

export const DESIGN_LIST = Object.values(DESIGN_SYSTEMS);
