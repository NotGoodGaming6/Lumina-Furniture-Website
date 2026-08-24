const productService = require('#services/product/product.service.js');

exports.getProducts = async (req, res) => {
  try {
    const result = await productService.getProducts(req.query);
    res.status(200).json({
      success: true,
      count: result.products.length,
      pagination: result.pagination,
      data: result.products
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getCategoryStats = async (req, res) => {
  try {
    const stats = await productService.getCategoryStats();
    res.status(200).json({ success: true, data: stats });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
