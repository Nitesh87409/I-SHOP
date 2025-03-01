"use client"

import { axiosApiInstance } from '@/library/helper';
import React, { useState } from 'react'
import { FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import ConfirmBox from './ConfirmBox';
//delete btn category saction
 function DeleteBtn({ flag, deleteURL }) {
    const router = useRouter()
    const [toggleconfirm, settoggleconfirm] = useState(false)

    const deleteProcess = () => {

        // toast.loading('moving to tarsh..');
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
            // toast.loading('Deleting....');
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

    const DeleteHandler = () => {
        settoggleconfirm(true)

    }

    return (
        <>
            {toggleconfirm && <ConfirmBox onDelClick={deleteProcess} onCanClick={() => { settoggleconfirm(false) }} flag={flag} />}

            <button
                onClick={DeleteHandler}
                className="text-red-500 hover:text-red-600"
            >
                <FaTrash />
            </button>
        </>
    )
}

//delete btn color saction
function DeleteBtncolor({ flag, deleteURL }) {
    const router = useRouter()
    const [toggleconfirm, settoggleconfirm] = useState(false)

    const deleteProcess = () => {
        console.log(deleteURL);

        // toast.loading('moving to tarsh..');
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
            // toast.loading('Deleting....');
    
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

    const DeleteHandler = () => {
        settoggleconfirm(true)

    }

    return (
        <>
            {toggleconfirm && <ConfirmBox onDelClick={deleteProcess} onCanClick={() => { settoggleconfirm(false) }} flag={flag} />}

            <button
                onClick={DeleteHandler}
                className="text-red-500 hover:text-red-600"
            >
                <FaTrash />
            </button>
        </>
    )
}

export {DeleteBtn,DeleteBtncolor};
