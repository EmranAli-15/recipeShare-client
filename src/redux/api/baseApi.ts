import { BaseQueryApi, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://foodrecipe-psi.vercel.app',
    credentials: "include",
    prepareHeaders: (headers, { }) => {
        return headers;
    }
})

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: async (args: any, api: BaseQueryApi, extraOptions: Record<string, unknown>) => {
        let result = await baseQuery(args, api, extraOptions);

        return result
    },
    endpoints: () => ({}),
    tagTypes: ["userProfile", "myRecipe"]
});

export const { }: any = baseApi
