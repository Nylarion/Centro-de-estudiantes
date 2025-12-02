// models/Survey.js
const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  votes: { type: Number, default: 0 }
});

const SurveySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  options: [OptionSchema], 
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Survey', SurveySchema);