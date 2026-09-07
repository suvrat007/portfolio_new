import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { DesignLayout, DesignRoute } from "../app/DesignOutlet";
import { DesignProvider } from "../app/DesignProvider";
import { ThemeProvider } from "../app/ThemeProvider";
import { DESIGN_IDS } from "../constants/design";
import { HERO } from "../constants/content";
import { ROUTES, SITE } from "../constants/site";
import { DESIGN_STORAGE_KEY } from "../constants/storage";
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

/**
 * Renders through DesignOutlet rather than a design's own components, so these
 * tests exercise the same indirection the real router uses.
 */
const renderRoute = (path, { design } = {}) => {
    // DesignProvider reads storage in its state initialiser, so seed it first.
    if (design) localStorage.setItem(DESIGN_STORAGE_KEY, design);

    const router = createMemoryRouter(
        [
            {
                path: ROUTES.home,
                element: <DesignLayout />,
                children: [
                    { index: true, element: <DesignRoute name="home" /> },
                    { path: ROUTES.work, element: <DesignRoute name="work" /> },
                    { path: ROUTES.admin, element: <AdminPage /> },
                ],
            },
        ],
        { initialEntries: [path] },
    );

    return render(
        <Provider store={store}>
            <ThemeProvider>
                <DesignProvider>
                    <RouterProvider router={router} />
                </DesignProvider>
            </ThemeProvider>
        </Provider>,
    );
};

beforeEach(() => {
    localStorage.clear();
});

describe("plain design (the default)", () => {
    it("is what a visitor gets without choosing anything", () => {
        renderRoute(ROUTES.home);

        // The editorial hero headline must NOT be on screen by default.
        expect(screen.queryByText(HERO.headline[2])).not.toBeInTheDocument();
        expect(screen.getAllByText(SITE.name).length).toBeGreaterThan(0);
        expect(document.documentElement.dataset.design).toBe(DESIGN_IDS.PLAIN);
    });

    it("renders the work from the bundled snapshot with no API", async () => {
        renderRoute(ROUTES.home);

        await waitFor(() => {
            expect(screen.getAllByText("Quantfolio").length).toBeGreaterThan(0);
        });
        expect(screen.getAllByText("FinSight OS").length).toBeGreaterThan(0);
        expect(screen.getAllByText("Tutora").length).toBeGreaterThan(0);
        expect(screen.getAllByText("PacketLens").length).toBeGreaterThan(0);
    });

    it("puts the trading infrastructure in the pipeline, not in shipped work", () => {
        const { container } = renderRoute(ROUTES.home);

        const pipeline = container.querySelector("#building");
        expect(within(pipeline).getByText("Low Frequency Trading Infra")).toBeInTheDocument();

        // Unshipped, so it carries no outbound links of its own.
        expect(within(pipeline).queryByRole("link", { name: /website/i })).toBeNull();
        expect(within(pipeline).queryByRole("link", { name: /source/i })).toBeNull();
    });

    it("renders the toolkit groups", () => {
        renderRoute(ROUTES.home);

        expect(screen.getAllByText("Backend & Systems").length).toBeGreaterThan(0);
        expect(screen.getAllByText("C++17").length).toBeGreaterThan(0);
    });

    it("offers the switch into the designed presentation", async () => {
        const user = userEvent.setup();
        renderRoute(ROUTES.home);

        const button = screen.getByRole("button", { name: /add design/i });
        await user.click(button);

        await waitFor(() => {
            expect(document.documentElement.dataset.design).toBe(DESIGN_IDS.EDITORIAL);
        });
        // The editorial hero is now on screen.
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
            HERO.headline.join(""),
        );
    });
});

describe("editorial design", () => {
    it("renders its hero when the visitor has opted in", () => {
        renderRoute(ROUTES.home, { design: DESIGN_IDS.EDITORIAL });

        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
            HERO.headline.join(""),
        );
    });

    it("renders every numbered section anchor", () => {
        const { container } = renderRoute(ROUTES.home, {
            design: DESIGN_IDS.EDITORIAL,
        });
        const ids = [...container.querySelectorAll("section[id]")].map((el) => el.id);

        expect(ids).toEqual(
            expect.arrayContaining(["profile", "practice", "work", "toolkit", "contact"]),
        );
    });
});

describe("removed work", () => {
    it.each([
        [DESIGN_IDS.PLAIN],
        [DESIGN_IDS.EDITORIAL],
    ])("shows neither the valuation model nor an options pricer in %s", (design) => {
        renderRoute(ROUTES.work, { design });

        expect(screen.queryByText(/DCF Valuation Model/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Options Pricing Engine/i)).not.toBeInTheDocument();
    });
});

describe("work page", () => {
    it.each([[DESIGN_IDS.PLAIN], [DESIGN_IDS.EDITORIAL]])(
        "lists shipped and in-progress work together in %s",
        (design) => {
            renderRoute(ROUTES.work, { design });

            expect(screen.getAllByText("Quantfolio").length).toBeGreaterThan(0);
            expect(screen.getAllByText("Low Frequency Trading Infra").length).toBeGreaterThan(0);
        },
    );

    it("gives every outbound project link a safe target", () => {
        renderRoute(ROUTES.work);

        const links = [
            ...screen.getAllByRole("link", { name: /website/i }),
            ...screen.getAllByRole("link", { name: /source/i }),
        ];
        expect(links.length).toBeGreaterThan(0);
        links.forEach((link) => {
            expect(link).toHaveAttribute("href", expect.stringMatching(/^https:\/\//));
            expect(link).toHaveAttribute("target", "_blank");
            expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
        });
    });
});

describe("admin route", () => {
    it("is design-agnostic and shows the sign-in panel with no session", () => {
        renderRoute(ROUTES.admin);

        expect(screen.getByRole("heading", { name: /admin access/i })).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
    });
});
