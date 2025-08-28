import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { getProductData } from "@/library/api-call";
import { timesago } from "@/library/helper";
import {DeleteBtn} from "@/components/admin/DeleteBtn";
import {ToggleStatus} from "@/components/admin/ToggleStatus";


const ProductPage = async () => {
    const productResponse = await getProductData();
    const products = productResponse?.product;
    


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className=" mx-auto bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4 col-span-2">
                    <h2 className="text-xl font-semibold">Product</h2>
                    <div className="flex col-span-2 gap-3 ">
                        {/* <Link href="/admin/product/trash" className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600">
                            View Tarsh
                        </Link> */}
                        <Link href="/admin/product/add" className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600">
                            + Add Product
                        </Link>
                    </div>
                </div>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">product Name/slug</th>
                            <th className="p-2 border">price</th>
                            <th className="p-2 border text-center">image</th>
                            <th className="p-2 border text-center">Category</th>
                            <th className=" p-2 border text-center">color</th>
                            <th className="p-2 border text-center">Status</th>
                            <th className="p-2 border text-center">Created/Updated</th>
                            <th className="p-2 border text-center"> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productResponse != null && products.map((products, index) => (
                            <tr key={products._id} className="hover:bg-gray-50 text-center">
                                <td className="p-2 border">{index + 1}</td>
                                <td className="p-2 border">{products.name}/{products.slug}</td>
                                <td className="p-2 border ">
                                    Price: {products.price} <br />
                                    Discount: {products.discount} % <br />
                                    Final Price: {products.final_price} <br />
                                    </td>
                                <td className="p-2 border"><img className="rounded-lg" height={100} width={100} src={`${process.env.NEXT_PUBLIC_API_URL}/image/products/${products.main_image}`} alt="" />
                                    </td>
                                <td className="p-2 border">{products.category_id.name}</td>
                                <td className="p-2 border">
                                    <ul key={products._id}>
                                        {
                                            products.colors.map(
                                                (color, index) => {
                                            return <li><p className="rounded-full w-10 h-5 my-[10px]
                                             border border-white" style={{background:color.color_code}}></p>{color.colorname}</li>
                                        })
                                        }
                                    </ul>


                                </td>

                              
                                <td className="p-2 border">
                                    <ToggleStatus apiURl={"/product/change-status/"} status={products.status} id={products._id} />
                                </td>
                                <td className="p-2 border">{timesago(products.createdAt)}/{timesago(products.updatedAt)}</td>
                                <td className="p-2 border flex justify-center gap-3">
                                    <Link href={`/admin/product/edit/${products._id}`}>
                                    <button className="text-yellow-500 hover:text-yellow-600  my-[10px]">
                                        <FaEdit  />
                                    </button>
                                    </Link>
                                    <DeleteBtn flag={1} deleteURL={`/product/move-to-trash/${products._id}`} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default ProductPage;
