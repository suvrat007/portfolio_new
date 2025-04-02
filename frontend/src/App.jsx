import "./App.css";
import { RouterProvider } from "react-router-dom";
import appRouter from "./appRouter.jsx";  // Import router separately

function App() {
    return (
        <div className="min-h-screen bg-[#000000] text-slate-200 overflow-x-hidden">
            <RouterProvider router={appRouter} />
        </div>
    );
}

export default App;
