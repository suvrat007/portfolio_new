import { Suspense, lazy } from "react";

import { useTheme } from "../../../app/ThemeProvider";
import { SECTIONS, SITE } from "../../../constants/site";
import { Section } from "../components/Section";

// Third-party, below the fold, and it calls an external API. The package
// exposes a named export only, so it is remapped to `default` for React.lazy.
const GitHubCalendar = lazy(() =>
    import("react-github-calendar").then((module) => ({
        default: module.GitHubCalendar,
    })),
);

/** Neutral ramp so the graph sits inside the document rather than on it. */
const THEME = {
    light: ["#f4f4f5", "#d4d4d8", "#a1a1aa", "#52525b", "#18181b"],
    dark: ["#161616", "#2e2e2e", "#555555", "#9a9a9a", "#ededed"],
};

export const Activity = () => {
    const { isDark } = useTheme();

    return (
        <Section
            id={SECTIONS.activity.id}
            title="Github Activities"
            aside={`@${SITE.githubUsername}`}
        >
            <div className="overflow-x-auto rounded-lg border border-line p-4">
                <Suspense
                    fallback={
                        <div
                            className="h-32 w-full animate-pulse rounded bg-sunken"
                            aria-label="Loading contribution graph"
                        />
                    }
                >
                    <GitHubCalendar
                        username={SITE.githubUsername}
                        colorScheme={isDark ? "dark" : "light"}
                        theme={THEME}
                        blockSize={11}
                        blockMargin={3}
                        blockRadius={2}
                        fontSize={12}
                        showColorLegend
                        showTotalCount
                        errorMessage="Could not load the contribution graph."
                    />
                </Suspense>
            </div>
        </Section>
    );
};

export default Activity;
