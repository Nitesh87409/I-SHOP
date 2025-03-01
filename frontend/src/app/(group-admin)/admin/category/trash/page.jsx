
import Link from "next/link";
import { timesago } from "@/library/helper";
import {DeleteBtn} from "@/components/admin/DeleteBtn";
import { getCategoryDataTrash } from "@/library/api-call";
import {Restore} from "@/components/admin/Restore";



const CategoryPage = async () => {
    const categoryJson = await getCategoryDataTrash();
    const categories = categoryJson?.categories;


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className=" mx-auto bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Trash</h2>

                    <Link href="/admin/category" className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600">
                        view Category
                    </Link>
                </div>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Category Name</th>
                            <th className="p-2 border text-center">Slug</th>
                            <th className="p-2 border text-center">Status</th>
                            <th className="p-2 border text-center">deleted</th>
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


                                    <button className={`${category.status ? 'bg-green-500' : 'bg-red-500'} 
            hover:text-${category.status  ? 'green' : 'red'}-600 mx-2 p-2 rounded-md text-white`}>
                                        {category.status ? 'Active' : 'Inactive'}
                                    </button>
                                </td>
                                <td className="p-2 border">{timesago(category.deletedAt)}</td>
                                <td className="p-2 border flex justify-center gap-3">

                                    <Restore apiurl={`/category/restore/${category._id}`} className="text-xl my-[10px]" />

                                    <DeleteBtn flag={0} deleteURL={`/category/delete/${category._id}`} className="my-[10px]" />

                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
                <h1>{categories?.length == 0 && "Trash is empty..."}</h1>
            </div>
        </div>
    );
};

export default CategoryPage;
