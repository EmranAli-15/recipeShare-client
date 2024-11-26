import { getLatestRecipes } from "@/services/recipes/recipes";
import Error from "@/ui/Error/Error";
import { Star } from "@/ui/icons/Icons";
import Image from "next/image";
import Link from "next/link";

type recipeType = {
    title: string;
    rating: number;
    user: {
        name: string
    };
    image: string;
    _id: string
}

const LatestRecipes = async () => {
    const { data: recipes } = await getLatestRecipes("");

    if (!recipes) {
        return <Error heading="NO RECIPES FOUND!" description="Please refresh the page or wait a moment!"></Error>
    }

    return (
        <section>
            <h1 className="font-semibold text-xl my-2 md:text-3xl"><span className="text-green-700">Latest</span> Recipes</h1>

            <div className="bg-[#fff] border rounded-md p-2 h-full">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
                    {
                        recipes.map((recipe: recipeType) => (
                            <Link href={`/recipeDetails/${recipe._id}`} key={recipe._id}>
                                <div>
                                    <div className="w-full h-32">
                                        <img className="w-full h-full object-cover" src={recipe.image} alt={recipe.title} />
                                    </div>
                                    <div className="md:px-2">
                                        <h1 className="font-semibold my-2">{recipe.title}</h1>
                                        <div className="flex items-start">
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
                </div>
            </div>
        </section>
    );
};

export default LatestRecipes;