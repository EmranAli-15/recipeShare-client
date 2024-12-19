import { createSlice } from "@reduxjs/toolkit";
type TRecipe = {
    category: string;
}

const initialState = {
    myTotalRecipe: 0,
    moreScheduleRecipes: <TRecipe | any>[],
    loadMoreRecipes: <TRecipe | any>[],
};

const recipeSlice = createSlice({
    name: "recipe",
    initialState: initialState,
    reducers: {
        myTotalRecipe: (state, action) => {
            state.myTotalRecipe = action.payload.totalRecipes
        },
        moreScheduleRecipes: (state, action) => {
            state.moreScheduleRecipes = [...state.moreScheduleRecipes, ...action.payload.data] as any
        },
        loadMoreRecipes: (state, action) => {
            state.loadMoreRecipes = [...state.loadMoreRecipes, ...action.payload.data] as any
        }
    }
});

export default recipeSlice.reducer;
export const {
    myTotalRecipe,
    moreScheduleRecipes,
    loadMoreRecipes } = recipeSlice.actions;