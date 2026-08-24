const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'Please add a rating'],
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: [true, 'Please add a comment'],
    maxlength: 500
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

ReviewSchema.index({ user: 1, product: 1 }, { unique: true });
ReviewSchema.index({ product: 1, createdAt: -1 });

ReviewSchema.statics.calcAverageRating = async function(productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
        numReviews: { $sum: 1 }
      }
    }
  ]);

  const Product = require('./product.model.js');
  if (result.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      averageRating: Math.round(result[0].averageRating * 10) / 10,
      numReviews: result[0].numReviews
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      averageRating: 0,
      numReviews: 0
    });
  }
};

ReviewSchema.post('save', function() {
  this.constructor.calcAverageRating(this.product);
});

ReviewSchema.post('deleteOne', { document: true, query: false }, function() {
  this.constructor.calcAverageRating(this.product);
});

module.exports = mongoose.model('Review', ReviewSchema);
