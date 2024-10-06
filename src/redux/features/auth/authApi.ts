import { baseApi } from "../../api/baseApi";
import { userLoggedIn } from "./authSlice";

const authApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (data) => ({
                url: '/api/auth/register',
                body: data,
                method: 'POST'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                arg;
                try {
                    const result = await queryFulfilled;
                    const user = {
                        name: result.data.data.name,
                        email: result.data.data.email,
                        role: result.data.data.role,
                    }
                    const data = {
                        data: user,
                        token: result.data.token
                    };
                    dispatch(userLoggedIn(data));
                    localStorage.setItem("auth", JSON.stringify(
                        {
                            accessToken: data.token,
                            user: user
                        }
                    ));
                } catch (error) {

                }
            }
        }),
        loginUser: builder.mutation({
            query: (data) => ({
                url: '/api/auth/login',
                body: data,
                method: 'POST'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                arg;
                try {
                    const result = await queryFulfilled;
                    const user = {
                        name: result.data.data.name,
                        email: result.data.data.email,
                        role: result.data.data.role,
                    }
                    const data = {
                        data: user,
                        token: result.data.token
                    };
                    dispatch(userLoggedIn(data));
                    localStorage.setItem("auth", JSON.stringify(
                        {
                            accessToken: data.token,
                            user: user
                        }
                    ));
                } catch (error) {

                }
            }
        })
    })
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;