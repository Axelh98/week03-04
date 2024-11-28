const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  startDate: { type: Date, default: Date.now },
  frequency: { type: String },
  goal: { type: String },
  status: { type: String, default: 'active' },
  streak: { type: Number, default: 0 },
});

module.exports = mongoose.model('Habit', habitSchema);
