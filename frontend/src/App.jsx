import './App.css'
import Bar from "./components/navbar/Bar.jsx";
import MainBody from "./components/body/MainBody.jsx";
import MiniProjects from "./components/mini-project/MiniProjects.jsx";
import MajorProjects from "./components/project/MajorProjects.jsx";
import Technologies from "./components/tech/Technologies.jsx";
import FollowLinks from "./components/footer/FollowLinks.jsx";

function App() {
  return (
      <div className="min-h-screen bg-[#000000] text-slate-200 overflow-x-hidden ">
          {/*<Bar/>*/}
          <div className="w-[75%] m-auto flex flex-col items-center">
              <Bar/>
              <MainBody/>
              <MiniProjects/>
              <MajorProjects/>
              <Technologies/>
              <FollowLinks/>
          </div>
      </div>
  );
}

export default App
