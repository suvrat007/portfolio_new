const dotenv = require("dotenv");

dotenv.config();

const { SERVER } = require("../constants");

/**
 * Reads an environment variable, accepting the legacy `VITE_`-prefixed names
 * that the original deployment was configured with.
 */
const read = (name) => process.env[name] ?? process.env[`VITE_${name}`];

const env = {
    NODE_ENV: process.env.NODE_ENV ?? "development",
    PORT: Number(process.env.PORT) || SERVER.DEFAULT_PORT,
    MONGO_URI: read("MONGO_URI"),
    ACCESS_TOKEN_SECRET: read("ACCESS_TOKEN_SECRET"),
    /** Comma separated allowlist; empty means "reflect any origin". */
    CORS_ORIGINS: (read("CORS_ORIGINS") ?? "")
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean),
};

const REQUIRED = ["MONGO_URI", "ACCESS_TOKEN_SECRET"];

const assertEnv = () => {
    const missing = REQUIRED.filter((key) => !env[key]);
    if (missing.length > 0) {
        throw new Error(
            `Missing required environment variables: ${missing.join(", ")}. ` +
                "Set them in backend/.env (see .env.example).",
        );
    }
};

module.exports = { env, assertEnv };
