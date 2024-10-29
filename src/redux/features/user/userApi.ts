import { baseApi } from "@/redux/api/baseApi";

const recipeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateUser: builder.mutation({
            query: ({ data, id }) => ({
                url: `/api/user/updateUser/${id}`,
                body: data,
                method: 'PATCH',
            })
        }),
    })
});

export const { useUpdateUserMutation } = recipeApi;