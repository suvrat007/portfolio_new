const express = require("express");

const { HTTP, CACHE, MESSAGES } = require("../constants");
const { asyncHandler } = require("../middleware/asyncHandler");
const { login, register } = require("../services/authService");

const router = express.Router();

router.use((_req, res, next) => {
    res.set("Cache-Control", CACHE.PRIVATE_HEADER);
    next();
});

router.post(
    "/login",
    asyncHandler(async (req, res) => {
        const result = await login(req.body);
        res.status(HTTP.OK).json({ error: false, message: MESSAGES.LOGIN_OK, ...result });
    }),
);

router.post(
    "/register",
    asyncHandler(async (req, res) => {
        const result = await register(req.body);
        res.status(HTTP.CREATED).json({ error: false, ...result });
    }),
);

module.exports = router;
