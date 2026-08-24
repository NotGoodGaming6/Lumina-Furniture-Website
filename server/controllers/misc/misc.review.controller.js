const reviewService = require('#services/review/review.service.js');

exports.getReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getProductReviews(req.params.productId);
    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
