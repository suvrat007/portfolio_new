import OneMajorProject from "./OneMajorProject.jsx";
import { FaPlus } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance.js";
import { MdClose } from "react-icons/md";
import AddProject from "./AddProject.jsx";
import { useSelector } from "react-redux";
import ShimmerUI from "../../utils/ShimmerUI.jsx";

const MajorProjects = () => {
    const [topFour, setTopFour] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const loggedIn = useSelector(store => store.loggedIn.isLoggedIn);

    const getTopFourProjects = async () => {
        try {
            const response = await axiosInstance.get("/getTopFourProjects");
            if (response?.data) setTopFour(response?.data);
        } catch (error) {
            console.log("An unexpected error occurred.");
        }
    };

    useEffect(() => {
        getTopFourProjects();
    }, []);

    return (
        <div className="w-full relative mb-10">



            <div className="flex items-center justify-between mt-8 px-6 border-b border-gray-800 pb-4">
                <h1 className="text-3xl text-white font-semibold">Recent-Works</h1>
                {loggedIn && (
                    <button
                        onClick={() => setModalIsOpen(prev => !prev)}
                        className="text-lg py-2 px-6 bg-[#1A1A1A] text-white border border-gray-600 rounded-3xl flex items-center gap-2 hover:bg-gray-800 transition"
                    >
                        {!setModalIsOpen ? (
                            <><MdClose className="text-xl text-gray-400"/> Cancel</>
                        ) : (
                            <><FaPlus size={18}/> Add</>
                        )}
                    </button>
                )}
            </div>
            {topFour.length === 0 && (
                <ShimmerUI/>
            )}
            {modalIsOpen && (
                <AddProject
                    setModalIsOpen={setModalIsOpen}
                    getTopFourProjects={getTopFourProjects}
                />
            )}

            <div className="w-full mt-8 flex flex-wrap gap-6 justify-center">
                {topFour.slice(-4).reverse().map((project) => (
                    <OneMajorProject
                        key={project._id}
                        project={project}
                        getTopFourProjects={getTopFourProjects}
                    />
                ))}
            </div>
        </div>
    );
};

export default MajorProjects;
