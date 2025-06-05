"use client"

import { FormEvent, useEffect, useState } from "react";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useUser } from "@/contextProvider/ContextProvider";

import CommonLoader from "@/ui/loader/CommonLoader";
import Link from "next/link";
import Google from "@/components/googleSignIn/Google";

const LoginPage = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { setUserLoading } = useUser()

    const router = useRouter();

    const [loginUser, { data, isLoading, error: resError, isSuccess }] = useLoginUserMutation();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError("");
        const data = { email, password };
        loginUser(data);
    };

    useEffect(() => {
        if (isSuccess) {
            setUserLoading(true);
            router.push("/");
        }
        if (resError) {
            if ('data' in resError) {
                const error = resError as any;
                setError(error.data?.message)
            } else {
                setError("Something went wrong!");
            }
        }
    }, [isLoading, resError, isSuccess])

    return (
        <div className="font-[sans-serif]">
            {isLoading && <CommonLoader></CommonLoader>}
            <div className="flex flex-col items-center justify-center">
                <div className="flex justify-center items-center w-full md:max-w-md p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
                    <div className="md:max-w-md w-full px-4 py-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-12">
                                <h3 className="text-gray-800 text-3xl font-extrabold">Sign in</h3>
                                <p className="text-sm mt-4 text-gray-800">Don't have an account <Link href="/register" className="myTextColor font-semibold hover:underline ml-1 whitespace-nowrap">Register here</Link></p>
                            </div>

                            {error && <h1 className="text-center text-red-600">{error}</h1>}

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                                <div className="relative flex items-center">
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        type="email"
                                        required
                                        className="myInput"
                                        placeholder="Enter email" />
                                </div>
                            </div>

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                                <div className="relative flex items-center">
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        type="password"
                                        required
                                        className="myInput"
                                        placeholder="Enter password" />
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                                <Link href="/forgotPassword" className="flex items-center text-blue-600">
                                    Forgot password?
                                </Link>
                            </div>

                            <div className="mt-12">
                                <button type="submit" className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white myBtn focus:outline-none">
                                    Sign in
                                </button>
                            </div>

                        </form>
                        <div>
                            <Google></Google>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;