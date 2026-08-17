import { motion } from "framer-motion";

import { lineReveal, staggerParent, STAGGER, VIEWPORT } from "../../constants/motion";
import { cn } from "../../lib/cn";

/**
 * Renders each line inside its own clipping mask so the text slides up from
 * behind its baseline. This is the reveal used for every large heading.
 *
 * @param {{ lines: Array<string|import('react').ReactNode> }} props
 */
export const MaskedLines = ({
    lines,
    as: Tag = "h2",
    className,
    lineClassName,
    stagger = STAGGER.loose,
    delay = 0,
    once = true,
}) => {
    const MotionTag = motion[Tag] ?? motion.h2;

    return (
        <MotionTag
            className={cn(className)}
            initial="hidden"
            whileInView="visible"
            viewport={{ ...VIEWPORT, once }}
            variants={staggerParent(stagger, delay)}
        >
            {lines.map((line, index) => (
                // Lines are fixed, ordered content, so index is a stable key here.
                <span className="u-mask" key={index}>
                    <motion.span
                        className={cn("block", lineClassName)}
                        variants={lineReveal}
                    >
                        {line}
                    </motion.span>
                </span>
            ))}
        </MotionTag>
    );
};

export default MaskedLines;
