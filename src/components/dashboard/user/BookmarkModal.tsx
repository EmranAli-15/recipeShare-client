"use-client"

import { Delete } from "@/ui/icons/Icons";
import Image from "next/image";
import Link from "next/link";

const BookmarkModal = ({ setOpenDashboardModal }: { setOpenDashboardModal: (arg: boolean) => void; }) => {
    const getBookmark = localStorage.getItem("bookmark");

    let bookmark;
    if (getBookmark) {
        bookmark = JSON.parse(getBookmark);
    };

    return (
        <div>
            {
                !bookmark && <h1 className="text-center text-gray-500">No recipes you saved!</h1>
            }
            {
                bookmark?.length > 0 && bookmark.map((recipe: any, index: number) => {
                    return <div className="flex gap-x-2 my-3" key={index}>
                        <Link
                            href={`/recipeDetails/${recipe.id}`}
                            onClick={() => setOpenDashboardModal(false)}
                            className="h-28 w-1/2 md:w-[30%]">
                            <Image
                                className="w-40 h-28 object-cover rounded-sm"
                                width={160}
                                height={112}
                                src={recipe.image}
                                alt={recipe.title}
                            ></Image>
                        </Link>
                        <div className="flex flex-col justify-between md:px-2 w-1/2 md:w-[70%]">
                            <div>
                                <h1 className="font-semibold mt-2 mb-1 line-clamp-1">{recipe.title}</h1>
                                <p className=" text-gray-500 text-sm line-clamp-1">{recipe.name}</p>
                            </div>
                            <div className="flex justify-end">
                                <Delete w={20}></Delete>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    );
};

export default BookmarkModal;