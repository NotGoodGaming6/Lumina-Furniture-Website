const reviewService = require('#services/review/review.service.js');

exports.createReview = async (req, res) => {
  try {
    const review = await reviewService.createReview(req.user._id, req.params.productId, req.body);
    res.status(201).json({ success: true, data: review });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    await reviewService.deleteReview(req.params.id, req.user._id, req.user.role);
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
