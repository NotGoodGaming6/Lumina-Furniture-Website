const express = require('express');
const { createOrder, getMyOrders, getOrderById } = require('#controllers/user/user.order.controller.js');
const { protect } = require('#middleware/user/auth.middleware.js');
const router = express.Router();

router.post('/', protect, createOrder);
router.get('/mine', protect, getMyOrders);
router.get('/:id', protect, getOrderById);

module.exports = router;
