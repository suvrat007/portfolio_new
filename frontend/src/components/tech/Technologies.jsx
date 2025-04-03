import { FaPlus } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance.js";
import Category from "./Category.jsx";


const Technologies = () => {
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [newCategory, setNewCategory] = useState("");

    const getTechnologies = async () => {
        try {
            const response = await axiosInstance.get("/technologies");
            if (response?.data) {
                setData(response?.data);
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
            await getTechnologies();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTechnologies();
    }, []);

    const loggedIn = useSelector((store) => store.loggedIn.isLoggedIn);

    return (
        <div className="technologies-container">
            <h1 className="technologies-title">Technologies I'm using</h1>

            <div className="technologies-grid">
                {data.map((tech, index) => (
                    <Category key={index} category={tech?.category} technologies={tech?.technologies} getTechnologies={getTechnologies} />
                ))}

                {openModal && (
                    <div className="technology-card relative">
                        <button onClick={() => setOpenModal(false)} className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-700 transition">
                            <MdClose className="text-xl text-gray-400 hover:text-white transition" />
                        </button>

                        <div className="flex flex-col gap-2">
                            <label className="text-lg font-semibold text-gray-300">Category</label>
                            <input
                                type="text"
                                className="w-full px-3 py-1 border-b border-gray-600 outline-none focus:border-blue-400 transition bg-transparent text-white"
                                placeholder="New Category"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                            />
                        </div>

                        <button onClick={addCategory} className="mt-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                            Add Category
                        </button>
                    </div>
                )}

                {loggedIn && (
                    <button onClick={() => setOpenModal(true)} className="add-category">
                        <FaPlus size={20} />
                        <span>Add Category</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Technologies;
