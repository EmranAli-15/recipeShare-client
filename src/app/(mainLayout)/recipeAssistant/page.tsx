"use client"

import React, { FormEvent, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners';
import { useGenerateAiRecipeMutation } from '@/redux/features/aiRecipe/aiRecipeApi';

export default function page() {

    const [ingredients, setIngredients] = useState("");
    const [generateAiRecipe, { data: generatedAiRecipe, isLoading, isSuccess, isError }] = useGenerateAiRecipeMutation();

    const generateRecipe = (e: FormEvent) => {
        e.preventDefault();
        const data = { ingredients }
        generateAiRecipe(data);
    }

    const [rawText, setRawText] = useState("");

    useEffect(() => {
        const data = generatedAiRecipe?.data[0]?.content?.parts[0]?.text;
        setRawText(data);
    }, [isError, isSuccess])

    // const recipe = {
    //     recipe_name: "Creamy Lemon Chicken & Noodle Bake",
    //     ingredients: [
    //         "500g boneless, skinless chicken breasts, cut into bite-sized pieces",
    //         "1 tbsp olive oil",
    //         "1 large onion, chopped",
    //         "2 cloves garlic, minced",
    //         "150ml chicken broth",
    //         "150ml heavy cream",
    //         "Juice of 1 lemon",
    //         "Zest of ½ lemon",
    //         "2 tbsp chopped fresh parsley",
    //         "Salt and pepper to taste",
    //     ],
    //     instructions: [
    //         "Preheat oven to 180°C (350°F).",
    //         "Cook noodles according to package directions. Drain and set aside.",
    //         "Heat olive oil in a large oven-safe skillet over medium heat. Add chicken and cook until browned and cooked through.",
    //         "Add onion and garlic to the skillet and cook until softened, about 5 minutes.",
    //         "Stir in chicken broth, heavy cream, lemon juice, and lemon zest. Bring to a simmer and cook for 5 minutes, or until sauce has slightly thickened.",
    //         "Add cooked noodles and parsley to the skillet. Season with salt and pepper to taste.",
    //         "Transfer skillet to the preheated oven and bake for 10-15 minutes, or until heated through and bubbly.",
    //         "Serve immediately.",
    //     ]
    // }

    let content = null;

    if (isSuccess && rawText) {
        const jsonText = rawText.replace(/```json|```/g, '').trim();
        const recipe = JSON.parse(jsonText);
        content = <div>
            <h1 className='text-xl mt-5 font-semibold'>
                {recipe.recipe_name}
            </h1>
            <br />

            <h1 className='text-lg font-semibold'>Ingredients list:</h1>
            <div className='ml-5'>
                <ul style={{ "listStyleType": "disc" }}>
                    {
                        recipe.ingredients.map((ingredient: string, index: any) => (
                            <li key={index}>  {ingredient}</li>
                        ))
                    }
                </ul>
            </div>
            <br />

            <h1 className='text-lg font-semibold'>Step by step procedure:</h1>
            <div className='ml-5'>
                <ul style={{ "listStyleType": "square" }}>
                    {
                        recipe.instructions.map((instruction: string, index: any) => (
                            <li key={index}>{instruction}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    }

    return (
        <div className='max-w-7xl mx-auto px-2 py-5 md:px-0'>
            <form onSubmit={generateRecipe} className='flex items-center justify-center'>
                <div>
                    <input
                        onChange={(e) => setIngredients(e.target.value)}
                        required
                        value={ingredients}
                        className='md:w-[450px] w-[96vw] rounded p-2 outline-0 border '
                        type="text"
                        name=""
                        placeholder='e.g. chicken, rice, bell paper'
                    />
                    <br />
                    <button
                        disabled={isLoading}
                        type='submit'
                        className='myBtn w-full h-10 mt-2 text-white rounded font-semibold'>
                        {
                            isLoading ? <BeatLoader color="#fff"></BeatLoader> : "Generate Recipe"
                        }
                    </button>
                </div>
            </form>

            <div className='mt-2 border border-slate-200 rounded p-2 bg-white'>
                <h1 className='text-2xl font-semibold font-mono pb-1'>Generated Recipe:</h1>

                <div className='text-gray-800 text-justify bg-white'>
                    {
                        content
                    }
                </div>
            </div>

        </div>
    )
}
