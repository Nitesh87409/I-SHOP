"use client"

import { FaHome, FaThLarge, FaColumns, FaProjectDiagram, FaFolderOpen, FaStore, FaUser } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import Link from "next/link";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isDashboardOpen, setIsDashboardOpen] = useState(true);
    const [isEcommcersOpen, setIsEcommcersOpen] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);

    return (
        <div className=" bg-white border  shadow-lg h-screen p-4">
            <div className="flex items-center justify-between pb-4 border-b">
                <h1 className="text-xl font-bold flex items-center">
                    <span className="w-6 h-6 mr-2"> <MdAdminPanelSettings /></span>
                    Admin panal
                </h1>

            </div>

            <nav className="mt-4">
                <div className="mb-3">
                    <h2 className="text-gray-500 text-sm uppercase font-bold">General</h2>
                    <ul className="mt-2 space-y-2">

                        {/* { Dashboard} */}

                        <li className="p-2 rounded-lg bg-green-500 hover:bg-green-600 cursor-pointer" onClick={() => setIsDashboardOpen(!isDashboardOpen)}>
                            <div className="flex items-center space-x-3">
                                <FaHome />
                                <span className=" ">Dashboards</span>
                                <span className="ml-auto bg-purple-600 text-white text-xs px-2 py-1 rounded-full">2</span>
                            </div>

                        </li>
                        {isDashboardOpen && isOpen && (
                            <ul className="mt-2 ml-6 space-y-1 text-gray-600 " >
                                <Link href="/admin" className="hover:text-gray-900 block bottom-4 p-2 rounded-lg border border-green-400  hover:bg-green-400 duration-150">Overview</Link>
                                <Link href="/admin/report" className="hover:text-gray-900 block bottom-4 p-2 rounded-lg border border-green-400   hover:bg-green-400 duration-150">Reports</Link>
                            </ul>
                        )}

                        {/* { Ecommcers} */}

                        <li className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 cursor-pointer" onClick={() => setIsEcommcersOpen(!isEcommcersOpen)}>
                            <div className="flex items-center space-x-3">
                                <FaStore />
                                <span>Ecommcers</span>
                                <span className="ml-auto bg-purple-600 text-white text-xs px-2 py-1 rounded-full">5</span>
                            </div>

                        </li>
                        {isEcommcersOpen && (
                            <ul className="mt-2 ml-6 space-y-1 text-gray-600">
                                <Link href="/admin/Accessory" className="hover:text-gray-900 block bottom-4  p-2 rounded-lg border border-blue-400 hover:bg-blue-400 duration-150">Accessory</Link>
                                <Link href="/admin/category" className="hover:text-gray-900 block bottom-4 p-2 rounded-lg border border-blue-400  hover:bg-blue-400 duration-150">Category</Link>
                                <Link href="/admin/color" className="hover:text-gray-900 block bottom-4 p-2 rounded-lg border border-blue-400  hover:bg-blue-400 duration-150">color</Link>
                                <Link href="/admin/product" className="hover:text-gray-900 block bottom-4 p-2 rounded-lg border border-blue-400  hover:bg-blue-400 duration-150">Product</Link>
                                <Link href="/admin/Oders" className="hover:text-gray-900 block bottom-4 p-2 rounded-lg border border-blue-400  hover:bg-blue-400 duration-150">Oders</Link>
                            </ul>
                        )}
                        {/* { user } */}

                        <li className="p-2 rounded-lg bg-orange-500 hover:bg-orange-500 cursor-pointer" onClick={() => setIsUserOpen(!isUserOpen)}>
                            <div className="flex items-center space-x-3">
                                <FaUser />
                                <span>User</span>
                                <span className="ml-auto bg-purple-600 text-white text-xs px-2 py-1 rounded-full">2</span>
                            </div>

                        </li>
                        {isUserOpen && (
                            <ul className="mt-2 ml-6 space-y-1 text-gray-600 ">
                                <Link href="/admin/Website-User" className="hover:text-gray-900 block bottom-4 p-2 rounded-lg border border-orange-400  hover:bg-orange-400 duration-150">Website User</Link >
                                <Link href="/admin/Admin-User" className="hover:text-gray-900 block bottom-4 p-2 rounded-lg border border-orange-400  hover:bg-orange-400 duration-150">Admin User</Link >

                            </ul>
                        )}




                        <li className="flex items-center space-x-3 p-2 rounded-lg bg-yellow-500 hover:bg-yellow-600">
                            <FaColumns />
                            <span>Page Layout</span>
                        </li>
                    </ul>
                </div>

                <div className="mb-3">
                    <h2 className="text-gray-500 text-sm uppercase font-bold">Applications</h2>
                    <ul className="mt-2 space-y-2">
                        <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100">
                            <FaProjectDiagram />
                            <span>Project</span>
                        </li>
                        <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100">
                            <FaFolderOpen />
                            <span>File Manager</span>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
