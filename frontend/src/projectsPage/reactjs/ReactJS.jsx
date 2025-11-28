import React, {useEffect, useState} from "react";
import axiosInstance from "../../utils/axiosInstance.js";
import EachReactProj from "./EachReactProj.jsx";
import {FaPlus} from "react-icons/fa";
import AddNewProject from "../AddNewProject.jsx";
import {useSelector} from "react-redux";
import ShimmerUI from "../../utils/ShimmerUI.jsx";

const ReactJS = () => {
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Added loading state

    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get("/getReactJSProjects");
            const projectsArray = Array.isArray(response.data) ? response.data : [];
            setProjects(projectsArray);

        } catch (error) {
            console.error("Error fetching projects:", error);
            setProjects([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const loggedIn = useSelector(store => store.loggedIn.isLoggedIn);

    return (
        <div className="w-full mt-20 px-4 md:px-10 overflow-hidden">

            <div className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-dashed border-blue-500 mb-6">
                <h1 className={'text-4xl font-semibold text-white'}> <span className={"text-blue-400"}>ReactJS </span>Projects</h1>
                {loggedIn && (
                    <button
                        onClick={() => setShowModal(prev => !prev)}
                        className="text-sm md:text-base py-2 px-5 bg-blue-500 hover:bg-blue-700 text-white rounded-full flex items-center gap-2 transition-all">
                        <div className="flex flex-row  items-center justify-center gap-2">
                            <FaPlus size={16}/> Add
                        </div>
                    </button>
                )}
            </div>

            {isLoading ? (
                <ShimmerUI/>
            ) : projects.length === 0 ? (
                <p className="text-gray-400 text-center p-8 text-lg">
                    No ReactJS projects found. Click 'Add' to create one!
                </p>
            ) : (
                <div className="flex flex-col w-full overflow-x-auto">
                    <div className="flex flex-row gap-6 min-w-max p-5">
                        {projects.map((project, index) => (
                            <EachReactProj
                                project={project}
                                setProjects={setProjects}
                                key={project._id || index}
                                projects={projects}
                                fetchProjects={fetchProjects}
                            />
                        ))}
                    </div>
                </div>
            )}

            {showModal && <AddNewProject setShowModal={setShowModal} dbNames={"ReactJS"} fetchProjects={fetchProjects}/>}

        </div>
    )
}

export default ReactJS;