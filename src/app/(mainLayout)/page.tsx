import { Metadata } from "next";
import { getRecipes } from "@/services/recipes/recipes";
import { Cursor } from "@/ui/icons/Icons";
import Error from "@/ui/Error/Error";
import Link from "next/link";
import RecipeCard from "@/ui/recipeCard/RecipeCard";
import LoadMoreRecipes from "@/components/home/LoadMoreRecipes";
import { getCurrentTime } from "@/utils/utils";

type recipeType = {
  title: string;
  rating: number;
  user: {
    name: string
  };
  image: string;
  _id: string
};

export const metadata: Metadata = {
  title: "Halal Foods",
  description: "Make your day wonderful with healthy foods",
};

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


const Page = async () => {

  const time = getCurrentTime
  let recipesForCurrentTime = "";

  let currentState;

  if (time >= 5 && time <= 10) {
    recipesForCurrentTime = dayTime[0].time;
    currentState = dayTime[0];
  } else if (time >= 11 && time <= 15) {
    recipesForCurrentTime = dayTime[1].time;
    currentState = dayTime[1];
  } else if (time >= 16 && time <= 24) {
    recipesForCurrentTime = dayTime[2].time;
    currentState = dayTime[2];
  } else {
    recipesForCurrentTime = EVERYTHING;
    currentState = dayTime[2];
  }

  const { data: currentRecipes } = await getRecipes(recipesForCurrentTime);

  if (!currentRecipes) {
    return <Error heading="NO RECIPES FOUND!" description="Please refresh the page or wait a moment!"></Error>
  }

  return (
    <div className="max-w-7xl mx-auto p-2 md:p-0">
      <section>
        <div className="bg-[#fff] border rounded-md p-2 h-full">
          <h1 className="font-semibold text-2xl md:text-3xl">Good <span className="text-green-700 font-bold">{currentState?.heading}</span></h1>
          <h1 className="text-gray-500 mb-4 -mt-1 text-sm md:text-lg md:-mt-0">{currentState?.about}</h1>
          <div className="flex overflow-auto md:grid grid-cols-5 gap-2 md:gap-4">
            {
              currentRecipes.map((recipe: recipeType) => (
                <Link href={`/recipeDetails/${recipe._id}`} key={recipe._id}>
                  <RecipeCard
                    image={recipe.image}
                    title={recipe.title}
                    rating={recipe.rating}
                    name={recipe?.user?.name}
                    width="w-36"
                  ></RecipeCard>
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
          <LoadMoreRecipes></LoadMoreRecipes>
        </div>
      </section>
    </div>
  );
};

export default Page;