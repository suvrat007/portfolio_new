import { PROJECT_STATUS, STATUS_LABELS } from "../../../constants/api";
import { cn } from "../../../lib/cn";

/** Outline chip. Renders as an external link when `href` is given. */
export const Pill = ({ href, children, className, ...rest }) => {
    const classes = cn("pl-pill pl-tap", className);

    if (!href) {
        return (
            <span className={classes} {...rest}>
                {children}
            </span>
        );
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
            {...rest}
        >
            {children}
        </a>
    );
};

/** Quieter than a Pill; used for stack labels under a project. */
export const Tag = ({ children }) => <span className="pl-tag">{children}</span>;

const DOT_COLOR = {
    [PROJECT_STATUS.LIVE]: "var(--signal)",
    [PROJECT_STATUS.BUILDING]: "var(--ink-muted)",
    [PROJECT_STATUS.PLANNED]: "var(--ink-faint)",
    [PROJECT_STATUS.ARCHIVED]: "var(--ink-faint)",
};

/** Status marker beside a project name. */
export const StatusDot = ({ status = PROJECT_STATUS.LIVE, className }) => (
    <span
        className={cn("pl-dot", className)}
        style={{ backgroundColor: DOT_COLOR[status] ?? DOT_COLOR[PROJECT_STATUS.PLANNED] }}
    >
        <span className="sr-only">{STATUS_LABELS[status] ?? status}</span>
    </span>
);

export default Pill;
