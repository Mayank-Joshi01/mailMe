const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({
    ProjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    UserId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // This allows ANY nested JSON structure
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        default: {}
    },
    createdAt: {    
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Entries", EntrySchema);