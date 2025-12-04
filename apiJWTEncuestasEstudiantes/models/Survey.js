// models/Survey.js
const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  text: { type: String, required: true }
});
const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, enum: ['single', 'multiple'], default: 'single' },
  options: [OptionSchema]
});

const SurveySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  questions: [QuestionSchema],
  active: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Survey', SurveySchema);
