"use client"

import logo from "@/assets/logo.png"
import Image from "next/image";
import Link from "next/link";
import Dashboard from "@/components/dashboard/Dashboard";

import { Breakfast, Close, Dinner, Lunch, Login, Logout, Menu, Occasion, User, Search } from "@/ui/icons/Icons";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { recipeApi } from "@/redux/features/recipe/recipeApi";
import { debounce } from "@/utils/debounce";
import { useUser } from "@/contextProvider/ContextProvider";

const Navbar = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { user: userFromContext, setUserLoading } = useUser();
    const photo = userFromContext?.photo;

    const [searchResult, setSearchResult] = useState<any>([]);
    const [searchItem, setSearchItem] = useState<string>("");
    const [openMenu, setOpenMenu] = useState(false);
    const [openDashboardModal, setOpenDashboardModal] = useState(false);

    const handleLogOut = () => {
        dispatch(userLoggedOut());
        setUserLoading(true);
        setOpenMenu(false);
        router.push("/");
    };

    const handleSearch = () => {
        const fetchRecipes = async () => {
            if (searchItem) {
                const { data } = await dispatch(recipeApi.endpoints.searchRecipes.initiate({ searchItem, limit: 3, lastFetchedId: "" })).unwrap();
                setSearchResult(data);
            } else {
                setSearchResult([]);
            }
        };
        fetchRecipes();
    };

    const handleSearchEnter = () => {
        if (searchItem) {
            router.push(`/searchRecipes/${searchItem}`);
            setSearchResult([]);
        };
    };

    useEffect(() => {
        debounce(handleSearch, 1000);
    }, [searchItem]);


    return (
        <div className="max-w-7xl mx-auto">

            {
                openDashboardModal &&
                <Dashboard
                    openDashboardModal={openDashboardModal}
                    setOpenDashboardModal={setOpenDashboardModal}>
                </Dashboard>
            }

            {
                openMenu && <div
                    onClick={() => setOpenMenu(false)}
                    className="h-full w-full inset-0 fixed z-10 cursor-pointer"
                ></div>
            }
            {/* This is for navbar with responsive */}
            <section className="w-full h-[60px] border-b px-2 md:px-0">
                <div>
                    <div className="h-[60px] flex items-center justify-around md:justify-between">
                        <div onClick={() => setOpenMenu(!openMenu)} className={`${openMenu ? 'rotate-90' : 'rotate-0'} transition duration-300 cursor-pointer`}>
                            {
                                openMenu ? <Close></Close> : <Menu></Menu>
                            }
                        </div>

                        <div className="w-full md:w-auto flex items-center md:gap-x-3">
                            <div className="w-full flex gap-x-1 items-center px-3 md:w-[350px]">
                                <input
                                    onChange={(e) => setSearchItem(e.target.value)}
                                    value={searchItem}
                                    className="myInput h-10"
                                    type="text"
                                    placeholder="search"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleSearchEnter();
                                    }}
                                />
                                <button onClick={handleSearchEnter}>
                                    <Search></Search>
                                </button>
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

                            {/* Website Logo */}
                            <Link href="/">
                                <Image height={4} width={43} alt="logo" src={logo} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* This section for search result */}
            <section className="px-2 md:px-0">
                <div className="relative">
                    {
                        searchResult.length > 0 && <div className="w-full bg-[#fff] shadow-2xl shadow-black p-3 rounded-md absolute">
                            {
                                searchResult.map((item: any) => {
                                    return <Link
                                        href={`/recipeDetails/${item._id}`}
                                        className="hover:bg-[#f1f2f4] border-b py-1 flex items-center gap-x-2" key={item._id}
                                        onClick={() => setSearchResult([])}
                                    >
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
                                    </Link>
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
                                <Link href={`/moreRecipes/Breakfast`}>
                                    <div onClick={() => setOpenMenu(false)} className="w-full flex items-center gap-x-2">
                                        <div>
                                            <Breakfast></Breakfast>
                                        </div>
                                        Breakfast
                                    </div>
                                </Link>
                            </div>
                            <div className="border-b px-2 py-2 hover:bg-white">
                                <Link href={`/moreRecipes/Lunch`}>
                                    <div onClick={() => setOpenMenu(false)} className="w-full flex items-center gap-x-2">
                                        <div>
                                            <Lunch></Lunch>
                                        </div>
                                        Lunch
                                    </div>
                                </Link>
                            </div>
                            <div className="border-b px-2 py-2 hover:bg-white">
                                <Link href={`/moreRecipes/Dinner`}>
                                    <div onClick={() => setOpenMenu(false)} className="w-full flex items-center gap-x-2">
                                        <div>
                                            <Dinner></Dinner>
                                        </div>
                                        Dinner
                                    </div>
                                </Link>
                            </div>
                            <div className="border-b px-2 py-2 hover:bg-white">
                                <Link href={`/moreRecipes/Occasion`}>
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
                                                <Logout w={30}></Logout>
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