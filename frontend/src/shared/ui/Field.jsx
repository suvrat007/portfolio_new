import { useId } from "react";

import { cn } from "../../lib/cn";

const CONTROL =
    "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-sm text-ink " +
    "placeholder:text-faint focus:border-ink focus:outline-none focus:ring-0 " +
    "transition-colors duration-300";

/** Labelled input. Underline-only, to match the hairline language of the site. */
export const Field = ({ label, hint, error, className, as = "input", ...rest }) => {
    const id = useId();
    const Control = as;

    return (
        <div className={cn("flex flex-col gap-1.5", className)}>
            <label htmlFor={id} className="u-label text-faint">
                {label}
            </label>
            <Control
                id={id}
                className={cn(CONTROL, as === "textarea" && "resize-y min-h-24")}
                aria-invalid={Boolean(error)}
                aria-describedby={hint || error ? `${id}-help` : undefined}
                {...rest}
            />
            {hint || error ? (
                <p
                    id={`${id}-help`}
                    className={cn("u-label normal-case tracking-normal", error ? "text-signal" : "text-faint")}
                >
                    {error || hint}
                </p>
            ) : null}
        </div>
    );
};

export default Field;
