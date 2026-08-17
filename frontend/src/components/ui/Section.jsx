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
                    <Reveal className="flex items-baseline justify-between gap-6 pt-5 pb-12 md:pb-16">
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
