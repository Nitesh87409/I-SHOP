import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { getColorDataTrash } from "@/library/api-call";
import { timesago } from "@/library/helper";
import {DeleteBtncolor} from "@/components/admin/DeleteBtn";
import {ToggleStatuscolor} from "@/components/admin/ToggleStatus";
import { RestoreColor } from "@/components/admin/Restore";


const ColorPage = async () => {
    const colorJson = await getColorDataTrash();
    const colordata = colorJson?.color;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className=" mx-auto bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4 col-span-2">
                    <h2 className="text-xl font-semibold">Color Category</h2>
                    <div className="flex col-span-2 gap-3 ">
                        
                        <Link href="/admin/color" className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600">
                            Back to view
                        </Link>
                    </div>
                </div>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Color Name</th>
                            <th className="p-2 border text-center">Slug</th>
                            <th className="p-2 border text-center">Status</th>
                            <th className="p-2 border text-center">Color</th>
                            <th className="p-2 border text-center">Created</th>
                            <th className="p-2 border text-center"> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {colorJson != null && colordata.map((color, index) => (
                            <tr key={color._id} className="hover:bg-gray-50 text-center">
                                <td className="p-2 border">{index + 1}</td>
                                <td className="p-2 border">{color.colorname}</td>
                                <td className="p-2 border">{color.colorslug}</td>
                                <td className="p-2 border">
                                    <ToggleStatuscolor apiURl={"/color/change-status/"} status={color.status} id={color._id} />
                                </td>
                                <td className="p-2 border flex justify-center  ">
                                    <div
                                        className="rounded-full w-10 h-5 my-[10px] "
                                        style={{ backgroundColor: color.color_code }}
                                    >
                                    </div>
                                </td>
                                <td className="p-2 border">{timesago(color.createdAt)}</td>
                                <td className="p-2 border flex justify-center gap-3 ">
                                     <RestoreColor apiurl={`/color/restore/${color._id}`} className="text-xl my-[10px]" />


                                    <DeleteBtncolor flag={0} deleteURL={`/color/delete/${color._id}`} />

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ColorPage;
