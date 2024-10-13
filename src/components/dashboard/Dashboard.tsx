import { Close } from "@/ui/icons/Icons";
import UserDashboard from "./user/UserDashboard";


const Dashboard = ({ openModal, setOpenModal }: { openModal: boolean, setOpenModal: (arg: boolean) => void }) => {

    return (
        <div>
            <div
                onClick={() => setOpenModal(!openModal)}
                className="h-full w-full bg-black/20 inset-0 fixed z-10 backdrop-blur-[3px] cursor-pointer"
            ></div>
            <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-5 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                <div className="flex justify-end -mt-3 -mr-3">
                    <span className="cursor-pointer" onClick={() => setOpenModal(false)}>
                        <Close></Close>
                    </span>
                </div>
                {
                    <UserDashboard></UserDashboard>
                }
            </div>
        </div>
    );
};

export default Dashboard;