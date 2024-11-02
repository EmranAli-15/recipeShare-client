import RecipeDetails from "@/components/recipeDetails/RecipeDetails";
import { getCurrentUser } from "@/services/auth/auth";
import { getSingleRecipe } from "@/services/recipes/recipes";
import Error from "@/ui/Error/Error";
import { Comment, Like, User } from "@/ui/icons/Icons";
import { Metadata } from "next";

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

const recipeDetailsPage = async ({ params }: { params: { recipeId: string } }) => {
    const recipeData = await getSingleRecipe(params.recipeId);
    const { _id, title, image, user, recipe, totalComment, comments, like } = recipeData.data || {};

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
                    <RecipeDetails photo={user.photo} id={user._id} name={user.name} email={user.email}></RecipeDetails>
                </div>


                <hr className="my-2" />


                <div className="bg-[#fff] rounded-md p-2 grid md:grid-cols-2 md:gap-x-10">
                    <h1 className="text-xl font-sans font-semibold md:hidden">{title}</h1>

                    <div className="w-full h-48 md:h-96">
                        <img className="w-full h-48 md:h-96 object-cover" src={image} alt="" />
                    </div>

                    <hr className="my-2 md:hidden" />

                    <div>
                        <h1 className="text-2xl font-semibold font-sans hidden md:block my-5">{title}</h1>
                        <div className="md:mt-10">
                            <div className="grid grid-cols-2 justify-items-center md:justify-items-start">
                                <div>
                                    <p><Like w="21"></Like></p>
                                    <p>{like}</p>
                                </div>
                                <div>
                                    <a href="#comments"><Comment w="20"></Comment></a>
                                    <p>{totalComment}</p>
                                </div>
                                <div>
                                    {/* <button className="bg-slate-50 shadow-md h-7 px-3 rounded-md transition active:translate-y-1 text-gray-600">Follow</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <hr className="my-2" />


                {/* This is the recipe or ingredient section */}
                <div>
                    <h1 className="my-5 md:text-2xl myTextColor border-b-2 border-b-[#74bd2c] border-dashed inline-block">INGREDIENTS</h1>
                    <div
                        className="bg-[#fff] rounded-md p-2"
                        dangerouslySetInnerHTML={{ __html: recipe }}
                    >
                    </div>
                </div>

                <div className="mt-10">
                    <p className="font-semibold md:text-xl">Comments :</p>

                    <div className="mb-3 py-1">
                        Paste a comment
                        <div>
                            <textarea className="border w-full myInput" rows={3} id=""></textarea>
                            <button className="myBtn w-full h-10">submit</button>
                        </div>
                    </div>

                    <div id="comments">
                        {
                            comments.map((comment: string, index: number) => (
                                <div key={index} className="border rounded-md p-2">
                                    <div className="flex items-center gap-x-1">
                                        {/* <img className="size-8 rounded-full" src={user?.photo} alt="" />
                                        <p className="text-gray-500">{user.name}</p> */}
                                    </div>
                                    {/* <p>{comment}</p> */}
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default recipeDetailsPage;