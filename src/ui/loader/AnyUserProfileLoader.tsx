const AnyUserProfileLoader = () => {
    return (
        <div className="md:flex md:justify-between md:items-end bg-[#fff] text-slate-100 rounded-md p-2 animate-pulse">
            <div className="flex gap-x-4 items-start md:items-end">
                <div className="w-[80px] h-[80px]">
                    <h1 className="w-full h-full rounded-full bg-slate-100"></h1>
                </div>
                <div>
                    <h1 className="h-8 w-44 bg-slate-100 rounded-md">Name</h1>
                    <p className="h-6 w-24 bg-slate-100 rounded-md mt-1">Followers</p>
                </div>
            </div>

            <div className="flex items-center justify-between md:gap-x-5 mt-2">
                <div className="h-8 w-28 bg-slate-100 rounded-md">
                    Follow
                </div>
                <div className="h-8 w-28 bg-slate-100 rounded-md">
                    More info
                </div>
            </div>
        </div>
    );
};

export default AnyUserProfileLoader;