import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const DEFAULT_API_TARGET = "https://project-api-y3d4.onrender.com";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return {
        plugins: [react(), tailwindcss()],

        server: {
            // Mirrors the Vercel rewrite so `/api` is the same path everywhere.
            proxy: {
                "/api": {
                    target: env.VITE_API_PROXY_TARGET ?? DEFAULT_API_TARGET,
                    changeOrigin: true,
                    secure: true,
                },
            },
        },

        build: {
            target: "es2020",
            cssMinify: "lightningcss",
            reportCompressedSize: false,
            rollupOptions: {
                output: {
                    // Splitting the animation runtime and the GitHub calendar keeps
                    // the entry chunk small, which is what first paint waits on.
                    manualChunks: {
                        react: ["react", "react-dom", "react-router-dom"],
                        motion: ["framer-motion"],
                        state: ["@reduxjs/toolkit", "react-redux", "axios"],
                    },
                },
            },
        },
    };
});
