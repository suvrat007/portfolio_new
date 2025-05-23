import Bar from "../components/navbar/Bar.jsx";
import MainBody from "../components/body/MainBody.jsx";
import MiniProjects from "../components/mini-project/MiniProjects.jsx";
import MajorProjects from "../components/project/MajorProjects.jsx";
import Technologies from "../components/tech/Technologies.jsx";
import FollowLinks from "../components/footer/FollowLinks.jsx";

const Home = () => {
    return (
        <div className=" flex flex-col items-center">
            <MainBody/>
            <MiniProjects/>
            <MajorProjects/>
            <Technologies/>
        </div>
    )
}
export default Home;