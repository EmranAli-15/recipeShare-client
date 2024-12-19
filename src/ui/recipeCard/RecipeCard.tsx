import { Star } from "../icons/Icons";

type TCardInfo = {
    image: string;
    title: string;
    rating: number;
    name: string;
}

const RecipeCard = ({ image, title, rating, name }: TCardInfo) => {
    return (
        <>
            <div className="w-36 h-28 md:w-full md:h-32">
                <img className="w-full h-full object-cover rounded-sm" src={image} alt={title} />
            </div>
            <div className="md:px-2">
                <h1 className="font-semibold my-2 line-clamp-2">{title}</h1>
                <div className="flex items-start pb-1">
                    <div className="flex items-center text-[12px] bg-[#f1f2f4] px-1">
                        <span className="text-yellow-500">
                            <Star w="17"></Star>
                        </span>
                        <p>
                            {rating}
                        </p>
                    </div>
                    <p className="ml-5 text-gray-500 text-sm">{name}</p>
                </div>
            </div>
        </>
    );
};

export default RecipeCard;