import { createSlice } from "@reduxjs/toolkit";

type TUser = {
    name: string;
    email: string;
    role: string;
};

type TAuth = {
    user: TUser | undefined;
    accessToken: string | undefined;
}

const initialState: TAuth = {
    user: undefined,
    accessToken: undefined
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.user = action.payload.data;
            state.accessToken = action.payload.token;
        },
        userLoggedOut: (state) => {
            state.user = undefined;
            state.accessToken = undefined;
            localStorage.removeItem("auth");

        },
    }
});

export default authSlice.reducer;
export const { userLoggedIn, userLoggedOut } = authSlice.actions;