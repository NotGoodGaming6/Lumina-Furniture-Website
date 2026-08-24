const express = require('express');
const { getOrders, updateOrderStatus } = require('#controllers/admin/admin.order.controller.js');
const { protect, authorize } = require('#middleware/user/auth.middleware.js');
const router = express.Router();

router.get('/', protect, authorize('admin'), getOrders);
router.put('/:id/status', protect, authorize('admin'), updateOrderStatus);

module.exports = router;
