import {Link, useNavigate} from "react-router-dom";
import ProfileLogin from "./ProfileLogin.jsx";
import {useState} from "react";

const Bar = () => {
    const [islogin, setIslogin] = useState(false);
    const navigate = useNavigate();
    const handleLogin = () => {
        setIslogin(prev => !prev);
        if (!islogin) {
            navigate("/login");
        }
    }

    return(
        <div
            className="w-[40%] top-2 fixed mt-3 border-2 flex flex-row rounded-4xl justify-between py-4 px-8 bg-gray-950  text-center items-center ">
            <Link
                to="/"
                className="block text-purple-500 hover:underline hover:text-white "
            >
                Home
            </Link>

            <Link to="/projects" className="block text-purple-500 hover:underline hover:text-white p-1  " >
                My Projects
            </Link>


            {/*<p onClick={redirect} className="cursor-pointer">My Projects</p>*/}
            <p>Home</p>
            <p>Home</p>
            <p onClick={handleLogin} className={'cursor-pointer bg-white text-white py-1 rounded-md hover:bg-blue-600'}>
                {!islogin ? "Login" : "Logout"}</p>

        </div>
    )
}
export default Bar