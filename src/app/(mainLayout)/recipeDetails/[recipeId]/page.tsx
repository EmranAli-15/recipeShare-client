import Comments from "@/components/recipeDetails/Comments";
import Likes from "@/components/recipeDetails/Likes";
import Image from "next/image";
import Error from "@/ui/Error/Error";
import styles from "./styles.module.css";
import RecipeDetails from "@/components/recipeDetails/RecipeDetails";
import { getSingleRecipe } from "@/services/recipes/recipes";
import { Metadata } from "next";
import { Comment } from "@/ui/icons/Icons";

// For metadata
export async function generateMetadata({ params }: { params: { recipeId: string } }): Promise<Metadata> {
    const recipeData = await getSingleRecipe(params.recipeId);
    if (!recipeData?.data) {
        return {
            title: "Recipe Not Found",
            description: "The recipe you're looking for does not exist.",
        };
    }
    const { title } = recipeData.data;
    return {
        title: title || "Recipe Details",
        description: `Detailed information to cooking about the ${title} recipe.`,
    };
}

const RecipeDetailsPage = async ({ params }: { params: { recipeId: string } }) => {
    const recipeData = await getSingleRecipe(params.recipeId);

    const { _id, title, image, user, recipe, comments, likes } = recipeData.data || {};

    if (!recipeData?.data) {
        return <div className="max-w-7xl mx-auto px-2 md:px-0">
            <Error
                heading="The recipe not found!"
                description="For some reason the recipe is not founded, You can Refresh the page or report us."
            >
            </Error>
        </div>
    }

    return (
        <div>
            <div className="max-w-7xl mx-auto px-2 mt-2 md:px-0">
                <div>
                    {/* This section is rendered in client side that's why used another component instead render in client side whole page */}
                    <RecipeDetails title={title} image={image} recipeId={_id} user={user}></RecipeDetails>
                </div>

                <div className="bg-[#fff] rounded-md p-2 grid md:grid-cols-2 md:gap-x-10 my-2">
                    <h1 className="text-xl font-sans font-semibold md:hidden pb-4">{title}</h1>

                    <div className="w-full h-48 md:h-96">
                        <Image
                            className="w-full h-48 md:h-96 object-cover"
                            src={image}
                            height={192}
                            width={500}
                            alt=""
                        ></Image>
                    </div>

                    <div className="my-2">
                        <h1 className="text-2xl font-semibold font-sans hidden md:block my-5">{title}</h1>
                        <div className="md:mt-10">
                            <div className="grid grid-cols-2 justify-items-center md:justify-items-start">
                                <div>
                                    <Likes likes={likes} recipeId={_id}></Likes>
                                </div>
                                <div className="flex flex-col items-center">
                                    <a href="#comments"><Comment w="20"></Comment></a>
                                    <p>{!comments ? "0" : comments?.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* This is the recipe or ingredient section */}
                <div>
                    <h1 className="mt-4 mb-2 md:text-2xl myTextColor border-b-2 border-b-[#fd992e] border-dashed inline-block">INGREDIENTS</h1>
                    <div
                        className={`bg-[#fff] rounded-md p-2 ${styles.recipeDetails}`}
                        dangerouslySetInnerHTML={{ __html: recipe }}
                    >
                    </div>
                </div>

                <div className="mt-4">
                    <div id="comments">
                        {/* All comments */}
                        {
                            <Comments
                                id={_id}
                                comments={comments}
                            ></Comments>
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RecipeDetailsPage;