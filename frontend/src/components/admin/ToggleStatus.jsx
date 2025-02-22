"use client"
import React, { useState } from 'react'

export default function ToggleStatus({ status, apiURl, id }) {

    const [current_status, setCurrentStatus] = useState(status)
    console.log(current_status, " current status")

    return (
        <>

            <button className={`${current_status ? 'bg-green-500' : 'bg-red-500'} 
            hover:text-${current_status ? 'green' : 'red'}-600 mx-2 p-2 rounded-md text-white`}>
                {current_status ? 'Active' : 'Inactive'}
            </button>


        </>
    )
}
