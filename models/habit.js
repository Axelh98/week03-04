const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  startDate: { type: Date, required: true },
  goal: { type: String, required: true },
  frequency: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Inactive', 'Completed'], default: 'Active' },
  streak: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Habit = mongoose.model('Habit', habitSchema);
module.exports = Habit;


