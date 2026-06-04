import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { loginDtoType, registerDtoType } from '@/schemas/auth.schema';

//3000
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

let tokenInMemory: string | null = null;

export const setToken = (token: string | null) => {
    tokenInMemory = token;
};

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
        if (tokenInMemory) {
            headers.set('authorization', `Bearer ${tokenInMemory}`);
        }
        return headers;
    },
});


const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
    const currentUrl = typeof args === 'string' ? args : args.url;

    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        if (currentUrl === '/auth/refresh') {
            setToken(null);
            return result;
        }

        const refreshResult = await baseQuery({ 
            url: '/auth/refresh', 
            method: 'POST' 
        }, api, extraOptions);

        if (refreshResult.data) {
            const data = refreshResult.data as { accessToken: string };
            
            setToken(data.accessToken);
            
            result = await baseQuery(args, api, extraOptions);
        } else {
            setToken(null);
        }
    }
    
    return result;
};

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (build) => ({
        login: build.mutation<_, loginDtoType>({
            query: (userData) => ({
                url: '/auth/login',
                method: 'POST',
                body: userData,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    
                    setToken(data.accessToken);

                    dispatch(authApi.util.upsertQueryData('checkAuth', undefined, { 
                        accessToken: data.accessToken 
                    }));
                } catch (err) {
                    console.error('Login failed:', err);
                }
            },
        }),
        register: build.mutation<_, registerDtoType>({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    
                    setToken(data.accessToken);

                    dispatch(authApi.util.upsertQueryData('checkAuth', undefined, { 
                        accessToken: data.accessToken 
                    }));
                } catch (err) {
                    console.error('Registration failed:', err);
                }
            },
        }),
        logout: build.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    
                    setToken(null);

                    dispatch(authApi.util.upsertQueryData('checkAuth', undefined, { accessToken: '' }));
                } catch (err) {
                    console.error('Logout failed:', err);
                }
            },
        }),
        checkAuth: build.query<{ accessToken: string }, void>({
            query: () => ({
                url: '/auth/refresh',
                method: 'POST',
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    
                    setToken(data.accessToken);
                } catch {
                    setToken(null); 
                }
            },
        }),
    }),
});

export const { 
    useLoginMutation, 
    useRegisterMutation, 
    useLogoutMutation,
    useCheckAuthQuery
} = authApi;