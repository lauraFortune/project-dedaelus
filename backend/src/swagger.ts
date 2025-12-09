
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {

    openapi: '3.0.0',

    info: {
      title: 'Project Dedaelus',
      version: '1.0.0',
      description: 'API documentation for Project Dedaelus'
    },

    servers: [
      {
        url: 'http://localhost:3001/api',
        description: 'Development Server',
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },

      schemas: {

        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '64b8cbd8f08d7b1a2e9e3fbd' },
            username: { type: 'string', example: 'janeDoe' },
            email: { type: 'string', example: 'janeDoe@email.com'},
            admin: { type: 'boolean', example: false },
            profileImage: { type: 'string', example: 'defaultImage.png' },
            bio: { type: 'string', example: 'All about me...' },
            stories: { type: 'array', items: { type: 'string', example: '64b8cbd8f08d7b1a2e9e3fbe' } },
            favouriteStories: { type: 'array', items: { type: 'string', example: '64b8cbd8f08d7b1a2e9e3fbf' }},
            createdAt: { type: 'string',  format: 'date-time'},
            updatedAt: { type: 'string',  format: 'date-time'},
          }
        },

        RegisterUser: {
          type: 'object',
          required: ['username', 'email', 'password'],
          properties: {
            username: { type: 'string', example: 'janeDoe' },
            email: { type: 'string', example: 'janeDoe@email.com'},
            password: { type: 'string', example: '1tsAsecret!' },
          }
        },

        LoginUser: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', example: 'janeDoe@email.com' },
            password: { type: 'string', example: '1tsAsecret!' },
          }
        },

        LoginResponse: {
          type: 'object',
          properties: {
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            email: { type: 'string', example: 'janeDoe@email.com' },
            userId: { type: 'string', example: '64b8cbd8f08d7b1a2e9e3fbd' },
          }
        },

        UpdateUser: {
          type: 'object',
          properties: {
            username: { type: 'string', example: 'janeDoe' },
            profileImage: { type: 'string', example: 'defaultImage.png' },
            bio: { type: 'string', example: 'All about me...' },
          }
        },

        DeleteResponse: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Resource successfully deleted' }
          }
        },

        ErrorResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'error' },
            message: { type: 'string', example: 'An error occurred' },
            statusCode: { type: 'integer', example: 400 },
            stack: { type: 'string', example: 'Error stack trace' }
          }
        },

        Story: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '22a9ccd1g39c2b2b5d8a7fda' },
            title: { type: 'string', example: 'Once Upon a Time....' },
            synopsis: { type: 'string', example: 'Our story begins in ....' },
            author: { type: 'string', example: '64b8cbd8f08d7b1a2e9e3fbd' },
            likes: { type: 'array', items: { type: 'string', example: '51b0aba2g39c1b2b5d2a7c5c' }},
            publish: { type: 'boolean', example: false},
            chapters: { type: 'array', items: { $ref: '#/components/schemas/Chapter' }},
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          }
        },

        Choice: {
          type: 'object',
          properties: {
            text: { type: 'string', example: 'Choice' },
            targetChapter: { type: 'number', example: 0 },
            targetScene: { type: 'number', example: 0 },
          }
        },

        Scene: {
          type: 'object',
          properties: {
            title: { type: 'string', example: 'Scene 1' },
            image: { type: 'string', example: '_defaultScene.png' },
            description: { type: 'string', example: 'Please enter a description....' },
            prompt: { type: 'string', example: 'Please enter a prompt....' },
            choices: {
              type: 'array',
              items: { $ref: '#/components/schemas/Choice' }
            }
          }
        },

        Chapter: {
          type: 'object',
          properties: {
            scenes: {
              type: 'array',
              items: { $ref: '#/components/schemas/Scene' }
            }
          }
        },

        UpdateStory: {
          type: 'object',
          properties: {
            title: { type: 'string', example: 'Once Upon a Time....' },
            synopsis: { type: 'string', example: 'Our story begins in ....' },
            publish: { type: 'boolean', example: false},
            chapters: { type: 'array', items: { $ref: '#/components/schemas/Chapter' }},
          }
        },

      }
    }
  },
  apis: ['./src/routes/*.ts'], // files containing annotations
}

export const openapiSpecification = swaggerJsdoc(options);