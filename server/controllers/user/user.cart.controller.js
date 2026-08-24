const userService = require('#services/user/user.service.js');

exports.getCart = async (req, res) => {
  try {
    const cart = await userService.getCart(req.user.id);
    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.syncCart = async (req, res) => {
  try {
    const cart = await userService.syncCart(req.user.id, req.body.cart);
    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const cart = await userService.clearCart(req.user.id);
    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
