import { FaPlus } from "react-icons/fa";
import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance.js";
import { MdClose } from "react-icons/md";
import {useSelector} from "react-redux";


const Category = ({ category, technologies,getTechnologies }) => {
    const [addTech, setAddTech] = useState("");
    const [modalIsShown, setModalIsShown] = useState(false);

    const loggedIn = useSelector(store => store.loggedIn.isLoggedIn);

    const addTechnology = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(`/technologies/${category}`, {
                technology: addTech,
            });
            console.log("Technology added:", response.data);
            setAddTech("");
            setModalIsShown(false);
            await getTechnologies();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteTechnology = async (technology) => {
        try{
            const response = await axiosInstance.delete(`/technologies/${category}/${technology}`);
            console.log("Technology deleted:", response.data);
            await getTechnologies();
        }catch(error){
            console.log(error);
        }
    }

    const deleteCategory = async () => {
        try{
            const response = await axiosInstance.delete(`/technologies/${category}`);
            console.log("Technology deleted:", response.data);
            await getTechnologies();
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className="border p-5 rounded-xl w-[10em] relative">
            <h1 className="text-lg mb-4 font-semibold">{category}</h1>
            {loggedIn && (
                <button
                    onClick={() => deleteCategory(category)}
                    className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-700 transition"
                >
                    <MdClose className="text-xl text-gray-400 hover:text-white transition"/>
                </button>
            )}

            {technologies.map((technology, index) => (
                <div className="flex flex-row items-center justify-between ">
                    <p key={index} className="text-sm text-white mb-2">{technology}</p>
                    {loggedIn && (
                        <button onClick={() => deleteTechnology(technology)}>
                            <MdClose className="text-xl text-gray-600 hover:text-black transition"/>
                        </button>
                    )}

                </div>
            ))}

            {/* Add button */}
            {loggedIn && (
                <button
                    onClick={() => setModalIsShown(true)}
                    className="py-1 w-full px-2 rounded-lg mt-1 flex items-center justify-center gap-2 border-dashed border cursor-pointer hover:bg-gray-200 transition">
                    <FaPlus size={10}/> Add
                </button>
            )}


            {/* Modal inside parent */}
            {modalIsShown && (
                <div className="absolute top-0 left-0 w-full h-full bg-black text-white shadow-md rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                    <h1 className="text-lg font-medium">{category}</h1>
                        {/* Close button */}
                        <button onClick={() => setModalIsShown(false)}>
                            <MdClose className="text-xl text-gray-600 hover:text-black transition"/>
                        </button>
                    </div>

                    {/* Add Technology Form */}
                    <div className="flex flex-col gap-2">
                        <input
                            type="text"
                            className="w-full pl-2 pr-2 pt-1 pb-1border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Add Tech"
                            value={addTech}
                            onChange={(e) => setAddTech(e.target.value)}
                        />
                        <button
                            type="submit"
                            onClick={addTechnology}
                            className="bg-blue-500 text-white py-1 rounded-md hover:bg-blue-600 transition cursor-pointer">
                            Add
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Category;
