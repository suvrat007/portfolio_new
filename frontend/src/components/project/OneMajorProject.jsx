import axiosInstance from "../../utils/axiosInstance.js";
import { MdClose } from "react-icons/md";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaEdit, FaGithub } from "react-icons/fa";
import AddProject from "./AddProject.jsx";

const OneMajorProject = ({ project, getTopFourProjects }) => {
    const [isEdit, setIsEdit] = useState(true);
    const loggedIn = useSelector((store) => store.loggedIn.isLoggedIn);

    const deleteTopFour = async (id) => {
        try {
            await axiosInstance.delete(`/deleteTopFourProject/${id}`);
            getTopFourProjects();
        } catch (error) {
            console.log("An unexpected error occurred: " + error.message);
        }
    };

    return (
        <>
            {isEdit ? (
                <div className=" w-full h-[30em] flex flex-col sm:w-[45%] lg:w-[35%]  bg-[#1A1A1A] rounded-xl overflow-hidden
                border border-gray-800 shadow-lg hover:shadow-2xl transition hover:scale-[1.05] ">
                    {loggedIn && (
                        <button
                            onClick={() => deleteTopFour(project._id)}
                            className="absolute top-3 right-3 text-white/60 hover:text-red-500 transition z-10"
                            title="Delete"
                        >
                            <MdClose size={22} />
                        </button>
                    )}

                    <div className="h-1/2">
                        <img src={project.image} alt="Project" className="w-full h-full object-cover" />
                    </div>

                    <div className="p-5 flex flex-col justify-between h-full gap-6">
                        <div>
                            <h1 className="text-2xl font-bold text-white">{project.name}</h1>
                            <p className="lg:text-sm text-lg text-gray-400 mt-2 line-clamp-4 md:line-clamp-6">{project.description}</p>
                        </div>

                        <div className="flex flex-row justify-between items-center mt-2">
                            <a
                                href={project.github}
                                className="flex items-center gap-2 text-purple-400 hover:text-blue-500 text-xl lg:text-lg"
                            >
                                <FaGithub size={20}/> GitHub
                            </a>
                            {loggedIn && (
                                <button
                                    onClick={() => setIsEdit(false)}
                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition"
                                >
                                    <FaEdit className="text-white text-base" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <AddProject
                    project={project}
                    setIsEdit={setIsEdit}
                    getTopFourProjects={getTopFourProjects}
                />
            )}
        </>
    );
};

export default OneMajorProject;
