"use client"
import { axiosApiInstance } from '@/library/helper'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
//category status btn
function ToggleStatus ({ status, apiURl, id }) {

    const [current_status, setCurrentStatus] = useState(status)

    const toggleHandler = () => {
        // setCurrentStatus(!current_status);
        axiosApiInstance.patch(apiURl, { id: id, new_status: !current_status })
            .then(
                (response) => {
                    if (response.data.flag == 1) {
                        setCurrentStatus(!current_status);
                        toast.success(response.data.msg)

                    } else {
                        toast.error(response.data.msg);
                    }
                }
            ).catch(
                (error) => {
                    toast.error('somthing went wrong')
                }
            )

    }

    return (
        <>

            <button onClick={toggleHandler} className={`${current_status ? 'bg-green-500' : 'bg-red-500'} 
            hover:text-${current_status ? 'green' : 'red'}-600 mx-2 p-2 rounded-md text-white`}>
                {current_status ? 'Active' : 'Inactive'}
            </button>


        </>
    )
}

//color status btn 
function ToggleStatuscolor ({ status, apiURl, id }) {

    const [current_status, setCurrentStatus] = useState(status)

    const toggleHandler = () => {
        axiosApiInstance.patch(apiURl, { id: id, new_status: !current_status })
        
            .then(
                (response) => {
                    if (response.data.flag == 1) {
                        setCurrentStatus(!current_status);
                        toast.success(response.data.msg)

                    } else {
                        toast.error(response.data.msg);
                    }
                }
            ).catch(
                (error) => {
                    toast.error('somthing went wrong')
                }
            )

    }

    return (
        <>

            <button onClick={toggleHandler} className={`${current_status ? 'bg-green-500' : 'bg-red-500'} 
            hover:text-${current_status ? 'green' : 'red'}-600 mx-2 p-2 rounded-md text-white`}>
                {current_status ? 'Active' : 'Inactive'}
            </button>


        </>
    )
}
export{ToggleStatus, ToggleStatuscolor};
