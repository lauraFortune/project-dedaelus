
import 'dotenv/config';
import express from 'express';
const cors = require('cors');
import userRoutes from './routes/userRoutes';
import storyRoutes from './routes/storyRoutes';
import { errorHandler, unknownEndpoint } from './utils/errorHandler';
import swaggerUi from 'swagger-ui-express';
import { openapiSpecification } from './swagger';

// Initialise expres app
const app = express(); 

// Middleware
app.use(express.json());   // Parse incoming requests with JSON payloads.
app.use(cors());           // Cross-Origin Resource Sharing - allows client-side requests to access server resources.

// Server Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/stories', storyRoutes);

// Custom Middleware
app.use(unknownEndpoint);   // Catch unkown endpoints
app.use(errorHandler);      // Last stop error handler

export default app;