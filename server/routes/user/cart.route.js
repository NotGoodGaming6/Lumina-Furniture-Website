const express = require('express');
const { getCart, syncCart, clearCart } = require('#controllers/user/user.cart.controller.js');
const { protect } = require('#middleware/user/auth.middleware.js');
const router = express.Router();

router.get('/', protect, getCart);
router.put('/', protect, syncCart);
router.delete('/', protect, clearCart);

module.exports = router;
