const recipeDetailsPage = ({ params }: { params: { recipeId: string } }) => {
    console.log(params.recipeId);

    return (
        <div>
            <div className="max-w-7xl mx-auto px-2 md:px-0">
            <h1>Welcome to the recipeDetailsPage page : {params.recipeId}</h1>
            </div>
        </div>
    );
};

export default recipeDetailsPage;