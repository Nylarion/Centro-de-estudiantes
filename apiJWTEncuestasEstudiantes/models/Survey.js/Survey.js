import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    options: [{ type: String, required: true }]
});

const SurveySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    questions: [QuestionSchema],
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
});

export default mongoose.model("Survey", SurveySchema);
export const Question = mongoose.model("Question", QuestionSchema);