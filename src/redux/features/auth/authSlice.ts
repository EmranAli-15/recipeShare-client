import { logOutUser } from "@/services/auth/auth";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        userLoggedOut: () => {
            logOutUser();
            localStorage.removeItem("accessToken");
            localStorage.removeItem("accessToken");
        },
    }
});

export default authSlice.reducer;
export const { userLoggedOut } = authSlice.actions;