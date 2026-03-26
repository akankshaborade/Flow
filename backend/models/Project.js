const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  // Project belongs to a user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Project is linked to a client
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  deadline: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'on-hold'],
    default: 'active',
  },
  // Payment tracking
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending',
  },
  amount: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);