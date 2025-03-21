const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../docs/swagger');
const jokes = require('../data/jokes.json');
const rateLimit = require('express-rate-limit');
const statistics = require('./statistics');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(limiter);
app.use(express.static(path.join(__dirname, '../public')));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Track requests
app.use((req, res, next) => {
  // Only increment counter for API requests
  if (req.path.startsWith('/api/')) {
    statistics.incrementRequests();
  }
  next();
});

// Helper function for pagination
const paginate = (array, page = 1, limit = 10) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  return array.slice(startIndex, endIndex);
};

/**
 * @swagger
 * /api/jokes:
 *   get:
 *     summary: Returns jokes with pagination
 *     tags: [Jokes]
 *     parameters:
 *       - $ref: '#/components/parameters/pageParam'
 *       - $ref: '#/components/parameters/limitParam'
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *         description: Filter by difficulty
 *     responses:
 *       200:
 *         description: List of jokes
 */
app.get('/api/jokes', (req, res) => {
  let filteredJokes = [...jokes.jokes];
  const { page = 1, limit = 10, category, difficulty } = req.query;

  if (category) {
    filteredJokes = filteredJokes.filter(joke => joke.category === category);
  }
  if (difficulty) {
    filteredJokes = filteredJokes.filter(joke => joke.difficulty === difficulty);
  }

  const paginatedJokes = paginate(filteredJokes, parseInt(page), parseInt(limit));
  
  res.json({
    data: paginatedJokes,
    pagination: {
      total: filteredJokes.length,
      page: parseInt(page),
      pages: Math.ceil(filteredJokes.length / limit)
    }
  });
});

/**
 * @swagger
 * /api/jokes/category/{category}:
 *   get:
 *     summary: Get jokes by category
 *     tags: [Jokes]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Joke category
 *     responses:
 *       200:
 *         description: List of jokes in category
 */
app.get('/api/jokes/category/:category', (req, res) => {
  const categoryJokes = jokes.jokes.filter(joke => joke.category === req.params.category);
  if (!categoryJokes.length) {
    return res.status(404).json({ message: 'No jokes found in this category' });
  }
  res.json(categoryJokes);
});

/**
 * @swagger
 * /api/jokes/difficulty/{level}:
 *   get:
 *     summary: Get jokes by difficulty
 *     tags: [Jokes]
 *     parameters:
 *       - in: path
 *         name: level
 *         required: true
 *         schema:
 *           type: string
 *           enum: [easy, medium, hard]
 *         description: Difficulty level
 *     responses:
 *       200:
 *         description: List of jokes by difficulty
 */
app.get('/api/jokes/difficulty/:level', (req, res) => {
  const difficultyJokes = jokes.jokes.filter(joke => joke.difficulty === req.params.level);
  if (!difficultyJokes.length) {
    return res.status(404).json({ message: 'No jokes found for this difficulty' });
  }
  res.json(difficultyJokes);
});

/**
 * @swagger
 * /api/jokes/random:
 *   get:
 *     summary: Get a random joke
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: A random joke
 */
app.get('/api/jokes/random', (req, res) => {
  if (!jokes.jokes.length) {
    return res.status(404).json({ message: 'No jokes available' });
  }
  const randomJoke = jokes.jokes[Math.floor(Math.random() * jokes.jokes.length)];
  res.json(randomJoke);
});

/**
 * @swagger
 * /api/jokes/{id}:
 *   get:
 *     summary: Get a joke by ID
 *     tags: [Jokes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Joke ID
 *     responses:
 *       200:
 *         description: A single joke
 *       404:
 *         description: Joke not found
 */
app.get('/api/jokes/:id', (req, res) => {
  const joke = jokes.jokes.find(j => j.id === parseInt(req.params.id));
  if (!joke) {
    return res.status(404).json({ message: 'Joke not found' });
  }
  res.json(joke);
});

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all joke categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 */
app.get('/api/categories', (req, res) => {
  res.json(jokes.categories);
});

/**
 * @swagger
 * /api/statistics:
 *   get:
 *     summary: Get API usage statistics
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: API statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Statistics'
 */
app.get('/api/statistics', (req, res) => {
  res.json(statistics.getStatistics());
});

// Add this route before the swagger UI setup
app.get('/docs-json', (req, res) => {
  res.json(swaggerDocs);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger documentation available at http://localhost:${port}/docs`);
});
