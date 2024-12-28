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
                    const { name, email, photo, role, _id } = result.data.data.createUser || {};
                    const accessToken = result.data.data.accessToken;

                    localStorage.setItem("auth", JSON.stringify({ name: name, email: email, photo: photo, role: role, userId: _id, }));
                    localStorage.setItem("accessToken", accessToken);
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
                    const { name, email, photo, role, _id } = result.data.data.isUserExist || {};
                    const accessToken = result.data.data.accessToken;

                    localStorage.setItem("auth", JSON.stringify({ name: name, email: email, photo: photo, role: role, userId: _id, }));
                    localStorage.setItem("accessToken", accessToken);
                } catch (error) { }
            }
        })
    })
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;