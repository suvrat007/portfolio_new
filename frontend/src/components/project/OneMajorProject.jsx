import axiosInstance from "../../utils/axiosInstance.js";
import {MdClose} from "react-icons/md";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {FaEdit} from "react-icons/fa";
import AddProject from "./AddProject.jsx";


const OneMajorProject=({project ,getTopFourProjects})=> {
    const [isEdit, setIsEdit] = useState(true);

    const deleteTopFour = async (id) => {
        try{
            const response = await axiosInstance.delete(`/deleteTopFourProject/${id}`);
            console.log(response);
            getTopFourProjects();
        }catch(error){
            console.log("An unexpected error occured." + error.message);
        }
    }
    const loggedIn = useSelector(store => store.loggedIn.isLoggedIn);

    // console.log(project);
    return (
        <>
            {isEdit ? (
                <div className="relative bg-[#1A1A1A] border border-gray-800 p-6 rounded-lg shadow-md w-[40%] min-h-[28em]">
                {loggedIn && (
                    <button
                        onClick={() => deleteTopFour(project._id)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
                    >
                        <MdClose size={22}/>
                    </button>
                )}

                <img src={project.image} alt="Project" className="w-full h-44 object-cover rounded-md"/>
                <h1 className="text-lg font-bold mt-3">{project.title}</h1>
                <p className="text-gray-400 text-sm mt-2">{project.description}</p>
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                   className="text-blue-400 hover:text-blue-500 mt-3 inline-block transition">
                    View on GitHub
                </a>
                {loggedIn && (
                    <button
                        onClick={() => setIsEdit(false)}
                        className="absolute cursor-pointer   bottom-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition"
                    >
                        <FaEdit className="text-white text-lg"/>
                    </button>
                )}
            </div>

            ): (<AddProject project={project} setIsEdit={setIsEdit} getTopFourProjects={getTopFourProjects} />)}

        </>

    )
}
export default OneMajorProject;