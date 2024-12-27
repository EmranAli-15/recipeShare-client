import { BaseQueryApi, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://foodrecipe-server.vercel.app',
    prepareHeaders: (headers, { }) => {
        return headers;
    },
    credentials: "include"
})

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: async (args: any, api: BaseQueryApi, extraOptions: Record<string, unknown>) => {
        let result = await baseQuery(args, api, extraOptions);

        return result
    },
    endpoints: () => ({}),
    tagTypes: ["userProfile", "myRecipe"],
});

export const { }: any = baseApi
