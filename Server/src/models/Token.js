const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  tokenHash: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 900 // <--- MAGIC: Automatically deletes after 900 seconds (15 mins)
  }
});

module.exports = mongoose.model('Token', tokenSchema);