const swaggerJsDoc = require('swagger-jsdoc');

const port = process.env.PORT || 3000;

const jokeSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer', example: 1 },
    setup: { type: 'string', example: 'Why do programmers prefer dark mode?' },
    punchline: { type: 'string', example: 'Because light attracts bugs!' },
    category: { type: 'string', example: 'general' },
    difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] }
  }
};

const errorSchema = {
  type: 'object',
  properties: {
    message: { type: 'string' },
    status: { type: 'integer' }
  }
};

const statisticsSchema = {
  type: 'object',
  properties: {
    uptime: { type: 'integer', description: 'API uptime in seconds' },
    requests: { type: 'integer', description: 'Total number of requests' },
    lastDowntime: { type: 'string', description: 'Last recorded downtime' },
    startedAt: { type: 'string', format: 'date-time', description: 'API start time' }
  }
};

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dev Jokes API',
      version: '1.0.0',
      description: 'A free API for developer jokes',
      contact: {
        name: 'API Support',
        email: 'support@devjokes.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Development server'
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
          schema: { type: 'integer', default: 1 },
          description: 'Page number'
        },
        limitParam: {
          in: 'query',
          name: 'limit',
          schema: { type: 'integer', default: 10 },
          description: 'Number of items per page'
        }
      }
    }
  },
  apis: ['./scripts/index.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
