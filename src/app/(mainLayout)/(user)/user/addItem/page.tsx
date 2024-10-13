"use client"

import { uploadImage } from '@/utils/utils';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Gallery } from "@/ui/icons/Icons";
import ReactQuill from 'react-quill';
import { useCreateRecipeMutation } from '@/redux/features/recipe/recipeApi';
import { useUser } from '@/contextProvider/ContextProvider';


const AddItemPage = () => {

    const [recipeDetails, setRecipeDetails] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [thumbnailName, setThumbnailName] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Occasion");

    const { user } = useUser();

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
            ['clean']
        ]
    }

    async function uploadImg(e: any) {
        const file = e.target.files[0];
        const url = await uploadImage(file);

        if (url) {
            setRecipeDetails(recipeDetails + `<img src=${url} alt="" />`)
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

    const [createRecipe, { isError, isLoading, isSuccess }] = useCreateRecipeMutation();

    const handleUploadRecipe = () => {
        const data = {
            title: title,
            image: thumbnail,
            recipe: recipeDetails,
            category: category,
            user: user.userId,
        }
        createRecipe(data)
    }

    return (
        <div>
            <div className="my-5">
                <label>Title</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="myInput" type="text"
                />
            </div>

            <div className='md:flex md:items-center gap-x-2'>
                <div className="my-5 md:w-1/2">
                    <label>Select Thumbnail Image</label>
                    <label className="myInput text-center block cursor-pointer" htmlFor="thumbnailImg">
                        <div className="flex items-center justify-center gap-x-2">
                            {
                                thumbnailName ? <span>{thumbnailName.slice(0, 20)}</span> :
                                    <span>Select Thumbnail Image</span>
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
                <div className="my-5 md:w-1/2">
                    <label>Select A Category</label>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        className="myInput text-center block cursor-pointer"
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
                <label>Write here recipe details</label>
                <div className='relative'>
                    <ReactQuill theme="snow" modules={modules} value={recipeDetails} onChange={setRecipeDetails} />
                    <label className='cursor-pointer absolute top-2 right-4' htmlFor="img">
                        <Gallery></Gallery>
                    </label>
                    <input id="img" className='hidden' type="file" onChange={uploadImg} />
                </div>
            </div>

            <button onClick={handleUploadRecipe} className='myBtn w-full my-5'>submit</button>

        </div>
    );
};

export default AddItemPage;