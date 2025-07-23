const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  code: { type: String },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Easy" },
}, { timestamps: true });

module.exports = mongoose.model("Problem", problemSchema);
