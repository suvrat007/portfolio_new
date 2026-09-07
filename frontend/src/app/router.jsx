import { createBrowserRouter } from "react-router-dom";

import { ROUTES } from "../constants/site";
import AdminPage from "../pages/AdminPage";
import NotFoundPage from "../pages/NotFoundPage";
import { DesignLayout, DesignRoute } from "./DesignOutlet";

/**
 * One static route tree for every design system. The layout and the public
 * pages resolve through DesignOutlet at render time, so switching design does
 * not rebuild the router.
 *
 * /admin is deliberately design-agnostic: it is a tool, not a presentation.
 */
export const router = createBrowserRouter([
    {
        path: ROUTES.home,
        element: <DesignLayout />,
        errorElement: <NotFoundPage />,
        children: [
            { index: true, element: <DesignRoute name="home" /> },
            { path: ROUTES.work, element: <DesignRoute name="work" /> },
            { path: ROUTES.admin, element: <AdminPage /> },
            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);

export default router;
