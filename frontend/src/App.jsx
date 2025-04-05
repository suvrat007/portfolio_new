import "./App.css";
import { RouterProvider } from "react-router-dom";
import appRouter from "./appRouter.jsx";  // Import router separately

const clearLocalStorage = () => {
    localStorage.clear();
}

function App() {
    return (
        <div className="min-h-screen bg-[#000000] text-slate-200 overflow-x-hidden">
            {clearLocalStorage()}
            <RouterProvider router={appRouter} />
        </div>
    );
}

export default App;
