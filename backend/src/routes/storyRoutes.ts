
import { Router } from 'express';
import { getAllStories, getStoryById, createStory, updateStory,deleteStoryById } from '../controllers/storyController';
import { auth } from '../utils/authMiddleware';

const router = Router();

/**
 * @openapi
 * /stories:
 *  post:
 *    summary: Create a new story
 *    tags:
 *      - Stories
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      '201':
 *        description: Story created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Story'
 *      '401':
 *        description: User not authenticated
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
router.post('/', auth, createStory);

/**
 * @openapi
 * /stories:
 *  get:
 *    summary: Get all stories
 *    tags:
 *      - Stories
 *    responses:
 *      '200': 
 *        description: Successfully retrieved all stories
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Story'
 *      '500':
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'  
*/
router.get('/', getAllStories);

/**
 * @openapi
 * /stories/{id}:
 *  get:
 *    summary: Get Story by ID
 *    tags:
 *      - Stories
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the story to retrieve
 *    responses:
 *      '200':
 *        description: Successfully retrieved the story
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Story'
 *      '404':
 *        description: Story not found
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
router.get('/:id', getStoryById);            

/**
 * @openapi
 * /stories/{id}:
 *  patch:
 *    summary: Partial update story by ID
 *    tags:
 *      - Stories
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the story to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UpdateStory'
 *    responses:
 *      '200':
 *        description: Successfully updated story
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Story'
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
 *        description: Story not found
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
router.patch('/:id', auth, updateStory);

/**
 * @openapi
 * /stories/{id}:
 *  delete:
 *    summary: Delete story by ID
 *    tags:
 *      - Stories
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the story to delete
 *    responses:
 *      '200':
 *        description: Story successfully deleted
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
 *        description: Story not found
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
router.delete('/:id', auth, deleteStoryById);


export default router;