const Product = require('#models/misc/product.model.js');
const { buildSearchFilter, buildSortOrder, validatePagination } = require('#utils/searchHelper.js');

class ProductService {
  async getProducts(query = {}) {
    const filter = buildSearchFilter(query);
    const sortOption = buildSortOrder(query.sort);
    const { page, limit, skip } = validatePagination(query.page, query.limit);

    let products;
    if (query.random === 'true' || query.random === true) {
      products = await Product.aggregate([
        { $match: filter },
        { $sample: { size: limit } }
      ]);
    } else {
      products = await Product.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .lean();
    }

    const total = await Product.countDocuments(filter);

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getProductById(productId) {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  async createProduct(productData) {
    const product = await Product.create(productData);
    return product;
  }

  async updateProduct(productId, updateData) {
    const product = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  async deleteProduct(productId) {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    await product.deleteOne();
    return product;
  }

  async getFeaturedProducts(limit = 8) {
    const products = await Product.find({ tag: { $exists: true, $ne: null } })
      .sort({ createdAt: -1, averageRating: -1 })
      .limit(limit)
      .lean();

    return products;
  }

  async searchProducts(searchTerm, filters = {}) {
    const query = { search: searchTerm, ...filters };
    return this.getProducts(query);
  }

  async getCategoryStats() {
    const stats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          count: 1
        }
      }
    ]);
    return stats;
  }
}

module.exports = new ProductService();