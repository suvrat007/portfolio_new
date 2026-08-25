import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
            expect(screen.getAllByText("Quantfolio").length).toBeGreaterThan(0);
        });
        expect(screen.getAllByText("FinSight OS").length).toBeGreaterThan(0);
    });

    it("renders the toolkit, including the markets competencies", () => {
        renderRoute(ROUTES.home);

        expect(screen.getAllByText(/Quant & Finance/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText("Mean-Variance Optimisation").length).toBeGreaterThan(0);
    });

    it("shows the in-development finance roadmap", () => {
        renderRoute(ROUTES.home);

        expect(screen.getByText("Options Pricing Engine")).toBeInTheDocument();
        expect(screen.getByText("Equity Research Terminal")).toBeInTheDocument();
    });

    it("lists the finance curriculum with its completion state", () => {
        renderRoute(ROUTES.home);

        // Also named as practice-track items, so these appear more than once.
        expect(screen.getAllByText("Financial Statement Analysis").length).toBeGreaterThan(0);
        expect(screen.getAllByText("Intrinsic Valuation").length).toBeGreaterThan(0);
        // "Applied" means a shipped project backs the line.
        expect(screen.getAllByText("Applied").length).toBeGreaterThan(0);
    });

    it("gives each project a working source and website link", () => {
        renderRoute(ROUTES.home);

        const [source] = screen.getAllByRole("link", { name: /source/i });
        // A repository, not the profile root, and safe to open in a new tab.
        expect(source).toHaveAttribute("href", expect.stringMatching(/github\.com\/[^/]+\/.+/));
        expect(source).toHaveAttribute("target", "_blank");
        expect(source).toHaveAttribute("rel", expect.stringContaining("noopener"));

        const websites = screen.getAllByRole("link", { name: /website/i });
        expect(websites.length).toBeGreaterThan(0);
        websites.forEach((link) => {
            expect(link).toHaveAttribute("href", expect.stringMatching(/^https:\/\//));
            expect(link).toHaveAttribute("target", "_blank");
        });
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

        expect(screen.getAllByText("Tutora").length).toBeGreaterThan(0);
        expect(screen.getByText("Options Pricing Engine")).toBeInTheDocument();
    });

    it("offers a filter for every populated domain", () => {
        renderRoute(ROUTES.work);

        expect(screen.getByRole("button", { name: /Everything/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Finance/i })).toBeInTheDocument();
    });
});

describe("mobile navigation", () => {
    // The header drops the clock, theme switch and sign-out below md. Those
    // controls have to survive somewhere, or they are simply gone on a phone.
    it("exposes navigation, contact and the theme switch once opened", async () => {
        const user = userEvent.setup();
        renderRoute(ROUTES.home);

        await user.click(screen.getByRole("button", { name: /open menu/i }));

        // The header keeps its own contact anchor, so match on any of them.
        expect(screen.getAllByRole("link", { name: /contact/i }).length).toBeGreaterThan(0);
        expect(
            screen.getAllByRole("button", { name: /switch to .* theme/i }).length,
        ).toBeGreaterThan(0);
        expect(screen.getAllByRole("link", { name: /work/i }).length).toBeGreaterThan(0);
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
