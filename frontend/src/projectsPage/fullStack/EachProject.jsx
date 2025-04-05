import axiosInstance from "../../utils/axiosInstance.js";
import {MdClose} from "react-icons/md";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {FaEdit} from "react-icons/fa";
import AddNewProject from "../AddNewProject.jsx";

const EachProject = ({project, projects,setProjects ,fetchProjects}) => {

    const [isEdit, setIsEdit] = useState(true);


    const deleteProject = async (id) => {
        try{
            const response = await axiosInstance.delete(`deleteFullStackProject/${id}`);
            console.log(response);
            setProjects(projects.filter(p => p._id !== id));
        }catch(e){
            console.log(e)
        }
    }

    const loggedIn = useSelector(store => store.loggedIn.isLoggedIn);

    return (
        <>
            {isEdit ? (
                <div className="relative w-[30em] h-[15rem] rounded-lg overflow-hidden group shadow-lg transition-transform hover:scale-[1.02] cursor-pointer">
                    {/* IMAGE */}
                    <img
                        src={project.image}
                        alt={project.name}
                        className="h-full object-cover"
                    />

                    {/* DARK OVERLAY ON HOVER */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-center">
                        <h2 className="text-white text-xl font-bold mb-2">{project.name}</h2>
                        <p className="text-gray-300 text-sm mb-2">{project.description}</p>
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 underline hover:text-blue-300 text-sm"
                        >
                            View GitHub Repo
                        </a>
                    </div>


                    {/* TITLE OVER IMAGE */}
                    <div
                        className="absolute bottom-0 left-0 w-full p-2 backdrop-blur-sm bg-black/50 text-white text-center text-lg font-semibold">
                        {project.name}
                    </div>


                    {/* DELETE BUTTON */}
                    {loggedIn && (
                        <button
                            onClick={() => deleteProject(project._id)}
                            className="absolute top-2 right-2 bg-black bg-opacity-50 hover:bg-red-600 text-white p-2 rounded-full z-20"
                        >
                            <MdClose className="text-md" />
                        </button>
                    )}

                    {/* EDIT BUTTON */}
                    {loggedIn && (
                        <button
                            onClick={() => setIsEdit(false)}
                            className="absolute bottom-2 right-2 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full z-20"
                        >
                            <FaEdit className="text-md" />
                        </button>
                    )}
                </div>
            ) : (
                <AddNewProject
                    project={project}
                    setIsEdit={setIsEdit}
                    fetchProjects={fetchProjects}
                    dbNames={"Full Stack"}
                />
            )}
        </>
    );
}
export default EachProject;