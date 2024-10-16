"use server"
const baseUrl = "http://localhost:5000"

export const getLatestRecipes = async () => {
    const res = await fetch(`${baseUrl}/api/recipe/getRecipes?page=0&limit=20`)
   
    if (!res.ok) {
      return null
    }
   
    return res.json()
}