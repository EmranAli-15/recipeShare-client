const Success = ({ heading, description }: { heading: string, description: string }) => {
    return (
        <div>
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg my-5">
                <p className="text-lg font-semibold">{heading}</p>
                <p>{description}</p>
            </div> </div>
    );
};

export default Success;