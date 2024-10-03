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

import { SlLike } from "react-icons/sl";
import { FaComments } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { MdDone } from "react-icons/md";

const recipeDetailsPage = ({ params }: { params: { recipeId: string } }) => {
    console.log(params.recipeId);

    return (
        <div>
            <div className="max-w-7xl mx-auto px-2 my-2 md:px-0">
                <div className="flex items-center gap-x-5">
                    <div>
                        <img className="size-12 rounded-full border-2" src={chef.authorImage} alt={chef.name} />
                    </div>
                    <div>
                        <p className="text-gray-500">{chef.name}</p>
                        <h1 className="text-xl font-semibold">{dish.dishName}</h1>
                    </div>
                </div>
                <hr className="my-1" />
                <div>
                    <div className="w-full h-48 md:h-96">
                        <img className="w-full h-48 md:h-96 object-cover" src={dish.dishImage} alt="" />
                    </div>
                    <hr className="my-1" />
                    <div className="grid grid-cols-3 justify-items-center">
                        <div>
                            <p><SlLike></SlLike></p>
                            <p>56</p>
                        </div>
                        <div>
                            <p className="text-blue-600"><FaComments></FaComments></p>
                            <p>12</p>
                        </div>
                        <div className="flex items-center text-yellow-500">
                            <p><FaStar size={13}></FaStar></p>
                            <p><FaStar size={13}></FaStar></p>
                            <p><FaStar size={13}></FaStar></p>
                            <p><FaStar size={13}></FaStar></p>
                            <p><FaStar size={13}></FaStar></p>
                        </div>
                    </div>
                </div>
                <hr className="my-1" />
                <div>
                    <h1 className="font-semibold my-2">RECIPE / INGREDIENTS</h1>
                    <div>
                        {
                            dish.recipe.map((item, index) => (
                                <div className="border-b flex items-start gap-x-2">
                                    <p className="text-green-400 font-extrabold"><MdDone size={20}></MdDone></p>
                                    <p>{item}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="mt-10">
                    <p className="font-semibold">Comments :</p>

                    <div className="mb-3 py-1">
                        Past a comment
                        <div>
                            <textarea className="border w-full outline-[#70e000] p-2" rows={3} id=""></textarea>
                            <button className="myBtn w-full h-10">submit</button>
                        </div>
                    </div>

                    <div>
                        {
                            dish.comments.map((comment, index) => (
                                <div className="border rounded-md p-2">
                                    <div className="flex items-center gap-x-1">
                                        <img className="size-8 rounded-full" src={chef.authorImage} alt="" />
                                        <p className="text-gray-500">{chef.name}</p>
                                    </div>
                                    <p>{comment}</p>
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