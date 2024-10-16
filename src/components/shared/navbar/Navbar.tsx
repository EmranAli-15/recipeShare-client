"use client"

import logo from "@/assets/logo.png"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useUser } from "@/contextProvider/ContextProvider";
import { useAppDispatch } from "@/redux/hooks";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import Dashboard from "@/components/dashboard/Dashboard";
import { Breakfast, Close, Dinner, Lunch, Login, Logout, Menu, Occasion } from "@/ui/icons/Icons";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const { user: userFromContext, setUserLoading } = useUser();

    const photo = userFromContext?.photo;

    const handleLogOut = () => {
        dispatch(userLoggedOut());
        setUserLoading(true);
        router.push("/");
    }

    return (
        <div>

            {
                openModal &&
                <Dashboard
                    openModal={openModal}
                    setOpenModal={setOpenModal}>
                </Dashboard>
            }

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
                                {
                                    userFromContext ?
                                        photo ? <span onClick={() => setOpenModal(!openModal)}>
                                            <img className="size-9 rounded-full cursor-pointer" src={photo} alt="" />
                                        </span> :
                                            <span className="cursor-pointer" onClick={() => setOpenModal(!openModal)}>
                                                "no"
                                            </span>
                                        :
                                        <Link href="/login">
                                            <button className="myBtn h-[38px]">Login</button>
                                        </Link>
                                }
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
                    <div className="w-[100vw] md:max-w-7xl md:mx-auto bg-slate-50 border-l-[1px] border-r-[1px] border-b-[1px] rounded-b-md px-3 font-semibold shadow-2xl">
                        <div className="flex flex-col">
                            <div
                                onClick={() => setOpen(false)}
                                className="border-b px-2 py-3 hover:bg-white cursor-pointer">
                                {
                                    userFromContext ?
                                        photo ? <span onClick={() => setOpenModal(!openModal)}>
                                            <img className="size-7 rounded-full" src={photo} alt="" />
                                        </span> :
                                            <span className="cursor-pointer" onClick={() => setOpenModal(!openModal)}>
                                                "no"
                                            </span>
                                        :
                                        <Link href="/login">
                                            <div onClick={() => setOpen(false)} className="w-full flex items-center gap-x-1">
                                                <div>
                                                    <Login></Login>
                                                </div>
                                                Login
                                            </div>
                                        </Link>
                                }
                            </div>
                            <div className="border-b px-2 py-2 hover:bg-white">
                                <Link href="#">
                                    <div onClick={() => setOpen(false)} className="w-full flex items-center gap-x-2">
                                        <div>
                                            <Breakfast></Breakfast>
                                        </div>
                                        Breakfast
                                    </div>
                                </Link>
                            </div>
                            <div className="border-b px-2 py-2 hover:bg-white">
                                <Link href="#">
                                    <div onClick={() => setOpen(false)} className="w-full flex items-center gap-x-2">
                                        <div>
                                            <Lunch></Lunch>
                                        </div>
                                        Lunch
                                    </div>
                                </Link>
                            </div>
                            <div className="border-b px-2 py-2 hover:bg-white">
                                <Link href="#">
                                    <div onClick={() => setOpen(false)} className="w-full flex items-center gap-x-2">
                                        <div>
                                            <Dinner></Dinner>
                                        </div>
                                        Dinner
                                    </div>
                                </Link>
                            </div>
                            <div className="border-b px-2 py-2 hover:bg-white">
                                <Link href="#">
                                    <div onClick={() => setOpen(false)} className="w-full flex items-center gap-x-2">
                                        <div>
                                            <Occasion></Occasion>
                                        </div>
                                        Occasion
                                    </div>
                                </Link>
                            </div>
                            <div>
                                {
                                    userFromContext && <div className="px-2 py-2 hover:bg-white">
                                        <button onClick={handleLogOut} className="w-full flex items-center gap-x-1">
                                            <div>
                                                <Logout></Logout>
                                            </div>
                                            LogOut
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;