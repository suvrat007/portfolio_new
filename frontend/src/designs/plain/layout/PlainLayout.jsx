import { Outlet, ScrollRestoration } from "react-router-dom";

import { PlainFooter } from "./PlainFooter";
import { PlainHeader } from "./PlainHeader";

/** Shell for the plain design: one centred column, header, outlet, footer. */
export const PlainLayout = () => (
    <div className="min-h-dvh bg-paper">
        <ScrollRestoration />
        <div className="pl-shell flex min-h-dvh flex-col">
            <PlainHeader />
            <main className="flex-1">
                <Outlet />
            </main>
            <PlainFooter />
        </div>
    </div>
);

export default PlainLayout;
