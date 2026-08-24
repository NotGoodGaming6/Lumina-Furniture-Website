const express = require('express');
const { getReviews } = require('#controllers/misc/misc.review.controller.js');
const { createReview, deleteReview } = require('#controllers/user/user.review.controller.js');
const { protect } = require('#middleware/user/auth.middleware.js');
const router = express.Router();

router.get('/products/:productId/reviews', getReviews);
router.post('/products/:productId/reviews', protect, createReview);
router.delete('/reviews/:id', protect, deleteReview);

module.exports = router;
