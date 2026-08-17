const express = require("express");
const cors = require("cors");

const { SERVER, HTTP, CACHE } = require("./constants");
const { env } = require("./config/env");
const { notFoundHandler, errorHandler } = require("./middleware/errors");

const contentRoutes = require("./routes/contentRoutes");
const projectRoutes = require("./routes/projectRoutes");
const stackRoutes = require("./routes/stackRoutes");
const authRoutes = require("./routes/authRoutes");
const legacyRoutes = require("./routes/legacyRoutes");

const corsOptions = {
    origin: env.CORS_ORIGINS.length > 0 ? env.CORS_ORIGINS : true,
    // The public payload is anonymous; ETag revalidation needs the header exposed.
    exposedHeaders: ["ETag"],
};

const createApp = () => {
    const app = express();

    // Render terminates TLS upstream; trust it so ETag/IP handling stays correct.
    app.set("trust proxy", 1);
    app.set("etag", false);

    app.use(cors(corsOptions));
    app.use(express.json({ limit: SERVER.JSON_BODY_LIMIT }));

    app.get("/", (_req, res) => {
        res.set("Cache-Control", CACHE.PRIVATE_HEADER);
        res.status(HTTP.OK).json({ service: "portfolio-api", status: "ok" });
    });

    app.use("/api", contentRoutes);
    app.use("/api/projects", projectRoutes);
    app.use("/api/stack", stackRoutes);
    app.use("/api/auth", authRoutes);

    app.use(legacyRoutes);

    app.use(notFoundHandler);
    app.use(errorHandler);

    return app;
};

module.exports = { createApp };
