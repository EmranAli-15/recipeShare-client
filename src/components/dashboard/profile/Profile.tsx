"use client"

import { useUser } from "@/contextProvider/ContextProvider";
import { useMyProfileQuery } from "@/redux/features/auth/authApi";
import Error from "@/ui/Error/Error";
import { Close, User } from "@/ui/icons/Icons";
import CommonLoader from "@/ui/loader/CommonLoader";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./styles.module.css"
import { uploadImage } from "@/utils/utils";

const PHOTO_NAME = "PHOTO_NAME";
const EXPERIENCE = "EXPERIENCE";
const BIO = "BIO";

const MyProfilePage = () => {
    const { user } = useUser();
    const { userId } = user || {};
    const [profileModal, setProfileModal] = useState(false);
    const [userUpdate, setUserUpdate] = useState("");

    const { data: myProfile, isError, isLoading, isSuccess } = useMyProfileQuery(userId);


    const [userPhoto, setUserPhoto] = useState("");
    const [isUserPhotoChange, setIsUserPhotoChange] = useState(false);
    const [userPhotoUrl, setUserPhotoUrl] = useState<File | "">("");
    const [userName, setUserName] = useState("");
    const [userExperience, setUserExperience] = useState("");
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

    const handleUpdateUserData = async () => {
        let userNewPhoto;

        if (isUserPhotoChange) {
            userNewPhoto = await uploadImage(userPhotoUrl);
        };

        const data = {
            photo: userPhoto ? userPhoto : userNewPhoto || "",
            name: userName || "Bob",
            experience: userExperience || 0,
            bio: userBio || ""
        };

        // below this line will be send data to server for updating the database
        console.log(data);
        setIsUserPhotoChange(false);
    }

    useEffect(() => {
        if (isSuccess) {
            setUserName(myProfile?.name);
            setUserExperience(myProfile?.experience);
            setUserPhoto(myProfile?.photo);
            setUserBio(myProfile?.bio);
        }
    }, [isError, isLoading, isSuccess])

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
                                            <input onChange={(e) => setUserExperience(e.target.value)} value={userExperience} className="myInput" type="number" />
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
                                    <button onClick={handleUpdateUserData} className="myBtn h-9">UPDATE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>

            {/* This section for user photo and user name */}
            <div className="md:w-[50%] flex justify-between items-start">
                <div className="flex items-end mb-3 gap-x-3">
                    <div>
                        {
                            myProfile?.photo ?
                                <Image className="border-4 border-gray-200 rounded-full" alt={myProfile.name} height={85} width={85} src={myProfile?.photo}></Image> :
                                <div className="inline-block border rounded-full p-2">
                                    <User w={80}></User>
                                </div>
                        }
                    </div>
                    <div className="mb-3">
                        <h1 className="text-2xl font-semibold pb-2">{myProfile?.name}</h1>
                        <h1 className="">Followers : {myProfile?.followers}</h1>
                    </div>
                </div>
                <p onClick={() => updatingUserData(PHOTO_NAME)} className="cursor-pointer text-blue-600 font-semibold">edit</p>
            </div>

            {/* Start with experience and following section */}
            <div className="grid md:grid-cols-2">
                <div>
                    <div className="mt-1">
                        <div className="flex items-center justify-between">
                            <p className="text-xl font-semibold">Experience</p>
                            <p onClick={() => updatingUserData(EXPERIENCE)} className="cursor-pointer text-blue-600 font-semibold">edit</p>
                        </div>
                        <p className="text-gray-500">More about 36 years : {myProfile?.experience}</p>
                    </div>

                    <hr className="mt-5" />

                    <div className="mt-1">
                        <p className="text-xl font-semibold">Total Recipes</p>
                        <p className="text-gray-500">58+ {myProfile?.experience}</p>
                    </div>

                    <hr className="mt-5" />

                    <div className="mt-1">
                        <div className="flex items-start justify-between">
                            <p className="text-xl font-semibold">Bio</p>
                            <p onClick={() => updatingUserData(BIO)} className="cursor-pointer text-blue-600 font-semibold">edit</p>
                        </div>
                        <p className="text-justify mt-2 text-gray-500">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus minus minima ipsum velit iure. Quasi nam quaerat consequatur molestias recusandae aperiam quo nostrum magnam corrupti quis explicabo libero, odit unde totam nisi! Fugiat, ad dolor. Neque ratione reiciendis pariatur cum quisquam iusto ad qui nesciunt voluptatibus dolores, nostrum quasi accusantium.</p>
                    </div>

                    <hr className="my-2" />
                </div>


                <div className="md:mr-0 md:ml-[15%]">
                    <p className="text-xl font-semibold mb-5">Following</p>
                    <div className={`${styles.scrollBar} shadow-sm rounded-md grid grid-cols-3 md:gap-x-20 gap-y-3 h-[300px] overflow-y-scroll`}>
                        {
                            Array(14).fill(null).map((da, index) => {
                                return (
                                    <div key={index}>
                                        <div className="flex justify-center">
                                            {
                                                myProfile?.photo ?
                                                    <Image className="border-4 border-gray-200 rounded-full" alt={myProfile.name} height={50} width={50} src={myProfile?.photo}></Image> :
                                                    <div className="border-4 border-gray-200 rounded-full p-2">
                                                        <User w={30}></User>
                                                    </div>
                                            }
                                        </div>
                                        <div className="">
                                            <h1 className="text-center">{myProfile?.name.slice(0, 10)}</h1>
                                            <h1 className="text-sm text-center text-gray-500">Followers : {myProfile?.followers}</h1>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    }

    return (
        <div className="max-w-5xl mx-auto px-2 md:px-0">
            {
                content
            }
        </div>
    );
};

export default MyProfilePage;