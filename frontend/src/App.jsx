import "./App.css";
import { RouterProvider } from "react-router-dom";
import appRouter from "./appRouter.jsx";
import {BackgroundGradientAnimation} from "./components/ui/background-gradient-animation.jsx";  // Import router separately

const clearLocalStorage = () => {
    localStorage.clear();
}

function App() {
    return (
        <BackgroundGradientAnimation
            className="min-h-screen overflow-y-auto"
        >
            <div className="text-slate-200 overflow-auto">
                {clearLocalStorage()}
                <RouterProvider router={appRouter} />
            </div>
        </BackgroundGradientAnimation>
    );
}

export default App;