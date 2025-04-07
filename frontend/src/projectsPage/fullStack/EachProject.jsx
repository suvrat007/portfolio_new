import axiosInstance from "../../utils/axiosInstance.js";
import { MdClose } from "react-icons/md";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import AddNewProject from "../AddNewProject.jsx";

const EachProject = ({ project, projects, setProjects, fetchProjects }) => {
    const [isEdit, setIsEdit] = useState(true);
    const loggedIn = useSelector(store => store.loggedIn.isLoggedIn);

    const deleteProject = async (id) => {
        try {
            await axiosInstance.delete(`deleteFullStackProject/${id}`);
            setProjects(projects.filter(p => p._id !== id));
        } catch (e) {
            console.log(e);
        }
    };

    return isEdit ? (
        <div className="relative  w-[17em] md:w-[30em] h-[15em] rounded-xl overflow-hidden group shadow-[0_0_15px_#a855f7] hover:shadow-[0_0_25px_#9333ea] border border-purple-700 transition-transform hover:scale-[1.03] cursor-pointer">

            {/* Purple Outer Glow Layer */}
            <div className="absolute inset-0 rounded-xl border-2 border-purple-500 blur-md opacity-70 group-hover:opacity-100 pointer-events-none transition duration-300 z-0"></div>

            {/* Project Image */}
            <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover z-10"
            />

            {/* Blur Background & Info */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center px-4 z-20">
                <h2 className="text-white text-xl font-semibold mb-2">{project.name}</h2>
                <p className="text-gray-300 text-sm mb-2">{project.description}</p>
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-300 underline hover:text-purple-400 text-sm"
                >
                    View GitHub Repo
                </a>
            </div>

            {/* Title at bottom */}
            <div className="absolute bottom-0 left-0 w-full py-2 text-white text-center backdrop-blur-sm bg-black/40 text-base font-medium hover:opacity-0 z-10">
                {project.name}
            </div>

            {/* Delete Button */}
            {loggedIn && (
                <button
                    onClick={() => deleteProject(project._id)}
                    className="absolute top-2 right-2 bg-black/60 hover:bg-red-600 text-white p-2 rounded-full z-30"
                >
                    <MdClose size={16} />
                </button>
            )}

            {/* Edit Button */}
            {loggedIn && (
                <button
                    onClick={() => setIsEdit(false)}
                    className="absolute bottom-2 right-2 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full z-30"
                >
                    <FaEdit size={16} />
                </button>
            )}
        </div>
    ) : (
        <AddNewProject
            project={project}
            setIsEdit={setIsEdit}
            fetchProjects={fetchProjects}
            dbNames={"Full Stack"}
        />
    );

};

export default EachProject;
