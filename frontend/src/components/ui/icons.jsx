/**
 * Inline SVG icons. Kept local rather than pulling an icon package back in for
 * the handful of glyphs the site actually uses.
 */

const base = {
    width: 14,
    height: 14,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
};

/** Box with an arrow leaving it: opens an external site. */
export const ExternalLinkIcon = (props) => (
    <svg {...base} {...props}>
        <path d="M15 3h6v6" />
        <path d="M10 14 21 3" />
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
);

/** Git fork: source repository. */
export const SourceIcon = (props) => (
    <svg {...base} {...props}>
        <circle cx="12" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" />
        <path d="M12 12v3" />
    </svg>
);
