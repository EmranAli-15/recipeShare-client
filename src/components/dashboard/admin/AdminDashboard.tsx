import Link from "next/link";
import { AddRecipe, RecipeList, User } from "@/ui/icons/Icons";

const AdminDashboard = () => {
    return (
        <div>
            <div className="flex justify-center -mt-6">
                <div className="flex flex-col items-center">
                    <User w="70"></User>
                    <p className="font-mono text-red-600 text-3xl font-semibold">This is admin dashboard</p>
                </div>
            </div>
            <hr className="my-3" />
            <div className="flex items-center justify-evenly">
                <Link href="/admin/addItem" className="flex flex-col items-center">
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

export default AdminDashboard;