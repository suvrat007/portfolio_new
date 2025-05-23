import { FaPlus } from "react-icons/fa";
import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance.js";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

const Category = ({ category, technologies, getTechnologies }) => {
    const [addTechName, setAddTechName] = useState("");
    const [addTechImageLink, setAddTechImageLink] = useState("");
    const [modalIsShown, setModalIsShown] = useState(false);
    const loggedIn = useSelector(store => store.loggedIn.isLoggedIn);

    const addTechnology = async (e) => {
        e.preventDefault();
        try {
            if (!addTechName.trim() || !addTechImageLink.trim()) return;
            await axiosInstance.post(`/technologies/${category}`, {
                name: addTechName,
                image: addTechImageLink,
            });
            setAddTechName("");
            setAddTechImageLink("");
            setModalIsShown(false);
            await getTechnologies();
        } catch (err) {
            console.error("Add technology error:", err);
        }
    };

    const deleteTechnology = async (techName) => {
        try {
            await axiosInstance.delete(`/technologies/${category}/${techName}`);
            await getTechnologies();
        } catch (error) {
            console.log("Delete tech error:", error);
        }
    };

    const deleteCategory = async () => {
        try {
            await axiosInstance.delete(`/technologies/${category}`);
            await getTechnologies();
        } catch (error) {
            console.log("Delete category error:", error);
        }
    };

    return (
        <div className="border-2 border-purple-500 rounded-xl p-6 w-full max-w-[12em] h-full text-white flex flex-col relative shadow-[0_0_10px_rgba(192,132,252,0.5),0_0_20px_rgba(192,132,252,0.4),0_0_30px_rgba(192,132,252,0.3)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(192,132,252,0.8),0_0_30px_rgba(192,132,252,0.6),0_0_40px_rgba(192,132,252,0.5)]">
            <h1 className="text-lg font-semibold mb-3">{category}</h1>

            {loggedIn && (
                <button
                    onClick={deleteCategory}
                    className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-700 transition"
                >
                    <MdClose className="text-xl text-gray-400 hover:text-white transition" />
                </button>
            )}


            <div className="flex flex-col gap-2 mt-2 w-full">
                {technologies.map((tech, index) => (
                    <div
                        key={tech._id || index}
                        className="flex flex-row items-center justify-between w-full mb-2"
                    >
                        <div className="flex flex-row justify-center items-center gap-3">
                            <img src={`${tech.image}`} className={'w-[1.3em]'}/>
                            <p className="text-sm text-white">{tech.name}</p>
                        </div>

                        {loggedIn && (
                            <button onClick={() => deleteTechnology(tech.name)}>
                                <MdClose className="text-xl text-gray-600 hover:text-white transition" />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {loggedIn && (
                <button
                    onClick={() => setModalIsShown(true)}
                    className="py-1 w-full px-2 rounded-lg mt-1 flex items-center justify-center gap-2 border border-dashed text-gray-300 border-gray-500 hover:bg-gray-800 transition"
                >
                    <FaPlus size={10} /> Add
                </button>
            )}

            {modalIsShown && (
                <div className="absolute bg-black top-0 left-0 w-full text-white shadow-md rounded-xl p-4 h-full border-purple-200 shadow-[0_0_10px_rgba(192,132,252,0.5),0_0_20px_rgba(192,132,252,0.4),0_0_30px_rgba(192,132,252,0.3)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(192,132,252,0.8),0_0_30px_rgba(192,132,252,0.6),0_0_40px_rgba(192,132,252,0.5)]">
                    <div className="flex justify-between items-center mb-2">
                        <h1 className="text-lg font-medium">{category}</h1>
                        <button onClick={() => setModalIsShown(false)}>
                            <MdClose className="text-xl text-gray-600 hover:text-white transition" />
                        </button>
                    </div>

                    <div className="flex flex-col gap-2">
                        <input
                            type="text"
                            className="w-full pl-2 pr-2 pt-1 pb-1 border border-gray-600 bg-transparent rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Add Tech"
                            value={addTechName}
                            onChange={(e) => setAddTechName(e.target.value)}
                        />
                        <input
                            type="text"
                            className="w-full pl-2 pr-2 pt-1 pb-1 border border-gray-600 bg-transparent rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Add Logo Link"
                            value={addTechImageLink}
                            onChange={(e) => setAddTechImageLink(e.target.value)}
                        />
                        <button
                            type="submit"
                            onClick={addTechnology}
                            className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 transition"
                        >
                            Add
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Category;
