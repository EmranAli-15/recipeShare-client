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
            query: ({ lastFetchedId, limit }) => ({
                url: `/api/recipe/getCategoryRecipes?lastFetchedId=${lastFetchedId}&limit=${limit}}`,
                method: 'GET'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(loadMoreRecipes(result.data));
                } catch (error) {
                    dispatch(loadMoreRecipes([]));
                }
            }
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
    useGetMoreCategoryRecipesQuery
} = recipeApi;