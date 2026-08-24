const Order = require('#models/user/order.model.js');
const socketUtils = require('#utils/socket.js');

class OrderService {
  async createOrder(userId, orderData) {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      couponCode,
      discountAmount
    } = orderData;

    if (!orderItems || orderItems.length === 0) {
      throw new Error('No order items');
    }

    const order = new Order({
      user: userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      couponCode,
      discountAmount,
      paidAt: Date.now()
    });

    const createdOrder = await order.save();

    try {
      const io = socketUtils.getIO();
      io.to('admins').emit('newOrder', { 
        message: 'New order received!',
        orderId: createdOrder._id,
        totalPrice: createdOrder.totalPrice
      });
    } catch(err) {
      console.error('Socket error emitting newOrder:', err.message);
    }

    return createdOrder;
  }

  async getUserOrders(userId) {
    const orders = await Order.find({ user: userId }).sort('-createdAt');
    return orders;
  }

  async getOrderById(orderId, userId, userRole = 'user') {
    const order = await Order.findById(orderId).populate('user', 'name email');

    if (!order) {
      throw new Error('Order not found');
    }

    if (order.user._id.toString() !== userId.toString() && userRole !== 'admin') {
      throw new Error('Not authorized to view this order');
    }

    return order;
  }

  async getAllOrders() {
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort('-createdAt');
    return orders;
  }

  async updateOrderStatus(orderId, status) {
    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    order.status = status || order.status;

    if (status === 'delivered') {
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();

    try {
      const io = socketUtils.getIO();
      io.to(updatedOrder.user.toString()).emit('orderStatusUpdated', {
        message: `Your order status changed to ${status}`,
        orderId: updatedOrder._id,
        status: status
      });
    } catch(err) {
      console.error('Socket error emitting orderStatusUpdated:', err.message);
    }

    return updatedOrder;
  }

  async markOrderAsPaid(orderId, userId) {
    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    if (order.user.toString() !== userId.toString()) {
      throw new Error('Not authorized');
    }

    order.isPaid = true;
    order.paidAt = Date.now();

    const updatedOrder = await order.save();
    return updatedOrder;
  }
}

module.exports = new OrderService();