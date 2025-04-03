import {createSlice} from "@reduxjs/toolkit";

const userLoginSlice = createSlice({
    name: "dataSlice",
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        changeLoggedInStatus: (state,action) => {
            state.isLoggedIn = action.payload;
        }
    },

})
export const {changeLoggedInStatus} = userLoginSlice.actions;
export default userLoginSlice.reducer ;