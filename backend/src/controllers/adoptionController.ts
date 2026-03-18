import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Adoption from '../models/Adoption';
import Pet from '../models/Pet';

// @desc    Apply for pet adoption
// @route   POST /api/adoptions
// @access  Private (User only)
export const applyForAdoption = async (req: AuthRequest, res: Response) => {
  try {
    const { petId, message } = req.body;
    const applicantId = req.user?._id;

    // 1. Check if pet exists and is available
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ success: false, message: 'Pet not found' });
    }
    if (pet.status !== 'available') {
      return res.status(400).json({ success: false, message: 'Pet is no longer available for adoption' });
    }

    // 2. Prevent duplicate applications for the same pet by same user
    const existingApplication = await Adoption.findOne({ pet: petId, applicant: applicantId });
    if (existingApplication) {
      return res.status(400).json({ success: false, message: 'You have already applied to adopt this pet' });
    }

    // 3. Create application
    const application = new Adoption({
      pet: petId,
      applicant: applicantId,
      message,
      status: 'pending'
    });

    const savedApplication = await application.save();
    
    // Auto-update pet status to pending
    pet.status = 'pending';
    await pet.save();

    res.status(201).json({ success: true, data: savedApplication });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// @desc    Get logged in user applications
// @route   GET /api/adoptions/me
// @access  Private
export const getMyAdoptions = async (req: AuthRequest, res: Response) => {
  try {
    const applications = await Adoption.find({ applicant: req.user?._id })
      .populate('pet', 'name species breed photoUrl status')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: applications });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get all active adoption applications
// @route   GET /api/adoptions
// @access  Private/Admin
export const getAdoptions = async (req: AuthRequest, res: Response) => {
  try {
    const applications = await Adoption.find({})
      .populate('pet', 'name species breed status')
      .populate('applicant', 'name email')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Approve/Reject adoption application
// @route   PUT /api/adoptions/:id/status
// @access  Private/Admin
export const updateAdoptionStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body; // 'approved' or 'rejected'
    
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const application = await Adoption.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    // Update application status
    application.status = status;
    await application.save();

    // Side effect: update corresponding pet status
    const pet = await Pet.findById(application.pet);
    if (pet) {
      if (status === 'approved') {
        pet.status = 'adopted';
      } else if (status === 'rejected') {
        // Only set back to available if it isn't adopted by someone else
        if (pet.status !== 'adopted') {
           pet.status = 'available';
        }
      }
      await pet.save();
    }

    // If approved, we might want to auto-reject other applications for this pet (Bonus logic)
    if (status === 'approved') {
      await Adoption.updateMany(
        { pet: application.pet, _id: { $ne: application._id }, status: 'pending' },
        { status: 'rejected' }
      );
    }

    res.json({ success: true, data: application });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};
