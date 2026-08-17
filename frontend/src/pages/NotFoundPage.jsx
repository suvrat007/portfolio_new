import { Link } from "react-router-dom";

import { ROUTES } from "../constants/site";
import { usePageMeta } from "../hooks/usePageMeta";
import { Arrow } from "../components/ui/Button";
import { MaskedLines } from "../components/ui/MaskedLines";
import { Reveal } from "../components/ui/Reveal";

const NotFoundPage = () => {
    usePageMeta({ title: "Not found", description: "This page does not exist." });

    return (
        <div className="u-container flex min-h-[70dvh] flex-col justify-center py-24">
            <p className="u-label text-faint">Error 404</p>
            <MaskedLines
                as="h1"
                lines={["Nothing", <span className="u-serif" key="here">here.</span>]}
                className="u-display mt-6"
            />
            <Reveal className="mt-10">
                <Link to={ROUTES.home} className="group flex items-center gap-3 text-sm">
                    <span className="u-link">Back to the index</span>
                    <Arrow direction="right" />
                </Link>
            </Reveal>
        </div>
    );
};

export default NotFoundPage;
