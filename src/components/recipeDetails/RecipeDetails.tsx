"use client"

import { useUser } from "@/contextProvider/ContextProvider";
import { useUpdateFollowingMutation } from "@/redux/features/user/userApi";
import { reFetchGetSingleRecipe } from "@/services/recipes/recipes";
import { Edit, Menu, User } from "@/ui/icons/Icons";
import Link from "next/link";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

type userType = {
    recipeId: string;
    photo: string;
    id: string;
    name: string;
    email: string;
    followers: unknown[]
}

const RecipeDetails = ({ recipeId, photo, id, name, email, followers }: userType) => {
    const { user: loggedInUser } = useUser() || {};
    const { email: myEmail, userId: myId } = loggedInUser || {};

    let isFollow = false;
    const isMyIdExist = followers?.find(personId => personId?.toString() == myId);
    if (isMyIdExist) {
        isFollow = true
    };

    const [updateFollowing, { isLoading, isSuccess }] = useUpdateFollowingMutation();

    const handleUpdateFollower = () => {
        if (!myEmail) {
            return toast.error("Please Login");
        }
        updateFollowing({ id, isFollow });
    };

    useEffect(() => {
        if (isSuccess) {
            reFetchGetSingleRecipe();
        }
    }, [isSuccess])

console.log(isFollow);


    return (
        <div className="bg-[#fff] p-2 rounded-md flex items-center gap-x-3">
            <Toaster toastOptions={{ duration: 1000 }}></Toaster>
            <div>
                {
                    photo ? <img className="size-12 rounded-full border-2" src={photo} alt={name} /> :
                        <div className="rounded-full border p-1">
                            <User w="30"></User>
                        </div>
                }
            </div>
            <div>
                <p className="font-semibold">{name}</p>
                <button
                    onClick={handleUpdateFollower}
                    className={`${email == myEmail && 'hidden'} text-blue-600 text-sm`}
                    disabled={isLoading}
                >
                    {isFollow ? "Following" : "Follow"}
                </button>
                <Link
                    href={`/updateRecipe/${recipeId}`}
                    className={`${email !== myEmail && 'hidden'} text-sm text-blue-600`}
                >
                    Update
                </Link>
            </div>
        </div>
    );
};

export default RecipeDetails;