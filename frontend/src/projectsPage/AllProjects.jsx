import JSproj from "./js/JSproj.jsx";
import ReactJS from "./reactjs/ReactJS.jsx";
import FSProj from "./fullStack/FSProj.jsx";

const AllProjects = () => {
    return (
        <div className="flex flex-col items-center">
            <FSProj/>
            <JSproj/>
            <ReactJS/>
        </div>
    );
};

export default AllProjects;


