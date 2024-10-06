import { ScaleLoader } from "react-spinners";

const CommonLoader = () => {
    return (
        <div className="h-[100vh] w-[100vw] bg-black/20 inset-0 fixed z-[999] backdrop-blur-[2px] justify-center items-center">
            <div className="h-full flex items-center justify-center">
            <ScaleLoader />
            </div>
        </div>
    );
};

export default CommonLoader;