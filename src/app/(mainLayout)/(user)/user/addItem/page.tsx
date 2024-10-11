"use client"
import { FaImage } from "react-icons/fa6";

import { uploadImage } from '@/utils/utils';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const AddItemPage = () => {
    const [value, setValue] = useState('');

    const handleFn = () => {
        console.log(value);

    }

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
            ['clean']
        ]
    }

    async function handleChange(e: any) {

        const file = e.target.files[0];

        const url = await uploadImage(file);

        if (url) {
            setValue(value + `<img src=${url} alt="" />`)
        }

    }

    return (
        <div className='relative'>
            <ReactQuill theme="snow" modules={modules} value={value} onChange={setValue} />
            <button onClick={handleFn}>SUbmit</button>

            <label className='cursor-pointer absolute top-2 right-4' htmlFor="img">
                <FaImage className="size-5"></FaImage>
            </label>
            <input id="img" className='hidden' type="file" onChange={handleChange} />
        </div>
    );
};

export default AddItemPage;