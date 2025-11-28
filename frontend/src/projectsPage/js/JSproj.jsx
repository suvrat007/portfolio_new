import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance.js";
import EachProject from "../fullStack/EachProject.jsx";
import EachJSProj from "./EachJSProj.jsx";
import { FaPlus } from "react-icons/fa";
import AddNewProject from "../AddNewProject.jsx";
import { useSelector } from "react-redux";
import ShimmerUI from "../../utils/ShimmerUI.jsx";

const JSproj = () => {
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const loggedIn = useSelector(store => store.loggedIn.isLoggedIn);

    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get("/getJSProjects");
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

    return (
        <div className="w-full mt-20 px-4 md:px-10 overflow-hidden">

            <div className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-dashed border-yellow-500 mb-6">
                <h1 className={'text-4xl font-semibold text-white'}> <span className={'text-yellow-400'}>JavaScript </span> Projects</h1>
                {loggedIn && (
                    <button
                        onClick={() => setShowModal(prev => !prev)}
                        className="text-sm md:text-base py-2 px-5 bg-yellow-500 hover:bg-yellow-700 text-white rounded-full flex items-center gap-2 transition-all"
                    >
                        <FaPlus size={16} /> Add
                    </button>
                )}
            </div>

            {isLoading ? (
                <ShimmerUI />
            ) : projects.length === 0 ? (
                <p className="text-gray-400 text-center p-8 text-lg">
                    No JavaScript projects found. Click 'Add' to create one!
                </p>
            ) : (
                <div className="flex flex-col w-full overflow-x-auto">
                    <div className="flex flex-row gap-6 min-w-max p-5">
                        {projects.map((project, index) => (
                            <EachJSProj
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

            {showModal && <AddNewProject setShowModal={setShowModal} dbNames={"JavaScript"} fetchProjects={fetchProjects}/>}
        </div>
    );
}

export default JSproj