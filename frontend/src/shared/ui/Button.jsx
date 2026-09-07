import { motion } from "framer-motion";

import { useMagnetic } from "../../hooks/useMagnetic";
import { cn } from "../../lib/cn";

const BASE =
    "group relative inline-flex items-center justify-center gap-3 rounded-full " +
    "px-6 py-3.5 text-sm font-medium tracking-[-0.01em] " +
    "transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] " +
    "disabled:pointer-events-none disabled:opacity-45";

const VARIANTS = {
    solid: "bg-ink text-paper hover:bg-ink/85",
    outline: "border border-line-strong text-ink hover:bg-ink hover:text-paper",
    ghost: "text-muted hover:text-ink",
};

/**
 * Primary action. On a fine pointer it drifts toward the cursor; on touch or
 * with reduced motion the effect is inert and it behaves as a plain button.
 */
export const Button = ({
    as = "button",
    variant = "solid",
    className,
    children,
    magnetic = true,
    ...rest
}) => {
    const { ref, enabled, style, handlers } = useMagnetic();
    const Component = as === "a" ? motion.a : motion.button;

    return (
        <Component
            ref={ref}
            className={cn(BASE, VARIANTS[variant], className)}
            style={magnetic && enabled ? style : undefined}
            whileTap={{ scale: 0.97 }}
            {...(magnetic ? handlers : {})}
            {...rest}
        >
            <span className="relative z-10 flex items-center gap-3">{children}</span>
        </Component>
    );
};

/** Small arrow that slides on hover; pairs with links and buttons. */
export const Arrow = ({ className, direction = "up-right" }) => (
    <span
        aria-hidden="true"
        className={cn(
            "inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            direction === "up-right"
                ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                : "group-hover:translate-x-1",
            className,
        )}
    >
        {direction === "up-right" ? "↗" : "→"}
    </span>
);

/** Text link with the shared underline-draw treatment. */
export const ArrowLink = ({ href, children, className, external = true, ...rest }) => (
    <a
        href={href}
        className={cn("group inline-flex items-center gap-2 text-sm text-ink", className)}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
    >
        <span className="u-link">{children}</span>
        <Arrow />
    </a>
);

export default Button;
