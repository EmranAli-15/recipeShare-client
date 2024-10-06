import { BaseQueryApi, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { error } from 'console';
// import { RootState } from '../store';
// import type { RootState } from '../store'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    prepareHeaders: (headers, { }) => {
        const auth = localStorage?.getItem("auth");
        let token;

        if (auth) {
            const accessToken = JSON.parse(auth);
            token = accessToken.accessToken;
        }

        // const token = (getState() as RootState)?.auth?.accessToken;

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        };

        return headers;
    },
})

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: async (args: any, api: BaseQueryApi, extraOptions: Record<string, unknown>) => {
        let result = await baseQuery(args, api, extraOptions);

        // if (result.error) {
        //     if ('data' in error) {
        //         // you can access all properties of `FetchBaseQueryError` here
        //         const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
        //         // 3) We're left with the 3rd case, SerializedError:
        //     }
        // }


        return result
    },
    endpoints: () => ({}),
});

export const { }: any = baseApi
