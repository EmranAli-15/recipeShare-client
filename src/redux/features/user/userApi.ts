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
        }),
        updateFollowing: builder.mutation({
            query: (data) => ({
                url: `/api/user/updateFollowing`,
                body: data,
                method: 'PATCH',
            }),
        }),
        anyUserProfile: builder.query({
            query: (id) => ({
                url: `/api/user/anyUserProfile/${id}`,
                method: 'GET',
            }),
            transformResponse(response: any) {
                return response.data
            }
        }),
        updateUserPassword: builder.mutation({
            query: (data) => ({
                url: `/api/user/updatePassword`,
                method: 'POST',
                body: data
            }),
            transformResponse(response: any) {
                return response.data
            }
        }),
    })
});

export const {
    useUpdateUserMutation,
    useMyProfileQuery,
    useUpdateFollowingMutation,
    useAnyUserProfileQuery,
    useUpdateUserPasswordMutation
} = recipeApi;