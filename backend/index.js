const { env, assertEnv } = require("./src/config/env");
const { connectDatabase, disconnectDatabase } = require("./src/config/db");
const { getContent } = require("./src/services/contentService");
const { createApp } = require("./src/app");

const start = async () => {
    assertEnv();

    const app = createApp();

    // Listen before the database resolves so the health check answers during a
    // cold start — that is what lets the frontend's warm-up ping do its job.
    const server = app.listen(env.PORT, () => {
        console.log(`[api] listening on :${env.PORT} (${env.NODE_ENV})`);
    });

    try {
        await connectDatabase();
        console.log("[api] mongodb connected");
        // Prime the aggregate cache so the first real visitor never waits on a query.
        await getContent({ force: true });
        console.log("[api] content cache warm");
    } catch (error) {
        console.error("[api] startup database error:", error.message);
    }

    const shutdown = async (signal) => {
        console.log(`[api] ${signal} received, shutting down`);
        server.close(async () => {
            await disconnectDatabase();
            process.exit(0);
        });
    };

    ["SIGTERM", "SIGINT"].forEach((signal) => {
        process.on(signal, () => shutdown(signal));
    });
};

start().catch((error) => {
    console.error("[api] failed to start:", error.message);
    process.exit(1);
});
