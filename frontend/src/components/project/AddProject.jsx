import {MdClose} from "react-icons/md";
import React, {useState} from "react";
import axiosInstance from "../../utils/axiosInstance.js";

const AddProject = ({setModalIsOpen, getTopFourProjects,project , setIsEdit}) => {
    const [title, setTitle] = useState(project?.name || "");
    const [content, setContent] = useState(project?.description||"");
    const [github, setGithub] = useState(project?.github||"");
    const [image, setImage] = useState(project?.image||"");
    const [error, setError] = useState(null);

    const addProject = async () => {
        try {
            const response = await axiosInstance.post("/addTopFourProject", {
                name: title,
                description: content,
                github,
                image,
            });
            console.log(response.data);
            getTopFourProjects();
            setModalIsOpen(false);  // Close modal on success
        } catch (e) {
            setError("Failed to add project. Please try again.");
            console.log(e);
        }
    };
    const editProject = async (id) => {
        try {
            const response = await axiosInstance.put(`/updateTopFourProject/${id}`, {
                name: title,
                description: content,
                github,
                image,
            });

            console.log(response.data);

            // Call getJSProjects() to refresh the project list
            getTopFourProjects();

            // Close modal and reset edit mode
            setIsEdit(true);
            setModalIsOpen(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className=" flex items-center justify-center bg-black mt-5">
            <div className="relative bg-[#1A1A1A] border border-gray-800 p-6 rounded-lg shadow-md min-w-[32em] min-h-[28em]">
                {!project ? (
                    <button
                        onClick={() => setModalIsOpen(false)}
                        className="w-7 h-7 rounded-full flex items-center justify-center absolute top-2 right-2 bg-gray-800 cursor-pointer hover:bg-gray-700 transition"
                    >
                        <MdClose className="text-gray-400 hover:text-white text-lg"/>
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEdit(true)}
                        className="w-7 h-7 rounded-full flex items-center justify-center absolute top-2 right-2 bg-gray-800 cursor-pointer hover:bg-gray-700 transition"
                    >
                        <MdClose className="text-gray-400 hover:text-white text-lg"/>
                    </button>
                )}

                <h2 className="text-2xl font-semibold mb-4">Add Project</h2>

                <div className="flex flex-col gap-4">
                    <div>
                        <label className="text-gray-400">Image Link</label>
                        <input
                            type="text"
                            className="w-full border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter image link"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-gray-400 ">Title</label>
                        <input
                            type="text"
                            className="w-full border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter project title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-gray-400">Project Description</label>
                        <textarea
                            className="w-full border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
                            placeholder="Describe your project"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={5}
                        />
                    </div>

                    <div>
                        <label className="text-gray-400">GitHub Link</label>
                        <input
                            type="text"
                            className="w-full border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter GitHub link"
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                        />
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

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
            </div>
        </div>

    )
}
export default AddProject