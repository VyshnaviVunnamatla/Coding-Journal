import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  topics: { type: [String], default: [] },
  difficulty: { type: String, enum: ['Easy','Medium','Hard'], default: 'Easy' },
  code: { type: String, default: '' },
  language: { type: String, default: 'javascript' }
}, { timestamps: true });

export default mongoose.model('Problem', problemSchema);
