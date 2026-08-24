const express = require('express');
const { createProduct, updateProduct, deleteProduct } = require('#controllers/admin/admin.product.controller.js');
const { getProducts } = require('#controllers/misc/misc.product.controller.js');
const { protect, authorize } = require('#middleware/user/auth.middleware.js');

const router = express.Router();

router.get('/', getProducts);
router.post('/', protect, authorize('admin'), createProduct);
router.put('/:id', protect, authorize('admin'), updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

module.exports = router;
