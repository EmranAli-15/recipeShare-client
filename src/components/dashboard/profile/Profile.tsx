"use client"

import { useUser } from "@/contextProvider/ContextProvider";
import Error from "@/ui/Error/Error";
import { Close, User } from "@/ui/icons/Icons";
import CommonLoader from "@/ui/loader/CommonLoader";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./styles.module.css"
import { uploadImage } from "@/utils/utils";
import { useMyProfileQuery, useUpdateUserMutation } from "@/redux/features/user/userApi";
import SectionLoader from "@/ui/loader/SectionLoader";
import MyRecipes from "../myRecipes/MyRecipes";
import { useAppSelector } from "@/redux/hooks";

const PHOTO_NAME = "PHOTO_NAME";
const EXPERIENCE = "EXPERIENCE";
const BIO = "BIO";

const MyProfilePage = () => {
    const myTotalRecipes = useAppSelector((state) => state.recipeFromRedux.myTotalRecipe);

    const { user } = useUser();
    const { userId } = user || {};
    const [profileModal, setProfileModal] = useState(false);
    const [userUpdate, setUserUpdate] = useState("");

    const { data: myProfile, isError, isLoading, isSuccess } = useMyProfileQuery(userId);

    const [userPhoto, setUserPhoto] = useState("");
    const [isUserPhotoChange, setIsUserPhotoChange] = useState(false);
    const [userPhotoUrl, setUserPhotoUrl] = useState<File | "">("");
    const [userName, setUserName] = useState("");
    const [userExperience, setUserExperience] = useState(0);
    const [userBio, setUserBio] = useState("");

    const handlePhoto = (e: File) => {
        setUserPhoto(URL.createObjectURL(e));
        setUserPhotoUrl(e);
        setIsUserPhotoChange(true);
    }

    const updatingUserData = (data: any) => {
        if (data == PHOTO_NAME) {
            setUserUpdate(PHOTO_NAME)
        } else if (data == EXPERIENCE) {
            setUserUpdate(EXPERIENCE)
        } else if (data == BIO) {
            setUserUpdate(BIO)
        }
        setProfileModal(true);
    };



    const [updateUser, { isLoading: updateUserLoading, isSuccess: updateUserSuccess, isError: updateUserError }] = useUpdateUserMutation();

    const handleUpdateUserData = async () => {
        let updatedData = null;
        if (userUpdate == PHOTO_NAME) {
            let userNewPhoto = null;

            if (isUserPhotoChange) {
                userNewPhoto = await uploadImage(userPhotoUrl);
            };
            updatedData = {
                photo: userNewPhoto ? userNewPhoto : userPhoto || "",
                name: userName || "Bob"
            };
        }
        else if (userUpdate == EXPERIENCE) {
            updatedData = {
                experience: userExperience || 0
            };
        }
        else if (userUpdate == BIO) {
            updatedData = {
                bio: userBio
            };
        }

        const finalUpdatedData = {
            data: updatedData,
            id: userId
        }
        updateUser(finalUpdatedData);

        setIsUserPhotoChange(false);
    };

    useEffect(() => {
        if (isSuccess) {
            setUserName(myProfile?.name);
            setUserExperience(myProfile?.experience);
            setUserPhoto(myProfile?.photo);
            setUserBio(myProfile?.bio);
        }
    }, [isError, isLoading, isSuccess, profileModal]);

    useEffect(() => {
        if (updateUserSuccess) {
            setProfileModal(false);
        }
    }, [updateUserLoading, updateUserSuccess, updateUserError]);

    let content = null;

    if (isLoading) {
        content = <CommonLoader></CommonLoader>
    } else if (!isLoading && isError) {
        content = <Error heading="Something went wrong!" description="There wan an unknown error. Please try agin!"></Error>
    } else if (!isLoading && !isError && isSuccess) {
        content = <div>
            {/* This is a modal for updating user data */}
            <div>
                {
                    profileModal &&
                    <div>
                        <div
                            onClick={() => setProfileModal(!profileModal)}
                            className="h-full w-full bg-black/80 inset-0 fixed z-10 backdrop-blur-[3px] cursor-pointer"
                        ></div>
                        <div className="w-[100vw] lg:w-[600px] space-y-6 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                            <div className="modalAnimation bg-white p-4 rounded">
                                {
                                    updateUserLoading &&
                                    <div className="flex justify-center">
                                        <SectionLoader></SectionLoader>
                                    </div>
                                }
                                <div className="flex justify-end -mt-2 -mr-2">
                                    <span className="cursor-pointer" onClick={() => setProfileModal(false)}>
                                        <Close></Close>
                                    </span>
                                </div>
                                {
                                    userUpdate == PHOTO_NAME && <div>
                                        <div className="flex items-end">
                                            <div>
                                                {
                                                    userPhoto ? <img className="size-[90px] rounded-full" src={userPhoto} /> :
                                                        myProfile?.photo ?
                                                            <Image className="border-4 border-gray-200 rounded-full" alt={myProfile.name} height={80} width={80} src={myProfile?.photo}></Image> :
                                                            <div className="inline-block border rounded-full p-2">
                                                                <User w={80}></User>
                                                            </div>
                                                }
                                            </div>
                                            <input onChange={(e) => handlePhoto(e.target.files![0])} className="hidden" id="#updateUserPhoto" type="file" />
                                            {/* <input onChange={(e) => setUserPhoto(URL.createObjectURL(e.target.files![0]))} className="hidden" id="#updateUserPhoto" type="file" /> */}
                                            <label htmlFor="#updateUserPhoto" className="cursor-pointer text-blue-600 font-semibold">edit</label>
                                        </div>
                                        <div className="mt-3">
                                            <label className="text-gray-500">Your Name</label>
                                            <input onChange={(e) => setUserName(e.target.value)} value={userName} className="myInput" type="text" />
                                        </div>
                                    </div>
                                }
                                {
                                    userUpdate == EXPERIENCE && <div>
                                        <div>
                                            <label className="text-gray-500">Your Experience</label>
                                            <input onChange={(e) => setUserExperience(parseInt(e.target.value))} value={userExperience || 0} className="myInput" type="number" />
                                        </div>
                                    </div>
                                }
                                {
                                    userUpdate == BIO && <div>
                                        <div>
                                            <label className="text-gray-500">Your Bio</label>
                                            <textarea rows={4} onChange={(e) => setUserBio(e.target.value)} value={userBio} className="myInput"></textarea>
                                        </div>
                                    </div>
                                }
                                <div className="flex justify-center my-3">
                                    <button disabled={updateUserLoading} onClick={handleUpdateUserData} className="myBtn h-9">UPDATE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>

            {/* This section for user photo and user name */}
            <div className="bg-[#fff] rounded-md my-2">
                <div className=" flex justify-between p-2">
                    <div className="flex gap-x-3">
                        <div className="h-[85px] w-[85px]">
                            {
                                myProfile?.photo ?
                                    <Image className="border-4 h-full w-full object-cover border-gray-200 rounded-full" alt={myProfile.name} height={85} width={85} src={myProfile?.photo}></Image> :
                                    <div className="inline-block border rounded-full p-2">
                                        <User w={70}></User>
                                    </div>
                            }
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold pb-2">{myProfile?.name}</h1>
                            <h1 className="">Followers : {myProfile?.followers.length}</h1>
                        </div>
                    </div>
                    <p onClick={() => updatingUserData(PHOTO_NAME)} className="cursor-pointer text-blue-600 font-semibold">edit</p>
                </div>
            </div>

            {/* Start with experience and following section */}
            <div className="grid md:grid-cols-2 md:gap-x-2">
                <div>
                    <div className="bg-[#fff] rounded-md p-2">
                        <div className="flex items-center justify-between">
                            <p className="text-xl font-semibold">Experience</p>
                            <p onClick={() => updatingUserData(EXPERIENCE)} className="cursor-pointer text-blue-600 font-semibold">edit</p>
                        </div>
                        <p className="text-gray-500">I'm working since <span className="font-semibold">{myProfile?.experience || 0}</span> years</p>
                    </div>

                    <div className="bg-[#fff] rounded-md p-2 my-2">
                        <p className="text-xl font-semibold">Total Recipes</p>
                        <p className="text-gray-500">{myTotalRecipes}</p>
                    </div>

                    <div className="bg-[#fff] rounded-md p-2 md:h-[200px] overflow-hidden">
                        <div className="flex items-start justify-between">
                            <p className="text-xl font-semibold">Bio</p>
                            <p onClick={() => updatingUserData(BIO)} className="cursor-pointer text-blue-600 font-semibold">edit</p>
                        </div>
                        <p className="text-justify mt-2 text-gray-500">{myProfile?.bio}</p>
                    </div>
                </div>


                {/* Following section */}
                <div className="p-2 bg-[#fff] rounded-md md:h-[352px] my-2 md:my-0">
                    <p className="text-xl font-semibold mb-5">Following</p>
                    <div className={`${styles.scrollBar} grid grid-cols-3 gap-y-3 h-[280px] overflow-y-scroll`}>
                        {
                            Array(14).fill(null).map((da, index) => {
                                return (
                                    <div key={index}>
                                        <div className="flex justify-center">
                                            {
                                                myProfile?.photo ?
                                                    <div className="h-[50px] w-[50px]">
                                                        <Image className="border-4 h-full w-full object-cover border-gray-200 rounded-full" alt={myProfile.name} height={50} width={50} src={myProfile?.photo}></Image>
                                                    </div> :
                                                    <div className="border-4 border-gray-200 rounded-full p-2">
                                                        <User w={30}></User>
                                                    </div>
                                            }
                                        </div>
                                        <div className="">
                                            <h1 className="text-center">{myProfile?.name.slice(0, 10)}</h1>
                                            <h1 className="text-sm text-center text-gray-500">Followers : {myProfile?.followers.length}</h1>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>


            {/* My Recipes section*/}
            <section>
                <MyRecipes></MyRecipes>
            </section>
        </div>
    }

    return (
        <div className="max-w-7xl mx-auto">
            {
                content
            }
        </div>
    );
};

export default MyProfilePage;