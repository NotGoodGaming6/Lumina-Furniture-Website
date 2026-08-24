const orderService = require('#services/order/order.service.js');
const emailService = require('#services/email/email.service.js');

exports.getOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
    
    if (order?.user?.email) {
      emailService.sendStatusUpdateEmail(order.user.email, order, req.body.status).catch(console.error);
    }

    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
