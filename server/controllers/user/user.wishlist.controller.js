const userService = require('#services/user/user.service.js');

exports.getWishlist = async (req, res, next) => {
  try {
    const wishlist = await userService.getWishlist(req.user.id);

    res.status(200).json({
      success: true,
      data: wishlist
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Wishlist retrieval error' });
  }
};

exports.addToWishlist = async (req, res, next) => {
  try {
    const wishlist = await userService.addToWishlist(req.user.id, req.params.productId);

    res.status(200).json({
      success: true,
      data: wishlist
    });
  } catch (err) {
    console.error('Wishlist Add Error Detail:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.removeFromWishlist = async (req, res, next) => {
  try {
    const wishlist = await userService.removeFromWishlist(req.user.id, req.params.productId);

    res.status(200).json({
      success: true,
      data: wishlist
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
