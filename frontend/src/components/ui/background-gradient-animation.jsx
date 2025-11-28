import React, { useEffect, useRef, useState } from "react";

// Utility function to merge class names (equivalent to clsx/cn)
const cn = (...classes) => classes.filter(Boolean).join(' ');

/**
 * BackgroundGradientAnimation Component
 * Creates an animated, interactive background using mixing-mode gradients.
 * Uses a dark blue/purple neon theme and fixes mouse pointer alignment.
 */
export const BackgroundGradientAnimation = ({
                                         gradientBackgroundStart = "rgb(10, 0, 20)", // Very dark blue/purple start
                                         gradientBackgroundEnd = "rgb(0, 0, 10)",   // Even darker blue end
                                         firstColor = "70, 0, 150",     // Deep Purple
                                         secondColor = "0, 50, 200",    // Vibrant Blue
                                         thirdColor = "150, 0, 100",    // Deep Fuchsia
                                         fourthColor = "0, 100, 150",   // Teal Blue
                                         fifthColor = "100, 0, 200",    // Another rich Purple
                                         pointerColor = "100, 200, 255", // Bright Sky Blue for pointer
                                         size = "70%",
                                         blendingValue = "soft-light",
                                         children,
                                         className,
                                         interactive = true,
                                         containerClassName
                                     }) => {
    const interactiveRef = useRef(null);
    const containerRef = useRef(null);

    const [curX, setCurX] = useState(0);
    const [curY, setCurY] = useState(0);
    const [tgX, setTgX] = useState(0);
    const [tgY, setTgY] = useState(0);

    // Set CSS variables on the body for gradient customization
    useEffect(() => {
        document.body.style.setProperty("--gradient-background-start", gradientBackgroundStart);
        document.body.style.setProperty("--gradient-background-end", gradientBackgroundEnd);
        document.body.style.setProperty("--first-color", firstColor);
        document.body.style.setProperty("--second-color", secondColor);
        document.body.style.setProperty("--third-color", thirdColor);
        document.body.style.setProperty("--fourth-color", fourthColor);
        document.body.style.setProperty("--fifth-color", fifthColor);
        document.body.style.setProperty("--pointer-color", pointerColor);
        document.body.style.setProperty("--size", size);
        document.body.style.setProperty("--blending-value", blendingValue);
    }, [gradientBackgroundStart, gradientBackgroundEnd, firstColor, secondColor, thirdColor, fourthColor, fifthColor, pointerColor, size, blendingValue]);

    // Animation loop for smooth mouse-following pointer
    useEffect(() => {
        let animationFrameId;

        function move() {
            if (!interactiveRef.current || !containerRef.current) {
                animationFrameId = requestAnimationFrame(move);
                return;
            }

            const pointerSize = interactiveRef.current.offsetWidth;

            // Adjust current position towards target
            setCurX(prevCurX => prevCurX + (tgX - prevCurX) / 10);
            setCurY(prevCurY => prevCurY + (tgY - prevCurY) / 10);

            // Position the center of the pointer at (curX, curY)
            interactiveRef.current.style.transform = `translate(${Math.round(curX - pointerSize / 2)}px, ${Math.round(curY - pointerSize / 2)}px)`;

            animationFrameId = requestAnimationFrame(move);
        }

        if (interactive) {
            move();
        }

        return () => {
            if (interactive) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [tgX, tgY, interactive, curX, curY]);

    // Mouse move handler, calculates position relative to container
    const handleMouseMove = (event) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setTgX(event.clientX - rect.left);
            setTgY(event.clientY - rect.top);
        }
    };

    const [isSafari, setIsSafari] = useState(false);
    useEffect(() => {
        setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
    }, []);

    // Set document background color
    useEffect(() => {
        document.documentElement.style.backgroundColor = gradientBackgroundStart;
    }, [gradientBackgroundStart]);


    return (
        <div
            ref={containerRef}
            className={cn(
                "h-screen w-screen relative overflow-hidden top-0 left-0",
                "bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
                containerClassName
            )}
            onMouseMove={interactive ? handleMouseMove : undefined}
        >

            {/* Hidden SVG for the "gooey" filter effect */}
            <svg className="hidden">
                <defs>
                    <filter id="blurMe">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                            result="goo" />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>

            {/* Main content container (Z-index 20 to sit above the gradients) */}
            <div className={cn("relative z-20 h-full w-full", className)}>{children}</div>

            {/* Gradients Container: Applies the main blur/filter effect */}
            <div
                className={cn(
                    "gradients-container h-full w-full absolute top-0 left-0",
                    isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
                )}
            >
                {/* Gradient 1 (Fixed Origin) */}
                <div
                    className={cn(
                        `absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat]`,
                        `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
                        `[transform-origin:center_center]`,
                        `animate-first`,
                        `opacity-100`
                    )}></div>
                {/* Gradient 2 (Offset Origin) */}
                <div
                    className={cn(
                        `absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`,
                        `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
                        `[transform-origin:calc(50%-400px)]`,
                        `animate-second`,
                        `opacity-100`
                    )}></div>
                {/* Gradient 3 (Offset Origin) */}
                <div
                    className={cn(
                        `absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
                        `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
                        `[transform-origin:calc(50%+400px)]`,
                        `animate-third`,
                        `opacity-100`
                    )}></div>
                {/* Gradient 4 (Offset Origin) */}
                <div
                    className={cn(
                        `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`,
                        `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
                        `[transform-origin:calc(50%-200px)]`,
                        `animate-fourth`,
                        `opacity-70`
                    )}></div>
                {/* Gradient 5 (Offset Origin) */}
                <div
                    className={cn(
                        `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]`,
                        `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
                        `[transform-origin:calc(50%-800px)_calc(50%+800px)]`,
                        `animate-fifth`,
                        `opacity-100`
                    )}></div>

                {/* Interactive Pointer (Follows mouse) */}
                {interactive && (
                    <div
                        ref={interactiveRef}
                        className={cn(
                            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
                            `[mix-blend-mode:var(--blending-value)] w-[300px] h-[300px] rounded-full top-0 left-0`,
                            `opacity-70`
                        )}></div>
                )}
            </div>
            {/* Include custom CSS for the animations */}
            <style jsx global>{`
                @keyframes float {
                    0% {
                        transform: translate(-50%, -50%) rotate(0deg);
                    }
                    100% {
                        transform: translate(-50%, -50%) rotate(360deg);
                    }
                }

                .animate-first {
                    animation: float 60s infinite linear;
                }
                .animate-second {
                    animation: float 40s infinite linear;
                }
                .animate-third {
                    animation: float 20s infinite linear;
                }
                .animate-fourth {
                    animation: float 80s infinite linear;
                }
                .animate-fifth {
                    animation: float 100s infinite linear;
                }
            `}</style>
        </div>
    );
};
