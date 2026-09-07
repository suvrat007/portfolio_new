import { cn } from "../../lib/cn";

/** Shown when a section has no entries yet. Deliberately quiet. */
export const EmptyState = ({ title, description, className }) => (
    <div className={cn("border border-dashed border-line px-8 py-16 text-center", className)}>
        <p className="u-label text-faint">{title}</p>
        {description ? (
            <p className="u-lede mx-auto mt-4 max-w-md text-sm">{description}</p>
        ) : null}
    </div>
);

export default EmptyState;
