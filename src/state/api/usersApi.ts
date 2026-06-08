import { User } from "@/types/users";
import { authApi } from "./authApi";

export const usersApi = authApi.injectEndpoints({
    endpoints: (build) => ({
        getMe: build.query<User, void>({
            query: () => ({
                url: '/users/me'
            }),
            providesTags: [
                { type: 'User', id: 'ME' },
            ],
        }),
        getUserById: build.query<User, string>({
            query: (id) => ({
                url: `/users/${id}`
            }),
            providesTags: (result, error, id) => [
                { type: 'User', id },
            ],
        }),
    })
});

export const { 
    useGetMeQuery,
    useGetUserByIdQuery
} = usersApi;
