import { Outlet } from "react-router-dom";
import Bar from "../components/navbar/Bar.jsx";
import FollowLinks from "../components/footer/FollowLinks.jsx";

const Layout = () => {
    return (
        <div className="w-[80%] m-auto">
            <div className="flex flex-col justify-center items-center full z-2">
                <Bar />
            </div>

            {/* This will render the current page */}
            <div className="relative mt-10">
                <Outlet />
            </div>

            <FollowLinks />
        </div>
    );
};

export default Layout;
