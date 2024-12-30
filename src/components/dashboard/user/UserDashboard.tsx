
import Link from "next/link";
import { AddRecipe, Bookmarked, User } from "@/ui/icons/Icons";
import { useUser } from "@/contextProvider/ContextProvider";
import Image from "next/image";

type TState = {
    setOpenDashboardModal: (arg: boolean) => void;
    setBookmarkModal: (arg: boolean) => void;
    bookmarkModal: boolean;
}

const UserDashboard = ({ setOpenDashboardModal, setBookmarkModal, bookmarkModal }: TState) => {

    const { user } = useUser();
    const { name, photo } = user || {};

    return (
        <div className={`${bookmarkModal && "hidden"}`}>
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
                    onClick={() => setBookmarkModal(true)}
                >
                    <Bookmarked></Bookmarked>
                    <p className="font-mono">Bookmarked</p>
                </button>
            </div>
        </div>
    );
};

export default UserDashboard;