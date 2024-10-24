
import { Router } from 'express';
import { getAllStories, getStoryById, createStory, updateStory,deleteStoryById } from '../controllers/storyController';

const router = Router();


router.post('/', createStory);               // POST /stories/  -  Create a new user
router.get('/', getAllStories);              // GET /stories/  -  Get all stories
router.get('/:id', getStoryById);            // GET /stories/:id  -  Get story by ID
router.patch('/:id', updateStory);           // PATCH /stories/:id  -  Update story by ID
router.delete('/:id', deleteStoryById);      // DELETE /users/:id  -  Delete user by ID


export default router;