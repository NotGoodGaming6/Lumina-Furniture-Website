const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  image: {
    type: String,
    default: 'no-photo.jpg'
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Furniture', 'Lighting', 'Decor', 'Botanical']
  },
  tag: {
    type: String
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  stock: {
    type: Number,
    default: 10
  },
  averageRating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

ProductSchema.index({ category: 1, price: 1 });
ProductSchema.index({ category: 1, createdAt: -1 });
ProductSchema.index({ tag: 1, createdAt: -1 });
ProductSchema.index({ averageRating: -1, numReviews: -1 });
ProductSchema.index({ name: 'text', description: 'text', category: 'text', tag: 'text' });

module.exports = mongoose.model('Product', ProductSchema);
