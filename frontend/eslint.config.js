import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
    { ignores: ["dist", "node_modules"] },

    {
        files: ["**/*.{js,jsx}"],
        languageOptions: {
            ecmaVersion: 2022,
            globals: { ...globals.browser, ...globals.es2021 },
            parserOptions: {
                ecmaVersion: "latest",
                ecmaFeatures: { jsx: true },
                sourceType: "module",
            },
        },
        settings: { react: { version: "detect" } },
        plugins: {
            react,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.flat.recommended.rules,
            ...react.configs.flat["jsx-runtime"].rules,
            ...reactHooks.configs.recommended.rules,
            "no-unused-vars": [
                "error",
                { varsIgnorePattern: "^[A-Z_]", argsIgnorePattern: "^_" },
            ],
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
            // This is a plain-JS React codebase; prop shapes are documented with
            // JSDoc rather than runtime PropTypes, and `prop-types` is not a
            // dependency. Keep the rules that catch real bugs instead.
            "react/prop-types": "off",
            "react/no-unknown-property": ["error", { ignore: ["fetchPriority"] }],
            "no-console": ["warn", { allow: ["warn", "error"] }],
            eqeqeq: ["error", "smart"],
            "prefer-const": "error",
            "object-shorthand": "warn",
        },
    },

    // Build tooling runs in Node, not the browser.
    {
        files: ["scripts/**/*.mjs", "vite.config.js", "vitest.config.js", "eslint.config.js"],
        languageOptions: { globals: globals.node },
    },

    // Tests bridge both: a jsdom window plus Node and Vitest globals.
    {
        files: ["src/test/**/*.{js,jsx}", "src/**/*.test.{js,jsx}"],
        languageOptions: {
            globals: { ...globals.browser, ...globals.node, ...globals.vitest },
        },
    },
];
