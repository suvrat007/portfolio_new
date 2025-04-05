import axiosInstance from "../../utils/axiosInstance.js";
import { MdClose } from "react-icons/md";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import AddNewProject from "../AddNewProject.jsx";

const EachJSProj = ({ project, projects, setProjects, fetchProjects }) => {
    const [isEdit, setIsEdit] = useState(true);
    const loggedIn = useSelector(store => store.loggedIn.isLoggedIn);

    const deleteProject = async (id) => {
        try {
            const response = await axiosInstance.delete(`deleteJSProject/${id}`);
            console.log(response);
            setProjects(projects.filter(p => p._id !== id));
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            {isEdit ? (
                <div className="relative group w-full sm:w-[20em] h-64 rounded-xl overflow-hidden shadow-md hover:scale-105 transition-all duration-300">

                    {/* Background Image */}
                    <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover rounded-xl"
                    />

                    <div
                        className="absolute bottom-0 left-0 w-full p-2 backdrop-blur-sm bg-black/50 text-white text-center text-lg font-semibold">
                        {project.name}
                    </div>


                    {/* Hover Overlay */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center px-4 text-center rounded-lg"
                    >
                        <h1 className="text-lg font-bold mb-2">{project.name}</h1>
                        <p className="text-sm mb-3">{project.description}</p>
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 underline hover:text-blue-300 transition"
                        >
                            View on GitHub
                        </a>
                    </div>


                    {/* Delete Button */}
                    {loggedIn && (
                        <button
                            onClick={() => deleteProject(project._id)}
                            className="absolute top-2 right-2 bg-white p-1 rounded-full hover:bg-gray-200 transition"
                        >
                            <MdClose className="text-black text-lg"/>
                        </button>
                    )}

                    {/* Edit Button */}
                    {loggedIn && (
                        <button
                            onClick={() => setIsEdit(false)}
                            className="absolute bottom-2 right-2 bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition"
                        >
                            <FaEdit className="text-white text-sm" />
                        </button>
                    )}
                </div>
            ) : (
                <AddNewProject
                    project={project}
                    setIsEdit={setIsEdit}
                    dbNames={"JavaScript"}
                    fetchProjects={fetchProjects}
                />
            )}
        </>
    );
};

export default EachJSProj;
