import { baseApi } from "@/redux/api/baseApi";

const recipeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateUser: builder.mutation({
            query: ({ data, id }) => ({
                url: `/api/user/updateUser/${id}`,
                body: data,
                method: 'PATCH',
            }),
            invalidatesTags: ["userProfile"]
        }),
        myProfile: builder.query({
            query: (id) => ({
                url: `/api/auth/myProfile/${id}`,
                method: 'GET',
            }),
            providesTags: ["userProfile"],
            transformResponse(response: any) {
                return response.data
            }
        })
    })
});

export const { useUpdateUserMutation, useMyProfileQuery } = recipeApi;