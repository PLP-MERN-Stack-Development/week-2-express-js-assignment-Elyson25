const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let products = []; // In-memory storage for products

// GET /api/products: List all products
router.get('/', (req, res) => {
    res.json(products);
});

// GET /api/products/:id: Get a specific product by ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
});

// POST /api/products: Create a new product
router.post('/', (req, res) => {
    const { name, description, price, category, inStock } = req.body;
    const newProduct = { id: uuidv4(), name, description, price, category, inStock };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PUT /api/products/:id: Update an existing product
router.put('/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) return res.status(404).send('Product not found');

    const { name, description, price, category, inStock } = req.body;
    Object.assign(product, { name, description, price, category, inStock });
    res.json(product);
});

// DELETE /api/products/:id: Delete a product
router.delete('/:id', (req, res) => {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).send('Product not found');
    products.splice(index, 1);
    res.status(204).send();
});

module.exports = router;

const { body, validationResult } = require('express-validator');

const validateProduct = [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('description').isString().notEmpty().withMessage('Description is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('category').isString().notEmpty().withMessage('Category is required'),
    body('inStock').isBoolean().withMessage('InStock must be a boolean'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];


// Advanced Features
// Implement query parameters for filtering products by category
router.get('/', (req, res) => {
    const { category } = req.query;
    const filteredProducts = category ? products.filter(p => p.category === category) : products;
    res.json(filteredProducts);
});

// Add pagination support for the product listing endpoint
router.get('/', (req, res) => {
    const { category, page = 1, limit = 10 } = req.query;
    const filteredProducts = category ? products.filter(p => p.category === category) : products;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    res.json(paginatedProducts);
});

// Create a search endpoint that allows searching products by name
router.get('/search', (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).send('Query parameter is required');
    }
    const searchResults = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    res.json(searchResults);
});

// Implement route for getting product statistics (e.g., count by category)
router.get('/stats', (req, res) => {
    const stats = products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
    }, {});
    res.json(stats);
});
