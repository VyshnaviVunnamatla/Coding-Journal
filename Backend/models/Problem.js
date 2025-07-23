import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  code: String,
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Easy" }
}, { timestamps: true });

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
