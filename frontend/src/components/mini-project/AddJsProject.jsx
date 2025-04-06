import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddJsProject = ({ fetchProjects, setShowModal, project, setEditMode }) => {
    const [title, setTitle] = useState(project?.name || "");
    const [description, setDescription] = useState(project?.description || "");
    const [github, setGithub] = useState(project?.github || "");
    const [image, setImage] = useState(project?.image || "");
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        try {
            if (project) {
                await axiosInstance.put(`/updateJSProject/${project._id}`, {
                    name: title,
                    description,
                    github,
                    image,
                });
                setEditMode?.(false);
            } else {
                await axiosInstance.post("/addJSProject", {
                    name: title,
                    description,
                    github,
                    image,
                });
                setShowModal?.(false);
            }
            fetchProjects();
        } catch (err) {
            setError("Failed to save project. Try again.");
            console.error(err);
        }
    };

    const handleClose = () => {
        setEditMode?.(false);
        setShowModal?.(false);
    };

    return (
        <div className="border border-gray-700 bg-[#121212] p-4 rounded-2xl shadow-lg min-w-[20em]">
            <button
                onClick={handleClose}
                className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700"
            >
                <MdClose className="text-gray-400 hover:text-white text-lg" />
            </button>

            {image && <img src={image} alt="preview" className="w-full h-40 object-cover rounded-lg border border-gray-600" />}

            <div className="flex flex-col gap-3 mt-4">
                <input
                    className="text-white bg-gray-900 border border-gray-600 rounded-lg px-2 py-1 focus:outline-none"
                    placeholder="Image URL"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                />
                <input
                    className="text-white bg-gray-900 border border-gray-600 rounded-lg px-2 py-1 focus:outline-none"
                    placeholder="Project Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    className="text-white bg-gray-900 border border-gray-600 rounded-lg px-2 py-1 focus:outline-none"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <input
                    className="text-white bg-gray-900 border border-gray-600 rounded-lg px-2 py-1 focus:outline-none"
                    placeholder="GitHub Link"
                    value={github}
                    onChange={e => setGithub(e.target.value)}
                />
                {github && <a href={github} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm hover:underline">View on GitHub</a>}
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-3xl mt-2"
                >
                    {project ? "Update Project" : "Add Project"}
                </button>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
        </div>
    );
};

export default AddJsProject;
