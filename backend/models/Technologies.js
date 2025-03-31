const mongoose = require("mongoose");

const TechnologySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        unique: true,
    },
    technologies: {
        type: [String],
        default: [],
    },
});

module.exports = mongoose.model("Technology", TechnologySchema);