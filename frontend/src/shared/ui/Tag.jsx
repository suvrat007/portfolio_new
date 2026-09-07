import { PROJECT_STATUS, STATUS_LABELS } from "../../constants/api";
import { cn } from "../../lib/cn";

/** Hairline pill used for stacks, techniques and domains. */
export const Tag = ({ children, className }) => (
    <span
        className={cn(
            "u-label inline-flex items-center rounded-full border border-line px-2.5 py-1.5",
            "text-faint transition-colors duration-300 hover:border-line-strong hover:text-ink",
            className,
        )}
    >
        {children}
    </span>
);

const DOT_TONE = {
    [PROJECT_STATUS.LIVE]: "bg-signal",
    [PROJECT_STATUS.BUILDING]: "bg-ink",
    [PROJECT_STATUS.PLANNED]: "bg-faint",
    [PROJECT_STATUS.ARCHIVED]: "bg-faint",
};

/**
 * Status indicator. Only `live` pulses. A planned project shouldn't look like
 * it is doing something right now.
 */
export const StatusDot = ({ status = PROJECT_STATUS.LIVE, withLabel = false, className }) => (
    <span className={cn("inline-flex items-center gap-2", className)}>
        <span
            aria-hidden="true"
            className={cn(
                "size-[6px] shrink-0 rounded-full",
                DOT_TONE[status] ?? DOT_TONE[PROJECT_STATUS.PLANNED],
            )}
            style={
                status === PROJECT_STATUS.LIVE
                    ? { animation: "u-pulse-dot 2.4s var(--ease-in-out-quint) infinite" }
                    : undefined
            }
        />
        {withLabel ? (
            <span className="u-label text-faint">{STATUS_LABELS[status] ?? status}</span>
        ) : (
            <span className="sr-only">{STATUS_LABELS[status] ?? status}</span>
        )}
    </span>
);

export default Tag;
