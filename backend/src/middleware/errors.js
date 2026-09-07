const { HTTP, MESSAGES } = require("../constants");
const { env } = require("../config/env");

class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.expected = true;
    }

    static badRequest(message) {
        return new ApiError(HTTP.BAD_REQUEST, message);
    }

    static unauthorized(message = MESSAGES.UNAUTHORIZED) {
        return new ApiError(HTTP.UNAUTHORIZED, message);
    }

    static notFound(message = MESSAGES.NOT_FOUND) {
        return new ApiError(HTTP.NOT_FOUND, message);
    }

    static conflict(message) {
        return new ApiError(HTTP.CONFLICT, message);
    }
}

const notFoundHandler = (req, res) => {
    res.status(HTTP.NOT_FOUND).json({
        error: true,
        message: `No route for ${req.method} ${req.originalUrl}`,
    });
};

// eslint-disable-next-line no-unused-vars -- Express identifies error middleware by arity.
const errorHandler = (error, req, res, next) => {
    const status = error.status ?? HTTP.SERVER_ERROR;
    const message = error.expected ? error.message : MESSAGES.SERVER_ERROR;

    if (!error.expected) {
        console.error(`[error] ${req.method} ${req.originalUrl}`, error);
    }

    res.status(status).json({
        error: true,
        message,
        ...(env.NODE_ENV === "development" && !error.expected
            ? { detail: error.message }
            : {}),
    });
};

module.exports = { ApiError, notFoundHandler, errorHandler };
