import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userOfTheRecipe: {}
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {}
});

export default userSlice.reducer;
export const { } = userSlice.actions;