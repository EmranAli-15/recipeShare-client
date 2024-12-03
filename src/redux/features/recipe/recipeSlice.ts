import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    myTotalRecipe: 0,
    moreRecipes: []
};

const recipeSlice = createSlice({
    name: "recipe",
    initialState: initialState,
    reducers: {
        myTotalRecipe: (state, action) => {
            state.myTotalRecipe = action.payload.totalRecipes
        },
        moreRecipes: (state, action) => {
            state.moreRecipes = [...state.moreRecipes, ...action.payload.data] as any
        }
    }
});

export default recipeSlice.reducer;
export const { myTotalRecipe, moreRecipes } = recipeSlice.actions;