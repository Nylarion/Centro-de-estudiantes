// models/Answer.js
const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
    selectedOptions: [{ type: mongoose.Schema.Types.ObjectId, required: true }]
});

const AnswerSchema = new mongoose.Schema({
    surveyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    responses: [ResponseSchema]
}, { timestamps: true });

module.exports = mongoose.model('Answer', AnswerSchema);