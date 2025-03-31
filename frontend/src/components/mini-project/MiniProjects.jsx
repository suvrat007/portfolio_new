import React, {useEffect, useState} from "react";
import OneProject from "./OneProject";
import axiosInstance from "../../utils/axiosInstance.js";
import OneMajorProject from "../project/OneMajorProject.jsx";
import {FaPlus} from "react-icons/fa";

const MiniProjects = () => {
    const [jsprojects, setJsprojects] = useState([]);
    const getJSProjects =async () => {
        try{
            const response = await axiosInstance.get("/getJSProjects");
            // console.log(response?.data);

            if(response?.data ){
                setJsprojects(response?.data);
            }else{
                console.log("nothing added to js projects.");
            }
        }catch(error){
            console.log("An unexpected error occured.");
        }
    }

    useEffect(() => {
        getJSProjects();
        return ()=>{};
    },[])

    console.log(jsprojects );
    return (
        <div className="w-full">
            <div className="flex flex-row items-center mt-8 justify-between">
                <h1 className="text-3xl p-4">Mini-Projects</h1>
                <button className="text-lg py-2 px-6 bg-white text-black rounded-3xl flex items-center gap-2 cursor-pointer">
                    <FaPlus size={18}/> Add
                </button>
            </div>

            <div className="overflow-x-auto border-2 p-5 ">
                <div className="flex flex-row gap-6 min-w-max">
                    {jsprojects.map((project, index) => (
                        <OneProject project={project}/>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default MiniProjects;
