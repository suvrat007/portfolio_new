const express = require("express");

const { HTTP, MESSAGES } = require("../constants");
const { asyncHandler } = require("../middleware/asyncHandler");
const { authenticate } = require("../middleware/authenticate");
const { ApiError } = require("../middleware/errors");
const { getProjectModel } = require("../models/projectModel");
const { invalidateContent } = require("../services/contentService");

const router = express.Router();

/** Resolves `:collection` once for every route below. */
router.param("collection", (req, _res, next, collection) => {
    const model = getProjectModel(collection);
    if (!model) return next(ApiError.notFound(MESSAGES.UNKNOWN_COLLECTION));

    req.projectModel = model;
    return next();
});

router.get(
    "/:collection",
    asyncHandler(async (req, res) => {
        const projects = await req.projectModel
            .find()
            .sort({ order: 1, createdAt: -1 })
            .lean();
        res.status(HTTP.OK).json(projects);
    }),
);

router.post(
    "/:collection",
    authenticate,
    asyncHandler(async (req, res) => {
        const project = await req.projectModel.create(req.body);
        invalidateContent();
        res.status(HTTP.CREATED).json(project);
    }),
);

router.put(
    "/:collection/:id",
    authenticate,
    asyncHandler(async (req, res) => {
        const project = await req.projectModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!project) throw ApiError.notFound();

        invalidateContent();
        res.status(HTTP.OK).json(project);
    }),
);

router.delete(
    "/:collection/:id",
    authenticate,
    asyncHandler(async (req, res) => {
        const project = await req.projectModel.findByIdAndDelete(req.params.id);
        if (!project) throw ApiError.notFound();

        invalidateContent();
        res.status(HTTP.OK).json({ error: false, id: req.params.id });
    }),
);

module.exports = router;
