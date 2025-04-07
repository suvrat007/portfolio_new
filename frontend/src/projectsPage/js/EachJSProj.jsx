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
                <div className="relative group w-[15em] md:w-[20em] h-[15em] md:h-[14em] sm:w-[18em] md:w-[20em] h-72 bg-white dark:bg-[#1e1e1e] rounded-xl overflow-hidden shadow-[0_0_15px_#fde047] hover:shadow-[0_0_25px_#facc15] transform hover:scale-105 transition-all duration-300 border border-yellow-400">

                    {/* Yellow Glow Border Layer */}
                    <div className="absolute inset-0 rounded-xl border-2 border-yellow-300 blur-md opacity-60 group-hover:opacity-100 pointer-events-none transition duration-300 z-0"></div>

                    {/* Image */}
                    <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover rounded-xl z-10"
                    />

                    {/* Overlay Info */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center px-4 text-center text-white z-20">
                        <h2 className="text-xl font-bold mb-2">{project.name}</h2>
                        <p className="text-sm mb-3">{project.description}</p>
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-yellow-400 hover:text-yellow-300 transition"
                        >
                            View on GitHub
                        </a>
                    </div>

                    {/* Title Always Visible */}
                    <div className="absolute bottom-0 w-full bg-black/40 backdrop-blur-sm text-white text-center py-2 px-4 font-semibold text-sm sm:text-base z-10">
                        {project.name}
                    </div>

                    {/* Buttons */}
                    {loggedIn && (
                        <>
                            <button
                                onClick={() => deleteProject(project._id)}
                                className="absolute top-2 right-2 bg-white text-black hover:bg-red-600 hover:text-white p-1.5 rounded-full transition z-30"
                            >
                                <MdClose size={18} />
                            </button>

                            <button
                                onClick={() => setIsEdit(false)}
                                className="absolute bottom-2 right-2 bg-yellow-400 text-black hover:bg-yellow-500 p-1.5 rounded-full transition z-30"
                            >
                                <FaEdit size={16} />
                            </button>
                        </>
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
