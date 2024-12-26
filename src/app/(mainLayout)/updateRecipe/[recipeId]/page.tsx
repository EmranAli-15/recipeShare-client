"use client"

import { useGetSingleRecipeForUpdateQuery, useUpdateRecipeMutation } from "@/redux/features/recipe/recipeApi";
import { useEffect, useState } from "react";
import { uploadImage } from "@/utils/utils";
import { Gallery } from "@/ui/icons/Icons";
import CommonLoader from "@/ui/loader/CommonLoader";
import ReactQuill from "react-quill";
import Success from "@/ui/success/Success";
import Error from "@/ui/Error/Error";
import 'react-quill/dist/quill.snow.css';

const UpdateRecipePage = ({ params }: { params: { recipeId: string } }) => {
    const recipeID = params?.recipeId;
    const { data: queryData, isLoading: queryLoading, isError: queryError, isSuccess: querySuccess } = useGetSingleRecipeForUpdateQuery(recipeID);

    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const [category, setCategory] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [recipeDetails, setRecipeDetails] = useState("");
    const [thumbnailName, setThumbnailName] = useState("");
    const [errorDescription, setErrorDescription] = useState("");

    useEffect(() => {
        if (queryData) {
            setTitle(queryData.title);
            setCategory(queryData.category);
            setRecipeDetails(queryData.recipe);
            setThumbnail(queryData.image);
            const image = queryData.image.split("/");
            setThumbnailName(image[image.length - 1]);
        }
    }, [queryData])


    // Modules for rich text editor
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
        ]
    }

    // Insert live image in text editor
    async function uploadImg(e: any) {
        const file = e.target.files[0];
        const url = await uploadImage(file);

        if (url) {
            setRecipeDetails(recipeDetails + `<img class="textEditorImage" src="${url}" alt="" />`)
        }
    }

    const handleThumbnail = async (e: any) => {
        const file = e.target.files[0];
        const url = await uploadImage(file);
        setThumbnailName(e.target.files[0].name);

        if (url) {
            setThumbnail(url)
        }
    }

    const [updateRecipe, { isError: updateError, isLoading: updateLoading, isSuccess: updateSuccess }] = useUpdateRecipeMutation();

    const handleUploadRecipe = () => {
        setError("");

        if (!title || !recipeDetails || !thumbnail || !category) {
            setError("Please fill-up all fields!");
            setErrorDescription("You have to fill-up all of the fields for uploading an recipe!");
        } else {
            const data = {
                title: title,
                image: thumbnail,
                recipe: recipeDetails,
                category: category,
            }
            updateRecipe({ data, recipeID })
        }
    };

    useEffect(() => {
        if (updateError) {
            setError("Something went wrong!");
            setErrorDescription("There was happened an unknown error, please try again!");
        }
    }, [updateError, updateSuccess]);




    let content = null;

    if (queryLoading) {
        content = <CommonLoader></CommonLoader>
    } else if (!queryLoading && queryError) {
        content = <Error
            heading="Recipe Not Found!"
            description="Recipe not found. Please try again."
        ></Error>
    } else if (!queryLoading && !queryError && querySuccess) {
        content = <div>
            {updateLoading && <CommonLoader></CommonLoader>}

            <div className="my-2">
                <label className='text-gray-400'>{!title && <span className='text-red-600'>*</span>} Title</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="myInput" type="text"
                />
            </div>

            <div className='md:flex md:items-center gap-x-2'>
                <div className="mb-2 md:w-1/2">
                    <label className='text-gray-400'>Select Thumbnail Image</label>
                    <label className="myInput bg-[#fff] text-center block cursor-pointer" htmlFor="thumbnailImg">
                        <div className="flex items-center h-[21px] justify-center gap-x-2">
                            {
                                thumbnailName ? <span>{thumbnailName.slice(0, 20)}</span> :
                                    <span className='text-gray-400'>Select Thumbnail Image</span>
                            }
                            <Gallery></Gallery>
                        </div>
                    </label>
                    <input
                        onChange={handleThumbnail}
                        className="hidden"
                        type="file"
                        id="thumbnailImg"
                    />
                </div>
                <div className="mb-2 md:w-1/2">
                    <label className='text-gray-400'>{!category && <span className='text-red-600'>*</span>} Select A Category</label>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        className="myInput text-center block cursor-pointer text-gray-400"
                    >
                        <option hidden value={category}>{category}</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Occasion">Occasion</option>
                    </select>
                </div>
            </div>

            {/* For rich text editor */}
            <div>
                <label className='text-gray-400'>{!recipeDetails && <span className='text-red-600'>*</span>} Write here recipe details</label>
                <div className='relative'>
                    <ReactQuill theme="snow" modules={modules} value={recipeDetails} onChange={setRecipeDetails} />
                    <label className='cursor-pointer absolute top-4 right-4' htmlFor="img">
                        <Gallery></Gallery>
                    </label>
                    <input id="img" className='hidden' type="file" onChange={uploadImg} />
                </div>
            </div>

            {
                error && <Error heading={error} description={errorDescription}></Error>
            }

            {
                updateSuccess && <Success heading="Recipe uploaded successfully!" description='Wow 😍, Congratulations! Your recipe uploaded successfully!'></Success>
            }

            <button onClick={handleUploadRecipe} className='myBtn w-full my-5'>Update</button>

        </div>
    }



    return (
        <div className="max-w-7xl mx-auto px-2 md:px-0">
            <button>DELETE</button>
            {
                content
            }
        </div>
    );
};

export default UpdateRecipePage;