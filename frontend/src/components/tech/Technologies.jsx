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
        <div className="flex flex-col items-center justify-center w-full px-4 py-10 ">
            <h1 className="text-4xl text-white text-center ">Technologies I'm using</h1>

            <div className="flex flex-row flex-wrap gap-10 mt-10 w-full justify-center">
                {data.map((tech, index) => (
                    <Category
                        key={index}
                        category={tech?.category}
                        technologies={tech?.technologies}
                        getTechnologies={getTechnologies}
                    />
                ))}

                {openModal && (
                    <div className="border-1 rounded-xl p-6 w-full h-full max-w-[12em] text-white shadow-md flex flex-col items-start relative">
                        <button
                            onClick={() => setOpenModal(false)}
                            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-700 transition"
                        >
                            <MdClose className="text-xl text-gray-400 hover:text-white transition"/>
                        </button>

                        <div className="flex flex-col gap-2 mt-2">
                            <label className="text-lg font-semibold text-gray-300">Category</label>
                            <input
                                type="text"
                                className="w-full px-3 py-1 border-b border-gray-600 outline-none focus:border-blue-400 transition bg-transparent text-white"
                                placeholder="New Category"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={addCategory}
                            className="mt-3 py-1 px-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                        >
                            Add Category
                        </button>
                    </div>
                )}

                {loggedIn && (
                    <button
                        onClick={() => setOpenModal(true)}
                        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl p-6 text-white cursor-pointer hover:bg-gray-950 transition w-full max-w-[12em] h-[10em]"
                    >
                        <FaPlus size={20}/>
                        <span>Add Category</span>
                    </button>
                )}
            </div>
        </div>

    )
};

export default Technologies;
