# Dev Jokes API 🎭

A free and open-source API that serves programming-related jokes with categories, difficulty levels, and real-time statistics.

## 🚀 Features

- RESTful API endpoints
- Joke categories and difficulty levels
- Rate limiting
- Real-time API statistics
- OpenAPI/Swagger documentation
- SDK generation support
- Beautiful statistics dashboard

## 🛠️ Tech Stack

- Node.js
- Express.js
- Swagger/OpenAPI
- HTML/CSS/JavaScript
- OpenAPI Generator

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

#### Jokes
- `GET /api/jokes` - Get all jokes (with pagination)
  - Query params: 
    - `page` (default: 1)
    - `limit` (default: 10)
    - `category` (optional)
    - `difficulty` (optional)

- `GET /api/jokes/random` - Get a random joke
- `GET /api/jokes/{id}` - Get a specific joke by ID
- `GET /api/jokes/category/{category}` - Get jokes by category
- `GET /api/jokes/difficulty/{level}` - Get jokes by difficulty level

#### Categories
- `GET /api/categories` - Get all available categories

#### Statistics
- `GET /api/statistics` - Get API usage statistics

### Rate Limiting
- 100 requests per 15 minutes per IP address

## 📊 Available Pages

1. API Statistics Dashboard
```
http://localhost:3000
```

2. API Documentation (Swagger UI)
```
http://localhost:3000/docs
```

## 🚦 Getting Started

1. Clone the repository
```bash
git clone https://github.com/HOTHEAD01TH/dev-jokes-api.git
```

2. Install dependencies
```bash
cd dev-jokes-api
npm install
```

3. Start the server
```bash
npm start
```

## 🔧 SDK Generation

Generate JavaScript SDK:
```bash
# Start the server first
npm start

# In a new terminal
npm run generate-sdk
```

Generate TypeScript SDK:
```bash
npm run generate-sdk-typescript
```

## 🔧 SDK Usage

The API comes with a pre-generated JavaScript SDK for easy integration.

### Installation

```bash
# Clone the repository
git clone https://github.com/HOTHEAD01TH/dev-jokes-api.git

# Install dependencies
cd dev-jokes-api
npm install

# Install SDK dependencies
cd sdk/javascript
npm install
```

### Using the SDK

```javascript
const DevJokesApi = require('./sdk/javascript');

// Initialize the API client
const apiClient = new DevJokesApi.ApiClient();
apiClient.basePath = 'http://localhost:3000';

// Create API instances
const jokesApi = new DevJokesApi.JokesApi(apiClient);
const categoriesApi = new DevJokesApi.CategoriesApi(apiClient);
const statisticsApi = new DevJokesApi.StatisticsApi(apiClient);

// Get a random joke
jokesApi.apiJokesRandomGet((error, data, response) => {
  if (!error) {
    console.log(data);
  }
});

// Get jokes by category
jokesApi.apiJokesCategoryCategoryGet('programming', (error, data, response) => {
  if (!error) {
    console.log(data);
  }
});

// Get API statistics
statisticsApi.apiStatisticsGet((error, data, response) => {
  if (!error) {
    console.log(data);
  }
});
```

### Available SDK Methods

- `jokesApi.apiJokesGet(page, limit, callback)` - Get all jokes
- `jokesApi.apiJokesRandomGet(callback)` - Get random joke
- `jokesApi.apiJokesIdGet(id, callback)` - Get joke by ID
- `jokesApi.apiJokesCategoryCategoryGet(category, callback)` - Get jokes by category
- `jokesApi.apiJokesDifficultyLevelGet(level, callback)` - Get jokes by difficulty
- `categoriesApi.apiCategoriesGet(callback)` - Get all categories
- `statisticsApi.apiStatisticsGet(callback)` - Get API statistics

## 📝 Example Usage

```javascript
// Using fetch
fetch('http://localhost:3000/api/jokes/random')
  .then(response => response.json())
  .then(joke => console.log(joke));

// Using generated SDK (TypeScript)
import { Configuration, DefaultApi } from './sdk/typescript';

const api = new DefaultApi(new Configuration({
  basePath: 'http://localhost:3000'
}));

api.getRandomJoke()
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

