import {configureStore} from "@reduxjs/toolkit";
import userLoginSlice from "./userLoginSlice.jsx";

const store = configureStore({
    reducer: {
        loggedIn:userLoginSlice,
    },
});
export default store;