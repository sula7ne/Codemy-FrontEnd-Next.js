import { authApi } from "@/state/api/authApi";
import { jwtDecode } from "jwt-decode";
import { useMemo } from "react";

enum UserType {
    USER,
    ADMIN
}

interface TokenPayloadDto {
    id: string;
    type: UserType;
}

export const useAuth = () => {
    const { data, isLoading, isFetching } = authApi.useCheckAuthQuery();

    return useMemo(() => {
        const accessToken = data?.accessToken;
        let user = null;

        if (accessToken) {
            try {
                user = jwtDecode<TokenPayloadDto>(accessToken);
            } catch (e) {
                console.error("Ошибка декодирования токена:", e);
            }
        }

        return {
            isAuth: !!accessToken,
            user,
            isAuthLoading: isLoading || isFetching,
        };
    }, [data, isLoading, isFetching]);
};