import React, { useEffect, useState } from "react";
import OneProject from "./OneProject";
import axiosInstance from "../../utils/axiosInstance.js";
import { FaPlus } from "react-icons/fa";
import AddJsProject from "./AddJsProject.jsx";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

const MiniProjects = () => {
    const [jsprojects, setJsprojects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const loggedIn = useSelector((store) => store.loggedIn.isLoggedIn);

    const getJSProjects = async () => {
        try {
            const response = await axiosInstance.get("/getJSProjects");
            if (response?.data) {
                setJsprojects(response?.data);
            } else {
                console.log("No JS projects found.");
            }
        } catch (error) {
            console.log("An unexpected error occurred.");
        }
    };

    useEffect(() => {
        getJSProjects();
    }, []);

    return (
        <div className="w-full relative ">
            <div className="flex items-center justify-between mt-8 px-6">
                <h1 className="text-3xl text-white font-semibold">Mini-Projects</h1>

                {loggedIn && (
                    <button
                        onClick={() => setShowModal((prev) => !prev)}
                        className="text-lg py-2 px-6 bg-[#1A1A1A] cursor-pointer text-white border border-gray-600 rounded-3xl flex items-center gap-2 hover:bg-gray-800 transition"
                    >
                        {!showModal ? (
                            <div className="flex items-center gap-2">
                                <FaPlus size={18} /> Add
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <MdClose className="text-xl text-gray-400" /> Cancel
                            </div>
                        )}
                    </button>
                )}
            </div>


            <div className="relative mt-6 overflow-hidden">
                {/* Left & Right Fade Overlay */}
                {/*<div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#131313] to-transparent pointer-events-none"></div>*/}
                {/*<div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#131313] to-transparent pointer-events-none"></div>*/}


                <div className="flex overflow-x-auto gap-6 px-6 pb-5 scroll-smooth snap-x">
                    {jsprojects.map((project, index) => (
                        <OneProject key={index} project={project} getJSProjects={getJSProjects} />
                    ))}
                    {showModal && <AddJsProject getJSProjects={getJSProjects} setShowModal={setShowModal} />}

                </div>
            </div>
        </div>
    );
};

export default MiniProjects;
