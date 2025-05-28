"use server"

import { jwtDecode } from "jwt-decode";
import { cookies } from 'next/headers';

export const getCurrentUser = async () => {
    let decodedToken = null;
    const authToken = cookies().get("accessToken")?.value;

    if (authToken) {
        decodedToken = await jwtDecode(authToken);
        return ({
            name: decodedToken.name,
            email: decodedToken.email,
            role: decodedToken.role,
            token: authToken
        })
    } else {
        return decodedToken;
    }
};

export const setCookieToBrowser = (data: any) => {
    cookies().set("accessToken", data);
}

export const logOutUser = async () => {
    cookies().delete("accessToken");
}