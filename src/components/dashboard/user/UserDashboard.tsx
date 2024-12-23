import Link from "next/link";
import { AddRecipe, Followers, User } from "@/ui/icons/Icons";
import { useUser } from "@/contextProvider/ContextProvider";
import Image from "next/image";

const UserDashboard = ({ setOpenDashboardModal }: { setOpenDashboardModal: (arg: boolean) => void }) => {

    const { user } = useUser();
    const { name, photo } = user || {};

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
                <div className="flex flex-col items-center">
                    <Followers w={65}></Followers>
                    <p className="font-mono">Following</p>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;