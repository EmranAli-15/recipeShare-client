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

        getMyRecipes: builder.query({
            query: (id) => ({
                url: `/api/recipe/getMyRecipe/${id}`,
                method: 'GET',
            }),
            transformResponse(response: any) {
                return response.data
            },
        })
    })
});

export const { useCreateRecipeMutation, useGetMyRecipesQuery } = recipeApi;