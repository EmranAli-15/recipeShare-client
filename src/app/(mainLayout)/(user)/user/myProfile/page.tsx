"use client"

import { useUser } from "@/contextProvider/ContextProvider";
import { useMyProfileQuery } from "@/redux/features/auth/authApi";
import Error from "@/ui/Error/Error";
import { User } from "@/ui/icons/Icons";
import CommonLoader from "@/ui/loader/CommonLoader";
import Image from "next/image";
import { useEffect } from "react";

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
            <div>
                <div className="flex items-end gap-x-2">
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
                        <h1 className="font-sans">Followers : {myProfile?.followers}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default myProfilePage;