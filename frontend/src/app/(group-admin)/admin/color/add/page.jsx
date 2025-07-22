"use client"

import React, { useRef, useState } from 'react'; // <-- (CHANGED) useState import kiya
import Link from 'next/link';
import { axiosApiInstance, titleToSlug } from '@/library/helper';
import { toast } from 'react-toastify';

export default function Page() {
    const nameref = useRef();
    const slugref = useRef();
    const [colorCode, setColorCode] = useState("#000000"); // <-- (ADDED) default color value set

    const nameChangeHandler = () => {
        slugref.current.value = titleToSlug(nameref.current.value);
    };

    const SubmitHandler = (e) => {
        e.preventDefault();

        const data = {
            colorname: nameref.current.value.toLowerCase(),
    

            colorslug: slugref.current.value,
            color_code: colorCode  // <-- (CHANGED) direct input value ki jagah state use ki
        };

        if (nameref.current.value.trim() === '') {
            toast.error('Please enter color name');
            return;
        }

        axiosApiInstance.post('/color/create-color', data)
            .then(response => {
                if (response.data.flag === 1) {
                    e.target.reset();
                    setColorCode("#000000"); // <-- (ADDED) color picker ko reset kiya
                    toast.success(response.data.msg);
                } else {
                    toast.error(response.data.msg);
                }
            }).catch(error => {

                console.log("Full Error Object:", error); // pura error object dekhne ke liye
            });
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="mx-auto bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-8 shadow-blue-200">
                    <h2 className="text-xl font-semibold">Color/add</h2>
                    <Link href="/admin/color"
                        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600">
                        Back to view
                    </Link>
                </div>

                <form className="space-y-4" onSubmit={SubmitHandler}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Color Name</label>
                        <input ref={nameref}
                            onChange={nameChangeHandler}
                            placeholder='Add Color Name'
                            type="text"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Color Slug</label>
                        <input ref={slugref}
                            readOnly
                            placeholder='color slug'
                            type="text"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Color Picker</label>
                        <div className='mt-2 ml-3'>
                            <input
                                type='color'
                                name="color_code"
                                value={colorCode} // <-- (CHANGED) controlled value
                                onChange={(e) => setColorCode(e.target.value)} // <-- (ADDED) state update on change
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                            Add Color
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
