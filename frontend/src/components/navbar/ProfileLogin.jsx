import { getInitials } from "../../utils/Helper.jsx";
import { useNavigate } from "react-router-dom";

const ProfileLogin = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="flex items-center gap-3 p-2 bg-slate-100 rounded-lg shadow-sm">

            <div className="flex flex-col">
                {/* <p className="text-sm font-medium">{userInfo?.fullName}</p> */}
                <button
                    onClick={handleLogout}
                    className="text-sm text-purple-600 hover:underline transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfileLogin;
