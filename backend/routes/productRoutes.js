const express = require('express');
const router = express.Router();
const { getProducts, createProduct } = require('../controllers/productController');

// GET request: /api/products par jane se saare products milenge
router.get('/', getProducts);

// POST request: /api/products par data bhejne se naya product add hoga
router.post('/', createProduct);

module.exports = router;