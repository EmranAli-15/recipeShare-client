
import { getCurrentUser } from "@/services/auth/auth";
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

    const handleUser = async () => {
        const currentUser = await getCurrentUser();

        setUser(currentUser);
        setUserLoading(false)
    }

    // useEffect(() => {
    //     let user = null

    //     const data = localStorage.getItem("auth");
    //     if (data) {
    //         const parsed = JSON.parse(data);
    //         user = {
    //             email: parsed.user.email,
    //             name: parsed.user.name,
    //             photo: parsed.user.photo,
    //             role: parsed.user.role,
    //             userId: parsed.user.userId,
    //         }
    //     }

    //     setUser(user)
    // }, [])

    useEffect(() => {
        handleUser();
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