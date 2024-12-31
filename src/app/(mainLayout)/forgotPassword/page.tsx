"use client"

import React, { FormEvent, useEffect, useState } from 'react'

export default function page() {
    const [isSentOTP, setIsSentOTP] = useState(false);

    const handleSentOTP = (e: FormEvent) => {
        e.preventDefault();
        setIsSentOTP(true);

    }


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
            <section className="bg-[#fff] rounded-md p-2">
                <h1 className='text-lg font-semibold'>Forgot password?</h1>
                <h1 className='text-gray-500 mt-1'>Your email</h1>
                <form onSubmit={handleSentOTP}>
                    <input
                        required
                        className='myInput h-9' type="email"
                    />
                    <button
                        className='mt-1 w-full h-9 bg-gray-300 rounded-md font-mono active:scale-95'
                        type='submit'>
                        Get OTP
                    </button>
                </form>
            </section>

            {
                isSentOTP &&
                <section className="bg-[#fff] rounded-md p-2 mt-2">
                    <h1 className='text-lg font-semibold'>Forgot password?</h1>
                    <h1 className='text-gray-500 mt-1'>Paste OTP</h1>
                    <form>
                        <input
                            required
                            className='myInput h-9' type="text"
                        />
                        <label className='text-gray-500 mt-1'>New Password</label>
                        <input
                            required
                            className='myInput h-9' type="password"
                        />
                        <label className='text-gray-500 mt-1'>Confirm Password</label>
                        <input
                            required
                            className='myInput h-9' type="password"
                        />
                        <button
                            className='mt-1 w-full h-9 bg-gray-300 rounded-md font-mono active:scale-95'
                            type='submit'>
                            Get OTP
                        </button>
                    </form>
                </section>
            }
        </div>
    )
}
