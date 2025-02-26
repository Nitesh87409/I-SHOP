"use client"

import React from 'react';
import Link from 'next/link';
import { useRef } from 'react';
import { axiosApiInstance, titleToSlug } from '@/library/helper';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function page() {
    const nameref = useRef();
    const slugref = useRef();

    const nameChangeHandler = () => {

        slugref.current.value = titleToSlug(nameref.current.value);

    };
    const SubmitHandler = (e) => {
        e.preventDefault()
        

        const data = {
           colorname: nameref.current.value,
            colorslug: slugref.current.value,
            color_code: e.target.color_code.value

        }
        if (nameref.current.value == '') {
            toast.error('Please enter color name');
            return;

        }

        axiosApiInstance.post('/color/create-color', data)
            .then(response => {
                if (response.data.flag === 1) {
                    e.target.reset();
                    toast.success(response.data.msg);
                } else {
                    toast.error(response.data.msg);
                }
            }).catch(error => {
                console.log(error);


            })
    }


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className=" mx-auto bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-8 shadow-blue-200 ">
                    <h2 className="text-xl font-semibold">Color/add</h2>
                    <Link href="/admin/color"
                        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600">
                        Back to view
                    </Link>
                </div>

                <div >
                    <form className="space-y-4" onSubmit={SubmitHandler}>
                        <div>
                            <label htmlFor="colorName" className="block text-sm font-medium text-gray-700">Color Name</label>
                            <input ref={nameref}
                                onChange={nameChangeHandler}
                                placeholder='Add Color Name' type="text" id="categoryName" name="categoryName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                        
                        <div>
                            <label htmlFor="colorSlug" className="block text-sm font-medium text-gray-700">Color Slug</label>
                            <input ref={slugref}
                                readOnly={true}
                                placeholder='color slug'
                                type="text" id="categorySlug" name="colorSlug" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                        <div >
                            <label htmlFor="colorSlug" className=" block text-sm font-medium text-gray-700">Color Picker</label>
                            <div className='mt-2 ml-3'>
                            <input
                                type='color'
                                placeholder='color slug'
                                 name="color_code"/>
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
        </div>
    )
}
