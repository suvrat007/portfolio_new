import React from "react";
import { motion } from "framer-motion";

const cn = (...classes) => {
    return classes.filter(Boolean).join(' ');
};

export const BackgroundGradient = ({
                                children,
                                className,
                                containerClassName,
                                animate = true
                            }) => {
    const variants = {
        initial: {
            backgroundPosition: "0 50%",
        },
        animate: {
            backgroundPosition: ["0 50%", "100% 50%", "0 50%"],
        },
    };

    return (
        // Outer container: Keep thin padding for the border effect
        <div className={cn("relative p-[1.5px] group", containerClassName)}>
            {/* Blurry gradient layer: Maximum blur, full opacity, and vibrant purple/pink/blue neon colors */}
            <motion.div
                variants={animate ? variants : undefined}
                initial={animate ? "initial" : undefined}
                animate={animate ? "animate" : undefined}
                transition={
                    animate
                        ? {
                            duration: 4, // Slightly increased duration for a softer, pulsating glow
                            repeat: Infinity,
                            repeatType: "reverse",
                        }
                        : undefined
                }
                style={{
                    backgroundSize: animate ? "400% 400%" : undefined,
                }}
                className={cn(
                    // MAXIMUM blur-3xl and full opacity for an incredibly strong, persistent glow
                    "absolute inset-0 rounded-full z-[1] opacity-100 group-hover:opacity-100 blur-3xl transition duration-500 will-change-transform",
                    // Custom radial gradient with even more intensely vibrant purple, pink, and blue neon hues
                    "bg-[radial-gradient(circle_farthest-side_at_0_100%,#d8b4fe,transparent),radial-gradient(circle_farthest-side_at_100%_0,#f9a8d4,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#818cf8,transparent),radial-gradient(circle_farthest-side_at_0_0,#c4b5fd,#1a191c)]"
                )}
            />

            {/* Sharp gradient layer: Matches the neon color palette, without blur */}
            <motion.div
                variants={animate ? variants : undefined}
                initial={animate ? "initial" : undefined}
                animate={animate ? "animate" : undefined}
                transition={
                    animate
                        ? {
                            duration: 4, // Consistent with the blurry layer
                            repeat: Infinity,
                            repeatType: "reverse",
                        }
                        : undefined
                }
                style={{
                    backgroundSize: animate ? "400% 400%" : undefined,
                }}
                className={cn(
                    "absolute inset-0 rounded-full z-[1] will-change-transform",
                    // Same intensely vibrant purple/pink/blue neon gradient for the sharp edge
                    "bg-[radial-gradient(circle_farthest-side_at_0_100%,#d8b4fe,transparent),radial-gradient(circle_farthest-side_at_100%_0,#f9a8d4,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#818cf8,transparent),radial-gradient(circle_farthest-side_at_0_0,#c4b5fd,#1a191c)]"
                )}
            />

            {/* Main content container */}
            <div className={cn("relative z-10", className)}>{children}</div>
        </div>
    );
};

