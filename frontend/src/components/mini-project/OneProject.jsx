import React, {useState} from "react";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance.js";
import { useSelector } from "react-redux";
import {FaEdit} from "react-icons/fa";
import AddJsProject from "./AddJsProject.jsx";

const OneProject = ({ project, getJSProjects }) => {
    const loggedIn = useSelector((store) => store.loggedIn.isLoggedIn);

    const [isEdit, setIsEdit] = useState(true);

    const deleteProject = async (id) => {
        try {
            await axiosInstance.delete(`/deleteJSProject/${id}`);
            getJSProjects();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {isEdit ? (
                <div
                    className="relative flex-shrink-0 w-[20em] snap-start bg-[#1A1A1A] border border-gray-700 rounded-xl p-4 mt-4 shadow-lg transition-all duration-300 hover:scale-105">

                    {loggedIn && (
                        <button
                            onClick={() => deleteProject(project._id)}
                            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition"
                        >
                            <MdClose className="text-white text-lg"/>
                        </button>
                    )}

                    <img
                        src={project.image}
                        alt="Project"
                        className="w-full h-40 object-cover rounded-md"
                    />

                    <h1 className="text-lg font-semibold text-white mt-3">{project.title}</h1>

                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 text-sm hover:underline"
                    >
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

            ): (<AddJsProject project={project} setIsEdit={setIsEdit} getJSProjects={getJSProjects} />)}



        </>
    );
};

export default OneProject;
