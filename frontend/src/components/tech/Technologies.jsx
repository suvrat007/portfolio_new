import Category from "./Category.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import React, {useEffect, useState} from "react";
import {FaPlus} from "react-icons/fa";
import {MdClose} from "react-icons/md";


const Technologies = ()=>{
    const [data,setData]=useState([]);
    // const [openAddEditModal, setOpenAddEditModal] = useState({
    //     isShown: false,
    //     type:"add",
    //     data: null
    // });
    const [openModal, setOpenModal] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const getTechnologies = async ()=>{
        try{
            const response = await axiosInstance.get("/technologies");
            // console.log(response);

            if (response?.data){
                setData(response?.data);
            }
        }catch (error){
            console.log(error);
        }
    }

    const addCategory = async (category)=>{
        try{
            const response = await axiosInstance.post("/technologies/add-category",{
                "category": newCategory
            });
            console.log(response.data);
            setOpenModal(false);
            await getTechnologies();
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getTechnologies();
        return ()=>{}
    },[])

    // console.log(data)
    return (
        <div className="flex flex-col m-10 justify-between border-2 w-full p-10">
            <div className="text-4xl">
                <h1>Technologies I'm using</h1>
            </div>

            <div className="flex flex-row items-center gap-10 mt-10 overflow-x-scroll">
                {data.map((tech, index) => (
                    <Category key={index} category={tech?.category} technologies={tech?.technologies} getTechnologies={getTechnologies} />
                ))}

                {openModal && (
                    <div className="border-2 border-dashed border-white rounded-2xl flex flex-col text-white p-4 w-[12em] relative">

                        <button
                            onClick={() => setOpenModal(false)}
                            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-700 transition"
                        >
                            <MdClose className="text-xl text-gray-400 hover:text-white transition" />
                        </button>

                        {/* Input Field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-lg font-semibold text-gray-300">Category</label>
                            <input
                                type="text"
                                className=" w-full px-3 py-1  border-b border-gray-600  outline-none focus:border-blue-400 transition"
                                placeholder="New Category"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                            />
                        </div>

                        {/* Add Button */}
                        <button
                            onClick={addCategory}
                            className="mt-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                        >
                            Add Category
                        </button>
                    </div>
                )}

                <button
                    onClick={()=>setOpenModal(true)}
                    className="py-1 w-[10em] h-[5em] px-2 rounded-lg mt-1 flex items-center justify-center gap-2 border-dashed border-1 cursor-pointer">
                    <FaPlus size={10}/> Add
                </button>


            </div>


        </div>
    )
}
export default Technologies