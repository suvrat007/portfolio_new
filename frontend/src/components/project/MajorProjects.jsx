import OneMajorProject from "./OneMajorProject.jsx";
import {FaPlus} from "react-icons/fa";
import React, {useEffect, useState} from "react";
import axiosInstance from "../../utils/axiosInstance.js";
import {MdClose} from "react-icons/md";
import AddProject from "./AddProject.jsx";

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




    useEffect(() => {
        getTopFourProjects();
        return ()=>{};
    },[]);


    return (
        <div className="border-2 w-full mt-8 ">
            <div className="flex flex-row items-center mt-8 justify-between">
                <h1 className="text-3xl p-4">Recent-Works</h1>
                <button onClick={() => setModalIsOpen(prev=> !prev)}
                        className="text-lg py-2 px-6 bg-white text-black rounded-3xl flex items-center gap-2 cursor-pointer mr-4">
                    {!modalIsOpen ? (
                        <div className={"flex flex-row items-center justify-center gap-2"}>
                            <FaPlus size={18}/>Add
                        </div>
                        ):
                        <div className={"flex flex-row items-center justify-center gap-2"}>
                            <MdClose className="text-xl text-slate-400"/>Cancel
                        </div>}



                </button>
            </div>

            {modalIsOpen && (<AddProject  setModalIsOpen={setModalIsOpen} getTopFourProjects={getTopFourProjects}/> )}


            <div className="border-2 w-full p-10 flex flex-row flex-wrap gap-20 items-center justify-center">
                {topFour.map((project, index) => (
                    <OneMajorProject project={project} getTopFourProjects={getTopFourProjects}/>
                ))}
            </div>


        </div>

    )
}
export default MajorProjects;