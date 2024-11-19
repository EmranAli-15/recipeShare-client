"use client"

import { useUser } from "@/contextProvider/ContextProvider";
import { useUpdateLikeMutation } from "@/redux/features/recipe/recipeApi";
import { Like } from "@/ui/icons/Icons";
import { debounce } from "@/utils/debounce";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Likes = ({ likes: totalLikes, recipeId }: { likes: any[], recipeId: string }) => {
    const [numberOfTotalLikes, setNumberOfTotalLikes] = useState(totalLikes.length);

    const { user } = useUser();
    const { userId: myId, email: myEmail, } = user || {};

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const isMyIdExist = totalLikes.find(id => id?.toString() == myId)
        if (isMyIdExist) {
            setIsLiked(true);
        };
    }, [myId])

    const [updateLike, { }] = useUpdateLikeMutation();

    const handleLike = () => {
        const like = { isLiked, userId: myId };

        if (!myEmail) {
            toast.error("Please Login");
        } else {
            const callTheDebounce = () => {
                updateLike({ like, recipeId });
            };
            setIsLiked(!isLiked);
            if (isLiked) {
                setNumberOfTotalLikes(numberOfTotalLikes - 1);
            } else {
                setNumberOfTotalLikes(numberOfTotalLikes + 1);
            }

            debounce(callTheDebounce, 1000);
        }
    }

    return (
        <div className="flex flex-col items-center">
            <Toaster toastOptions={{ duration: 1000 }}></Toaster>
            <span
                onClick={handleLike}
                className="cursor-pointer">
                <Like fill={isLiked ? "#2563eb" : "#374151"} w="25"></Like>
            </span>
            <p>{numberOfTotalLikes}</p>
        </div>
    );
};

export default Likes;