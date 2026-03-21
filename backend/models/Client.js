const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  notes: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Link to the user!
}, { timestamps: true });

module.exports = mongoose.model("Client", clientSchema);