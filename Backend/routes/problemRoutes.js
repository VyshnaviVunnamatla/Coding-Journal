import express from "express";
import Problem from "../models/Problem.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all problems for logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const problems = await Problem.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch problems", error: err });
  }
});

// POST new problem
router.post("/", protect, async (req, res) => {
  const { title, description, code, difficulty } = req.body;

  try {
    const newProblem = new Problem({
      title,
      description,
      code,
      difficulty,
      user: req.user._id,
    });
    await newProblem.save();
    res.status(201).json(newProblem);
  } catch (err) {
    res.status(400).json({ message: "Failed to add problem", error: err });
  }
});

// PUT update problem
router.put("/:id", protect, async (req, res) => {
  const { title, description, code, difficulty } = req.body;

  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem || problem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    problem.title = title;
    problem.description = description;
    problem.code = code;
    problem.difficulty = difficulty;

    const updated = await problem.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err });
  }
});

// DELETE problem
router.delete("/:id", protect, async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem || problem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await problem.deleteOne();
    res.json({ message: "Problem deleted" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err });
  }
});

export default router;
