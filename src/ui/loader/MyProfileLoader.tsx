const MyProfileLoader = () => {
    return (
        <div className="animate-pulse">
            <div className="flex items-center gap-x-2 pt-2">
                <div><div className="h-16 w-16 md:w-20 md:h-20 bg-[#fff] rounded-full"></div></div>
                <div className="h-16 md:h-20 w-full bg-[#fff] rounded-md"></div>
            </div>
            <div className="md:flex md:h-64 items-center gap-x-2 pt-2">
                <div className="md:w-1/2 md:h-64">
                    <div className="h-16 md:h-1/3 w-full bg-[#fff] rounded-md mt-[5px]"></div>
                    <div className="h-16 md:h-1/3 w-full bg-[#fff] rounded-md mt-[5px]"></div>
                    <div className="h-16 md:h-1/3 w-full bg-[#fff] rounded-md mt-[5px]"></div>
                </div>
                <div className="w-full h-40 md:w-1/2 bg-[#fff] rounded-md md:h-[260px] mt-2 md:mt-5"></div>
            </div>
        </div>
    );
};

export default MyProfileLoader;