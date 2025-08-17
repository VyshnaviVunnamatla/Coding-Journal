import express from 'express';
import { listMyProblems, createProblem, updateProblem, deleteProblem } from '../controllers/problemController.js';
import auth from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/', auth, listMyProblems);
router.post('/', auth, createProblem);
router.put('/:id', auth, updateProblem);
router.delete('/:id', auth, deleteProblem);
export default router;
