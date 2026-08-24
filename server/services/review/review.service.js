const Review = require('#models/misc/review.model.js');
const Product = require('#models/misc/product.model.js');

class ReviewService {
  async getProductReviews(productId) {
    const reviews = await Review.find({ product: productId })
      .populate({
        path: 'user',
        select: 'name'
      })
      .sort('-createdAt');

    return reviews;
  }

  async createReview(userId, productId, reviewData) {
    const { rating, comment } = reviewData;

    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    const alreadyReviewed = await Review.findOne({
      user: userId,
      product: productId
    });

    if (alreadyReviewed) {
      throw new Error('Product already reviewed');
    }

    const review = await Review.create({
      user: userId,
      product: productId,
      rating: Number(rating),
      comment
    });

    return review;
  }

  async deleteReview(reviewId, userId, userRole = 'user') {
    const review = await Review.findById(reviewId);

    if (!review) {
      throw new Error('Review not found');
    }

    if (review.user.toString() !== userId.toString() && userRole !== 'admin') {
      throw new Error('Not authorized to delete this review');
    }

    await review.deleteOne();
    return review;
  }
}

module.exports = new ReviewService();