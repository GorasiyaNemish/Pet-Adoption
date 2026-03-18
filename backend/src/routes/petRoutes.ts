import express from 'express';
import { 
  getPets, 
  getPetById, 
  createPet, 
  updatePet, 
  deletePet 
} from '../controllers/petController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getPets)
  .post(protect, authorize('admin'), createPet);

router.route('/:id')
  .get(getPetById)
  .put(protect, authorize('admin'), updatePet)
  .delete(protect, authorize('admin'), deletePet);

export default router;
