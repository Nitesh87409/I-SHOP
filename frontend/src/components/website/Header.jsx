"use client"

import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import Link from "next/link";

const Header = () => {

    const menuitems = [
        { name: "HOME", link: "/home" },
        { name: "STORE", link: "/store" },
        { name: "IPHONE", link: "/iphone" },
        { name: "IPAD", link: "/ipad" },
        { name: "MACBOOK", link: "/mackbook" },
        { name: "ACCESSORIES", link: "/accessories" },
    ]
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="border-b p-4  relative">
            {/* Language and Currency Selector */}
            <div className="grid grid-cols-2 gap-2 ">
                <div className="col-span-1 flex gap-2 text-sm justify-center">
                    <div>
                        <span className="cursor-pointer">EN ▼</span>
                        <span className="cursor-pointer">$ ▼</span>
                    </div>
                </div>
                <div className=" col-span-1 justify-center flex  gap-4">
                    {/* Profile & Cart */}
                    <div className="flex items-center gap-4">
                        <div className=" flex gap-2 cursor-pointer ">
                            <FaUser className="text-gray-700 mt-1 " />
                            <span>My Profile</span>
                        </div>
                        <div className=" flex gap-1 cursor-pointer">
                            <div className="relative">
                                <FaShoppingCart className="mt-1 " />
                                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[8px] rounded-full px-2">2</span>
                            </div>
                            <span>Items</span>
                        </div>
                        <span className="text-sm hidden md:block text-gray-700">$998</span>
                        <FaSearch className="text-gray-700 cursor-pointer hidden md:block" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 text-center ">
                {/* Logo */}
                <h1 className="text-red-500 text-3xl mt-8 mb-4 font-bold">iSHOP</h1>

            </div>

            {/* Navigation */}
            <nav className="max-w-full hidden md:flex justify-center gap-4 ">
                {
                    menuitems.map((item, index) => {
                        return <Link key={index} href={item.link} className="text-gray-700 text-base font-bold hover:text-blue-400 duration-200 list-none cursor-pointer">{item.name}</Link>
                    }

                    )


                }

            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <HiX className="text-gray-700 text-2xl" /> : <HiMenu className="text-gray-700 text-2xl" />}
            </button>

            <nav className={`reletive md:static top-0 left-0 w-full h-full md:w-auto md:h-auto
             bg-white md:bg-transparent flex flex-col md:flex-row items-center gap-6 text-sm p-6 
             md:p-0 shadow-md md:shadow-none transition-all duration-300 
      ${menuOpen ? "block" : "hidden"}`}>

                <div className="h-5 w-5 absolute">
                    <nav>
                        {
                            menuitems.map((item, index) => {
                                return <Link key={index} href={item.link} className=" text-gray-700 block text-base font-bold hover:text-blue-400 duration-200 list-none cursor-pointer">{item.name}</Link>
                            }

                            )


                        }

                    </nav>
                </div>
            </nav>



        </header>
    );
};

export default Header;
