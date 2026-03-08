const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    // 2. Add an Auth Provider flag so you know how they registered
    authProvider: { 
        type: String, 
        enum: ['local', 'google'], // 'local' means email/password
        default: 'local' 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", UserSchema);