"use client"

import toast, { Toaster } from 'react-hot-toast';
import React, { FormEvent, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation';
import { EyeClose, EyeOpen } from '@/ui/icons/Icons';
import { useGetOTPMutation, useSetForgotPasswordMutation } from '@/redux/features/auth/authApi';

export default function page() {
    const router = useRouter();

    const [OTP, setOTP] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSentOTP, setIsSentOTP] = useState(false);
    const [confirmPass, setConfirmPass] = useState("");
    const [isPassShow, setIsPassShow] = useState(false);

    const [getOTPPassword, { isLoading: OTPLoading, error: OTPError, isSuccess: OTPSuccess }] = useGetOTPMutation();
    const [updatePassword, { isLoading: updatePasswordLoading, error: updatePasswordError, isSuccess: updatePasswordSuccess }] = useSetForgotPasswordMutation()

    const handleSentOTP = (e: FormEvent) => {
        e.preventDefault();
        const data = {
            email: email
        }
        getOTPPassword(data);
    };
    useEffect(() => {
        if (OTPError) {
            if ('data' in OTPError) {
                const error = OTPError as any;
                toast.error(error.data.message);
            }
        };
        if (OTPSuccess) {
            toast.success("Check email.");
            setIsSentOTP(true);
        };
    }, [OTPError, OTPSuccess]);


    const handleUpdatePassword = (e: FormEvent) => {
        e.preventDefault();
        if (password !== confirmPass) {
            toast.error("Password not matched");
            return;
        }
        else {
            const data = {
                email: email,
                OTP: OTP,
                newPassword: password
            };
            updatePassword(data);
        }
    };
    useEffect(() => {
        if (updatePasswordError) {
            if ('data' in updatePasswordError) {
                const error = updatePasswordError as any;
                toast.error(error.data.message);
            }
        };
        if (updatePasswordSuccess) {
            toast.success("Password changed.");
            setEmail("");
            setOTP("");
            setPassword("");
            setConfirmPass("");
            router.push("/login");
        };
    }, [updatePasswordSuccess, updatePasswordError])


    useEffect(() => {
        const handleBeforeUnload = (event: any) => {
            event.preventDefault();
            event.returnValue = '';
            return 'Are you sure you want to leave?';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <div className='max-w-7xl mx-auto p-2 md:p-0'>
            <Toaster toastOptions={{ duration: 1500 }}></Toaster>
            <section className="bg-[#fff] rounded-md p-2">
                <h1 className='text-lg font-semibold'>Forgot password?</h1>
                <h1 className='text-gray-500 mt-1'>Your email</h1>
                <form onSubmit={handleSentOTP}>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        className='myInput h-9' type="email"
                    />
                    <button
                        className='myBtn mt-1 w-full h-9'
                        type='submit'
                        disabled={OTPLoading}>
                        Get OTP
                    </button>
                </form>
            </section>

            {
                isSentOTP &&
                <section className="bg-[#fff] rounded-md p-2 mt-2">
                    <h1 className='text-lg font-semibold'>Forgot password?</h1>
                    <div className='relative'>
                        <form onSubmit={handleUpdatePassword}>
                            <label className='text-gray-500 mt-1'>Paste OTP</label>
                            <input
                                onChange={(e) => setOTP(e.target.value)}
                                value={OTP}
                                required
                                className='myInput h-9' type="text"
                            />
                            <label className='text-gray-500 mt-1'>New Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                className='myInput h-9' type={isPassShow ? "text" : "password"}
                            />
                            <label className='text-gray-500 mt-1'>Confirm Password</label>
                            <input
                                onChange={(e) => setConfirmPass(e.target.value)}
                                value={confirmPass}
                                required
                                className='myInput h-9' type={isPassShow ? "text" : "password"}
                            />
                            <button
                                className='myBtn mt-1 w-full h-9'
                                type='submit'
                                disabled={updatePasswordLoading}>
                                Set new password
                            </button>
                        </form>
                        <div>
                            <span
                                onClick={() => setIsPassShow(!isPassShow)}
                                className='absolute right-1 top-[68px] cursor-pointer'>
                                {
                                    isPassShow ? <EyeOpen></EyeOpen> : <EyeClose></EyeClose>
                                }
                            </span>
                        </div>
                    </div>
                </section>
            }
        </div>
    )
}
