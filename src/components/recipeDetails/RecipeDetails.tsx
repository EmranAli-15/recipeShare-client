"use client"

import { useUser } from "@/contextProvider/ContextProvider";
import { useUpdateFollowingMutation } from "@/redux/features/user/userApi";
import { reFetchGetSingleRecipe } from "@/services/recipes/recipes";
import { User } from "@/ui/icons/Icons";
import { useEffect } from "react";

type userType = {
    photo: string;
    id: string;
    name: string;
    email: string;
    followers: unknown[]
}

const RecipeDetails = ({ photo, id, name, email, followers }: userType) => {

    const { user: loggedInUser } = useUser() || {};
    const { email: myEmail, userId: myId } = loggedInUser || {};


    const [updateFollowing, { isLoading, isSuccess }] = useUpdateFollowingMutation();

    const handleUpdateFollower = () => {
        updateFollowing({ id });
    };

    useEffect(() => {
        if (isSuccess) {
            reFetchGetSingleRecipe();
        }
    }, [isSuccess])

    let isFollow = false;
    const isMyIdExist = followers?.find(personId => personId?.toString() == myId);
    if (isMyIdExist) {
        isFollow = true
    };

    console.log(followers);



    return (
        <div className="bg-[#fff] p-2 rounded-md flex items-center gap-x-3">
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
                <p onClick={handleUpdateFollower} className={`${email == myEmail && 'hidden'} text-blue-600 text-sm cursor-pointer`}>{isFollow ? "Following" : "Follow"}</p>
            </div>
        </div>
    );
};

export default RecipeDetails;