import { baseApi } from "../../api/baseApi";

const aiRecipeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        generateAiRecipe: builder.mutation({
            query: (data) => ({
                url: '/api/aiRecipe/generateAiRecipe',
                body: data,
                method: 'POST'
            })
        })
    })
});

export const {
    useGenerateAiRecipeMutation
} = aiRecipeApi;