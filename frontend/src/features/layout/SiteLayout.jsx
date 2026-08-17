import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { pageTransition } from "../../constants/motion";
import { useTheme } from "../../app/ThemeProvider";
import { Footer } from "./Footer";
import { Header } from "./Header";

/** Shell shared by every route: header, animated outlet, footer. */
export const SiteLayout = () => {
    const theme = useTheme();
    const { pathname } = useLocation();

    return (
        <div className="u-grain flex min-h-dvh flex-col bg-paper">
            {/* Restores position on back/forward; sends new routes to the top. */}
            <ScrollRestoration />
            <Header theme={theme} />

            <main className="flex-1 pt-16 md:pt-20">
                <AnimatePresence mode="wait">
                    <motion.div key={pathname} {...pageTransition}>
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>

            <Footer />
        </div>
    );
};

export default SiteLayout;
