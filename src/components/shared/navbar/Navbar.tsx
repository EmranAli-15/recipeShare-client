"use client"

import logo from "@/assets/logo.png"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { BsFillCupHotFill } from "react-icons/bs";
import { TbLogin } from "react-icons/tb";
import { GiChickenOven } from "react-icons/gi";
import { MdDinnerDining } from "react-icons/md";
import { IoMdMenu, IoMdClose } from "react-icons/io";

const Navbar = () => {

    const [open, setOpen] = useState(false);

    return (
        <div>
            <div className="w-full h-[60px] border-b">
                <div className="max-w-7xl mx-auto">
                    <div className="h-[60px] flex items-center justify-around md:justify-between">
                        <div onClick={() => setOpen(!open)} className={`${open ? 'rotate-90' : 'rotate-0'} transition duration-300 cursor-pointer`}>
                            {
                                open ? <IoMdClose size={24}></IoMdClose> : <IoMdMenu size={24}></IoMdMenu>
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
                                    <button className="myBtn h-[38px]">Login</button>
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
                    <div className="w-[100vw] md:max-w-7xl md:mx-auto bg-slate-50 border-l-[1px] border-r-[1px] border-b-[1px] rounded-b-md px-3 font-semibold">
                        <div className="flex flex-col">
                            <div className="border-b px-2 py-2 hover:bg-white">
                                <Link href="#">
                                    <div onClick={()=>setOpen(false)} className="w-full flex items-center gap-x-1">
                                        <div className="text-red-900"><BsFillCupHotFill width={24}></BsFillCupHotFill></div>
                                        Breakfast
                                    </div>
                                </Link>
                            </div>
                            <div className="border-b px-2 py-2 hover:bg-white">
                                <Link href="#">
                                    <div onClick={()=>setOpen(false)} className="w-full flex items-center gap-x-1">
                                        <div className="text-red-500"><GiChickenOven width={24}></GiChickenOven></div>
                                        Lanch
                                    </div>
                                </Link>
                            </div>
                            <div className="border-b px-2 py-2 hover:bg-white">
                                <Link href="#">
                                    <div onClick={()=>setOpen(false)} className="w-full flex items-center gap-x-1">
                                        <div className="text-green-500"><MdDinnerDining width={24}></MdDinnerDining></div>
                                        Dinner
                                    </div>
                                </Link>
                            </div>
                            <div className="px-2 py-2 hover:bg-white">
                                <Link href="/login">
                                    <div onClick={()=>setOpen(false)} className="w-full flex items-center gap-x-1">
                                        <div className="text-green-700"><TbLogin width={24}></TbLogin></div>
                                        Login
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;