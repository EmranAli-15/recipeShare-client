import Link from "next/link";
import { AddRecipe, Followers, User } from "@/ui/icons/Icons";

const UserDashboard = ({ setOpenDashboardModal }: { setOpenDashboardModal: (arg: boolean) => void }) => {
    return (
        <div>
            <div className="flex justify-center -mt-6">
                <Link
                    href="/user/myProfile"
                    className="flex flex-col items-center"
                    onClick={() => setOpenDashboardModal(false)}
                >
                    <User w="70"></User>
                    <p className="font-mono">My Profile</p>
                </Link>
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
                    <Followers w={65}></Followers>
                    <p className="font-mono">Following</p>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;