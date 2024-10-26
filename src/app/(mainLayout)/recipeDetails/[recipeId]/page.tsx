import { getSingleRecipe } from "@/services/recipes/recipes";
import Error from "@/ui/Error/Error";
import { Comment, Like, User } from "@/ui/icons/Icons";

const recipeDetailsPage = async ({ params }: { params: { recipeId: string } }) => {
    const recipeData = await getSingleRecipe(params.recipeId);
    const { title, image, user, recipe, totalComment, comments, like, category, rating } = recipeData.data || {};

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
            <div className="max-w-7xl mx-auto px-2 my-2 md:px-0">
                <div className="flex items-center gap-x-3">
                    <div>
                        {
                            user.photo ? <img className="size-12 rounded-full border-2" src={user.photo} alt={user.name} /> :
                                <div className="rounded-full border p-1">
                                    <User w="30"></User>
                                </div>
                        }
                    </div>
                    <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-blue-600 text-sm cursor-pointer">Follow</p>
                    </div>
                </div>


                <hr className="my-1" />


                <div className="grid md:grid-cols-2 my-3 md:gap-x-10">
                    <h1 className="text-xl my-2 font-sans font-semibold md:hidden">{title}</h1>

                    <div className="w-full h-48 md:h-96">
                        <img className="w-full h-48 md:h-96 object-cover" src={image} alt="" />
                    </div>

                    <hr className="my-1 md:hidden" />

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


                <hr className="my-1" />


                <div>
                    <h1 className="my-5 md:text-2xl myTextColor border-b-2 border-b-[#74bd2c] border-dashed inline-block">INGREDIENTS</h1>
                    <div
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