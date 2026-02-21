const mongoose = require('mongoose');

const pendingUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }, // Already hashed!
  tokenHash: { type: String, required: true },
  createdAt: { 
    type: Date, 
    default: Date.now, 
    expires: '24h' // Automatically deletes if not verified within a day
  }
});

module.exports = mongoose.model('PendingUser', pendingUserSchema);