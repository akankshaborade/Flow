const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  // Each client belongs to a specific user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  company: {
    type: String,
    trim: true,
  },
  notes: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);