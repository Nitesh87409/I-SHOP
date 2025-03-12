"use client"

import React from 'react';
import Link from 'next/link';
import { useRef } from 'react';
import { axiosApiInstance, titleToSlug } from '@/library/helper';
import { toast } from 'react-toastify';
import { useEffect, useState,use } from 'react';
import { getColorData } from '@/library/api-call';
import { useParams } from 'next/navigation';

export default function page() {
    // const paramsid = use(params); //useParams()
    const {color_id} = useParams();
    // const categoryId = paramsid.category_id;
    // console.log(params);

    const nameref = useRef();
    const slugref = useRef();
    const colorref = useRef();
    const [color, setcolor] = useState(null);

    const getData = async () => {
        try {
            const colorJson = await getColorData(color_id);
            const data = colorJson?.color;
            setcolor(data)
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch color data.");
        }
    };
    
    useEffect(() => {
        getData();
    }, [color_id]);
    
    const nameChangeHandler = () => {
        
        slugref.current.value = titleToSlug(nameref.current.value);
        
    };
    const SubmitHandler = (e) => {
        e.preventDefault()
        
        const data = {
            name: nameref.current.value,
            slug: slugref.current.value,
            colorcode: colorref.current.value
        }
        if (nameref.current.value == '') {
            toast.error('Please enter color name');
            return;

        }
    

        axiosApiInstance.put(`/color/update/${color_id}`, data)
            .then(response => {
                if (response.data.flag === 1) {
                   
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
                    <h2 className="text-xl font-semibold">color/edit</h2>
                    <Link href="/admin/color"
                        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600">
                        Back to view
                    </Link>
                </div>

                <div >
                    <form className="space-y-4" onSubmit={SubmitHandler}>
                        <div>
                            <label htmlFor="colorName" className="block text-sm font-medium text-gray-700">color Name</label>
                            <input ref={nameref}
                            defaultValue={color?.colorname}
                                onChange={nameChangeHandler}
                                placeholder='Add color' type="text" id="colorName" name="colorName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="colorSlug" className="block text-sm font-medium text-gray-700">color Slug</label>
                            <input ref={slugref}
                                defaultValue={color?.colorslug}
                                readOnly={true}
                                placeholder='color slug'
                                type="text" id="colorSlug" name="colorSlug" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                        <div >
                            <label htmlFor="colorSlug" className=" block text-sm font-medium text-gray-700">Color Picker</label>
                            <div className='mt-2 ml-3'>
                                <input
                                ref={colorref}
                                    type='color'
                                    defaultValue={color?.color_code}
                                    placeholder='color slug'
                                    name="color_code" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                Update Color
                            </button>
                        </div>
                    </form>
                </div>


            </div>
        </div>
    )
}
