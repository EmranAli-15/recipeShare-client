import { baseApi } from "@/redux/api/baseApi";
import { moreRecipes } from "./recipeSlice";

const recipeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createRecipe: builder.mutation({
            query: (data) => ({
                url: '/api/recipe/createRecipe',
                body: data,
                method: 'POST',
            })
        }),

        getMoreCategoryRecipes: builder.mutation({
            query: ({ category, lastFetchedId, limit }) => ({
                url: `/api/recipe/getCategoryRecipes?lastFetchedId=${lastFetchedId}&limit=${limit}&category=${category}`,
                method: 'GET'
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const result = await queryFulfilled;
                    dispatch(moreRecipes(result.data));
                    
                } catch (error) {
                    dispatch(moreRecipes([]));
                }
            },
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
    useCreateRecipeMutation,
    useGetMyRecipesQuery,
    useGetSingleRecipeForUpdateQuery,
    useUpdateRecipeMutation,
    useCreateACommentMutation,
    useUpdateLikeMutation,
    useGetMoreCategoryRecipesMutation
} = recipeApi;