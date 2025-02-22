import React from 'react'
import { FiLogOut } from "react-icons/fi";


export default function Header() {
    return (
        <div className='max-w-full shadow-xl bg-white p-4 flex justify-end items-end'>
            <button
                className="flex items-center gap-2 bg-red-400 hover:bg-red-500 text-white font-bold py-1 mt-2 px-2 rounded-2xl shadow-lg transition-all duration-300"
            // onClick={() => alert("Logged out successfully!")}
            >
                <FiLogOut size={18} />
                Logout
            </button>
        </div>
    )
}
