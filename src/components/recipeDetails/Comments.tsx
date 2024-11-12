"use client"

type comment = {
    userId: {
        name: string;
        photo: string;
    },
    comment: string
};

import { useUser } from "@/contextProvider/ContextProvider";
import { useCreateACommentMutation } from "@/redux/features/recipe/recipeApi";
import { reFetchGetSingleRecipe } from "@/services/recipes/recipes";
import SectionLoader from "@/ui/loader/SectionLoader";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";


const Comments = ({ id, comments }: { id: string, comments: [] }) => {

    const { user } = useUser();
    const { userId } = user || {};

    const [createAComment, { isLoading, isError, isSuccess }] = useCreateACommentMutation();

    const [comment, setComment] = useState("");

    const handleSubmitComment = () => {
        if (!userId) {
            return toast.error("Please login");
        };
        if (!comment) {
            return toast.error("Write a comment");
        };
        const data = {
            comment: {
                userId: userId,
                comment: comment
            },
            recipeId: id
        };

        createAComment(data)
    }

    useEffect(() => {
        if (isSuccess) {
            setComment("");
            reFetchGetSingleRecipe();
        }
    }, [isSuccess])


    return (
        <div>
            <Toaster toastOptions={{ duration: 1000 }}></Toaster>
            <p className="font-semibold md:text-xl">Comments :</p>
            <div className="mb-3 py-1">
                Paste a comment
                <div>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="border w-full myInput" rows={3} id=""></textarea>
                    <button disabled={isLoading} onClick={handleSubmitComment} className="myBtn w-full h-10">
                        {
                            isLoading ? <SectionLoader></SectionLoader> :
                                "Submit"
                        }
                    </button>
                </div>
            </div>

            {
                comments.map((comment: comment, index) => {
                    return <div key={index} className="rounded-md border bg-[#fff] p-2">
                        <div className="flex items-center gap-x-1">
                            <Image
                                className="rounded-full object-cover h-8 w-8"
                                src={comment.userId.photo}
                                width={20}
                                height={20}
                                alt={comment.comment}
                            ></Image>
                            <p className="text-gray-500 text-sm">{comment.userId.name}</p>
                        </div>
                        <p>{comment.comment}</p>
                    </div>
                })
            }

        </div>
    );
};

export default Comments;