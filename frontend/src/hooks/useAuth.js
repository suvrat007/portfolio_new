import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { clearError, login, logout } from "../store/authSlice";

/** Admin session state and the actions that change it. */
export const useAuth = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user, status, error } = useSelector((state) => state.auth);

    const signIn = useCallback(
        (credentials) => dispatch(login(credentials)).unwrap(),
        [dispatch],
    );

    const signOut = useCallback(() => dispatch(logout()), [dispatch]);
    const dismissError = useCallback(() => dispatch(clearError()), [dispatch]);

    return {
        isAuthenticated,
        user,
        error,
        isSubmitting: status === "loading",
        signIn,
        signOut,
        dismissError,
    };
};
