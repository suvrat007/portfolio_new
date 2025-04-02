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
        <>
            <div className="flex items-center justify-center mt-28 ">
                <div className='w-95 border rounded  px-7 py-10'>
                    <form onSubmit={handleLogin}>
                        <h4 className={'text-2xl mb-7'}>LogIn</h4>
                        <p>Enter Email-Id</p>
                        <input type="text"
                               value={email}
                               placeholder="Enter your email"
                               className="input-box"
                               onChange={(e) => setEmail(e.target.value)}/>

                        <p>Enter Password</p>
                        <Password value={password}
                                  onChange={(e) => setPassword(e.target.value)}/>

                        {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
                        <button type="submit" className="btn-primary rounded-sm">Login</button>

                    </form>
                </div>
            </div>

        </>
    )
}
export default Login