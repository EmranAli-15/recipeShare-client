import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    myTotalRecipe: 0
};

const recipeSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        myTotalRecipe: (state, action) => {
            state.myTotalRecipe = action.payload.totalRecipes
        },
    }
});

export default recipeSlice.reducer;
export const { myTotalRecipe } = recipeSlice.actions;