"use client"

import React from 'react';
import { FiUploadCloud } from "react-icons/fi";
import { useRef } from 'react';

const Imageuplod = () => {
    const [perv_image, setpervImage] = React.useState(null);
    const inputref = useRef();


    const changehandler = (e) => {
        const imagefile = new FileReader();
        imagefile.readAsDataURL(e.target.files[0]);
        imagefile.onload = (e) => {
            setpervImage(e.target.result);
        }
    }

    return (
        <>
            <div onClick={() => inputref.current.click()} className="flex flex-col items-center justify-center h-48 border-2 border-gray-300 border-dashed rounded-lg">
                

            {perv_image ?
                <img src={perv_image} height={200} width={200} alt="preview" />
                : <>
                <FiUploadCloud className="text-3xl text-gray-500" />
                <p className="text-gray-500">Drag 'n' drop some files here, or click to select files</p>
                </>
               
            }

            </div>
            <input name='image' hidden ref={inputref} onChange={changehandler} type='file' accept="png,jpeg,jpg,gif"/>

        </>
    );
}

export default Imageuplod;
