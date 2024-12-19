"use client"

import { recipeApi } from "@/redux/features/recipe/recipeApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Cursor, Star } from "@/ui/icons/Icons";
import Link from "next/link";
import { useEffect, useState } from "react";

type TRecipe = {
    _id: string,
    image: string,
    title: string,
    user: {
        name: string
    },
    rating: number,
    category: string
}

const Page = ({ params }: { params: { categoryId: string } }) => {
    const dispatch = useAppDispatch();
    const category = params.categoryId;
    const [lastFetchedId, setLastFetchedId] = useState("0");

    useEffect(() => {
        dispatch(recipeApi.endpoints.getMoreCategoryRecipes.initiate({ category, lastFetchedId, limit: 2 }))
    }, [lastFetchedId])

    const data: TRecipe[] = useAppSelector(state => state.recipeFromRedux.moreScheduleRecipes);

    const findLastId = () => {
        if (data.length > 0) {
            const length = data.length;
            const lastRecipe = data[length - 1];
            if (lastRecipe._id != lastFetchedId) {
                setLastFetchedId(lastRecipe._id);
            }
        }
    };


    return (
        <div className="max-w-7xl mx-auto p-2">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 bg-[#fff] border rounded-md p-2 h-full">
                {
                    data.map((recipe: TRecipe, index) => (
                        <Link href={`/recipeDetails/${recipe._id}`} key={index}>
                            <div>
                                <div className="w-full h-32">
                                    <img className="w-full h-full object-cover" src={recipe.image} alt={recipe.title} />
                                </div>
                                <div className="md:px-2">
                                    <h1 className="font-semibold my-2 line-clamp-2">{recipe.title}</h1>
                                    <div className="flex items-start pb-1">
                                        <div className="flex items-center text-[12px] bg-[#f1f2f4] px-1">
                                            <span className="text-yellow-500">
                                                <Star w="17"></Star>
                                            </span>
                                            <p>
                                                {recipe.rating}
                                            </p>
                                        </div>
                                        <p className="ml-5 text-gray-500 text-sm">{recipe?.user?.name}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                }
                <div onClick={findLastId} className="bg-[#f1f2f4] px-16 h-32 flex flex-col items-center justify-center rounded border-4 cursor-pointer">
                    <p className="text-center font-semibold">Browse More</p>
                    <Cursor w={30}></Cursor>
                </div>
            </div>
        </div>
    );
};

export default Page;