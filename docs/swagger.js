const swaggerJsDoc = require('swagger-jsdoc');

const port = process.env.PORT || 3000;

const jokeSchema = {
  type: 'object',
  required: ['id', 'setup', 'punchline', 'category', 'difficulty'],
  properties: {
    id: { type: 'integer', example: 1, description: 'Unique identifier for the joke' },
    setup: { type: 'string', example: 'Why do programmers prefer dark mode?', description: 'The setup/question part of the joke' },
    punchline: { type: 'string', example: 'Because light attracts bugs!', description: 'The punchline/answer part of the joke' },
    category: { type: 'string', example: 'general', description: 'The category the joke belongs to' },
    difficulty: { 
      type: 'string', 
      enum: ['easy', 'medium', 'hard'],
      description: 'The difficulty level of understanding the joke'
    }
  }
};

const errorSchema = {
  type: 'object',
  required: ['message'],
  properties: {
    message: { type: 'string', description: 'Error message describing what went wrong' },
    status: { type: 'integer', description: 'HTTP status code', example: 404 }
  }
};

const statisticsSchema = {
  type: 'object',
  required: ['uptime', 'requests', 'status'],
  properties: {
    uptime: { type: 'integer', description: 'API uptime in seconds' },
    requests: { type: 'integer', description: 'Total number of API requests made' },
    lastDowntime: { type: 'string', description: 'Last recorded downtime of the API' },
    status: { type: 'string', enum: ['live', 'down'], description: 'Current API status' }
  }
};

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dev Jokes API',
      version: '1.0.0',
      description: 'A free and open-source API that serves programming-related jokes with categories and difficulty levels.',
      contact: {
        name: 'HOTHEAD01TH',
        url: 'https://github.com/HOTHEAD01TH'
      },
      license: {
        name: 'ISC',
        url: 'https://github.com/HOTHEAD01TH/dev-jokes-api/blob/main/LICENSE'
      }
    },
    servers: [
      {
        url: 'https://dev-jokes-api.onrender.com',
        description: 'Production server'
      },
      {
        url: `http://localhost:${port}`,
        description: 'Local development server'
      }
    ],
    tags: [
      {
        name: 'Jokes',
        description: 'Endpoints for retrieving developer jokes'
      },
      {
        name: 'Categories',
        description: 'Endpoints for joke categories'
      },
      {
        name: 'Statistics',
        description: 'API usage statistics and health monitoring'
      }
    ],
    components: {
      schemas: {
        Joke: jokeSchema,
        Error: errorSchema,
        Statistics: statisticsSchema
      },
      parameters: {
        pageParam: {
          in: 'query',
          name: 'page',
          schema: { type: 'integer', default: 1, minimum: 1 },
          description: 'Page number for pagination'
        },
        limitParam: {
          in: 'query',
          name: 'limit',
          schema: { type: 'integer', default: 10, minimum: 1, maximum: 50 },
          description: 'Number of items per page (max: 50)'
        }
      }
    },
    externalDocs: {
      description: 'GitHub Repository',
      url: 'https://github.com/HOTHEAD01TH/dev-jokes-api'
    }
  },
  apis: ['./scripts/index.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
