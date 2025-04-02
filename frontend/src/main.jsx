import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {Provider} from "react-redux";
import store from "../src/reduxStore/store.jsx";
createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>

);
