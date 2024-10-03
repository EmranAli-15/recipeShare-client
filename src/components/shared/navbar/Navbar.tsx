"use client"

import logo from "@/assets/logo.png"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Close, Menu } from "@/ui/icons/Icons";

const Navbar = () => {

    const [open, setOpen] = useState(false);

    return (
        <div>
            <div className="w-full h-[60px] border-b">
                <div className="max-w-7xl mx-auto">
                    <div className="h-[60px] flex items-center justify-around md:justify-between">
                        <div onClick={() => setOpen(!open)} className={`${open ? 'rotate-90' : 'rotate-0'} transition duration-300 cursor-pointer`}>
                            {
                                open ? <Close></Close> : <Menu></Menu>
                            }
                        </div>

                        <div className="flex items-center gap-x-3">
                            <div className="md:w-[350px]">
                                <input
                                    className="myInput h-10"
                                    type="text"
                                    placeholder="search"
                                />
                            </div>
                            <div className="hidden md:block">
                                <Link href="/login">
                                    <button className="myBtn h-10">Login</button>
                                </Link>
                            </div>
                            <Link href="/">
                                <Image height={4} width={43} alt="logo" src={logo} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto relative">
                <div className={`${open ? 'block z-10' : 'hidden'} absolute`}>
                    <div className="w-[100vw] md:w-[200px] bg-slate-50 border-l-[1px] border-r-[1px] border-b-[1px] rounded-b-md p-3">
                        <div className="flex flex-col gap-2">
                            <div className="hover:bg-orange-200 px-2">
                                <Link href="#"><div className="w-full">Home</div></Link>
                            </div>
                            <div className="hover:bg-orange-200 px-2">
                                <Link href="#"><div className="w-full">Home</div></Link>
                            </div>
                            <div className="hover:bg-orange-200 px-2">
                                <Link href="#"><div className="w-full">Home</div></Link>
                            </div>
                            <div className="hover:bg-orange-200 px-2">
                                <Link href="#"><div className="w-full">Home</div></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;