import React, { useEffect, useState } from "react";
import OneProject from "./OneProject";
import axiosInstance from "../../utils/axiosInstance";
import { FaPlus } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import AddJsProject from "./AddJsProject";
import { useSelector } from "react-redux";
import ShimmerUI from "../../utils/ShimmerUI.jsx";

const MiniProjects = () => {
    const [jsProjects, setJsProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const isLoggedIn = useSelector((state) => state.loggedIn.isLoggedIn);

    const fetchProjects = async () => {
        try {
            const res = await axiosInstance.get("/getJSProjects");
            setJsProjects(res.data || []);
        } catch (err) {
            console.error("Failed to fetch projects.", err);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="w-full relative mb-10">



            <div className="flex items-center justify-between mt-8 px-6 border-b border-gray-800 pb-4">
                <h1 className="text-3xl text-white font-semibold">Mini-Projects</h1>
                {isLoggedIn && (
                    <button
                        onClick={() => setShowModal(prev => !prev)}
                        className="text-lg py-2 px-6 bg-[#1A1A1A] text-white border border-gray-600 rounded-3xl flex items-center gap-2 hover:bg-gray-800 transition"
                    >
                        {showModal ? (
                            <><MdClose className="text-xl text-gray-400" /> Cancel</>
                        ) : (
                            <><FaPlus size={18} /> Add</>
                        )}
                    </button>
                )}
            </div>
            {jsProjects.length === 0 && (
                <ShimmerUI/>
            )}
            <div className="relative mt-6 overflow-hidden">
                <div className="flex overflow-x-auto gap-6 pr-6 pb-5 scroll-smooth snap-x">
                    {jsProjects.map((project, i) => (
                        <OneProject key={i} project={project} fetchProjects={fetchProjects} />
                    ))}
                    {showModal && <AddJsProject fetchProjects={fetchProjects} setShowModal={setShowModal} />}
                </div>
            </div>
        </div>
    );
};

export default MiniProjects;