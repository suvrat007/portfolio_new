import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance.js";
import EachProject from "./EachProject";
import AddNewProject from "../AddNewProject.jsx";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import ShimmerUI from "../../utils/ShimmerUI.jsx";

const FSProj = () => {
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const loggedIn = useSelector(store => store.loggedIn.isLoggedIn);

    const fetchProjects = async () => {
        try {
            const response = await axiosInstance.get("/getFullStackProjects");
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="w-full mt-20 px-4 md:px-10 overflow-hidden">
            <div className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-dashed border-purple-500 mb-6">
                <h1 className="text-4xl font-semibold text-white mb-4 md:mb-0">
                    <span className="text-purple-400 ">Full Stack </span>Projects
                </h1>
                {loggedIn && (
                    <button
                        onClick={() => setShowModal(prev => !prev)}
                        className="text-sm md:text-base py-2 px-5 bg-purple-500 hover:bg-purple-700 text-white rounded-full flex items-center gap-2 transition-all"
                    >
                        <FaPlus size={16} /> Add
                    </button>
                )}
            </div>

            {projects.length === 0 ? (
                <ShimmerUI />
            ) : (
                <div className="flex flex-col w-full overflow-x-auto">
                    <div className="flex gap-6 min-w-max p-4">
                        {projects.map((project, index) => (
                            <EachProject
                                key={index}
                                project={project}
                                setProjects={setProjects}
                                projects={projects}
                                fetchProjects={fetchProjects}
                            />
                        ))}
                    </div>
                </div>
            )}

            {showModal && (
                <AddNewProject
                    setShowModal={setShowModal}
                    dbNames={"Full Stack"}
                    fetchProjects={fetchProjects}
                />
            )}
        </div>
    );
};

export default FSProj;
