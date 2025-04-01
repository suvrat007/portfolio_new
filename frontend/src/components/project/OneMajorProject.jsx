import axiosInstance from "../../utils/axiosInstance.js";
import {MdClose} from "react-icons/md";
import React from "react";

const OneMajorProject=({project ,getTopFourProjects})=> {
    const deleteTopFour = async (id) => {
        try{
            const response = await axiosInstance.delete(`/deleteTopFourProject/${id}`);
            console.log(response);
            getTopFourProjects();
        }catch(error){
            console.log("An unexpected error occured." + error.message);
        }
    }
    // console.log(project);
    return (
        <div className="relative border-2 min-w-[40%] min-h-[30em] p-4">
            {/* Close Button */}
            <button onClick={() => deleteTopFour(project._id)}
                    className="w-10 h-10 rounded-full flex items-center justify-center absolute top-2 right-2 hover:bg-slate-50 cursor-pointer">
                <MdClose className="text-xl text-slate-400"/>
            </button>

            {/* Project Content */}
            <div>
                <img src={project.image} alt="Project" className="w-full h-40 object-cover"/>
                <h1 className="text-lg font-bold mt-2">{project.title}</h1>
                <p className="text-gray-500">{project.description}</p>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    View on GitHub
                </a>
            </div>
        </div>

    )
}
export default OneMajorProject;