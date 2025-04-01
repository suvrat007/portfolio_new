import React, {useEffect, useState} from "react";
import axiosInstance from "../../utils/axiosInstance.js";
import EachProject from "../fullStack/EachProject.jsx";
import EachJSProj from "./EachJSProj.jsx";
import {FaPlus} from "react-icons/fa";
import AddNewProject from "../AddNewProject.jsx";

const  JSproj = () => {
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const fetchProjects = async () => {
        try {
            const response = await axiosInstance.get("/getJSProjects");

            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };
    useEffect(() => {

        fetchProjects();
    }, []);

    console.log("Fetching projects:", projects);
    return (
        <div className="w-full border-2 mt-10 ">
            <div className="p-5 flex flex-row justify-between">
                <h1>JavaScript Projects</h1>
                <button
                    onClick={() => setShowModal(prev => !prev)}
                    className="text-lg py-2 px-6 bg-white text-black rounded-3xl flex items-center gap-2 cursor-pointer">
                    <div className={"flex flex-row items-center justify-center gap-2"}>
                        <FaPlus size={18}/>Add
                    </div>
                </button>
            </div>
            <div className="flex flex-col w-full overflow-x-auto">
                <div className="flex flex-row gap-6 min-w-max p-5">
                    {projects.map((project, index) => (
                        <EachJSProj project={project} setProjects={setProjects} key={index} projects={projects}/>
                    ))}

                </div>
            </div>
            {showModal && <AddNewProject setShowModal={setShowModal} dbNames={"JavaScript"} fetchProject={fetchProjects}/>}


        </div>
    );
}

export default JSproj