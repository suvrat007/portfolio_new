import { MdClose } from "react-icons/md";
import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance.js";

const AddProject = ({ setModalIsOpen, getTopFourProjects, project, setIsEdit }) => {
    const [title, setTitle] = useState(project?.name || "");
    const [content, setContent] = useState(project?.description || "");
    const [github, setGithub] = useState(project?.github || "");
    const [image, setImage] = useState(project?.image || "");
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        try {
            const method = project ? 'put' : 'post';
            const url = project
                ? `/updateTopFourProject/${project._id}`
                : `/addTopFourProject`;

            const response = await axiosInstance[method](url, {
                name: title,
                description: content,
                github,
                image,
            });

            console.log(response.data);
            getTopFourProjects();
            setModalIsOpen?.(false);
            setIsEdit?.(true);
        } catch (err) {
            setError("Something went wrong. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center mt-6 px-4">
            <div className="relative bg-[#1A1A1A] border border-gray-800 p-6 rounded-xl w-full max-w-xl shadow-xl">
                <button
                    onClick={() => {
                        project ? setIsEdit(true) : setModalIsOpen(false);
                    }}
                    className="absolute top-3 right-3 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white w-8 h-8 rounded-full flex items-center justify-center transition"
                >
                    <MdClose />
                </button>

                <h2 className="text-xl font-semibold mb-5 text-white">
                    {project ? "Edit Project" : "Add Project"}
                </h2>

                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input-field"
                    />
                    <textarea
                        placeholder="Description"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={4}
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="GitHub Link"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        className="input-field"
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                    <button
                        onClick={handleSubmit}
                        className="w-full py-2 mt-2 bg-blue-600 hover:bg-blue-500 text-white rounded-3xl font-medium transition"
                    >
                        {project ? "Update Project" : "Add Project"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProject;
