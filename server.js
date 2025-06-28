// Server.js
const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./routes/products');
const logger = require('./middleware/logger');
const authenticate = require('./middleware/auth');
const app = express();
const PORT = 3000;

app.use(logger);
app.use(authenticate);
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/products', productsRouter);

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});




