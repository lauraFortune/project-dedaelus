
import { Router } from 'express';
import { registerUser, loginUser, getAllUsers, getUserById, updateUserProfile, deleteUserById } from '../controllers/userController';
import { auth } from '../utils/authMiddleware';
import { validateRegister, validateLogin } from '../utils/validationMiddleware';

const router = Router();

// Public Routes

/**  
 * @openapi
 * /users:
 *  post:
 *    summary: Register a new user
 *    tags: 
 *      - Users
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/RegisterUser'
 *    responses:
 *      '201':
 *        description: User created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      '400':
 *        description: All fields (username, email, password) are required
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *      '409':
 *        description: Username or Email already exists
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *      '500':
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', validateRegister, registerUser);      

/**
 * @openapi
 * /users/login:
 *  post:
 *    summary: Authenticate a user
 *    tags:
 *      - Users
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LoginUser'
 *    responses:
 *      '200':
 *        description: User authenticated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginResponse'
 *      '401':
 *        description: Invalid credentials
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *      '500':
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
*/
router.post('/login', validateLogin, loginUser); 

// Protected routes
/**
 * @openapi
 * /users:
 *  get:
 *    summary: Get all users
 *    tags:
 *      - Users
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      '200':
 *        description: Successfully retrieved all users
 *        content: 
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 *      '401':
 *        description: Not authorised, invalid or missing token
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *      '500':
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
*/
router.get('/', auth, getAllUsers);    

/**
 * @openapi
 * /users/{id}:
 *  get:
 *    summary: Get user by ID
 *    tags:
 *      - Users
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the user to retrieve
 *    responses:
 *      '200':
 *        description: Successfully retrieved user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      '401':
 *        description: Not authorised, invalid or missing token
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *      '404':
 *        description: User not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *      '500':
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
*/
router.get('/:id', auth, getUserById);

/**
 * @openapi
 * /users/{id}:
 *  patch:
 *    summary: Partial update user by ID
 *    tags:
 *      - Users
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema: 
 *          type: string
 *        description: ID of the user to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UpdateUser'
 *    responses:
 *      '200':
 *        description: Successfully updated user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      '400':
 *        description: Invalid input data
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *      '401':
 *        description: Not authorised, invalid or missing token
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *      '404':
 *        description: User not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *      '500':
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
*/
router.patch('/:id', auth, updateUserProfile);  

/**
 * @openapi
 * /users/{id}:
 *  delete:
 *    summary: Delete user by ID
 *    tags:
 *      - Users
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the user to delete
 *    responses:
 *      '200':
 *        description: User successfully deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DeleteResponse'
 *      '401':
 *        description: Not authorised, invalid or missing token
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *      '404':
 *        description: User not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *      '500':
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
*/
router.delete('/:id', auth, deleteUserById);


export default router;

