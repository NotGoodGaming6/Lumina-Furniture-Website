const express = require('express');
const { getProducts, getProductById, getCategoryStats } = require('#controllers/misc/misc.product.controller.js');
const router = express.Router();

router.get('/', getProducts);
router.get('/categories/stats', getCategoryStats);
router.get('/:id', getProductById);

module.exports = router;
