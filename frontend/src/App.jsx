import './App.css'
import Home from "./homePage/Home.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AllProjects from "./projectsPage/AllProjects.jsx";
import Bar from "./components/navbar/Bar.jsx";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },{
        path: "/projects",
        element: <AllProjects />,
    }
])

function App() {
  return (
      <div className="min-h-screen bg-[#000000] text-slate-200 overflow-x-hidden ">
          {/*<Home/>*/}
          <div className="flex flex-col justify-center items-center full z-2">
              <Bar/>
          </div>

          <RouterProvider router={appRouter}/>
      </div>
  );
}

export default App
