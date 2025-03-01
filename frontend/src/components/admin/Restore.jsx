"use client"
import { axiosApiInstance } from '@/library/helper'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { MdSettingsBackupRestore } from "react-icons/md";
import { Router, useRouter } from 'next/navigation';

 function Restore({ apiurl }) {
    const router = useRouter();
    const RestoreHandler = () => {

        axiosApiInstance.patch(apiurl)
            .then(
                (response) => {
                    if (response.data.flag == 1) {

                        toast.success(response.data.msg);
                        router.refresh();

                    } else {
                        toast.error(response.data.msg);
                    }

                }
            ).catch(
                (error) => {

                    toast.error('somthing went wrong ')

                }
            )

    }

    return (
        <>

            <button onClick={RestoreHandler}>
                <MdSettingsBackupRestore />

            </button>


        </>
    )
}


function RestoreColor({ apiurl }) {
    const router = useRouter();
    const RestoreHandlercolor = () => {

        axiosApiInstance.patch(apiurl)
            .then(
                (response) => {
                    if (response.data.flag == 1) {

                        toast.success(response.data.msg);
                        router.refresh();

                    } else {
                        toast.error(response.data.msg);
                    }

                }
            ).catch(
                (error) => {
                    console.log(error);

                    toast.error('somthing went wrong ')

                }
            )

    }

    return (
        <>

            <button onClick={RestoreHandlercolor}>
                <MdSettingsBackupRestore />

            </button>


        </>
    )
}

export {Restore,RestoreColor};
