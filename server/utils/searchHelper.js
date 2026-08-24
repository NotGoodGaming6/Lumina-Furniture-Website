const buildSearchFilter = (query) => {
  const filter = {};

  if (query.search && query.search.trim()) {
    const term = query.search.trim();
    const searchRegex = { $regex: term, $options: 'i' };
    filter.$or = [
      { name: searchRegex },
      { description: searchRegex },
      { category: searchRegex },
      { tag: searchRegex }
    ];
  }

  if (query.category && query.category !== 'All') {
    filter.category = query.category;
  }

  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) {
      filter.price.$gte = parseFloat(query.minPrice);
    }
    if (query.maxPrice) {
      filter.price.$lte = parseFloat(query.maxPrice);
    }
  }

  if (query.inStock === 'true') {
    filter.stock = { $gt: 0 };
  }

  if (query.minRating) {
    filter.averageRating = { $gte: parseFloat(query.minRating) };
  }

  return filter;
};

const buildSortOrder = (sortBy) => {
  const sortOptions = {
    'newest': { createdAt: -1 },
    'oldest': { createdAt: 1 },
    'price_asc': { price: 1 },
    'price_desc': { price: -1 },
    'rating': { averageRating: -1, numReviews: -1 },
    'name_asc': { name: 1 },
    'name_desc': { name: -1 }
  };

  return sortOptions[sortBy] || { createdAt: -1 };
};

const validatePagination = (page, limit) => {
  const validPage = Math.max(parseInt(page) || 1, 1);
  const validLimit = Math.min(Math.max(parseInt(limit) || 12, 1), 100);

  return {
    page: validPage,
    limit: validLimit,
    skip: (validPage - 1) * validLimit
  };
};

const sanitizeSearchQuery = (query) => {
  if (!query) return '';

  let sanitized = query
    .trim()
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .substring(0, 100);

  return sanitized;
};

module.exports = {
  buildSearchFilter,
  buildSortOrder,
  validatePagination,
  sanitizeSearchQuery
};