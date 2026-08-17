const jwt = require("jsonwebtoken");

const { TOKEN } = require("../constants");
const { env } = require("../config/env");
const { ApiError } = require("./errors");

const extractToken = (req) => {
    const header = req.headers[TOKEN.HEADER];
    if (!header) return null;

    const [scheme, value] = header.split(" ");
    return scheme === TOKEN.SCHEME && value ? value : null;
};

const authenticate = (req, _res, next) => {
    const token = extractToken(req);
    if (!token) return next(ApiError.unauthorized());

    try {
        req.user = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
        return next();
    } catch {
        return next(ApiError.unauthorized());
    }
};

module.exports = { authenticate };
