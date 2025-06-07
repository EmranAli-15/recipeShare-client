"use client"

import { useUser } from '@/contextProvider/ContextProvider';
import { useUpdateUserPasswordMutation } from '@/redux/features/user/userApi';
import { EyeClose, EyeOpen } from '@/ui/icons/Icons';
import React, { FormEvent, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function SettingsPage() {
    const { user } = useUser();

    const [isPassShow, setIsPassShow] = useState(false);
    const [currentPass, setCurrentPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [passForDelete, setPassForDelete] = useState("");


    const [updatePassword, {
        isLoading: updatePassLoading,
        isSuccess: updatePassSuccess,
        error: updatePassError
    }] = useUpdateUserPasswordMutation();
    const handleUpdatePassword = (e: FormEvent) => {
        e.preventDefault();

        if (newPass !== confirmPass) {
            toast.error("Password not matched");
            return;
        }
        else {
            const data = {
                userId: user.userId,
                currentPassword: currentPass,
                newPassword: newPass
            };
            updatePassword(data);
        }
    };

    useEffect(() => {
        if (updatePassSuccess) {
            toast.success("Password updated successfully.");
            setCurrentPass("");
            setNewPass("");
            setConfirmPass("");
        };
        if (updatePassError) {
            if ('data' in updatePassError) {
                const error = updatePassError as any;
                toast.error(error.data.message);
            }
        }
    }, [updatePassSuccess, updatePassError]);

    return (
        <div className='max-w-7xl mx-auto p-2 md:p-0'>
            <Toaster toastOptions={{ duration: 1500 }}></Toaster>
            <section className="bg-[#fff] rounded-md p-2">
                <h1 className='font-semibold text-lg'>Default Password is : <span className='italic text-gray-500'>123456</span></h1>
            </section>

            <section className="bg-[#fff] rounded-md p-2 mt-2">
                <h1 className='font-semibold text-lg'>Want to change password?</h1>
                <div className='relative'>
                    <form onSubmit={handleUpdatePassword}>
                        <div className='mt-1'>
                            <p className='text-gray-500'>Current Password</p>
                            <input
                                required
                                value={currentPass}
                                onChange={(e) => setCurrentPass(e.target.value)}
                                className='myInput h-9' type={isPassShow ? "text" : "password"}
                            />
                        </div>
                        <div>
                            <p className='text-gray-500'>New Password</p>
                            <input
                                required
                                value={newPass}
                                onChange={(e) => setNewPass(e.target.value)}
                                className='myInput h-9' type={isPassShow ? "text" : "password"}
                            />
                        </div>
                        <div>
                            <p className='text-gray-500'>Confirm Password</p>
                            <input
                                required
                                value={confirmPass}
                                onChange={(e) => setConfirmPass(e.target.value)}
                                className='myInput h-9' type={isPassShow ? "text" : "password"}
                            />
                        </div>
                        <button
                            type="submit"
                            className='myBtn mt-1 w-full h-9'
                            disabled={updatePassLoading}
                        >SAVE</button>
                    </form>
                    <div>
                        <span
                            onClick={() => setIsPassShow(!isPassShow)}
                            className='absolute right-1 top-8 cursor-pointer'>
                            {
                                isPassShow ? <EyeOpen></EyeOpen> : <EyeClose></EyeClose>
                            }
                        </span>
                    </div>
                </div>
            </section>

            <section className="bg-[#fff] rounded-md p-2 mt-2">
                <div className='mt-1'>
                    <h1 className='font-semibold text-lg'>Want to delete account?</h1>
                    <p className='text-gray-500 text-justify'><strong>Read it very carefully,</strong> if you delete your account once you will not be able to access this account anymore but your all recipes will be still present here and no one can visit your profile.</p>
                </div>
                <div className='mt-1'>
                    <p className='text-gray-500'>Confirm Password:</p>
                    <div className='relative'>
                        <input onChange={(e) => setPassForDelete(e.target.value)} className='myInput h-9' type={isPassShow ? "text" : "password"} />
                        <span
                            onClick={() => setIsPassShow(!isPassShow)}
                            className='absolute right-1 top-2 cursor-pointer'>
                            {
                                isPassShow ? <EyeOpen></EyeOpen> : <EyeClose></EyeClose>
                            }
                        </span>
                    </div>
                </div>
                <button className='myBtn mt-1 w-full h-9'>DELETE</button>
            </section>
        </div>
    )
}
