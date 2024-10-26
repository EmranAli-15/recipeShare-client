"use client"

import { useUser } from "@/contextProvider/ContextProvider";
import { useMyProfileQuery } from "@/redux/features/auth/authApi";
import Error from "@/ui/Error/Error";
import { User } from "@/ui/icons/Icons";
import CommonLoader from "@/ui/loader/CommonLoader";
import Image from "next/image";
import { useEffect } from "react";

import './styles.module.css'

const myProfilePage = () => {
    const { user } = useUser();
    const { userId } = user || {};

    const { data: myProfile, isError, isLoading, isSuccess } = useMyProfileQuery(userId);

    useEffect(() => {
        if (isSuccess) {
            console.log(myProfile);

        }
    }, [isError, isLoading, isSuccess])

    let content = null;

    if (isLoading) {
        content = <CommonLoader></CommonLoader>
    } else if (!isLoading && isError) {
        content = <Error heading="Something went wrong!" description="There wan an unknown error. Please try agin!"></Error>
    } else if (!isLoading && !isError && isError) {
        content
    }

    return (
        <div className="max-w-5xl mx-auto px-2 md:px-0">
            <div className="flex items-end gap-x-2 mb-5">
                <div>
                    {
                        myProfile?.photo ?
                            <Image alt={myProfile.name} height={80} width={80} src={myProfile?.photo}></Image> :
                            <div className="inline-block border rounded-full p-2">
                                <User w={80}></User>
                            </div>
                    }
                </div>
                <div className="mb-3">
                    <h1 className="text-2xl font-semibold pb-2">{myProfile?.name}</h1>
                    <h1 className="">Followers : {myProfile?.followers}</h1>
                </div>
            </div>
            <div className="grid md:grid-cols-2">
                <div>
                    <div className="mt-1">
                        <div className="flex items-center justify-between">
                            <p className="text-xl font-semibold">Experience</p>
                            <p className="cursor-pointer text-blue-600 font-semibold">edit</p>
                        </div>
                        <p className="text-gray-500">More about 36 years : {myProfile?.experience}</p>
                    </div>

                    <hr className="mt-5" />

                    <div className="mt-1">
                        <p className="text-xl font-semibold">Total Recipes</p>
                        <p className="text-gray-500">58+ {myProfile?.experience}</p>
                    </div>

                    <hr className="mt-5" />

                    <div className="mt-1">
                        <div className="flex items-start justify-between">
                            <p className="text-xl font-semibold">Bio</p>
                            <p className="cursor-pointer text-blue-600 font-semibold">edit</p>
                        </div>
                        <p className="text-justify mt-2 text-gray-500">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus minus minima ipsum velit iure. Quasi nam quaerat consequatur molestias recusandae aperiam quo nostrum magnam corrupti quis explicabo libero, odit unde totam nisi! Fugiat, ad dolor. Neque ratione reiciendis pariatur cum quisquam iusto ad qui nesciunt voluptatibus dolores, nostrum quasi accusantium.</p>
                    </div>

                    <hr className="my-2" />
                </div>
                <div className="md:mx-auto">
                    <p className="text-xl font-semibold mb-5">Following</p>
                    <div className="scrollBar grid grid-cols-3 md:gap-x-20 gap-y-3 h-[300px] overflow-y-scroll">
                        {
                            Array(20).fill(null).map(da => {
                                return <div>
                                    <div className="flex justify-center">
                                        {
                                            myProfile?.photo ?
                                                <Image alt={myProfile.name} height={30} width={30} src={myProfile?.photo}></Image> :
                                                <div className="inline-block border-4 border-gray-200 rounded-full p-2">
                                                    <User w={30}></User>
                                                </div>
                                        }
                                    </div>
                                    <div className="">
                                        <h1 className="text-center">{myProfile?.name.slice(0, 10)}</h1>
                                        <h1 className="text-sm text-center text-gray-500">Followers : {myProfile?.followers}</h1>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default myProfilePage;