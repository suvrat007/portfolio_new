import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { HERO } from "../constants/content";
import { ROUTES, SITE } from "../constants/site";
import { ThemeProvider } from "../app/ThemeProvider";
import { SiteLayout } from "../features/layout/SiteLayout";
import HomePage from "../pages/HomePage";
import WorkPage from "../pages/WorkPage";
import AdminPage from "../pages/AdminPage";
import { store } from "../store";

// The API is not reachable from a test run; the point of these tests is that
// the site renders fully from the bundled snapshot without it.
vi.mock("../lib/apiClient", async () => {
    const actual = await vi.importActual("../lib/apiClient");
    return {
        ...actual,
        warmUpApi: vi.fn(() => Promise.resolve({ ok: false, ms: 0 })),
        fetchContent: vi.fn(() => Promise.reject(new Error("offline"))),
    };
});

const renderRoute = (path) => {
    const router = createMemoryRouter(
        [
            {
                path: ROUTES.home,
                element: <SiteLayout />,
                children: [
                    { index: true, element: <HomePage /> },
                    { path: ROUTES.work, element: <WorkPage /> },
                    { path: ROUTES.admin, element: <AdminPage /> },
                ],
            },
        ],
        { initialEntries: [path] },
    );

    return render(
        <Provider store={store}>
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        </Provider>,
    );
};

beforeEach(() => {
    localStorage.clear();
});

describe("home page", () => {
    it("renders the financial-systems positioning in the hero", () => {
        renderRoute(ROUTES.home);

        const heading = screen.getByRole("heading", { level: 1 });
        expect(heading).toHaveTextContent(HERO.headline.join(""));
    });

    it("renders project work from the bundled snapshot with no API", async () => {
        renderRoute(ROUTES.home);

        await waitFor(() => {
            expect(screen.getAllByText("Axon").length).toBeGreaterThan(0);
        });
        expect(screen.getAllByText("Ru-Ok").length).toBeGreaterThan(0);
    });

    it("renders the toolkit, including the markets competencies", () => {
        renderRoute(ROUTES.home);

        expect(screen.getAllByText(/Markets & Valuation/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText("Black-Scholes").length).toBeGreaterThan(0);
    });

    it("shows the in-development finance roadmap", () => {
        renderRoute(ROUTES.home);

        expect(screen.getByText("Equity Research Terminal")).toBeInTheDocument();
        expect(screen.getByText("Options Pricing Engine")).toBeInTheDocument();
    });

    it("renders every numbered section anchor", () => {
        const { container } = renderRoute(ROUTES.home);
        const ids = [...container.querySelectorAll("section[id]")].map((el) => el.id);

        expect(ids).toEqual(
            expect.arrayContaining([
                "profile",
                "practice",
                "work",
                "building",
                "toolkit",
                "contact",
            ]),
        );
    });
});

describe("work page", () => {
    it("lists shipped and committed work together", () => {
        renderRoute(ROUTES.work);

        expect(screen.getAllByText("Axon").length).toBeGreaterThan(0);
        expect(screen.getByText("DCF Valuation Suite")).toBeInTheDocument();
    });

    it("offers a filter for every populated domain", () => {
        renderRoute(ROUTES.work);

        expect(screen.getByRole("button", { name: /Everything/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Finance/i })).toBeInTheDocument();
    });
});

describe("admin route", () => {
    it("shows the sign-in panel when there is no session", () => {
        renderRoute(ROUTES.admin);

        expect(screen.getByRole("heading", { name: /admin access/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });
});

describe("layout", () => {
    it("always exposes the identity and a contact route", () => {
        renderRoute(ROUTES.home);

        expect(screen.getAllByText(SITE.name).length).toBeGreaterThan(0);
        expect(
            screen.getAllByRole("link", { name: new RegExp(SITE.email, "i") }).length,
        ).toBeGreaterThan(0);
    });
});
