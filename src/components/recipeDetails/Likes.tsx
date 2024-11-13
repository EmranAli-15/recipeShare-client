"use client"

import { useUser } from "@/contextProvider/ContextProvider";
import { useUpdateLikeMutation } from "@/redux/features/recipe/recipeApi";
import { Like } from "@/ui/icons/Icons";
import { useState } from "react";

const Likes = ({ likes, recipeId }: { likes: any[], recipeId: string }) => {
    const [totalLikes, setTotalLikes] = useState([...likes])

    const { user } = useUser();
    const { userId } = user || {};

    let isLiked = false;
    const myId = totalLikes.find(id => id?.toString() == userId)
    if (myId) {
        isLiked = true;
    };

    const removeMyId = () => {
        const filtered = totalLikes.filter(id => id?.toString() !== userId);
        setTotalLikes(filtered);
    }

    const [updateLike, { }] = useUpdateLikeMutation();

    const handleLike = () => {
        const like = {
            isLiked,
            userId
        }
        if (!isLiked) {
            setTotalLikes([...totalLikes, userId])
            isLiked = true
        } else {
            removeMyId()
        }
        updateLike({ like, recipeId });
    }

    return (
        <div className="flex flex-col items-center">
            <span
                onClick={handleLike}
                className="cursor-pointer">
                <Like fill={isLiked ? "blue" : "#1f2937"} w="25"></Like>
            </span>
            <p>{totalLikes.length}</p>
        </div>
    );
};

export default Likes;