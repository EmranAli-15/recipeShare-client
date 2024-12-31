"use client"

import { useCurrentRecipesQuery } from '@/redux/features/recipe/recipeApi';
import Error from '@/ui/Error/Error';
import { Cursor } from '@/ui/icons/Icons';
import RecipeCard from '@/ui/recipeCard/RecipeCard';
import Link from 'next/link';
import React from 'react'

type recipeType = {
    title: string;
    rating: number;
    user: {
        name: string
    };
    image: string;
    _id: string
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

export default function CurrentTimeRecipes() {
    const time = new Date().getHours();

    let recipesForCurrentTime = "";

    let currentState;

    if (time >= 5 && time <= 11) {
        recipesForCurrentTime = dayTime[0].time;
        currentState = dayTime[0];
    } else if (time >= 12 && time <= 15) {
        recipesForCurrentTime = dayTime[1].time;
        currentState = dayTime[1];
    } else if (time >= 16 && time <= 24) {
        recipesForCurrentTime = dayTime[2].time;
        currentState = dayTime[2];
    } else {
        recipesForCurrentTime = EVERYTHING;
        currentState = dayTime[2];
    }


    let content = null;

    const { data: currentRecipes, isLoading, isError } = useCurrentRecipesQuery(recipesForCurrentTime);

    if (isLoading) {
        content = <div className='flex overflow-auto md:grid grid-cols-5 gap-2 md:gap-4 text-slate-100'>
            {
                Array(5).fill(null).map((d, index) => (
                    <div key={index}>
                        <div>
                            <div className="w-36 md:w-full h-28 bg-slate-100 rounded-md">
                            </div>
                            <div className="md:px-2 mt-1">
                                <h1 className="bg-slate-100 h-6 rounded-md">Title</h1>
                                <h1 className="bg-slate-100 h-5 w-3/4 rounded-md mt-1">User name</h1>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    } else if (!isLoading && isError) {
        content = <Error heading="NO RECIPES FOUND!" description="Please refresh the page or wait a moment!"></Error>
    } else if (currentRecipes) {
        content = <div className="flex overflow-auto md:grid grid-cols-5 gap-2 md:gap-4">
            {
                currentRecipes?.map((recipe: recipeType) => (
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
    }

    return (
        <section>
            <div className="bg-[#fff] border rounded-md p-2 h-full">
                <h1 className="font-semibold text-2xl md:text-3xl">Good <span className="text-green-700 font-bold">{currentState?.heading}</span></h1>
                <h1 className="text-gray-500 mb-4 -mt-1 text-sm md:text-lg md:-mt-0">{currentState?.about}</h1>
                {
                    content
                }
            </div>
        </section>
    )
}
