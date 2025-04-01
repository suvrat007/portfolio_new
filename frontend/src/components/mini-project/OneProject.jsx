import React from "react";
import {MdClose} from "react-icons/md";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance.js";

const OneProject = ({project,getJSProjects}) => {

    const deleteProject = async(id) => {
        try{
            const response = await axiosInstance.delete(`/deleteJSProject/${id}`);
            console.log(response);
            getJSProjects();
        }catch(e){
            console.error(e);
        }
    }

    return (
        <div className="relative">
            <button onClick={()=>deleteProject(project._id)}
                    className="w-10 h-10 rounded-full flex items-center justify-center absolute top-2 right-2 hover:bg-slate-50 cursor-pointer">
                <MdClose className="text-lg text-slate-400"/>
            </button>
            <div className=" h-full border-2 p-4 rounded-2xl min-w-80 min-h-40">
                <img src={project.image} alt="Project" className="w-full h-40 object-cover"/>
                <h1 className="text-lg font-bold mt-2">{project.title}</h1>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    View on GitHub
                </a>
            </div>
        </div>

    );
};

export default OneProject;

