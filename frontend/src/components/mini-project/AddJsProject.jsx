import {MdClose} from "react-icons/md";
import React, {useState} from "react";
import axiosInstance from "../../utils/axiosInstance.js";

const AddJsProject = ({getJSProjects,setShowModal}) => {
    const [title, setTitle]=useState("");
    const [content,setContent]=useState("");
    const [github,setGithub]=useState("");
    const [image,setImage]=useState("");
    const [error,setError]=useState(null);

    const addProject = async () => {
        try {
            const response = await axiosInstance.post("/addJSProject", {
                name: title,
                description: content,
                github,
                image,
            });
            console.log(response.data);
            getJSProjects();
            setShowModal(false);
        } catch (e) {
            setError("Failed to add project. Please try again.");
            console.log(e);
        }
    };

    return (
        <div className="flex flex-row items-center justify-center">
            <div className="relative  border-2 p-2 rounded-2xl min-h-40">
                {/* Close Button */}
                <button onClick={() => setShowModal(false)}
                        className="w-6   h-6 rounded-full flex items-center justify-center absolute top-1 right-1 hover:bg-slate-100 cursor-pointer">
                    <MdClose className="text-xl text-slate-400 hover:text-black"/>
                </button>

                {/* Image Preview */}
                {image && <img src={image} alt="Project" className="w-full h-40 object-cover rounded-lg"/>}

                {/* Input Fields */}
                <div className=" flex justify-between gap-2 mt-4">
                    <label className="pl-2 pr-2">IMAGE LINK</label>
                    <input type="text"
                           className="text-xl text-white border-b-2 pl-2 pr-2 rounded-lg"
                           placeholder="Link"
                           value={image}
                           onChange={(e) => setImage(e.target.value)}/>
                </div>

                <div className="flex justify-between gap-2 mt-4">
                    <label className="pl-2 pr-2">TITLE</label>
                    <input type="text"
                           className="text-xl text-white border-b-2 pl-2 pr-2 rounded-lg"
                           placeholder="Enter Project Title"
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}/>
                </div>

                <div className="flex justify-between gap-2 mt-4">
                    <label className="pl-2 pr-2">DESCRIPTION</label>
                    <input type="text"
                           className="text-xl text-white border-b-2 pl-2 pr-2 rounded-lg"
                           placeholder="Describe Your Project"
                           value={content}
                           onChange={(e) => setContent(e.target.value)}/>
                </div>

                <div className="flex justify-between gap-2 mt-4">
                    <label className="pl-2 pr-2">GITHUB</label>
                    <input type="text"
                           className="text-xl text-white border-b-2 pl-2 pr-2 rounded-lg"
                           placeholder="Enter GitHub Link"
                           value={github}
                           onChange={(e) => setGithub(e.target.value)}/>
                </div>

                {/* GitHub Link Preview */}
                {github && (
                    <a href={github} className="text-blue-500 mt-2">
                        View on GitHub
                    </a>
                )}

                {/* Add Button */}
                <div className="flex flex-col gap-2 mt-4">
                    <button onClick={addProject}
                            className="cursor-pointer bg-white text-black px-4 py-2 rounded-3xl">
                        Add
                    </button>
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
            </div>
        </div>


    )
}
export default AddJsProject