import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Password from "./Password.jsx";
import { validateEmail } from "../utils/Helper.jsx";
import axiosInstance from "../utils/axiosInstance.js";
import { useDispatch } from "react-redux";
import { changeLoggedInStatus } from "../reduxStore/userLoginSlice.jsx";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email) {
            setError("Enter Email");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email");
            return;
        }

        if (!password) {
            setError("Enter Password");
            return;
        }

        setError("");

        try {
            const response = await axiosInstance.post("/login", {
                email,
                password,
            });

            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                dispatch(changeLoggedInStatus(true));
                navigate("/");
            }
        } catch (error) {
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh] max-h-screen overflow-hidden px-4 bg-black">
            <div
                className="w-full max-w-md border-2 border-purple-500 bg-gray-950 rounded-xl p-8 shadow-[0_0_20px_rgba(192,132,252,0.4)]
                 hover:shadow-[0_0_30px_rgba(192,132,252,0.6)] transition-all duration-300 ">
                <form onSubmit={handleLogin} className="flex flex-col">
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">Log In</h2>

                    <label className="text-sm text-gray-400 mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        placeholder="Enter your email"
                        className="w-full bg-black border border-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label className="text-sm text-gray-400 mb-1">Password</label>
                    <Password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

                    <button
                        type="submit"
                        className="w-full mt-6 bg-purple-600 hover:bg-purple-500 text-white font-medium py-2 rounded-md transition duration-300 shadow-md"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
