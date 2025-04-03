import { MdClose } from "react-icons/md";
import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance.js";

const AddJsProject = ({ getJSProjects, setShowModal , project , setIsEdit}) => {
    const [title, setTitle] = useState(project?.name || "");
    const [content, setContent] = useState(project?.description||"");
    const [github, setGithub] = useState(project?.github||"");
    const [image, setImage] = useState(project?.image||"");
    const [error, setError] = useState(null);

    const addProject = async () => {
        try {
            await axiosInstance.post("/addJSProject", {
                name: title,
                description: content,
                github,
                image,
            });
            setShowModal(false);
            getJSProjects();
        } catch (e) {
            setError("Failed to add project. Please try again.");
            console.log(e);
        }
    };

    const editProject = async (id) => {
        try {
            const response = await axiosInstance.put(`/updateJSProject/${id}`, {
                name: title,
                description: content,
                github,
                image,
            });

            console.log(response.data);

            // Call getJSProjects() to refresh the project list
            getJSProjects();

            // Close modal and reset edit mode
            setIsEdit(true);
            setShowModal(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex flex-row items-center justify-center">
            <div className="relative border border-gray-700 bg-[#121212] p-4 rounded-2xl min-h-40 shadow-lg">
                {/* Close Button */}
                {!project ? (
                    <button
                    onClick={() => setShowModal(false)}
                    className="w-7 h-7 rounded-full flex items-center justify-center absolute top-2 right-2 bg-gray-800 hover:bg-gray-700 transition"
                >
                    <MdClose className="text-gray-400 hover:text-white text-lg"/>
                </button>
                ) : (
                    <button
                        onClick={() => setIsEdit(true)}
                        className="w-7 h-7 rounded-full flex items-center justify-center absolute top-2 right-2 bg-gray-800 hover:bg-gray-700 transition"
                    >
                        <MdClose className="text-gray-400 hover:text-white text-lg"/>
                    </button>
                )}


                {/* Image Preview */}
                {image && (
                    <img
                        src={image}
                        alt="Project"
                        className="w-full h-40 object-cover rounded-lg border border-gray-600"
                    />
                )}

                {/* Input Fields */}
                <div className="flex justify-between gap-2 mt-4">
                    <label className="pl-2 pr-2 text-gray-400">IMAGE LINK</label>
                    <input
                        type="text"
                        className="text-white bg-gray-900 border border-gray-600 rounded-lg px-2 py-1 focus:outline-none focus:border-blue-500"
                        placeholder="Link"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>

                <div className="flex justify-between gap-2 mt-4">
                    <label className="pl-2 pr-2 text-gray-400">TITLE</label>
                    <input
                        type="text"
                        className="text-white bg-gray-900 border border-gray-600 rounded-lg px-2 py-1 focus:outline-none focus:border-blue-500"
                        placeholder="Enter Project Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="flex justify-between gap-2 mt-4">
                    <label className="pl-2 pr-2 text-gray-400">DESCRIPTION</label>
                    <input
                        type="text"
                        className="text-white bg-gray-900 border border-gray-600 rounded-lg px-2 py-1 focus:outline-none focus:border-blue-500"
                        placeholder="Describe Your Project"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <div className="flex justify-between gap-2 mt-4">
                    <label className="pl-2 pr-2 text-gray-400">GITHUB</label>
                    <input
                        type="text"
                        className="text-white bg-gray-900 border border-gray-600 rounded-lg px-2 py-1 focus:outline-none focus:border-blue-500"
                        placeholder="Enter GitHub Link"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                    />
                </div>

                {/* GitHub Link Preview */}
                {github && (
                    <a
                        href={github}
                        className="text-blue-500 text-sm mt-2 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View on GitHub
                    </a>
                )}

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
                {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
            </div>
        </div>
    );
};

export default AddJsProject;
