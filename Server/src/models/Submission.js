const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    ObjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    SenderEmail: {
        type: String,
        required: true,
    },
    message: { 
        type: String,
        required: true,
    },
    createdAt: {    
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Mail", UserSchema);