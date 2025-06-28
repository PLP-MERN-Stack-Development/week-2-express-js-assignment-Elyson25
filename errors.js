class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

module.exports = { NotFoundError, ValidationError };



// Add proper error responses with appropriate HTTP status codes
router.get('/:id', (req, res, next) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
        return next(new NotFoundError('Product not found'));
    }
    res.json(product);
});

router.post('/', validateProduct, (req, res, next) => {
    const { name, description, price, category, inStock } = req.body;
    if (!name || !description || !price || !category || typeof inStock !== 'boolean') {
        return next(new ValidationError('Invalid product data'));
    }
    const newProduct = { id: uuidv4(), name, description, price, category, inStock };
    products.push(newProduct);
    res.status(201).json(newProduct);
});


router.put('/:id', validateProduct, (req, res, next) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
        return next(new NotFoundError('Product not found'));
    }

    const { name, description, price, category, inStock } = req.body;
    if (!name || !description || !price || !category || typeof inStock !== 'boolean') {
        return next(new ValidationError('Invalid product data'));
    }
    
    Object.assign(product, { name, description, price, category, inStock });
    res.json(product);
});

router.delete('/:id', (req, res, next) => {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) {
        return next(new NotFoundError('Product not found'));
    }
    products.splice(index, 1);
    res.status(204).send();
});

// Handle asynchronous errors using try/catch blocks or a wrapper function
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
router.get('/:id', asyncHandler(async (req, res, next) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
        return next(new NotFoundError('Product not found'));
    }
    res.json(product);
}));
router.post('/', validateProduct, asyncHandler(async (req, res, next) => {
    const { name, description, price, category, inStock } = req.body;
    if (!name || !description || !price || !category || typeof inStock !== 'boolean') {
        return next(new ValidationError('Invalid product data'));
    }
    const newProduct = { id: uuidv4(), name, description, price, category, inStock };
    products.push(newProduct);
    res.status(201).json(newProduct);
}));