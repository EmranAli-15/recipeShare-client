"use client"

import { useGetMoreRecipesMutation } from "@/redux/features/recipe/recipeApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";

const Page = ({ params }: { params: { categoryId: string } }) => {
    const category = params.categoryId;
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(0);
    // { category, page, limit }
    const [getMoreRecipes, { }] = useGetMoreRecipesMutation();

    useEffect(() => {
        getMoreRecipes({ category, page, limit });
    }, [page]);

    const data = useAppSelector(state => state.recipeFromRedux.moreRecipes);
    console.log(data);


    return (
        <div className="max-w-7xl mx-auto">
            {params.categoryId}
            <button onClick={() => setPage(page + 5)}>CLICK</button>
        </div>
    );
};

export default Page;