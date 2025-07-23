import express from "express";
import Problem from "../models/Problem.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();


// GET all problems
router.get("/", async (req, res) => {
  const problems = await Problem.find().sort({ createdAt: -1 });
  res.json(problems);
});

// POST new problem
router.post("/", async (req, res) => {
  const { title, description, code, difficulty } = req.body;

  try {
    const newProblem = new Problem({ title, description, code, difficulty });
    await newProblem.save();
    res.status(201).json(newProblem);
  } catch (err) {
    res.status(400).json({ message: "Failed to add problem", error: err });
  }
});

// PUT update problem
router.put("/:id", async (req, res) => {
  const { title, description, code, difficulty } = req.body;

  try {
    const updated = await Problem.findByIdAndUpdate(
      req.params.id,
      { title, description, code, difficulty },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err });
  }
});

// DELETE problem
router.delete("/:id", async (req, res) => {
  try {
    await Problem.findByIdAndDelete(req.params.id);
    res.json({ message: "Problem deleted" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err });
  }
});

export default router;
