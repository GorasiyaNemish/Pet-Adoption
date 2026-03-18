import express from 'express';
import { 
  applyForAdoption, 
  getMyAdoptions, 
  getAdoptions, 
  updateAdoptionStatus 
} from '../controllers/adoptionController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// @route   GET /api/adoptions/me
// @desc    Get logged in user applications
// @access  Private (user and admin both can have access, typically user)
router.get('/me', protect, getMyAdoptions);

// @route   POST /api/adoptions
// @desc    Apply for pet adoption
// @access  Private (specifically those with 'user' role)
router.post('/', protect, authorize('user'), applyForAdoption);

// @route   GET /api/adoptions
// @desc    Get all adoption applications
// @access  Private (Admin only)
router.get('/', protect, authorize('admin'), getAdoptions);

// @route   PUT /api/adoptions/:id/status
// @desc    Update adoption status
// @access  Private (Admin only)
router.put('/:id/status', protect, authorize('admin'), updateAdoptionStatus);

export default router;
