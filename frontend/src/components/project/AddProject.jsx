import {MdClose} from "react-icons/md";
import React, {useState} from "react";
import axiosInstance from "../../utils/axiosInstance.js";

const AddProject = ({setModalIsOpen, getTopFourProjects}) => {
    const [title, setTitle]=useState("");
    const [content,setContent]=useState("");
    const [github,setGithub]=useState("");
    const [image,setImage]=useState("");
    const [error,setError]=useState(null);

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


    return (
        <div className="flex flex-row items-center justify-center p-5 ">
            <div className="relative w-[40em] border-2 p-10 rounded-2xl">
                <button onClick={() => setModalIsOpen(false)}
                        className="w-10 h-10 rounded-full flex flex-col items-center justify-center absolute top-0 right-0 hover:bg-slate-50 cursor-pointer">
                    <MdClose className="text-xl text-slate-400"/>
                </button>
                <div className="flex flex-col gap-2 ">
                    <label className="pl-2 pr-2">IMAGE LINK</label>
                    <input type="text"
                           className="text-2xl text-white border-b-2  pl-2 pr-2 rounded-lg"
                           placeholder="Link"
                           value={image}
                           onChange={(e) => setImage(e.target.value)}/>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                    <label className="pl-2 pr-2">TITLE</label>
                    <input type="text"
                           className="text-2xl text-white border-b-2 pl-2 pr-2 rounded-lg"
                           placeholder="Enter Project Title"
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                    <label className="pl-2 pr-2">PROJECT DESCRIPTION</label>
                    <textarea type="text"
                              className={"text-sm text-white outline-none border-b-2 p-2 rounded-lg"}
                              placeholder={'Describe Your Project'}
                              value={content}
                              onChange={(e) => setContent(e.target.value)}
                              rows={10}/>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                    <label className="pl-2 pr-2">GITHUB</label>
                    <input type="text"
                           className="text-2xl text-white border-b-2 pl-2 pr-2 rounded-lg"
                           placeholder="Go to Gym"
                           value={github}
                           onChange={(e) => setGithub(e.target.value)}/>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                    <button onClick={addProject}
                        className={ 'cursor-pointer bg-white text-black px-4 py-2 rounded-3xl'}>
                        Add
                    </button>
                </div>
                {error && <p className="text-red-500 text-xs pt-4">{error}</p>}


            </div>
        </div>
    )
}
export default AddProject