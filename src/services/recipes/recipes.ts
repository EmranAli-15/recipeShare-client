"use server"

import { revalidateTag } from "next/cache";

const baseUrl = "https://foodrecipe-psi.vercel.app"

export const getRecipes = async (category: any) => {
  const res = await fetch(`${baseUrl}/api/recipe/getRecipes?page=0&limit=9&category=${category}`, {
    next: {
      revalidate: 180,
    }
  })

  if (!res.ok) {
    return null
  }

  return res.json()
};

export const getSingleRecipe = async (id: string) => {
  const res = await fetch(`${baseUrl}/api/recipe/getSingleRecipe/${id}`, {
    cache: "no-cache",
    next: {
      tags: ["refetchSingleRecipe"]
    }
  });

  if (!res.ok) {
    return null
  }

  return res.json();
};

export const reFetchGetSingleRecipe = async () => {
  revalidateTag("refetchSingleRecipe");
}