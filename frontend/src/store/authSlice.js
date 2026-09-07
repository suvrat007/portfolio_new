import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ENDPOINTS } from "../constants/api";
import { STORAGE_KEYS } from "../constants/storage";
import { apiClient, toErrorMessage } from "../lib/apiClient";
import { readString, removeKey, writeString } from "../lib/storage";

export const login = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await apiClient.post(ENDPOINTS.login, credentials);
            return data;
        } catch (error) {
            return rejectWithValue(toErrorMessage(error, "Could not sign in"));
        }
    },
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        // A token in storage means the last session was authenticated; the API
        // is still the authority and will 401 if it has expired.
        isAuthenticated: Boolean(readString(STORAGE_KEYS.token)),
        user: null,
        status: "idle",
        error: null,
    },
    reducers: {
        logout(state) {
            removeKey(STORAGE_KEYS.token);
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        },
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "ready";
                state.isAuthenticated = true;
                state.user = action.payload.user ?? null;
                writeString(STORAGE_KEYS.token, action.payload.accessToken);
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "error";
                state.isAuthenticated = false;
                state.error = action.payload ?? "Could not sign in";
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
