import { baseApi } from "@/redux/api/baseApi";
import { loadMoreRecipes, moreScheduleRecipes } from "./recipeSlice";

export const recipeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createRecipe: builder.mutation({
            query: (data) => ({
                url: '/api/recipe/createRecipe',
                body: data,
                method: 'POST',
            })
        }),

        getRecipes: builder.query({
            query: ({ page, limit }) => ({
                url: `/api/recipe/getRecipes?page=${page}&limit=${limit}`,
                method: 'GET'
            })
        }),

        getMoreCategoryRecipes: builder.query({
            query: ({ category, lastFetchedId, limit }) => ({
                url: `/api/recipe/getCategoryRecipes?lastFetchedId=${lastFetchedId}&limit=${limit}&category=${category}`,
                method: 'GET'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(moreScheduleRecipes(result.data));
                } catch (error) {
                    dispatch(moreScheduleRecipes([]));
                }
            }
        }),

        searchRecipes: builder.query({
            query: ({ searchItem: searchParams, limit, lastFetchedId }) => ({
                url: `/api/recipe/searchRecipes?search=${searchParams}&limit=${limit}&lastFetchedId=${lastFetchedId}`,
                method: 'GET'
            })
        }),

        updateRecipe: builder.mutation({
            query: ({ data, recipeID }) => ({
                url: `/api/recipe/updateRecipe/${recipeID}`,
                body: data,
                method: 'PATCH',
            }),
            invalidatesTags: ["myRecipe"]
        }),

        getMyRecipes: builder.query({
            query: (id) => ({
                url: `/api/recipe/getMyRecipe/${id}`,
                method: 'GET',
            }),
            transformResponse(response: any) {
                return response.data
            },
            providesTags: ["myRecipe"]
        }),

        getSingleRecipeForUpdate: builder.query({
            query: (id) => ({
                url: `/api/recipe/getSingleRecipe/${id}`,
                method: 'GET',
            }),
            transformResponse(response: any) {
                return response.data
            },
        }),

        createAComment: builder.mutation({
            query: ({ comment, recipeId }) => ({
                url: `/api/recipe/pasteComment/${recipeId}`,
                body: comment,
                method: 'PATCH',
            })
        }),

        updateLike: builder.mutation({
            query: ({ like, recipeId }) => ({
                url: `/api/recipe/updateLike/${recipeId}`,
                body: like,
                method: 'PATCH',
            })
        }),
    })
});

export const {
    useGetRecipesQuery,
    useCreateRecipeMutation,
    useGetMyRecipesQuery,
    useGetSingleRecipeForUpdateQuery,
    useUpdateRecipeMutation,
    useCreateACommentMutation,
    useUpdateLikeMutation,
    useGetMoreCategoryRecipesQuery,
    useSearchRecipesQuery
} = recipeApi;