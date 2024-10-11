"use client"

import { FaImage } from "react-icons/fa6";
import { uploadImage } from '@/utils/utils';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FcRating } from "react-icons/fc";


const AddItemPage = () => {
    const [recipeDetails, setRecipeDetails] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [thumbnailName, setThumbnailName] = useState("");
    const [title, setTitle] = useState("");

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

    const handleUploadRecipe = () => {
        const data = {
            title: title,
            image: thumbnail,
            recipe: recipeDetails,
            rating: 5
        }
    }

    return (
        <div>
            <div className="my-5">
                <label>Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="myInput" type="text" name="" id="" />
            </div>

            <div className="my-5 w-full">
                <label>Select Thumbnail Image</label>
                <label className="myInput text-center block cursor-pointer" htmlFor="thumbnailImg">
                    <div className="flex items-center justify-center gap-x-2">
                        {
                            thumbnailName ? <span>{thumbnailName.slice(0, 20)}</span> :
                                <span>Select Thumbnail Image</span>
                        }
                        <FaImage className="size-5"></FaImage>
                    </div>
                </label>
                <input onChange={handleThumbnail} className="hidden" type="file" name="" id="thumbnailImg" />
            </div>

            {/* For rich text editor */}
            <div>
                <label>Write here recipe details</label>
                <div className='relative'>
                    <ReactQuill theme="snow" modules={modules} value={recipeDetails} onChange={setRecipeDetails} />
                    <label className='cursor-pointer absolute top-2 right-4' htmlFor="img">
                        <FaImage className="size-5"></FaImage>
                    </label>
                    <input id="img" className='hidden' type="file" onChange={uploadImg} />
                </div>
            </div>
        </div>
    );
};

export default AddItemPage;