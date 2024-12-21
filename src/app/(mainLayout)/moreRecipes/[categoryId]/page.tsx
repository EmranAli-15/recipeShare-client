"use client"

import { recipeApi } from "@/redux/features/recipe/recipeApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import RecipeCard from "@/ui/recipeCard/RecipeCard";
import InfinityScrolling from "@/utils/InfinityScrolling";
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
    const [loading, setLoading] = useState(false);
    const [noMore, setNoMore] = useState(false);
    const [lastFetchedId, setLastFetchedId] = useState("0");
    const [recipes, setRecipes] = useState<any>([]);

    useEffect(() => {
        if (loading) {
            const fetchRecipes = async () => {
                const { data } = await dispatch(recipeApi.endpoints.getMoreCategoryRecipes.initiate({ category, lastFetchedId, limit: 4 })).unwrap();
                if (data && data.length > 0) {
                    setRecipes([...recipes, ...data]);
                    const length = data.length;
                    const lastRecipe = data[length - 1];
                    if (lastRecipe._id != lastFetchedId) {
                        setLastFetchedId(lastRecipe._id);
                    }
                } else {
                    setNoMore(true);
                }
            };

            fetchRecipes();
        }
    }, [loading, lastFetchedId]);

    return (
        <div className="max-w-7xl md:mx-auto m-2 p-2 bg-[#fff] border rounded-md h-full">
            <h1 className="font-semibold text-2xl md:text-3xl mb-4">Browse <span className="text-green-700 font-bold">{category} recipes</span></h1>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 ">
                {
                    recipes.map((recipe: TRecipe) => (
                        <Link href={`/recipeDetails/${recipe._id}`} key={recipe._id}>
                            <RecipeCard
                                image={recipe.image}
                                title={recipe.title}
                                rating={recipe.rating}
                                name={recipe?.user?.name}
                            ></RecipeCard>
                        </Link>
                    ))
                }
            </div>
            <InfinityScrolling setLoading={setLoading} noMore={noMore}></InfinityScrolling>
        </div>
    );
};

export default Page;