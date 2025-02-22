

// import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { getCategoryData } from "@/library/api-call";
import { timesago } from "@/library/helper";

// const CategoryList = () => {
//     const [categories, setCategories] = useState([
//         { id: 1, name: "Electronics" },
//         { id: 2, name: "Fashion" },
//         { id: 3, name: "Home & Garden" },
//         { id: 4, name: "Sports" },
//     ]);
const CategoryPage = async () => {
    const categoryJson = await getCategoryData();
    const categories = categoryJson?.categories;




    // const handleDelete = (id) => {
    //     setCategories(categories.filter((category) => category.id !== id));
    // };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className=" mx-auto bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Categories</h2>
                    <Link href="/admin/category/add" className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600">
                        + Add Category
                    </Link>
                </div>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Category Name</th>
                            <th className="p-2 border text-center">Slug</th>
                            <th className="p-2 border text-center">Created</th>
                            <th className="p-2 border text-center"> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryJson != null && categories.map((category, index) => (
                            <tr key={category._id} className="hover:bg-gray-50">
                                <td className="p-2 border">{index + 1}</td>
                                <td className="p-2 border">{category.name}</td>
                                <td className="p-2 border">{category.slug}</td>
                                <td className="p-2 border">{timesago(category.createdAt)}</td>
                                <td className="p-2 border flex justify-center gap-3">
                                    <button className="text-yellow-500 hover:text-yellow-600">
                                        <FaEdit />
                                    </button>
                                    <button
                                        // onClick={() => handleDelete(category.id)}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryPage;
