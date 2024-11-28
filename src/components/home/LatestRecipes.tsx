import { getLatestRecipes } from "@/services/recipes/recipes";
import Error from "@/ui/Error/Error";
import { Star } from "@/ui/icons/Icons";
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

const dayTimes = [MORNING, DAY, NIGHT, MORNING];

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
        heading: "Night!",
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
        nextState = dayTime[1];
    } else {
        recipesForCurrentTime = EVERYTHING;
    }

    const { data: currentRecipes } = await getLatestRecipes(recipesForCurrentTime);
    const { data: nextRecipes } = await getLatestRecipes(recipesForNextTime);
    console.log(currentRecipes);
    

    if (!currentRecipes) {
        return <Error heading="NO RECIPES FOUND!" description="Please refresh the page or wait a moment!"></Error>
    }

    return (
        <div>
            <section>
                <h1 className="font-semibold text-xl mt-2 md:text-3xl">Good <span className="text-green-700 font-bold">{currentState?.heading}</span></h1>
                <h1 className="text-gray-600 mb-2">{currentState?.about}</h1>

                <div className="bg-[#fff] border rounded-md p-2 h-full">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
                        {
                            currentRecipes.map((recipe: recipeType) => (
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
            <section className="my-7">
                <h1 className="font-semibold text-xl my-2 md:text-3xl">Be Ready for <span className="text-green-700 font-bold">{nextState?.heading}</span></h1>
                
                <div className="bg-[#fff] border rounded-md p-2 h-full">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
                        {
                            nextRecipes.map((recipe: recipeType) => (
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
        </div>
    );
};

export default LatestRecipes;