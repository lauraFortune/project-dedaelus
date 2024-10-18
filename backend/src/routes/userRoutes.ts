
import { Router } from 'express';
import { registerUser, loginUser, getAllUsers, getUserById, updateUserProfile, deleteUserById } from '../controllers/userController';


const router = Router();


// Create a New User - Register
router.post('/users', registerUser);

// Authenticate a User - Login 
router.post('/users/login', loginUser);

// Get all Users
router.get('/users', getAllUsers);

// Get User by ID
router.get('/users/:id', getUserById);

// Update User by ID - PATCH for partial update
router.patch('/users/:id', updateUserProfile);

// Delete User by ID
router.delete('/users/:id', deleteUserById);




export default router;

