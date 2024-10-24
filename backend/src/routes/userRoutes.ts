
import { Router } from 'express';
import { registerUser, loginUser, getAllUsers, getUserById, updateUserProfile, deleteUserById } from '../controllers/userController';
import { auth } from '../utils/authMiddleware';

const router = Router();


// Public Routes
router.post('/', registerUser);                       // POST /users/  -  Register, create a new user
router.post('/login', loginUser);                     // POST /users/login  -  Login, authenticate a user

// Protected routes
router.get('/', auth, getAllUsers);                   // GET /users/  -  Get all users
router.get('/users/:id', auth, getUserById);          // GET /users/:id  -  Get user by ID
router.patch('/:id', auth, updateUserProfile);        // PATCH /users/:id  -  Update user by ID
router.delete('/:id', auth, deleteUserById);          // DELETE /users/:id  -  Delete user by ID


export default router;

