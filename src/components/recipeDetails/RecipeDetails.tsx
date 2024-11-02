"use client"

import { useUser } from "@/contextProvider/ContextProvider";
import { useUpdateFollowingMutation } from "@/redux/features/user/userApi";
import { User } from "@/ui/icons/Icons";

type userType = {
    photo: string;
    id: string;
    name: string;
    email: string;
}

const RecipeDetails = ({ photo, id, name, email }: userType) => {

    const { user: loggedInUser } = useUser() || {};
    const { email: myEmail } = loggedInUser || {};

    const [updateFollowing, { }] = useUpdateFollowingMutation();

    const handleUpdateFollower = () => {
        updateFollowing({id});
    }


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
                <p onClick={handleUpdateFollower} className={`${email == myEmail && 'hidden'} text-blue-600 text-sm cursor-pointer`}>Follow</p>
            </div>
        </div>
    );
};

export default RecipeDetails;