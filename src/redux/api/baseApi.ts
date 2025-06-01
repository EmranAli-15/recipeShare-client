import { BaseQueryApi, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_URL = 'http://localhost:5000';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { }) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            headers.set("accessToken", accessToken);
        };

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
    tagTypes: ["userProfile", "myRecipe"],
});

export const { }: any = baseApi
