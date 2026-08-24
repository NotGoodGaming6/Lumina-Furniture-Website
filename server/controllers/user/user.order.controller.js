const orderService = require('#services/order/order.service.js');
const emailService = require('#services/email/email.service.js');

exports.createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.user._id, req.body);
    
    if (req.user?.email) {
      emailService.sendOrderConfirmationEmail(req.user.email, order).catch(console.error);
    }

    res.status(201).json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await orderService.getUserOrders(req.user._id);
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id, req.user._id, req.user.role);
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.payOrder = async (req, res) => {
  try {
    const order = await orderService.markOrderAsPaid(req.params.id, req.user._id);
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
