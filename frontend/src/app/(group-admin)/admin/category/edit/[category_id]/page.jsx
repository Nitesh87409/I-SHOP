"use client"

import React from 'react';
import Link from 'next/link';
import { useRef } from 'react';
import { axiosApiInstance, titleToSlug } from '@/library/helper';
import { toast } from 'react-toastify';
import { useEffect, useState,use } from 'react';
import { getCategoryData } from '@/library/api-call';

export default function page({params}) {
    const paramsid = use(params);
    const categoryId = paramsid.category_id;

    const nameref = useRef();
    const slugref = useRef();
    const [category, setCategory] = useState(null);
    const getData = async () => {
        try {
            const categoryJson = await getCategoryData(categoryId);
            const data = categoryJson?.categories;
            setCategory(data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch category data.");
        }
    };

    useEffect(() => {
        getData();
    }, [categoryId]);

    const nameChangeHandler = () => {

        slugref.current.value = titleToSlug(nameref.current.value);

    };
    const SubmitHandler = (e) => {
        e.preventDefault()

        const data = {
            name: nameref.current.value,
            slug: slugref.current.value
        }
        if (nameref.current.value == '') {
            toast.error('Please enter category name');
            return;

        }

        axiosApiInstance.put(`/category/update/${categoryId}`, data)
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
                    <h2 className="text-xl font-semibold">Categories/edit</h2>
                    <Link href="/admin/category"
                        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600">
                        Back to view
                    </Link>
                </div>

                <div >
                    <form className="space-y-4" onSubmit={SubmitHandler}>
                        <div>
                            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Category Name</label>
                            <input ref={nameref}
                            defaultValue={category?.name}
                                onChange={nameChangeHandler}
                                placeholder='Add Category' type="text" id="categoryName" name="categoryName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="categorySlug" className="block text-sm font-medium text-gray-700">Category Slug</label>
                            <input ref={slugref}
                                defaultValue={category?.slug}
                                readOnly={true}
                                placeholder='Category slug'
                                type="text" id="categorySlug" name="categorySlug" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                Update Category
                            </button>
                        </div>
                    </form>
                </div>


            </div>
        </div>
    )
}
