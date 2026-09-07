import { useState } from "react";

import { SITE } from "../../constants/site";
import { cn } from "../../lib/cn";

/**
 * The portrait, with a real fallback.
 *
 * A missing image previously just vanished, which left a silent hole in the
 * layout. If the file cannot be loaded this renders the initials instead, so
 * the composition still holds.
 */
export const Portrait = ({ className, fallbackClassName, width = 160, height = 200 }) => {
    const [failed, setFailed] = useState(false);

    if (failed || !SITE.portraitUrl) {
        return (
            <span
                className={cn(
                    "grid place-items-center bg-sunken font-medium text-muted",
                    className,
                    fallbackClassName,
                )}
                aria-label={SITE.name}
            >
                {SITE.initials}
            </span>
        );
    }

    return (
        <img
            src={SITE.portraitUrl}
            alt={SITE.name}
            width={width}
            height={height}
            loading="eager"
            className={className}
            onError={() => setFailed(true)}
        />
    );
};

export default Portrait;
