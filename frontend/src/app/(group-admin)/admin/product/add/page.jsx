"use client"
import { useEffect, useState } from "react";
import { axiosApiInstance, titleToSlug } from "@/library/helper";
import { useRef } from 'react';
import { getCategoryData, getColorData } from "@/library/api-call";
import Select from 'react-select';
import Imageuplod from "@/components/admin/Imageuplod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { RichTextEditor } from "@/components/website/RichTextEditor";



export default function AddProduct() {
    const router = useRouter();
    const [category, setcategory] = useState(null);
    const [color, setcolor] = useState(null);
    const [selectedColor, setSelectedColor] = useState([]);
    const [discription, setdiscription] = useState('')

    const getData = async () => {
        const categoryJson = await getCategoryData();
        const categories = categoryJson?.categories;
        setcategory(categories);

        const colorJson = await getColorData();
        const colordata = colorJson?.color;
        setcolor(colordata);

    }


    useEffect(() => {
        getData()
    }, []);


    const [erorrs, SetErorr] = useState({

        name: "",
        slug: "",
        Orignal_price: "",
        discounted_price: "",
        final_price: ""

    })

    const nameref = useRef();
    const slugref = useRef();
    const originalPriceref = useRef();
    const discountparsentref = useRef();
    const finalPriceref = useRef();


    const pricechangehandler = () => {
        const originalPrice = originalPriceref.current.value
        const discountedPrice = discountparsentref.current.value
        if (discountedPrice > 100) {
            SetErorr({
                ...erorrs,
                discountedPrice: "Discount Present must be less then 100"
            })
        } else {
            SetErorr({
                ...erorrs,
                discountedPrice: ""
            })

            const finalprice = originalPrice - (originalPrice * discountedPrice / 100)
            finalPriceref.current.value = finalprice
        }

    }

    const nameChangeHandler = () => {
        axiosApiInstance.get(`/product/check-product-exists/${nameref.current.value}`)
            .then((response) => {
                if (response.data.flag == 0) {
                    SetErorr({
                        ...erorrs,
                        name: "Product Already Exists"
                    });
                } else {
                    SetErorr({
                        ...erorrs,
                        name: ""
                    });
                }
            })
            .catch((error) => {

            });

        slugref.current.value = titleToSlug(nameref.current.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('slug', slugref.current.value); 
        formData.append('category', e.target.category.value);
        formData.append('name', nameref.current.value);
        formData.append('color', JSON.stringify(selectedColor));
        formData.append('Orignal_price', originalPriceref.current.value);
        formData.append('discounted_price', discountparsentref.current.value);
        formData.append('final_price', finalPriceref.current.value);
        formData.append('Discription', discription);
        formData.append('image', e.target.image.files[0]);

        axiosApiInstance.post('/product/add', formData)
        .then(response => {
                        if (response.data.flag == 1) {
                            // router.push('/admin/product');
                            toast.success(response.data.msg);
                        } else {
                            toast.error(response.data.msg);
                        }
                    }).catch(error => {
                        console.log(error);

                       toast.error('somthing went wrong');
        
        
                    })
      
    }

    return (

        <div className="  p-6 bg-white shadow-md rounded-lg mt-3 mx-1">
            <div className="w-full pb-3 text-lg">

                <div className="flex justify-between">
                    <div className="">Product / add</div>
                    <button className=" bg-blue-600 text-white px-2 py-2 rounded ">View Product</button>

                </div>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
            <form onSubmit={submitHandler}>
                <div className="grid grid-cols-2 gap-4">
                    <div>

                        <input ref={nameref}
                            onChange={nameChangeHandler}
                            name="name"
                            type="text" placeholder="Enter product name" className="border p-2 rounded w-full h-[40px] " />
                        {
                            erorrs.name != "" &&
                            <span className="text-red-500 mt-2">{erorrs.name} </span>

                        }
                    </div>

                    <input
                        ref={slugref}
                        readOnly={true}
                        name="slug"
                        type="text" placeholder="Enter product slug" className="border p-2 rounded w-full h-[40px]" />

                    <Select
                        name="category"
                        className="text-bla"
                        options={category?.map((item) => ({ label: item.name, value: item._id }))}
                    />
                    <Select
                        onChange={(option) => {
                            const data = option.map(opt => opt.value)
                            setSelectedColor(data)

                        }}
                        name="color"
                        closeMenuOnSelect={false}
                        isMulti={true}
                        className="text-bla"
                        options={color?.map((item) => ({ label: item.colorname, value: item._id }))}
                    />
                </div>
                <div className="w-full 9 grid grid-cols-3 gap-2 mt-2 ">
                    <input type="number"
                        onChange={pricechangehandler}
                        placeholder="Orignal Price "
                        name="Orignal_price"

                        ref={originalPriceref} className="border p-2 rounded w-full h-[40px]" />
                    <div>
                        <input
                            onChange={pricechangehandler}
                            name="discounted_price"
                            ref={discountparsentref}

                            placeholder="Discounted %"
                            type="text" className="border p-2 rounded w-full h-[40px]" />
                        {
                            erorrs.discountedPrice != "" &&
                            <span className="text-red-500">{erorrs.discountedPrice}</span>
                        }

                    </div>
                    <input
                        readOnly={true}
                        ref={finalPriceref}
                        name="final_price"
                        type="number"
                        placeholder="Final Price "
                        className="border p-2 rounded w-full h-[40px]"

                    />

                </div>
                <div className="mt-2 mb-2">
                    <RichTextEditor value ={discription} changeHandler={
                        (data)=>{
                            setdiscription(data)
                        }
                    }/>
                    {/* <textarea className="border p-2 rounded w-full mt-3" name="Discription" id="" placeholder="Enter the Discription"></textarea> */}
                </div>
                <Imageuplod />
                <button type="submit" className="mt-6 bg-blue-600 text-white px-6 py-2 rounded">Add Product</button>
            </form >
        </div>
    );
}
