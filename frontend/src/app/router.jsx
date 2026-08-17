import { createBrowserRouter } from "react-router-dom";

import { ROUTES } from "../constants/site";
import { SiteLayout } from "../features/layout/SiteLayout";
import AdminPage from "../pages/AdminPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import WorkPage from "../pages/WorkPage";

export const router = createBrowserRouter([
    {
        path: ROUTES.home,
        element: <SiteLayout />,
        errorElement: <NotFoundPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: ROUTES.work, element: <WorkPage /> },
            { path: ROUTES.admin, element: <AdminPage /> },
            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);

export default router;
