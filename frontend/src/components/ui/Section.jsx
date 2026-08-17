import { motion } from "framer-motion";

import { scaleInX, VIEWPORT } from "../../constants/motion";
import { cn } from "../../lib/cn";
import { Reveal } from "./Reveal";

/** A hairline that draws itself in from the left when scrolled into view. */
export const Rule = ({ className }) => (
    <motion.div
        className={cn("h-px w-full origin-left bg-line", className)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={scaleInX}
    />
);

/**
 * Section wrapper: anchor id, printed index, title and an optional aside.
 * Every major block on the page uses this so the rhythm never varies.
 */
export const Section = ({
    id,
    index,
    label,
    aside,
    children,
    className,
    contentClassName,
    withRule = true,
}) => (
    <section id={id} className={cn("u-section-y", className)}>
        <div className="u-container">
            {label ? (
                <>
                    {withRule ? <Rule /> : null}
                    {/* Wraps so a long aside stacks under the label rather than
                        crushing it on a narrow screen. */}
                    <Reveal className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-4 pb-8 md:pb-10">
                        <div className="flex items-baseline gap-3 md:gap-5">
                            {index ? (
                                <span className="u-label u-numeric text-faint">{index}</span>
                            ) : null}
                            <span className="u-label text-ink">{label}</span>
                        </div>
                        {aside ? <div className="u-label text-faint">{aside}</div> : null}
                    </Reveal>
                </>
            ) : null}

            <div className={cn(contentClassName)}>{children}</div>
        </div>
    </section>
);

export default Section;
