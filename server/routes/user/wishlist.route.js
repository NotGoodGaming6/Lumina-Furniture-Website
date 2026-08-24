const express = require('express');
const { getWishlist, addToWishlist, removeFromWishlist } = require('#controllers/user/user.wishlist.controller.js');
const { protect } = require('#middleware/user/auth.middleware.js');
const router = express.Router();

router.get('/', protect, getWishlist);
router.post('/:productId', protect, addToWishlist);
router.delete('/:productId', protect, removeFromWishlist);

module.exports = router;
