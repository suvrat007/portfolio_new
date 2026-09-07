import { usePageMeta } from "../../../hooks/usePageMeta";
import { Activity } from "../sections/Activity";
import { Contact } from "../sections/Contact";
import { Hero } from "../sections/Hero";
import { Practice } from "../sections/Practice";
import { Profile } from "../sections/Profile";
import { Roadmap } from "../sections/Roadmap";
import { Toolkit } from "../sections/Toolkit";
import { FeaturedWork } from "../sections/FeaturedWork";

const HomePage = () => {
    usePageMeta({});

    return (
        <>
            <Hero />
            <Profile />
            <Practice />
            <FeaturedWork />
            <Roadmap />
            <Toolkit />
            <Activity />
            <Contact />
        </>
    );
};

export default HomePage;
