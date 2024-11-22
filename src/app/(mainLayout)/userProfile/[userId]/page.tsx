"use client"

import { useUser } from "@/contextProvider/ContextProvider";
import { useGetMyRecipesQuery } from "@/redux/features/recipe/recipeApi";
import { useAnyUserProfileQuery, useUpdateFollowingMutation } from "@/redux/features/user/userApi";
import Error from "@/ui/Error/Error";
import CommonLoader from "@/ui/loader/CommonLoader";
import { debounce } from "@/utils/debounce";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Page = ({ params }: { params: { userId: string } }) => {
    const [isFollow, setIsFollow] = useState(false);
    const [moreInfo, serMoreInfo] = useState(false);

    const { user: loggedInUser } = useUser() || {};
    const { email: myEmail, userId: myId } = loggedInUser || {};

    const { data: userData, isLoading, isError, isSuccess } = useAnyUserProfileQuery(params?.userId);
    const { photo, _id, name, email, followers } = userData || {}



    const { data: recipes, isLoading: isRecipesLoading, isError: isRecipesError, isSuccess: isRecipesSuccess } = useGetMyRecipesQuery(params?.userId);



    useEffect(() => {
        const isMyIdExist = followers?.find((personId: any) => personId?.toString() == myId);
        if (isMyIdExist) {
            setIsFollow(true);
        };
    }, [myId, userData]);

    const [updateFollowing, { }] = useUpdateFollowingMutation();

    const handleUpdateFollower = () => {
        if (!myEmail) {
            return toast.error("Please Login");
        } else {
            const callTheDebounce = () => {
                updateFollowing({ id: _id, isFollow });
            }
            setIsFollow(!isFollow);
            debounce(callTheDebounce, 1000);
        }
    };



    let profileContent = null;
    if (isLoading) { profileContent = <CommonLoader></CommonLoader> }
    else if (!isLoading && isError) { profileContent = <Error heading="User Not Found" description="Please Try Again!"></Error> }
    else if (!isLoading && !isError && userData) {
        profileContent = <>
            <div className="flex gap-x-4 items-start md:items-end">
                <div className="w-[80px] h-[80px]">
                    <img className="w-full h-full rounded-full object-cover" src={photo} alt="" />
                </div>
                <div>
                    <h1 className="text-2xl font-semibold">{name}</h1>
                    <p className="text-gray-500">Followers : {followers.length}</p>
                </div>
            </div>

            <div className="flex items-center justify-between mt-2">
                <div className="shadow-md px-2 py-1 rounded-md">
                    <button
                        onClick={handleUpdateFollower}
                        className={`${email == myEmail && 'hidden'} text-blue-600 w-[70px] text-center active:scale-95 transition`}
                        disabled={isLoading}
                    >
                        {isFollow ? "Following" : "Follow"}
                    </button>
                </div>
                <div
                    onClick={() => serMoreInfo(!moreInfo)}
                    className="shadow-md px-2 py-1 rounded-md active:scale-95 transition">
                    More info
                </div>
            </div>
        </>
    }

    return (
        <div className="max-w-7xl mx-auto p-2">
            <Toaster toastOptions={{ duration: 1000 }}></Toaster>

            <div className="">
                <section className="md:flex items-center bg-[#fff] border rounded-md p-2">
                    {
                        profileContent
                    }
                </section>

                {/* More info */}
                <section className={`${moreInfo ? 'block' : 'hidden'} bg-[#fff] border rounded-md p-2 my-2`}>

                </section>
            </div>
        </div>
    );
};

export default Page;