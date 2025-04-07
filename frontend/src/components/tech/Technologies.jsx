import { FaPlus } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance.js";
import Category from "./Category.jsx";
import ShimmerUI from "../../utils/ShimmerUI.jsx";

const Technologies = () => {
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const loggedIn = useSelector((store) => store.loggedIn.isLoggedIn);

    const getTechnologies = async () => {
        try {
            const response = await axiosInstance.get("/technologies");
            console.log(response?.data);
            // setData(response?.data);

            if (response?.data) {
                const filteredData = response.data.filter(item => Array.isArray(item.techs));
                setData(filteredData);
            }
        } catch (error) {
            console.log("Fetch error:", error);
        }
    };

    const addCategory = async () => {
        try {
            if (!newCategory.trim()) return;
            await axiosInstance.post("/technologies/add-category", {
                category: newCategory,
            });
            setOpenModal(false);
            setNewCategory("");
            await getTechnologies();
        } catch (error) {
            console.log("Add category error:", error);
        }
    };

    useEffect(() => {
        getTechnologies();
    }, []);

    console.log(data)
    return (
        <div className="flex flex-col items-center w-full px-4 py-10  ">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">
                Technologies I'm Using
            </h1>

            {data.length === 0 && <ShimmerUI />}

            <div className="flex flex-wrap gap-10 justify-center w-full">
                {data.map((tech, index) => (
                    <Category
                        key={tech._id || index}
                        category={tech.category}
                        technologies={tech.techs}
                        getTechnologies={getTechnologies}
                    />
                ))}

                {openModal && (
                    <div className="border-2 border-purple-500 rounded-xl p-6 w-full max-w-[12em] h-full text-white flex flex-col relative shadow-[0_0_10px_rgba(192,132,252,0.5),0_0_20px_rgba(192,132,252,0.4),0_0_30px_rgba(192,132,252,0.3)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(192,132,252,0.8),0_0_30px_rgba(192,132,252,0.6),0_0_40px_rgba(192,132,252,0.5)]">
                        <button
                            onClick={() => setOpenModal(false)}
                            className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-700 transition"
                        >
                            <MdClose className="text-xl text-gray-400 hover:text-white" />
                        </button>

                        <label className="text-sm mb-2 text-gray-300">New Category</label>
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="Enter category"
                            className="px-3 py-1.5 rounded-md bg-transparent border border-gray-600 outline-none focus:ring-2 focus:ring-blue-400 mb-3"
                        />
                        <button
                            onClick={addCategory}
                            className="py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                        >
                            Add Category
                        </button>
                    </div>
                )}

                {loggedIn && (
                    <button
                        onClick={() => setOpenModal(true)}
                        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-2xl p-5 text-white hover:bg-gray-950 transition w-full max-w-[14em] h-[10em]"
                    >
                        <FaPlus size={22} />
                        <span className="mt-2">Add Category</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Technologies;
