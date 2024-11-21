"use client"

import { useGetMyRecipesQuery } from "@/redux/features/recipe/recipeApi";
import { useAnyUserProfileQuery } from "@/redux/features/user/userApi";
import CommonLoader from "@/ui/loader/CommonLoader";

const Page = ({ params }: { params: { userId: string } }) => {

    const { data: userData, isLoading, isError, isSuccess } = useAnyUserProfileQuery(params?.userId);
    const { data: recipes, isLoading: isRecipesLoading, isError: isRecipesError, isSuccess: isRecipesSuccess } = useGetMyRecipesQuery(params.userId);

    let profileContent = null;
    if (isLoading) { profileContent = <CommonLoader></CommonLoader> }


    return (
        <div className="max-w-7xl mx-auto">
            <div className="bg-[#fff] border rounded-md p-2 h-full]">
                <section className="md:flex items-center">
                    <div></div>
                    <div></div>
                </section>
            </div>
        </div>
    );
};

export default Page;