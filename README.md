# 📦 Week 2: Express.js RESTful API

## 🚀 Project Objective

Build a RESTful API using Express.js that supports standard CRUD operations, middleware (logger, authentication, validation), error handling, and advanced features like filtering, pagination, and search.

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- UUID (for unique IDs)
- dotenv (for environment variables)
- body-parser

## 📁 Project Structure

```stack
.
├── server.js
├── routes/
│   └── products.js
├── middleware/
│   ├── logger.js
│   ├── auth.js
│   ├── validateProduct.js
│   └── errorHandler.js
├── utils/
│   └── errors/
│       └── NotFoundError.js
├── .env.example
├── README.md
├── package.json
└── node_modules/
```

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/PLP-MERN-Stack-Development/week-2-express-js-assignment-Elyson25.git
cd week-2-express-js-assignment-Elyson25
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Copy from `.env.example` and set your API key:

```env
PORT=3000
API_KEY=your_secret_key_here
```

### 4. Run the server

```bash
node server.js
```

> The server will run at: `http://localhost:3000`

## 🛣️ API Endpoints

| Method | Route                                      | Description                        |
|--------|--------------------------------------------|------------------------------------|
| GET    | `/api/products`                            | Get all products                   |
| GET    | `/api/products/:id`                        | Get product by ID                  |
| POST   | `/api/products`                            | Create a new product               |
| PUT    | `/api/products/:id`                        | Update an existing product         |
| DELETE | `/api/products/:id`                        | Delete a product                   |
| GET    | `/api/products/stats/categories`           | Get product count by category      |

## 🔍 Query Parameters (GET `/api/products`)

| Parameter | Type     | Description                       |
|-----------|----------|-----------------------------------|
| category  | string   | Filter by product category        |
| name      | string   | Search by product name (keyword)  |
| page      | integer  | Page number (for pagination)      |
| limit     | integer  | Number of items per page          |

**Example:**

```markdown
GET /api/products?category=Books&name=lamp&page=2&limit=5
```

## 🔐 Required Headers

| Header      | Value             | Required | Description                |
|-------------|-------------------|----------|----------------------------|
| x-api-key   | your_secret_key   | ✅       | For authentication         |
| Content-Type| application/json  | ✅       | For POST/PUT requests      |

## 🧪 Sample Request: POST `/api/products`

**Request Body:**

```json
{
  "name": "iPhone 15",
  "description": "Latest Apple smartphone",
  "price": 1299.99,
  "category": "Electronics",
  "inStock": true
}
```

**Sample Response:**

```json
{
  "id": "6d9a-1bd2-4134-bd9e",
  "name": "iPhone 15",
  "description": "Latest Apple smartphone",
  "price": 1299.99,
  "category": "Electronics",
  "inStock": true
}
```

## 🚠 Error Responses

- `400 Bad Request` – Validation error
- `403 Forbidden` – Missing or invalid API key
- `404 Not Found` – Product not found
- `500 Internal Server Error` – Something went wrong on the server

## 🧼 Logging Example

Logger middleware logs every request:

``` markdown
[2025-06-16T12:00:00Z] POST /api/products
```

## 👤 Author

Name: Elyson25  
Info: MERN Stack Student, PLP Kenya

## 📚 Notes

- Data is stored in-memory.
- Restarting the server will reset the product list.
- Use tools like Postman or curl for API testing.
