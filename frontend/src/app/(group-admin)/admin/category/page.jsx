import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { getCategoryData } from "@/library/api-call";
import { timesago } from "@/library/helper";
import DeleteBtn from "@/components/admin/DeleteBtn";
import ToggleStatus from "@/components/admin/ToggleStatus";


const CategoryPage = async () => {
    const categoryJson = await getCategoryData();
    const categories = categoryJson?.categories;


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className=" mx-auto bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4 col-span-2">
                    <h2 className="text-xl font-semibold">Categories</h2>
                    <div className="flex col-span-2 gap-3 ">
                        <Link href="/admin/trash" className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600">
                            View Tarsh
                        </Link>
                        <Link href="/admin/category/add" className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600">
                            + Add Category
                        </Link>
                    </div>
                </div>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Category Name</th>
                            <th className="p-2 border text-center">Slug</th>
                            <th className="p-2 border text-center">Status</th>
                            <th className="p-2 border text-center">Created/Updated</th>
                            <th className="p-2 border text-center"> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryJson != null && categories.map((category, index) => (
                            <tr key={category._id} className="hover:bg-gray-50 text-center">
                                <td className="p-2 border">{index + 1}</td>
                                <td className="p-2 border">{category.name}</td>
                                <td className="p-2 border">{category.slug}</td>
                                <td className="p-2 border">
                                    <ToggleStatus apiURl={"/category/change-status/"} status={category.status} id={category._id} />
                                </td>
                                <td className="p-2 border">{timesago(category.createdAt)}/{timesago(category.updatedAt)}</td>
                                <td className="p-2 border flex justify-center gap-3">
                                    <Link href={`/admin/category/edit/${category._id}`}>
                                    <button className="text-yellow-500 hover:text-yellow-600  my-[10px]">
                                        <FaEdit  />
                                    </button>
                                    </Link>
                                    <DeleteBtn flag={1} deleteURL={`/category/move-to-trash/${category._id}`} />

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
