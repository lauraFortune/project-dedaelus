
import { Router } from 'express';
import { getAllStories, getStoryById, createStory, updateStory,deleteStoryById } from '../controllers/storyController';

const router = Router();

// Get all stories
router.get('/stories', getAllStories);

// Get story by ID
router.get('/stories/:id', getStoryById);

// Create a new story
router.post('/stories', createStory);

// Update Story by ID - PATCH for partial update
router.patch('/stories/:id', updateStory);

// Delete Story by ID
router.delete('/stories/:id', deleteStoryById);



export default router;