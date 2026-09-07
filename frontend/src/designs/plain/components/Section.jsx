import { cn } from "../../../lib/cn";
import { Appear } from "./Appear";

/**
 * Section heading in the plain system: serif italic with a linkable anchor
 * mark, matching the document feel of the rest of the layout.
 */
export const SectionHeading = ({ id, children, aside }) => (
    <Appear className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="pl-heading">
            {children}
            <a href={`#${id}`} className="pl-heading-anchor" aria-label="Link to this section">
                #
            </a>
        </h2>
        {aside ? <div className="pl-faint text-sm">{aside}</div> : null}
    </Appear>
);

/** A titled block with the section rhythm applied once, in one place. */
export const Section = ({ id, title, aside, children, className }) => (
    <section id={id} className={cn("scroll-mt-20 py-8 md:py-10", className)}>
        {title ? (
            <SectionHeading id={id} aside={aside}>
                {title}
            </SectionHeading>
        ) : null}
        {children}
    </section>
);

export default Section;
