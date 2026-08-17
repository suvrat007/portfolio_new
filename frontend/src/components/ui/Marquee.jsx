import { MOTION_CONFIG } from "../../constants/motion";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";
import { cn } from "../../lib/cn";

/**
 * Continuously scrolling strip. The track is duplicated and translated by
 * exactly -50%, so the loop is seamless without measuring anything.
 * Falls back to a static, wrapped row when reduced motion is requested.
 */
export const Marquee = ({
    items,
    className,
    separator = "·",
    durationS = MOTION_CONFIG.marqueeDurationS,
    pauseOnHover = true,
}) => {
    const reduceMotion = usePrefersReducedMotion();

    const renderItems = (keyPrefix) =>
        items.map((item, index) => (
            <span
                key={`${keyPrefix}-${index}`}
                className="flex shrink-0 items-center gap-8 px-4"
            >
                <span className="u-label whitespace-nowrap text-muted">{item}</span>
                <span aria-hidden="true" className="u-label text-faint">
                    {separator}
                </span>
            </span>
        ));

    if (reduceMotion) {
        return (
            <div className={cn("flex flex-wrap justify-center gap-x-2 gap-y-3", className)}>
                {renderItems("static")}
            </div>
        );
    }

    return (
        <div
            className={cn("group relative flex overflow-hidden u-fade-x", className)}
            aria-label={items.join(", ")}
        >
            <div
                className="flex w-max"
                style={{
                    animation: `u-marquee ${durationS}s linear infinite`,
                    animationPlayState: "running",
                }}
                onMouseEnter={(event) => {
                    if (pauseOnHover) event.currentTarget.style.animationPlayState = "paused";
                }}
                onMouseLeave={(event) => {
                    if (pauseOnHover) event.currentTarget.style.animationPlayState = "running";
                }}
            >
                <div className="flex shrink-0" aria-hidden="false">
                    {renderItems("a")}
                </div>
                <div className="flex shrink-0" aria-hidden="true">
                    {renderItems("b")}
                </div>
            </div>
        </div>
    );
};

export default Marquee;
