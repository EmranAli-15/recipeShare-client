import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (data) => ({
                url: '/api/auth/register',
                body: data,
                method: 'POST'
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    localStorage.setItem("auth", JSON.stringify(
                        {
                            name: result.data.data.name,
                            email: result.data.data.email,
                            photo: result.data.data?.photo,
                            role: result.data.data.role,
                            userId: result.data.data._id,
                        }
                    ));
                } catch (error) { }
            }
        }),
        loginUser: builder.mutation({
            query: (data) => ({
                url: '/api/auth/login',
                body: data,
                method: 'POST',
                
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    localStorage.setItem("auth", JSON.stringify(
                        {
                            name: result.data.data.name,
                            email: result.data.data.email,
                            photo: result.data.data?.photo,
                            role: result.data.data.role,
                            userId: result.data.data._id,
                        }
                    ));
                } catch (error) { }
            }
        })
    })
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;