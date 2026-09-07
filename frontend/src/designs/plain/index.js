import { DESIGN_IDS, DESIGN_META } from "../../constants/design";
import { PlainLayout } from "./layout/PlainLayout";
import PlainHome from "./pages/PlainHome";
import PlainWork from "./pages/PlainWork";

/**
 * The plain design system.
 *
 * Conforms to the shape every design system must export: a Layout that renders
 * an <Outlet />, plus one component per public route. Data comes from the
 * shared selectors, never from here.
 */
export const plainDesign = {
    ...DESIGN_META[DESIGN_IDS.PLAIN],
    Layout: PlainLayout,
    routes: {
        home: PlainHome,
        work: PlainWork,
    },
};

export default plainDesign;
