import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Password from "./Password.jsx";
import {validateEmail} from "../utils/Helper.jsx";
import axiosInstance from "../utils/axiosInstance.js";
import {useDispatch} from "react-redux";
import {changeLoggedInStatus} from "../reduxStore/userLoginSlice.jsx";


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!password){
            setError("Enter Password");
        }
        if(!email){
            setError("Enter Email");
        }
        if (!validateEmail(email)){
            setError("Please enter a valid email");
            return;
        }
        setError("")

        // login api call
        try{
            const response = await axiosInstance.post("/login", {
                email: email,
                password: password,
            })
            console.log(response.data);
            // handle successful login response
            if(response.data && response.data.accessToken){
                localStorage.setItem("token", response.data.accessToken);
                // call to redux to make user logged in false
                dispatch(changeLoggedInStatus(true))
                navigate('/');
            }
        }catch(error){
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            }else{
                setError("An Unexpected error occured. Please try again.");
            }
        }

    }
    return (
        <div className="flex items-center justify-center min-h-[35em] ">
            <div className="w-96 border border-gray-800 rounded-lg bg-gray-900 shadow-lg px-7 py-10">
                <form onSubmit={handleLogin}>
                    <h4 className="text-2xl font-semibold text-white mb-5">Log In</h4>

                    <label className="block text-gray-400 mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        placeholder="Enter your email"
                        className="w-full bg-gray-900 text-white border border-gray-700 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label className="block text-gray-400 mb-1">Password</label>
                    <Password value={password} onChange={(e) => setPassword(e.target.value)} />

                    {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-md mt-6 transition"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}
export default Login