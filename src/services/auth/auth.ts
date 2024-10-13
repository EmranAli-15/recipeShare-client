"use server"

import { jwtDecode } from "jwt-decode";
import { cookies } from 'next/headers';


export const registerUser = async (token: any) => {
    cookies().set("accessToken", token);
};

export const loginUser = async (token: any) => {
    cookies().set("accessToken", token);
};


export const getCurrentUser = async () => {
    let decodedToken = null;
    const authToken = cookies().get("accessToken")?.value;

    if (authToken) {
        decodedToken = await jwtDecode(authToken);
        return ({
            photo: decodedToken.photo,
            email: decodedToken.email,
            role: decodedToken.role,
            userId: decodedToken.userId
        })
    } else {
        return decodedToken;
    }
};

export const logOutUser = async () => {
    cookies().delete("accessToken");
}