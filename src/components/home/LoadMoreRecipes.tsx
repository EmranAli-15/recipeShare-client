"use client"

import { recipeApi } from "@/redux/features/recipe/recipeApi";
import { useAppDispatch } from "@/redux/hooks";
import RecipeCard from "@/ui/recipeCard/RecipeCard";
import InfinityScrolling from "@/utils/InfinityScrolling";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function LoadMoreRecipes() {
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [recipes, setRecipes] = useState<any>([]);
    const [noMore, setNoMore] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (loading) {
            const fetchRecipes = async () => {
                const { data } = await dispatch(
                    recipeApi.endpoints.getRecipes.initiate({ page, limit: 5 })
                ).unwrap();

                if (data && data.length > 0) {
                    setRecipes([...recipes, ...data])
                    setPage(pre => pre + 1);
                } else {
                    setNoMore(true);
                }
            };

            fetchRecipes();
        }
    }, [loading, page]);

    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
                {
                    recipes.map((data: any) => {
                        return <Link href={`/recipeDetails/${data._id}`} key={data._id}>
                            <RecipeCard image={data.image} title={data.title} rating={data.rating} name={data.name}></RecipeCard>
                        </Link>
                    })
                }
            </div>
            <InfinityScrolling setLoading={setLoading} noMore={noMore}></InfinityScrolling>
        </div>
    )
}
