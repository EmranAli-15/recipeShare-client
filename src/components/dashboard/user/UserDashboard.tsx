import Link from "next/link";
import { AddRecipe, Logout, User } from "@/ui/icons/Icons";
import { useUser } from "@/contextProvider/ContextProvider";
import Image from "next/image";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { logOutUser } from "@/services/auth/auth";
import { useRouter } from "next/navigation";


type TState = {
    setOpenDashboardModal: (arg: boolean) => void;
}

const UserDashboard = ({ setOpenDashboardModal }: TState) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { setUserLoading } = useUser();

    const { user } = useUser();
    const { name, photo } = user || {};

    const handleLogOut = () => {
        dispatch(userLoggedOut());
        setUserLoading(true);
        logOutUser();
        router.push("/");
        setOpenDashboardModal(false);
    };

    return (
        <div>
            <div className="flex justify-center -mt-6">
                <Link
                    href="/user/myProfile"
                    className="flex flex-col items-center"
                    onClick={() => setOpenDashboardModal(false)}
                >
                    <div className="w-[70px] h-[70px]">
                        {
                            photo ?
                                <Image
                                    className="w-full h-full object-cover rounded-full"
                                    src={photo}
                                    width={70}
                                    height={70}
                                    alt={name}
                                ></Image>
                                :
                                <User w={70}></User>
                        }
                    </div>
                    <p className="font-mono">{name}</p>
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
                <button
                    className="flex flex-col items-center"
                    onClick={handleLogOut}
                >
                    <Logout w={70}></Logout>
                    <p className="font-mono">LogOut</p>
                </button>
            </div>
        </div>
    );
};

export default UserDashboard;