import { setCookieToBrowser } from "@/services/auth/auth";
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
                    const accessToken = result.data.data;

                    localStorage.setItem("accessToken", accessToken);
                    setCookieToBrowser(accessToken);
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
                    const accessToken = result.data.data;

                    localStorage.setItem("accessToken", accessToken);
                    setCookieToBrowser(accessToken);
                } catch (error) { }
            }
        }),

        getOTP: builder.mutation({
            query: (email) => (
                {
                    url: '/api/auth/getOTP',
                    body: email,
                    method: 'POST',
                }
            )
        }),

        setForgotPassword: builder.mutation({
            query: (data) => ({
                url: '/api/auth/setForgotPassword',
                body: data,
                method: 'POST',
            })
        })
    })
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useGetOTPMutation,
    useSetForgotPasswordMutation
} = authApi;