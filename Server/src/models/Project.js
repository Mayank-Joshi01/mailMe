const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true  
    },
    description: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true,
        unique: true
    },
    allowedDomain : {
        type: String,
        required: true
    },
    targetEmail: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Project', ProjectSchema);