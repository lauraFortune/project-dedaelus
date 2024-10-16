
import 'dotenv/config';
import express from 'express';
const cors = require('cors');
import { errorHandler, unkownEndpoint } from './utils/errorHandler';

// Initialise expres app
const app = express(); 

// Middleware
app.use(express.json());   // Parse incoming requests with JSON payloads.
app.use(cors());           // Cross-Origin Resource Sharing - allows client-side requests to access server resources.


// Custom Middleware
app.use(unkownEndpoint);   // Catch unkown endpoints
app.use(errorHandler);     // Last stop error handler

export default app;