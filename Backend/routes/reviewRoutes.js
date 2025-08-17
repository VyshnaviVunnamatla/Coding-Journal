import express from 'express';
import { reviewCode } from '../controllers/reviewController.js';
import auth from '../middleware/authMiddleware.js';
const router = express.Router();
router.post('/review', auth, reviewCode);
export default router;
