import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import {useDispatch} from "react-redux";
import {changeLoggedInStatus} from "../../reduxStore/userLoginSlice.jsx";

const Bar = () => {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = () => {
        setIsLogin((prev) => !prev);
        if (!isLogin) {
            navigate("/login");
        }
    };

    const handleLogout = ()=>{
        dispatch(changeLoggedInStatus(false))
        setIsLogin(false);
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div className="fixed top-4 w-[40em] justify-between z-20 transform flex items-center bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg border border-gray-700">

            <span className="text-sm font-bold text-gray-300 px-3">Suvrat</span>


            <div className="flex gap-6">
                <Link to="/" className="text-purple-400 hover:text-white transition">Home</Link>
                <Link to="/projects" className="text-purple-400 hover:text-white transition">Projects</Link>
                {!isLogin ? (
                    <p onClick={handleLogin} className="cursor-pointer text-purple-400 hover:text-white transition">
                        Login
                    </p>
                ) : (
                    <p onClick={handleLogout} className="cursor-pointer text-purple-400 hover:text-white transition">
                        Logout
                    </p>
                )}

            </div>


            <div className="flex gap-4 ml-6 text-gray-400">
                <a href="https://github.com/suvrat007" className="hover:text-white transition">
                    <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/suvrat-mittal-05b642294/"  className="hover:text-white transition">
                    <FaLinkedin />
                </a>
                <a href="mailto:suvratmittal007@gmail.com" className="hover:text-white transition">
                    <FaEnvelope />
                </a>
            </div>
        </div>
    );
};

export default Bar;
