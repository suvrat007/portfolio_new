import { DESIGN_IDS, DESIGN_META } from "../../constants/design";
import { SiteLayout } from "./layout/SiteLayout";
import HomePage from "./pages/HomePage";
import WorkPage from "./pages/WorkPage";

/**
 * The editorial design system: the designed presentation, opt-in from the
 * header. Same contract as every other design system.
 */
export const editorialDesign = {
    ...DESIGN_META[DESIGN_IDS.EDITORIAL],
    Layout: SiteLayout,
    routes: {
        home: HomePage,
        work: WorkPage,
    },
};

export default editorialDesign;
