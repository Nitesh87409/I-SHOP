"use client"

import { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

export default function AddProduct() {
    const [originalPrice, setOriginalPrice] = useState();
    const [discountedPrice, setDiscountedPrice] = useState("");

    return (
        <div className="  p-6 bg-white shadow-md rounded-lg mt-3 mx-1">
            <div className="w-full pb-3 text-lg">
              
                <div className="flex justify-between">
                <div className="">Product / add</div>
                    <button className=" bg-blue-600 text-white px-2 py-2 rounded ">View Product</button>

                </div>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
            <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Enter product name" className="border p-2 rounded w-full" />
                <input type="text" placeholder="Enter product slug" className="border p-2 rounded w-full" />

                <select className="border p-2 rounded w-full">
                    <option>Select Category</option>
                    {/* Add dynamic options here */}
                </select>
                <select className="border p-2 rounded w-full">
                    <option>Select Color</option>
                    {/* Add dynamic options here */}
                </select>

            </div>
            <div className="w-full flex gap-2 mt-2 ">
                <input type="number" value={originalPrice} className="border p-2 rounded w-full" />
                <input
                    type="number"
                    placeholder="Enter discounted price"
                    className="border p-2 rounded w-full"
                    value={discountedPrice}
                    onChange={(e) => setDiscountedPrice(e.target.value)}
                />
                <input
                    placeholder="Discounted %"
                    type="text" value={originalPrice} className="border p-2 rounded w-full" disabled />
            </div>

            <div className="mt-4 border-dashed border-2 border-gray-300 p-6 flex flex-col items-center cursor-pointer">
                <FiUploadCloud className="text-3xl text-gray-500" />
                <p className="text-gray-500">Drag 'n' drop some files here, or click to select files</p>
            </div>

            <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded">Add Product</button>
        </div>
    );
}
