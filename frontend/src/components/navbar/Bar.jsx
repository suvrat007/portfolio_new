import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { MdMenu, MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { changeLoggedInStatus } from "../../reduxStore/userLoginSlice.jsx";

const Bar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const loggedIn = useSelector((store) => store.loggedIn.isLoggedIn);

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = () => {
        dispatch(changeLoggedInStatus(false));
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <div className="md:hidden fixed top-4 left-4 z-30">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-white bg-gray-800 p-2 rounded-full shadow-lg"
                >
                    {isMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
                </button>
            </div>



            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-20 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center gap-6 text-xl text-gray-200">
                    <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-purple-400 transition">Home</Link>
                    <Link to="/projects" onClick={() => setIsMenuOpen(false)} className="hover:text-purple-400 transition">Projects</Link>
                    {/* Mobile Login/Logout Button */}
                    {location.pathname !== "/login" && (
                        <div className="md:hidden">
                            {loggedIn ? (
                                <button
                                    onClick={handleLogout}
                                    className="text-purple-600 px-4 py-2 rounded-full text-lg shadow-md"
                                >
                                    Logout
                                </button>
                            ) : (
                                <button
                                    onClick={handleLogin}
                                    className="text-purple-600 px-4 py-2 rounded-full text-lg shadow-md"
                                >
                                    Login
                                </button>
                            )}
                        </div>
                    )}
                    <div className="flex gap-4 text-2xl pt-4">
                        <a href="https://github.com/suvrat007" className="hover:text-white transition" target="_blank">
                            <FaGithub />
                        </a>
                        <a href="https://www.linkedin.com/in/suvrat-mittal-05b642294/" className="hover:text-white transition" target="_blank">
                            <FaLinkedin />
                        </a>
                        <a href="mailto:suvratmittal007@gmail.com" className="hover:text-white transition">
                            <FaEnvelope />
                        </a>
                    </div>
                </div>
            )}

            {/* Desktop Navbar */}
            <div className="hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 w-[50%] max-w-5xl z-20 px-6 py-3
                bg-gray-900/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-700
                flex-row items-center justify-between gap-4">

                <span className="text-base font-bold text-gray-300 cursor-pointer"
                      onClick={handleLogin} >Suvrat</span>

                <div className="flex gap-5  items-center text-sm">
                    <Link to="/" className="text-purple-400 hover:text-white transition cursor-pointer">Home</Link>
                    <Link to="/projects" className="text-purple-400 hover:text-white transition cursor-pointer">Projects</Link>
                    {location.pathname !== "/login" && (
                        loggedIn && (
                            <button
                                onClick={handleLogout}
                                className="text-purple-400 hover:text-white transition cursor-pointer"
                            >
                                Logout
                            </button>
                        )
                    )}
                </div>

                <div className="flex gap-4 justify-center items-center text-gray-400">
                    <a href="https://github.com/suvrat007" className="hover:text-white transition" target="_blank">
                        <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/suvrat-mittal-05b642294/" className="hover:text-white transition" target="_blank">
                        <FaLinkedin />
                    </a>
                    <a href="mailto:suvratmittal007@gmail.com" className="hover:text-white transition">
                        <FaEnvelope />
                    </a>
                </div>
            </div>
        </>
    );
};

export default Bar;
