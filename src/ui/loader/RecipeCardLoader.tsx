const RecipeCardLoader = () => {
    return (
        <div className="animate-pulse">
            <h1 className="bg-[#fff] text-[#fff] h-10 w-40 rounded-md my-2">User name</h1>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 bg-[#fff] text-slate-100 rounded-md p-2">
                {
                    Array(10).fill(null).map((d, index) => (
                        <div key={index}>
                            <div>
                                <div className="w-[168px] md:w-60 h-28 bg-slate-100 rounded-md">
                                </div>
                                <div className="md:px-2 mt-1">
                                    <h1 className="bg-slate-100 h-6 rounded-md">Title</h1>
                                    <h1 className="bg-slate-100 h-5 w-3/4 rounded-md mt-1">User name</h1>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default RecipeCardLoader;