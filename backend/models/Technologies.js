const mongoose = require("mongoose");
const TechnologySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        unique: true,
    },
    techs: [
        {
            name: { type: String, required: true },
            image: { type: String, required: true },
        },
    ],
});

module.exports = mongoose.model('TechnologySchema', TechnologySchema);

