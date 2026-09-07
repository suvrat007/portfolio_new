import { AnimatePresence } from "framer-motion";
import { RouterProvider } from "react-router-dom";

import { DesignProvider } from "./app/DesignProvider";
import { ThemeProvider } from "./app/ThemeProvider";
import { router } from "./app/router";
import { useBootSequence } from "./hooks/useBootSequence";
import { useContentBootstrap } from "./hooks/useContent";
import { BootScreen } from "./shared/boot/BootScreen";

/**
 * Root shell.
 *
 * The router renders underneath the cold-start screen from the very first
 * frame, so the page behind it is fully laid out and painted by the time the
 * overlay fades. There is no second load when the intro ends.
 */
const App = () => {
    const { hasData, status, source } = useContentBootstrap();
    const boot = useBootSequence({ hasData, status, source });

    return (
        <ThemeProvider>
            <DesignProvider>
                <RouterProvider router={router} />

                <AnimatePresence>
                    {boot.isComplete ? null : (
                        <BootScreen
                            key="boot"
                            progress={boot.progress}
                            statusLabel={boot.statusLabel}
                            elapsedSeconds={boot.elapsedSeconds}
                            isReturningVisitor={boot.isReturningVisitor}
                        />
                    )}
                </AnimatePresence>
            </DesignProvider>
        </ThemeProvider>
    );
};

export default App;
