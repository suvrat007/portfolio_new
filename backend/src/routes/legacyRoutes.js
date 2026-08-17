const express = require("express");

const { COLLECTION } = require("../constants");
const projectRoutes = require("./projectRoutes");
const stackRoutes = require("./stackRoutes");
const authRoutes = require("./authRoutes");

/**
 * The first version of this API exposed one verb-per-collection route
 * (`/getTopFourProjects`, `/addJSProject`, …). Those paths are still live in
 * the deployed frontend, so they are kept as thin rewrites onto the current
 * routers rather than duplicated handlers. Remove once the new frontend is the
 * only client.
 */
const router = express.Router();

const forward = (target, buildPath) => (req, res, next) => {
    req.url = buildPath(req.params);
    target(req, res, next);
};

const LEGACY_COLLECTIONS = {
    TopFour: COLLECTION.FEATURED,
    FullStack: COLLECTION.FULLSTACK,
    ReactJS: COLLECTION.REACT,
    JS: COLLECTION.JS,
};

Object.entries(LEGACY_COLLECTIONS).forEach(([legacyName, collection]) => {
    router.get(`/get${legacyName}Projects`, forward(projectRoutes, () => `/${collection}`));
    router.post(`/add${legacyName}Project`, forward(projectRoutes, () => `/${collection}`));
    router.put(
        `/update${legacyName}Project/:id`,
        forward(projectRoutes, ({ id }) => `/${collection}/${id}`),
    );
    router.delete(
        `/delete${legacyName}Project/:id`,
        forward(projectRoutes, ({ id }) => `/${collection}/${id}`),
    );
});

router.get("/technologies", forward(stackRoutes, () => "/"));
router.post("/technologies/add-category", forward(stackRoutes, () => "/"));
router.post(
    "/technologies/:category",
    forward(stackRoutes, ({ category }) => `/${category}/techs`),
);
router.delete(
    "/technologies/:category/:technology",
    forward(stackRoutes, ({ category, technology }) => `/${category}/techs/${technology}`),
);
router.delete(
    "/technologies/:category",
    forward(stackRoutes, ({ category }) => `/${category}`),
);

router.post("/login", forward(authRoutes, () => "/login"));
router.post("/create-account", forward(authRoutes, () => "/register"));

module.exports = router;
