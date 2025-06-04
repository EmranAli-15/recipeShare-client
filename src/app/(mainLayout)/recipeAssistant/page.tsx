"use client"

import { useGenerateAiRecipeMutation } from '@/redux/features/aiRecipe/aiRecipeApi';
import React, { useEffect, useState } from 'react'

export default function page() {

    const [ingredients, setIngredients] = useState("chicken, noodles");
    const [generateAiRecipe, { data: generatedAiRecipe, isLoading, isSuccess, isError }] = useGenerateAiRecipeMutation();

    const generateRecipe = () => {
        const data = { ingredients }
        generateAiRecipe(data);
    }

    const [rawText, setRawText] = useState("");

    useEffect(() => {
        const data = generatedAiRecipe?.data[0]?.content?.parts[0]?.text;
        setRawText(data);
    }, [isError, isSuccess])



    let content = null;

    if (isSuccess && rawText) {
        const jsonText = rawText.replace(/```json|```/g, '').trim();
        const recipe = JSON.parse(jsonText);
        content = <div>
            <h1>
                {recipe.recipe_name}
            </h1>
            <br />
            <div>
                {
                    recipe.ingredients.map((ingredient: string, index: any) => (
                        <p key={index}>{ingredient}</p>
                    ))
                }
            </div>
            <br />
            <div>
                {
                    recipe.instructions.map((instruction: string, index: any) => (
                        <p key={index}>{instruction}</p>
                    ))
                }
            </div>
        </div>
    }

    return (
        <div className='max-w-7xl mx-auto px-2 py-5 md:px-0'>
            <div className='flex items-center justify-center'>
                <div>
                    <input
                        className='md:w-[450px] w-[96vw] rounded p-2 outline-0 border '
                        type="text"
                        name=""
                        placeholder='e.g. chicken, rice, bell paper'
                    />
                    <br />
                    <button
                        onClick={generateRecipe}
                        className='myBtn w-full h-10 mt-2 text-white rounded font-semibold'>
                        Generate Recipe
                    </button>
                </div>
            </div>

            <div className='mt-2 border border-slate-200 rounded p-2 bg-white'>
                <h1 className='text-xl font-semibold font-mono pb-1'>Generated Recipe:</h1>

                <div className='text-gray-700 text-justify bg-white'>
                    {
                        content
                    }
                </div>
            </div>

        </div>
    )
}
