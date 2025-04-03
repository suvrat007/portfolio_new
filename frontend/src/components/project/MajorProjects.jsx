import OneMajorProject from "./OneMajorProject.jsx";
import {FaPlus} from "react-icons/fa";
import React, {useEffect, useState} from "react";
import axiosInstance from "../../utils/axiosInstance.js";
import {MdClose} from "react-icons/md";
import AddProject from "./AddProject.jsx";
import {useSelector} from "react-redux";

const MajorProjects = () =>{
    const [topFour,setTopFour] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);



    const getTopFourProjects =async () => {
        try{
            const response = await axiosInstance.get("/getTopFourProjects");
            // console.log(response?.data);

            if(response?.data ){
                setTopFour(response?.data);
            }else{
                console.log("nothing added to js projects.");
            }
        }catch(error){
            console.log("An unexpected error occured.");
        }
    }


    const loggedIn = useSelector(store => store.loggedIn.isLoggedIn);


    useEffect(() => {
        getTopFourProjects();
        return ()=>{};
    },[]);


    return (
        <div className="w-full mt-8 text-white rounded-lg p-6 shadow-lg">
            <div className="flex flex-row items-center justify-between border-b border-gray-800 pb-4">
                <h1 className="text-3xl font-semibold">Recent Works</h1>
                {loggedIn && (
                    <button
                        onClick={() => setModalIsOpen(prev => !prev)}
                        className="text-lg py-2 px-6 cursor-pointer bg-[#1A1A1A] text-white border border-gray-600 rounded-3xl flex items-center gap-2 hover:bg-gray-800 transition"

                    >
                        {!modalIsOpen ? (
                            <FaPlus size={18} />
                        ) : (
                            <MdClose className="text-xl text-gray-300" />
                        )}
                        {modalIsOpen ? "Cancel" : "Add"}
                    </button>
                )}
            </div>

            {modalIsOpen && <AddProject setModalIsOpen={setModalIsOpen} getTopFourProjects={getTopFourProjects} />}

            <div className="w-full p-6 flex flex-wrap gap-8 items-center justify-center">
                {topFour.slice(-4).reverse().map((project) => (
                    <OneMajorProject key={project._id} project={project} getTopFourProjects={getTopFourProjects} />
                ))}
            </div>
        </div>
    );

}
export default MajorProjects;