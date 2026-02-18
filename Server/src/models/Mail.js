const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    SenderEmail: {
        type: String,
        required: true,
    },
    RecipientEmail: {
        type: String,
        required: true,
    },
    Subject: {
        type: String,
        required: true,
    },
    Body: { 
        type: String,
        required: true,
    },
    createdAt: {    
        type: Date,
        default: Date.now
    }
});