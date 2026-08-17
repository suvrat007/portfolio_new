import { usePageMeta } from "../hooks/usePageMeta";
import { Activity } from "../features/activity/Activity";
import { Contact } from "../features/contact/Contact";
import { Hero } from "../features/hero/Hero";
import { Practice } from "../features/practice/Practice";
import { Profile } from "../features/profile/Profile";
import { Roadmap } from "../features/roadmap/Roadmap";
import { Toolkit } from "../features/toolkit/Toolkit";
import { FeaturedWork } from "../features/work/FeaturedWork";

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
