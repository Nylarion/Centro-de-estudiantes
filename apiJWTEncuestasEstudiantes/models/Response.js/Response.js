import mongoose from "mongoose";

const ResponseSchema = new mongoose.Schema({
    survey: { type: mongoose.Schema.Types.ObjectId, ref: "Survey", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    answers: [{
        questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
        answer: { type: String, required: true }
    }],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Response", ResponseSchema);
