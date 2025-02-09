"use client"

import dynamic from "next/dynamic";
import React, { useEffect, useState } from 'react';
import Error from '@/ui/Error/Error';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { useCreateRecipeMutation } from '@/redux/features/recipe/recipeApi';
import { uploadImage } from '@/utils/utils';
import { Gallery } from "@/ui/icons/Icons";
import { useUser } from '@/contextProvider/ContextProvider';
import Success from '@/ui/success/Success';
import CommonLoader from '@/ui/loader/CommonLoader';


const AddItemPage = () => {
    const { user } = useUser();

    const [recipeDetails, setRecipeDetails] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [thumbnailName, setThumbnailName] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState("");
    const [errorDescription, setErrorDescription] = useState("");


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

    const resetForm = () => {
        setRecipeDetails("")
        setThumbnail("")
        setThumbnailName("")
        setTitle("")
        setCategory("")
        setError("")
        setErrorDescription("")
    }

    const [createRecipe, { isError, isLoading, isSuccess, error: mutationError }] = useCreateRecipeMutation();

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
                user: user.userId,
            }
            createRecipe(data);
        }
    }

    useEffect(() => {
        if (isSuccess) {
            resetForm();
        }
        if (isError) {
            if ('data' in mutationError) {
                setError((mutationError.data as any)?.message);
            } else {
                setError('An unknown error occurred.');
            }
            setErrorDescription("There was happened an unknown error, please try again!");
        }
    }, [isError, isSuccess])

    return (
        <div>
            {isLoading && <CommonLoader></CommonLoader>}

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
                    <label className='text-gray-400'>{!thumbnail && <span className='text-red-600'>*</span>} Select Thumbnail Image</label>
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
                        <option hidden value="">Select One</option>
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
                isSuccess && <Success heading="Recipe uploaded successfully!" description='Wow 😍, Congratulations! Your recipe uploaded successfully!'></Success>
            }

            <button disabled={isLoading} onClick={handleUploadRecipe} className='myBtn w-full my-5'>Submit</button>

        </div>
    );
};

export default AddItemPage;