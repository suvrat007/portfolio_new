const express = require("express");

const { HTTP, MESSAGES } = require("../constants");
const { asyncHandler } = require("../middleware/asyncHandler");
const { authenticate } = require("../middleware/authenticate");
const { ApiError } = require("../middleware/errors");
const StackCategory = require("../models/stackModel");
const { invalidateContent } = require("../services/contentService");

const router = express.Router();

const findCategoryOrThrow = async (category) => {
    const doc = await StackCategory.findOne({ category });
    if (!doc) throw ApiError.notFound(MESSAGES.CATEGORY_MISSING);
    return doc;
};

const sameName = (a, b) => a.trim().toLowerCase() === b.trim().toLowerCase();

router.get(
    "/",
    asyncHandler(async (_req, res) => {
        const groups = await StackCategory.find().sort({ order: 1, category: 1 }).lean();
        res.status(HTTP.OK).json(groups);
    }),
);

router.post(
    "/",
    authenticate,
    asyncHandler(async (req, res) => {
        const { category, order } = req.body;
        if (!category?.trim()) throw ApiError.badRequest(MESSAGES.CATEGORY_MISSING);

        const exists = await StackCategory.findOne({ category: category.trim() });
        if (exists) throw ApiError.conflict(MESSAGES.CATEGORY_EXISTS);

        const created = await StackCategory.create({
            category: category.trim(),
            order: order ?? 0,
            techs: [],
        });

        invalidateContent();
        res.status(HTTP.CREATED).json(created);
    }),
);

router.post(
    "/:category/techs",
    authenticate,
    asyncHandler(async (req, res) => {
        const { name, image = "" } = req.body;
        if (!name?.trim()) throw ApiError.badRequest(MESSAGES.TECH_MISSING);

        const doc = await findCategoryOrThrow(req.params.category);
        if (doc.techs.some((tech) => sameName(tech.name, name))) {
            throw ApiError.conflict(MESSAGES.TECH_EXISTS);
        }

        doc.techs.push({ name: name.trim(), image: image.trim() });
        await doc.save();

        invalidateContent();
        res.status(HTTP.CREATED).json(doc);
    }),
);

router.delete(
    "/:category/techs/:tech",
    authenticate,
    asyncHandler(async (req, res) => {
        const doc = await findCategoryOrThrow(req.params.category);
        const remaining = doc.techs.filter((tech) => !sameName(tech.name, req.params.tech));
        if (remaining.length === doc.techs.length) {
            throw ApiError.notFound(MESSAGES.TECH_MISSING);
        }

        doc.techs = remaining;
        await doc.save();

        invalidateContent();
        res.status(HTTP.OK).json(doc);
    }),
);

router.delete(
    "/:category",
    authenticate,
    asyncHandler(async (req, res) => {
        const deleted = await StackCategory.findOneAndDelete({ category: req.params.category });
        if (!deleted) throw ApiError.notFound(MESSAGES.CATEGORY_MISSING);

        invalidateContent();
        res.status(HTTP.OK).json({ error: false, category: req.params.category });
    }),
);

module.exports = router;
