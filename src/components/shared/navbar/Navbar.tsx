"use client"

import logo from "@/assets/logo.png"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useUser } from "@/contextProvider/ContextProvider";
import { useAppDispatch } from "@/redux/hooks";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import Dashboard from "@/components/dashboard/Dashboard";
import { Breakfast, Close, Dinner, Lunch, Login, Logout, Menu, Occasion, User } from "@/ui/icons/Icons";
import { useRouter } from "next/navigation";
import { recipeApi } from "@/redux/features/recipe/recipeApi";
import { debounce } from "@/utils/debounce";

const Navbar = () => {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const [searchResult, setSearchResult] = useState<any>([]);
    const [searchItem, setSearchItem] = useState<string>("");

    const [openMenu, setOpenMenu] = useState(false);
    const [openDashboardModal, setOpenDashboardModal] = useState(false);

    const { user: userFromContext, setUserLoading } = useUser();

    const photo = userFromContext?.photo;

    const handleLogOut = () => {
        dispatch(userLoggedOut());
        setUserLoading(true);
        setOpenMenu(false);
        router.push("/");
    };

    const handleSearch = () => {
        const fetchRecipes = async () => {
            if (searchItem) {
                const { data } = await dispatch(recipeApi.endpoints.searchRecipes.initiate(searchItem)).unwrap();
                setSearchResult(data);
            } else {
                setSearchResult([]);
            }
        };

        fetchRecipes();
    };

    useEffect(() => {
        debounce(handleSearch, 1000);
    }, [searchItem])


    return (
        <div className="max-w-7xl mx-auto">

            {
                openDashboardModal &&
                <Dashboard
                    openDashboardModal={openDashboardModal}
                    setOpenDashboardModal={setOpenDashboardModal}>
                </Dashboard>
            }


            {/* This is for navbar with responsive */}
            <div className="w-full h-[60px] border-b px-2">
                <div>
                    <div className="h-[60px] flex items-center justify-around md:justify-between">
                        <div onClick={() => setOpenMenu(!openMenu)} className={`${openMenu ? 'rotate-90' : 'rotate-0'} transition duration-300 cursor-pointer`}>
                            {
                                openMenu ? <Close></Close> : <Menu></Menu>
                            }
                        </div>

                        <div className="w-full md:w-auto flex items-center gap-x-3">
                            <div className="w-full px-3 md:w-[350px]">
                                <input
                                    onChange={(e) => setSearchItem(e.target.value)}
                                    value={searchItem}
                                    className="myInput h-10"
                                    type="text"
                                    placeholder="search"
                                />
                            </div>
                            <div className="hidden md:block">
                                {
                                    userFromContext ?
                                        photo ? <div className="h-[35px] w-[35px]" onClick={() => setOpenDashboardModal(!openDashboardModal)}>
                                            <Image width={35} height={35} className="rounded-full h-full w-full object-cover cursor-pointer" src={photo} alt="" />
                                        </div> :
                                            <span className="cursor-pointer" onClick={() => setOpenDashboardModal(!openDashboardModal)}>
                                                <User w="30"></User>
                                            </span>
                                        :
                                        <Link href="/login">
                                            <button className="myBtn h-[38px]">Login</button>
                                        </Link>
                                }
                            </div>
                            <Link href="/">
                                {/* Website Logo */}
                                <Image height={4} width={43} alt="logo" src={logo} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* This section for search result */}
            <section className="px-2 md:px-0">
                <div className="relative">
                    {
                        searchResult.length > 0 && <div className="w-full bg-[#fff] shadow-2xl shadow-black p-3 rounded-md absolute">
                            {
                                searchResult.map((item: any, index: any) => {
                                    return <div className="border-b py-1 flex items-center gap-x-2" key={index}>
                                        <div>
                                            <Image
                                                className="h-8 w-14 rounded-sm object-cover"
                                                width={56}
                                                height={32}
                                                src={item.image}
                                                alt=""
                                            ></Image>
                                        </div>
                                        <div>
                                            <p className="line-clamp-1">{item.title}</p>
                                            <p className="text-gray-500 text-sm">{item.user.name}</p>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    }
                </div>
            </section>

            {/* This is for navbar menus */}
            <div className="relative">
                <div className={`${openMenu ? 'block z-10' : 'hidden'} absolute`}>
                    <div className="w-[100vw] md:max-w-7xl md:mx-auto bg-slate-50 border-l-[1px] border-r-[1px] border-b-[1px] rounded-b-md px-3 font-semibold shadow-2xl">
                        <div className="flex flex-col">
                            <div
                                onClick={() => setOpenMenu(false)}
                                className="border-b px-2 py-3 hover:bg-white cursor-pointer">
                                {
                                    userFromContext ?
                                        photo ? <span onClick={() => setOpenDashboardModal(!openDashboardModal)}>
                                            <span className="cursor-pointer flex items-center gap-x-2" onClick={() => setOpenDashboardModal(!openDashboardModal)}>
                                                <div className="w-[30px] h-[30px]">
                                                    <Image width={30} height={30} className="h-full w-full object-cover rounded-full" src={photo} alt="" />
                                                </div>
                                                <p>{userFromContext.name}</p>
                                            </span>
                                        </span> :
                                            <span className="cursor-pointer flex items-center gap-x-2" onClick={() => setOpenDashboardModal(!openDashboardModal)}>
                                                <span className="rounded-full border">
                                                    <User w="30"></User>
                                                </span>
                                                <p>{userFromContext.name}</p>
                                            </span>
                                        :
                                        <Link href="/login">
                                            <div onClick={() => setOpenMenu(false)} className="w-full flex items-center gap-x-1">
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
                                    <div onClick={() => setOpenMenu(false)} className="w-full flex items-center gap-x-2">
                                        <div>
                                            <Breakfast></Breakfast>
                                        </div>
                                        Breakfast
                                    </div>
                                </Link>
                            </div>
                            <div className="border-b px-2 py-2 hover:bg-white">
                                <Link href="#">
                                    <div onClick={() => setOpenMenu(false)} className="w-full flex items-center gap-x-2">
                                        <div>
                                            <Lunch></Lunch>
                                        </div>
                                        Lunch
                                    </div>
                                </Link>
                            </div>
                            <div className="border-b px-2 py-2 hover:bg-white">
                                <Link href="#">
                                    <div onClick={() => setOpenMenu(false)} className="w-full flex items-center gap-x-2">
                                        <div>
                                            <Dinner></Dinner>
                                        </div>
                                        Dinner
                                    </div>
                                </Link>
                            </div>
                            <div className="border-b px-2 py-2 hover:bg-white">
                                <Link href="#">
                                    <div onClick={() => setOpenMenu(false)} className="w-full flex items-center gap-x-2">
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
                                        <button onClick={handleLogOut} className="w-full flex items-center gap-x-2">
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