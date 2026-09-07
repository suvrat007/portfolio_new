import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import { warmUpApi } from "./lib/apiClient";
import { store } from "./store";
import "./styles/index.css";

// Fired before React mounts. Render's free tier spins the API down after
// inactivity, so the wake-up starts during first paint rather than after it.
warmUpApi();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
);
