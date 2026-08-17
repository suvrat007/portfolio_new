import { Suspense, lazy } from "react";

import { SECTIONS, SITE } from "../../constants/site";
import { useTheme } from "../../app/ThemeProvider";
import { Reveal } from "../../components/ui/Reveal";
import { Section } from "../../components/ui/Section";

// Third-party, below the fold, and it calls an external API, so keep it out of
// the initial bundle entirely. The package exposes a named export only, so it
// is remapped to `default` for React.lazy.
const GitHubCalendar = lazy(() =>
    import("react-github-calendar").then((module) => ({
        default: module.GitHubCalendar,
    })),
);

/** Monochrome ramp so the calendar reads as part of the page, not a widget. */
const THEME = {
    light: ["#e7e5e0", "#c9c6bf", "#95918a", "#575450", "#0d0d0c"],
    dark: ["#151513", "#33322e", "#5c5953", "#95918a", "#edebe6"],
};

const CalendarFallback = () => (
    <div
        className="h-[9rem] w-full animate-pulse bg-sunken"
        aria-label="Loading contribution graph"
    />
);

export const Activity = () => {
    const { isDark } = useTheme();

    return (
        <Section
            id={SECTIONS.activity.id}
            index={SECTIONS.activity.index}
            label={SECTIONS.activity.label}
            aside={`github.com/${SITE.githubUsername}`}
        >
            <Reveal className="u-no-scrollbar overflow-x-auto">
                <Suspense fallback={<CalendarFallback />}>
                    <GitHubCalendar
                        username={SITE.githubUsername}
                        colorScheme={isDark ? "dark" : "light"}
                        theme={THEME}
                        blockSize={11}
                        blockMargin={3}
                        blockRadius={1}
                        fontSize={11}
                        showColorLegend
                        showTotalCount
                        errorMessage="Could not load the contribution graph."
                    />
                </Suspense>
            </Reveal>

            <Reveal className="u-label mt-8 text-faint">
                Public contribution activity, pulled live from GitHub.
            </Reveal>
        </Section>
    );
};

export default Activity;
