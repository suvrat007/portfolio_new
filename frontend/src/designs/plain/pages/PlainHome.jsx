import { usePageMeta } from "../../../hooks/usePageMeta";
import { Activity } from "../sections/Activity";
import { Contact } from "../sections/Contact";
import { Curriculum } from "../sections/Curriculum";
import { Intro } from "../sections/Intro";
import { Pipeline } from "../sections/Pipeline";
import { Projects } from "../sections/Projects";
import { Skills } from "../sections/Skills";
import { Education, Experience } from "../sections/Timeline";

const PlainHome = () => {
    usePageMeta({});

    return (
        <div className="pl-container">
            <Intro />
            <Experience />
            <Education />
            <Skills />
            <Projects />
            <Pipeline />
            <Curriculum />
            <Activity />
            <Contact />
        </div>
    );
};

export default PlainHome;
