import { baseApi } from "@/redux/api/baseApi";

const recipeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createRecipe: builder.mutation({
            query: (data) => ({
                url: '/api/recipe/createRecipe',
                body: data,
                method: 'POST',
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
    })
});

export const {
    useCreateRecipeMutation,
    useGetMyRecipesQuery,
    useGetSingleRecipeForUpdateQuery,
    useUpdateRecipeMutation,
    useCreateACommentMutation
} = recipeApi;