import { usePageMeta } from "../../../hooks/usePageMeta";
import { Activity } from "../sections/Activity";
import { Contact } from "../sections/Contact";
import { Experience, Curriculum } from "../sections/Experience";
import { Intro } from "../sections/Intro";
import { Pipeline } from "../sections/Pipeline";
import { Projects } from "../sections/Projects";
import { Skills } from "../sections/Skills";

const PlainHome = () => {
    usePageMeta({});

    return (
        <div className="pl-container">
            <Intro />
            <Experience />
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
