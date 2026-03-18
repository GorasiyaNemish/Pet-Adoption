import { Request, Response } from 'express';
import Pet from '../models/Pet';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Get all pets (with search, filter, pagination)
// @route   GET /api/pets
// @access  Public
export const getPets = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Search and Filter query builder
    const query: any = {};

    // 1. Search by name or breed
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search as string, 'i');
      query.$or = [{ name: searchRegex }, { breed: searchRegex }];
    }

    // 2. Filter by exact species
    if (req.query.species) {
      query.species = req.query.species;
    }

    // 3. Filter by exact breed
    if (req.query.breed) {
      query.breed = req.query.breed;
    }

    // 4. Filter by max/min age
    if (req.query.minAge || req.query.maxAge) {
      query.age = {};
      if (req.query.minAge) query.age.$gte = parseInt(req.query.minAge as string);
      if (req.query.maxAge) query.age.$lte = parseInt(req.query.maxAge as string);
    }

    // 5. Filter by status (default to available if public, unless specified)
    if (req.query.status) {
      query.status = req.query.status;
    } else {
      query.status = 'available'; // Default for public visitors
    }

    const pets = await Pet.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await Pet.countDocuments(query);

    res.json({
      success: true,
      data: pets,
      meta: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get single pet
// @route   GET /api/pets/:id
// @access  Public
export const getPetById = async (req: Request, res: Response) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (pet) {
      res.json({ success: true, data: pet });
    } else {
      res.status(404).json({ success: false, message: 'Pet not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create a pet
// @route   POST /api/pets
// @access  Private/Admin
export const createPet = async (req: AuthRequest, res: Response) => {
  try {
    const pet = new Pet(req.body);
    const createdPet = await pet.save();
    
    res.status(201).json({ success: true, data: createdPet });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message || 'Invalid pet data' });
  }
};

// @desc    Update a pet
// @route   PUT /api/pets/:id
// @access  Private/Admin
export const updatePet = async (req: AuthRequest, res: Response) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (pet) {
      // Update fields
      const { name, species, breed, age, gender, description, status, photoUrl } = req.body;

      pet.name = name || pet.name;
      pet.species = species || pet.species;
      pet.breed = breed || pet.breed;
      pet.age = age !== undefined ? age : pet.age;
      pet.gender = gender || pet.gender;
      pet.description = description || pet.description;
      pet.status = status || pet.status;
      pet.photoUrl = photoUrl || pet.photoUrl;

      const updatedPet = await pet.save();
      res.json({ success: true, data: updatedPet });
    } else {
      res.status(404).json({ success: false, message: 'Pet not found' });
    }
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message || 'Invalid update data' });
  }
};

// @desc    Delete a pet
// @route   DELETE /api/pets/:id
// @access  Private/Admin
export const deletePet = async (req: AuthRequest, res: Response) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (pet) {
      await pet.deleteOne();
      res.json({ success: true, message: 'Pet removed' });
    } else {
      res.status(404).json({ success: false, message: 'Pet not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
