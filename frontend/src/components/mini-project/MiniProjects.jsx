import React, {useEffect, useState} from "react";
import OneProject from "./OneProject";
import axiosInstance from "../../utils/axiosInstance.js";
import OneMajorProject from "../project/OneMajorProject.jsx";
import {FaPlus} from "react-icons/fa";
import AddJsProject from "./AddJsProject.jsx";
import {MdClose} from "react-icons/md";
import {useSelector} from "react-redux";

const MiniProjects = () => {
    const [jsprojects, setJsprojects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const loggedIn = useSelector(store => store.loggedIn.isLoggedIn);
    const getJSProjects =async () => {
        try{
            const response = await axiosInstance.get("/getJSProjects");
            // console.log(response?.data);

            if(response?.data ){
                setJsprojects(response?.data);
            }else{
                console.log("nothing added to js projects.");
            }
        }catch(error){
            console.log("An unexpected error occured.");
        }
    }

    useEffect(() => {
        getJSProjects();
        return ()=>{};
    },[])


    console.log(jsprojects );
    return (
        <div className="w-full">
            <div className="flex flex-row items-center mt-8 justify-between">
                <h1 className="text-3xl p-4">Mini-Projects</h1>
                {loggedIn && <button
                    onClick={() => setShowModal(prev=> !prev)}
                    className="text-lg py-2 px-6 bg-white text-black rounded-3xl flex items-center gap-2 cursor-pointer">
                    {!showModal ? (
                            <div className={"flex flex-row items-center justify-center gap-2"}>
                                <FaPlus size={18}/>Add
                            </div>
                        ):
                        <div className={"flex flex-row items-center justify-center gap-2"}>
                            <MdClose className="text-xl text-slate-400"/>Cancel
                        </div>}
                </button>}
            </div>



            <div className="overflow-x-auto border-2 p-5 ">
                <div className="flex flex-row gap-6 min-w-max">
                    {showModal && (
                        <>
                            <AddJsProject getJSProjects={getJSProjects} setShowModal={setShowModal}/>
                        </>
                    )}

                    <>
                        {jsprojects.map((project, index) => (
                            <OneProject project={project} getJSProjects={getJSProjects}/>
                        ))}
                    </>

                </div>
            </div>
        </div>

    );
};

export default MiniProjects;
