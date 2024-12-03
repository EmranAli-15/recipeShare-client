import { getLatestRecipes } from "@/services/recipes/recipes";
import Error from "@/ui/Error/Error";
import { Cursor, Star } from "@/ui/icons/Icons";
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

const MORNING = "Breakfast";
const DAY = "Lunch";
const NIGHT = "Dinner";
const EVERYTHING = "";

const dayTime = [
    {
        time: MORNING,
        heading: "Morning!",
        about: "Hey it's morning time, let's start your day with healthy foods."
    },
    {
        time: DAY,
        heading: "Noon!",
        about: "You are passing a good day, let's eats energetic foods."
    },
    {
        time: NIGHT,
        heading: "Tonight!",
        about: "Tonight is very special for you, finish your day with healthy foods."
    }
]

const LatestRecipes = async () => {
    const time = new Date().getHours();
    let recipesForCurrentTime = "";
    let recipesForNextTime = "";

    let currentState;
    let nextState;

    if (time >= 5 && time <= 10) {
        recipesForCurrentTime = dayTime[0].time;
        recipesForNextTime = dayTime[1].time;
        currentState = dayTime[0];
        nextState = dayTime[1];
    } else if (time >= 11 && time <= 15) {
        recipesForCurrentTime = dayTime[1].time;
        recipesForNextTime = dayTime[2].time;
        currentState = dayTime[1];
        nextState = dayTime[2];
    } else if (time >= 16 && time <= 24) {
        recipesForCurrentTime = dayTime[2].time;
        recipesForNextTime = dayTime[0].time;
        currentState = dayTime[2];
        nextState = dayTime[0];
    } else {
        recipesForCurrentTime = EVERYTHING;
        recipesForNextTime = dayTime[0].time;
        currentState = dayTime[2];
        nextState = dayTime[0];
    }

    const { data: currentRecipes } = await getLatestRecipes(recipesForCurrentTime);
    const { data: nextRecipes } = await getLatestRecipes(recipesForNextTime);


    if (!currentRecipes) {
        return <Error heading="NO RECIPES FOUND!" description="Please refresh the page or wait a moment!"></Error>
    }

    return (
        <div>
            <section>
                <div className="bg-[#fff] border rounded-md p-2 h-full">
                    <h1 className="font-semibold text-2xl md:text-3xl">Good <span className="text-green-700 font-bold">{currentState?.heading}</span></h1>
                    <h1 className="text-gray-500 mb-4 -mt-1 text-sm md:text-lg md:-mt-0">{currentState?.about}</h1>
                    <div className="flex overflow-auto md:grid grid-cols-5 gap-2 md:gap-4">
                        {
                            currentRecipes.map((recipe: recipeType) => (
                                <Link href={`/recipeDetails/${recipe._id}`} key={recipe._id}>
                                    <div>
                                        <div className="w-44 md:w-full h-32">
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
                        <Link href={`/moreRecipes/${currentState.time}`} className="bg-[#f1f2f4] px-16 h-32 flex flex-col items-center justify-center rounded border-4 cursor-pointer">
                            <p className="text-center font-semibold">Browse More</p>
                            <Cursor w={30}></Cursor>
                        </Link>
                    </div>
                </div>
            </section>
            <section className="mt-4">
                <div className="bg-[#fff] border rounded-md p-2 h-full">
                    <h1 className="font-semibold text-2xl mb-4 md:text-3xl">Be Ready for <span className="text-green-700 font-bold">{nextState?.heading}</span></h1>
                    <div className="flex overflow-auto md:grid grid-cols-5 gap-2 md:gap-4">
                        {
                            nextRecipes.map((recipe: recipeType) => (
                                <Link href={`/recipeDetails/${recipe._id}`} key={recipe._id}>
                                    <div>
                                        <div className="w-44 md:w-full h-32">
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
                        <Link href={`/moreRecipes/${nextState.time}`} className="bg-[#f1f2f4] px-16 h-32 flex flex-col items-center justify-center rounded border-4 cursor-pointer">
                            <p className="text-center font-semibold">Browse More</p>
                            <Cursor w={30}></Cursor>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LatestRecipes;