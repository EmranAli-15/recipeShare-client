"use client"

import { useUser } from "@/contextProvider/ContextProvider";
import { useGetMyRecipesQuery } from "@/redux/features/recipe/recipeApi";
import { useAnyUserProfileQuery, useUpdateFollowingMutation } from "@/redux/features/user/userApi";
import Error from "@/ui/Error/Error";
import { debounce } from "@/utils/debounce";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from './styles.module.css';
import Link from "next/link";
import AnyUserProfileLoader from "@/ui/loader/AnyUserProfileLoader";
import RecipeCardLoader from "@/ui/loader/RecipeCardLoader";
import RecipeCard from "@/ui/recipeCard/RecipeCard";
import Image from "next/image";

type recipeType = {
    _id: string;
    title: string;
    image: string;
    rating: number;
}

const Page = ({ params }: { params: { userId: string } }) => {
    const [isFollow, setIsFollow] = useState(false);
    const [moreInfo, serMoreInfo] = useState(false);

    const { user: loggedInUser } = useUser() || {};
    const { email: myEmail, userId: myId } = loggedInUser || {};

    const { data: userData, isLoading, isError } = useAnyUserProfileQuery(params?.userId);
    const { photo, _id, name, email, followers } = userData || {}

    const { data: recipes, isLoading: isRecipesLoading, isError: isRecipesError } = useGetMyRecipesQuery(params?.userId);

    useEffect(() => {
        const isMyIdExist = followers?.find((personId: any) => personId?.toString() == myId);
        if (isMyIdExist) {
            setIsFollow(true);
        };
    }, [myId, userData]);

    const [updateFollowing, { }] = useUpdateFollowingMutation();

    const handleUpdateFollower = () => {
        if (!myEmail) {
            return toast.error("Please Login");
        } else {
            const callTheDebounce = () => {
                updateFollowing({ id: _id, isFollow });
            }
            setIsFollow(!isFollow);
            debounce(callTheDebounce, 1000);
        }
    };


    let profileContent = null;
    if (isLoading) { profileContent = <AnyUserProfileLoader></AnyUserProfileLoader> }
    else if (!isLoading && isError) { profileContent = <Error heading="User Not Found" description="Please Try Again!"></Error> }
    else if (!isLoading && !isError && userData) {
        profileContent = <>
            <div className="flex gap-x-4 items-start md:items-end">
                <div className="w-[80px] h-[80px]">
                    <img className="w-full h-full rounded-full object-cover" src={photo} alt="" />
                    <Image
                        className="w-full h-full rounded-full object-cover"
                        width={80}
                        height={80}
                        src={photo}
                        alt=""
                    ></Image>
                </div>
                <div>
                    <h1 className="text-2xl font-semibold">{name}</h1>
                    <p className="text-gray-500">Followers : {followers.length}</p>
                </div>
            </div>

            <div className="flex items-center justify-between md:gap-x-5 mt-2">
                <div className="shadow-md px-2 py-1 rounded-md">
                    <button
                        onClick={handleUpdateFollower}
                        className={`${email == myEmail && 'hidden'} text-blue-600 w-[70px] text-center active:scale-95 transition`}
                        disabled={isLoading}
                    >
                        {isFollow ? "Following" : "Follow"}
                    </button>
                </div>
                <div
                    onClick={() => serMoreInfo(!moreInfo)}
                    className="shadow-md px-2 py-1 rounded-md active:scale-95 transition cursor-pointer">
                    {moreInfo ? "Less info" : "More info"}
                </div>
            </div>
        </>
    }

    let recipesContent = null;
    if (isRecipesLoading) { recipesContent = <div className="flex justify-center items-center"><RecipeCardLoader></RecipeCardLoader></div> }
    else if (!isRecipesLoading && isRecipesError) { recipesContent = <Error heading="Recipes Not Founded" description="Please Try Again!"></Error> }
    else if (!isRecipesLoading && !isRecipesError && recipes) {
        recipesContent = <div className="bg-[#fff] border rounded-md p-2 mt-2">
            <h1 className="font-semibold text-2xl md:text-3xl my-2">All <span className="text-green-700 font-bold">recipes</span></h1>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
                {
                    recipes.map((recipe: recipeType) => (
                        <Link href={`/recipeDetails/${recipe._id}`} key={recipe._id}>
                            <RecipeCard
                                image={recipe.image}
                                title={recipe.title}
                                rating={recipe.rating}
                            ></RecipeCard>
                        </Link>
                    ))
                }
            </div>
        </div>
    }

    return (
        <div className="max-w-7xl mx-auto p-2">
            <Toaster toastOptions={{ duration: 1000 }}></Toaster>

            <div>
                {/* User sample data */}
                <section className={`${userData && "md:flex md:justify-between md:items-end bg-[#fff] border rounded-md p-2"}`}>
                    {
                        profileContent
                    }
                </section>

                {/* More info */}
                <section className={`${moreInfo ? 'block md:flex md:gap-x-2' : 'hidden'} my-2`}>
                    <div className="md:w-1/2">
                        <div className="bg-[#fff] rounded-md p-2">
                            <div className="flex items-center justify-between">
                                <p className="text-xl font-semibold">Experience</p>
                            </div>
                            <p className="text-gray-500">I'm working since <span className="font-semibold">{userData?.experience || 0}</span> years</p>
                        </div>
                        <div className="bg-[#fff] rounded-md p-2 my-2">
                            <p className="text-xl font-semibold">Total Recipes</p>
                            <p className="text-gray-500">{recipes && recipes.length || 0}</p>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <div className={`bg-[#fff] rounded-md p-2 h-[145px] overflow-auto ${styles.scrollBar}`}>
                            <div className="flex items-start justify-between">
                                <p className="text-xl font-semibold">Bio</p>
                            </div>
                            <p className="text-justify mt-2 text-gray-500">{userData?.bio}</p>
                        </div>
                    </div>
                </section>
            </div>

            <div>
                {
                    recipesContent
                }
            </div>
        </div>
    );
};

export default Page;