import { User } from "@/types/users";
import { authApi } from "./authApi";

export const usersApi = authApi.injectEndpoints({
    endpoints: (build) => ({
        getMe: build.query<User, void>({
            query: () => ({
                url: '/users/me'
            })
        }),
        getUserById: build.query<User, string>({
            query: (id) => ({
                url: `/users/${id}`
            })
        }),
    })
});

// Don't forget about tags

export const { 
    useGetMeQuery,
    useGetUserByIdQuery
} = usersApi;