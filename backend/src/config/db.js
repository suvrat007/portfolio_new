const mongoose = require("mongoose");

const { env } = require("./env");

/**
 * Render's free tier cold-starts often. Failing fast (rather than buffering
 * queries for 30s) lets the API answer with a cached payload instead of hanging.
 */
const CONNECT_OPTIONS = {
    serverSelectionTimeoutMS: 8_000,
    socketTimeoutMS: 20_000,
    maxPoolSize: 10,
};

const connectDatabase = async () => {
    mongoose.set("strictQuery", true);
    await mongoose.connect(env.MONGO_URI, CONNECT_OPTIONS);
    return mongoose.connection;
};

const isDatabaseReady = () => mongoose.connection.readyState === 1;

const disconnectDatabase = () => mongoose.disconnect();

module.exports = { connectDatabase, disconnectDatabase, isDatabaseReady };
