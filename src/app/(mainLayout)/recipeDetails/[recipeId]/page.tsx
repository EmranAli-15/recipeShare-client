const chef = {
    name: "Emran Ali Khali",
    authorImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtZyfL_24dxNcBFCA9J4xmYLi4zKh-ABKeUA&s"
};

const dish = {
    dishName: "Chicken role with salad",
    dishImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYsD0CydDX7BvVVHmNzZ31mz23WdsOAPz2NQ&s",
    rating: 5,
    likes: 4,
    recipe: [
        "2 cups flour",
        "½ teaspoon baking powder",
        "1 tablespoon oil",
        "Warm water 2 make soft dough. Knead very well. Rest for 30 minutes. Divide into 12 small balls. Roll out and dry fry on hot tawa. Set aside covered to keep soft.",
        "U cud use ready made patties or kebaabs",
        "Mince: (S.Essay)",
        "1 kg steak mince",
        "1 cup breadcrumbs",
        "1 tablespoon crushed dhana",
        "1 tablespoon crushed jeera",
        "1 teaspoon mustard powder",
        "2 eggs",
        "100g butter",
    ],
    comments: [
        "comment one 😊",
        "comment two ❤",
        "comment three 👏",
        "comment four ❤❤",
        "comment five",
        "💖💖",
        "comment seven",
    ]
}

import { getSingleRecipe } from "@/services/recipes/recipes";
import Error from "@/ui/Error/Error";
import { Comment, Following, Like, Star } from "@/ui/icons/Icons";

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
                <div className="flex items-center gap-x-5">
                    <div>
                        <img className="size-12 rounded-full border-2" src={chef.authorImage} alt={chef.name} />
                    </div>
                    <div>
                        <p className="text-gray-500">{chef.name}</p>
                        <h1 className="text-xl font-semibold md:hidden">{dish.dishName}</h1>
                    </div>
                </div>


                <hr className="my-1" />


                <div className="grid md:grid-cols-2 md:gap-x-10">
                    <div className="w-full h-48 md:h-96">
                        <img className="w-full h-48 md:h-96 object-cover" src={image} alt="" />
                    </div>

                    <hr className="my-1 md:hidden" />

                    <div>
                        <h1 className="text-4xl font-bold hidden md:block my-5">{title}</h1>
                        <div className="md:mt-10">
                            <div className="grid grid-cols-3 justify-items-center md:justify-items-start">
                                <div>
                                    <p><Like></Like></p>
                                    <p>{like}</p>
                                </div>
                                <div>
                                    <p><Comment></Comment></p>
                                    <p>{totalComment}</p>
                                </div>
                                <div className="flex items-center text-yellow-500">
                                    <p><Star w="22"></Star></p>
                                    <p><Star w="22"></Star></p>
                                    <p><Star w="22"></Star></p>
                                    <p><Star w="22"></Star></p>
                                    <p><Star w="22"></Star></p>
                                </div>
                            </div>
                            <div className="my-3 flex items-center md:items-start justify-between md:justify-evenly">
                                <h1 className="font-semibold italic">Followers : 49</h1>
                                <button className="myBtn h-7"><Following></Following></button>
                            </div>
                        </div>
                    </div>
                </div>


                <hr className="my-1" />


                <div>
                    <h1 className="font-semibold my-2 md:text-2xl">RECIPE / INGREDIENTS</h1>
                    <div
                        dangerouslySetInnerHTML={{ __html: recipe }}
                    >
                    </div>
                </div>

                <div className="mt-10">
                    <p className="font-semibold md:text-xl">Comments :</p>

                    <div className="mb-3 py-1">
                        Past a comment
                        <div>
                            <textarea className="border w-full outline-[#70e000] p-2" rows={3} id=""></textarea>
                            <button className="myBtn w-full h-10">submit</button>
                        </div>
                    </div>

                    <div>
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