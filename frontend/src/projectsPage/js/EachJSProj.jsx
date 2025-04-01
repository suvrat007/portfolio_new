import axiosInstance from "../../utils/axiosInstance.js";
import {MdClose} from "react-icons/md";
import React from "react";

const EachJSProj = ({project, projects,setProjects}) => {
    const deleteProject = async (id) => {
        try{
            const response = await axiosInstance.delete(`deleteJSProject/${id}`);
            console.log(response);
            setProjects(projects.filter(p => p._id !== id));
        }catch(e){
            console.log(e)
        }
    }
    return (
        <div
            className="flex flex-col items-center justify-center w-full sm:w-[20em] border-2 border-gray-300 shadow-lg rounded-lg p-4 bg-white hover:scale-105 transition-all">
            <button onClick={() => deleteProject(project._id)}
                    className="w-10 h-10 rounded-full flex items-center justify-center absolute top-2 right-2 hover:bg-slate-50 cursor-pointer">
                <MdClose className="text-lg text-black"/>
            </button>
            <img src={project.image} alt={project.name} className="w-full h-40 object-cover rounded-md"/>
            <h1 className="text-lg font-semibold mt-2">{project.name}</h1>
            <p className="text-sm text-gray-600 text-center">{project.description}</p>
            <a href={project.github} target="_blank" rel="noopener noreferrer"
               className="text-blue-500 mt-2 hover:underline">GitHub</a>
        </div>
    );
}
export default EachJSProj