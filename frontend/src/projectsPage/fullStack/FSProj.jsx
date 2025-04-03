import React, {useEffect, useState} from "react";
import axiosInstance from "../../utils/axiosInstance.js";
import EachProject from "./EachProject";
import AddNewProject from "../AddNewProject.jsx";
import {FaPlus} from "react-icons/fa";
import {MdClose} from "react-icons/md";
import {useSelector} from "react-redux";

const  FSProj = () => {
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const fetchProjects = async () => {
        try {
            const response = await axiosInstance.get("/getFullStackProjects");
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };
    const loggedIn = useSelector(store => store.loggedIn.isLoggedIn);

    useEffect(() => {
        fetchProjects();
    }, []);

    console.log("Fetching projects:", projects);

    return (
        <div className="w-full  mt-20 ">
            <div className="p-5 flex flex-row justify-between border-b-2 mb-6 border-dashed ">
                <h1 className={'text-3xl'}> <span className={'text-purple-400'}>Full Stack </span>Projects</h1>
                {loggedIn && (
                    <button
                        onClick={() => setShowModal(prev => !prev)}
                        className="text-lg py-2 px-6 bg-purple-400 hover:bg-purple-600 text-white rounded-full flex items-center gap-2 cursor-pointer transition-all">
                        <div className="flex flex-row items-center justify-center gap-2">
                            <FaPlus size={18}/> Add
                        </div>
                    </button>

                )}

            </div>

            <div className="flex flex-col w-full overflow-x-auto">
                <div className="flex flex-row gap-6 min-w-max p-5">
                    {projects.map((project, index) => (
                        <EachProject project={project} setProjects={setProjects} key={index} projects={projects}
                                     fetchProjects={fetchProjects}/>
                    ))}

                </div>
            </div>
            {showModal && <AddNewProject setShowModal={setShowModal} dbNames={"Full Stack"} fetchProjects={fetchProjects}/>}


        </div>
    );
}
export default FSProj