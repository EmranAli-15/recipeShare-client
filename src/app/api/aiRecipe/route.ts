// GENERATE AI RECIPES
// AIzaSyAQM50fcPZuZ_pLFnbVwU2WNmebYlJIn9A

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const getRecipeFromAli = async (req: any, res: any) => {

    const { ingredients } = req.body;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Or "gemini-1.5-pro"
        const prompt = `Generate a delicious recipe using the following ingredients: ${ingredients.join(', ')}.
                        Please provide the recipe name, a list of ingredients with quantities, and step-by-step instructions.
                        Format the output as a JSON object with keys: "recipeName", "ingredients", "instructions".`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        let recipeText = response.text();

        // Attempt to parse JSON. Gemini sometimes includes markdown, so we need to clean it.
        let recipeData;
        try {
            // Remove markdown code blocks if present
            if (recipeText.startsWith('```json') && recipeText.endsWith('```')) {
                recipeText = recipeText.substring(7, recipeText.length - 3).trim();
            }
            recipeData = JSON.parse(recipeText);
        } catch (jsonError) {
            console.warn("Could not parse direct JSON from Gemini. Attempting regex extraction.");
            // Fallback for when Gemini doesn't return perfect JSON
            recipeData = {
                recipeName: (recipeText.match(/Recipe Name:\s*(.*)/i) || [])[1] || "Generated Recipe",
                ingredients: (recipeText.match(/Ingredients:\n([\s\S]*?)\nInstructions:/i) || [])[1] || recipeText,
                instructions: (recipeText.match(/Instructions:\n([\s\S]*)/i) || [])[1] || recipeText,
            };
            // Further parsing might be needed for ingredients if not a list
            if (typeof recipeData.ingredients === 'string') {
                recipeData.ingredients = recipeData.ingredients.split('\n').filter(Boolean).map(item => item.trim()) as any;
            }
        }

        return recipeData;

    } catch (error) {
        console.error('Error generating recipe:', error);
        throw new Error("Something went wrong!")
    }
}