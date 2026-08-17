const mongoose = require("mongoose");

const techSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        /** Optional icon URL. Finance competencies usually have none. */
        image: { type: String, default: "", trim: true },
    },
    { _id: true },
);

/**
 * A named group of capabilities ("Valuation & Markets", "Backend & Infra").
 * The admin panel creates these freely, which is how finance competencies get
 * published alongside engineering ones without a schema change.
 */
const stackCategorySchema = new mongoose.Schema(
    {
        category: { type: String, required: true, unique: true, trim: true },
        techs: { type: [techSchema], default: [] },
        order: { type: Number, default: 0 },
    },
    { timestamps: true },
);

module.exports = mongoose.model("TechnologySchema", stackCategorySchema);
