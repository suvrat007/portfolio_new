import { MdClose } from "react-icons/md";
import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import addProject from "../components/project/AddProject.jsx";

const AddNewProject = ({ setShowModal,dbNames,fetchProjects,project,setIsEdit}) => {
    const [title, setTitle] = useState(project?.name || "");
    const [content, setContent] = useState(project?.description||"");
    const [github, setGithub] = useState(project?.github||"");
    const [image, setImage] = useState(project?.image||"");
    const [error, setError] = useState(null);

    const getApiEndpoint = () => {
        if (!project) {
            switch (dbNames) {
                case "JavaScript":
                    return "/addJSProject";
                case "ReactJS":
                    return "/addReactJSProject";
                case "Full Stack":
                    return "/addFullStackProject";
                default:
                    return null;
            }
        }else{
            switch (dbNames) {
                case "JavaScript":
                    return "/updateJSProject";
                case "ReactJS":
                    return "/updateReactJSProject";
                case "Full Stack":
                    return "/updateFullStackProject";
                default:
                    return null;
            }
        }

    };

    const addProject = async () => {
        const apiEndpoint = getApiEndpoint();
        if (!apiEndpoint) {
            setError("Invalid database selection.");
            return;
        }
        try {
            const response = await axiosInstance.post(apiEndpoint, {
                name: title,
                description: content,
                github,
                image,
            });
            console.log(response.data);
            setShowModal(false);
            fetchProjects()
        } catch (e) {
            setError("Failed to add project. Please try again.");
            console.log(e);
        }
    };

    const editProject = async (id) => {
        const apiEndpoint = getApiEndpoint();
        if (!apiEndpoint) {
            setError("Invalid database selection.");
            return;
        }
        try {
            const response = await axiosInstance.put(`${apiEndpoint}/${id}`, {
                name: title,
                description: content,
                github,
                image,
            });

            console.log(response.data);
            // Close modal and reset edit mode
            setIsEdit(true);
            // setShowModal(false);
            fetchProjects()
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm z-50">
            {/* Modal Content */}
            <div className="relative w-[90%] max-w-lg bg-white p-6 rounded-2xl shadow-lg transition-transform transform scale-100">

                {!project ? (
                    <button
                        onClick={() => setShowModal(false)}
                        className="w-7 h-7 rounded-full flex items-center justify-center absolute top-2 right-2 hover:bg-gray-200 transition"
                    >
                        <MdClose className="text-gray-400 hover:text-white text-lg"/>
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEdit(true)}
                        className="w-9 h-9 rounded-full flex items-center justify-center absolute top-2 right-2 hover:bg-gray-200 transition"
                    >
                        <MdClose className="text-gray-400 hover:text-white text-lg"/>
                    </button>
                )}

                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">{`Add New Project to ${dbNames} database`}</h2>

                {/* Image Preview */}
                {image && <img src={image} alt="Project" className="w-full h-40 object-cover rounded-lg mb-4 shadow-sm" />}

                {/* Input Fields */}
                <div className="space-y-4">
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Image Link</label>
                        <input
                            type="text"
                            className="border rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Image URL"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Title</label>
                        <input
                            type="text"
                            className="border rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Project Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Description</label>
                        <input
                            type="text"
                            className="border rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Describe Your Project"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">GitHub Link</label>
                        <input
                            type="text"
                            className="border rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter GitHub URL"
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                        />
                    </div>

                    {/* GitHub Link Preview */}
                    {github && (
                        <a href={github} target="_blank" rel="noopener noreferrer"
                           className="text-blue-500 hover:underline text-sm">
                            View on GitHub
                        </a>
                    )}
                </div>

                {!project ? (
                    <div className="flex flex-col gap-2 mt-4">
                        <button
                            onClick={addProject}
                            className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white text-lg px-4 py-2 rounded-3xl transition"
                        >
                            Add Project
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 mt-4">
                        <button
                            onClick={()=>editProject(project?._id)}
                            className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white text-lg px-4 py-2 rounded-3xl transition"
                        >
                            Update Project
                        </button>
                    </div>
                )}

                {/* Error Message */}
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            </div>
        </div>
    );
};

export default AddNewProject;
