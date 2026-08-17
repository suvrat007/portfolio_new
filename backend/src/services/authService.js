const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { AUTH, TOKEN, MESSAGES } = require("../constants");
const { env } = require("../config/env");
const { ApiError } = require("../middleware/errors");
const User = require("../models/userModel");

const isHashed = (value) => AUTH.HASH_PREFIXES.some((prefix) => value.startsWith(prefix));

const hashPassword = (password) => bcrypt.hash(password, AUTH.BCRYPT_ROUNDS);

const signToken = (user) =>
    jwt.sign({ sub: String(user._id), email: user.email }, env.ACCESS_TOKEN_SECRET, {
        expiresIn: TOKEN.EXPIRES_IN,
    });

/**
 * Accounts created before password hashing was introduced still hold plaintext.
 * Those are verified by direct comparison once, then transparently re-saved as
 * a bcrypt hash so the plaintext never survives a second login.
 */
const verifyPassword = async (user, candidate) => {
    if (isHashed(user.password)) return bcrypt.compare(candidate, user.password);
    if (user.password !== candidate) return false;

    user.password = await hashPassword(candidate);
    await user.save();
    return true;
};

const login = async ({ email, password }) => {
    if (!email || !password) throw ApiError.badRequest(MESSAGES.MISSING_CREDENTIALS);

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    // Same error for "no such user" and "wrong password" — do not leak which.
    if (!user) throw ApiError.unauthorized(MESSAGES.INVALID_CREDENTIALS);

    const valid = await verifyPassword(user, password);
    if (!valid) throw ApiError.unauthorized(MESSAGES.INVALID_CREDENTIALS);

    return { user: user.toSafeJSON(), accessToken: signToken(user) };
};

const register = async ({ fullName, email, password }) => {
    if (!email || !password) throw ApiError.badRequest(MESSAGES.MISSING_CREDENTIALS);

    const normalisedEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ email: normalisedEmail });
    if (existing) throw ApiError.conflict(MESSAGES.USER_EXISTS);

    const user = await User.create({
        fullName,
        email: normalisedEmail,
        password: await hashPassword(password),
    });

    return { user: user.toSafeJSON(), accessToken: signToken(user) };
};

module.exports = { login, register };
