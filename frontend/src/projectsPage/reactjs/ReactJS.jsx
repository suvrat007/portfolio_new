import React, {useEffect, useState} from "react";
import axiosInstance from "../../utils/axiosInstance.js";
import EachJSProj from "../js/EachJSProj.jsx";
import EachReactProj from "./EachReactProj.jsx";
import {FaPlus} from "react-icons/fa";
import AddNewProject from "../AddNewProject.jsx";
import {useSelector} from "react-redux";
import ShimmerUI from "../../utils/ShimmerUI.jsx";

const  ReactJS = () => {
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const fetchProjects = async () => {
        try {
            const response = await axiosInstance.get("/getReactJSProjects");
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const loggedIn = useSelector(store => store.loggedIn.isLoggedIn);

    // console.log("Fetching projects:", projects);

    return (
        <div className="w-full mt-10 ">

            <div className="p-5 flex flex-row justify-between border-b-2 border-gray-200 mb-6 border-dashed">
                <h1 className={'text-3xl '}> <span className={"text-blue-400"}>ReactJS </span>Projects</h1>
                {loggedIn && (
                    <button
                        onClick={() => setShowModal(prev => !prev)}
                        className="text-lg py-2 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center gap-2 cursor-pointer transition-all">
                        <div className="flex flex-row  items-center justify-center gap-2">
                            <FaPlus size={18}/> Add
                        </div>
                    </button>
                )}

            </div>
            {projects.length === 0 && (
                <ShimmerUI/>
            )}
            <div className="flex flex-col w-full overflow-x-auto">
                <div className="flex flex-row gap-6 min-w-max p-5">
                    {projects.map((project, index) => (
                        <EachReactProj project={project} setProjects={setProjects} key={index} projects={projects} fetchProjects={fetchProjects}/>
                    ))}
                </div>
            </div>

            {showModal && <AddNewProject setShowModal={setShowModal} dbNames={"ReactJS"} fetchProjects={fetchProjects}/>}

        </div>
    )
}

export default ReactJS