"use client"

import Swal from 'sweetalert2';
import Error from '@/ui/Error/Error';
import styles from './styles.module.css';
import Success from '@/ui/success/Success';
import Editor from '@/components/editor/Editor'
import CommonLoader from '@/ui/loader/CommonLoader';
import toast, { Toaster } from 'react-hot-toast';
import React, { useEffect, useState } from 'react'
import { Gallery } from '@/ui/icons/Icons';
import { useRouter } from 'next/navigation';
import { BeatLoader } from 'react-spinners';
import { uploadImage } from '@/utils/utils';
import { useDeleteRecipeMutation, useGetSingleRecipeForUpdateQuery, useUpdateRecipeMutation } from '@/redux/features/recipe/recipeApi';

export default function page({ params }: { params: { recipeId: string } }) {
  const router = useRouter();
  const [data, setData] = useState("");
  const [content, setContent] = useState("");

  const recipeID = params?.recipeId;
  const { data: queryData, isLoading: queryLoading, isError: queryError, isSuccess: querySuccess } = useGetSingleRecipeForUpdateQuery(recipeID);

  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailName, setThumbnailName] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [thumbnailLoading, setThumbnailLoading] = useState(false);

  useEffect(() => {
    if (queryData) {
      setTitle(queryData.title);
      setCategory(queryData.category);
      setData(queryData.recipe);
      setThumbnail(queryData.image);
      const image = queryData.image.split("/");
      setThumbnailName(image[image.length - 1]);
    }
  }, [queryData])






  // Recipe Update Functionality
  const handleThumbnail = async (e: any) => {
    setThumbnailLoading(true);
    const file = e.target.files[0];
    const url = await uploadImage(file);
    setThumbnailName(e.target.files[0].name);

    if (url) {
      setThumbnail(url);
      setThumbnailLoading(false);
    }
  }

  const [updateRecipe, { isError: updateError, isLoading: updateLoading, isSuccess: updateSuccess }] = useUpdateRecipeMutation();

  const handleUploadRecipe = () => {
    setError("");

    if (!title || !thumbnail || !category) {
      setError("Please fill-up all fields!");
      setErrorDescription("You have to fill-up all of the fields for uploading an recipe!");
    } else {
      const data = {
        title: title,
        image: thumbnail,
        recipe: content,
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
  // Recipe Update Functionality End





  // Recipe delete functionality
  const [deleteRecipe, { isLoading: deleteLoading, isSuccess: deleteSuccess, isError: deleteError }] = useDeleteRecipeMutation();
  const handleDeleteRecipe = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecipe(recipeID);
      }
    });
  };

  useEffect(() => {
    if (deleteError) {
      toast.error("Delete canceled!");
    }
    if (deleteLoading) {
      toast.loading("Loading...");
    }
    if (deleteSuccess) {
      toast.success("Deleted");
      router.push("/");
    }
  }, [deleteError, deleteSuccess]);
  // Recipe delete functionality






  // Data Fetching Handling
  let contentData = null;

  if (queryLoading) {
    contentData = <CommonLoader></CommonLoader>
  } else if (!queryLoading && queryError) {
    contentData = <Error
      heading="Recipe Not Found!"
      description="Recipe not found. Please try again."
    ></Error>
  } else if (!queryLoading && !queryError && querySuccess) {
    contentData = <div>
      {updateLoading && <CommonLoader></CommonLoader>}

      <div className="mb-2">
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
                thumbnailLoading ? <div className='flex items-center justify-center'>
                  <BeatLoader color="#fff"></BeatLoader>
                </div> : thumbnailName ? <span>{thumbnailName.slice(0, 20)}</span> :
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

      {
        error && <Error heading={error} description={errorDescription}></Error>
      }

      {
        updateSuccess && <Success heading="Recipe uploaded successfully!" description='Wow 😍, Congratulations! Your recipe uploaded successfully!'></Success>
      }
    </div>
  }




  return (
    <div className='max-w-7xl mx-auto px-2 md:px-0'>
      <Toaster toastOptions={{ duration: 1000 }}></Toaster>

      <div className="text-end">
        <button
          onClick={handleDeleteRecipe}
          disabled={deleteLoading}
          className="h-7 active:scale-90 mt-1 -mb-1 hover:bg-red-500 hover:text-white px-2 rounded-md bg-gray-200">
          Delete
        </button>
      </div>

      {
        contentData
      }

      <div className={styles.recipeDetails}>
        <Editor data={data} setContent={setContent}></Editor>
      </div>

      <button onClick={handleUploadRecipe} className='myBtn w-full my-5'>Update</button>
    </div>
  )
}
