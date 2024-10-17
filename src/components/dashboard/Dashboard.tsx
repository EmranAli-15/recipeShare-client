import { Close } from "@/ui/icons/Icons";
import UserDashboard from "./user/UserDashboard";
import { useUser } from "@/contextProvider/ContextProvider";
import AdminDashboard from "./admin/AdminDashboard";


const Dashboard = ({ openDashboardModal, setOpenDashboardModal }: { openDashboardModal: boolean, setOpenDashboardModal: (arg: boolean) => void }) => {

    const { user } = useUser();

    return (
        <div>
            <div
                onClick={() => setOpenDashboardModal(!openDashboardModal)}
                className="h-full w-full bg-black/80 inset-0 fixed z-10 backdrop-blur-[3px] cursor-pointer"
            ></div>
            <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-5 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                <div className="flex justify-end -mt-3 -mr-3">
                    <span className="cursor-pointer" onClick={() => setOpenDashboardModal(false)}>
                        <Close></Close>
                    </span>
                </div>
                {
                    user &&
                        user.role === "admin" ?
                        <AdminDashboard></AdminDashboard> :
                        <UserDashboard setOpenDashboardModal={setOpenDashboardModal}></UserDashboard>
                }
            </div>
        </div>
    );
};

export default Dashboard;