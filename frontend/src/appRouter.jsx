import { createBrowserRouter } from "react-router-dom";
import Home from "./homePage/Home.jsx";
import AllProjects from "./projectsPage/AllProjects.jsx";
import Login from "./login/Login.jsx";
import Layout from "./utils/Layout.jsx";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            { path: "/", element: <Home /> },
            { path: "/projects", element: <AllProjects /> },
            { path: "/login", element: <Login /> },
        ]
    },
]);

export default appRouter;
