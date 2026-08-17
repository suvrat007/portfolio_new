const express = require("express");

const { HTTP, CACHE } = require("../constants");
const { asyncHandler } = require("../middleware/asyncHandler");
const { getContent } = require("../services/contentService");
const { isDatabaseReady } = require("../config/db");

const router = express.Router();

/**
 * Cheap wake-up target. The frontend pings this before React mounts so a
 * sleeping Render instance starts booting during first paint rather than
 * after the first data request.
 */
router.get(
    "/health",
    asyncHandler(async (_req, res) => {
        res.set("Cache-Control", CACHE.PRIVATE_HEADER);
        res.status(HTTP.OK).json({
            status: "ok",
            database: isDatabaseReady() ? "connected" : "connecting",
            uptime: Math.round(process.uptime()),
        });
    }),
);

/** The entire public site in one request. */
router.get(
    "/content",
    asyncHandler(async (req, res) => {
        const { payload, etag } = await getContent();

        res.set("Cache-Control", CACHE.PUBLIC_HEADER);
        res.set("ETag", etag);

        if (req.headers["if-none-match"] === etag) {
            return res.status(HTTP.NOT_MODIFIED).end();
        }

        return res.status(HTTP.OK).json(payload);
    }),
);

module.exports = router;
