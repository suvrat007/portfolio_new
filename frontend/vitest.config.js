import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ["./src/test/setup.js"],
        // The design system is CSS-only; parsing it in tests buys nothing.
        css: false,
        include: ["src/**/*.test.{js,jsx}"],
    },
});
