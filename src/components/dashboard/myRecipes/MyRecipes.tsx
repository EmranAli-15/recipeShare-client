"use client"

import { useUser } from "@/contextProvider/ContextProvider";
import { useGetMyRecipesQuery } from "@/redux/features/recipe/recipeApi";
import Error from "@/ui/Error/Error";
import SectionLoader from "@/ui/loader/SectionLoader";
import Link from "next/link";
import { useState } from "react";

type recipeType = {
    _id: string;
    title: string;
    image: string
}



const MyRecipes = () => {
    const { user } = useUser();
    const { userId } = user || {};

    const [load, setLoad] = useState(true);

    setTimeout(() => {
        setLoad(false);
    }, 3000);

    const { data: recipes, isLoading, isError, isSuccess } = useGetMyRecipesQuery(userId);

    let content = null;

    if (isLoading || load) {
        content = <div className="flex justify-center"><SectionLoader></SectionLoader></div>
    } else if (!isLoading && isError) {
        content = <Error
            heading="Your recipes not found!!"
            description="Some how your recipes not loaded. Please try again."
        ></Error>
    }
    else if (!isLoading && !isError && isSuccess && recipes.length == 0) {
        content = <h1 className="text-center text-gray-500">No recipe you shared yet !</h1>
    } else if (!isLoading && !isError && isSuccess) {
        content = <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 bg-[#fff] border rounded-md p-2">
            {
                recipes.map((recipe: recipeType) => (
                    <Link href={`/recipeDetails/${recipe._id}`} key={recipe._id}>
                        <div>
                            <div className="w-full h-32">
                                <img className="w-full h-full object-cover" src={recipe.image} alt={recipe.title} />
                            </div>
                            <div className="md:px-2">
                                <h1 className="font-semibold my-2">{recipe.title}</h1>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    }

    return (
        <div className="mt-10">
            <h1 className="font-semibold text-xl mt-3 md:text-3xl mb-2"><span className="text-green-700">My</span> Recipes</h1>
            {
                content
            }
        </div>
    );
};

export default MyRecipes;