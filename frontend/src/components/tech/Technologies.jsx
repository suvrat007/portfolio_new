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
            if (response?.data) {
                setData(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addCategory = async () => {
        try {
            await axiosInstance.post("/technologies/add-category", {
                category: newCategory,
            });
            setOpenModal(false);
            setNewCategory("");
            await getTechnologies();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTechnologies();
    }, []);

    return (
        <div className="flex flex-col items-center w-full px-4 py-10 ">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">
                Technologies I'm Using
            </h1>

            {data.length === 0 && (
                <ShimmerUI/>
            )}

            <div className="flex flex-wrap gap-10 justify-center w-full ">
                {data.map((tech, index) => (
                    <Category
                        key={index}
                        category={tech?.category}
                        technologies={tech?.technologies}
                        getTechnologies={getTechnologies}
                    />
                ))}

                {openModal && (
                    <div className="border border-gray-700 bg-gray-900 rounded-2xl p-5 w-full max-w-[14em] text-white shadow-lg relative flex flex-col">
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
