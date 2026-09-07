const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullName: { type: String, default: "", trim: true },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        /** Stored as a bcrypt hash. Legacy plaintext rows are upgraded on login. */
        password: { type: String, required: true },
    },
    { timestamps: true },
);

userSchema.methods.toSafeJSON = function toSafeJSON() {
    return { id: this._id, email: this.email, fullName: this.fullName };
};

module.exports = mongoose.model("User", userSchema);
