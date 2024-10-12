import { MdAddBox } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaUserEdit } from "react-icons/fa";
import Link from "next/link";

const UserDashboard = () => {
    return (
        <div>
            <div className="flex justify-center -mt-6">
                <div className="flex flex-col items-center">
                    <FaUserEdit className="size-10 md:size-12 text-[#134B70]"></FaUserEdit>
                    <p className="font-mono">Edit Profile</p>
                </div>
            </div>
            <hr className="my-3" />
            <div className="flex items-center justify-evenly">
                <Link href="/user/addItem" className="flex flex-col items-center">
                    <MdAddBox className="size-12 md:size-20 text-[#FF6500]"></MdAddBox>
                    <p className="font-mono">Add Recipe</p>
                </Link>
                <div className="flex flex-col items-center">
                    <LuClipboardEdit className="size-10 md:size-[70px] text-[#1E3E62]"></LuClipboardEdit>
                    <p className="font-mono">Edit Recipe</p>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;