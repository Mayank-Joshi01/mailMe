const mongoose = require("mongoose");

const UserSummarySchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true // One summary per user
    },
    totalEntries: { type: Number, default: 0 },
    totalProjects: { type: Number, default: 0 },
    activeProjects: { type: Number, default: 0 }
});

module.exports = mongoose.model("UserSummary", UserSummarySchema);