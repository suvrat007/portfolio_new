import {useState} from "react";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6";

const Password = ({value , onChange , placeholder})=>{
    const[isShowPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!isShowPassword);
    }

    return (
        <div className="relative w-full">
            <input
                value={value}
                onChange={onChange}
                type={isShowPassword ? "text" : "password"}
                placeholder={placeholder || "Password"}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!isShowPassword)}
            >
                {isShowPassword ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
            </button>
        </div>
    );

}
export default Password