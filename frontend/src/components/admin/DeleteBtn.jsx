"use client"

import { axiosApiInstance } from '@/library/helper';
import React from 'react'
import { FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function DeleteBtn({ flag, deleteURL }) {
    const router = useRouter()

    const DeleteHandler = () => {
        toast.loading('moving to tarsh..');
        if (flag == 1) {

            axiosApiInstance.patch(deleteURL)
                .then(
                    (response) => {
                        if (response.data.flag == 1) {
                            toast.dismiss();
                            toast.success(response.data.msg);
                            router.refresh();

                        } else {
                            toast.error(response.data.msg);
                        }

                    }
                ).catch(
                    (error) => {

                        toast.dismiss();
                        toast.error('somthing went wrong move to trash')

                    }
                )


        } else {
            toast.loading('Deleting....');
            console.log(deleteURL)
            axiosApiInstance.delete(deleteURL)
                .then(
                    (response) => {
                        if (response.data.flag == 1) {
                            toast.dismiss();
                            toast.success(response.data.msg);
                            router.refresh();

                        } else {
                            toast.error(response.data.msg);
                        }

                    }
                ).catch(
                    (error) => {
                        console.log(error)
                        toast.dismiss();
                        toast.error('somthing went wrong delete')
                    }
                )

        }

    }

    return (
        <>
            <button
                onClick={DeleteHandler}
                className="text-red-500 hover:text-red-600"
            >
                <FaTrash />
            </button>
        </>
    )
}
