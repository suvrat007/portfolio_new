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
            const response = await axiosInstance.delete(`/deleteTopFourProject/${id}`);
            console.log(response);
            getTopFourProjects();
        } catch (error) {
            console.log("An unexpected error occurred: " + error.message);
        }
    };

    return (
        <>
            {isEdit ? (
                <div className="relative w-[90%] md:w-[40%] min-h-[28em] rounded-2xl overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-xl border border-gray-800 bg-[#121212]">

                    {loggedIn && (
                        <button
                            onClick={() => deleteTopFour(project._id)}
                            className="absolute top-3 right-3 text-white/50 hover:text-red-500 transition z-10"
                            title="Delete"
                        >
                            <MdClose size={22} />
                        </button>
                    )}

                    {/* Image Top Half */}
                    <div className="h-1/2 w-full">
                        <img
                            src={project.image}
                            alt="Project"
                            className="w-full h-full object-cover"
                        />
                    </div>


                    {/* Bottom Content */}
                    <div className="min-h-[50%] p-5 flex flex-col justify-between bg-transparent">
                        <div>
                            <h1 className="text-white text-2xl font-bold mb-1">{project.name}</h1>
                            <p className="text-gray-400 text-sm line-clamp-3">{project.description}</p>
                        </div>

                        <div className="mt-4">
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-blue-400 hover:text-blue-500 text-sm gap-1 transition"
                            >
                                <FaGithub /> View on GitHub
                            </a>
                        </div>
                    </div>

                    {/* Edit Button */}
                    {loggedIn && (
                        <button
                            onClick={() => setIsEdit(false)}
                            className="absolute bottom-3 right-3 w-9 h-9 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-full transition"
                            title="Edit"
                        >
                            <FaEdit className="text-white text-base" />
                        </button>
                    )}
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
