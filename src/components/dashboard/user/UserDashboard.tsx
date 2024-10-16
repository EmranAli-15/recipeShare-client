import Link from "next/link";
import { AddRecipe, RecipeList, User } from "@/ui/icons/Icons";

const UserDashboard = ({ setOpenDashboardModal }: { setOpenDashboardModal: (arg: boolean) => void }) => {
    return (
        <div>
            <div className="flex justify-center -mt-6">
                <div className="flex flex-col items-center">
                    <User w="70"></User>
                    <p className="font-mono">Edit Profile</p>
                </div>
            </div>
            <hr className="my-3" />
            <div className="flex items-center justify-evenly">
                <Link
                    href="/user/addItem"
                    className="flex flex-col items-center"
                    onClick={() => setOpenDashboardModal(false)}
                >
                    <AddRecipe></AddRecipe>
                    <p className="font-mono">Add Recipe</p>
                </Link>
                <div className="flex flex-col items-center">
                    <RecipeList></RecipeList>
                    <p className="font-mono">Edit Recipe</p>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;