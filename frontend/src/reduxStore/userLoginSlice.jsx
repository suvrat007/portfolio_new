import {createSlice} from "@reduxjs/toolkit";

const userLoginSlice = createSlice({
    name: "dataSlice",
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        changeLoggedInStatus: (state) => {
            state.isLoggedIn = !state.loggedIn;
        }
    },

})
export const {changeLoggedInStatus} = userLoginSlice.actions;
export default userLoginSlice.reducer ;