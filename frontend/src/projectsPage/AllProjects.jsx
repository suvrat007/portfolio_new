import JSproj from "./js/JSproj.jsx";
import ReactJS from "./reactjs/ReactJS.jsx";
import FSProj from "./fullStack/FSProj.jsx";

const AllProjects = () => {
    return (
        <div className="flex flex-col items-center">

            <div className={'w-full  border-b-2 flex flex-col justify-center items-center py-[2em] mt-10'}>
                <h1 className={'text-6xl'}>My Projects</h1>
            </div>

            <FSProj/>
            <JSproj/>
            <ReactJS/>
        </div>
    );
};

export default AllProjects;


