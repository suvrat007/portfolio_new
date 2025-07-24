import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/bg.jsx";

const Boxes = ({ className, ...rest }) => {
    const rows = Array(50).fill(1); // Reduced for performance
    const cols = Array(30).fill(1); // Reduced for performance
    const colors = [
        "#1f2937", // Dark gray
        "#374151", // Medium dark gray
        "#4b5563", // Lighter dark gray
        "#6b7280", // Gray
        "#111827", // Very dark gray
        "#1e293b", // Dark slate
        "#334155", // Medium slate
        "#475569", // Light slate
    ];

    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

    return (
        <div
            style={{
                transform: `translate(-40%, -60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
            }}
            className={cn(
                "absolute top-0 left-0 z-0 flex h-full w-full p-4 opacity-15", // Even lower opacity for dark mode
                className
            )}
            {...rest}
        >
            {rows.map((_, i) => (
                <motion.div
                    key={`row-${i}`}
                    className="relative h-6 w-12 border-l border-gray-900" // Darker borders for dark mode
                >
                    {cols.map((_, j) => (
                        <motion.div
                            key={`col-${j}`}
                            whileHover={{
                                backgroundColor: getRandomColor(),
                                transition: { duration: 0 },
                            }}
                            animate={{
                                transition: { duration: 2 },
                            }}
                            className="relative h-6 w-12 border-t border-r border-gray-900"
                        >
                            {j % 2 === 0 && i % 2 === 0 && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1"
                                    stroke="currentColor"
                                    className="pointer-events-none absolute -top-3 -left-5 h-5 w-8 stroke-[1px] text-gray-800"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v12m6-6H6"
                                    />
                                </svg>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            ))}
        </div>
    );
};

export default React.memo(Boxes);