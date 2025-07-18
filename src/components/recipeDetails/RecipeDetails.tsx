"use client"

import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { User } from "@/ui/icons/Icons";
import { useUser } from "@/contextProvider/ContextProvider";
import { debounce } from "@/utils/debounce";
import { useEffect, useState } from "react";
import { useUpdateFollowingMutation } from "@/redux/features/user/userApi";

type userType = {
    recipeId: string;
    user: {
        photo: string;
        _id: string;
        name: string;
        email: string;
        followers: unknown[]
    };
    image: string;
    title: string;
}

const RecipeDetails = ({ recipeId, user }: userType) => {
    const { photo, _id, name, email, followers } = user || {};

    const { user: loggedInUser } = useUser() || {};
    const { email: myEmail, userId: myId, role } = loggedInUser || {};

    const [isFollow, setIsFollow] = useState(false);

    let isThisMe = false;
    let amIUser = false;
    if (myEmail == email) {
        isThisMe = true;
        if (role == "user") {
            amIUser = true;
        }
    }

    useEffect(() => {
        const isMyIdExist = followers?.find(personId => personId?.toString() == myId);
        if (isMyIdExist) {
            setIsFollow(true);
        };
    }, [myId]);

    const [updateFollowing, { isLoading }] = useUpdateFollowingMutation();

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

    return (
        // This component is for showing user information and some event
        <div className="bg-[#fff] p-2 rounded-md">
            <Toaster toastOptions={{ duration: 1000 }}></Toaster>
            <div className="flex items-center gap-x-3">
                <div>
                    <Link
                        href={isThisMe && amIUser ? "/user/myProfile" : isThisMe && !amIUser ? "/admin/adminProfile" : `/userProfile/${_id}`}
                    >
                        {
                            photo ? <img className="size-12 rounded-full border-2 object-cover" src={photo} alt={name} /> :
                                <div className="rounded-full border p-1">
                                    <User w="30"></User>
                                </div>
                        }
                    </Link>
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
        </div>
    );
};

export default RecipeDetails;