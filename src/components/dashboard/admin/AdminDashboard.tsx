import Link from "next/link";
import { AddRecipe, RecipeList } from "@/ui/icons/Icons";
import { useUser } from "@/contextProvider/ContextProvider";

const AdminDashboard = ({ setOpenDashboardModal }: { setOpenDashboardModal: (arg: boolean) => void }) => {

    const { user } = useUser();
    const { name, photo } = user || {};

    return (
        <div>
            <div className="flex justify-center -mt-6">
                <Link
                    href="/admin/adminProfile"
                    className="flex flex-col items-center"
                    onClick={() => setOpenDashboardModal(false)}
                >
                    <div className="w-[70px]">
                        <img className="w-[70px] rounded-full" src={photo} alt={name} />
                    </div>
                    <p className="font-mono">{name}</p>
                </Link>
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