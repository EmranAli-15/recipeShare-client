import { getCurrentUser } from "@/services/auth/auth";
import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type TAuthContext = {
    user: any;
    userLoading: boolean;
    setUser: (user: any) => void;
    setUserLoading: (userLoading: boolean) => void;
}

export const authContext = createContext<TAuthContext | undefined>(undefined);

const ContextProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<any | null>(null);
    const [userLoading, setUserLoading] = useState(true);

    const handleUser = async (currentUser: any) => {
        setUser(currentUser);
        setUserLoading(false);
    }

    const getUserFromCookie = async () => {
        const token = await getCurrentUser();
        if (token) {
            localStorage.setItem("accessToken", token.token);
            setUserLoading(true);
        }
        return;
    }

    useEffect(() => {
        if (!user && userLoading) {
            getUserFromCookie();
        }

        let userData = null;
        const token = localStorage.getItem("accessToken");
        if (token) {
            const decoded = jwtDecode(token);
            userData = decoded;
        }
        handleUser(userData);
    }, [userLoading])


    const authInfo = {
        user,
        userLoading,
        setUser,
        setUserLoading,
    }

    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export default ContextProvider;

export const useUser = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error("The component not inside the context provider");
    };
    return context;
};