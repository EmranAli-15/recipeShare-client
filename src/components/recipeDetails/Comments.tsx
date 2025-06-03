"use client"

type comment = {
    userId: {
        name: string;
        photo: string;
        _id: string;
        role: string;
    },
    comment: string
};

import { useCreateACommentMutation } from "@/redux/features/recipe/recipeApi";
import { reFetchGetSingleRecipe } from "@/services/recipes/recipes";
import { useEffect, useState } from "react";
import { useUser } from "@/contextProvider/ContextProvider";
import { User } from "@/ui/icons/Icons";
import toast, { Toaster } from "react-hot-toast";
import SectionLoader from "@/ui/loader/SectionLoader";
import Image from "next/image";
import Link from "next/link";


const Comments = ({ id, comments }: { id: string, comments: [] }) => {

    const { user } = useUser();
    const { userId: thisIsMe } = user || {};


    const [createAComment, { isLoading, isSuccess }] = useCreateACommentMutation();

    const [comment, setComment] = useState("");

    const handleSubmitComment = () => {
        if (!thisIsMe) {
            return toast.error("Please login");
        };
        if (!comment) {
            return toast.error("Write a comment");
        };
        const data = {
            comment: {
                userId: thisIsMe,
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
            <p className="font-semibold px-2 md:text-xl">Comments :</p>
            <div className="mb-4 text-gray-500">
                <p className="px-2">Paste a comment</p>
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
                comments?.map((comment: comment, index) => {
                    return <div key={index} className="rounded-md border bg-[#fff] p-2">
                        <div className="flex items-center gap-x-1">
                            <Link
                                className="flex items-center gap-x-1"
                                href={
                                    thisIsMe == comment.userId._id && comment.userId.role == "user" ?
                                        "/user/myProfile" :
                                        thisIsMe == comment.userId._id && comment.userId.role == "admin" ?
                                            "/admin/adminProfile" :
                                            `/userProfile/${comment.userId._id}`
                                }
                            >
                                {
                                    comment.userId.photo ?
                                        <Image
                                            className="rounded-full object-cover h-8 w-8"
                                            src={comment.userId.photo}
                                            width={20}
                                            height={20}
                                            alt={comment.comment}
                                        ></Image> :
                                        <div className="border rounded-full p-1">
                                            <User w={25}></User>
                                        </div>
                                }
                                <p className="text-gray-500 text-sm">{comment.userId.name}</p>
                            </Link>
                        </div>
                        <p>{comment.comment}</p>
                    </div>
                })
            }

        </div>
    );
};

export default Comments;